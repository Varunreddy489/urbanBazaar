import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';

import { RegisterData } from "../types/types";
import { useAuthContext } from "../context/AuthContext";

const useRegister = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signUp = async ({
        name,
        username,
        email,
        password,
        confirmPassword,
        gender,
    }: RegisterData) => {
        const success = handleInputErrors({
            name,
            username,
            email,
            password,
            confirmPassword,
            gender
        });

        if (!success) return;

        setLoading(true)

        try {
            const response = await axios.post(
                "http://localhost:5000/api/user/register",
                {
                    name,
                    username,
                    email,
                    password,
                    confirmPassword,
                    gender
                });
            console.log(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
            setAuthUser(response.data);

            if (response.data.error) {
                throw new Error(response.data.error)
            }
            toast.success("Registration successful");
            
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
    return { loading, signUp };

}
export default useRegister

function handleInputErrors(data: RegisterData) {
    const { name, username, email, password, confirmPassword, gender } = data;

    if (!name || !username || !email || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}