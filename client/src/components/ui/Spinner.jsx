import React from 'react';

const Spinner = ({ text = "Loading...", className = "" }) => (
    <div className={`flex items-center justify-center py-20 text-slate-400 ${className}`}>
        <svg className="animate-spin w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        {text}
    </div>
);

export default Spinner;
