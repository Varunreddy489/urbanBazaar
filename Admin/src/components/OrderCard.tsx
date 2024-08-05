import { OrderTypes } from "../types/types";

const OrderCard = ({order}:{ order: OrderTypes }) => {
  const {
    productId: { title, availability },
    userId: { name, email },
    address: { streetName, pincode, localityName, city, state },
    totalPrice,
    quantity,
  } = order;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Availability: {availability ? "In Stock" : "Out of Stock"}
      </p>
      <p className="text-gray-600 dark:text-gray-300">
        Total Price: ${totalPrice}
      </p>
      <p className="text-gray-600 dark:text-gray-300">Quantity: {quantity}</p>
      <div className="mt-4">
        <h3 className="text-xl font-bold">User Information</h3>
        <p className="text-gray-600 dark:text-gray-300">Name: {name}</p>
        <p className="text-gray-600 dark:text-gray-300">Email: {email}</p>
        <h3 className="text-xl font-bold mt-4">Shipping Address</h3>
        <p className="text-gray-600 dark:text-gray-300">
          {streetName}, {localityName}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          {city}, {state} - {pincode}
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
