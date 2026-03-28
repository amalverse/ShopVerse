import React, { useEffect, useState } from "react";
import ProductCards from "../../components/product/ProductCards";
import { BASE_URL } from "../../utils/baseURL";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchFavorites = async () => {
      if (!user) {
        setFavorites([]);
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch(`${BASE_URL}/api/favorites`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const data = await res.json();
        setFavorites(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching favorites:", err);
        setIsLoading(false);
      }
    };
    fetchFavorites();
  }, [user]);

  const handleRemoveFavorite = async (id) => {
    if (!user) return;
    try {
      await fetch(`${BASE_URL}/api/favorites/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setFavorites(favorites.filter((fav) => fav._id !== id));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Hero */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold font-sans mb-1">My Wishlist</h1>
            <p className="text-indigo-200 text-sm">
              All your saved favourite products in one place.
            </p>
          </div>
          {favorites.length > 0 && (
            <span className="text-indigo-100 text-sm font-medium">
              {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
            </span>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-28">
            <div className="flex flex-col items-center gap-3 text-slate-400">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              <span className="text-sm font-medium">Loading your wishlist…</span>
            </div>
          </div>
        )}

        {/* Not logged in */}
        {!isLoading && !user && (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-xl font-bold font-sans text-slate-700 mb-2">
              Sign in to see your wishlist
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Create an account or log in to save your favourite products.
            </p>
            <Link
              to="/login"
              className="inline-block px-8 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}

        {/* Empty */}
        {!isLoading && user && favorites.length === 0 && (
          <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="text-6xl mb-4">🤍</div>
            <h3 className="text-xl font-bold font-sans text-slate-700 mb-2">
              Your wishlist is empty
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Tap the heart icon on any product to save it here.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Discover Products
            </Link>
          </div>
        )}

        {/* Products */}
        {!isLoading && favorites.length > 0 && (
          <ProductCards
            products={favorites}
            isFavoritePage={true}
            onRemoveFavorite={handleRemoveFavorite}
          />
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
