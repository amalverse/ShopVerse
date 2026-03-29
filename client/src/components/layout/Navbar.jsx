import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { RiAccountCircleLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import avatarImg from "../../assets/avatar.png";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const currentUser = user?.user ? user.user : user;
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((o) => !o);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) navigate(`/search?q=${searchQuery}`);
  };

  const handleCartClick = () => navigate("/cart");
  const handleFavoritesClick = () => navigate("/favorites");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => setIsDropdownOpen(!isDropdownOpen);

  const adminDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Manage Products", path: "/dashboard/admin/products" },
    { label: "All Orders", path: "/dashboard/admin/orders" },
    { label: "Manage Users", path: "/dashboard/admin/users" },
  ];

  const userDropDownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Orders", path: "/dashboard/user/orders" },
  ];

  const dropdownMenus = currentUser?.role === "admin" ? [...adminDropDownMenus] : [...userDropDownMenus];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Error logging out user", error);
    }
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Electronics", path: "/categories/electronics" },
    { label: "Women", path: "/categories/womens-clothing" },
    { label: "Men", path: "/categories/mens-clothing" },
    { label: "Jewellery", path: "/categories/jewellery" },
    { label: "Accessories", path: "/categories/accessories" },
    { label: "Cosmetics", path: "/categories/cosmetics" },
  ];

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white border-b border-slate-200 shadow-md" : "bg-white border-b border-slate-100"}`}>
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-2.5 group transition-opacity hover:opacity-90">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-100/50">
              <HiOutlineShoppingBag className="text-white text-xl" />
            </div>
            <span className="text-2xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <span className="text-slate-900">Shop</span>
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Verse</span>
              <span className="text-indigo-600">.</span>
            </span>
          </Link>
        </div>

        {/* Search Bar — Desktop */}
        <div className="flex-1 max-w-2xl hidden lg:flex">
          <div className="relative w-full flex items-center bg-slate-50 border-[1.5px] border-slate-200 rounded-2xl overflow-hidden group transition-all focus-within:bg-white focus-within:border-indigo-600 focus-within:ring-4 focus-within:ring-indigo-600/5">
            <input
              type="text"
              placeholder="Search for products, brands, categories…"
              className="w-full px-5 py-3 outline-none text-slate-700 bg-transparent text-sm font-medium placeholder"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-3 text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <RiSearchLine className="text-xl" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5 text-slate-700">
          {/* Mobile menu toggle */}
          <span
            onClick={toggleMobileMenu}
            className="md:hidden hover:text-indigo-600 cursor-pointer transition text-2xl active:scale-90"
          >
            {isMobileMenuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
          </span>

          {/* Favorites */}
          <button
            onClick={handleFavoritesClick}
            className="hidden sm:flex flex-col items-center gap-0.5 hover:text-indigo-600 transition group active:scale-95"
          >
            <HiOutlineHeart className="text-[22px] transition-transform group-hover:-translate-y-0.5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-indigo-600">Favs</span>
          </button>

          {/* Cart */}
          <button
            onClick={handleCartClick}
            className="flex flex-col items-center gap-0.5 hover:text-indigo-600 transition group relative active:scale-95"
          >
            <div className="relative">
              <HiOutlineShoppingBag className="text-[22px] transition-transform group-hover:-translate-y-0.5" />
              {products.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-gradient-to-br from-indigo-500 to-violet-600 text-white text-[9px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-black shadow-md">
                  {products.length}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-indigo-600">Cart</span>
          </button>

          {/* Account */}
          <div className="relative">
            {currentUser ? (
              <div
                className="flex flex-col items-center cursor-pointer gap-0.5 group active:scale-95"
                onClick={handleDropdownToggle}
              >
                <img
                  src={currentUser.profileImage || avatarImg}
                  alt=""
                  className="w-8 h-8 rounded-full ring-2 ring-indigo-100 group-hover:ring-indigo-400 object-cover transition-all shadow-sm"
                />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-indigo-600 max-w-[64px] truncate">
                  {currentUser.username || currentUser.name || "Account"}
                </span>
                {isDropdownOpen && (
                  <div className="absolute right-0 top-14 bg-white border border-slate-200 shadow-xl rounded-2xl w-52 p-2 z-[60]">
                    <ul className="space-y-1">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropdownOpen(false)}
                            to={menu.path}
                            className="flex items-center px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/60 rounded-xl transition-all"
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li className="border-t border-slate-100 pt-1 mt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-400 hover:text-red-600 hover:bg-red-50/60 rounded-xl transition-all"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Link to="/login" className="flex flex-col items-center gap-0.5 group active:scale-95">
                  <RiAccountCircleLine className="text-[22px] transition-transform group-hover:-translate-y-0.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-indigo-600">Login</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nav Links Bar */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 shadow-lg shadow-indigo-200/40">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <ul className="hidden md:flex items-center gap-1 list-none">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-xl text-[12px] font-bold uppercase tracking-widest transition-all duration-250 inline-block ${location.pathname === link.path
                    ? "bg-white/20 text-white shadow ring-1 ring-white/30"
                    : "text-indigo-100 hover:bg-white/15 hover:text-white"
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-indigo-200">
            <span className="bg-yellow-400 text-indigo-900 px-2.5 py-0.5 rounded-lg text-[10px] animate-pulse font-black">Hot</span>
            Clearance Up to 30% Off
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 overflow-hidden">
          {/* Mobile Search */}
          <div className="px-4 pt-4 pb-3">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden px-3">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full py-2.5 outline-none text-sm bg-transparent text-slate-700 placeholder"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              />
              <button onClick={handleSearch} className="p-1 text-slate-400 hover:text-indigo-600">
                <RiSearchLine className="text-lg" />
              </button>
            </div>
          </div>
          <ul className="flex flex-col px-4 pb-4 space-y-1 font-semibold text-slate-700">
            {[
              { label: "Home", path: "/" },
              { label: "Shop", path: "/shop" },
              { label: "Electronics", path: "/categories/electronics" },
              { label: "Women's Clothing", path: "/categories/womens-clothing" },
              { label: "Men's Clothing", path: "/categories/mens-clothing" },
              { label: "Jewellery", path: "/categories/jewellery" },
              { label: "Accessories", path: "/categories/accessories" },
              { label: "Cosmetics", path: "/categories/cosmetics" },
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm transition-all ${location.pathname === link.path
                    ? "bg-indigo-50 text-indigo-700 font-bold"
                    : "hover:bg-indigo-50/60 hover:text-indigo-600"
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
