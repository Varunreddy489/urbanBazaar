import axios from 'axios';
import { useState } from "react"
import toast from "react-hot-toast"

import { AdminRegisterData } from '../types/types';
import { useAdminAuthContext } from "../context/AdminAuthContext";

const useLoginAdmin = () => {
    const [loading, setLoading] = useState(false)
    const { setAdminAuth } = useAdminAuthContext()

    const loginAdmin = async ({ email, password }: AdminRegisterData) => {

        const success = handleInputErrors({ email, password })

        if (!success) return;

        setLoading(true)

        try {
            const response = await axios.post("http://localhost:5000/api/admin/login", {
                email, password
            })
            console.log(response.data);
            localStorage.setItem("admin", JSON.stringify(response.data));

            if (response.data.error) {
                throw new Error(response.data.error)
            }
            localStorage.setItem("admin", JSON.stringify(response.data));
            setAdminAuth(response.data)
            console.log(response.data);
            toast.success("Admin Registration successful");
        } catch (error) {
            console.log("error in useRegister", error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                toast.error(error.response.data.error || "Failed to register. Please try again later.");
            } else {
                toast.error("Failed to register. Please try again later.");
            }
        } finally {
            setLoading(false)
        }
    }
    return { loading, loginAdmin }
}

export default useLoginAdmin

function handleInputErrors(data: AdminRegisterData) {
    const { email, password } = data

    if (!email || !password) {
        toast.error("Inadequate Data")
        return false
    }
    return true
}