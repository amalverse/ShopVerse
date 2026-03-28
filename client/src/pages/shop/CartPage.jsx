import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderSummary from "./OrderSummary";
import { BASE_URL } from "../../utils/baseURL";
import { updateQuantity, removeFromCart } from "../../redux/features/cart/cartSlice";

const CartPage = () => {
  const products = useSelector((state) => state.cart.products);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleQuantity = (type, id) => {
    dispatch(updateQuantity({ type, id }));
  };

  const handleRemove = async (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart(id));
    if (user) {
      try {
        await fetch(`${BASE_URL}/api/cart/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } catch (err) {
        console.error("Error removing cart item from backend:", err);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold font-sans mb-1">Your Cart</h1>
          <p className="text-indigo-200 text-sm">
            Review your items and proceed to checkout.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left — Cart Items */}
          <div className="w-full lg:flex-1 space-y-4">
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="text-xl font-bold font-sans text-slate-700 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-slate-400 text-sm mb-6">
                  Looks like you haven't added anything yet.
                </p>
                <Link
                  to="/shop"
                  className="inline-block px-8 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Browse Shop
                </Link>
              </div>
            ) : (
              <>
                {/* Column headers */}
                <div className="hidden sm:grid grid-cols-12 text-xs font-bold text-slate-400 uppercase tracking-widest px-4 pb-1">
                  <span className="col-span-6">Product</span>
                  <span className="col-span-3 text-center">Quantity</span>
                  <span className="col-span-2 text-center">Price</span>
                  <span className="col-span-1" />
                </div>

                {products.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 grid grid-cols-12 gap-4 items-center"
                  >
                    {/* Image + Info */}
                    <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
                      <Link to={`/shop/${item._id}`} className="shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl border border-slate-100 hover:opacity-90 transition-opacity"
                        />
                      </Link>
                      <div>
                        <Link
                          to={`/shop/${item._id}`}
                          className="font-bold text-slate-800 font-sans text-sm hover:text-indigo-600 transition-colors leading-snug line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        {item.color && (
                          <p className="text-xs text-slate-400 mt-1 capitalize">
                            Color: {item.color}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-6 sm:col-span-3 flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleQuantity("decrement", item._id)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-700 rounded-full hover:bg-indigo-600 hover:text-white transition-colors font-bold text-lg leading-none"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold text-slate-800 text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantity("increment", item._id)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-700 rounded-full hover:bg-indigo-600 hover:text-white transition-colors font-bold text-lg leading-none"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <div className="col-span-5 sm:col-span-2 text-center">
                      <span className="font-bold text-slate-900 text-sm">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          ${Number(item.price).toFixed(2)} each
                        </p>
                      )}
                    </div>

                    {/* Remove */}
                    <div className="col-span-1 flex justify-center">
                      <button
                        onClick={(e) => handleRemove(e, item._id)}
                        title="Remove"
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

                {/* Continue shopping */}
                <div className="pt-2">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-1.5 text-sm text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Right — Order Summary */}
          <div className="w-full lg:w-96 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
