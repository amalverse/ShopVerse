import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag, FiHeart, FiTrash2 } from "react-icons/fi";
import RatingStars from "../RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice.js";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/baseURL";
import { motion } from "framer-motion";

const ProductCard = ({ product, isFavoritePage, onRemoveFavorite }) => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = async (product) => {
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

  const handleAddToFavorites = async (product) => {
     if (!user) {
        toast.warning("Please login first to add to favorites!");
        return;
     }

     try {
       const res = await fetch(`${BASE_URL}/api/favorites`, {
          method: "POST",
          headers: { 
             "Content-Type": "application/json",
             Authorization: `Bearer ${user.token}`
          },
          body: JSON.stringify(product)
       });
       if (res.status === 400) {
          toast.warning("Already in favourites!");
       } else if (res.ok) {
          toast.success("Added to favourites!");
       }
    } catch(err) {
       console.error("Error adding to favourites:", err);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 relative"
    >
      <div className="relative overflow-hidden aspect-[4/5] bg-slate-100">
        <Link to={`/shop/${product._id}`} className="block h-full w-full">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
          />
        </Link>
        
        {/* badges if needed, e.g. "Sale" or "New" can go here */}
        
        <div className="absolute top-4 right-[-60px] group-hover:right-4 flex flex-col gap-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
          {isFavoritePage ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onRemoveFavorite) onRemoveFavorite(product._id);
              }}
              className="bg-white/95 backdrop-blur-md p-3.5 text-slate-400 hover:text-red-500 rounded-2xl shadow-xl hover:bg-red-50 transition-all transform hover:rotate-6 border border-slate-100"
              title="Remove"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToFavorites(product);
              }}
              className="bg-white/95 backdrop-blur-md p-3.5 text-slate-400 hover:text-red-500 rounded-2xl shadow-xl hover:bg-red-50 transition-all transform hover:rotate-6 border border-slate-100"
              title="Add to Favourites"
            >
              <FiHeart className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product);
            }}
            className="bg-white/95 backdrop-blur-md p-3.5 text-slate-400 hover:text-indigo-600 rounded-2xl shadow-xl hover:bg-indigo-50 transition-all transform hover:-rotate-6 border border-slate-100"
            title="Add to Cart"
          >
            <FiShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
           <h4 className="font-sans text-base font-bold text-slate-800 truncate flex-1 group-hover:text-indigo-600 transition-colors">
             {product.name}
           </h4>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
           <RatingStars rating={product.rating} />
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">({product.rating})</span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-black text-slate-900 font-sans">${product.price}</span>
          {product.oldPrice && (
            <span className="text-xs text-slate-400 line-through">${product.oldPrice}</span>
          )}
        </div>
        
        {/* Category tag */}
        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.category}</span>
            <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Shop Now →</span>
        </div>
      </div>
    </motion.div>
  );
};
export default ProductCard;
