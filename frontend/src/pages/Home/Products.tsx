import { useEffect, useState } from "react";
import { ProductTypes, UserTypes } from "../../types/types";
import ProductCard from "../../components/ProductCard";
import useGetProducts from "../../hooks/useGetProducts";
import Spinner from "../../components/Spinner";

const Products = () => {
  const { loading: productsLoading, products, getProducts } = useGetProducts();
  const [user, setUser] = useState<UserTypes | undefined>(undefined);

  useEffect(() => {
    getProducts();
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4">
        {productsLoading ? (
          <Spinner />
        ) : (
          products.map((product: ProductTypes) => (
            <ProductCard key={product._id} user={user} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
