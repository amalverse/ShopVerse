import React from "react";

const categoryIcons = {
  all: "🛍️",
  electronics: "💻",
  "mens-clothing": "👔",
  "womens-clothing": "👗",
  jewellery: "💍",
  accessories: "🎒",
  cosmetics: "💄",
};

const categoryLabels = {
  all: "All",
  electronics: "Electronics",
  "mens-clothing": "Men's Clothing",
  "womens-clothing": "Women's Clothing",
  jewellery: "Jewellery",
  accessories: "Accessories",
  cosmetics: "Cosmetics",
};

const colorSwatches = {
  all: "bg-gradient-to-br from-slate-200 to-slate-400",
  black: "bg-black",
  red: "bg-red-500",
  gold: "bg-yellow-400",
  blue: "bg-blue-500",
  silver: "bg-slate-400",
  beige: "bg-amber-100 border border-amber-200",
  green: "bg-green-500",
};

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  return (
    <aside className="shrink-0 w-full md:w-64 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800 font-sans tracking-wide uppercase">
          Filters
        </h3>
        <button
          onClick={clearFilters}
          className="text-xs text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Category */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
          Category
        </h4>
        <div className="space-y-1">
          {filters.categories.map((category) => {
            const isActive = filtersState.category === category;
            return (
              <label
                key={category}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "hover:bg-slate-50 text-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={isActive}
                  onChange={(e) =>
                    setFiltersState({ ...filtersState, category: e.target.value })
                  }
                  className="accent-indigo-600"
                />
                <span className="text-base">{categoryIcons[category]}</span>
                <span className="text-sm">{categoryLabels[category] || category}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Color */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
          Color
        </h4>
        <div className="flex flex-wrap gap-2">
          {filters.colors.map((color) => {
            const isActive = filtersState.color === color;
            return (
              <button
                key={color}
                title={color}
                onClick={() =>
                  setFiltersState({ ...filtersState, color: color })
                }
                className={`w-8 h-8 rounded-full transition-all duration-150 ${
                  colorSwatches[color] || "bg-slate-300"
                } ${
                  isActive
                    ? "ring-2 ring-indigo-500 ring-offset-2 scale-110"
                    : "hover:scale-105 hover:ring-2 hover:ring-slate-300 hover:ring-offset-1"
                }`}
              >
                {color === "all" && (
                  <span className="text-[9px] font-bold text-slate-600 flex items-center justify-center h-full w-full">ALL</span>
                )}
              </button>
            );
          })}
        </div>
        {filtersState.color !== "all" && (
          <p className="text-xs text-indigo-600 font-medium capitalize mt-1">
            Selected: {filtersState.color}
          </p>
        )}
      </div>

      {/* Price Range */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-2">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
          Price Range
        </h4>
        <div className="space-y-1">
          {filters.priceRange.map((range) => {
            const value = range.value || `${range.min}-${range.max}`;
            const isActive = filtersState.priceRange === value;
            return (
              <label
                key={range.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                    : "hover:bg-slate-50 text-slate-600"
                }`}
              >
                <input
                  type="radio"
                  name="priceRange"
                  value={value}
                  checked={isActive}
                  onChange={(e) =>
                    setFiltersState({ ...filtersState, priceRange: e.target.value })
                  }
                  className="accent-indigo-600"
                />
                <span className="text-sm">{range.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Clear full button */}
      <button
        onClick={clearFilters}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl shadow-sm transition-colors duration-200"
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default ShopFiltering;
