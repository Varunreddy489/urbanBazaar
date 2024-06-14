import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast"

import { LoginData } from '../types/types';
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();


    const login = async ({
        email, password
    }: LoginData) => {
        const succcess = handleInputErrors({
            email, password
        })

        if (!succcess) return;
        setLoading(true)

        try {
            const response = await axios.post("http://localhost:5000/api/user/login", { email, password });

            if (response.data.error) {
                throw new Error(response.data.error);
            }

            console.log(response.data);
            toast.success("Login Completed Successfully");
            localStorage.setItem("user", JSON.stringify(response.data));

            setAuthUser(response.data)

        } catch (error) {
            console.log("error in useLogin", error);
            if (axios.isAxiosError(error) && error.response && error.response.data) {
                toast.error(error.response.data.error || "Failed to register. Please try again later.");
            } else {
                toast.error("Failed to register. Please try again later.");
            }
        } finally {
            setLoading(false)
        }
    }
    return { loading, login }
}

export default useLogin

function handleInputErrors(data: LoginData) {
    const { email, password } = data
    if (!email || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true
}