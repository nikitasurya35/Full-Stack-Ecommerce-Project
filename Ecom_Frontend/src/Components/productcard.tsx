import type { Product } from "../Data/productListSpring";
import { useNavigate } from "react-router-dom";
import { Heart, Package, ShoppingCart } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  const [wishlist, setWishlist] = useState(false);
  
  const navigate = useNavigate();
  // on the card's onClick:
  const handleCardClick = (product: Product) => {
    console.log(product);
    const p_id: number = product.id;
    const p_slug: string = product.productName.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
    navigate(`/product/${p_slug}__${product.id}`); //This will be now shown in the url like: /product/iphone-15-pro-max-123
    
  };

  const createdAt = new Date(product.createdAt);

  // Example: show NEW if product is less than 7 days old
  const isNew = Date.now() - createdAt.getTime() < 60 * 24 * 60 * 60 * 1000;

  return (
    <div className="bg-gray-100 rounded-xl p-4 relative items-center justify-center">
      {/* {product.tag && (
        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
          {product.tag}
        </span>
      )} */}
      
      {isNew && product.status === "ACTIVE" &&(
        <span className="absolute top-4 left-20 bg-orange-500 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
          NEW
        </span>
      )}
     
      {/* Badge */}
      <span className= { `absolute top-4 left-4 text-[11px] font-semibold px-2.5 py-1 rounded-full
      ${product.status === "ACTIVE" ? "bg-green-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
        {product.status === "ACTIVE" ? "In Stock" : "Out of stock"}
      </span>

      {/* Wishlist */}
      <button
        onClick={() => setWishlist((w) => !w)}
        className="absolute top-4 right-4 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50 transition"
      >
        <Heart
          className={`w-3 h-3 ${wishlist ? "fill-red-500 text-red-500" : "text-gray-400"}`}
        />
      </button>


      <div className="h-32 flex items-center justify-center">
       {product.productImageUrl ? (
              <img
                src={`${API_BASE_URL}${product.productImageUrl}`}
                alt={product.productName}
                className="w-full h-full object-contain p-8 rounded-2xl"
              />
            ) : (
              <Package className="w-16 h-16 text-gray-300" />
            )}
      </div>

      <p className="text-xs text-gray-500 uppercase">
        {product.categoryName}
      </p>
      
      <div key={product.id} onClick={() => handleCardClick(product)} className="cursor-pointer">
        <h3 className="font-semibold hover:text-blue-700 hover:underline transition-all duration-200">
          {product.productName}
        </h3>
      </div>

      {/* <p className="text-yellow-500">Stock {product.availableStock}</p> */}
      {/* <p className="text-yellow-500"> {product.status}</p> */}
      

      <div className="flex justify-between items-center mt-2">
        <p className="font-bold">₹{product.price}</p>

        <button className=" p-2 bg-blue-700 rounded-full border border-gray-200 hover:bg-blue-500 shadow-sm">
          <ShoppingCart className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;