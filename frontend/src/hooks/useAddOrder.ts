import axios from "axios"
import { useState } from "react"

const useAddOrder = () => {
    const [loading, setLoading] = useState(false)

    const addOrder = async () => {
        setLoading(true)
        const URL = import.meta.env.VITE.BACKEND_URL
        console.log(URL);
        try {
            const response = await axios.post(`${URL}/api/orders`)
            console.log(response.data);

        } catch (error) {
            console.log("error in useAddOrder:", error);
        }
    }
    return { loading, addOrder }
}

export default useAddOrder
