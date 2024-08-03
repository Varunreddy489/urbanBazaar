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

const App = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="">
      <Navbar />
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
      </Routes>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
