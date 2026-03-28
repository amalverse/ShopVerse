import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { useForgotPasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
    const [message, setMessage] = useState("");
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            await forgotPassword({ email }).unwrap();
            setIsSent(true);
            setMessage("Password reset link sent! Please check your email inbox.");
            toast.success("Reset link sent!");
        } catch (error) {
            setMessage(error?.data?.message || "Failed to send reset link");
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <Navbar />
            <section className="min-h-[80vh] flex items-center justify-center p-5 bg-slate-50">
                <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl font-black text-slate-900 mb-3">Forgot Password</h2>
                        <p className="text-slate-500 font-medium">
                            Enter your email to receive a password reset link.
                        </p>
                    </div>

                    {!isSent ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            {message && (
                                <div className="bg-red-50 border border-red-100 p-4 rounded-2xl">
                                    <p className="text-red-600 text-xs font-bold text-center">{message}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-lg transition-all transform active:scale-[0.98] disabled:bg-slate-300"
                            >
                                {isLoading ? "Sending..." : "Send Reset Link"}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <div className="bg-green-50 text-green-600 p-4 rounded-2xl mb-6 font-bold">
                                {message}
                            </div>
                            <Link to="/login" className="text-indigo-500 font-bold hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    )}

                    <p className="mt-8 text-sm text-slate-500 text-center font-medium">
                        Remember your password?{" "}
                        <Link to="/login" className="text-indigo-500 font-bold hover:underline underline-offset-4">
                            Login instead
                        </Link>
                    </p>
                </div>
            </section>
        </>
    );
};

export default ForgotPassword;
