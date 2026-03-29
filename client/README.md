# 🛒 ShopVerse — Frontend

Welcome to the **Frontend** repository of **ShopVerse**. This is a high-performance, responsive e-commerce interface built using **React 19** and **Tailwind CSS v4**.

---

## 🚀 Key Technologies

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) & RTK Query
- **Routing:** [React Router 7](https://reactrouter.com/)
- **Payments:** [Stripe React SDK](https://stripe.com/docs/stripe-js/react)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)
- **Toast:** [React Toastify](https://fkhadra.github.io/react-toastify/introduction/)

---

## 📁 Directory Structure

```bash
client/
├── src/
│   ├── assets/       # Images, logos, and global styles
│   ├── components/   # Reusable UI components (Navbar, Footer, Modals)
│   ├── pages/        # Main route views (Home, Shop, Account)
│   ├── redux/        # Store configuration and API slices
│   ├── routers/      # Application routing definitions
│   ├── utils/        # Axios config and helper functions
│   ├── App.jsx       # Root component
│   └── main.jsx      # Entry point
├── .env.example      # Template for environment variables
└── vercel.json      # Platform deployment configuration
```

---

## 🛠️ Local Development

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `client/` root:
   ```ini
   VITE_API_BASE_URL=http://localhost:5000
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
   ```

4. **Launch Dev Server:**
   ```bash
   npm run dev
   ```
   Access the app at: `http://localhost:5173`

---

## 🌟 Features

- **Blazing Fast Build** — Powered by Vite and Tailwind v4 engine.
- **Responsive Layout** — Mobile-first design for all screen sizes.
- **Real-time State** — RTK Query for automatic cache management and synchronization.
- **Secure Checkout** — Integrated Stripe elements for PCI-compliant payments.
- **Dynamic Filtering** — Client-side and server-assisted product filtering.

---

## 🌐 Deployment (Vercel)

1. **Connect** your repository to Vercel.
2. **Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. **Environment Variables**: Add `VITE_API_BASE_URL` and `VITE_STRIPE_PUBLISHABLE_KEY`.
4. **Deploy**.

---

<p align="center">
  Part of the <b>ShopVerse</b> ecosystem.
</p>
