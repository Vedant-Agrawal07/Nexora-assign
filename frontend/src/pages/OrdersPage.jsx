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
      navigate("/login");
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
      <main className="px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <p className="text-gray-400">You have no orders yet.</p>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-[#1A1A1A] p-5 rounded-2xl shadow-md border border-gray-800"
              >
                {/* Order Header */}
                <div className="flex justify-between items-start border-b border-gray-700 pb-3 mb-3">
                  <div>
                    <p className="text-sm text-gray-400">
                      Order Placed:{" "}
                      <span className="text-[#F5F5F5]">{order.orderDate}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Total:{" "}
                      <span className="text-[#F5F5F5]">
                        ₹{order.totalCost.toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Order ID:</p>
                    <p className="font-medium text-[#F5F5F5]">{order._id}</p>
                  </div>
                </div>

                {/* Products */}
                <div className="grid gap-5">
                  {order.products.map((product, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-[100px_1fr_auto] gap-5 items-center border-b border-gray-700 pb-4"
                    >
                      <img
                        src={`/${product.productId.image}`}
                        alt={product.productId.name}
                        className="w-24 rounded-xl"
                      />
                      <div>
                        <h2 className="font-semibold text-[#F5F5F5]">
                          {product.productId.name}
                        </h2>
                        <p className="text-sm text-gray-400">
                          Arriving on: {product.deliveryDate}
                        </p>
                        <p className="text-sm text-gray-400">
                          Quantity: {product.quantity}
                        </p>
                        <button
                          onClick={() => handleBuyAgain(product.productId._id)}
                          className="flex items-center mt-2 bg-[#F97316] hover:bg-[#EA580C] text-black font-semibold px-3 py-1 rounded-lg transition"
                        >
                          <img
                            src="/images/icons/buy-again.png"
                            alt="Buy Again"
                            className="h-4 mr-2"
                          />
                          Buy it again
                        </button>
                      </div>

                      <button
                        onClick={() => navigate("/tracking")}
                        className="bg-transparent border border-[#F97316] text-[#F97316] hover:bg-[#F97316] hover:text-black px-3 py-1 rounded-lg font-medium transition"
                      >
                        Track package
                      </button>
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
