import React from "react";
import { FiTruck, FiShield, FiPhoneCall, FiGift } from "react-icons/fi";

const PromoBanner = () => {
  const features = [
    {
      icon: <FiTruck />,
      title: "Free Shipping",
      desc: "On all orders over $99. No hidden fees.",
      bg: "bg-indigo-50",
      color: "text-indigo-600"
    },
    {
      icon: <FiShield />,
      title: "Money Back Guarantee",
      desc: "Shop with confidence. 30-day easy returns.",
      bg: "bg-emerald-50",
      color: "text-emerald-600"
    },
    {
      icon: <FiPhoneCall />,
      title: "24/7 Premium Support",
      desc: "Dedicated support team at your service.",
      bg: "bg-amber-50",
      color: "text-amber-600"
    },
    {
      icon: <FiGift />,
      title: "Get 20% Off Your First Order",
      desc: "Sign up and receive a 20% discount on your first order.",
      bg: "bg-purple-50",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 my-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {features.map((item, idx) => (
          <div 
            key={idx} 
            className="group bg-white border border-slate-100 shadow-sm p-8 rounded-[2.5rem] hover:-translate-y-2 transition-all text-center flex flex-col items-center hover:shadow-lg"
          >
            <div className={`w-16 h-16 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
               {item.icon}
            </div>
            <h4 className="text-lg font-bold text-slate-900 font-sans mb-3 leading-tight">{item.title}</h4>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[200px] font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromoBanner;
