import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductCards from "../../components/product/ProductCards";
import QuickViewModal from "../../components/product/QuickViewModal";
import { BASE_URL } from "../../utils/baseURL";

const Search = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const products = Array.isArray(data) ? data : data.products || [];
        setAllProducts(products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching search products", err);
        setIsLoading(false);
      });
  }, []);

  const filteredProducts = !q.trim() ? allProducts : (() => {
    const queryWords = q.toLowerCase().split(" ").filter((w) => w.length > 0);
    return allProducts.filter((product) => {
      const name = (product.name || "").toLowerCase();
      const description = (product.description || "").toLowerCase();
      return queryWords.some((word) => name.includes(word) || description.includes(word));
    });
  })();

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          {q ? (
            <>
              <p className="text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-1">
                Search Results
              </p>
              <h1 className="text-4xl font-bold font-sans">
                "{q}"
              </h1>
              {!isLoading && (
                <p className="text-indigo-200 text-sm mt-2">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"} found
                </p>
              )}
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold font-sans mb-1">All Products</h1>
              <p className="text-indigo-200 text-sm">Explore our full catalogue.</p>
            </>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-7 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-600">Search{q ? `: "${q}"` : ""}</span>
        </nav>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-28">
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              <span className="text-sm font-medium">Searching…</span>
            </div>
          </div>
        )}

        {/* No results */}
        {!isLoading && filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold font-sans text-slate-700 mb-2">
              No results for "{q}"
            </h3>
            <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">
              Try different keywords, check for typos, or browse our full catalogue.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}

        {/* Results */}
        {!isLoading && filteredProducts.length > 0 && (
          <ProductCards products={filteredProducts} onQuickView={handleQuickView} />
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

export default Search;
