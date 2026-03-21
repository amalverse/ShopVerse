const logger = require("../utils/logger");
const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const Product = require('../products/products.model');
const Review = require('../reviews/reviews.model');

// Initialize Gemini API client using the key from .env
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

// ── Diagnostic route (safe to keep, useful for debugging) ──────────────
router.get('/test', (req, res) => {
  res.json({
    apiKeyPresent: !!apiKey,
    apiKeyPreview: apiKey ? apiKey.slice(0, 10) + '...' : 'MISSING',
    nodeEnv: process.env.NODE_ENV,
  });
});

// ── Helpers ────────────────────────────────────────────────────────────

/**
 * Fetches a product's full details including review summary.
 * Returns a human-readable string describing the product.
 */
async function getProductDetail(productId) {
  try {
    const product = await Product.findById(productId).lean();
    if (!product) return null;

    const reviews = await Review.find({ productId: product._id }).lean();
    const reviewCount = reviews.length;
    const avgRating =
      reviewCount > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)
        : product.rating || 'No ratings yet';

    const reviewSnippets = reviews
      .slice(0, 3)
      .map((r) => `"${r.comment}" (${r.rating}/5)`)
      .join('; ');

    return (
      `Product: ${product.name}\n` +
      `  Category: ${product.category}\n` +
      `  Price: $${product.price}${product.oldPrice ? ` (was $${product.oldPrice})` : ''}\n` +
      `  Color: ${product.color || 'Not specified'}\n` +
      `  Description: ${product.description || 'No description available'}\n` +
      `  Rating: ${avgRating}/5 based on ${reviewCount} review(s)\n` +
      (reviewSnippets ? `  Recent Reviews: ${reviewSnippets}` : '  Reviews: None yet')
    );
  } catch (e) {
    return null;
  }
}

// ── Main Chat Route ────────────────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { message, history = [], pageContext = "" } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    if (!apiKey) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
    }

    // ── 1. Fetch all products for store-wide context ───────────────────
    const allProducts = await Product.find(
      {},
      'name category price oldPrice description image rating color'
    ).limit(50).lean();

    const catalogContext = allProducts
      .map(
        (p, i) =>
          `[${i + 1}] ID:${p._id} | ${p.name} (${p.category}) | $${p.price} | Color: ${p.color || 'N/A'} | ${p.description || ''}`
      )
      .join('\n');

    // ── 2. Collect IDs of products that were shown in previous turns ───
    const shownProductIds = [];
    for (const turn of history) {
      if (turn.products && Array.isArray(turn.products)) {
        for (const p of turn.products) {
          if (p._id && !shownProductIds.includes(p._id.toString())) {
            shownProductIds.push(p._id.toString());
          }
        }
      }
    }

    // ── 3. Fetch full details (color, reviews, description) for shown products
    let shownProductContext = '';
    if (shownProductIds.length > 0) {
      const details = await Promise.all(shownProductIds.map(getProductDetail));
      const valid = details.filter(Boolean);
      if (valid.length > 0) {
        shownProductContext =
          '\n\nFULL DETAILS of products already shown in this conversation (use these to answer follow-up questions):\n' +
          valid.join('\n\n');
      }
    }

    // ── 4. Build the system prompt ─────────────────────────────────────
    let extraContext = "";
    if (pageContext) {
      extraContext = `\n\nCURRENT PAGE CONTEXT (Use this to answer questions about policies, about us, shipping, etc. if relevant to the user query):\n${pageContext}`;
    }

    const systemPrompt =
      `You are a helpful e-commerce chatbot for ShopVerse. Answer questions about products, ` +
      `prices, colors, reviews, policies, and recommendations in a friendly and concise way.\n\n` +
      `PRODUCT CATALOG (use to recommend products):\n${catalogContext}` +
      shownProductContext + extraContext +
      `\n\nIMPORTANT OUTPUT RULES:\n` +
      `1. When recommending specific products from the catalog, include this JSON tag on its own line at the END of your reply:\n` +
      `   PRODUCTS_JSON:[{"id":"<productId>","name":"<name>"}]\n` +
      `2. Include up to 4 products in the JSON array.\n` +
      `3. If the user asks a follow-up about a product already shown (color, reviews, description, price, etc.), ` +
      `answer using the FULL DETAILS section above. Do NOT include PRODUCTS_JSON unless recommending NEW products.\n` +
      `4. Keep text replies short and helpful — 1 to 4 sentences.`;

    // ── 5. Build Gemini multi-turn conversation from history ───────────
    // Each turn must alternate: user → model → user → model …
    const conversationContents = [];

    for (const turn of history) {
      if (turn.role === 'user') {
        conversationContents.push({
          role: 'user',
          parts: [{ text: turn.text }],
        });
      } else if (turn.role === 'bot') {
        // Re-construct the bot's previous reply (strip product JSON tag, it was already parsed)
        let botText = turn.text || '';
        if (turn.products && turn.products.length > 0) {
          const names = turn.products.map((p) => p.name).join(', ');
          botText += `\n[Products shown: ${names}]`;
        }
        conversationContents.push({
          role: 'model',
          parts: [{ text: botText }],
        });
      }
    }

    // Add the current user message (system prompt prepended only on first turn)
    const isFirstTurn = conversationContents.length === 0;
    conversationContents.push({
      role: 'user',
      parts: [
        {
          text: isFirstTurn
            ? systemPrompt + '\n\nUser: ' + message
            : message,
        },
      ],
    });

    // On subsequent turns, prepend a lightweight context reminder so Gemini doesn't forget its role
    if (!isFirstTurn) {
      conversationContents.unshift({
        role: 'user',
        parts: [{ text: systemPrompt }],
      });
      conversationContents.splice(1, 0, {
        role: 'model',
        parts: [{ text: 'Understood! I am the ShopVerse assistant. I will use the product catalog and full details to answer your questions.' }],
      });
    }

    // ── 6. Call Gemini ─────────────────────────────────────────────────
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: conversationContents,
    });

    const rawText = response.text || '';

    // ── 7. Parse reply and optional product recommendations ────────────
    let replyText = rawText;
    let matchedProducts = [];

    const jsonMatch = rawText.match(/PRODUCTS_JSON:(\[.*?\])/s);
    if (jsonMatch) {
      replyText = rawText.replace(/PRODUCTS_JSON:\[.*?\]/s, '').trim();
      try {
        const refs = JSON.parse(jsonMatch[1]);
        const ids = refs.map((r) => r.id);
        const found = await Product.find({ _id: { $in: ids } })
          .select('name category price oldPrice image rating color')
          .lean();
        matchedProducts = ids
          .map((id) => found.find((p) => p._id.toString() === id))
          .filter(Boolean);
      } catch (_) {
        // If JSON parsing fails, just return text with no products
      }
    }

    res.status(200).json({ reply: replyText, products: matchedProducts });
  } catch (error) {
    logger.error('Chat Route Error:', { stack: error.stack });
    res.status(500).json({ error: error.message || 'Failed to process chat message.' });
  }
});

module.exports = router;
