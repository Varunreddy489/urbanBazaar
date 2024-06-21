import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useCallback, useEffect, useMemo } from "react";

import CartProduct from "./CartProduct";
import useGetCart from "../../hooks/useGetCart";
import { CartItemWithProductDetails } from "../../types/types";

const Cart = () => {
  const { loading, cartItems, getCartItems } = useGetCart();
  const navigate = useNavigate();

  interface GroupedCartItems {
    [key: string]: CartItemWithProductDetails;
  }

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleUpdate = useCallback(() => {
    getCartItems();
  }, [getCartItems]);

  const { total, groupedCartItems } = useMemo(() => {
    let total = 0;
    const groupedCartItems = cartItems.reduce((acc, cartItem) => {
      const { productId, quantity } = cartItem;
      if (!acc[productId]) {
        acc[productId] = { ...cartItem };
      } else {
        acc[productId].quantity += quantity;
      }
      total += cartItem.productDetails.price * quantity;
      return acc;
    }, {} as GroupedCartItems);

    return { total, groupedCartItems };
  }, [cartItems]);

  return (
    <div className=" ">
      <button
        onClick={handleClick}
        className="flex items-center text-gray-700 p-4 mt-7 hover:text-gray-900"
      >
        <IoMdArrowRoundBack className="text-2xl mr-1" />
        Back to Home
      </button>
      <h1 className="mb-4 text-center font-extrabold italic text-gray-900 md:text-5xl lg:text-6xl">
        Cart
      </h1>
      <div className="mt-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {Object.values(groupedCartItems).map(
              (cartItem: CartItemWithProductDetails) => (
                <CartProduct
                  key={cartItem.productId}
                  cartItem={cartItem}
                  cartId={cartItem._id}
                  onUpdate={handleUpdate}
                />
              )
            )}
            <div className=" w-full lg:ml-4 mt-6 lg:mt-0 p-4 bg-white shadow rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Discount</span>
                  <span>NA</span>
                </div>
                <div className="flex justify-between text-gray-900 font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-center mt-4">
                <button className="text-white w-full md:w-1/4 flex items-center justify-center text-center bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5">
                  Buy All Products
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
