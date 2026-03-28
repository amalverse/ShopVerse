# 🛒 ShopVerse Backend

Welcome to the **Backend** repository of **ShopVerse**, a robust full-stack e-commerce API. This project is built with Node.js, Express, and MongoDB. It handles user authentication, product management, order processing, and includes full Swagger API documentation.

---

## 🚀 Technologies Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & Bcrypt
- **API Documentation:** Swagger UI Express & Swagger JSDoc
- **Payment Processing:** Stripe Node.js Library
- **Logging:** Morgan (HTTP) & Winston (Application)
- **Validation:** Express-Validator
- **Testing:** Jest & Supertest
- **Others:** CORS, Body-Parser, Cookie-Parser, Dotenv

---

## 📁 Folder Structure

```
backend/
├── src/
│   ├── cart/         # Cart routes, controllers, and models
│   ├── favorites/    # User favorites/wishlist logic
│   ├── middleware/   # Custom middlewares (e.g., generateToken, verifyAdmin)
│   ├── orders/       # Ordering process and Stripe integration
│   ├── products/     # Products management
│   ├── reviews/      # Product reviews and rating logic
│   ├── swagger/      # Swagger OpenAPI specifications
│   ├── users/        # User authentication and management
│   └── utils/        # Utility classes (e.g., logger)
├── tests/            # Automated API tests (Jest & Supertest)
├── .env.example      # Example environment variables file
├── app.js            # Express app configuration & middlewares
├── index.js          # Server entry point and DB connection
└── package.json      # Dependencies and scripts
```

---

## 🛠️ Setup & Local Development

Follow these steps to run the backend API locally:

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Rename `.env.example` to `.env` or create a new `.env` file in the root of the `backend` directory. Populate it with your credentials:
   ```ini
   DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/shopverse
   PORT=3000
   NODE_ENV=development
   JWT_SECRET_KEY=your_super_secret_jwt_key
   CLIENT_URL=http://localhost:5173
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret
   ```

4. **Start the server (Development Mode):**
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:3000` using nodemon for automatic restarts.

5. **Start the server (Production Mode):**
   ```bash
   npm start
   ```

---

## 📖 API Documentation

The backend includes dynamic Swagger documentation that allows you to explore and test the API endpoints visually.

Once the server is running, navigate to:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

This interactive dashboard details all routes for:
- **Authentication (`/api/auth`)**
- **Products (`/api/products`)**
- **Cart (`/api/cart`)**
- **Favorites (`/api/favorites`)**
- **Orders (`/api/orders`)**
- **Reviews (`/api/reviews`)**

---

## 🌟 Key Features

- **User Authentication:** Secure registration and login using JWT stored in cookies.
- **Role-Based Access Control:** Built-in middleware to protect admin-only routes.
- **RESTful API Architecture:** Modular route and controller design for clean maintainability.
- **Stripe Integration:** Backend handlers for processing secure payments.
- **Detailed API Docs:** Ready-to-use Swagger documentation to facilitate frontend development.
- **Robust Validation:** Integrated `express-validator` to ensure all incoming data is clean and valid.
- **Advanced Logging:** Comprehensive HTTP and application logs using `Morgan` and `Winston`.
- **Automated Testing:** Pre-configured `Jest` and `Supertest` suites for reliable API testing.

---

## 🌐 Deployment (Render)

Render is the recommended platform for hosting this API.

1. Connect your repository to Render and create a **Web Service**.
2. **Build Settings**:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. **Environment Setup**: Add all necessary Environment Variables from `.env.example` (`DB_URL`, `JWT_SECRET_KEY`, `STRIPE_SECRET_KEY`, `GEMINI_API_KEY`).
4. Set `CLIENT_URL` to your production frontend URL (e.g., `https://your-shopverse.netlify.app`) to ensure CORS works smoothly.

---

## 🧪 Running Tests

To execute the automated test suite, run:
```bash
npm test
```
This will run all `.test.js` files using Jest and provide a detailed report of the API's health and validation logic.
