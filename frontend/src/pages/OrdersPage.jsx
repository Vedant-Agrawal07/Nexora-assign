// src/pages/OrdersPage.jsx
import { useEffect, useState } from "react";
import { fetch_orders, orders as ordersData } from "../lib/orders.js";
import { add_to_cart, cart_quantity } from "../lib/Cart.js";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    const loadOrders = async () => {
      await fetch_orders();
      setOrders(ordersData || []);
    };

    loadOrders();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleBuyAgain = async (productId) => {
    await add_to_cart(productId , 1);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F5F5F5] font-['Roboto']">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src="/images/app-logo.png"
            alt="PickIt"
            className="h-10 hidden md:block"
          />
          <img
            src="/images/minimal-logo.png"
            alt="PickIt"
            className="h-10 md:hidden"
          />
        </div>

        <div className="flex items-center w-1/2 max-w-lg bg-[#1A1A1A] rounded-full px-3 py-2">
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent outline-none text-sm placeholder-gray-400 text-[#F5F5F5]"
          />
          <button>
            <img
              src="/images/icons/search-icon.png"
              alt="Search"
              className="h-5"
            />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/orders")}
            className="text-sm text-[#F5F5F5] hover:text-[#F97316] transition"
          >
            Returns & Orders
          </button>

          <button
            onClick={() => navigate("/checkout")}
            className="relative flex items-center text-sm text-[#F5F5F5] hover:text-[#F97316]"
          >
            <img
              src="/images/icons/cart-icon.png"
              alt="Cart"
              className="h-5 mr-1"
            />
            Cart
            <span className="ml-1 text-[#F97316] font-semibold">
              {cart_quantity || 0}
            </span>
          </button>

          <button
            onClick={handleLogout}
            className="bg-[#F97316] hover:bg-[#EA580C] text-black font-semibold px-3 py-1 rounded-lg"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Orders Section */}
      <main className="px-6 py-10">
        <h1 className="text-3xl font-bold mb-8 text-[#F5F5F5]">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <img
              src="/images/icons/empty-box.png"
              alt="No Orders"
              className="h-20 opacity-60 mb-4"
            />
            <p className="text-lg">You haven’t placed any orders yet.</p>
            <button
              onClick={() => navigate("/")}
              className="mt-5 bg-[#F97316] hover:bg-[#EA580C] text-black font-semibold px-6 py-2 rounded-full transition"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-gradient-to-br from-[#1A1A1A] to-[#141414] p-6 rounded-2xl shadow-lg border border-gray-800 hover:shadow-[#F9731620] hover:border-[#F9731633] transition-all duration-300"
              >
                {/* Order Header */}
                <div className="flex justify-between items-start border-b border-gray-700 pb-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400">
                      Order Placed:{" "}
                      <span className="text-[#F5F5F5] font-medium">
                        {order.orderDate}
                      </span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Total:{" "}
                      <span className="text-[#F97316] font-semibold">
                        ₹{order.totalCost.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Order ID
                    </p>
                    <p className="font-medium text-[#F5F5F5] text-sm">
                      {order._id}
                    </p>
                  </div>
                </div>

                {/* Products */}
                <div className="space-y-6">
                  {order.products.map((product, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 border border-gray-800 rounded-xl p-4 bg-[#121212] hover:bg-[#181818] transition"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          src={`/${product.productId.image}`}
                          alt={product.productId.name}
                          className="w-24 h-24 object-cover rounded-lg border border-gray-700"
                        />
                        <div>
                          <h2 className="font-semibold text-lg text-[#F5F5F5]">
                            {product.productId.name}
                          </h2>
                          <p className="text-sm text-gray-400">
                            Arriving on:{" "}
                            <span className="text-[#F97316] font-medium">
                              {product.deliveryDate}
                            </span>
                          </p>
                          <p className="text-sm text-gray-400">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 justify-end">
                        <button
                          onClick={() => handleBuyAgain(product.productId._id)}
                          className="flex items-center bg-[#F97316] hover:bg-[#EA580C] text-black font-semibold px-4 py-2 rounded-full text-sm transition transform hover:scale-105"
                        >
                          <img
                            src="/images/icons/buy-again.png"
                            alt="Buy Again"
                            className="h-4 mr-2"
                          />
                          Buy Again
                        </button>

                        <button
                          onClick={() => navigate("/tracking")}
                          className="flex items-center border border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-black font-semibold px-4 py-2 rounded-full text-sm transition transform hover:scale-105"
                        >
                          <img
                            src="/images/icons/truck.png"
                            alt="Track"
                            className="h-4 mr-2 invert-[50%] hover:invert-0"
                          />
                          Track Package
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
