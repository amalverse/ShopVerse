import React from "react";
import InfoPageLayout from "../../components/ui/InfoPageLayout";

const sections = [
  {
    title: "1. Information We Collect",
    body: "We collect information you provide directly to us, such as your name, email address, shipping address, and payment details when you create an account or place an order. We also automatically collect certain technical information (such as IP address, browser type, and pages visited) when you use our website.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to process orders and payments, send order confirmations and shipping updates, provide customer support, personalise your shopping experience, send you marketing communications (only with your consent), and improve our products and services.",
  },
  {
    title: "3. Sharing Your Information",
    body: "We do not sell or rent your personal information to third parties. We share your data only with trusted service providers (e.g., payment processors, logistics partners) who are contractually obligated to keep it confidential and use it solely for the purpose of delivering services to you.",
  },
  {
    title: "4. Cookies",
    body: "Our website uses cookies to enhance your browsing experience, remember your preferences, and analyse website traffic. You can control cookie settings through your browser. Note that disabling certain cookies may affect the functionality of the site.",
  },
  {
    title: "5. Data Security",
    body: "We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits to protect your personal information from unauthorised access, alteration, or disclosure.",
  },
  {
    title: "6. Your Rights",
    body: "You have the right to access, correct, or delete your personal data at any time. You may also opt out of marketing communications by clicking 'Unsubscribe' in any email or by contacting us directly. To exercise your rights, email us at privacy@shopverse.com.",
  },
  {
    title: "7. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Significant changes will be communicated via email or a prominent notice on our website. Continued use of Shopverse after such changes constitutes your acceptance of the updated policy.",
  },
];

const PrivacyPolicy = () => {
  return (
    <InfoPageLayout
      icon="🔏"
      title="Privacy Policy"
      subtitle={`Last updated: March 2026 — We are committed to protecting your personal information and your right to privacy.`}
    >
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-4 text-sm text-indigo-700 font-medium">
        This Privacy Policy explains how Shopverse collects, uses, and protects your personal data when you use our website and services. Please read carefully.
      </div>

      <div className="space-y-6">
        {sections.map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-800 font-sans mb-3">{s.title}</h2>
            <p className="text-slate-500 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="text-center pt-2 text-slate-400 text-sm">
        Questions? Email us at{" "}
        <a href="mailto:privacy@shopverse.com" className="text-indigo-600 hover:underline">
          privacy@shopverse.com
        </a>
      </div>
    </InfoPageLayout>
  );
};

export default PrivacyPolicy;
