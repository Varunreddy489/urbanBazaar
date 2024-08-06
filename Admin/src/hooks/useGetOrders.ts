import axios from "axios";
import { useState } from "react";

import { OrderTypes } from "../types/types";

const useGetOrders = () => {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/orders/admin");
      setOrders(response.data.orders);
      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error in useGetOrders:", error.message);
        setError(error.message);
      } else {
        console.log("Unexpected error in useGetOrders:", error);
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return { loading, orders, error, getOrders };
};

export default useGetOrders;
