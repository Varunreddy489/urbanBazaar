import { useState } from "react";
import Urbanlogo from "../../public/Urbanlogo.svg";
import Dropdown from "./Dropdown";
import { TiShoppingCart } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClick = () => {
    navigate("/cart");
  };

  const data = localStorage.getItem("user");
  const userData = data ? JSON.parse(data) : null;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 relative mb-11 ">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <img src={Urbanlogo} className="h-8" alt="UrbanBazaar Logo" />
        </a>
        <div className="flex flex-grow justify-end items-center md:order-2 space-x-6 rtl:space-x-reverse relative">
          <div className="relative">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded={isDropdownOpen}
              onClick={toggleDropdown}
            >
              <img
                className="w-8 h-8 rounded-full"
                src={userData?.profilePic || ""}
                alt="user photo"
              />
            </button>
            {isDropdownOpen && <Dropdown />}
          </div>

          <TiShoppingCart
            className="text-2xl text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
            onClick={handleClick}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
