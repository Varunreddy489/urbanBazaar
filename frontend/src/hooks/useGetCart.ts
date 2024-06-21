import { useState } from "react";
import axios from "axios";
import { cartTypes, ProductTypes, CartItemWithProductDetails } from "../types/types";

const useGetCart = () => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemWithProductDetails[]>([]);

  const getCartItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/cart");
      const cartData = response.data;
   

      const cartItemsWithDetails = await Promise.all(
        cartData.flatMap(async (cartItem: cartTypes) => {
          return Promise.all(
            cartItem.items.map(async (item) => {
              try {
                const productResponse = await axios.get<ProductTypes>(`http://localhost:5000/api/product/${item.productId}`);
                return {
                  ...item,
                  productDetails: productResponse.data,
                };
              } catch (error: any) {
                if (error.response && error.response.status === 404) {
                  console.error(`Product not found: ${item.productId}`);
                  return null;
                } else {
                  throw error;
                }
              }
            })
          );
        })
      );

      setCartItems(cartItemsWithDetails.flat().filter(item => item !== null));
    } catch (error) {
      console.error("Error fetching cart items", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, cartItems, getCartItems };
};

export default useGetCart;
