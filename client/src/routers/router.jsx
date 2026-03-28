/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Lazy loading components for better performance
const Home = lazy(() => import("../pages/home/Home"));
const CategoryPage = lazy(() => import("../pages/category/CategoryPage"));
const Search = lazy(() => import("../pages/search/Search"));
const ShopPage = lazy(() => import("../pages/shop/ShopPage"));
const CartPage = lazy(() => import("../pages/shop/CartPage"));
const FavoritesPage = lazy(() => import("../pages/shop/FavoritesPage"));
const SingleProduct = lazy(() => import("../pages/shop/productDetails/SingleProduct"));
const Login = lazy(() => import("../components/auth/Login"));
const Register = lazy(() => import("../components/auth/Register"));
const VerifyEmail = lazy(() => import("../components/auth/VerifyEmail"));
const ForgotPassword = lazy(() => import("../components/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../components/auth/ResetPassword"));
const Contact = lazy(() => import("../components/Contact"));
const BlogPage = lazy(() => import("../pages/blog/BlogPage"));
const SingleBlogPage = lazy(() => import("../pages/blog/SingleBlogPage"));
const PaymentSuccess = lazy(() => import("../pages/shop/PaymentSuccess"));
const PaymentCancel = lazy(() => import("../pages/shop/PaymentCancel"));
const DashboardLayout = lazy(() => import("../pages/dashboard/DashboardLayout"));
const DashboardHome = lazy(() => import("../pages/dashboard/DashboardHome"));
const UserOrders = lazy(() => import("../pages/dashboard/user/UserOrders"));
const UserProfile = lazy(() => import("../pages/dashboard/user/UserProfile"));
const ManageOrders = lazy(() => import("../pages/dashboard/admin/ManageOrders"));
const ManageProducts = lazy(() => import("../pages/dashboard/admin/ManageProducts"));
const ManageUsers = lazy(() => import("../pages/dashboard/admin/ManageUsers"));
const AdminProfile = lazy(() => import("../pages/dashboard/admin/AdminProfile"));

const OurStory = lazy(() => import("../pages/info/OurStory"));
const JoinOurTeam = lazy(() => import("../pages/info/JoinOurTeam"));
const TermsAndConditions = lazy(() => import("../pages/info/TermsAndConditions"));
const SupportCenter = lazy(() => import("../pages/info/SupportCenter"));
const WhatWeOffer = lazy(() => import("../pages/info/WhatWeOffer"));
const HelpAndFAQ = lazy(() => import("../pages/info/HelpAndFAQ"));
const PaymentMethods = lazy(() => import("../pages/info/PaymentMethods"));
const MoneyBackGuarantee = lazy(() => import("../pages/info/MoneyBackGuarantee"));
const ReturnsAndExchanges = lazy(() => import("../pages/info/ReturnsAndExchanges"));
const ShippingInformation = lazy(() => import("../pages/info/ShippingInformation"));
const PrivacyPolicy = lazy(() => import("../pages/info/PrivacyPolicy"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/categories/:categoryName", element: <CategoryPage /> },
      { path: "/search", element: <Search /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/favorites", element: <FavoritesPage /> },
      { path: "/shop/:id", element: <SingleProduct /> },
      { path: "/contact", element: <Contact /> },
      { path: "/blog", element: <BlogPage /> },
      { path: "/blog/:id", element: <SingleBlogPage /> },
      { path: "/success", element: <PaymentSuccess /> },
      { path: "/cancel", element: <PaymentCancel /> },
      { path: "/about", element: <OurStory /> },
      { path: "/work-with-us", element: <JoinOurTeam /> },
      { path: "/terms", element: <TermsAndConditions /> },
      { path: "/help", element: <SupportCenter /> },
      { path: "/services", element: <WhatWeOffer /> },
      { path: "/faq", element: <HelpAndFAQ /> },
      { path: "/payment-methods", element: <PaymentMethods /> },
      { path: "/money-back", element: <MoneyBackGuarantee /> },
      { path: "/returns", element: <ReturnsAndExchanges /> },
      { path: "/shipping", element: <ShippingInformation /> },
      { path: "/privacy", element: <PrivacyPolicy /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-email/:token",
    element: <VerifyEmail />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <DashboardHome /> },
      { path: "admin/products", element: <ManageProducts /> },
      { path: "admin/orders", element: <ManageOrders /> },
      { path: "admin/users", element: <ManageUsers /> },
      { path: "admin/profile", element: <AdminProfile /> },
      { path: "user/orders", element: <UserOrders /> },
      { path: "profile", element: <UserProfile /> },
    ]
  }
]);

export default router;
