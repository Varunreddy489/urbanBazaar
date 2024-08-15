/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import { ProductTypes } from "../types/types";
import ProductCard from "../components/ProductCard";
import useGetProducts from "../hooks/useGetProducts";
import { CiSquarePlus } from "react-icons/ci";
import AddProducts from "../components/AddProducts";

const Products = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);

  const { loading, products, getProducts } = useGetProducts();

  const memoizedGetProducts = useCallback(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    memoizedGetProducts();
  }, []);

  const handleAddProduct = () => {
    setShowAddProduct(true);
  };

  const handleCloseForm = () => {
    setShowAddProduct(false);
  };

  return (
    <div className=" bg-black justify-center items-center ">
      <br />
      <div className="flex justify-between p-4 ">
        <h1 className="text-white ml-10 text-5xl font-bold ">Products</h1>:
        <CiSquarePlus
          className="text-white ml-10 text-5xl font-bold "
          onClick={handleAddProduct}
        />
      </div>
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-gray-800 w-full max-w-md rounded-lg shadow-md p-6">
            <button
              className="text-white float-right font-bold text-lg"
              onClick={handleCloseForm}
            >
              &times;
            </button>
            <AddProducts />
          </div>
        </div>
      )}
      <div className="w-full px-4 grid grid-cols-3">
        {loading ? (
          <Spinner />
        ) : (
          products.map((product: ProductTypes) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
      <br />
    </div>
  );
};

export default Products;
