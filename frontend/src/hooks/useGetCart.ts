/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { CartItemWithProductDetails } from "../types/types";
import { useAuthContext } from "../context/AuthContext";

const useGetCart = () => {

    // const URL = import.meta.env.VITE_BACKEND_URL;
    const { authUser, isLoading: authLoading } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [cartItems, setCartItems] = useState<CartItemWithProductDetails[]>([])

    const getCartItems = async () => {
        if (authLoading || !authUser || !authUser._id) return;
        try {
            const response = await axios.get(`http://localhost:5000/api/cart/${authUser._id}`);
            if (response.data && response.data.cartItems) {
                console.log(response.data.cartItems);
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

    useEffect(() => {
        if (!authLoading && authUser) {
            getCartItems();
        }
    }, [authLoading, authUser]);

    return { loading, cartItems, getCartItems }
}

export default useGetCart
