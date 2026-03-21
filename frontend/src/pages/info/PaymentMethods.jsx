import React from "react";
import InfoPageLayout from "../../components/ui/InfoPageLayout";

const methods = [
  { icon: "💳", name: "Credit / Debit Cards", desc: "Visa, Mastercard, American Express, and RuPay are all accepted. Your card details are encrypted and never stored on our servers." },
  { icon: "🅿️", name: "PayPal", desc: "Checkout securely using your PayPal balance, linked bank account, or PayPal credit." },
  { icon: "📱", name: "UPI", desc: "Pay instantly via any UPI-enabled app — Google Pay, PhonePe, Paytm, and more." },
  { icon: "🏦", name: "Net Banking", desc: "All major Indian banks are supported for direct net banking transfers at checkout." },
  { icon: "💵", name: "Cash on Delivery", desc: "Available for select pin codes. Pay in cash when your order arrives at your doorstep." },
  { icon: "🎟️", name: "Gift Cards & Vouchers", desc: "Redeem your Shopverse gift cards or coupon codes during checkout for instant discounts." },
];

const PaymentMethods = () => {
  return (
    <InfoPageLayout
      icon="💳"
      title="Payment Methods"
      subtitle="We offer a wide range of secure payment options so you can shop with confidence."
    >
      {/* Security badge */}
      <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-4">
        <span className="text-2xl">🔒</span>
        <p className="text-sm text-indigo-700 font-medium">
          All payments are secured with 256-bit SSL encryption. Your financial data is never shared with third parties.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {methods.map((m, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex gap-4 items-start"
          >
            <div className="text-3xl shrink-0">{m.icon}</div>
            <div>
              <h2 className="font-bold text-slate-800 font-sans mb-1">{m.name}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </InfoPageLayout>
  );
};

export default PaymentMethods;
