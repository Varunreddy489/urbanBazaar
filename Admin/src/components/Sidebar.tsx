import { MdDashboard } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { CiDeliveryTruck, CiLogout } from "react-icons/ci";
import {  FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";

import useLogoutAdmin from "../hooks/useLogoutAdmin";
import Urbanlogo from "../.././../frontend/public/Urbanlogo.svg";

const Sidebar = () => {
  const data = localStorage.getItem("admin");
  const adminData = data ? JSON.parse(data) : null;

  const { loading, logout } = useLogoutAdmin();

  return (
    <aside className="flex flex-col w-64 h-screen px-4 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <Link to="/" className="mx-auto">
        <img src={Urbanlogo} className="h-8" alt="UrbanBazaar Logo" />
      </Link>

      <div className="flex flex-col items-center mt-6 -mx-2">
        <img
          className="object-cover w-24 h-24 mx-2 rounded-full"
          src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          alt="avatar"
        />
        <h4 className="mx-2 mt-2 font-medium text-center text-gray-800 dark:text-gray-200">
          {adminData?.name}
        </h4>
        <p className="mwx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
          {adminData?.email}
        </p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {/* Dashboard */}
          <Link
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg dark:bg-gray-800 dark:text-gray-200"
            to="/"
          >
            <MdDashboard />
            <span className="mx-4 font-medium">Dashboard</span>
          </Link>

          {/* Users */}
          <Link
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/users"
          >
            <FaUserFriends />
            <span className="mx-4 font-medium">Users</span>
          </Link>

          {/* Products */}
          <Link
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/products"
          >
            <CiDeliveryTruck className="font-bold" />
            <span className="mx-4 font-medium">Products</span>
          </Link>

          {/* Settings */}
          <Link
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/settings"
          >
            <IoMdSettings />
            <span className="mx-4 font-medium">Settings</span>
          </Link>

          {/* Profile */}
          {/* <Link
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/profile"
          >
            <FaUserEdit />
            <span className="mx-4 font-medium">Profile</span>
          </Link> */}

          {/* Orders */}
          <Link
            className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            to="/orders"
          >
            <TbTruckDelivery />
            <span className="mx-4 font-medium">Orders</span>
          </Link>

          {/* Logout */}
          <button className="flex items-center w-full px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
            {!loading ? (
              <CiLogout onClick={logout} />
            ) : (
              <span className="loading loading-spinner"></span>
            )}
            <span className="mx-4 font-medium">
              {loading ? "Logging out..." : "Logout"}
            </span>
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
