import React from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiMail, FiPhone, FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiCheckCircle } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useSelector } from "react-redux";

import instagram1 from "../../assets/instagram-1.jpg";
import instagram2 from "../../assets/instagram-2.jpg";
import instagram3 from "../../assets/instagram-3.jpg";
import instagram4 from "../../assets/instagram-4.jpg";
import instagram5 from "../../assets/instagram-5.jpg";

const Footer = () => {
  const { user } = useSelector((state) => state.auth);

  const linkClass = "text-slate-500 text-[14px] font-medium hover:text-indigo-600 hover:translate-x-1 transition-all duration-300 cursor-pointer block";
  const headingClass = "text-sm font-black tracking-[0.2em] text-slate-400 uppercase mb-8";

  return (
    <footer className="w-full bg-white border-t border-slate-100 mt-20 relative overflow-hidden">
      {/* Subtle top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 xl:gap-12">

          {/* Column 1: Brand & Identity */}
          <div className="space-y-8">
            <div className="nav-logo">
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
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs font-medium">
              Elevating your daily lifestyle with curated collections and an unwavering commitment to quality.
            </p>
            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex items-start gap-4 text-slate-500 group">
                <FiMapPin className="text-indigo-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[13px] font-medium leading-relaxed">123 Main Street, Lal Bagh, New Delhi</span>
              </div>
              <div className="flex items-center gap-4 text-slate-500 group">
                <FiMail className="text-indigo-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[13px] font-medium">hello@shopverse.com</span>
              </div>
              <div className="flex items-center gap-4 text-slate-500 group">
                <FiPhone className="text-indigo-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-[13px] font-medium">+1 234 567 8900</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-8">
            <h4 className={headingClass}>Useful Links</h4>
            <div className="space-y-4">
              <Link to="/about" className={linkClass}>Our Story</Link>
              <Link to="/services" className={linkClass}>What We Offer</Link>
              <Link to="/work-with-us" className={linkClass}>Join Our Team</Link>
              <Link to="/blog" className={linkClass}>Articles & News</Link>
              <Link to="/faq" className={linkClass}>Help & FAQ</Link>
            </div>
          </div>

          {/* Column 3: Policy & Service */}
          <div className="lg:pl-4">
            <h4 className={headingClass}>Customer Service</h4>
            <div className="space-y-4">
              <Link to="/payment-methods" className={linkClass}>Payment Methods</Link>
              <Link to="/money-back" className={linkClass}>Money Back Guarantee</Link>
              <Link to="/returns" className={linkClass}>Returns & Exchanges</Link>
              <Link to="/shipping" className={linkClass}>Shipping Information</Link>
              <Link to="/terms" className={linkClass}>Terms & Conditions</Link>
              <Link to="/privacy" className={linkClass}>Privacy Policy</Link>
            </div>
          </div>

          {/* Column 4: Account & Connection */}
          <div className="space-y-12">
            <div>
              <h4 className={headingClass}>My Account</h4>
              <div className="space-y-4">
                <Link to="/login" className={linkClass}>Login / Register</Link>
                <Link to="/cart" className={linkClass}>Shopping Cart</Link>
                <Link to="/favorites" className={linkClass}>My Wishlist</Link>
                <Link
                  to={user ? (user.role === "admin" ? "/dashboard/admin/orders" : "/dashboard/user/orders") : "/login"}
                  className={linkClass}
                >
                  Track My Order
                </Link>
                <Link to="/help" className={linkClass}>Support Center</Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50">
              <div className="flex gap-4">
                {[FiInstagram, FiTwitter, FiFacebook, FiYoutube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-100 transition-all duration-300">
                    <Icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Universal Trust Markers Row */}
        <div className="mt-20 pt-10 border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-3 text-slate-400">
            <FiCheckCircle className="text-emerald-500 text-xl" />
            <span className="text-[11px] font-black uppercase tracking-widest leading-none">Safe Payment</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <FiCheckCircle className="text-emerald-500 text-xl" />
            <span className="text-[11px] font-black uppercase tracking-widest leading-none">Free Shipping On $99+</span>
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <FiCheckCircle className="text-emerald-500 text-xl" />
            <span className="text-[11px] font-black uppercase tracking-widest leading-none">30-Day Easy Return</span>
          </div>
        </div>

        {/* Copyright & Instagram Line */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 py-8 px-8 bg-slate-50 rounded-[2rem] border border-white">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-slate-500 font-medium">© 2026 ShopVerse Global Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold uppercase tracking-widest">Privacy</Link>
              <Link to="/terms" className="text-[10px] text-slate-400 hover:text-indigo-600 font-bold uppercase tracking-widest">Terms</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              Follow Us
            </span>
            <div className="flex -space-x-2">
              {[instagram1, instagram2, instagram3, instagram4, instagram5].map(
                (img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`ins-${i}`}
                    className="w-10 h-10 object-cover rounded-full border-2 border-slate-50 hover:z-10 hover:scale-110 transition-all cursor-pointer shadow-sm"
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
