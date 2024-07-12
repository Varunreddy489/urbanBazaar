import axios from "axios";
import { useState } from "react";

const URL = "http://localhost:5000/api";

const useGetOrder = () => {
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState([]);
    const [error, setError] = useState(null);

    const getOrders = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${URL}/orders`);
            setOrder(response.data.orders);
            console.log(response.data);
        } catch (error: any) {
            setError(error);
            console.log("error in getOrders:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, order, error, getOrders };
};

export default useGetOrder;
