import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../layout/Navbar";
import { useRegisterUserMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (username.trim().length < 2) {
      newErrors.username = "Username must be at least 2 characters";
    }

    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!passRegex.test(password)) {
      newErrors.password = "Password must be 8+ chars with uppercase, number & symbol";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!validate()) return;

    const data = { username, email, password, role: "user" };

    try {
      await registerUser(data).unwrap();
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      setMessage(error?.data?.message || "Registration failed");
      toast.error(error?.data?.message || "Error registering user");
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-[80vh] flex items-center justify-center p-5 bg-slate-50">
        <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-100">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black text-slate-900 mb-3">Join Us</h2>
            <p className="text-slate-500 font-medium">
              Create an account and start shopping today.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (errors.username) setErrors({ ...errors, username: "" });
                }}
                placeholder="John Doe"
                className={`w-full px-5 py-4 rounded-2xl bg-slate-50 border-2 text-sm outline-none transition-all
                  ${errors.username ? "border-indigo-400 focus:border-indigo-500" : "border-slate-100 focus:border-indigo-500 focus:bg-white"}
                `}
              />
              {errors.username && <p className="text-indigo-500 text-xs mt-2 ml-1 font-bold">{errors.username}</p>}
            </div>

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
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-sm text-slate-500 text-center font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 font-bold hover:underline underline-offset-4">
              Login here
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;

// I have used error as State Management in this component
// Instead of this I can use just SetMassage and show the global message
