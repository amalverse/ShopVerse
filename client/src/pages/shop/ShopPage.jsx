import React, { useState } from "react";
import ProductCards from "../../components/product/ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import { RiFilterLine } from "react-icons/ri";
import QuickViewModal from "../../components/product/QuickViewModal";

const filters = {
  categories: [
    "all",
    "electronics",
    "mens-clothing",
    "womens-clothing",
    "jewellery",
    "accessories",
    "cosmetics",
  ],
  colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
  priceRange: [
    { label: "under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: "all",
    color: "all",
    priceRange: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Quick View State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { category, color, priceRange } = filtersState;

  let minPrice = "";
  let maxPrice = "";
  if (priceRange) {
    const dashIndex = priceRange.lastIndexOf("-");
    const rawMin = priceRange.substring(0, dashIndex);
    const rawMax = priceRange.substring(dashIndex + 1);
    const parsedMin = parseFloat(rawMin);
    const parsedMax = parseFloat(rawMax);
    if (!isNaN(parsedMin)) minPrice = parsedMin;
    if (!isNaN(parsedMax) && isFinite(parsedMax)) maxPrice = parsedMax;
  }

  const {
    data: {
      products = [],
      pagination: { totalPages, totalProducts } = {},
    } = {},
    isLoading,
    isError,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    color: color !== "all" ? color : "",
    minPrice,
    maxPrice,
    page: currentPage,
    limit: ProductsPerPage,
  });

  const clearFilters = () => {
    setFiltersState({ category: "all", color: "all", priceRange: null });
    setCurrentPage(1);
  };

  const handleFilterChange = (newState) => {
    setFiltersState(newState);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const startProduct = products.length > 0 ? (currentPage - 1) * ProductsPerPage + 1 : 0;
  const endProduct = products.length > 0 ? startProduct + products.length - 1 : 0;

  return (
    <div className="bg-[#F8FAFC] min-h-screen transition-colors duration-300">
      {/* Page Hero */}
      <div className="bg-indigo-600 text-white shadow-xl shadow-indigo-100/20">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-black font-sans mb-3 tracking-tight">Shop</h1>
          <p className="text-indigo-100 text-sm md:text-base max-w-lg font-medium">
            Explore our curated collection of premium products, designed to elevate your lifestyle from fashion to tech.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 md:py-16">
        <div className="md:hidden mb-6">
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="w-full flex items-center justify-center gap-2 glass-card text-slate-700 text-sm font-bold px-4 py-3.5 rounded-2xl shadow-sm hover:border-indigo-400 transition"
          >
            <RiFilterLine className="text-indigo-600 text-lg" />
            {sidebarOpen ? "Hide Filter Options" : "Show Filter Options"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div className={`${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-64 flex-shrink-0`}>
            <ShopFiltering
              filters={filters}
              filtersState={filtersState}
              setFiltersState={handleFilterChange}
              clearFilters={clearFilters}
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                {isLoading ? (
                  "Loading Collection..."
                ) : (
                  <>
                    Showing <span className="text-indigo-600">{startProduct}–{endProduct}</span> of {totalProducts || 0} Products
                  </>
                )}
              </p>
            </div>

            {isLoading && (
              <div className="flex justify-center items-center py-32">
                <div className="flex flex-col items-center gap-4 text-slate-400">
                  <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
                  <span className="text-xs font-bold uppercase tracking-widest">Fetching Products</span>
                </div>
              </div>
            )}

            {isError && !isLoading && (
              <div className="py-24 text-center glass-card rounded-3xl">
                <p className="text-slate-500 text-lg font-bold">⚠️ Connection Error</p>
                <p className="text-slate-400 text-sm mt-2">Unable to load the catalog. Please check your connection.</p>
              </div>
            )}

            {!isLoading && !isError && products.length === 0 && (
              <div className="py-24 text-center glass-card rounded-3xl">
                <div className="text-6xl mb-6">🏜️</div>
                <h4 className="text-2xl font-black text-slate-800 font-sans mb-3">No Results Found</h4>
                <p className="text-slate-400 text-sm mb-8 max-w-xs mx-auto">
                  We couldn't find anything matching your filters. Try clearing them to see all products.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-8 py-3.5 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-[0_8px_32px_rgba(99,102,241,0.25)]"
                >
                  Reset All Filters
                </button>
              </div>
            )}

            {!isLoading && !isError && products.length > 0 && (
              <>
                <ProductCards products={products} onQuickView={handleQuickView} />

                <div className="mt-16 flex justify-center items-center gap-3 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-6 py-3 text-sm font-bold glass-card text-slate-700 rounded-2xl shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages || 0)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-12 h-12 text-sm font-black rounded-2xl transition-all ${
                        currentPage === index + 1
                          ? "bg-indigo-600 text-white shadow-lg"
                          : "glass-card text-slate-500 hover:border-indigo-400 hover:text-indigo-600"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-6 py-3 text-sm font-bold glass-card text-slate-700 rounded-2xl shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <QuickViewModal
        product={selectedProduct}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </div>
  );
};

export default ShopPage;
