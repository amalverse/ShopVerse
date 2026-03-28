import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqData = [
  {
    question: "What is the return policy?",
    answer: "Our return policy allows returns within 30 days of purchase. The items must be unused and in their original packaging.",
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping typically takes 3-7 business days within the country. International shipping may take up to 14 days.",
  },
  {
    question: "How can I track my order?",
    answer: "You can track your order status in your dashboard under 'My Orders'. A tracking number will also be sent to your email once the item is shipped.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to most countries globally. Shipping fees and delivery times vary by location.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Stripe for secure online payments.",
  },
];

const FAQAccordion = () => {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-slate-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-slate-900 mb-12 font-sans">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={activeId === index}
              >
                <span className="text-lg font-medium text-slate-800">
                  {item.question}
                </span>
                <span className="text-indigo-500">
                  {activeId === index ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
              <AnimatePresence>
                {activeId === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-50 pt-4">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQAccordion;
