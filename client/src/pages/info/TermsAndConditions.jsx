import React from "react";
import InfoPageLayout from "../../components/ui/InfoPageLayout";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using the Shopverse website and services, you confirm that you are at least 18 years of age (or have the consent of a parent/guardian), and that you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.",
  },
  {
    title: "2. Account Registration",
    body: "To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately at support@shopverse.com if you suspect unauthorised use of your account.",
  },
  {
    title: "3. Purchases & Pricing",
    body: "All prices are displayed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise. We reserve the right to modify prices without prior notice. A confirmed order is a binding contract; once placed and confirmed, cancellations are subject to our Return & Refund Policy.",
  },
  {
    title: "4. Product Descriptions",
    body: "We make every effort to display accurate product descriptions, images, and pricing. However, we do not warrant that all information is error-free. In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price and notify you promptly.",
  },
  {
    title: "5. Shipping & Delivery",
    body: "Delivery timelines are estimates and may vary due to logistics or external factors. Shopverse is not liable for delays caused by third-party carriers, adverse weather, or force majeure events. Risk of loss or damage passes to you upon delivery.",
  },
  {
    title: "6. Returns & Refunds",
    body: "Our Return Policy allows eligible items to be returned within 30 days of delivery. Please review the full Returns page for category-specific conditions. Refunds are processed within 5–7 business days to the original payment method upon successful inspection of the returned item.",
  },
  {
    title: "7. Intellectual Property",
    body: "All content on this website — including text, images, logos, icons, and software — is the exclusive property of Shopverse or its content licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.",
  },
  {
    title: "8. User Conduct",
    body: "You agree not to use Shopverse for any unlawful purpose, to submit false or fraudulent orders, to transmit harmful code or spam, or to infringe upon the rights of others. We reserve the right to suspend or terminate accounts that violate these terms.",
  },
  {
    title: "9. Limitation of Liability",
    body: "To the maximum extent permitted by law, Shopverse shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of (or inability to use) our services. Our total liability shall not exceed the amount paid by you for the specific transaction in dispute.",
  },
  {
    title: "10. Governing Law",
    body: "These Terms and Conditions are governed by the laws of India. Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.",
  },
  {
    title: "11. Changes to Terms",
    body: "We may revise these Terms at any time. Material changes will be communicated via email or a notice on our website. Continued use of Shopverse following such changes constitutes your acceptance of the revised Terms.",
  },
];

const TermsAndConditions = () => {
  return (
    <InfoPageLayout
      icon="📋"
      title="Terms & Conditions"
      subtitle={`Last updated: March 2026 — Please read these terms carefully before using Shopverse.`}
    >
      {/* Intro box */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-4 text-sm text-indigo-700 font-medium leading-relaxed">
        These Terms and Conditions ("Terms") govern your use of the Shopverse platform and services. By continuing to use our website, you agree to these Terms in full.
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((s, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h2 className="text-base font-bold text-slate-800 font-sans mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              {s.title.replace(/^\d+\.\s/, "")}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed pl-9">{s.body}</p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="text-center pt-2 space-y-2">
        <p className="text-slate-400 text-sm">Have questions about our Terms?</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a href="mailto:legal@shopverse.com" className="text-indigo-600 hover:underline text-sm font-semibold">
            legal@shopverse.com
          </a>
          <span className="text-slate-300">·</span>
          <Link to="/privacy" className="text-indigo-600 hover:underline text-sm font-semibold">
            Privacy Policy
          </Link>
          <span className="text-slate-300">·</span>
          <Link to="/contact" className="text-indigo-600 hover:underline text-sm font-semibold">
            Contact Us
          </Link>
        </div>
      </div>
    </InfoPageLayout>
  );
};

export default TermsAndConditions;
