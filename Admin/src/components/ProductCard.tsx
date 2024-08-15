import { ProductTypes } from "../types/types";
import { BsStarFill } from "react-icons/bs";

const ProductCard = ({ product }: { product: ProductTypes }) => {
  const availabilityText = product.quantity > 0 ? "In Stock" : "Out of Stock";
  const availabilityClass =
    product.quantity > 0 ? "text-green-500" : "text-red-500";

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<BsStarFill key={i} className="text-white" />);
    }
    return stars;
  };

  const discountedPrice = (
    product.price -
    product.price * (product.discount / 100)
  ).toFixed(2);

  const price = product.price ? product.price.toFixed(2) : "";

  return (
    <div className="w-84 p-4 m-2 bg-gray-800 text-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img
        className="w-full h-44 object-cover rounded-lg"
        alt={product.title}
        src={product.image}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product.title}</h2>

        <p className="text-sm text-gray-400 mb-2">{product.brand}</p>

        <div className="flex space-x-2 items-center ">
          <p className="text-lg font-bold text-yellow-400 mr-2">
            {discountedPrice} $
          </p>
          <p className=" text-gray-300">({product.discount}% off)</p>
        </div>
        <p className="text-sm text-gray-400 line-through">{price}</p>

        <p className="mt-2 text-gray-400 mb-2">Category: {product.category}</p>
        <p className={`text-sm mb-2 ${availabilityClass}`}>
          {availabilityText}
        </p>

        <p>Quantity:{" "}{product.quantity}</p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <p className="bg-green-500 px-2 py-1 rounded text-white flex items-center gap-1">
              {product.rating} {renderStars(product.rating)}
            </p>
            <p className="ml-2  text-gray-300">{product.dimensions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
