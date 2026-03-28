import React from "react";
import { useNavigate } from "react-router-dom";

import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";

const cards = [
  {
    id: 1,
    image: card1,
    trend: "2026 Trends",
    title: "Shirt",
  },
  {
    id: 2,
    image: card2,
    trend: "2026 Trends",
    title: "Gaming Gear",
  },
  {
    id: 3,
    image: card3,
    trend: "2026 Trends",
    title: "Casual",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div key={card.id} className="relative overflow-hidden rounded-xl shadow-md group border border-slate-100 cursor-pointer hover:shadow-2xl transition-all duration-300">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-[250px] sm:h-[300px] object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            {/* Text Overlay */}
            <div className="absolute inset-y-0 left-0 p-6 sm:p-8 flex flex-col justify-center w-2/3 bg-gradient-to-r from-white/80 via-white/50 to-transparent">
              <p className="text-sm font-semibold text-indigo-500 uppercase tracking-wider mb-2">
                {card.trend}
              </p>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans text-slate-800 leading-snug mb-4">
                {card.title}
              </h3>
              <a
                href={`/search?q=${encodeURIComponent(card.title)}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/search?q=${encodeURIComponent(card.title)}`);
                }}
                className="inline-flex items-center text-sm font-bold text-slate-800 hover:text-indigo-500 transition-colors group/link cursor-pointer"
              >
                Discover More
                <svg
                  className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
