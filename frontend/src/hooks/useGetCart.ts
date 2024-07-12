import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast";
import { CartItem } from "../types/types";

const useGetCart = () => {

    const URL = import.meta.env.VITE_BACKEND_URL;

    const [loading, setLoading] = useState(false)
    const [cartitems, setCartItems] = useState<CartItem[]>([])

    const userData = localStorage.getItem("user");
    const user = JSON.parse(userData || '{}');

    const userId = user._id;

    if (!userId) {
        console.error("User ID is missing");
        return;
    }

    const getCartItems = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${URL}/cart/${userId}`)
            if (response.data && response.data.cartItems) {
                console.log(response.data);
                setCartItems(response.data.cartItems);
                toast.success("Cart items fetched successfully!");
            } else {
                toast.error("Failed to fetch cart items.");
            }
            toast.success("Cart items fetched successfully!");
        } catch (error) {
            console.log("Error in useGetcart:", error);
        } finally {
            setLoading(false)
        }
    }
    return { loading, cartitems, getCartItems }
}

export default useGetCart
