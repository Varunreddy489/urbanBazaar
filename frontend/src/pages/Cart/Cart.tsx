import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

import CartProduct from "./CartProduct";
import { CartItemWithProductDetails } from "../../types/types";
import useGetCart from "../../hooks/useGetCart";

const Cart = () => {
  const { loading, cartItems, getCartItems } = useGetCart();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    getCartItems();
  }, []);

  // Memoize total calculation to avoid unnecessary re-calculations
  const { total, groupedCartItems } = useMemo(() => {
    // Calculate total cost
    let total = 0;
    // Group items by productId and calculate quantities
    const groupedCartItems = cartItems.reduce((acc, cartItem) => {
      const { productId, quantity } = cartItem;
      if (!acc[productId]) {
        acc[productId] = { ...cartItem };
      } else {
        acc[productId].quantity += quantity;
      }
      total += cartItem.productDetails.price * quantity;
      return acc;
    }, {});

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
      <h1 className="text-3xl text-center font-bold text-gray-900">CART</h1>
      <div className="mt-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {Object.values(groupedCartItems).map(
              (cartItem: CartItemWithProductDetails) => (
                <CartProduct key={cartItem.productId} cartItem={cartItem} />
              )
            )}
            <div className="lg:w-1/4 w-full lg:ml-4 mt-6 lg:mt-0 p-4 bg-white shadow rounded-lg">
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
              <button className="w-full mt-4 bg-cyan-800 text-white py-2 rounded-lg hover:bg-cyan-900">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
