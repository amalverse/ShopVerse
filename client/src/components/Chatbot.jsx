import React, { useState, useRef, useEffect } from "react";
import { FaCommentDots, FaTimes, FaPaperPlane, FaStar } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/features/cart/cartSlice.js";
import { getBaseURL } from "../utils/baseURL";

/* ─── Mini Product Card rendered inside the chat ─────────────────────── */
const ChatProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartProducts = useSelector((state) => state.cart.products);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) { toast.warning("Please login first to add to cart!"); return; }
    const isExist = cartProducts.find((item) => item._id === product._id);
    if (isExist) { toast.warning("Product is already in the cart!"); return; }
    dispatch(addToCart(product));
    toast.success("Added to cart!");
  };

  const stars = Math.round(product.rating || 0);

  return (
    <div
      onClick={() => navigate(`/shop/${product._id}`)}
      className="cursor-pointer bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden w-full group"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-50 h-32">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.oldPrice && (
          <span className="absolute top-2 left-2 bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            SALE
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-2.5">
        <p className="text-xs font-semibold text-gray-800 truncate leading-tight">
          {product.name}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-0.5 mt-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <FaStar key={s} size={9} className={s <= stars ? "text-yellow-400" : "text-gray-200"} />
          ))}
        </div>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-emerald-600">${product.price}</span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">${product.oldPrice}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-1.5 rounded-lg transition-colors"
            title="Add to Cart"
          >
            <MdOutlineShoppingCart size={13} />
          </button>
        </div>

        {/* View Button */}
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/shop/${product._id}`); }}
          className="mt-2 w-full text-xs bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 text-gray-600 border border-gray-200 rounded-lg py-1 transition-colors font-medium"
        >
          View Product →
        </button>
      </div>
    </div>
  );
};

/* ─── Quick suggestion chips ─────────────────────────────────────────── */
const SUGGESTIONS = [
  "Show me electronics",
  "What's on sale?",
  "Show me women's clothing",
  "What headphones do you have?",
];

/* ─── Main Chatbot Component ─────────────────────────────────────────── */
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! I'm the ShopVerse assistant 👋 Ask me about products, prices, colors, reviews, or anything about our store!",
      products: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      const scrollTimer = setTimeout(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(scrollTimer);
    }
  }, [messages, isOpen, isLoading]);

  const toggleChat = () => setIsOpen((prev) => !prev);

  /**
   * Core send function. Accepts optional `overrideText` for quick suggestion chips.
   */
  const sendMessage = async (e, overrideText) => {
    if (e) e.preventDefault();
    const text = overrideText ?? input;
    if (!text.trim()) return;

    // Optimistically add user message
    const userMsg = { role: "user", text, products: [] };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Build history from ALL previous messages (everything before the message we just added)
      // We skip the very first greeting message (index 0) since it's just UI, not real history.
      const history = nextMessages
        .slice(1, -1) // exclude greeting & the message we just added (it becomes current message)
        .map((msg) => ({
          role: msg.role,
          text: msg.text,
          // Include product IDs and names so backend can fetch full details for follow-ups
          products: (msg.products || []).map((p) => ({ _id: p._id, name: p.name })),
        }));

      // Gather context from current page to help bot answer page-specific questions
      let pageContext = "";
      try {
        const pageTitle = document.title;
        const pageText = document.body.innerText || "";
        pageContext = `Page Title: ${pageTitle}\nPage Content: ${pageText.substring(0, 3000)}`;
      } catch (err) {
        console.warn("Could not extract page context", err);
      }

      const response = await fetch(`${getBaseURL()}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history, pageContext }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || "Chat request failed");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply, products: data.products || [] },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Sorry, I'm having trouble connecting right now. Please try again!",
          products: [],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* ── Chat Window ── */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl w-[340px] sm:w-[420px] max-h-[600px] flex flex-col overflow-hidden border border-gray-100 transition-all duration-300 animate-scale-in">
          {/* Header */}
          <div className="bg-indigo-500 text-white p-4 flex justify-between items-center shadow-sm shrink-0">
            <h3 className="font-semibold text-base flex items-center gap-2">
              <FaCommentDots className="animate-pulse" />
              ShopVerse Assistant
            </h3>
            <button onClick={toggleChat} className="text-white hover:text-indigo-200 transition-colors">
              <FaTimes size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 h-[450px] overflow-y-auto bg-[#FBFBFF] flex flex-col gap-4 scroll-smooth">
            {messages.map((msg, index) => (
              <div key={index} className="flex flex-col gap-2">
                {/* Role label for bot */}
                {msg.role === "bot" && index > 0 && (
                  <span className="text-[10px] text-gray-400 font-medium self-start ml-1">
                    ShopVerse Bot
                  </span>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-indigo-500 text-white self-end rounded-md shadow-sm-br-sm"
                      : "bg-white text-gray-800 self-start shadow-sm rounded-md shadow-sm-bl-sm border border-gray-100"
                  }`}
                >
                  {msg.text}
                </div>

                {/* Product Cards Grid (bot messages only) */}
                {msg.role === "bot" && msg.products && msg.products.length > 0 && (
                  <>
                    {/* Hint to encourage follow-up questions */}
                    <p className="text-[10px] text-gray-400 self-start ml-1">
                      💬 Ask me about color, reviews, price…
                    </p>
                    <div
                      className={`grid gap-2 w-full ${
                        msg.products.length === 1 ? "grid-cols-1" : "grid-cols-2"
                      }`}
                    >
                      {msg.products.map((product) => (
                        <ChatProductCard key={product._id} product={product} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Quick suggestion chips — only show on first (welcome) message */}
            {messages.length === 1 && !isLoading && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(null, s)}
                    className="text-xs bg-white border border-indigo-200 text-indigo-500 hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-colors font-medium shadow-sm"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="bg-white text-gray-500 self-start shadow-sm rounded-2xl rounded-md shadow-sm-bl-sm border border-gray-100 p-3 text-sm flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.15s]" />
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.3s]" />
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors disabled:opacity-50 flex items-center justify-center w-10 h-10"
              >
                <FaPaperPlane size={14} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Toggle Button ── */}
      <button
        onClick={toggleChat}
        className="bg-indigo-500 hover:bg-indigo-600 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110 flex items-center justify-center w-14 h-14"
      >
        {isOpen ? <FaTimes size={22} /> : <FaCommentDots size={22} />}
      </button>
    </div>
  );
};

export default Chatbot;
