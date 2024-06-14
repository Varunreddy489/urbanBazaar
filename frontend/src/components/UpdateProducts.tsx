import { useState, ChangeEvent } from "react";
import useUpdateProduct from "../hooks/useUpdateProduct";
import { ProductTypes } from "../types/types";

const UpdateProducts = () => {
  const [inputs, setInputs] = useState<ProductTypes>({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    rating: "",
  });

  const { loading, updateProducts } = useUpdateProduct();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleNumberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: parseFloat(value),
    });
  };

  const handleAddProduct = async () => {
    try {
      await updateProducts("product_id", inputs);
      setInputs({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        rating: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Update Your Product
        </h2>
        <form className="flex flex-col">
          <div className="mb-4">
            <input
              placeholder="Title"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Description"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="description"
              value={inputs.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Price"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="number"
              name="price"
              value={inputs.price}
              onChange={handleNumberInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Category"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="category"
              value={inputs.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Image URL"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="imageUrl"
              value={inputs.image}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Rating"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="number"
              name="rating"
              value={inputs.rating}
              onChange={handleNumberInputChange}
            />
          </div>
          <button
            type="button"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            disabled={loading}
            onClick={handleAddProduct}
          >
            {loading ? "Updating Product..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
