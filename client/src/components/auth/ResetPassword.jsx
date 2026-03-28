import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        try {
            await resetPassword({ token, password }).unwrap();
            toast.success("Password reset successful!");
            navigate("/login");
        } catch (error) {
            setMessage(error?.data?.message || "Failed to reset password");
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    return (
        <>
            <Navbar />
            <section className="min-h-[80vh] flex items-center justify-center p-5 bg-slate-50">
                <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
                    <div className="mb-10 text-center">
                        <h2 className="text-4xl font-black text-slate-900 mb-3">Reset Password</h2>
                        <p className="text-slate-500 font-medium">
                            Enter your new password below.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
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
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default ResetPassword;
