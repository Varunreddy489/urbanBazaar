import { ChangeEvent, FormEvent, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";

import useLoginAdmin from "../hooks/useLoginAdmin";

const Login = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { loading, loginAdmin } = useLoginAdmin();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await loginAdmin(inputs);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="bg-black">
      <div className="flex flex-col items-center justify-center h-screen dark space-y-10 ">
        <h1 className="text-center text-5xl text-white font-bold italic   ">
          Welcome To <span className="text-blue-600">UrbanBazaar</span>
        </h1>
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
            LogIn to Continue
          </h2>
          <form className="flex flex-col" onSubmit={handleSubmit} >
            <div className="mb-4 relative ">
              <input
                placeholder="Email"
                className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
              />
              <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                <MdAlternateEmail className="text-2xl" />
              </button>
            </div>
            <div className="mb-4 relative">
              <input
                placeholder="Password"
                className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 pr-10 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                type={showPassword ? "text" : "password"}
                name="password"
                value={inputs.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FiEyeOff className="text-2xl" />
                ) : (
                  <FiEye className="text-2xl" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              disabled={loading}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
