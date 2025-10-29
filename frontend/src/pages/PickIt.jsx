import { useEffect, useState } from "react";
import axios from "axios";
import { add_to_cart, cart_quantity, initCart } from "../lib/Cart.js";
import { useNavigate } from "react-router-dom";

export default function PickIt() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [quantity , setQuantity] = useState(1);
  const [cartQty, setCartQty] = useState(cart_quantity);
  const navigate = useNavigate();

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem("user"));
    if (!user_data) {
      navigate("/login");
      return;
    }
    initCart().then(() => setCartQty(cart_quantity));
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get("http://localhost:5000/api/product");
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
        `http://localhost:5000/api/product/find?search=${search}`
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
    await add_to_cart(productId , quantity);
    setCartQty((prev) => prev + quantity);

  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-['Roboto']">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        {/* Left section */}
        <div className="flex items-center gap-3">
          <img
            src="/images/app-logo.png"
            alt="PickIt Logo"
            className="w-28 hidden sm:block"
          />
          <img
            src="/images/minimal-logo.png"
            alt="PickIt Mobile Logo"
            className="w-8 sm:hidden"
          />
        </div>

        {/* Middle section */}
        <div className="flex items-center bg-[#1A1A1A] rounded-lg px-3 py-2 w-1/2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-grow bg-transparent outline-none text-[#F5F5F5]"
          />
          <button
            onClick={handleSearch}
            className="ml-2 hover:scale-105 transition-transform"
          >
            <img
              src="/images/icons/search-icon.png"
              alt="Search"
              className="w-5"
            />
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/orders")}
            className="text-sm hover:text-[#F97316] transition"
          >
            <span className="block text-xs text-gray-400">Returns</span>& Orders
          </button>

          <button
            onClick={() => navigate("/checkout")}
            className="relative flex items-center gap-2 hover:text-[#F97316]"
          >
            <img src="/images/icons/cart-icon.png" alt="Cart" className="w-6" />
            <span className="absolute -top-2 -right-3 bg-[#F97316] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartQty}
            </span>
            <span>Cart</span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-1.5 rounded-lg text-sm transition"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-[#1A1A1A] p-4 rounded-2xl shadow-lg flex flex-col items-center text-center"
          >
            <img
              src={`/${product.image}`}
              alt={product.name}
              className="w-40 h-40 object-contain mb-3"
            />
            <div className="font-medium text-lg mb-1">{product.name}</div>

            <div className="flex items-center justify-center gap-1 mb-2">
              <img
                src={`/images/ratings/rating-${product.rating.stars * 10}.png`}
                alt="rating"
                className="w-20"
              />
              <span className="text-[#F97316] text-sm">
                ({product.rating.count})
              </span>
            </div>

            <div className="text-xl font-semibold mb-2">
              ₹{product.price / 10}
            </div>

            <div className="mb-3">
              <select
              onChange={e=>setQuantity(e.target.value)}
                id={`select-${product._id}`}
                className="bg-[#0F0F0F] border border-gray-700 rounded-lg px-2 py-1 text-sm"
              >
                {[...Array(10).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleAddToCart(product._id , quantity)}
              className="bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2 rounded-lg w-full transition font-medium"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
