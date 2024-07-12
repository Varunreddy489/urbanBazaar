import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import { useAdminAuthContext } from "./context/AdminAuthContext";

const App = () => {
  const { adminAuth } = useAdminAuthContext();
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={adminAuth ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={adminAuth ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/users" element={adminAuth ? <Users /> : <Login />} />
          <Route
            path="/products"
            element={adminAuth ? <Products /> : <Login />}
          />
          <Route
            path="/settings"
            element={adminAuth ? <Settings /> : <Login />}
          />
          <Route
            path="/profile"
            element={adminAuth ? <Profile /> : <Login />}
          />
          <Route path="/orders" element={adminAuth ? <Orders /> : <Login />} />
        </Routes>

        <Toaster />
      </div>
    </div>
  );
};

export default App;
