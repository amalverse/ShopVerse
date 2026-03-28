const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ShopVerse E-Commerce API",
      version: "1.0.0",
      description:
        "Complete REST API documentation for the ShopVerse full-stack e-commerce platform. " +
        "Covers authentication, products, reviews, orders, cart, and favourites.\n\n" +
        "**Authentication:** Most write / admin endpoints require a JWT Bearer token. " +
        "Obtain the token from `POST /api/auth/login` and pass it as `Authorization: Bearer <token>`.",
      contact: {
        name: "ShopVerse Dev Team",
        email: "admin@shopverse.com",
      },
    },
    servers: [
      {
        url: "/",
        description: "Dynamic API Server (Auto-detects host)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        // ─── User ────────────────────────────────────────────────────────
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "664abc123def456789012345" },
            username: { type: "string", example: "john_doe" },
            email: { type: "string", format: "email", example: "john@example.com" },
            role: { type: "string", enum: ["user", "admin"], example: "user" },
            profileImage: { type: "string", example: "https://example.com/avatar.png" },
            bio: { type: "string", maxLength: 200, example: "Loves online shopping." },
            profession: { type: "string", example: "Software Engineer" },
            address: {
              type: "object",
              properties: {
                street: { type: "string" },
                city: { type: "string" },
                state: { type: "string" },
                zip: { type: "string" },
                country: { type: "string" },
              },
            },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        // ─── Product ─────────────────────────────────────────────────────
        Product: {
          type: "object",
          required: ["name", "category", "price", "image", "author"],
          properties: {
            _id: { type: "string", example: "664abc123def456789012346" },
            name: { type: "string", example: "Wireless Noise-Cancelling Headphones" },
            category: {
              type: "string",
              enum: ["electronics", "mens-clothing", "womens-clothing", "jewellery", "accessories", "cosmetics"],
              example: "electronics",
            },
            description: { type: "string", example: "Premium over-ear headphones with ANC." },
            price: { type: "number", format: "float", example: 199.99 },
            oldPrice: { type: "number", format: "float", example: 249.99 },
            image: { type: "string", example: "https://example.com/headphones.jpg" },
            color: { type: "string", example: "black" },
            rating: { type: "number", format: "float", example: 4.5 },
            author: { type: "string", description: "User ID of the creator", example: "664abc123def456789012345" },
          },
        },

        ProductInput: {
          type: "object",
          required: ["name", "category", "price", "image", "author"],
          properties: {
            name: { type: "string", example: "Wireless Headphones" },
            category: { type: "string", example: "electronics" },
            description: { type: "string", example: "Great sound quality." },
            price: { type: "number", example: 199.99 },
            oldPrice: { type: "number", example: 249.99 },
            image: { type: "string", example: "https://example.com/headphones.jpg" },
            color: { type: "string", example: "black" },
            author: { type: "string", example: "664abc123def456789012345" },
          },
        },

        // ─── Review ──────────────────────────────────────────────────────
        Review: {
          type: "object",
          properties: {
            _id: { type: "string" },
            comment: { type: "string", example: "Absolutely love this product!" },
            rating: { type: "integer", minimum: 1, maximum: 5, example: 5 },
            userId: { type: "string", example: "664abc123def456789012345" },
            productId: { type: "string", example: "664abc123def456789012346" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        // ─── Order ───────────────────────────────────────────────────────
        Order: {
          type: "object",
          properties: {
            _id: { type: "string" },
            orderId: { type: "string", description: "Stripe PaymentIntent ID", example: "pi_3Nxyz..." },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  productId: { type: "string" },
                  quantity: { type: "integer" },
                },
              },
            },
            amount: { type: "number", example: 349.99 },
            email: { type: "string", example: "john@example.com" },
            status: {
              type: "string",
              enum: ["pending", "processing", "shipped", "completed"],
              example: "pending",
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },

        // ─── CartItem / Favorite ─────────────────────────────────────────
        CartItem: {
          type: "object",
          properties: {
            _id: { type: "string" },
            product: { $ref: "#/components/schemas/Product" },
            userId: { type: "string" },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        // ─── Pagination ──────────────────────────────────────────────────
        Pagination: {
          type: "object",
          properties: {
            totalProducts: { type: "integer", example: 27 },
            totalPages: { type: "integer", example: 4 },
            currentPage: { type: "integer", example: 1 },
          },
        },

        // ─── Generic Error ───────────────────────────────────────────────
        Error: {
          type: "object",
          properties: {
            message: { type: "string", example: "Something went wrong." },
          },
        },
      },
    },

    // ─── PATHS ─────────────────────────────────────────────────────────────
    paths: {
      // ══════════════════════════════════════════════════════════
      //  AUTH  /api/auth
      // ══════════════════════════════════════════════════════════
      "/api/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          description: "Creates a new user account. The role is always set to **user** regardless of the payload.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["username", "email", "password"],
                  properties: {
                    username: { type: "string", example: "john_doe" },
                    email: { type: "string", example: "john@example.com" },
                    password: { type: "string", example: "SecurePass@123" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "User registered successfully" },
            500: { description: "Error registering user", content: { "application/json": { schema: { $ref: "#/components/schemas/Error" } } } },
          },
        },
      },

      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login and obtain JWT",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", example: "admin@shopverse.com" },
                    password: { type: "string", example: "Admin@1234" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login successful – returns JWT token and user object",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: { type: "string" },
                      token: { type: "string" },
                      user: { $ref: "#/components/schemas/User" },
                    },
                  },
                },
              },
            },
            401: { description: "Invalid Password" },
            404: { description: "User not found" },
          },
        },
      },

      "/api/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "Logout – clears the auth cookie",
          responses: {
            200: { description: "Logged out successfully" },
          },
        },
      },

      "/api/auth/users": {
        get: {
          tags: ["Auth"],
          summary: "Get all users (Admin)",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "Array of users",
              content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/User" } } } },
            },
          },
        },
      },

      "/api/auth/users/{id}": {
        put: {
          tags: ["Auth"],
          summary: "Update user role (Admin)",
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { role: { type: "string", enum: ["user", "admin"] } },
                },
              },
            },
          },
          responses: {
            200: { description: "User role updated successfully" },
            404: { description: "User not found" },
          },
        },
        delete: {
          tags: ["Auth"],
          summary: "Delete a user (Admin)",
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "User deleted successfully" },
            404: { description: "User not found" },
          },
        },
      },

      "/api/auth/edit-profile": {
        patch: {
          tags: ["Auth"],
          summary: "Edit logged-in user profile",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["userId"],
                  properties: {
                    userId: { type: "string" },
                    username: { type: "string" },
                    profileImage: { type: "string" },
                    bio: { type: "string" },
                    profession: { type: "string" },
                    address: {
                      type: "object",
                      properties: {
                        street: { type: "string" },
                        city: { type: "string" },
                        state: { type: "string" },
                        zip: { type: "string" },
                        country: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Profile updated successfully", content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
            400: { description: "User ID missing or user not found" },
          },
        },
      },

      // ══════════════════════════════════════════════════════════
      //  PRODUCTS  /api/products
      // ══════════════════════════════════════════════════════════
      "/api/products": {
        get: {
          tags: ["Products"],
          summary: "Get all products (paginated + filtered)",
          parameters: [
            { name: "category", in: "query", schema: { type: "string" }, description: "Filter by category" },
            { name: "color", in: "query", schema: { type: "string" }, description: "Filter by color" },
            { name: "minPrice", in: "query", schema: { type: "number" }, description: "Minimum price" },
            { name: "maxPrice", in: "query", schema: { type: "number" }, description: "Maximum price" },
            { name: "page", in: "query", schema: { type: "integer", default: 1 } },
            { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
          ],
          responses: {
            200: {
              description: "Paginated product list",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      products: { type: "array", items: { $ref: "#/components/schemas/Product" } },
                      pagination: { $ref: "#/components/schemas/Pagination" },
                    },
                  },
                },
              },
            },
            500: { description: "Server error" },
          },
        },
      },

      "/api/products/create-products": {
        post: {
          tags: ["Products"],
          summary: "Create a new product (Admin)",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/ProductInput" } } },
          },
          responses: {
            201: { description: "Product added successfully", content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } } },
            500: { description: "Failed to create product" },
          },
        },
      },

      "/api/products/related/{id}": {
        get: {
          tags: ["Products"],
          summary: "Get related products by product ID",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Array of related products", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Product" } } } } },
            400: { description: "Product ID required" },
            404: { description: "Product not found" },
          },
        },
      },

      "/api/products/{id}": {
        get: {
          tags: ["Products"],
          summary: "Get a single product by ID",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: {
              description: "Product and its reviews",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      product: { $ref: "#/components/schemas/Product" },
                      reviews: { type: "array", items: { $ref: "#/components/schemas/Review" } },
                    },
                  },
                },
              },
            },
            404: { description: "Product not found" },
          },
        },
        delete: {
          tags: ["Products"],
          summary: "Delete a product by ID (Authenticated)",
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Product deleted successfully" },
            404: { description: "Product not found" },
          },
        },
      },

      "/api/products/update-product/{id}": {
        patch: {
          tags: ["Products"],
          summary: "Update a product (Admin)",
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/ProductInput" } } },
          },
          responses: {
            200: { description: "Product updated successfully", content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } } },
            404: { description: "Product not found" },
          },
        },
      },

      // ══════════════════════════════════════════════════════════
      //  REVIEWS  /api/reviews
      // ══════════════════════════════════════════════════════════
      "/api/reviews/post-review": {
        post: {
          tags: ["Reviews"],
          summary: "Post or update a product review",
          description: "If the user has already reviewed the product, the existing review is updated instead of creating a duplicate.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["comment", "rating", "productId", "userId"],
                  properties: {
                    comment: { type: "string", example: "Great product!" },
                    rating: { type: "integer", minimum: 1, maximum: 5, example: 4 },
                    productId: { type: "string", example: "664abc123def456789012346" },
                    userId: { type: "string", example: "664abc123def456789012345" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Review processed successfully" },
            400: { description: "All fields are required" },
            404: { description: "Product not found" },
          },
        },
      },

      "/api/reviews/total-reviews": {
        get: {
          tags: ["Reviews"],
          summary: "Get total number of reviews",
          responses: {
            200: {
              description: "Total review count",
              content: { "application/json": { schema: { type: "object", properties: { totalReviews: { type: "integer" } } } } },
            },
          },
        },
      },

      "/api/reviews/{userId}": {
        get: {
          tags: ["Reviews"],
          summary: "Get all reviews by a specific user",
          parameters: [{ name: "userId", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Array of reviews", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Review" } } } } },
            404: { description: "No reviews found" },
          },
        },
      },

      // ══════════════════════════════════════════════════════════
      //  ORDERS  /api/orders
      // ══════════════════════════════════════════════════════════
      "/api/orders/create-checkout-session": {
        post: {
          tags: ["Orders"],
          summary: "Create a Stripe checkout session",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          name: { type: "string" },
                          image: { type: "string" },
                          price: { type: "number" },
                          quantity: { type: "integer" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Stripe session created",
              content: { "application/json": { schema: { type: "object", properties: { id: { type: "string" }, url: { type: "string" } } } } },
            },
            500: { description: "Failed to create checkout session" },
          },
        },
      },

      "/api/orders/confirm-payment": {
        post: {
          tags: ["Orders"],
          summary: "Confirm payment and persist order",
          requestBody: {
            required: true,
            content: { "application/json": { schema: { type: "object", properties: { session_id: { type: "string" } } } } },
          },
          responses: {
            200: { description: "Order confirmed", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } },
            500: { description: "Failed to confirm payment" },
          },
        },
      },

      "/api/orders": {
        get: {
          tags: ["Orders"],
          summary: "Get all orders (Admin)",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Array of orders", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Order" } } } } },
            404: { description: "No orders found" },
          },
        },
      },

      "/api/orders/{email}": {
        get: {
          tags: ["Orders"],
          summary: "Get orders by customer email",
          parameters: [{ name: "email", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Orders for the email", content: { "application/json": { schema: { type: "object", properties: { orders: { type: "array", items: { $ref: "#/components/schemas/Order" } } } } } } },
            400: { description: "No orders found" },
          },
        },
      },

      "/api/orders/order/{id}": {
        get: {
          tags: ["Orders"],
          summary: "Get a single order by MongoDB ID",
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Order object", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } },
            404: { description: "Order not found" },
          },
        },
      },

      "/api/orders/update-order-status/{id}": {
        patch: {
          tags: ["Orders"],
          summary: "Update order status (Admin)",
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["status"],
                  properties: {
                    status: { type: "string", enum: ["pending", "processing", "shipped", "completed"] },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Order status updated" },
            400: { description: "Status is required" },
            404: { description: "Order not found" },
          },
        },
      },

      "/api/orders/delete-order/{id}": {
        delete: {
          tags: ["Orders"],
          summary: "Delete an order (Admin)",
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Order deleted successfully" },
            404: { description: "Order not found" },
          },
        },
      },

      // ══════════════════════════════════════════════════════════
      //  CART  /api/cart
      // ══════════════════════════════════════════════════════════
      "/api/cart": {
        get: {
          tags: ["Cart"],
          summary: "Get all cart items for the logged-in user",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Array of product objects in the cart", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Product" } } } } },
          },
        },
        post: {
          tags: ["Cart"],
          summary: "Add a product to the cart",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } },
          },
          responses: {
            200: { description: "Product added to cart" },
            400: { description: "Product is already in cart" },
          },
        },
      },

      "/api/cart/{id}": {
        delete: {
          tags: ["Cart"],
          summary: "Remove a product from the cart by product ID",
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, description: "Product _id", schema: { type: "string" } }],
          responses: {
            200: { description: "Product removed from cart" },
            404: { description: "Cart item not found" },
          },
        },
      },

      // ══════════════════════════════════════════════════════════
      //  FAVORITES  /api/favorites
      // ══════════════════════════════════════════════════════════
      "/api/favorites": {
        get: {
          tags: ["Favorites"],
          summary: "Get all favourites for the logged-in user",
          security: [{ bearerAuth: [] }],
          responses: {
            200: { description: "Array of favourite product objects", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Product" } } } } },
          },
        },
        post: {
          tags: ["Favorites"],
          summary: "Add a product to favourites",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } },
          },
          responses: {
            200: { description: "Product added to favourites" },
            400: { description: "Product is already in favourites" },
          },
        },
      },

      "/api/favorites/{id}": {
        delete: {
          tags: ["Favorites"],
          summary: "Remove a product from favourites by product ID",
          security: [{ bearerAuth: [] }],
          parameters: [{ name: "id", in: "path", required: true, description: "Product _id", schema: { type: "string" } }],
          responses: {
            200: { description: "Product removed from favourites" },
            404: { description: "Favourite not found" },
          },
        },
      },

      // ══════════════════════════════════════════════════════════
      //  CHATBOT  /api/chat
      // ══════════════════════════════════════════════════════════
      "/api/chat": {
        post: {
          tags: ["Chatbot"],
          summary: "Interact with the AI E-Commerce Assistant",
          description: "Send a message to the Gemini AI chatbot. Provides conversational memory and context-aware product recommendations.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["message"],
                  properties: {
                    message: { type: "string", example: "Can you recommend some good headphones?" },
                    history: { 
                      type: "array", 
                      items: {
                        type: "object",
                        properties: {
                          role: { type: "string", enum: ["user", "bot"] },
                          text: { type: "string" }
                        }
                      }
                    },
                    pageContext: { type: "string", example: "User is viewing the cart." }
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "AI structured response",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      reply: { type: "string", example: "Sure! Check out our premium noise-cancelling headphones." },
                      products: { type: "array", items: { $ref: "#/components/schemas/Product" } }
                    }
                  }
                }
              }
            },
            400: { description: "Message is required" },
            500: { description: "API Key logic failed" }
          }
        }
      }
    },

    tags: [
      { name: "Auth", description: "User registration, login, logout, and profile management" },
      { name: "Products", description: "Product CRUD with filtering and pagination" },
      { name: "Reviews", description: "Product review submission and retrieval" },
      { name: "Orders", description: "Stripe checkout, order persistence, and status management" },
      { name: "Cart", description: "Per-user shopping cart operations" },
      { name: "Favorites", description: "Per-user saved / favourited products" },
      { name: "Chatbot", description: "Google Gemini AI conversational agent" }
    ],
  },
  apis: [], // All paths defined inline above; no JSDoc scanning needed
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
