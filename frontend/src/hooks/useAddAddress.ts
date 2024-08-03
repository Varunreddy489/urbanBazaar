import axios from "axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { AddressTypes } from "../types/types";

const useAddAddress = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authUser } = useAuthContext();

  const addAddress = async (address: AddressTypes) => {
    if (!authUser) {
      console.error("No authenticated user found");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/address/${authUser._id}`,
        address
      );
      console.log(response.data);
    } catch (error: any) {
      console.error("error in useAddAddress:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, addAddress };
};

export default useAddAddress;
