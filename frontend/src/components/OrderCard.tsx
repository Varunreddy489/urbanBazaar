import { useEffect, useMemo, useState } from "react";
import { OrderTypes } from "../types/types";

const OrderCard = ({ orderItem }: { orderItem: OrderTypes }) => {
  console.log(orderItem);

  const [countdown, setCountdown] = useState<string>("");

  const discountedPrice =
    orderItem.productId.price -
    orderItem.productId.price * (orderItem.productId.discount / 100);

  const formattedDate = new Date(orderItem.date).toLocaleString();

  const deliveryDate = useMemo(() => {
    const date = new Date(orderItem.date);
    date.setDate(date.getDate() + 3);
    return date;
  }, [orderItem.date]);
  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDiff = deliveryDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        clearInterval(interval);
        setCountdown("Delivered");
      } else {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [deliveryDate]);

  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-700 m-14 transform transition-transform duration-200 hover:scale-105 mb-4">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-64 md:rounded-none md:rounded-l-lg"
        src={orderItem.productId.image}
        alt={orderItem.productId.title}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
          {orderItem.productId.title}
        </h5>
        <p className="mb-3 font-normal dark:text-gray-100">
          {orderItem.productId.description}
        </p>
        <div className="flex justify-center items-center space-x-3 ">
          <p className="font-semibold text-yellow-300 text-center text-xl ">
            ${discountedPrice.toFixed(2)}
          </p>
          <p className=" text-center text-md text-gray-300">
            ({orderItem.productId.discount}% off)
          </p>
        </div>
        <p className=" text-center text-md line-through text-gray-300">
          ${orderItem.productId.price.toFixed(2)}
        </p>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Rating: {orderItem.productId.rating} ★
        </p>
        <div className="flex items-center justify-center mt-4">
          <p className="space-x-2 text-white flex items-center">
            <span className="text-gray-900 dark:text-gray-100">
              Quantity: {orderItem.quantity}
            </span>
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-center text-md  mt-4 text-white">
            Ordered on: {formattedDate}
          </p>
          <p className="text-center text-md text-white">
            Estimated Delivery: {deliveryDate.toLocaleDateString()}
          </p>
          <p className="text-center text-md text-white">
            Countdown to Delivery: {countdown}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
