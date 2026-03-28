import React from "react";
import InfoPageLayout from "../../components/ui/InfoPageLayout";

const openRoles = [
  {
    title: "Frontend Developer",
    type: "Full-time · Remote",
    dept: "Engineering",
    emoji: "💻",
    desc: "Build responsive, performant React interfaces that delight millions of shoppers every day.",
  },
  {
    title: "Backend Developer",
    type: "Full-time · Hybrid",
    dept: "Engineering",
    emoji: "⚙️",
    desc: "Design and maintain robust Node.js / Express APIs, database schemas, and third-party integrations.",
  },
  {
    title: "UX / Product Designer",
    type: "Full-time · Remote",
    dept: "Design",
    emoji: "🎨",
    desc: "Craft intuitive shopping experiences — from wireframes and prototypes to polished final designs.",
  },
  {
    title: "Marketing Specialist",
    type: "Full-time · Delhi Office",
    dept: "Marketing",
    emoji: "📣",
    desc: "Drive growth through data-driven campaigns, influencer partnerships, and content strategy.",
  },
  {
    title: "Customer Success Manager",
    type: "Full-time · Remote",
    dept: "Support",
    emoji: "🤝",
    desc: "Champion customer happiness by resolving issues quickly and identifying systemic improvements.",
  },
  {
    title: "Logistics Coordinator",
    type: "Full-time · Delhi Office",
    dept: "Operations",
    emoji: "🚚",
    desc: "Manage carrier relationships, track shipment performance, and optimise last-mile delivery.",
  },
];

const perks = [
  { icon: "🏠", label: "Remote-Friendly" },
  { icon: "🏥", label: "Health Insurance" },
  { icon: "📚", label: "Learning Budget" },
  { icon: "🎂", label: "Birthday Leave" },
  { icon: "💰", label: "Competitive Pay" },
  { icon: "🌍", label: "Global Team" },
];

const JoinOurTeam = () => {
  return (
    <InfoPageLayout
      icon="💼"
      title="Join Our Team"
      subtitle="Join a passionate, remote-friendly team building the future of e-commerce in India and beyond."
    >
      {/* Culture banner */}
      <div className="bg-indigo-600 text-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold font-sans mb-3">Why Shopverse?</h2>
        <p className="text-indigo-100 text-sm leading-relaxed max-w-2xl">
          We move fast, we care deeply, and we build together. Whether you're
          an engineer, designer, or marketer, you'll have the autonomy to own
          your work and the support of a tight-knit, collaborative team.
        </p>
      </div>

      {/* Perks */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 font-sans mb-4">Perks & Benefits</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {perks.map((p, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-3xl mb-2">{p.icon}</div>
              <p className="text-xs text-slate-600 font-medium leading-tight">{p.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Open roles */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 font-sans mb-5">Open Positions</h2>
        <div className="space-y-4">
          {openRoles.map((role, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="text-4xl shrink-0">{role.emoji}</div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-800 font-sans">{role.title}</h3>
                  <span className="text-xs bg-indigo-50 text-indigo-600 font-medium px-2 py-0.5 rounded-full">
                    {role.dept}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium mb-2">{role.type}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{role.desc}</p>
              </div>
              <a
                href="mailto:careers@shopverse.com"
                className="shrink-0 bg-indigo-600 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors duration-200 text-center"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Apply footer */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center shadow-sm">
        <p className="text-slate-600 text-sm mb-1">
          Don't see the right role? We're always interested in exceptional people.
        </p>
        <a
          href="mailto:careers@shopverse.com"
          className="text-indigo-600 font-semibold text-sm hover:underline"
        >
          Send your CV to careers@shopverse.com →
        </a>
      </div>
    </InfoPageLayout>
  );
};

export default JoinOurTeam;
