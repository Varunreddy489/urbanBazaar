import axios from 'axios';

const useUpdateCart = () => {
    const updateCart = async (productId: string, count: number) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/cart/${productId}`, { count });
            return response.data;
        } catch (error) {
            console.error("Error updating cart:", error);
            throw error;
        }
    };
    return { updateCart };
};

export default useUpdateCart;
