import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { ProductTypes } from "../types/types";

const useAddProduct = () => {
  const [loading, setLoading] = useState(false);

  const addProducts = async ({
    title,
    description,
    price,
    category,
    image,
    rating,
    quantity,
  }: ProductTypes) => {
    const success = handleInputErrors({
      title,
      description,
      price,
      category,
      image,
      rating,
      quantity,
    });

    if (!success) return;
    setLoading(true);
    try {
      const response = await axios.post(" http://localhost:5000/api/product/", {
        title,
        description,
        price,
        category,
        image,
        rating,
        quantity,
      });
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      console.log(response.data);
      toast.success("Product Added successfully");
    } catch (error) {
      console.log("error in useAddProduct", error);
      toast.error("Failed to Add product. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return { loading, addProducts };
};

export default useAddProduct;

function handleInputErrors(data: ProductTypes) {
  const { title, description, price, category, image, rating, quantity } = data;

  if (
    !title ||
    !description ||
    !price ||
    !category ||
    !image ||
    !rating ||
    !quantity
  ) {
    toast.error("Fill all input fields");
    return false;
  }
  return true;
}
