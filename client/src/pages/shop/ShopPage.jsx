import React, { useState } from "react";
import ProductCards from "../../components/product/ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import { RiFilterLine } from "react-icons/ri";

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

  const startProduct = products.length > 0 ? (currentPage - 1) * ProductsPerPage + 1 : 0;
  const endProduct = products.length > 0 ? startProduct + products.length - 1 : 0;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Page Hero */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold font-sans mb-1">Shop</h1>
          <p className="text-indigo-200 text-sm">
            Discover our curated collection — from fashion to electronics.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Mobile filter toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:bg-indigo-50 hover:border-indigo-300 transition"
          >
            <RiFilterLine className="text-indigo-600 text-base" />
            {sidebarOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className={`${sidebarOpen ? "block" : "hidden"} md:block`}>
            <ShopFiltering
              filters={filters}
              filtersState={filtersState}
              setFiltersState={handleFilterChange}
              clearFilters={clearFilters}
            />
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Results bar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-500 font-medium">
                {isLoading ? (
                  "Loading..."
                ) : (
                  <>
                    Showing{" "}
                    <span className="text-slate-800 font-semibold">
                      {startProduct}–{endProduct}
                    </span>{" "}
                    of{" "}
                    <span className="text-slate-800 font-semibold">
                      {totalProducts || 0}
                    </span>{" "}
                    products
                  </>
                )}
              </p>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="flex justify-center items-center py-28">
                <div className="flex flex-col items-center gap-3 text-slate-400">
                  <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                  <span className="text-sm font-medium">Loading products…</span>
                </div>
              </div>
            )}

            {/* Error */}
            {isError && !isLoading && (
              <div className="py-20 text-center">
                <p className="text-slate-500 text-lg">⚠️ Failed to load products.</p>
                <p className="text-slate-400 text-sm mt-1">Please try again later.</p>
              </div>
            )}

            {/* Empty */}
            {!isLoading && !isError && products.length === 0 && (
              <div className="py-20 text-center bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="text-5xl mb-4">🔍</div>
                <h4 className="text-xl font-bold text-slate-700 font-sans mb-2">No Products Found</h4>
                <p className="text-slate-400 text-sm mb-5">
                  Try adjusting your filters to find what you're looking for.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && !isError && products.length > 0 && (
              <>
                <ProductCards products={products} />

                {/* Pagination */}
                <div className="mt-10 flex justify-center items-center gap-2 flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ← Prev
                  </button>

                  {[...Array(totalPages || 0)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`w-10 h-10 text-sm font-semibold rounded-xl transition-all ${
                        currentPage === index + 1
                          ? "bg-indigo-600 text-white shadow-md"
                          : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-700 rounded-xl shadow-sm hover:border-indigo-400 hover:text-indigo-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
