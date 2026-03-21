import React from "react";
import InfoPageLayout from "../../components/ui/InfoPageLayout";

const steps = [
  { step: "1", title: "Initiate a Return", desc: "Go to your account dashboard, find the order, and click 'Request Return'. You can also email us at returns@shopverse.com." },
  { step: "2", title: "Ship the Item Back", desc: "Pack the item securely in its original packaging and drop it off at any authorised courier partner near you." },
  { step: "3", title: "We Inspect the Item", desc: "Once we receive and verify the returned item (within 2 business days), we begin processing your refund." },
  { step: "4", title: "Refund Credited", desc: "Your money is refunded to the original payment method within 5–7 business days after inspection completes." },
];

const MoneyBackGuarantee = () => {
  return (
    <InfoPageLayout
      icon="💰"
      title="Money Back Guarantee"
      subtitle="Shop with complete confidence. If you're not 100% satisfied, we'll make it right."
    >
      {/* Highlight */}
      <div className="bg-indigo-600 text-white rounded-2xl p-8 text-center shadow-lg">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-2xl font-bold font-sans mb-2">30-Day Full Refund</h2>
        <p className="text-indigo-100 max-w-md mx-auto text-sm leading-relaxed">
          If you're unhappy with your purchase for any reason, return it within 30 days of delivery for a complete, no-questions-asked refund.
        </p>
      </div>

      {/* Eligibility */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 font-sans mb-4">Eligibility Criteria</h2>
        <ul className="space-y-3 text-slate-500 text-sm">
          {[
            "Item must be returned within 30 days of the delivery date.",
            "Item must be unused and in its original condition with all tags attached.",
            "Original packaging must be intact.",
            "Proof of purchase (order number or receipt) is required.",
            "Digital downloads and personalised/customised items are non-refundable.",
          ].map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5">•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 font-sans mb-5">How It Works</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex gap-4 items-start hover:shadow-md transition-shadow duration-200">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 text-sm">
                {s.step}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1 font-sans">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InfoPageLayout>
  );
};

export default MoneyBackGuarantee;
