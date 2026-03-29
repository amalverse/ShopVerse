# 🛒 ShopVerse — Modern E-Commerce Platform

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v20-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?logo=mongodb)](https://www.mongodb.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

**ShopVerse** is a premium, full-stack e-commerce solution designed for speed, scalability, and elegance. Built with the **MERN** stack and enhanced with **Google Gemini AI**, it provides a complete shopping experience from product discovery to secure checkout.

---

## 📸 Project Showcase

> **Live Storefront**: [https://shopverse-five-liard.vercel.app](https://shopverse-five-liard.vercel.app)  
> **Backend API**: [https://shopverse-3zu8.onrender.com](https://shopverse-3zu8.onrender.com)  
> **Interactive API Docs**: [https://shopverse-3zu8.onrender.com/api-docs](https://shopverse-3zu8.onrender.com/api-docs)

<img width="1100" height="6696" alt="Home Page- Shopverse" src="https://github.com/user-attachments/assets/04881ece-fe1b-49b4-b6ee-ef86e61a8367" />

---

## ✨ Core Features

### 🛍️ Premium Shopping Experience
- **Fluid UI** — Modern, high-performance interface built with React 19 and Tailwind CSS v4.
- **Smart Search & Filtering** — Find products instantly by keyword or category.
- **Unified Cart** — Persistent shopping cart synchronized across sessions for logged-in users.
- **Secure Payments** — Seamless checkout integration powered by **Stripe**.
- **User Dashboard** — Personal order history and profile management.

### 🤖 Intelligent AI Assistance
- **AI Chatbot** — Powered by **Google Gemini API**.
- **Context-Aware** — Provides real-time answers about product availability and shop policies.
- **Seamless Integration** — Native chat experience built directly into the storefront.

### 🛡️ Secure Infrastructure
- **JWT Authentication** — Secure, token-based authentication with cookie persistence.
- **Role-Based Access (RBAC)** — Specialized dashboards for both regular customers and platform administrators.
- **Robust API** — Modular Express backend with comprehensive Swagger documentation.

---

## 🗂️ Project Architecture

```bash
ShopVerse/
├── client/           # React + Vite Frontend (Tailwind CSS v4)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level route views
│   │   ├── redux/       # Global state (Cart, Auth, API)
│   │   └── routers/     # Client-side routing logic
│   └── vercel.json      # Frontend deployment config
│
└── server/           # Node.js + Express Backend
    ├── src/
    │   ├── products/    # Product management (CRUD)
    │   ├── orders/      # Stripe payments & order logic
    │   ├── chat/        # Gemini AI integration
    │   └── common/      # Middlewares & utilities
    └── vercel.json      # Backend deployment config
```

---

## 🧰 Technology Stack

### Frontend Essentials
- **React 19** — Latest React features for optimal performance.
- **Vite** — Next-generation build tool.
- **Tailwind CSS v4** — Utility-first styling with the latest engine.
- **Redux Toolkit** — State management and RTK Query for data fetching.
- **React Router 7** — Robust client-side navigation.

### Backend Essentials
- **Node.js + Express** — High-performance RESTful API.
- **MongoDB + Mongoose** — Document-oriented database for flexible product schemas.
- **Stripe SDK** — Industrial-grade payment processing.
- **Google Gemini SDK** — Cutting-edge AI for conversational commerce.
- **Swagger/OpenAPI** — Fully documented API surface.

---
<img width="1366" height="2462" alt="Shop Page- ShopVerse" src="https://github.com/user-attachments/assets/284c986d-36f6-47df-96d2-ede4ce528863" />

<img width="1366" height="1740" alt="Cart Page- Shopverse" src="https://github.com/user-attachments/assets/96ccbc36-325c-4349-90ba-732af19666e9" />

<img width="1366" height="1742" alt="Wishlist Favs -Shopverse" src="https://github.com/user-attachments/assets/0abd9f05-24ae-4170-b076-d91bc4bc9083" />

<img width="1366" height="605" alt="ADMIN Dashboard- Shopverse" src="https://github.com/user-attachments/assets/a788916c-6821-46b9-b2d9-e10afe4173e4" />

<img width="1366" height="605" alt="user dashboard- shopverse" src="https://github.com/user-attachments/assets/b25548b7-b175-416a-9461-e107475ce465" />

<img width="439" height="470" alt="Chatbot- shopverse" src="https://github.com/user-attachments/assets/d9803b67-19fe-47df-9834-6e974347830b" />

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v20+)
- **NPM** or **Yarn**
- **MongoDB** (Local or Atlas instance)

### 1. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/ShopVerse.git
cd ShopVerse

# Install dependencies for both parts
cd server && npm install
cd ../client && npm install
```

### 2. Environment Configuration

**Backend (`server/.env`):**
```env
PORT=5000
DB_URL=your_mongodb_connection_uri
JWT_SECRET_KEY=your_jwt_secret
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret
GEMINI_API_KEY=your_gemini_api_key
```

**Frontend (`client/.env`):**
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
```

### 3. Execution
```bash
# Run Backend (from /server)
npm run dev

# Run Frontend (from /client)
npm run dev
```

---

## 🌐 Deployment Logic

### Backend (Render/Vercel)
- **Root Directory**: `server`
- **Build Command**: `npm install`
- **Output Directory**: (Not required for Node.js)
- **Environment Variables**: Ensure all `.env` keys are added to your hosting provider's dashboard.

### Frontend (Vercel/Netlify)
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Routing**: Ensure a `vercel.json` or `_redirects` file is used to handle SPA routing.

---

## 🤝 Contributing

1. **Fork** the project.
2. **Create** your feature branch: `git checkout -b feature/AmazingFeature`.
3. **Commit** your changes: `git commit -m 'Add some AmazingFeature'`.
4. **Push** to the branch: `git push origin feature/AmazingFeature`.
5. **Open** a Pull Request.

---

## 📄 License

Distributed under the **ISC License**. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <b>Amal Kishor</b>
</p>
---

## 👨‍💻 Author

**Amal Kishor**

---

> Built with ❤️ using React, Node.js, MongoDB, and Google Gemini AI.
