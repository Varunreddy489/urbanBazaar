import { useCallback, useEffect } from "react";

import Spinner from "../components/Spinner";
import { ProductTypes } from "../types/types";
import ProductCard from "../components/ProductCard";
import useGetProducts from "../hooks/useGetProducts";

const Products = () => {
  const { loading, products, getProducts } = useGetProducts();

  const memoizedGetProducts = useCallback(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    memoizedGetProducts();
  }, []);

  return (
    <div className=" bg-black justify-center items-center ">
      <br />
      <h1 className="text-white ml-10 text-5xl font-bold ">Products</h1>:
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
