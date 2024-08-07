import { useEffect, useState } from "react";

import useAddCart from "../hooks/useAddCart";
import useAddOrder from "../hooks/useAddOrder";
import useGetAddress from "../hooks/useGetAddress";
import {
  ProductTypes,
  UserTypes,
  OrderTypes,
  AddressTypes,
} from "../types/types";

const ProductCard = ({
  user,
  product,
}: {
  user: UserTypes | undefined;
  product: ProductTypes;
}) => {
  const { loading: cartLoading, addToCart } = useAddCart();
  const { loading: orderLoading, addOrder } = useAddOrder();
  const { address, getAddress } = useGetAddress();

  const [userAddress, setUserAddress] = useState<AddressTypes | null>(null);

  useEffect(() => {
    getAddress();
  }, []);

  useEffect(() => {
    if (address.length > 0) {
      setUserAddress(address[0]);
    }
  }, [address]);



  const handleAddToCart = () => {
    if (user && user._id && product._id) {
      addToCart({ productId: product._id });
    } else {
      console.error("User ID or Product ID is missing");
    }
  };

  const handleAddOrder = () => {
    if (user && user._id && product._id && userAddress) {
      const orderData: Omit<OrderTypes, "_id"> = {
        productId: product._id,
        userId: user._id,
        address: userAddress,
        quantity: 1,
        status: "pending",
        totalPrice: product.price,
      };

      console.log(orderData);
      addOrder(orderData);
    } else {
      console.error("User ID, Product ID, or Address is missing");
    }
  };

  const availabilityText = product.availability ? "In Stock" : "Out of Stock";
  const availabilityClass = product.availability
    ? "text-green-500"
    : "text-red-500";

  const priceDifference =
    product.price - (product.price * product.discount) / 100;

  const discountedPrice = product.price - priceDifference;

  return (
    <div className="w-80 p-4 bg-neutral-950 text-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img
        className="w-full h-40 object-cover rounded-t-lg"
        alt={product.title}
        src={product.image}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.title}</h2>
        <div className="flex-row space-y-1">
          <div className="flex mt-3 space-x-2">
            <p className="text-lg font-bold text-yellow-400">
              {priceDifference.toFixed(2)}
            </p>
            <p>({product.discount}% off)</p>
          </div>
          <p className="line-through text-slate-500">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex mt-2 justify-between text-center">
          <div className="bg-green-500 w-fit p-1 rounded-md">
            <p>Save up to ${discountedPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className={`text-sm mb-2 ${availabilityClass}`}>
              {availabilityText}
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="bg-green-500 px-1.5 py-0.5 rounded-sm text-white flex items-center gap-0.5">
            {product.rating} ★
          </p>
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              !product.availability ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleAddToCart}
            disabled={cartLoading || !product.availability}
            aria-label={product.availability ? "Add to Cart" : "Out of Stock"}
          >
            {cartLoading ? "Adding..." : "Add To Cart"}
          </button>
        </div>
        <button
          className="bg-blue-500 mt-3 py-2 px-4 w-full rounded-md text-center font-semibold text-white shadow-md hover:bg-yellow-400 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          disabled={orderLoading || !userAddress}
          onClick={handleAddOrder}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
