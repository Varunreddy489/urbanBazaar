import React, { useState, useEffect } from "react";

import Address from "../components/Address";
import useUpdateUser from "../hooks/useUpdateUser";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    username: "",
  });

  const { loading, error, updateUser } = useUpdateUser();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUserSubmit = () => {
    updateUser({ user: userData });
    console.log(userData);
  };

  return (
    <div className="bg-black text-white h-screen">
      <div className="w-full">
        <br />
        <h1 className="text-4xl font-semibold text-center mt-5">
          Your Profile
        </h1>
        <div className="mx-14 text-black mt-10 border-2 border-blue-400 rounded-lg">
          <div className="p-8">
            <div className="flex gap-4">
              <input
                type="text"
                name="name"
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Full Name *"
                value={userData.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Email *"
                value={userData.email}
                onChange={handleChange}
              />
            </div>
            <div className="my-6 text-black flex gap-4">
              <select
                name="gender"
                id="select"
                className="block w-1/2 rounded-md border space-y-2 border-slate-300 bg-white px-3 py-4 font-semibold text-gray-500 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                value={userData.gender}
                onChange={handleChange}
              >
                <option value="" className="font-semibold space-y-2 text-black">
                  Select Gender
                </option>
                <option
                  value="Male"
                  className="font-semibold space-y-2 text-black"
                >
                  Male
                </option>
                <option
                  value="Female"
                  className="font-semibold space-y-2 text-black"
                >
                  Female
                </option>
              </select>
              <input
                type="text"
                name="username"
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Username *"
                value={userData.username}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <button
                className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white"
                onClick={handleUserSubmit}
                disabled={loading}
              >
                Update
              </button>
              {error ? <p className="text-red-500 pt-4 ">{error}</p> : null}
            </div>
          </div>
        </div>
        <br />
        <div>
          <h1 className="text-4xl font-semibold text-center mt-5">Address</h1>
          <Address />
        </div>
      </div>
      <div className="mb-10"></div>
    </div>
  );
};

export default Profile;
