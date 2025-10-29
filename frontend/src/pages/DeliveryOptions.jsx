// src/components/DeliveryOptions.jsx
import React from "react";
import dayjs from "dayjs";
import { deliveryOptions } from "../lib/deliveryOptions";

/**
 * Props:
 *  - productId (string)
 *  - selectedId (string)
 *  - onChange(optionId) -> called when user picks an option
 */
export default function DeliveryOptions({ productId, selectedId, onChange }) {
  return (
    <div className="space-y-3">
      {deliveryOptions.map((opt) => {
        const dateString = dayjs()
          .add(opt.delivery_days, "day")
          .format("dddd, MMMM D");
        const priceLabel = opt.price === 0 ? "FREE" : `₹${opt.price / 10}`;
        const checked = opt.id === selectedId;

        return (
          <label
            key={opt.id}
            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer border ${
              checked ? "border-[#F97316] bg-[#111111]" : "border-gray-800"
            }`}
          >
            <input
              name={`delivery_option_${productId}`}
              type="radio"
              checked={checked}
              onChange={() => onChange(opt.id)}
              className="mt-1"
            />
            <div>
              <div className="text-sm">{dateString}</div>
              <div className="text-xs text-gray-400">
                {priceLabel} - Shipping
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
