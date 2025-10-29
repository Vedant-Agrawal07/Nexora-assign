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

  // fetch cart from backend (central source of truth)
  async function fetchCart() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: { authorization: `Bearer ${user.token}` },
      });
      setCart(res.data || { products: [] });
    } catch (err) {
      // if 400 (cart not found) set empty
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

  // Called by children when cart changed (delete/update/place-order)
  const handleCartChange = async () => {
    await fetchCart();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-['Roboto']">
      {/* Header */}
      <header className="bg-[#1A1A1A] border-b border-gray-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/minimal-logo.png" alt="logo" className="w-10" />
            <Link
              to={"/pickit"}
              className="text-sm text-gray-400 hover:text-[#F97316]"
            >
              Continue shopping
            </Link>
          </div>

          <div className="text-sm text-gray-300">Checkout</div>

          <div>
            <img
              src="/images/icons/checkout-lock-icon.png"
              alt="secure"
              className="w-6"
            />
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* order summary - wide column */}
          <div className="lg:col-span-2">
            <div className="text-2xl font-semibold mb-4">Review your order</div>
            <div className="bg-[#1A1A1A] rounded-2xl p-4">
              <OrderSummary cart={cart} onCartChange={handleCartChange} />
            </div>
          </div>

          {/* payment summary - right column */}
          <div>
            <div className="bg-[#1A1A1A] rounded-2xl p-4">
              <PaymentSummary cart={cart} onCartChange={handleCartChange} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
