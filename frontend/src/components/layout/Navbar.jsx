import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { RiAccountCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import avatarImg from "../../assets/avatar.png";
import { BASE_URL } from "../../utils/baseURL";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";
// import adminImg from "../assets/admin.png";


const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // Un-nest the redux object if it is double-wrapped due to payload structure
  const currentUser = user?.user ? user.user : user;
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const location = useLocation();

  // search logic
  const [searchQuery, setSearchQuery] = useState("");

  // mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((o) => !o);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  // cart logic fetching (example of calling backend; the URL is
  // derived from the environment variable so that deployment platforms
  // like Vercel / Render can be configured separately).
  const handleCartClick = async () => {
    try {
      const res = await fetch(`${BASE_URL}/cart`);
      const cartProducts = await res.json();
      console.log("Cart Data from API:", cartProducts);
    } catch (err) {
      console.error("Error fetching cart from DB:", err);
    }
    navigate("/cart");
  };

  const handleFavoritesClick = () => {
    navigate("/favorites");
  };
  // Dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // admin dropdown menu
  const adminDropDownMenus = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Manage Products",
      path: "/dashboard/admin/products",
    },
    {
      label: "All Orders",
      path: "/dashboard/admin/orders",
    },
    {
      label: "Manage Users",
      path: "/dashboard/admin/users",
    },
  ];

  // user dropdown menu
  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Orders", path: "/dashboard/user/orders" },
  ];

  // dropdown menu toggle
  const dropdownMenus =
    currentUser?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  // logout
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Error logging out user", error);
    }
  };

  return (
    <header className="w-full bg-white relative">
      {/* Main Logo & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-8 bg-white">
        {/* Logo */}
        <div className="flex-shrink-0 nav-logo font-bold text-3xl font-sans tracking-tight">
          <Link to="/">
            <span className="text-indigo-600">Shop</span><span className="text-slate-900">Verse</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl hidden lg:flex">
          <div className="relative w-full flex items-center bg-slate-50 border border-slate-200 rounded-2xl shadow-sm focus-within:ring-4 focus-within:ring-indigo-50 focus-within:border-indigo-400 transition-all group/search overflow-hidden">
            <input
              type="text"
              placeholder="What are you looking for today?"
              className="w-full px-5 py-3 outline-none text-slate-700 bg-transparent text-sm font-medium placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button
              onClick={handleSearch}
              className="pr-5 pl-2 text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <RiSearchLine className="text-xl" />
            </button>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-8 text-slate-800">
          <span
            onClick={toggleMobileMenu}
            className="md:hidden hover:text-indigo-600 cursor-pointer transition text-2xl"
          >
            {isMobileMenuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
          </span>

          {/* Favorites */}
          <button
            onClick={handleFavoritesClick}
            className="hover:text-indigo-600 transition group relative flex flex-col items-center gap-1"
          >
            <HiOutlineHeart className="text-2xl" />
            <span className="text-[12px] font-semibold text-slate-800 group-hover:text-indigo-600">Favs</span>
          </button>

          {/* Cart */}
          <button
            onClick={handleCartClick}
            className="hover:text-indigo-600 transition group relative flex flex-col items-center gap-1"
          >
            <HiOutlineShoppingBag className="text-2xl" />
            <span className="text-[12px] font-semibold text-slate-800 group-hover:text-indigo-600">Cart</span>
            <span className="absolute -top-1.5 -right-2 bg-indigo-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              {products.length}
            </span>
          </button>

          {/* Account/Login */}
          <div className="hover:text-indigo-600 transition group relative flex flex-col items-center gap-1">
            {currentUser ? (
              <div className="flex flex-col items-center" onClick={handleDropdownToggle}>
                <img
                  src={currentUser.profileImage || avatarImg}
                  alt=""
                  className="size-7 rounded-full cursor-pointer ring-2 ring-transparent group-hover:ring-indigo-600 object-cover"
                />
                <span className="text-[12px] font-semibold text-slate-800 cursor-pointer group-hover:text-indigo-600 max-w-[72px] truncate">
                  {currentUser.username || currentUser.name || "Account"}
                </span>
                {isDropdownOpen && (
                  <div className="absolute right-0 top-12 p-3 w-48 bg-white border border-gray-100 rounded-lg shadow-xl z-50 text-base text-left">
                    <ul className="font-medium space-y-3 p-1 text-slate-700">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index} className="hover:text-indigo-600 transition">
                          <Link
                            onClick={() => setIsDropdownOpen(false)}
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li className="pt-2 border-t border-slate-100">
                        <Link
                          onClick={handleLogout}
                          className="font-medium text-indigo-500 hover:text-indigo-700 transition"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex flex-col items-center">
                <RiAccountCircleLine className="text-2xl" />
                <span className="text-[12px] font-semibold text-slate-800 group-hover:text-indigo-600">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation (Indigo Bar) */}
      <div className="bg-indigo-600 w-full shadow-lg shadow-indigo-100/50 border-t border-indigo-500/20">
        <div className="flex items-center justify-between py-3 max-w-7xl mx-auto font-medium text-white px-6">
          {/* Left side nav links */}
          <ul className="hidden md:flex items-center gap-2 lg:gap-3 list-none text-[13px] font-bold uppercase tracking-widest">
            {[
              { label: "Home", path: "/" },
              { label: "Shop", path: "/shop" },
              { label: "Electronics", path: "/categories/electronics" },
              { label: "Women", path: "/categories/womens-clothing" },
              { label: "Men", path: "/categories/mens-clothing" },
              { label: "Jewellery", path: "/categories/jewellery" },
              { label: "Accessories", path: "/categories/accessories" },
              { label: "Cosmetics", path: "/categories/cosmetics" }
            ].map((link, idx) => (
              <li key={idx}>
                <Link 
                  to={link.path} 
                  className={`px-3 py-1.5 rounded-xl transition-all duration-300 ${
                    location.pathname === link.path 
                      ? 'bg-white text-indigo-700 shadow-xl' 
                      : 'hover:bg-white/20'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side promo */}
          <div className="hidden lg:flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-indigo-100">
            <span className="bg-yellow-400 text-indigo-900 px-2 py-0.5 rounded-lg mr-1 animate-pulse">Hot</span> 
            Clearance Up to 30% Off
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white w-full absolute top-full left-0 shadow-lg z-50 border-t border-gray-100">
          {/* Mobile Search Bar */}
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden px-3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2.5 outline-none text-sm bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <button onClick={handleSearch} className="p-1 text-slate-400 hover:text-indigo-600">
                <RiSearchLine className="text-lg" />
              </button>
            </div>
          </div>
          <ul className="flex flex-col p-4 space-y-2 font-medium text-slate-800">
            {[
              { label: "Home", path: "/" },
              { label: "Shop", path: "/shop" },
              { label: "Electronics", path: "/categories/electronics" },
              { label: "Women's Clothing", path: "/categories/womens-clothing" },
              { label: "Men's Clothing", path: "/categories/mens-clothing" },
              { label: "Jewellery", path: "/categories/jewellery" },
              { label: "Accessories", path: "/categories/accessories" },
              { label: "Cosmetics", path: "/categories/cosmetics" }
            ].map((link, idx) => (
              <li key={idx}>
                <Link 
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`block py-2 transition ${
                    location.pathname === link.path 
                      ? 'text-indigo-600 font-semibold' 
                      : 'hover:text-indigo-500'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
