const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("./orders.model");
const logger = require("../utils/logger");
const router = express.Router();

// create checkout session with Stripe
router.post("/create-checkout-session", async (req, res) => {
  const { products, userEmail } = req.body;

  try {
    // We need to format our products to match Stripe's expected format (line_items)
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image],
        },
        // Stripe expects price in cents, so we multiply by 100
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity,
    }));

    const sessionOptions = {
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    };

    // Pass user email to Stripe so confirm-payment can reliably read it back
    if (userEmail) {
      sessionOptions.customer_email = userEmail;
    }

    const session = await stripe.checkout.sessions.create(sessionOptions);
    logger.info(`Stripe checkout session created: ${session.id} for user ${userEmail}`);

    res.json({ id: session.id, url: session.url });
  } catch (error) {
    logger.error(`Error creating checkout session: ${error.message}`, { stack: error.stack });
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

const sendEmail = require("../utils/sendEmail");

// confirm payment
router.post("/confirm-payment", async (req, res) => {
  const { session_id } = req.body;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    });

    const paymentId = session.payment_intent ? session.payment_intent.id : session.id;
    let orderStatus = session.payment_intent ? (session.payment_intent.status === "succeeded" ? "pending" : "failed") : (session.payment_status === "paid" ? "pending" : "failed");

    // First, check if we already saved this order in our database
    let order = await Order.findOne({ orderId: paymentId });
    let isNewOrder = false;

    if (!order) {
      isNewOrder = true;
      const Product = require('../products/products.model');
      
      // If we didn't save it yet, we create a new order based on the info from Stripe
      const lineItems = await Promise.all(session.line_items.data.map(async (item) => {
        const product = await Product.findOne({ name: item.description });
        return {
          productId: product ? product._id.toString() : item.price.product,
          quantity: item.quantity,
          itemName: item.description,
          image: product ? product.image : '',
          price: item.price.unit_amount / 100,
        };
      }));

      // Convert cents back to dollars for saving in DB
      const amount = session.amount_total / 100;
      const emailObj = session.customer_details?.email || session.customer_email || '';

      const User = require('../users/user.model');
      const userDoc = await User.findOne({ email: emailObj });

      order = new Order({
        orderId: paymentId,
        products: lineItems,
        amount: amount,
        email: emailObj,
        address: userDoc ? userDoc.address : null,
        contact: userDoc ? userDoc.username : '',
        status: orderStatus,
      });
    } else {
      // We already had the order, so we just update the status
      order.status = orderStatus;
    }

    // Save the order to MongoDB
    await order.save();
    logger.info(`Payment confirmed and order saved: ${paymentId} for ${order.email} - Status: ${orderStatus}`);

    // SEND EMAIL NOTIFICATION (Only for new successful orders)
    if (isNewOrder && (orderStatus === "pending" || session.payment_status === "paid")) {
      try {
        const productRows = order.products.map(p => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee;">${p.itemName}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${p.quantity}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">$${p.price.toFixed(2)}</td>
          </tr>
        `).join('');

        await sendEmail({
          email: order.email,
          subject: `Order Confirmed - ShopVerse #${order._id.toString().slice(-6).toUpperCase()}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              <div style="background-color: #4f46e5; color: white; padding: 40px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px;">Thank You for Your Order!</h1>
                <p style="margin-top: 10px; opacity: 0.9;">We've received your payment and are processing your items.</p>
              </div>
              <div style="padding: 30px;">
                <h2 style="font-size: 18px; margin-bottom: 20px;">Order Summary</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #f8fafc;">
                      <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e2e8f0;">Item</th>
                      <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e2e8f0;">Qty</th>
                      <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e2e8f0;">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${productRows}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" style="padding: 20px 12px; text-align: right; font-weight: bold;">Grand Total:</td>
                      <td style="padding: 20px 12px; text-align: right; font-weight: bold; color: #4f46e5; font-size: 20px;">$${order.amount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
                <div style="margin-top: 40px; padding: 20px; background-color: #f1f5f9; border-radius: 8px;">
                  <h3 style="font-size: 14px; margin-top: 0;">What's Next?</h3>
                  <p style="font-size: 13px; color: #64748b; line-height: 1.6;">Our team is now preparing your order for shipment. You'll receive another email with a tracking number as soon as your package is on its way.</p>
                </div>
              </div>
              <div style="background-color: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8;">
                &copy; ${new Date().getFullYear()} ShopVerse Inc. All rights reserved.
              </div>
            </div>
          `
        });
        logger.info(`Confirmation email sent to ${order.email}`);
      } catch (emailError) {
        logger.error(`Failed to send confirmation email: ${emailError.message}`);
        // We don't fail the request if the email fails, as the order is already saved.
      }
    }

    res.json({ order });
  } catch (error) {
    logger.error(`Error confirming payment for session ${session_id}: ${error.message}`, { stack: error.stack });
    res.status(500).json({ error: "Failed to confirm payment" });
  }
});

// get all orders — must be before /:email to avoid route collision
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(200).send([]);
    }

    res.status(200).send(orders);
  } catch (error) {
    logger.error("Error fetching all orders", { stack: error.stack });
    res.status(500).send({ message: "Failed to fetch all orders" });
  }
});

// get order by id — must be before /:email to avoid route collision
router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send(order);
  } catch (error) {
    logger.error("Error fetching orders by user id", { stack: error.stack });
    res.status(500).send({ message: "Failed to fetch orders by user id" });
  }
});

// get order by email address — wildcard, must be LAST among GET routes
router.get("/:email", async (req, res) => {
  const email = req.params.email;
  if (!email) {
    return res.status(400).send({ message: "Email is required" });
  }

  try {
    const orders = await Order.find({ email: email });

    if (orders.length === 0 || !orders) {
      return res
        .status(200)
        .send({ orders: [], message: "No orders found for this email" });
    }
    res.status(200).send({ orders });
  } catch (error) {
    logger.error("Error fetching orders by email", { stack: error.stack });
    res.status(500).send({ message: "Failed to fetch orders by email" });
  }
});

// update order status
router.patch("/update-order-status/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!status) {
    return res.status(400).send({ message: "Status is required" });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    logger.error("Error updating order status", { stack: error.stack });
    res.status(500).send({ message: "Failed to update order status" });
  }
});

// delete order
router.delete("/delete-order/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).send({ message: "Order not found" });
    }
    res.status(200).json({
      message: "Order deleted successfully",
      order: deletedOrder,
    });
  } catch (error) {
    logger.error("Error deleting order", { stack: error.stack });
    res.status(500).send({ message: "Failed to delete order" });
  }
});

module.exports = router;
