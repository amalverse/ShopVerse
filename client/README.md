# 🛒 ShopVerse Frontend

Welcome to the **Frontend** repository of **ShopVerse**, a modern full-stack e-commerce application. This project is built using React, Vite, Redux Toolkit, and Tailwind CSS. It provides a seamless user experience for browsing products, managing a cart, and checking out.

---

## 🚀 Technologies Used

- **Framework:** React.js 19
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **State Management:** Redux Toolkit & RTK Query
- **Routing:** React Router DOM v7
- **Payment Integration:** Stripe (React Stripe.js)
- **Icons:** React Icons
- **Notifications:** React Toastify

---

## 📁 Folder Structure

```
frontend/
├── src/
│   ├── assets/       # Static assets like images and logos
│   ├── components/   # Reusable UI components (Navbar, Footer, ProductCards, etc.)
│   ├── data/         # Dummy or static data files
│   ├── pages/        # Main route pages (Home, Shop, Cart, Dashboard, etc.)
│   ├── redux/        # Redux store and API slices (RTK Query)
│   ├── routers/      # Route definitions
│   ├── utils/        # Utility functions (e.g., base URL configuration)
│   ├── App.jsx       # Main application component
│   ├── index.css     # Global styles and Tailwind configuration
│   └── main.jsx      # Entry point for the React app
├── .env              # Environment variables
├── package.json      # Dependencies and scripts
└── vite.config.js    # Vite configuration
```

---

## 🛠️ Setup & Local Development

Follow these steps to run the frontend application locally:

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root of the `frontend` directory and add your backend API URL. By default, the local backend runs on port `3000`.
   ```ini
   VITE_BASE_URL=http://localhost:3000
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

5. **Build for production:**
   ```bash
   npm run build
   ```
   The generated static files will be in the `dist` folder.

---

## 🌟 Key Features

- **Dynamic Product Browsing:** View categorised products and individual product details.
- **Cart Management:** Add, remove, and update the quantity of items in the cart.
- **Authentication:** Login and registration forms synced with the backend API.
- **State Persistence:** Efficient API data caching and state management using RTK Query.
- **Responsive Design:** Fully mobile-responsive interface utilizing standard Tailwind CSS utility classes.
- **Checkout Process:** Integrated with Stripe for secure payments.

---

## 🌐 Deployment (Netlify)

Deploying the ShopVerse frontend to Netlify is quick and seamless.

1. **Push to GitHub**: Ensure your `client` folder is pushed to a GitHub repository.
2. **Connect to Netlify**: Log in to Netlify and click "Import from Git".
3. **Configure Build Settings**:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. **Environment Variables**: Add your backend API URL in Netlify's Environment Variables section:
   - `VITE_BASE_URL` = `https://your-backend-url.onrender.com`
   - `VITE_STRIPE_PUBLISHABLE_KEY` = `your_stripe_public_key`
5. **Deploy**: Click "Deploy Site". Netlify will automatically build and publish your Vite React app.
6. **Redirects (Important)**: Vite SPAs require a `_redirects` file or netlify.toml for routing. Ensure you have a `public/_redirects` file containing `/* /index.html 200` to prevent 404 errors on page refresh.
