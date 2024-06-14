import { ProductTypes } from "../types/types";

const ProductCard = ({ product }: { product: ProductTypes }) => {
  return (
    <div className="w-80 p-4 bg-neutral-950 text-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img
        className="w-full h-40 object-cover rounded-t-lg"
        alt={product.title}
        src={product.image}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{product.title}</h2>
        <p className=" text-lg font-bold text-yellow-400 mt-2  ">{product.price} $ </p>
        <div className="flex justify-between items-center mt-4">
        <p className="bg-green-500 px-1.5 py-0.5  rounded-sm text-white flex items-center gap-0.5">{product.rating} ★</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
