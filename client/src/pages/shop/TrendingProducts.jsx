import React, { useState, useEffect } from "react";
import ProductCards from "../../components/product/ProductCards";
import { BASE_URL } from "../../utils/baseURL";
import { FiTrendingUp, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import QuickViewModal from "../../components/product/QuickViewModal";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  
  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
          if (Array.isArray(data)) setProducts(data);
          else if (data.products) setProducts(data.products);
          setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setIsLoading(false);
      });
  }, []);

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header section with badge */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100/50 text-[11px] font-bold uppercase tracking-widest shadow-sm">
             <FiTrendingUp className="text-sm" />
             The Trends Report 2026
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-sans tracking-tight">
            Trending Collections
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 text-base leading-relaxed">
            Discover the hottest picks of the season. Handpicked styles and top-rated tech, 
            curated for your modern lifestyle.
          </p>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-10 h-10 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Updating trends...</p>
          </div>
        ) : (
          <ProductCards 
            products={products.slice(0, visibleProducts)} 
            onQuickView={handleQuickView}
          />
        )}

        {/* Action Buttons */}
        <div className="text-center mt-16 flex flex-col md:flex-row items-center justify-center gap-4">
          {!isLoading && visibleProducts < products.length && (
            <button
              onClick={loadMoreProducts}
              className="w-full md:w-auto px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
            >
              Load More Products
            </button>
          )}
          <Link
            to="/shop"
            className="w-full md:w-auto px-10 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:text-indigo-600 hover:border-indigo-300 transition-all flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
          >
            Explore Full Shop
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
      
      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </section>
  );
};

export default TrendingProducts;
