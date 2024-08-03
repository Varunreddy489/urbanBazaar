import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useGetOrder = () => {
  const { authUser, isLoading: authLoading } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState([]);

  const getOrders = async () => {
    if (authLoading || !authUser) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/${authUser._id}`
      );
      setOrder(response.data.orders);
      console.log(response.data);
    } catch (error: any) {
      console.log("error in getOrders:", error);
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        toast.error(
          error.response.data.error ||
            "Failed to register. Please try again later."
        );
      } else {
        toast.error("Failed to register. Please try again later.");
      }
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, order, error, getOrders };
};

export default useGetOrder;
