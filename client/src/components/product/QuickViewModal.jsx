import React from "react";
import { HiOutlineXMark, HiOutlineShoppingBag, HiOutlineHeart } from "react-icons/hi2";
import RatingStars from "../RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/baseURL";

const QuickViewModal = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const { user } = useSelector((state) => state.auth);

  if (!isOpen || !product) return null;

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!user) {
      toast.warning("Please login first to add to cart!");
      return;
    }
    const isExist = cartProducts.find((item) => item._id === product._id);
    if (isExist) {
        toast.warning("Product is already in the cart!");
        return;
    }
    dispatch(addToCart(product));
    try {
       await fetch(`${BASE_URL}/api/cart`, {
          method: "POST",
          headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`
          },
          body: JSON.stringify(product)
       });
       toast.success("Added to cart!");
    } catch(err) {
       console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] z-10 transition-all">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 hover:bg-white transition shadow-lg text-slate-500 hover:text-indigo-600"
        >
          <HiOutlineXMark className="text-xl" />
        </button>

        {/* Left: Image Container */}
        <div className="md:w-1/2 h-[300px] md:h-auto overflow-hidden bg-slate-50 border-r border-slate-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
        </div>

        {/* Right: Info Area */}
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col h-full overflow-y-auto bg-white">
          <div className="mb-4">
            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] bg-indigo-50 px-3 py-1.5 rounded-full">
              {product.category}
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-black font-sans text-slate-800 mb-2 leading-tight">
            {product.name}
          </h2>

          <div className="flex items-center gap-3 mb-6">
            <RatingStars rating={product.rating} />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-l border-slate-200 pl-3">
              {product.rating} Rating
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-8">
            <span className="text-4xl font-black text-indigo-600 font-sans tracking-tight">${product.price}</span>
            {product.oldPrice && (
              <span className="text-lg text-slate-400 line-through font-medium ml-1">${product.oldPrice}</span>
            )}
          </div>

          <div className="space-y-3 mb-10 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.1em]">Key Features</h4>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              {product.description || "Indulge in our premium quality product, crafted with the finest materials to ensure lasting comfort and unmatched style. Ideal for all seasons and settings."}
            </p>
          </div>

          <div className="mt-auto flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 hover:bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-100 active:scale-[0.98]"
            >
              <HiOutlineShoppingBag className="text-xl" />
              Add to Cart
            </button>
            <button className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all shadow-sm">
              <HiOutlineHeart className="text-xl" />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] flex items-center justify-center gap-2">
               Free Premium Shipping <span className="text-indigo-400">•</span> Easy Returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
