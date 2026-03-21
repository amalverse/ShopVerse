const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ReviewSchema = new Schema(
  {
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  },
  { timestamps: true },
);

const Reviews = model("Review", ReviewSchema);
module.exports = Reviews;
