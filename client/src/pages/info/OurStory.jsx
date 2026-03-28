import React from "react";
import InfoPageLayout from "../../components/ui/InfoPageLayout";
import { Link } from "react-router-dom";

const stats = [
  { value: "50,000+", label: "Happy Customers" },
  { value: "10,000+", label: "Products Listed" },
  { value: "150+", label: "Brands Partnered" },
  { value: "99%", label: "Satisfaction Rate" },
];

const values = [
  {
    icon: "🤝",
    title: "Customer First",
    desc: "Every decision we make is guided by one question: is this better for our customers? From intuitive design to flexible returns, customers are at our core.",
  },
  {
    icon: "🌿",
    title: "Sustainability",
    desc: "We are committed to responsible sourcing and minimising our environmental footprint with eco-friendly packaging and carbon-neutral shipping options.",
  },
  {
    icon: "🔍",
    title: "Transparency",
    desc: "No hidden fees, no misleading descriptions. We believe in honest pricing, authentic product photography, and real customer reviews.",
  },
  {
    icon: "⚡",
    title: "Innovation",
    desc: "We continuously invest in technology to make your shopping experience faster, smarter, and more personalised than ever before.",
  },
];

const team = [
  { name: "Priya Anand", role: "Founder & CEO", emoji: "👩‍💼" },
  { name: "Rahul Mehta", role: "Head of Product", emoji: "👨‍💻" },
  { name: "Sara Thomas", role: "Design Lead", emoji: "🎨" },
  { name: "Anil Kumar", role: "Head of Logistics", emoji: "🚚" },
];

const OurStory = () => {
  return (
    <InfoPageLayout
      icon="🛍️"
      title="Our Story"
      subtitle="We started with a simple idea — shopping should be effortless, trustworthy, and inspiring. Here's our story."
    >
      {/* Mission statement */}
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
        <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto italic">
          "Shopverse was founded in 2020 with the mission of connecting people to
          the products they love — from everyday essentials to premium lifestyle
          finds — all in one beautifully curated marketplace."
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-indigo-600 text-white rounded-2xl p-5 text-center shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <p className="text-3xl font-bold font-sans mb-1">{s.value}</p>
            <p className="text-indigo-100 text-xs font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Our story */}
      <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-800 font-sans">Our Story</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          Shopverse began in a small apartment in New Delhi, born from frustration
          with unreliable online shopping experiences. Our founders, avid shoppers
          themselves, wanted a platform that combined a massive product catalogue
          with the trust and care of a neighbourhood store.
        </p>
        <p className="text-slate-500 text-sm leading-relaxed">
          What started as a fashion-forward boutique quickly expanded into a
          full-scale e-commerce destination covering electronics, jewellery,
          cosmetics, accessories, and more. Today, we serve customers across India
          and beyond — and we're just getting started.
        </p>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 font-sans mb-5">Our Values</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex gap-4 items-start"
            >
              <div className="text-3xl shrink-0">{v.icon}</div>
              <div>
                <h3 className="font-bold text-slate-800 font-sans mb-1">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 font-sans mb-5">Meet the Team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {team.map((t, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-5xl mb-3">{t.emoji}</div>
              <p className="font-bold text-slate-800 font-sans text-sm">{t.name}</p>
              <p className="text-indigo-600 text-xs mt-1 font-medium">{t.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-2">
        <p className="text-slate-500 text-sm mb-4">
          Want to be part of our journey?
        </p>
        <Link
          to="/work-with-us"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors duration-200"
        >
          Join Our Team
        </Link>
      </div>
    </InfoPageLayout>
  );
};

export default OurStory;
