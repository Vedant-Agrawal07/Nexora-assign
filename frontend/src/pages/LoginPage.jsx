import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) return alert("PLEASE FILL ALL FIELDS");

    try {
      const { data } = await axios.post(
        `${API_URL}/api/user/login`,
        {
          email,
          password,
        }
      );
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
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F0F] text-[#F5F5F5]">
      <div className="bg-[#1A1A1A] p-8 rounded-2xl shadow-lg w-[90%] max-w-md">
        <div className="flex justify-center mb-4">
          <img src="/images/app-logo.png" alt="App Logo" className="w-36" />
        </div>

        <p className="text-center mb-6 text-gray-300">
          Sign in or create an account to continue shopping
        </p>

        <div className="flex justify-center mb-6 space-x-3">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-5 py-2 rounded-lg transition-all ${
              isLogin
                ? "bg-[#F97316] text-white"
                : "bg-transparent border border-[#F97316] text-[#F97316]"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-5 py-2 rounded-lg transition-all ${
              !isLogin
                ? "bg-[#F97316] text-white"
                : "bg-transparent border border-[#F97316] text-[#F97316]"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* LOGIN FORM */}
        {isLogin ? (
          <div className="flex flex-col space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="px-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg focus:outline-none focus:border-[#F97316]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="px-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg focus:outline-none focus:border-[#F97316]"
            />
            <button
              onClick={handleLogin}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white py-2 rounded-lg transition-all"
            >
              Submit
            </button>
          </div>
        ) : (
          /* SIGNUP FORM */
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="px-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg focus:outline-none focus:border-[#F97316]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="px-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg focus:outline-none focus:border-[#F97316]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="px-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg focus:outline-none focus:border-[#F97316]"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="px-4 py-2 bg-[#0F0F0F] border border-gray-700 rounded-lg focus:outline-none focus:border-[#F97316]"
            />
            <button
              onClick={handleSignup}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white py-2 rounded-lg transition-all"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
