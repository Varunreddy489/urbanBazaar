import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

import { OrderTypes } from "../types/types"

const useOrder = () => {
    const [loading, setLoading] = useState(false)

    const placeOrder = async ({ productId, userId, address, quantity }: OrderTypes) => {

        const success = handleInputErrors({ productId, userId, address, quantity })

        if (!success) return
        setLoading(true)

        try {
            const response = await axios.post("http:localhost:5000/api/orders", { productId, userId, address, quantity })

            if (!response.data.success) throw new Error(response.data.message)

            console.log(response.data);

        } catch (error) {
            console.log("error in useOrder:", error);
        } finally {
            setLoading(false)
        }
    }
    return { loading, placeOrder }
}

export default useOrder



function handleInputErrors(data: OrderTypes) {

    const { userId, productId, address, quantity } = data

    if (!userId || !productId || !address || !quantity) {
        toast.error("All fields are required")
        return false
    }
    return true
}