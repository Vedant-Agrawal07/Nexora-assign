// src/components/OrderSummary.jsx
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

/**
 * props:
 *  - cart: { products: [...] }
 *  - onCartChange: function to call to refresh cart in parent
 */
export default function OrderSummary({ cart, onCartChange }) {
  const [localCart, setLocalCart] = useState(cart);
  const [quant , setQuant] = useState(1);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  // helper to format delivery date
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
    // guard
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
      <div className="p-6 text-center text-gray-300">
        <p className="mb-4">Your cart is empty !!</p>
        <Link to={"/pickit"}>
          <button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2 rounded-md">
            View Products
          </button>
        </Link>
       
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {localCart.products.map((cartItem) => {
        const product = cartItem.productId;
        const productId = product._id;
        const selectedDelivery = getDeliveryOption(
          cartItem.delivery_optionId
        );

        return (
          <div key={productId} className="border-b border-gray-800 pb-4">
            <div className="flex gap-4 items-start">
              <img
                src={`/${product.image}`}
                alt={product.name}
                className="w-28 h-28 object-contain rounded"
              />
              <div className="flex-1">
                <div className="font-medium text-lg">{product.name}</div>
                <div className="text-[#F97316] font-semibold mt-1">
                  ₹{product.price / 10}
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div>
                    Quantity:
                    <input
                      defaultValue={cartItem.quantity}
                      className="ml-2 w-16 bg-[#0F0F0F] border border-gray-700 rounded px-2 py-1 text-sm"
                      onChange={(e) => setQuant(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(productId, quant)
                    }
                    className="text-sm text-gray-300 underline"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(productId)}
                    className="text-sm text-red-400 hover:text-red-500 ml-2"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="w-64">
                <div className="text-sm text-gray-400 mb-2">
                  Delivery date:{" "}
                  <span className="text-gray-200">
                    {formatDateFromDays(selectedDelivery.delivery_days)}
                  </span>
                </div>

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
        );
      })}
    </div>
  );
}
