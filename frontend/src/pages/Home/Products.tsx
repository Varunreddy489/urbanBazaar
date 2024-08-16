import { useEffect, useState } from "react";

import Filter from "../../components/Filter";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import ProductCard from "../../components/ProductCard";
import useGetProducts from "../../hooks/useGetProducts";
import { ProductTypes, UserTypes } from "../../types/types";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    loading: productsLoading,
    products,
    getProducts,
  } = useGetProducts(currentPage);
  const [user, setUser] = useState<UserTypes | undefined>(undefined);

  useEffect(() => {
    getProducts();
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [currentPage]); // Re-fetch products when page changes

  return (
    <div>
      <div className="flex items-center min-h-screen bg-slate-900 p-4">
        <div>
          <Filter />
        </div>
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
      <div className="flex items-center justify-center">
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={5} // You can adjust this as needed
        />
      </div>
    </div>
  );
};

export default Products;
