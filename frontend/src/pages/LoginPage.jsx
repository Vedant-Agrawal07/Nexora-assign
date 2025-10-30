import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) navigate("/pickit");
  }, [navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) return alert("PLEASE FILL ALL FIELDS");

    try {
      const { data } = await axios.post(`${API_URL}/api/user/login`, {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/pickit");
    } catch {
      alert("Invalid credentials!");
    }
  };

  const handleSignup = async () => {
    const { name, email, password, confirmPassword } = formData;
    if (!name || !email || !password || !confirmPassword)
      return alert("PLEASE FILL ALL FIELDS");
    if (password !== confirmPassword) return alert("Passwords don’t match!");

    try {
      const { data } = await axios.post(`${API_URL}/api/user`, {
        name,
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/pickit");
    } catch {
      alert("Signup failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] text-white">
      <div className="relative backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl p-8 rounded-2xl w-[90%] max-w-md transition-all duration-500">
        {/* App Logo */}
        <div className="flex justify-center mb-5">
          <img src="/images/app-logo.png" alt="App Logo" className="w-36" />
        </div>

        <h1 className="text-center text-2xl font-semibold text-[#F97316] mb-3 tracking-wide">
          {isLogin ? "Welcome Back 👋" : "Create an Account"}
        </h1>
        <p className="text-center text-gray-400 mb-6 text-sm">
          {isLogin
            ? "Sign in to continue shopping with PickIt"
            : "Join us and start your shopping journey"}
        </p>

        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6 bg-[#111]/70 rounded-lg overflow-hidden border border-[#F97316]/40">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 font-medium transition-all duration-300 ${
              isLogin
                ? "bg-[#F97316] text-white"
                : "text-[#F97316] hover:bg-[#F97316]/10"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 font-medium transition-all duration-300 ${
              !isLogin
                ? "bg-[#F97316] text-white"
                : "text-[#F97316] hover:bg-[#F97316]/10"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div
          className={`transition-all duration-500 ${
            isLogin ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
          }`}
        >
          {/* LOGIN FORM */}
          {isLogin && (
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                />
              </div>
              <button
                onClick={handleLogin}
                className="bg-[#F97316] hover:bg-[#EA580C] hover:shadow-[#F97316]/30 hover:shadow-lg text-white py-2 rounded-lg transition-all"
              >
                Continue
              </button>
              <p className="text-center text-gray-400 text-sm hover:text-[#F97316] cursor-pointer">
                Forgot your password?
              </p>
            </div>
          )}
        </div>

        {/* SIGNUP FORM */}
        <div
          className={`transition-all duration-500 ${
            !isLogin ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
          }`}
        >
          {!isLogin && (
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  className="pl-10 pr-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#F97316] transition-all"
                />
              </div>
              <button
                onClick={handleSignup}
                className="bg-[#F97316] hover:bg-[#EA580C] hover:shadow-[#F97316]/30 hover:shadow-lg text-white py-2 rounded-lg transition-all"
              >
                Create Account
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-gray-400 mt-6 text-sm">
          {isLogin ? (
            <>
              New here?{" "}
              <span
                className="text-[#F97316] cursor-pointer hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-[#F97316] cursor-pointer hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Log In
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
