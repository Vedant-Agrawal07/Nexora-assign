import React, { useEffect, useState } from "react";
import { getDeliveryOption } from "../lib/deliveryOptions";
import dayjs from "dayjs";
import { add_order } from "../lib/orders.js";
import { useNavigate } from "react-router-dom";

export default function PaymentSummary({ cart, onCartChange }) {
  const [totals, setTotals] = useState({
    itemsCount: 0,
    productPrice: 0,
    shipping: 0,
    beforeTax: 0,
    tax: 0,
    total: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    calculateTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  function calculateTotals() {
    let product_price = 0;
    let delivery_total = 0;
    let items = 0;

    (cart.products || []).forEach((cart_item) => {
      items += 1;
      product_price += (cart_item.productId.price * cart_item.quantity) / 10;
      const delOpt = getDeliveryOption(cart_item.delivery_optionId);
      delivery_total += delOpt.price / 10;
    });

    const beforeTax = product_price + delivery_total;
    const tax = beforeTax * 0.1;
    const total = beforeTax + tax;

    setTotals({
      itemsCount: items,
      productPrice: product_price,
      shipping: delivery_total,
      beforeTax,
      tax,
      total,
    });
  }

  const handlePlaceOrder = async () => {
    if (!cart || !cart.products || cart.products.length === 0) return;

    const orderPlacedDate = dayjs().format("MMMM DD YYYY");
    const deliveryDateArray = (cart.products || []).map((cart_item) => {
      const deliveryOption = getDeliveryOption(cart_item.delivery_optionId);
      return dayjs()
        .add(deliveryOption.delivery_days, "day")
        .format("dddd, MMMM D");
    });

    try {
      await add_order(cart, totals.total, deliveryDateArray, orderPlacedDate);
      if (typeof onCartChange === "function") await onCartChange();
      navigate("/orders");
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#1A1A1A] to-[#111111] border border-gray-800 rounded-2xl shadow-lg p-6 space-y-6 sticky top-6 backdrop-blur-sm">
      <h2 className="text-2xl font-semibold text-gray-100 border-b border-gray-800 pb-3">
        Order Summary
      </h2>

      {/* Summary Lines */}
      <div className="space-y-2 text-sm text-gray-300">
        <div className="flex justify-between">
          <span>Items ({totals.itemsCount})</span>
          <span>₹{totals.productPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping &amp; Handling</span>
          <span>₹{totals.shipping.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-4 space-y-2 text-sm text-gray-300">
        <div className="flex justify-between">
          <span>Total before tax</span>
          <span>₹{totals.beforeTax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-400">
          <span>Estimated Tax (10%)</span>
          <span>₹{totals.tax.toFixed(2)}</span>
        </div>
      </div>

      {/* Final Total */}
      <div className="border-t border-gray-700 pt-4 flex justify-between items-center bg-[#0F0F0F]/50 rounded-xl px-4 py-3">
        <span className="text-lg font-semibold text-gray-100">Order Total</span>
        <span className="text-xl font-bold text-[#F97316]">
          ₹{totals.total.toFixed(2)}
        </span>
      </div>

      {/* Place Order Button */}
      <button
        disabled={!cart || !cart.products || cart.products.length === 0}
        onClick={handlePlaceOrder}
        className={`w-full py-3 mt-3 rounded-xl font-semibold text-white tracking-wide transition-all duration-300 shadow-md ${
          cart && cart.products && cart.products.length > 0
            ? "bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:shadow-[0_0_15px_#F9731633] active:scale-95"
            : "bg-gray-700 opacity-60 cursor-not-allowed"
        }`}
      >
        Place Your Order
      </button>

      <p className="text-xs text-gray-500 text-center leading-relaxed">
        By placing your order, you agree to PickIt’s{" "}
        <span className="text-[#F97316] hover:underline cursor-pointer">
          Terms and Conditions
        </span>
        .
      </p>
    </div>
  );
}
