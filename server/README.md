# 🛒 ShopVerse — Backend API

Welcome to the **Backend** architecture of **ShopVerse**. This is a robust, modular, and scalable RESTful API built with **Node.js**, **Express**, and **MongoDB**.

---

## 🚀 Key Technologies

- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/) (v5)
- **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **AI Integration:** [Google Gemini API](https://ai.google.dev/)
- **Documentation:** [Swagger/OpenAPI](https://swagger.io/)
- **Security:** JWT, Bcrypt, and Helmet
- **Payments:** [Stripe API](https://stripe.com/docs/api)
- **Logging:** Winston & Morgan

---

## 📁 Directory Structure

```bash
server/
├── src/
│   ├── modules/      # Business logic by domain (Auth, Product, Orders)
│   ├── middleware/   # Authentication, RBAC, and error handlers
│   ├── config/       # Database and environment configurations
│   ├── swagger/      # OpenAPI specification files
│   └── utils/        # Logger and helper classes
├── tests/            # Integration and unit tests (Jest)
├── .env.example      # Template for environment variables
├── app.js            # Express application setup
└── index.js          # Server entry point
```

---

## 🛠️ Local Development

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
   Provide your values for `DB_URL`, `JWT_SECRET_KEY`, `STRIPE_SECRET_KEY`, and `GEMINI_API_KEY`.

4. **Launch Server:**
   ```bash
   npm run dev
   ```
   The API will be live at: `http://localhost:5000`

---

## 📖 API Documentation

Explore and test the API directly via the interactive Swagger dashboard:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

---

## 🌟 Key Features

- **Gemini AI Integration** — Contextual product data processing for the chatbot.
- **Secure Auth** — Multi-role authentication (User/Admin) using JWT cookies.
- **Stripe Webhooks** — (Optional/Planned) or secure checkout session handlers.
- **Automated Logging** — Centralized logging with rotation for production stability.
- **API Versioning** — Modular structure prepared for future versioning.

---

## 🌐 Deployment (Render/Vercel)

1. **Root Directory**: `server`
2. **Build Command**: `npm install`
3. **Start Command**: `npm start`
4. **Environment Variables**: Populate all keys from `.env.example`.
5. **CORS**: Ensure `CLIENT_URL` matches your production frontend.

---

<p align="center">
  Part of the <b>ShopVerse</b> ecosystem.
</p>

## 🧪 Running Tests

To execute the automated test suite, run:
```bash
npm test
```
This will run all `.test.js` files using Jest and provide a detailed report of the API's health and validation logic.
