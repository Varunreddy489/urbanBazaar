/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";

import { UserTypes } from "../types/types";
import { useAuthContext } from "../context/AuthContext";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const { authUser, isLoading: authLoading } = useAuthContext()


  const updateUser = async ({ user }: { user: UserTypes }) => {
    if (authLoading || !authUser) return
    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:5000/api/user/${authUser._id}`, user);
      console.log(response.data);
    } catch (error: any) {
      console.error("error in updateUser:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, updateUser };
};

export default useUpdateUser;
