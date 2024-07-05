import React, { useState } from "react";
// import { MdDelete } from "react-icons/md";
import { IoAddSharp, IoRemoveOutline } from "react-icons/io5";

// import useDeleteCart from "../../hooks/useDeleteCart";
import { CartItemWithProductDetails } from "../../types/types";
import useUpdateCart from "../../hooks/useUpdateCart";

const CartProduct = ({
  cartItem,
  onUpdate,
}: {
  cartItem: CartItemWithProductDetails;
  cartId: string;
  onUpdate: () => void;
}) => {
  const { productDetails, quantity } = cartItem;
  const [cartQuantity, setCartQuantity] = useState(quantity);
  const { updateCart } = useUpdateCart();

  const increaseQuantity = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      await updateCart(cartItem.productId, 1);
      setCartQuantity(cartQuantity + 1);
      onUpdate();
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQuantity = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    if (cartQuantity >= 1) {
      try {
        await updateCart(cartItem.productId, -1);
        setCartQuantity(cartQuantity - 1);
        onUpdate();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form className="container mx-auto mt-10 ">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
        <div className="w-full p-4 bg-white shadow rounded-lg">
          <div className="flex justify-between items-center mb-6"></div>
          <div className="space-y-4">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800 transform transition-transform duration-200 hover:scale-105">
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-64 md:rounded-none md:rounded-l-lg"
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
                <p className="font-semibold text-center text-xl text-gray-900 dark:text-white">
                  ${(productDetails.discountedPrice * quantity).toFixed(2)}
                </p>
                <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                  Rating: {productDetails.rating} ★
                </p>
                <div className="flex items-center justify-center mt-4 ">
                  <p className="space-x-2 text-white flex items-center">
                    <button
                      type="button"
                      className="bg-gray-200 px-3 py-1 rounded-md focus:outline-none hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                      onClick={decreaseQuantity}
                    >
                      <IoRemoveOutline className="text-black" />
                    </button>
                    <span className="text-gray-900 dark:text-gray-100">
                      Quantity: {cartQuantity}
                    </span>
                    <button
                      type="button"
                      className="bg-gray-200 px-3 py-1 rounded-md focus:outline-none hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200"
                      onClick={increaseQuantity}
                    >
                      <IoAddSharp className="text-black" />
                    </button>
                  </p>
                </div>
                <div className="text-center mt-10 ">
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CartProduct;
