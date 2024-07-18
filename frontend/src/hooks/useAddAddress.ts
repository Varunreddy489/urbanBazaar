import axios from "axios"
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"

const useAddAddress = () => {
    const [loading, setLoading] = useState(false)
    const { authUser } = useAuthContext()

    console.log("authUser._id", authUser?._id);

    const addAddress = async () => {
        if (!authUser) {
            console.error("No authenticated user found")
            return
        }
        setLoading(true)

        try {
            const response = await axios.post(`http://localhost:5000/api/user/address/${authUser._id}`)
            console.log(response.data);
        } catch (error) {
            console.log("error in useAddAddress", error);
        }
    }
    return { loading, addAddress }
}

export default useAddAddress
