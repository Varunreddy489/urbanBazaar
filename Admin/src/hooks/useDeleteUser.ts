import axios from "axios"
import toast from "react-hot-toast";

const useDeleteUser = () => {
    const deleteuser = async (userId: string) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/admin/${userId}`)
            console.log(response.data);
            toast.success("User Deleted Successfully")
        } catch (error) {
            console.error("error in deleteUser:", error);
        }
    }
    return { deleteuser }
}

export default useDeleteUser
