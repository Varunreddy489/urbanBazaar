import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { ProductTypes } from "../types/types";

const useGetProducts = (page: number) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductTypes[]>([]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/product?page=${page}&limit=12`,
        {
          withCredentials: true, // Ensure cookies are included
        }
      );
      setProducts(response.data.results);
      console.log(response.data.results);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, products, getProducts };
};

export default useGetProducts;
