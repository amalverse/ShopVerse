import React from "react";
import { Link } from "react-router-dom";
import { FiXCircle, FiArrowLeft, FiMessageCircle } from "react-icons/fi";

const PaymentCancel = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-xl w-full bg-white border border-slate-200 rounded-[2.5rem] p-10 md:p-14 shadow-2xl shadow-slate-200/50 text-center relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-red-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50" />

        <div className="relative z-10">
          <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-100">
            <FiXCircle className="w-12 h-12" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 font-sans tracking-tight mb-4">
             Payment Cancelled
          </h1>
          
          <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-sm mx-auto">
             Your transaction was not completed. No funds were charged. If you faced any issues, our support team is ready to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/cart"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 group"
            >
              <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Return to Cart
            </Link>
            <Link
              to="/contact"
              className="flex-1 bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-100 font-bold py-4 px-8 rounded-2xl transition-all flex items-center justify-center gap-2"
            >
              <FiMessageCircle />
              Get Help
            </Link>
          </div>
          
          <p className="mt-10 text-xs font-bold text-slate-400 uppercase tracking-widest">
             ShopVerse Support Available 24/7
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
