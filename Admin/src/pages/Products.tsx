import { useEffect } from "react";

import { ProductTypes } from "../types/types";
import useGetProducts from "../hooks/useGetProducts";
import ProductCard from "../components/ProductCard";
import Spinner from "../components/Spinner";

const Products = () => {
  const { loading, products, getProducts } = useGetProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex bg-black justify-center items-center  mt-6 ">
      <div className="w-full px-4 grid grid-cols-3">
        {loading ? (
          <Spinner />
        ) : (
          products.map((product: ProductTypes) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
