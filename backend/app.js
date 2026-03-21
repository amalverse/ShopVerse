const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/swagger/swagger");
const morgan = require("morgan");
const logger = require("./src/utils/logger");

const app = express();

// --- HTTP Request Logging ---
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

// --- Built-in & Third party Middlewares ---
// Setting limits so we can upload base64 images without crashing
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Parse cookies from request headers
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- CORS Configuration ---
// Setting up CORS so frontend can talk to backend without errors
const clientURL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: clientURL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// --- Routes Import ---
// Importing all our custom routes for different features
const authRoute = require("./src/users/user.route");
const productRoutes = require("./src/products/products.route");
const reviewRoutes = require("./src/reviews/reviews.route");
const orderRoutes = require("./src/orders/orders.route");
const cartRoutes = require("./src/cart/cart.route");
const favoritesRoutes = require("./src/favorites/favorites.route");
const Product = require("./src/products/products.model");

// Binding routes to specific paths
app.use("/api/auth", authRoute);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/cart", cartRoutes); // Legacy route, kept to avoid frontend breakage
app.use("/api/favorites", favoritesRoutes);
app.use("/favorites", favoritesRoutes);

// Chatbot Route
const chatRoute = require("./src/chat/chat.route");
app.use("/api/chat", chatRoute);

// --- Custom Product Root routes ---
// Just a simple route to get all products quickly 
app.get("/products", async (req, res) => {
  try {
     const products = await Product.find({});
     res.send(products);
  } catch (e) {
     res.status(500).send(e.message);
  }
});

// Fetch products based on category
app.get("/products/:category", async (req, res) => {
  try {
     const products = await Product.find({ category: req.params.category });
     res.send(products);
  } catch (e) {
     res.status(500).send(e.message);
  }
});

// Swagger API Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: "ShopVerse API Docs",
  customCss: `.swagger-ui .topbar { background-color: #FC3D57; } .swagger-ui .topbar-wrapper img { content: url(''); } .swagger-ui .topbar-wrapper::before { content: '🛒 ShopVerse API'; color: white; font-size: 1.2rem; font-weight: bold; }`,
  swaggerOptions: { persistAuthorization: true },
}));

// Home Route
app.get("/", (req, res) => {
  res.send("ShopVerse E-commerce Running! API docs at /api-docs");
});

module.exports = app;
