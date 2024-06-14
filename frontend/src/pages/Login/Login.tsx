import { Link } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { loading, login } = useLogin();

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

    await login(inputs);

    setInputs({
      email: "",
      password: "",
    });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Welcome Back
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
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

          <Link
            to='/signup'
            className="text-md text-white hover:text-blue-300 underline"
          >
            New to Ecommerce !! Signup
          </Link>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            disabled={loading}
          >
            {loading ? (
              <span className="animation: spin 1s linear infinite"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
