import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import RatingStars from "../../../components/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import ReviewsCard from "../reviews/ReviewsCard";
import { toast } from "react-toastify";
import { BASE_URL } from "../../../utils/baseURL";
import { FiShoppingBag, FiCheckCircle } from "react-icons/fi";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const cartProducts = useSelector((state) => state.cart.products);

  const { data, isLoading, isError } = useFetchProductByIdQuery(id);

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

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
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(product),
      });
      toast.success("Product added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32 bg-[#F8FAFC] min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <span className="text-slate-600 font-medium">Loading details...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-32 bg-[#F8FAFC] min-h-screen text-center">
        <span className="text-5xl mb-4">⚠️</span>
        <h2 className="text-2xl font-bold text-slate-800 font-sans">Something went wrong</h2>
        <p className="text-slate-500 mt-2">We couldn't load the product info. Please try again.</p>
        <Link to="/shop" className="mt-6 text-indigo-600 font-bold hover:underline">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Hero / Header Section */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-2 text-xs text-indigo-200 font-medium uppercase tracking-widest mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <IoIosArrowForward className="opacity-50" />
            <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
            <IoIosArrowForward className="opacity-50" />
            <span className="text-white">{singleProduct.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-sans tracking-tight leading-tight">
            {singleProduct.name}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Product Image Section */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm overflow-hidden group">
              <img
                src={singleProduct.image}
                alt={singleProduct.name}
                className="rounded-2xl w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          {/* Product Controls Section */}
          <div className="w-full lg:w-1/2 sticky top-24">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                 <div>
                    <p className="text-3xl font-black text-slate-900 font-sans">
                      ${singleProduct.price}
                    </p>
                    {singleProduct.oldPrice && (
                      <p className="text-sm text-slate-400 line-through mt-1">
                        Was ${singleProduct.oldPrice}
                      </p>
                    )}
                 </div>
                 <div className="flex flex-col items-end gap-1">
                    <RatingStars rating={singleProduct.rating} />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                       {productReviews.length} Reviews
                    </span>
                 </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Description</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {singleProduct.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Category</p>
                    <p className="text-sm font-bold text-indigo-600 capitalize">{singleProduct.category}</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Color</p>
                    <p className="text-sm font-bold text-slate-700 capitalize">{singleProduct.color || "Standard"}</p>
                  </div>
                </div>

                <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-2xl flex items-center gap-2 text-xs font-bold border border-emerald-100">
                  <FiCheckCircle className="text-base" />
                  In Stock & Ready to Ship
                </div>

                <button
                  onClick={() => handleAddToCart(singleProduct)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-100"
                >
                  <FiShoppingBag className="text-xl" />
                  Add to Shopping Cart
                </button>
              </div>
            </div>

            {/* Why buy from us / Trusted labels */}
            <div className="mt-6 grid grid-cols-3 gap-3">
               {[
                 { icon: "🛡️", label: "Safe Payment" },
                 { icon: "🚚", label: "Fast Delivery" },
                 { icon: "🔄", label: "Easy Returns" }
               ].map((item, idx) => (
                 <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-3 text-center">
                    <div className="text-xl mb-1">{item.icon}</div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">{item.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-8">
             <h2 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">Customer Reviews</h2>
             <div className="h-[1px] flex-1 bg-slate-200" />
          </div>
          <ReviewsCard productReviews={productReviews} />
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
