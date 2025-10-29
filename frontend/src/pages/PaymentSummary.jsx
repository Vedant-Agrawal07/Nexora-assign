// src/components/PaymentSummary.jsx
import React, { useEffect, useState } from "react";
import { getDeliveryOption } from "../lib/deliveryOptions";
import dayjs from "dayjs";
import { add_order } from "../lib/orders.js";
import { useNavigate } from "react-router-dom";


/**
 * props:
 *  - cart: cart object { products: [...] }
 *  - onCartChange() to refresh parent cart (after placing order)
 */
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
      // optional: refresh / clear cart in parent
      if (typeof onCartChange === "function") await onCartChange();
      // navigate to orders page (we can use link)
      navigate("/orders"

      );
    } catch (err) {
      console.error("Failed to place order:", err);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-xl font-semibold mb-2">Order Summary</div>

      <div className="flex justify-between text-sm">
        <div>Items ({totals.itemsCount}):</div>
        <div>₹{totals.productPrice.toFixed(2)}</div>
      </div>

      <div className="flex justify-between text-sm">
        <div>Shipping &amp; handling:</div>
        <div>₹{totals.shipping.toFixed(2)}</div>
      </div>

      <div className="flex justify-between text-sm font-medium mt-2">
        <div>Total before tax:</div>
        <div>₹{totals.beforeTax.toFixed(2)}</div>
      </div>

      <div className="flex justify-between text-sm">
        <div>Estimated tax (10%):</div>
        <div>₹{totals.tax.toFixed(2)}</div>
      </div>

      <div className="flex justify-between text-lg font-bold mt-2">
        <div>Order total:</div>
        <div>₹{totals.total.toFixed(2)}</div>
      </div>

      <button
        disabled={!cart || !cart.products || cart.products.length === 0}
        onClick={handlePlaceOrder}
        className={`w-full mt-4 py-2 rounded-lg font-semibold text-black ${
          cart && cart.products && cart.products.length > 0
            ? "bg-[#F97316] hover:bg-[#EA580C]"
            : "bg-gray-700 opacity-60 cursor-not-allowed"
        }`}
      >
        Place your order
      </button>
    </div>
  );
}
