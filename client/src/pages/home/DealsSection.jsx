import React from "react";
import dealImg from "../../assets/deals.png";

const DealsSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center bg-indigo-50/50 border border-slate-100 shadow-sm p-6 sm:p-10 lg:p-12 overflow-hidden relative">
        <div className="relative h-full order-2 md:order-1 flex justify-center object-contain">
          <img src={dealImg} alt="Deals" className="max-h-[300px] sm:max-h-[400px] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500" />
        </div>

        <div className="max-w-[600px] mx-auto order-1 md:order-2">
          <h5 className="mb-4 text-xl sm:text-2xl font-bold text-indigo-500 uppercase tracking-wider">
            Get Up to 20% Discount
          </h5>
          <h4 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">Deals of This Month</h4>
          <p className="mb-8 text-slate-600 text-base sm:text-lg leading-relaxed">
            Discover our exclusive monthly deals! Upgrade your wardrobe with premium styles at unbeatable prices. Don't miss out on these limited-time offers.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border border-indigo-50 w-20 h-20 sm:w-24 sm:h-24 transition-transform hover:-translate-y-1">
              <h4 className="text-2xl sm:text-3xl font-black text-indigo-600">14</h4>
              <p className="font-semibold text-slate-500 text-sm">Days</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border border-indigo-50 w-20 h-20 sm:w-24 sm:h-24 transition-transform hover:-translate-y-1">
              <h4 className="text-2xl sm:text-3xl font-black text-indigo-600">20</h4>
              <p className="font-semibold text-slate-500 text-sm">Hours</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border border-indigo-50 w-20 h-20 sm:w-24 sm:h-24 transition-transform hover:-translate-y-1">
              <h4 className="text-2xl sm:text-3xl font-black text-indigo-600">50</h4>
              <p className="font-semibold text-slate-500 text-sm">Mins</p>
            </div>
            <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg border border-indigo-50 w-20 h-20 sm:w-24 sm:h-24 transition-transform hover:-translate-y-1">
              <h4 className="text-2xl sm:text-3xl font-black text-indigo-600">10</h4>
              <p className="font-semibold text-slate-500 text-sm">Secs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
