import type { Product } from "../Data/productListSpring";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import ProductDetails from "../Pages/ProductDetails";

const ProductCard = ({ product }: { product: Product }) => {

  const navigate = useNavigate();
  // on the card's onClick:
  const handleCardClick = (product: Product) => {
    console.log(product);
    navigate(`/product`, { state: { product } });
    
  };

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
        {product.categoryName}
      </p>
      {/* <ProductDetails 
        onClick={handleCardClick}
        key={product.id}
        product={product}
      >
        <h3 className="font-semibold hover:text-blue-700 hover:underline transition-all duration-200">
          {product.productName}
        </h3>
      </ProductDetails> */}
      <div key={product.id} onClick={() => handleCardClick(product)} className="cursor-pointer">
        <h3 className="font-semibold hover:text-blue-700 hover:underline transition-all duration-200">
          {product.productName}
        </h3>
      </div>

      <p className="text-yellow-500">Stock {product.availableStock}</p>
      <p className="text-yellow-500"> {product.status}</p>

      <div className="flex justify-between items-center mt-2">
        <p className="font-bold">₹{product.price}</p>

        {/* <button className="bg-black text-white p-2 rounded">
          🛒
        </button> */}
        <button className=" p-2 bg-blue-700 rounded-full border border-gray-200 hover:bg-blue-500 shadow-sm">
          <ShoppingCart className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;