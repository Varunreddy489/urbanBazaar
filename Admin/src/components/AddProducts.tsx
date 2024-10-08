import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { ProductTypes } from "../types/types";
import useAddProduct from "../hooks/useAddProducts";

const AddProducts = () => {
  const [inputs, setInputs] = useState<ProductTypes>({
    title: "",
    description: "",
    price: 0,
    discount: 0,
    category: "",
    image: "",
    rating: 0,
    availability: true,
    brand: "",
    dimensions: "",
    quantity: 0,
  });

  const { loading, addProducts } = useAddProduct();

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
    await addProducts(inputs);
    toast.success("Your Product Added Successfully");
    // Reset form inputs if needed
    // setInputs({
    //   title: "",
    //   description: "",
    //   price: 0,
    //   discount: 0,
    //   category: "",
    //   image: "",
    //   rating: 0,
    //   availability: true,
    //   brand: "",
    //   dimensions: "",
    //   quantity: 0,
    // });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          Add Your Product
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
              placeholder="Discount"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="number"
              name="discount"
              value={inputs.discount}
              onChange={handleNumberInputChange}
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
              name="image"
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
          <div className="mb-4">
            <input
              placeholder="Brand"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="brand"
              value={inputs.brand}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Dimensions"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              name="dimensions"
              value={inputs.dimensions}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <input
              placeholder="Quantity"
              className="bg-gray-700 w-full text-gray-200 border-0 rounded-md p-3 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="number"
              name="quantity"
              value={inputs.quantity}
              onChange={handleNumberInputChange}
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            disabled={loading}
            onClick={handleAddProduct}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
