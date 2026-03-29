import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCards from "../../components/product/ProductCards";
import QuickViewModal from "../../components/product/QuickViewModal";
import { BASE_URL } from "../../utils/baseURL";

const categoryMeta = {
  electronics: { icon: "💻", label: "Electronics", desc: "The latest gadgets, devices, and tech accessories." },
  "mens-clothing": { icon: "👔", label: "Men's Clothing", desc: "Styles crafted for the modern man — from casual to formal." },
  "womens-clothing": { icon: "👗", label: "Women's Clothing", desc: "Curated fashion that empowers every woman." },
  jewellery: { icon: "💍", label: "Jewellery", desc: "Timeless pieces that add elegance to every occasion." },
  accessories: { icon: "🎒", label: "Accessories", desc: "The perfect finishing touch to any outfit." },
  cosmetics: { icon: "💄", label: "Cosmetics", desc: "Beauty and skincare products from trusted brands." },
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const meta = categoryMeta[categoryName?.toLowerCase()] || {
    icon: "🛍️",
    label: categoryName,
    desc: `Browse our selection of ${categoryName} products.`,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    fetch(`${BASE_URL}/products/${categoryName.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setFilteredProducts(data);
        else if (data.products) setFilteredProducts(data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setIsLoading(false);
      });
  }, [categoryName]);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{meta.icon}</span>
            <div>
              <h1 className="text-4xl font-bold font-sans mb-1">{meta.label}</h1>
              <p className="text-indigo-200 text-sm">{meta.desc}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-7 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-indigo-600 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-slate-600">{meta.label}</span>
        </nav>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-28">
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading products…</span>
            </div>
          </div>
        )}

        {/* Empty */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-bold font-sans text-slate-700 mb-2">
              No products here yet
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Check back soon — we're adding new {meta.label.toLowerCase()} all the time.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}

        {/* Count + Grid */}
        {!isLoading && filteredProducts.length > 0 && (
          <>
            <p className="text-sm text-slate-500 font-medium mb-5">
              <span className="text-slate-800 font-semibold">{filteredProducts.length}</span>{" "}
              {filteredProducts.length === 1 ? "product" : "products"} found in{" "}
              <span className="text-indigo-600 font-semibold">{meta.label}</span>
            </p>
            <ProductCards products={filteredProducts} onQuickView={handleQuickView} />
          </>
        )}
      </div>

      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};

export default CategoryPage;
