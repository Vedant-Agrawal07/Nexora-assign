import { useEffect, useState } from "react";
import axios from "axios";
import { add_to_cart, cart_quantity, initCart } from "../lib/Cart.js";
import { useNavigate } from "react-router-dom";

export default function PickIt() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cartQty, setCartQty] = useState(cart_quantity);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem("user"));
    if (!user_data) {
      navigate("/");
      return;
    }
    initCart().then(() => setCartQty(cart_quantity));
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get(`${API_URL}/api/product`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  }

  async function handleSearch() {
    if (search.trim() === "") {
      fetchProducts();
      return;
    }
    try {
      const res = await axios.get(
        `${API_URL}/api/product/find?search=${search}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Error searching:", err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  async function handleAddToCart(productId, quantity = 1) {
    quantity = Number(quantity);
    await add_to_cart(productId, quantity);
    setCartQty((prev) => prev + quantity);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1C1C1C] text-[#F5F5F5] font-['Inter']">
      {/* Header */}
      <header className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-gray-800 bg-[#0f0f0fdd] sticky top-0 z-20 backdrop-blur-lg shadow-lg">
        {/* Left - Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/images/app-logo.png"
            alt="PickIt Logo"
            className="w-36 hidden sm:block hover:scale-105 transition-transform"
          />
          <img
            src="/images/minimal-logo.png"
            alt="PickIt Mobile Logo"
            className="w-10 sm:hidden"
          />
        </div>

        {/* Middle - Search bar */}
        <div className="flex items-center bg-[#1A1A1A] rounded-full px-5 py-2 w-2/4 sm:w-1/2 border border-gray-700 focus-within:border-[#F97316] transition-all duration-200 shadow-inner">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="grow bg-transparent outline-none text-[#F5F5F5] placeholder-gray-400 text-sm sm:text-base"
          />
          <button
            onClick={handleSearch}
            className="ml-2 hover:scale-110 transition-transform"
          >
            <img
              src="/images/icons/search-icon.png"
              alt="Search"
              className="w-5 sm:w-6 opacity-90"
            />
          </button>
        </div>

        {/* Right - Buttons */}
        <div className="flex items-center justify-center gap-6 sm:gap-8">
          <button
            onClick={() => navigate("/orders")}
            className="text-sm hover:text-[#F97316] transition flex flex-col items-center"
          >
            <img
              src="/images/icons/orders-icon.png"
              alt="Orders"
              className="w-8 sm:w-10 mb-1 opacity-90 hover:opacity-100 transition"
            />
            <span>Orders</span>
          </button>

          <button
            onClick={() => navigate("/checkout")}
            className="relative flex flex-col items-center text-sm hover:text-[#F97316] transition"
          >
            <img
              src="/images/icons/cart-icon.png"
              alt="Cart"
              className="w-7 sm:w-8 mb-1 opacity-90 hover:opacity-100 transition"
            />
            <span>Cart</span>
            <span className="absolute -top-2 -right-3 bg-[#F97316] text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow-md">
              {cartQty}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-md hover:shadow-[#F9731633] active:scale-95"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="p-6 sm:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-[#1A1A1A] p-6 rounded-2xl shadow-lg border border-gray-800 hover:border-[#F97316] hover:shadow-[#F9731622] hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center"
          >
            <div className="relative w-full flex justify-center">
              <img
                src={`/${product.image}`}
                alt={product.name}
                className="w-44 h-44 object-contain mb-4 drop-shadow-lg"
              />
            </div>

            <div className="font-semibold text-lg mb-1 line-clamp-1">
              {product.name}
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <img
                src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
                alt="rating"
                className="w-24"
              />
              <span className="text-[#F97316] text-sm">
                ({product.rating.count})
              </span>
            </div>

            <div className="text-xl font-bold mb-4 text-[#F97316]">
              ₹{product.price / 10}
            </div>

            {/* Quantity Selector */}
            <div className="mb-5 flex items-center gap-2">
              <label
                htmlFor={`select-${product._id}`}
                className="text-sm text-gray-400"
              >
                Qty:
              </label>
              <select
                onChange={(e) => setQuantity(e.target.value)}
                id={`select-${product._id}`}
                className="bg-[#0F0F0F] border border-gray-700 rounded-lg px-3 py-1 text-sm focus:border-[#F97316] focus:outline-none transition"
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleAddToCart(product._id, quantity)}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-2 rounded-full w-full transition-all duration-200 font-semibold shadow-md hover:shadow-[#F9731633] active:scale-95"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
