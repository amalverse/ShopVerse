import React, { useState } from "react";
import { FiSend, FiCheckCircle } from "react-icons/fi";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", subject: "", body: "" };

    if (name.trim().length < 2) {
      newErrors.name = "Please provide your full name.";
      isValid = false;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "A valid email is required for us to respond.";
      isValid = false;
    }

    if (subject.trim().length < 3) {
      newErrors.subject = "Please specify a subject for your enquiry.";
      isValid = false;
    }

    if (body.trim().length < 10) {
      newErrors.body = "Please provide more details (minimum 10 characters).";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    const data = { name, email, subject, message: body };
    console.log("CONTACT FORM DATA:", data);

    setMessage("Your message has been received! Our team will contact you shortly. ✨");
    setName("");
    setEmail("");
    setSubject("");
    setBody("");
  };

  return (
    <section className="flex items-center justify-center py-10">
      <div className="w-full bg-white relative">
        {/* Header */}
        <div className="mb-8 text-center lg:text-left">
          <h2 className="text-3xl font-black text-slate-900 font-sans tracking-tight mb-2 uppercase tracking-[0.1em]">Send Us a Message</h2>
          <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-md">
            Fill out the form below and we'll get back to you within 24 business hours.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleContactSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Name */}
             <div>
               <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                 Full Name
               </label>
               <input
                 type="text"
                 value={name}
                 onChange={(e) => {
                   setName(e.target.value);
                   setErrors((prev) => ({ ...prev, name: "" }));
                 }}
                 placeholder="Enter your name"
                 className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border text-[15px] font-medium transition-all outline-none
                   ${errors.name ? "border-indigo-400 ring-2 ring-indigo-50" : "border-slate-100 hover:border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 shadow-sm"}`}
               />
               {errors.name && (
                 <p className="mt-2 text-xs font-bold text-indigo-500 ml-1">{errors.name}</p>
               )}
             </div>

             {/* Email */}
             <div>
               <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
                 Email Address
               </label>
               <input
                 type="email"
                 value={email}
                 onChange={(e) => {
                   setEmail(e.target.value);
                   setErrors((prev) => ({ ...prev, email: "" }));
                 }}
                 placeholder="you@example.com"
                 className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border text-[15px] font-medium transition-all outline-none
                   ${errors.email ? "border-indigo-400 ring-2 ring-indigo-50" : "border-slate-100 hover:border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 shadow-sm"}`}
               />
               {errors.email && (
                 <p className="mt-2 text-xs font-bold text-indigo-500 ml-1">{errors.email}</p>
               )}
             </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setErrors((prev) => ({ ...prev, subject: "" }));
              }}
              placeholder="How can we help?"
              className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border text-[15px] font-medium transition-all outline-none
                ${errors.subject ? "border-indigo-400 ring-2 ring-indigo-50" : "border-slate-100 hover:border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 shadow-sm"}`}
            />
            {errors.subject && (
              <p className="mt-2 text-xs font-bold text-indigo-500 ml-1">{errors.subject}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">
              Your Message
            </label>
            <textarea
              rows="5"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
                setErrors((prev) => ({ ...prev, body: "" }));
              }}
              placeholder="Tell us what's on your mind..."
              className={`w-full px-5 py-4 rounded-3xl bg-slate-50 border text-[15px] font-medium outline-none resize-none transition-all
                ${errors.body ? "border-indigo-400 ring-2 ring-indigo-50" : "border-slate-100 hover:border-slate-200 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 shadow-sm"}`}
            />
            {errors.body && (
              <p className="mt-2 text-xs font-bold text-indigo-500 ml-1">{errors.body}</p>
            )}
          </div>

          {/* Success Message */}
          {message && (
            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-3 text-indigo-600 font-bold text-sm">
               <FiCheckCircle className="text-xl" />
               {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-slate-900 text-white font-black py-4 px-8 rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 group"
          >
            Send Message
            <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
