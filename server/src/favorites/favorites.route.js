const express = require('express');
const Favorite = require('./favorites.model');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    try {
        const existingItem = await Favorite.findOne({ 'product._id': req.body._id, userId: req.userId });
        if (existingItem) {
            return res.status(400).send({ message: "Product is already in favorites!" });
        }
        
        const item = new Favorite({ product: req.body, userId: req.userId });
        await item.save();
        res.status(200).send({ message: "Product added to favorites successfully", item });
    } catch (e) { 
        res.status(500).send(e.message); 
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const items = await Favorite.find({ userId: req.userId });
        // Returns array of favorite Products
        res.status(200).send(items.map(i => i.product));
    } catch (e) { 
        res.status(500).send(e.message); 
    }
});
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedFavorite = await Favorite.findOneAndDelete({ 'product._id': req.params.id, userId: req.userId });
        if (!deletedFavorite) {
            return res.status(404).send({ message: "Favorite not found" });
        }
        res.status(200).send({ message: "Product removed from favorites successfully" });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;
