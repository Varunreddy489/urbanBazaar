import { useEffect } from "react";
import { ProductTypes } from "../../types/types";
import ProductCard from "../../components/ProductCard";
import useGetProducts from "../../hooks/useGetProducts";

const Products = () => {
  const { loading, products, getProducts } = useGetProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="flex   justify-center items-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-4 gap-6">
        {loading ? (
          <p>Loading...</p>
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
