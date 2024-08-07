/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useGetCart from "../../hooks/useGetCart";
import { CartItemWithProductDetails } from "../../types/types";
import CartCard from "../../components/CartCard";
import Spinner from "../../components/Spinner";

const Cart = () => {
  const { loading, cartItems, getCartItems } = useGetCart();

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <div className="bg-black text-white h-screen ">
      {loading ? (
         <Spinner />
      ) : (
        cartItems.map((cartItem: CartItemWithProductDetails) => (
          <CartCard
            key={cartItem._id}
            cartItem={cartItem}
            cartId={cartItem._id || ""}
            onUpdate={getCartItems}
          />
        ))
      )}
    </div>
  );
};

export default Cart;
