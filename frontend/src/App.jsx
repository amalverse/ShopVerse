import React, { useEffect } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./redux/features/cart/cartSlice";
import { BASE_URL } from "./utils/baseURL";
import Chatbot from "./components/Chatbot";
import useScrollToTop from "./hooks/useScrollToTop";
import { setUser } from "./redux/features/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useScrollToTop();

  useEffect(() => {
    // Check for tokens in the URL (Google Auth case)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      const fetchUserData = async () => {
        try {
          const res = await fetch(`${BASE_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const data = await res.json();
            // Automatically log the user in Redux
            dispatch(setUser({ ...data.user, token }));
            // Remove token from address bar for clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
          }
        } catch (error) {
          console.error("Error fetching user from URL token:", error);
        }
      };
      fetchUserData();
    }

    const fetchCart = async () => {
      if (!user) {
        dispatch(setCart([]));
        return;
      }
      try {
        const res = await fetch(`${BASE_URL}/api/cart`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          dispatch(setCart(data));
        }
      } catch (err) {
        console.error("Error fetching cart from DB:", err);
      }
    };
    fetchCart();
  }, [dispatch, user]);

  console.log("App: Rendering layout...");

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Chatbot />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default App;
