import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useVerifyEmailMutation } from "../../redux/features/auth/authApi";
import Navbar from "../layout/Navbar";

const VerifyEmail = () => {
    const { token } = useParams();
    const [verifyEmail] = useVerifyEmailMutation();
    const [status, setStatus] = useState("verifying"); // verifying, success, error
    const [message, setMessage] = useState("");

    useEffect(() => {
        const handleVerify = async () => {
            try {
                await verifyEmail(token).unwrap();
                setStatus("success");
                setMessage("Your email has been verified successfully!");
            } catch (error) {
                setStatus("error");
                setMessage(error?.data?.message || "Verification failed. The link might be invalid or expired.");
            }
        };
        handleVerify();
    }, [token, verifyEmail]);

    return (
        <>
            <Navbar />
            <section className="min-h-[80vh] flex items-center justify-center p-5 bg-slate-50">
                <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 text-center">
                    <h2 className="text-3xl font-black text-slate-900 mb-6">Email Verification</h2>
                    
                    {status === "verifying" && (
                        <div className="flex flex-col items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                            <p className="text-slate-500 font-medium">Verifying your email...</p>
                        </div>
                    )}

                    {status === "success" && (
                        <div>
                            <div className="bg-green-50 text-green-600 p-4 rounded-2xl mb-6 font-bold">
                                {message}
                            </div>
                            <Link to="/login" className="inline-block bg-slate-900 hover:bg-green-600 text-white font-black py-4 px-8 rounded-2xl shadow-lg transition-all">
                                Go to Login
                            </Link>
                        </div>
                    )}

                    {status === "error" && (
                        <div>
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 font-bold">
                                {message}
                            </div>
                            <Link to="/register" className="inline-block bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 px-8 rounded-2xl shadow-lg transition-all">
                                Back to Register
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default VerifyEmail;
