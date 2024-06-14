import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ProductTypes } from "../types/types";

const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false);

    const updateProducts = async (id: string, {
        title,
        description,
        price,
        category,
        imageUrl,
        rating,
    }: ProductTypes) => {
        const success = handleInputErrors({
            title,
            description,
            price,
            category,
            imageUrl,
            rating,
        });

        if (!success) return;

        setLoading(true);

        try {
            const response = await axios.put(`/api/product/updateProduct/${id}`, {
                title,
                description,
                price,
                category,
                imageUrl,
                rating,
            });

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            toast.success("Product Updated successfully");
        } catch (error) {
            console.log("Error in useUpdateProduct:", error);
            toast.error("Failed to Update product. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return { loading, updateProducts };
};

export default useUpdateProduct;

function handleInputErrors(data: ProductTypes) {
    const { title, description, price, category, imageUrl, rating } = data;

    if (!title || !description || !price || !category || !imageUrl || !rating) {
        toast.error("Fill all input fields");
        return false;
    }
    return true;
}
