import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"
import axios from "axios"

const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const response = await axios.post("http://localhost:5000/api/user/logout", {})

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            localStorage.removeItem("user");
            setAuthUser(null);
        } catch (error) {
            console.log("error in useLogout", error);
        } finally {
            setLoading(false)
        }
    }
    return { loading, logout }
}

export default useLogout    