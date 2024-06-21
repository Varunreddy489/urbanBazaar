import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteCart = () => {

    const [loading, setLoading] = useState(false)

    const deleteCartItem = async (id: string) => {
        console.log(id);
        setLoading(true)

        try {
            const response = await axios.delete(`http://localhost:5000/api/cart/${id}`)
            toast.success("Product removed from the cart")
            console.log(response.data);
        } catch (error) {
            console.log("error in useDeleteCart:", error);
            toast.error("Failed to remove product from the cart. Please try again later.");
        } finally {
            setLoading(false)
        }
    }
    return { loading, deleteCartItem }
}

export default useDeleteCart