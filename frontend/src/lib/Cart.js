// src/lib/cart.js
import axios from "axios";

let user = JSON.parse(localStorage.getItem("user"));
let cart = { products: [] };
let cart_quantity = 0;

async function initCart() {
  await load_from_storage();
}

async function load_from_storage() {
  await fetchCart();

  if (!cart || typeof cart !== "object") {
    cart = { products: [] };
  }

  if (!Array.isArray(cart.products)) {
    cart.products = [];
  }

  updateCartQuantity();
}

async function fetchCart() {
  if (!user?.token) return;
  const config = { headers: { authorization: `Bearer ${user.token}` } };

  try {
    const response = await axios.get("http://localhost:5000/api/cart", config);
    cart = response.data;
  } catch (error) {
    console.error(
      "❌ Error fetching cart:",
      error.response?.data || error.message
    );
    if (error.response?.status === 400) cart = { products: [] };
  }
}

async function add_to_cart(product_id , quantity) {
  if (!user?.token) return;
  const config = { headers: { authorization: `Bearer ${user.token}` } };

  const select = document.querySelector(`.js-select-${product_id}`);
 

  const response = await axios.post(
    "http://localhost:5000/api/cart/add",
    { productId: product_id, quantity },
    config
  );

  cart = response.data;
  updateCartQuantity();
  updateCartDisplay();
}

async function remove_from_cart(productId) {
  if (!user?.token) return;
  const config = { headers: { authorization: `Bearer ${user.token}` } };

  const response = await axios.post(
    "http://localhost:5000/api/cart/remove",
    { productId },
    config
  );

  cart = response.data;
  updateCartQuantity();
  updateCartDisplay();
}

async function updateCartProduct(productId, quantity) {
  if (!user?.token) return;
  const config = { headers: { authorization: `Bearer ${user.token}` } };

  const response = await axios.put(
    "http://localhost:5000/api/cart/update",
    { productId, quantity },
    config
  );

  cart = response.data;
  updateCartQuantity();
  updateCartDisplay();
}

async function update_delivery_option(product_id, delivery_option_id) {
  if (!user?.token) return;
  const config = { headers: { authorization: `Bearer ${user.token}` } };

  const response = await axios.put(
    "http://localhost:5000/api/cart/updateOption",
    {
      productId: product_id,
      optionId: delivery_option_id,
    },
    config
  );

  cart = response.data;
  updateCartQuantity();
  updateCartDisplay();
}

function updateCartQuantity() {
  cart_quantity = cart.products.reduce((acc, item) => acc + item.quantity, 0);
}

function updateCartDisplay() {
  const cartElem = document.querySelector(".cart-quantity");
  if (cartElem) cartElem.textContent = cart_quantity;
}

export {
  cart,
  add_to_cart,
  cart_quantity,
  initCart,
  remove_from_cart,
  update_delivery_option,
  updateCartProduct,
};
