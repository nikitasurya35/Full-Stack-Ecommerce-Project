import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, ArrowLeft, Star, Package } from "lucide-react";
import { getProducts } from "../api/productApi"; // adjust path as needed
import type { Product } from "../Data/productListSpring"; // adjust path as needed

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "details" | "specs" | "reviews";

// ─── Main Component ───────────────────────────────────────────────────────────

const ProductDetails = ({product} : {product: Product}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  //const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("details");
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // useEffect(() => {
  //   if (!id) return;
  //   setLoading(true);
  //   getProductById(id)
  //     .then(setProduct)
  //     .catch((err) => console.error("Failed to fetch product:", err))
  //     .finally(() => setLoading(false));
  // }, [id]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    // TODO: dispatch to cart context / API
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center py-40 text-sm text-gray-400">
        Loading product...
      </div>
    );
  }

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-40 gap-3">
        <p className="text-gray-400 text-sm">Product not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-medium text-slate-700 underline"
        >
          Go back
        </button>
      </div>
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto px-8 py-8">

      {/* Breadcrumb */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-2 gap-12 items-start">

        {/* LEFT: Image */}
        <div>
          <div className="relative bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
            {/* Badge */}
            {product.status === "Out of Stock" && (
              <span className="absolute top-4 left-4 text-[11px] font-semibold bg-red-100 text-red-600 px-2.5 py-1 rounded-full">
                Out of stock
              </span>
            )}

            {/* Wishlist */}
            <button
              onClick={() => setWishlist((w) => !w)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition"
            >
              <Heart
                className={`w-4 h-4 ${wishlist ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              />
            </button>

            {/* Image or fallback */}
            {/* {product.productImageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain p-8 rounded-2xl"
              />
            ) : (
              <Package className="w-16 h-16 text-gray-300" />
            )} */}
          </div>
        </div>

        {/* RIGHT: Info */}
        <div className="flex flex-col gap-5">

          {/* Category + Name */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-1">
              {product.categoryName ?? "Uncategorized"}
            </p>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
              {product.productName}
            </h1>
          </div>

          {/* Rating */}
          {product.rating != null && (
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-4 h-4 ${
                      s <= product.rating!
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              {product.reviewCount != null && (
                <span className="text-xs text-gray-400">{product.reviewCount} reviews</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-slate-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.comparePrice != null && (
              <>
                <span className="text-base text-gray-400 line-through">
                  ₹{product.comparePrice.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  {Math.round((1 - product.price / product.comparePrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700">Qty</span>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 transition"
              >
                −
              </button>
              <span className="w-9 text-center text-sm font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-50 transition"
              >
                +
              </button>
            </div>
            <span
              className={`text-xs font-medium ${
                product.status !== "Out of Stock" ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {product.status !== "Out of Stock" ? "✓ In Stock" : "Out of stock"}
            </span>
          </div>

          {/* CTAs */}
          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={product.status === "Out of Stock"}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition
                ${
                  addedToCart
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-900 text-white hover:bg-slate-700 active:scale-[0.98]"
                }
                disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              <ShoppingCart className="w-4 h-4" />
              {addedToCart ? "Added!" : "Add to Cart"}
            </button>
            <button
              disabled={product.status === "Out of Stock"}
              className="flex-1 py-3 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Buy Now
            </button>
          </div>

          {/* Trust bar */}
          <div className="flex gap-4 p-4 bg-gray-50 rounded-xl text-center">
            {[["🚚", "Free shipping ₹999+"], ["↩️", "30-day returns"], ["🧾", "GST invoice"]].map(
              ([icon, label]) => (
                <div key={label} className="flex-1">
                  <div className="text-lg">{icon}</div>
                  <div className="text-[11px] text-gray-500 font-medium mt-0.5">{label}</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="flex border-b border-gray-200 mb-6 gap-1">
          {(["details", "specs", "reviews"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-semibold capitalize transition border-b-2 -mb-px
                ${
                  activeTab === tab
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-gray-400 hover:text-slate-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "details" && (
          <ul className="space-y-2.5">
            {(product.highlights ?? []).map((h: string) => (
              <li key={h} className="flex items-center gap-2.5 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 flex-shrink-0" />
                {h}
              </li>
            ))}
            {!product.highlights?.length && (
              <p className="text-sm text-gray-400">No details available.</p>
            )}
          </ul>
        )}

        {activeTab === "specs" && (
          <table className="w-full text-sm border-collapse">
            <tbody>
              {Object.entries(product.highlights ?? {}).map(([key, val]) => (
                <tr key={key} className="border-b border-gray-100">
                  <td className="py-2.5 text-gray-500 w-2/5">{key}</td>
                  <td className="py-2.5 text-slate-800 font-medium">{String(val)}</td>
                </tr>
              ))}
              {!product.highlights && (
                <tr>
                  <td colSpan={2} className="py-2.5 text-gray-400">
                    No specs available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* {activeTab === "reviews" && (
          <div className="space-y-4">
            {(product.reviews ?? []).map((r: any) => (
              <div key={r.id} className="p-4 bg-white border border-gray-100 rounded-xl">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-semibold text-slate-800">{r.author}</span>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= r.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{r.comment}</p>
              </div>
            ))}
            {!product.reviews?.length && (
              <p className="text-sm text-gray-400">No reviews yet.</p>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default ProductDetails;
