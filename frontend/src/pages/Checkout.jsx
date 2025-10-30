// src/pages/Checkout.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OrderSummary from "./OrderSummary.jsx";
import PaymentSummary from "./PaymentSummary.jsx";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ products: [] });
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  async function fetchCart() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    try {
      const res = await axios.get(`${API_URL}/api/cart`, {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setCart(res.data || { products: [] });
    } catch (err) {
      if (err.response?.status === 400) setCart({ products: [] });
      else console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCartChange = async () => {
    await fetchCart();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] flex flex-col items-center justify-center">
        <img
          src="/images/icons/loading-spinner.svg"
          alt="Loading"
          className="w-10 h-10 animate-spin mb-3"
        />
        <p className="text-gray-400 text-sm tracking-wide">
          Fetching your cart...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-['Inter']">
      {/* Header */}
      <header className="bg-[#121212] border-b border-gray-800 px-6 py-4 sticky top-0 z-50 shadow-md shadow-black/10 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <img
              src="/images/minimal-logo.png"
              alt="logo"
              className="w-9 h-9"
            />
            <Link
              to="/pickit"
              className="text-sm text-gray-400 hover:text-[#F97316] transition-colors duration-200"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Middle */}
          <div className="text-sm font-medium text-gray-300 tracking-wide uppercase">
            Checkout
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            <img
              src="/images/icons/checkout-lock-icon.png"
              alt="secure"
              className="w-5 opacity-80"
            />
            <span className="text-xs text-gray-400">Secure</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 md:p-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Order Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Review Your Order
              </h2>
              <span className="text-sm text-gray-400">
                {cart.products?.length || 0} item(s)
              </span>
            </div>

            <div className="bg-[#1A1A1A] rounded-2xl p-6 shadow-lg shadow-black/20 hover:shadow-black/30 transition-shadow duration-200">
              <OrderSummary cart={cart} onCartChange={handleCartChange} />
            </div>
          </div>

          {/* Right - Payment Summary */}
          <div className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-2xl p-6 shadow-lg shadow-black/20 hover:shadow-black/30 transition-all duration-200">
              <PaymentSummary cart={cart} onCartChange={handleCartChange} />
            </div>

            {/* Info Box */}
            <div className="text-xs text-gray-500 text-center border border-gray-800 rounded-xl py-3 px-4 bg-[#141414]">
              All orders are securely processed and protected by encryption.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
