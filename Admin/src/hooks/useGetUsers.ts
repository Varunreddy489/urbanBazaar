import axios from "axios"
import { useState } from "react"
import { UserTypes } from "../types/types"

const useGetUsers = () => {
    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState<UserTypes[] | undefined>([])

    const getUsers = async () => {
        setLoading(true)
        try {
            const response = await axios.get('http://localhost:5000/api/admin')
            setUsers(response.data)
            console.log(users);
        } catch (error) {
            console.error("error in useGetUsers:", error);
        } finally {
            setLoading(false)
        }
    }
    return { loading, users, getUsers }
}

export default useGetUsers
