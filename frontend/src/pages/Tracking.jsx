import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { fetch_orders } from "../lib/orders.js";
import { cart_quantity } from "../lib/Cart.js";
import { Link, useNavigate } from "react-router-dom";

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
    if (diff >= 4) return { width: "30%", current: "Preparing" };
    if (diff === 3) return { width: "50%", current: "Shipped" };
    if (diff === 2) return { width: "80%", current: "Shipped" };
    if (diff === 1) return { width: "90%", current: "Shipped" };
    return { width: "100%", current: "Delivered" };
  };

  return (
    <div className="min-h-screen bg-[#fff7f6] text-gray-800">
      {/* Header */}
      <header className="flex items-center justify-between bg-[#ff6f61] text-white p-4 shadow-md">
        <div className="flex items-center gap-3">
          <Link to={"/pickit"}>
            <img
              src="/javascript-pickIt-project-main/images/app-logo.png"
              alt="PickIt Logo"
              className="h-10"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to={"/orders"}
            className="hover:text-gray-200 transition-colors"
          >
            Returns & Orders
          </Link>

          <Link to={"/checkout"} className="relative hover:text-gray-200">
            <img
              src="/images/icons/cart-icon.png"
              alt="Cart"
              className="inline h-6"
            />
            <span className="absolute -top-2 -right-2 bg-white text-[#ff6f61] text-xs font-bold px-1 rounded-full">
              {cartQuantity}
            </span>
          </Link>

          <button
            onClick={logout}
            className="bg-white text-[#ff6f61] px-3 py-1 rounded-md hover:bg-[#ffe6e2] font-semibold"
          >
            Log Out
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="p-6">
        <Link
          to={"/orders"}
          className="text-[#ff6f61] font-medium hover:underline"
        >
          ← View all orders
        </Link>

        <div className="mt-6 space-y-8">
          {orders.length === 0 ? (
            <p className="text-center text-gray-600">No active orders found.</p>
          ) : (
            orders.map((order, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-lg p-5 border border-[#ffd9d4]"
              >
                {order.products.map((product, index) => {
                  const { width, current } = getProgressStatus(
                    product.deliveryDate
                  );

                  return (
                    <div
                      key={index}
                      className="mb-6 border-b border-[#ffe5e0] pb-6"
                    >
                      <h3 className="text-lg font-semibold text-[#ff6f61]">
                        {product.productId.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Quantity: {product.quantity}
                      </p>
                      <p className="text-gray-600">
                        Arriving on: {product.deliveryDate}
                      </p>

                      <img
                        src={`/javascript-pickIt-project-main/${product.productId.image}`}
                        alt={product.productId.name}
                        className="h-28 mt-3 rounded-md"
                      />

                      {/* Progress Labels */}
                      <div className="flex justify-between mt-5 text-sm font-medium text-gray-500">
                        <span
                          className={`${
                            current === "Preparing"
                              ? "text-[#ff6f61] font-semibold"
                              : ""
                          }`}
                        >
                          Preparing
                        </span>
                        <span
                          className={`${
                            current === "Shipped"
                              ? "text-[#ff6f61] font-semibold"
                              : ""
                          }`}
                        >
                          Shipped
                        </span>
                        <span
                          className={`${
                            current === "Delivered"
                              ? "text-[#ff6f61] font-semibold"
                              : ""
                          }`}
                        >
                          Delivered
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-[#ffe1dc] h-2 rounded-full mt-2">
                        <div
                          className="h-2 bg-[#ff6f61] rounded-full transition-all duration-700"
                          style={{ width }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Tracking;
