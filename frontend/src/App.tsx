import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";

import Orders from "./pages/Orders";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Register/Register";

import { useAuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Settings from "./pages/Settings/Settings";

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex flex-col min-h-screen">
      {authUser && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
          <Route
            path="/cart"
            element={authUser ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={authUser ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={authUser ? <Orders /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={authUser ? <Settings /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
      {authUser && <Footer />}
      <Toaster />
    </div>
  );
};

export default App;
