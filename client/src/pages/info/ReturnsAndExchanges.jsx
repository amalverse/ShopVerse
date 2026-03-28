import React from "react";
import InfoPageLayout from "../../components/ui/InfoPageLayout";
import { Link } from "react-router-dom";

const categories = [
  { name: "Clothing & Apparel", window: "30 days", condition: "Unworn, with original tags" },
  { name: "Electronics", window: "15 days", condition: "Unopened or defective only" },
  { name: "Jewellery & Accessories", window: "30 days", condition: "Unworn, in original packaging" },
  { name: "Cosmetics & Beauty", window: "7 days", condition: "Unopened and sealed" },
  { name: "Footwear", window: "30 days", condition: "Unworn, in original box" },
  { name: "Customised / Personalised Items", window: "Non-returnable", condition: "—" },
];

const ReturnsAndExchanges = () => {
  return (
    <InfoPageLayout
      icon="↩️"
      title="Returns & Exchanges"
      subtitle="We keep returns simple and stress-free. Here's everything you need to know."
    >
      {/* How to return */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 font-sans mb-4">How to Return an Item</h2>
        <ol className="space-y-4">
          {[
            "Log in to your Shopverse account and go to My Orders.",
            "Select the order containing the item(s) you wish to return and click 'Request Return'.",
            "Choose the reason for return and submit. You'll receive a return label via email within 24 hours.",
            "Pack the item securely (in original packaging where possible) and attach the label.",
            "Drop the parcel off at any authorised courier point.",
            "Once we receive and verify the item, your refund will be processed in 5–7 business days.",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-500">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Category table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 font-sans px-6 pt-6 pb-4">Return Windows by Category</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-indigo-50 text-indigo-700 text-left">
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold">Return Window</th>
                <th className="px-6 py-3 font-semibold">Condition</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((row, i) => (
                <tr
                  key={i}
                  className={`border-t border-slate-100 ${i % 2 !== 0 ? "bg-slate-50/60" : ""}`}
                >
                  <td className="px-6 py-3 text-slate-700 font-medium">{row.name}</td>
                  <td className="px-6 py-3 text-slate-500">{row.window}</td>
                  <td className="px-6 py-3 text-slate-500">{row.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-2">
        <p className="text-slate-500 text-sm mb-4">
          Can't find your answer? Our support team is happy to help.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors duration-200"
        >
          Contact Support
        </Link>
      </div>
    </InfoPageLayout>
  );
};

export default ReturnsAndExchanges;
