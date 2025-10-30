import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { getDeliveryOption } from "../lib/deliveryOptions.js";
import {
  remove_from_cart,
  update_delivery_option,
  updateCartProduct,
} from "../lib/Cart.js";
import DeliveryOptions from "./DeliveryOptions.jsx";
import { Link } from "react-router-dom";

export default function OrderSummary({ cart, onCartChange }) {
  const [localCart, setLocalCart] = useState(cart);
  const [quant, setQuant] = useState(1);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  function formatDateFromDays(days) {
    return dayjs().add(days, "day").format("dddd, MMMM D");
  }

  async function handleDelete(productId) {
    try {
      await remove_from_cart(productId);
      await onCartChange();
    } catch (err) {
      console.error("Failed to remove:", err);
    }
  }

  async function handleUpdateQuantity(productId, newQty) {
    const qty = Number(newQty) || 1;
    try {
      await updateCartProduct(productId, qty);
      await onCartChange();
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  }

  async function handleDeliveryChange(productId, deliveryOptionId) {
    try {
      await update_delivery_option(productId, deliveryOptionId);
      await onCartChange();
    } catch (err) {
      console.error("Failed to update delivery option:", err);
    }
  }

  if (
    !localCart ||
    !Array.isArray(localCart.products) ||
    localCart.products.length === 0
  ) {
    return (
      <div className="p-10 text-center text-gray-400 bg-[#1A1A1A] rounded-2xl shadow-md">
        <p className="mb-5 text-lg">Your cart is empty 😢</p>
        <Link to="/pickit">
          <button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-[#F9731633]">
            Browse Products
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {localCart.products.map((cartItem) => {
        const product = cartItem.productId;
        const productId = product._id;
        const selectedDelivery = getDeliveryOption(cartItem.delivery_optionId);

        return (
          <div
            key={productId}
            className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6 shadow-md hover:shadow-[#F973161A] hover:border-[#F97316] transition-all duration-200"
          >
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Product Image */}
              <div className="flex-shrink-0 flex justify-center sm:justify-start w-full sm:w-40">
                <img
                  src={`/${product.image}`}
                  alt={product.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded-xl bg-[#0F0F0F] p-3 shadow-inner border border-gray-700 hover:scale-105 transition-transform"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 w-full">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-100 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-[#F97316] font-bold text-lg sm:text-xl">
                      ₹{product.price / 10}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-400">Qty:</label>
                    <input
                      defaultValue={cartItem.quantity}
                      onChange={(e) => setQuant(e.target.value)}
                      className="w-16 bg-[#0F0F0F] border border-gray-700 rounded-full px-3 py-1 text-sm text-gray-200 focus:border-[#F97316] focus:outline-none transition"
                    />
                  </div>

                  <button
                    onClick={() => handleUpdateQuantity(productId, quant)}
                    className="text-sm font-medium text-[#F97316] hover:text-[#EA580C] transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(productId)}
                    className="text-sm font-medium text-red-400 hover:text-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="w-full sm:w-72 bg-[#0F0F0F] rounded-xl p-5 border border-gray-800 shadow-inner mt-4 sm:mt-0">
                <p className="text-sm text-gray-400 mb-2 flex justify-between">
                  <span>Delivery date:</span>
                  <span className="text-gray-100 font-medium">
                    {formatDateFromDays(selectedDelivery.delivery_days)}
                  </span>
                </p>
                <div className="border-t border-gray-800 mt-3 pt-3">
                  <DeliveryOptions
                    productId={productId}
                    selectedId={cartItem.delivery_optionId}
                    onChange={(optionId) =>
                      handleDeliveryChange(productId, optionId)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
