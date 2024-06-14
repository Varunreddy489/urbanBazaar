import axios from "axios"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import { AuthUserTypes } from "../types/types"
import { useAuthContext } from "../context/AuthContext"

const useGetUserData = (userId: string) => {
    const [userData, setUserData] = useState<AuthUserTypes | null>(null)
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true)

            try {
                const response = await axios.get(`http://localhost:5000/api/user/${userId}`);

                console.log(response.data);
                if (response.data.error) {
                    throw new Error(response.data.error);
                }

                setUserData(response.data);
                setAuthUser(response.data);
            } catch (error) {
                console.log("error in useGetUserData", error);
                if (axios.isAxiosError(error) && error.response) {
                    toast.error(error.response.data.error || "Failed to fetch user data. Please try again later.");
                } else {
                    toast.error("Failed to fetch user data. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        }
        if (userId) {
            fetchUser();
        }
    }, [userId, setAuthUser]);

    return { userData, loading };
};


export default useGetUserData