import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";

import { CartItem } from '../types/types';

const useAddCart = () => {
    const [loading, setLoading] = useState(false)

    const addToCart = async ({
        productId,
        quantity,
    }: CartItem) => {

        setLoading(true)

        try {
            const response = await axios.post(`http://localhost:5000/api/cart/${productId}`, {
                quantity
            })

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            console.log(response.data);

            toast.success("Product added to cart successfully");
        } catch (error) {
            console.error("Error in useAddToCart", error);
            toast.error("Failed to add product to cart. Please try again later.");
        } finally {
            setLoading(false);
        }
    }
    return { loading, addToCart };

}

export default useAddCart

