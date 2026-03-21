import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Sample Banner Data
const banners = [
  {
    id: 1,
    title: "Eco-Friendly Gadgets",
    subtitle: "Innovation for a greener future.",
    description: "Explore our new range of solar-powered and energy-efficient gadgets.",
    image: "/banner-electronics.png", // Replace with image paths if you have them
    link: "/shop?category=electronics",
    color: "bg-emerald-50",
    accent: "text-emerald-600",
    btnColor: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    id: 2,
    title: "Timeless Accessories",
    subtitle: "Elegance in Every Detail.",
    description: "Discover luxury watches and artisanal jewelry crafted for timeless style.",
    image: "/banner-accessories.png",
    link: "/shop?category=accessories",
    color: "bg-amber-50",
    accent: "text-amber-600",
    btnColor: "bg-amber-600 hover:bg-amber-700",
  },
  {
    id: 3,
    title: "Summer Collection 2026",
    subtitle: "Chic Comfort Redefined.",
    description: "Upgrade your wardrobe with our latest lightweight and breathable arrivals.",
    image: "/banner-clothing.png",

    link: "/shop?category=clothing",
    color: "bg-indigo-50",
    accent: "text-indigo-600",
    btnColor: "bg-indigo-600 hover:bg-indigo-700",
  },
];

const HeroCarousel = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 mt-6">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="rounded-2xl shadow-xl overflow-hidden min-h-[500px] md:min-h-[600px]"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-10 p-10 md:p-20 ${banner.color} h-full`}>
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-xl text-center lg:text-left z-10"
              >
                <h4 className={`uppercase text-sm font-bold tracking-[0.2em] mb-4 ${banner.accent}`}>
                  {banner.subtitle}
                </h4>
                <h1 className="text-5xl md:text-7xl font-bold font-sans text-slate-900 mb-6 leading-tight">
                  {banner.title}
                </h1>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed font-light">
                  {banner.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <Link
                    to={banner.link}
                    className={`px-10 py-4 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95 ${banner.btnColor}`}
                  >
                    Shop Now
                  </Link>
                  <Link
                    to="/shop"
                    className="px-10 py-4 text-slate-800 font-bold rounded-full bg-white border border-slate-200 shadow hover:bg-slate-50 transition-all transform hover:scale-105"
                  >
                    View All
                  </Link>
                </div>
              </motion.div>

              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative flex justify-center items-center"
              >
                <div className="absolute inset-0 bg-white/20 blur-3xl rounded-full scale-75 animate-pulse"></div>
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="relative z-10 w-full max-w-[450px] md:max-w-[550px] drop-shadow-2xl object-contain h-auto"
                />
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
