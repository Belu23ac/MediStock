import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PhoneShell from "./components/PhoneShell";
import Navbar from "./components/navbar";
import ProtectedRoute from "./components/ProtectedRoutes";
import Home from "./pages/home/Home";
import ActiveOrders from "./pages/home/ActiveOrders";
import OrderHistory from "./pages/home/OrderHistory";
import ScanOrder from "./pages/home/ScanOrder";
import Order from "./pages/order/Order";
import OrederReceipt from "./pages/order/Receipt";
import User from "./pages/User";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Notification from "./pages/Notification";



export default function App() {
  return (
    <PhoneShell>
      <BrowserRouter>
        <div className="screen-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route
              path="/home/*"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            >
              <Route path="activeOrders" element={<ActiveOrders />} />
              <Route path="orderHistory" element={<OrderHistory />} />
              <Route path="scanOrder" element={<ScanOrder />} />
            </Route>
            <Route
              path="/order/*"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            >
              <Route path="receipt" element={<OrederReceipt />} />
            </Route>
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <Notification />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<h1>404 😅</h1>} />
          </Routes>
        </div>
        <Navbar />
      </BrowserRouter>
    </PhoneShell>
  );
}
