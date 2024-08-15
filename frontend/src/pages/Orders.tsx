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
    <div className=" w-full p-4 bg-gray-900">
      <h1 className="text-white text-3xl  font-semibold pl-10 ">Your Orders</h1>
        {loading ? (
          <Spinner />
        ) : (
          order.map((orderItem: OrderTypes) => (
            <OrderCard key={orderItem._id} orderItem={orderItem} />
          ))
        )}
    </div>
  );
};

export default Orders;
