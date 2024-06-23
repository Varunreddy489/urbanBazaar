import { Routes, Route, Navigate } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { useAdminAuthContext } from "./context/AdminAuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  const { adminAuth } = useAdminAuthContext();
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={adminAuth ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={adminAuth ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
