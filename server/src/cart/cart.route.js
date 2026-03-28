const express = require('express');
const Cart = require('./cart.model');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    try {
        const existingItem = await Cart.findOne({ 'product._id': req.body._id, userId: req.userId });
        if (existingItem) {
            return res.status(400).send({ message: "Product is already in cart!" });
        }
        const item = new Cart({ product: req.body, userId: req.userId });
        await item.save();
        res.status(200).send({ message: "Product added to cart successfully", item });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get('/', verifyToken, async (req, res) => {
    try {
        const items = await Cart.find({ userId: req.userId });
        // Returns array of Cart Products
        res.status(200).send(items.map(i => i.product));
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deletedCart = await Cart.findOneAndDelete({ 'product._id': req.params.id, userId: req.userId });
        if (!deletedCart) {
            return res.status(404).send({ message: "Cart item not found" });
        }
        res.status(200).send({ message: "Product removed from cart successfully" });
    } catch (e) {
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;
