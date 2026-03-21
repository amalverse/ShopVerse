const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderId: String,
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        itemName: String,
        image: String,
        price: Number,
      },
    ],
    amount: Number,
    email: { type: String, required: true },
    address: { type: Object },
    contact: { type: String },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "completed", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
