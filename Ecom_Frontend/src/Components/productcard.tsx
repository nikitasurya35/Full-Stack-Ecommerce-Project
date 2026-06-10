import type { Product } from "../Data/productListSpring";
import { useNavigate } from "react-router-dom";
import { Heart, Package, ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

const ProductCard = ({ product }: { product: Product }) => {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [wishlist, setWishlist] = useState(false);
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
 
  const handleCardClick = (product: Product) => {
    const p_slug = product.productName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    navigate(`/product/${p_slug}__${product.id}`);
  };
 
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() < 60 * 24 * 60 * 60 * 1000;
 
  const inStock = product.status === "ACTIVE";
 
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (added) return;
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };
 
  return (
    <div
      className="group relative bg-white rounded-2xl border border-gray-300 overflow-hidden
                 hover:shadow-[0_8px_32px_rgba(0,0,0,0.09)] hover:-translate-y-0.5
                 transition-all duration-200 cursor-pointer"
    >
      {/* Image area */}
      <div
        className="relative h-40 bg-gray-50 flex items-center justify-center overflow-hidden"
        onClick={() => handleCardClick(product)}
      >
        {product.productImageUrl ? (
          <img
            src={`${API_BASE_URL}${product.productImageUrl}`}
            alt={product.productName}
            className="w-full h-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Package className="w-10 h-10 text-gray-300" />
        )}
 
        {/* Stock badge */}
        <span
          className={`absolute top-2.5 left-2.5 text-[11px] font-semibold px-2.5 py-1 rounded-full
            ${inStock
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
            }`}
        >
          {inStock ? "In Stock" : "Out of stock"}
        </span>
 
        {/* NEW badge */}
        {isNew && inStock && (
          <span className="absolute top-2.5 left-[88px] text-[10px] font-bold px-2 py-1 rounded-full bg-orange-500 text-white tracking-wide">
            NEW
          </span>
        )}
 
        {/* Wishlist */}
        <button
          onClick={(e) => { e.stopPropagation(); setWishlist((w) => !w); }}
          className="absolute top-2 right-2 w-[30px] h-[30px] bg-white/90 border border-gray-100
                     rounded-full flex items-center justify-center
                     hover:scale-110 transition-transform duration-150"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              wishlist ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>
 
      {/* Body */}
      <div className="px-3.5 pt-3 pb-4">
        <p className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase mb-1">
          {product.categoryName}
        </p>
 
        <h3
          onClick={() => handleCardClick(product)}
          className="text-sm font-semibold text-gray-900 leading-snug mb-3
                     truncate hover:text-blue-600 transition-colors duration-150"
        >
          {product.productName}
        </h3>
 
        <div className="flex items-center justify-between">
          <p
            className={`text-[17px] font-semibold tracking-tight ${
              inStock ? "text-gray-900" : "text-gray-300"
            }`}
          >
            ₹{product.price.toLocaleString("en-IN")}
          </p>
 
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`w-[34px] h-[34px] rounded-[10px] flex items-center justify-center
                        transition-all duration-150
                        ${inStock
                          ? added
                            ? "bg-emerald-600 scale-95"
                            : "bg-blue-700 hover:bg-blue-800 hover:scale-105"
                          : "bg-gray-100 cursor-not-allowed"
                        }`}
            aria-label="Add to cart"
          >
            {added ? (
              <Check className="w-3.5 h-3.5 text-white" />
            ) : (
              <ShoppingCart
                className={`w-3.5 h-3.5 ${inStock ? "text-white" : "text-gray-400"}`}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;