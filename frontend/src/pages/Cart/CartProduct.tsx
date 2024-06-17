import { IoAddSharp, IoRemoveOutline } from "react-icons/io5";

import { CartItemWithProductDetails } from "../../types/types";

const CartProduct = ({
  cartItem,
}: {
  cartItem: CartItemWithProductDetails;
}) => {
  const { productDetails, quantity } = cartItem;

  return (
    <div className="container text-center mx-auto mt-10">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
        <div className=" w-full p-4 bg-white shadow rounded-lg">
          <div className="flex justify-between items-center mb-6"></div>
          <div className="space-y-4">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800 transform transition-transform duration-200 hover:scale-105">
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                src={productDetails.image}
                alt={productDetails.title}
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {productDetails.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {productDetails.description}
                </p>
                <p className="font-semibold text-xl text-gray-900 dark:text-white">
                  ${productDetails.price}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Rating: {productDetails.rating} ★
                </p>
                <p className="space-x-2 text-white flex items-center">
                  <button className="bg-gray-200 px-3 py-1 rounded-md focus:outline-none hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200">
                    <IoRemoveOutline className="text-black" />
                  </button>
                  <span className="text-gray-900 dark:text-gray-100">
                    Quantity: {quantity}
                  </span>
                  <button className="bg-gray-200 px-3 py-1 rounded-md focus:outline-none hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200">
                    <IoAddSharp className="text-black" />
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
