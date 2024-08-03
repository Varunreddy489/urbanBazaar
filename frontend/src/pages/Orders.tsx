import { useEffect } from "react";
import OrderCard from "../components/OrderCard";
import useGetOrder from "../hooks/useGetOrder";
import { OrderTypes } from "../types/types";
import Spinner from "../components/Spinner";

const Orders = () => {
  const { loading, order, getOrders } = useGetOrder();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="container mx-auto p-4 dark:bg-gray-800">
      <h1 className="text-white text-3xl font-semibold pr-96 ">Your Orders</h1>
      <div className="">
        {loading ? (
          <Spinner />
        ) : (
          order.map((orderItem: OrderTypes) => (
            <OrderCard key={orderItem._id} orderItem={orderItem} />
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
