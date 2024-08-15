import axios from "axios";
import { useState } from "react";

import { ProductTypes } from "../types/types";

const useGetProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<ProductTypes[]>([]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/product");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, products, getProducts };
};

export default useGetProducts;
