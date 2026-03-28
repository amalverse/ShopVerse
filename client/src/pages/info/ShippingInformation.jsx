import React from "react";
import InfoPageLayout from "../../components/ui/InfoPageLayout";

const shippingOptions = [
  {
    icon: "📦",
    name: "Standard Shipping",
    time: "3–5 Business Days",
    cost: "Free on orders above ₹999",
    desc: "Delivered to your doorstep via our trusted logistics partners. Ideal for non-urgent purchases.",
  },
  {
    icon: "⚡",
    name: "Express Shipping",
    time: "1–2 Business Days",
    cost: "₹149 flat fee",
    desc: "Need it fast? Our express service ensures priority handling and next-day delivery in most cities.",
  },
  {
    icon: "🌍",
    name: "International Shipping",
    time: "7–14 Business Days",
    cost: "Calculated at checkout",
    desc: "We ship to 50+ countries worldwide. International orders may be subject to customs duties.",
  },
];

const ShippingInformation = () => {
  return (
    <InfoPageLayout
      icon="🚚"
      title="Shipping Information"
      subtitle="Fast, reliable delivery right to your door. Here's a complete guide to our shipping options."
    >
      {/* Options */}
      <div className="grid sm:grid-cols-3 gap-5">
        {shippingOptions.map((opt, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-center"
          >
            <div className="text-4xl mb-3">{opt.icon}</div>
            <h2 className="font-bold text-slate-800 font-sans mb-1">{opt.name}</h2>
            <p className="text-indigo-600 font-semibold text-sm mb-1">{opt.time}</p>
            <p className="text-xs text-slate-400 mb-3 font-medium">{opt.cost}</p>
            <p className="text-slate-500 text-sm leading-relaxed">{opt.desc}</p>
          </div>
        ))}
      </div>

      {/* Policy details */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
        <h2 className="text-xl font-bold text-slate-800 font-sans">Shipping Policy</h2>
        {[
          { title: "Order Cut-off Time", body: "Orders placed before 2:00 PM IST on business days are processed the same day. Orders after this time are processed the next business day." },
          { title: "Tracking Your Order", body: "A tracking link is emailed to you once your order is dispatched. You can also track it under My Orders in your account dashboard." },
          { title: "Delivery Attempts", body: "Our courier will make two delivery attempts. If unsuccessful, the parcel will be held at the nearest hub for 5 days before being returned to us." },
          { title: "Damaged or Lost Parcels", body: "If your order arrives damaged or is lost in transit, please contact us within 48 hours of the expected delivery date and we'll resolve it promptly." },
        ].map((item, i) => (
          <div key={i} className="border-l-4 border-indigo-500 pl-4">
            <h3 className="font-bold text-slate-800 mb-1 font-sans text-sm">{item.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{item.body}</p>
          </div>
        ))}
      </div>
    </InfoPageLayout>
  );
};

export default ShippingInformation;
