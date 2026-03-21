import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../layout/Navbar";
import { useLoginUserMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    const data = { email, password };

    try {
      const response = await loginUser(data).unwrap();
      const { token, user } = response;
      dispatch(setUser({ token, user }));
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      setMessage(error?.data?.message || "Invalid Email or Password");
      toast.error(error?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-[80vh] flex items-center justify-center p-5 bg-slate-50">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-3">Welcome Back</h2>
            <p className="text-slate-500 font-medium">
              Access your personalized e-commerce experience.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: "" });
                }}
                placeholder="you@example.com"
                className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 text-sm outline-none transition-all
                  ${errors.email ? "border-indigo-400 focus:border-indigo-500" : "border-slate-100 focus:border-indigo-500 focus:bg-white"}
                `}
              />
              {errors.email && <p className="text-indigo-500 text-xs mt-2 ml-1 font-bold">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: "" });
                }}
                placeholder="••••••••"
                className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 text-sm outline-none transition-all
                  ${errors.password ? "border-indigo-400 focus:border-indigo-500" : "border-slate-100 focus:border-indigo-500 focus:bg-white"}
                `}
              />
              {errors.password && <p className="text-indigo-500 text-xs mt-2 ml-1 font-bold">{errors.password}</p>}
            </div>

            {message && (
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
                <p className="text-indigo-600 text-xs font-bold text-center">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-lg hover:shadow-indigo-200 transition-all duration-300 transform active:scale-[0.98] disabled:bg-slate-300"
            >
              {isLoading ? "Logging in..." : "Continue to Account"}
            </button>
          </form>

          <p className="mt-8 text-sm text-slate-500 text-center font-medium">
            New here?{" "}
            <Link to="/register" className="text-indigo-500 font-bold hover:underline underline-offset-4">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
