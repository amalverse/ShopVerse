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

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useScrollToTop();

  useEffect(() => {
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
