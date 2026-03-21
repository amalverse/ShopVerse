const logger = require("../utils/logger");
const express = require("express");
const Product = require("./products.model");
const router = express.Router();
const Review = require("../reviews/reviews.model");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

// Post a Product
router.post("/create-products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    // Calculate average review rating for this product right when it's created
    const reviews = await Review.find({ productId: savedProduct._id });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      savedProduct.rating = averageRating;
      
      // Save the calculated rating
      await savedProduct.save();
    }
    
    // Send success response back with the new product info
    res
      .status(201)
      .send({ message: "Product added successfully!", savedProduct });
  } catch (error) {
    logger.error("Error adding new product", { stack: error.stack });
    res.status(500).send({ message: "Failed to create new product" });
  }
});

// Get all Products
router.get("/", async (req, res) => {
  try {
    const {
      category,
      color,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    // Parse to integers — req.query values are always strings
    const pageInt = parseInt(page, 10) || 1;
    const limitInt = parseInt(limit, 10) || 10;

    // --- Filter logic ---
    let filter = {};

    if (category && category !== "all") filter.category = category;
    if (color && color !== "all") filter.color = color;

    // Filter by Min and Max Price if provided
    if (minPrice || maxPrice) {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      filter.price = {};
      if (!isNaN(min)) filter.price.$gte = min; // price >= min
      if (!isNaN(max)) filter.price.$lte = max; // price <= max
    }

    // --- Pagination setup ---
    const skip = (pageInt - 1) * limitInt;  // How many items to skip
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limitInt);

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitInt)
      .populate("author", "name email");
    res.status(200).send({
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: pageInt,
      },
    });
  } catch (error) {
    logger.error("Error Fetching products", { stack: error.stack });
    res.status(500).send({ message: "Error Fetching products" });
  }
});

//Get related products
router.get("/related/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).send({ message: "Product ID is required" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Create a regular expression to match similar product names 
    // Ignore small words and make it case-insensitive
    const titleRegex = new RegExp(
      product.name.split(" ").filter((word) => word.length > 1).join("|"),
      "i"
    );
    
    // Find products that are similar based on title, category, or description
    // Exclude the current product from the results using $ne
    const relatedProducts = await Product.find({
      _id: { $ne: productId },
      $or: [
        { name: { $regex: titleRegex } }, 
        { category: product.category }, 
        { description: { $regex: titleRegex } }, 
      ],
    });
    res.status(200).send(relatedProducts);
  } catch (error) {
    logger.error("Error fetching related products", { stack: error.stack });
    res.status(500).send({ message: "Error fetching related products" });
  }
});

// Get a Product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate(
      "author",
      "name email",
    );
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    //calculate reviews
    const reviews = await Review.find({ productId }).populate(
      "userId",
      "username email",
    );
    if (reviews.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0,
      );
      const averageRating = totalRating / reviews.length;
      product.rating = averageRating;
    }
    res.status(200).send({ product, reviews });
  } catch (error) {
    logger.error("Error Fetching product", { stack: error.stack });
    res.status(500).send({ message: "Error Fetching product" });
  }
});

//Update a Product
router.patch(
  "/update-product/:id",
  verifyToken,
  verifyAdmin,
  async (req, res) => {
    try {
      const productId = req.params.id;
      const updates = req.body;
      const product = await Product.findByIdAndUpdate(productId, updates, {
        new: true,
      });
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      res
        .status(200)
        .send({ message: "Product updated successfully", product });
    } catch (error) {
      logger.error("Error updating product", { stack: error.stack });
      res.status(500).send({ message: "Failed to update product" });
    }
  },
);

// Delete a Product
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    
    // Clean up! Also delete reviews associated with this product
    // so we don't end up with ghost reviews
    await Review.deleteMany({ productId: productId });
    
    res.status(200).send({ message: "Product deleted successfully" });
  } catch (error) {
    logger.error("Error deleting product", { stack: error.stack });
    res.status(500).send({ message: "Failed to delete product" });
  }
});

module.exports = router;
