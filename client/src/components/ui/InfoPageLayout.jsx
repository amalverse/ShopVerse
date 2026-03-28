import React from "react";

/**
 * Reusable layout for all static info pages.
 * Props:
 *   icon       – emoji or JSX icon shown in the hero banner
 *   title      – page heading
 *   subtitle   – short description below the heading
 *   children   – main content blocks
 */
const InfoPageLayout = ({ icon, title, subtitle, children }) => {
  return (
    <div className="min-h-[70vh] bg-[#F8FAFC]">
      {/* Hero banner */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 text-center">
          {icon && (
            <div className="text-5xl mb-4 flex justify-center">{icon}</div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-3">
            {title}
          </h1>
          {subtitle && (
            <p className="text-indigo-100 max-w-xl mx-auto text-base mt-3">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-14 space-y-10">
        {children}
      </div>
    </div>
  );
};

export default InfoPageLayout;
