// src/pages/Cart/Cart.jsx

import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
        <div className="lg:w-3/4 w-full p-4 bg-white shadow rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">CART</h1>
            <button
              onClick={handleClick}
              className="flex items-center text-gray-700 hover:text-gray-900"
            >
              <IoMdArrowRoundBack className="text-2xl mr-1" />
              Back to Home
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src="/docs/images/blog/image-4.jpg"
                alt="Product"
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <p className="font-semibold text-xl text-gray-900 dark:text-white">$499.99</p>
              </div>
            </div>
            {/* Add more products here if needed */}
          </div>
        </div>
        <div className="lg:w-1/4 w-full lg:ml-4 mt-6 lg:mt-0 p-4 bg-white shadow rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
          <h3 className="space-y-2" >Total Items</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>$499.99</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span>$20.00</span>
            </div>
            <div className="flex justify-between text-gray-900 font-bold">
              <span>Total</span>
              <span>$519.99</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-cyan-800 text-white py-2 rounded-lg hover:bg-cyan-900">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
