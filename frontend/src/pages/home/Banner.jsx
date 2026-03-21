import React from "react";
import { Link } from "react-router-dom";
import BannerImg from "../../assets/header.png";
import { FiArrowRight, FiShield } from "react-icons/fi";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="min-h-[600px] bg-slate-50 border border-slate-200 grid grid-cols-1 lg:grid-cols-2 items-center rounded-[3rem] shadow-xl shadow-slate-200/50 overflow-hidden relative">
        
        {/* Decorative background details */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-indigo-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-10 right-1/2 w-48 h-48 bg-yellow-100 rounded-full blur-3xl opacity-30" />

        {/* Text Section */}
        <div className="p-8 md:p-16 lg:pl-20 z-10 text-center lg:text-left order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100/50 text-[11px] font-bold uppercase tracking-widest mb-6">
             <FiShield className="text-sm" />
             Premium Quality Guaranteed
          </div>
          
          <h4 className="uppercase text-xs font-black tracking-[0.2em] text-slate-400 mb-4">
            Curated Collections 2026
          </h4>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-sans text-slate-900 mb-8 leading-[0.95] tracking-tighter">
            Elevate Your <br />
            <span className="text-indigo-600 font-serif italic font-medium">Signature</span> Style
          </h1>
          
          <p className="mb-10 text-slate-500 text-lg md:text-xl leading-relaxed max-w-[500px] font-medium">
            Discover the latest trends in modern aesthetics. 
            Tailored for those who demand excellence in every detail.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link 
              to="/shop"
              className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-100/80 hover:bg-slate-900 hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
            >
              Explore Collection
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-3 ml-4">
               <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center">
                  <span className="text-xl">✨</span>
               </div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Trusted by<br/>Thousands
               </span>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative h-full overflow-hidden flex items-end justify-center order-1 lg:order-2 bg-slate-100 lg:bg-transparent">
          <img
            src={BannerImg}
            alt="Signature Collection"
            className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-[1.03]"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-slate-50/80 to-transparent lg:hidden" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
