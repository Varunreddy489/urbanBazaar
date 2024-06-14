import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import useRegister from "../../hooks/useRegister";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const { loading, signUp } = useRegister();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleClick = async () => {
    await signUp(inputs);
    setInputs({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "male",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign Up</h2>
        <form className="flex flex-col">
          <div className="mb-4">
            <input
              placeholder="Name"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="name"
              value={inputs.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Username"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Email"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Password"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Confirm Password"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="text-sm text-center text-gray-200 cursor-pointer"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              value={inputs.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <Link
            to="/login"
            className="text-sm text-white text-center hover:text-blue-500 hover:underline"
          >
            Already have an account? Login
          </Link>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            onClick={handleClick}
            disabled={loading}
          >
            {loading ? (
              <span className="animation: spin 1s linear infinite"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
