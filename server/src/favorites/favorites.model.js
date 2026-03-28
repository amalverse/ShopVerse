const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
    product: { type: Object, required: true },
    userId: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Favorite', favoriteSchema);
