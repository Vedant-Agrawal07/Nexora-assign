// src/lib/orders.js
import axios from "axios";

export let orders;
export let order_placed;

const user = JSON.parse(localStorage.getItem("user"));

export async function add_order(
  cartData,
  total,
  deliveryDateArray,
  order_placed_date
) {
  if (!user?.token) {
    console.error("User not authenticated");
    return;
  }

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  const payload = {
    cart: JSON.stringify(cartData),
    totalCost: total,
    deliveryDateArray: JSON.stringify(deliveryDateArray),
    orderDate: order_placed_date,
  };

  try {
    await axios.post("http://localhost:5000/api/order/add", payload, config);
    order_placed = order_placed_date;
  } catch (error) {
    console.error("Error adding order:", error);
  }
}

export async function fetch_orders() {
  if (!user?.token) {
    console.error("User not authenticated");
    return [];
  }

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  try {
    const response = await axios.get("http://localhost:5000/api/order", config);
    orders = response.data;
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
}
