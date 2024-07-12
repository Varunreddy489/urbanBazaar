import { useEffect } from "react";
import OrderCard from "../components/OrderCard";
import useGetOrder from "../hooks/useGetOrder";
import { OrderTypes } from "../types/types";

const Orders = () => {
  const { loading, order, getOrders } = useGetOrder();

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1>Your Orders</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        order.map((orderItem: OrderTypes) => (
          <OrderCard key={orderItem._id} orderItem={orderItem} />
        ))
      )}
    </div>
  );
};

export default Orders;
