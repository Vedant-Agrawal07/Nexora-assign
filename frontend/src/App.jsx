import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import PickIt from "./pages/PickIt.jsx";
import CheckoutPage from "./pages/Checkout.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import TrackingPage from "./pages/Tracking.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/pickit" element={<PickIt />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/tracking" element={<TrackingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
