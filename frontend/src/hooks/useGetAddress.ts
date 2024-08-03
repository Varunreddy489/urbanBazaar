import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useGetAddress = () => {

    const { authUser, isLoading: authLoading } = useAuthContext()

    const [loading, setLoading] = useState(false)
    const [address, setAddress] = useState([])


    const getAddress = async () => {
        if (authLoading || !authUser) return;
        setLoading(true)
        try {
            const response = await axios.get(`http://localhost:5000/api/user/address/${authUser._id}`)
            setAddress(response.data)
        } catch (error) {
            console.log("error in useGetAddress", error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Failed to register. Please try again later.");
            }
        } finally {
            setLoading(false)
        }
    }
    return { loading, address, getAddress }
}

export default useGetAddress
