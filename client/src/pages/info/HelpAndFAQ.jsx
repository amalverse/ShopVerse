import React, { useState } from "react";
import InfoPageLayout from "../../components/ui/InfoPageLayout";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse our shop, add items to your cart, and proceed to checkout. You'll need a Shopverse account or can check out as a guest.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, UPI, and net banking.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3–5 business days. Express shipping (1–2 days) is available at an additional charge.",
  },
  {
    q: "Can I track my order?",
    a: "Yes! Once dispatched, you'll receive an email with a tracking link. You can also track orders from your account dashboard.",
  },
  {
    q: "What is your return policy?",
    a: "We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. Initiate a return from your orders page.",
  },
  {
    q: "How long does a refund take?",
    a: "Refunds are processed within 5–7 business days after we receive the returned item. The amount will be credited to your original payment method.",
  },
  {
    q: "Is my personal information safe?",
    a: "Absolutely. We use SSL encryption and never share your data with third parties without your consent. Read our Privacy Policy for full details.",
  },
  {
    q: "How do I contact customer support?",
    a: "You can reach us via email at shopverse@mail.com, by phone at +1 234 567 8900, or through the live chat bubble on our website.",
  },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-800 text-sm">{q}</span>
        <span
          className={`ml-4 shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold text-lg leading-none transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
};

const HelpAndFAQ = () => {
  return (
    <InfoPageLayout
      icon="❓"
      title="Help & FAQ"
      subtitle="Everything you need to know about shopping with Shopverse. Can't find an answer? Contact our support team."
    >
      <div className="space-y-3">
        {faqs.map((item, i) => (
          <FAQItem key={i} {...item} />
        ))}
      </div>
    </InfoPageLayout>
  );
};

export default HelpAndFAQ;
