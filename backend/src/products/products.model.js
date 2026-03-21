const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    image: { type: String, required: true },
    color: { type: String },
    rating: { type: Number, default: 0 },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

const Products = model("Product", ProductSchema);
module.exports = Products;
