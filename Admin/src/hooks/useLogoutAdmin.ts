import { useState } from "react"
import { useAdminAuthContext } from "../context/AdminAuthContext"
import axios from "axios"
import toast from "react-hot-toast"

const useLogoutAdmin = () => {
    const [loading, setLoading] = useState(false)
    const { setAdminAuth } = useAdminAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:5000/api/admin/logout')

            if (response.data.error) {
                throw new Error(response.data.error)
            }

            setAdminAuth(null)
            localStorage.removeItem('admin')
            toast.success("Logout Successfull")
        } catch (error) {
            console.log("error in adminLogout:", error);
        } finally {
            setLoading(false)
        }
    }
    return { loading, logout }
}
export default useLogoutAdmin
