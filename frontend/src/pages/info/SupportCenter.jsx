import React from "react";
import InfoPageLayout from "../../components/ui/InfoPageLayout";
import Contact from "../../components/Contact";
import { FiMail, FiPhone, FiMessageCircle, FiClock, FiMessageSquare } from "react-icons/fi";

const SupportCenter = () => {
  return (
    <InfoPageLayout
      icon="🤝"
      title="Support Center"
      subtitle="We're here to assist you with any questions or concerns. Explore our help options below."
    >
      <div className="space-y-12">
        {/* Top Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
               <FiMail />
            </div>
            <h4 className="text-xl font-bold text-slate-800 font-sans mb-2">Email Support</h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Drop us a line and we'll reply within 24 hours.</p>
            <p className="text-indigo-600 font-bold text-sm">support@shopverse.com</p>
          </div>

          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
               <FiPhone />
            </div>
            <h4 className="text-xl font-bold text-slate-800 font-sans mb-2">Phone Support</h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Speak directly with our expert agents.</p>
            <p className="text-emerald-600 font-bold text-sm">+1 234 567 8900</p>
          </div>

          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
               <FiMessageSquare />
            </div>
            <h4 className="text-xl font-bold text-slate-800 font-sans mb-2">Help Desk</h4>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">Our dedicated team is ready to help 24/7.</p>
            <p className="text-amber-600 font-bold text-sm">Ticketed Support</p>
          </div>
        </div>

        {/* Message Section */}
        <div className="bg-white border border-slate-200 rounded-[3rem] shadow-sm overflow-hidden flex flex-col lg:flex-row shadow-2xl shadow-slate-200/50">
           <div className="lg:w-1/3 bg-indigo-600 p-10 lg:p-14 text-white relative">
              <div className="relative z-10">
                 <h3 className="text-3xl font-black font-sans mb-4 leading-tight">Send a Direct Message</h3>
                 <p className="text-indigo-100 text-base leading-relaxed mb-8 font-medium">
                    Can't find what you're looking for? Reach out through our contact form and we'll handle your request personally.
                 </p>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                       <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">99% Satisfaction Rate</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                       <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Fast Response Time</span>
                    </div>
                 </div>
              </div>
              {/* Decorative detail */}
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4" />
           </div>
           
           <div className="lg:w-2/3 p-6 md:p-12 lg:p-16">
              {/* Reset Contact's spacing for this context */}
              <div className="[&>section]:p-0 [&>section]:py-0 [&>section>div]:w-full [&>section>div]:p-0">
                 <Contact />
              </div>
           </div>
        </div>
      </div>
    </InfoPageLayout>
  );
};

export default SupportCenter;
