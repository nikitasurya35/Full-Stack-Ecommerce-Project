import type { Product } from "../Data/ListOfProducts";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-gray-100 rounded-xl p-4 relative">
      {product.tag && (
        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
          {product.tag}
        </span>
      )}

      <div className="h-32 flex items-center justify-center">
        📦
      </div>

      <p className="text-xs text-gray-500 uppercase">
        {product.category}
      </p>

      <h3 className="font-semibold">{product.name}</h3>

      <p className="text-yellow-500">⭐ {product.rating}</p>

      <div className="flex justify-between items-center mt-2">
        <p className="font-bold">₹{product.price}</p>

        <button className="bg-black text-white p-2 rounded">
          🛒
        </button>
      </div>
    </div>
  );
};

export default ProductCard;