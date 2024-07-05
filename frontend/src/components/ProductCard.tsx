import toast from "react-hot-toast";
import useAddCart from "../hooks/useAddCart";
import { ProductTypes } from "../types/types";

const ProductCard = ({ product }: { product: ProductTypes }) => {
  const { loading, addToCart } = useAddCart();

  const handleAddToCart = () => {
    if (product._id) {
      addToCart({ productId: product._id, quantity: "1" });
    } else {
      toast.error("Product ID is missing");
    }
  };

  const availabilityText = product.availability ? "In Stock" : "Out of Stock";
  const availabilityClass = product.availability
    ? "text-green-500"
    : "text-red-500";

  const priceDiffernce = product.price - product.discountedPrice;

  return (
    <div className="w-80 p-4 bg-neutral-950 text-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img
        className="w-full h-40 object-cover rounded-t-lg"
        alt={product.title}
        src={product.image}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.title}</h2>
        <div className="flex-row space-y-1">
          <div className="flex mt-3 space-x-2">
            <p className=" text-lg font-bold text-yellow-400">
              ${product.discountedPrice}
            </p>
            <p>({product.discount}% off)</p>
          </div>
          <p className="line-through text-slate-500">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className=" flex mt-2 justify-between text-center ">
          <div className="bg-green-500 w-fit p-1 rounded-md">
            <p>Save up to ${priceDiffernce.toFixed(2)}</p>
          </div>
          <div>
            <p className={`text-sm mb-2 ${availabilityClass}`}>
              {availabilityText}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="bg-green-500 px-1.5 py-0.5 rounded-sm text-white flex items-center gap-0.5">
            {product.rating} ★
          </p>
          <button
            className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              !product.availability ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleAddToCart}
            disabled={loading || !product.availability}
            aria-label={product.availability ? "Add to Cart" : "Out of Stock"}
          >
            {loading ? "Adding..." : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
