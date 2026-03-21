import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useConfirmPaymentMutation } from "../../redux/features/orders/ordersApi";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { FiCheckCircle, FiArrowRight, FiShoppingBag } from "react-icons/fi";

const PaymentSuccess = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [confirmPayment] = useConfirmPaymentMutation();
  const confirmed = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const session_id = params.get("session_id");

    if (session_id && !confirmed.current) {
      confirmed.current = true;
      confirmPayment(session_id)
        .unwrap()
        .then(() => {
          dispatch(clearCart());
        })
        .catch((err) => {
          console.error("Failed to confirm payment:", err);
        });
    }
  }, [location.search, confirmPayment, dispatch]);

  return (
    <div className="bg-[#F8FAFC] min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-indigo-100/20 text-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10">
          <div className="w-24 h-24 bg-emerald-100/50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100">
            <FiCheckCircle className="w-12 h-12" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-sans tracking-tight mb-4">
             Order Confirmed!
          </h1>
          
          <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-sm mx-auto">
             Thank you for shopping with us. Your payment has been processed successfully and your items are now being prepared for delivery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard/user/orders"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 group"
            >
              Track Order
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/shop"
              className="flex-1 bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-100 font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <FiShoppingBag />
              Continue Shopping
            </Link>
          </div>
          
          <p className="mt-10 text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             Safe & Secure Transaction
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
