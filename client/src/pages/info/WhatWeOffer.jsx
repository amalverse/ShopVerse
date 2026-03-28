import React from "react";
import InfoPageLayout from "../../components/ui/InfoPageLayout";

const services = [
  {
    icon: "🚚",
    title: "Fast & Reliable Delivery",
    desc: "We partner with top-tier logistics providers to ensure your orders reach you quickly and safely. Standard delivery takes 3–5 business days; express options are also available at checkout.",
  },
  {
    icon: "🔒",
    title: "Secure Shopping",
    desc: "Your security is our top priority. All transactions are encrypted with industry-standard SSL and we never store your card details.",
  },
  {
    icon: "↩️",
    title: "Easy Returns",
    desc: "Changed your mind? No problem. We offer a hassle-free 30-day return policy on most items. Just initiate a return from your account dashboard.",
  },
  {
    icon: "🎁",
    title: "Gift Wrapping",
    desc: "Make your purchase extra special with our premium gift-wrapping service. Add a personalised message at checkout.",
  },
  {
    icon: "💬",
    title: "24 / 7 Customer Support",
    desc: "Our dedicated support team is available around the clock via live chat, email, and phone to help you with any queries.",
  },
  {
    icon: "🏷️",
    title: "Exclusive Member Deals",
    desc: "Create a free account and unlock early access to sales, personalised discounts, and members-only promotions.",
  },
];

const WhatWeOffer = () => {
  return (
    <InfoPageLayout
      icon="🛍️"
      title="What We Offer"
      subtitle="Everything we do is designed to make your shopping experience seamless, secure, and enjoyable."
    >
      <div className="grid sm:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="text-3xl mb-3">{s.icon}</div>
            <h2 className="text-lg font-bold text-slate-800 font-sans mb-2">
              {s.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </InfoPageLayout>
  );
};

export default WhatWeOffer;
