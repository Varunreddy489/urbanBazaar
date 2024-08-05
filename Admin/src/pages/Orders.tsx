import { useEffect } from "react";
import Error from "../components/Errorr";
import Spinner from "../components/Spinner";
import OrderCard from "../components/OrderCard";
import useGetOrders from "../hooks/useGetOrders";

const Orders = () => {
  const { loading, orders, error, getOrders } = useGetOrders();

  useEffect(() => {
    getOrders();
  }, []);

  console.log(orders);

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    console.error("error:", error);
    return <Error />;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Orders</h1>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default Orders;
