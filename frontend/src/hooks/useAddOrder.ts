import axios from "axios"
import { useState } from "react"
import { OrderTypes } from "../types/types"
import toast from "react-hot-toast"

const useAddOrder = () => {

    const [loading, setLoading] = useState(false)

    const addOrder = async (orderData: OrderTypes) => {
        setLoading(true);

        try {
            const response = await axios.post(`http://localhost:5000/api/orders`, orderData)
            console.log(response.data);
            toast.success("Order added successfully")
        } catch (error) {
            console.error("errror in addOrder:", error);
        }
    }

    return { loading, addOrder }
}

export default useAddOrder
