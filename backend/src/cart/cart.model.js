const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    product: { type: Object, required: true },
    userId: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);
