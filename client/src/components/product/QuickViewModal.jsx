import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  if (!product) return null;

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl glass-modal rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full glass hover:bg-white transition shadow-lg"
            >
              <HiOutlineXMark className="text-xl" />
            </button>

            {/* Left: Image */}
            <div className="md:w-1/2 h-[300px] md:h-auto overflow-hidden bg-slate-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: Info */}
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col h-full overflow-y-auto bg-white/40">
              <div className="mb-2">
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">
                  {product.category}
                </span>
              </div>
              
              <h2 className="text-3xl font-black font-sans text-slate-800 mb-4 leading-tight">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mb-6">
                <RatingStars rating={product.rating} />
                <span className="text-sm font-bold text-slate-400">({product.rating} / 5.0)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-black text-indigo-600 font-sans">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-lg text-slate-400 line-through font-medium">${product.oldPrice}</span>
                )}
              </div>

              <div className="space-y-4 mb-10">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {product.description || "Indulge in our premium quality product, crafted with the finest materials to ensure lasting comfort and unmatched style. Perfect for those who value both elegance and durability."}
                </p>
              </div>

              <div className="mt-auto flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200 translate-y-0 active:translate-y-1"
                >
                  <HiOutlineShoppingBag className="text-xl" />
                  Add to Cart
                </button>
                <button className="p-4 rounded-2xl border border-slate-200 text-slate-600 hover:text-red-500 hover:bg-red-50 transition-all">
                  <HiOutlineHeart className="text-xl" />
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  ✈ Free Shipping on orders over $150
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
