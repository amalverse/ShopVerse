import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import CartPage from "../pages/shop/CartPage";
import FavoritesPage from "../pages/shop/FavoritesPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import VerifyEmail from "../components/auth/VerifyEmail";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import Contact from "../components/Contact";
import BlogPage from "../pages/blog/BlogPage";
import SingleBlogPage from "../pages/blog/SingleBlogPage";
import PaymentSuccess from "../pages/shop/PaymentSuccess";
import PaymentCancel from "../pages/shop/PaymentCancel";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import DashboardHome from "../pages/dashboard/DashboardHome";
import UserOrders from "../pages/dashboard/user/UserOrders";
import UserProfile from "../pages/dashboard/user/UserProfile";
import ManageOrders from "../pages/dashboard/admin/ManageOrders";
import ManageProducts from "../pages/dashboard/admin/ManageProducts";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import AdminProfile from "../pages/dashboard/admin/AdminProfile";

import OurStory from "../pages/info/OurStory";
import JoinOurTeam from "../pages/info/JoinOurTeam";
import TermsAndConditions from "../pages/info/TermsAndConditions";
import SupportCenter from "../pages/info/SupportCenter";
import WhatWeOffer from "../pages/info/WhatWeOffer";
import HelpAndFAQ from "../pages/info/HelpAndFAQ";
import PaymentMethods from "../pages/info/PaymentMethods";
import MoneyBackGuarantee from "../pages/info/MoneyBackGuarantee";
import ReturnsAndExchanges from "../pages/info/ReturnsAndExchanges";
import ShippingInformation from "../pages/info/ShippingInformation";
import PrivacyPolicy from "../pages/info/PrivacyPolicy";

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
