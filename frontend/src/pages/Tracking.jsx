import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { fetch_orders } from "../lib/orders.js";
import { cart_quantity } from "../lib/Cart.js";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ShoppingCart, Package } from "lucide-react";

const Tracking = () => {
  const [orders, setOrders] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const user_data = JSON.parse(localStorage.getItem("user"));
    if (!user_data) {
      navigate("/");
    } else {
      renderTracking();
    }
  }, []);

  const renderTracking = async () => {
    setCartQuantity(cart_quantity);
    const fetchedOrders = await fetch_orders();
    setOrders(fetchedOrders || []);
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const getProgressStatus = (deliveryDate) => {
    const today = dayjs().startOf("day");
    const formattedDate = dayjs(deliveryDate, "dddd, MMMM D").year(
      dayjs().year()
    );
    const diff = formattedDate.diff(today, "days");

    if (diff >= 6) return { width: "10%", current: "Preparing" };
    if (diff >= 4) return { width: "40%", current: "Preparing" };
    if (diff === 3) return { width: "65%", current: "Shipped" };
    if (diff === 2) return { width: "85%", current: "Shipped" };
    if (diff === 1) return { width: "95%", current: "Shipped" };
    return { width: "100%", current: "Delivered" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] text-gray-100">
      {/* HEADER */}
      <header className="flex items-center justify-between bg-[#F97316] px-6 py-4 shadow-md sticky top-0 z-50">
        <Link to="/pickit" className="flex items-center gap-2">
          <img
            src="
            /images/app-logo.png"
            alt="PickIt Logo"
            className="h-10"
          />
          <span className="text-lg font-bold">PickIt</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/orders"
            className="flex items-center gap-1 text-white/90 hover:text-white transition"
          >
            <Package size={18} />
            <span>Orders</span>
          </Link>

          <Link
            to="/checkout"
            className="relative text-white/90 hover:text-white transition"
          >
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-white text-[#F97316] text-xs font-bold px-[6px] py-[1px] rounded-full">
              {cartQuantity}
            </span>
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-1 bg-white text-[#F97316] px-3 py-1.5 rounded-lg font-semibold hover:bg-[#FFE4D9] transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="p-6 max-w-4xl mx-auto">
        <Link
          to="/orders"
          className="text-[#F97316] hover:underline font-medium flex items-center gap-1 mb-4"
        >
          ← View all orders
        </Link>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-80 text-center">
            <img
              src="/images/empty-box.png"
              alt="No orders"
              className="h-28 opacity-70 mb-4"
            />
            <p className="text-gray-400 text-lg">
              You don’t have any active orders yet.
            </p>
            <Link
              to="/pickit"
              className="mt-4 px-5 py-2 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] transition-all"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order, i) => (
              <div
                key={i}
                className="bg-[#1A1A1A]/90 border border-[#2A2A2A] rounded-2xl shadow-lg p-6 hover:shadow-[#F97316]/20 transition-all"
              >
                <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
                  <h2 className="text-xl font-semibold text-[#F97316]">
                    Order #{i + 1}
                  </h2>
                  <span className="text-sm text-gray-400">
                    Placed on: {dayjs(order.placedDate).format("MMM D, YYYY")}
                  </span>
                </div>

                {order.products.map((product, index) => {
                  const { width, current } = getProgressStatus(
                    product.deliveryDate
                  );

                  return (
                    <div
                      key={index}
                      className="bg-[#111111] border border-[#2A2A2A] rounded-xl p-4 mb-5 hover:border-[#F97316]/40 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-100">
                            {product.productId.name}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">
                            Quantity: {product.quantity}
                          </p>
                          <p className="text-gray-400 text-sm">
                            Expected delivery:{" "}
                            <span className="text-[#F97316] font-medium">
                              {product.deliveryDate}
                            </span>
                          </p>
                        </div>

                        <img
                          src={`
                            /${product.productId.image}`}
                          alt={product.productId.name}
                          className="h-24 rounded-lg object-contain mt-4 md:mt-0 md:ml-6"
                        />
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-6">
                        <div className="flex justify-between text-xs uppercase text-gray-500 font-medium mb-2">
                          <span
                            className={`${
                              current === "Preparing" ? "text-[#F97316]" : ""
                            }`}
                          >
                            Preparing
                          </span>
                          <span
                            className={`${
                              current === "Shipped" ? "text-[#F97316]" : ""
                            }`}
                          >
                            Shipped
                          </span>
                          <span
                            className={`${
                              current === "Delivered" ? "text-[#F97316]" : ""
                            }`}
                          >
                            Delivered
                          </span>
                        </div>

                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-2 bg-[#F97316] rounded-full transition-all duration-700 ease-in-out"
                            style={{ width }}
                          ></div>
                        </div>

                        <p className="mt-2 text-sm text-gray-400">
                          Current status:{" "}
                          <span className="text-[#F97316] font-semibold">
                            {current}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Tracking;
