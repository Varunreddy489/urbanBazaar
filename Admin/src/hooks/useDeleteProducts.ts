import axios from "axios";
import toast from "react-hot-toast";

const useDeleteProducts = () => {
    const deleteProduct = async (productId: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/product/${productId}`)
            console.log(response.data);
            toast.success("Deleted Successfully")
        } catch (error) {
            console.error("error in deleteProduct", error);
        }
    }
    return { deleteProduct }
}

export default useDeleteProducts
