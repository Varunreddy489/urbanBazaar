import { OrderTypes } from "../types/types";

const OrderCard = ({ orderItem }: { orderItem: OrderTypes }) => {
  const discountedPrice =
    orderItem.productId.price -
    orderItem.productId.price * (orderItem.productId.discount / 100);

  return (
    <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800 m-14 transform transition-transform duration-200 hover:scale-105 mb-4">
      <img
        className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-64 md:rounded-none md:rounded-l-lg"
        src={orderItem.productId.image}
        alt={orderItem.productId.title}
      />
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {orderItem.productId.title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
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
        <p className=" text-center text-md line-through text-gray-600">
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
      </div>
    </div>
  );
};

export default OrderCard;
