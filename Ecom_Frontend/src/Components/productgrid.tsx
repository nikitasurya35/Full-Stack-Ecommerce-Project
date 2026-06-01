import ProductCard from "./productcard";
import type { Product } from "../Data/productListSpring";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import SideFilter from "./sidefilter";
import { getProducts } from "../api/productApi";
import { useSearchParams } from "react-router-dom";

interface FilterState {
  categoryId: string | null; // null = "All"
  //price: { min: string; max: string };
  stockStatus?: boolean | null; // optional, can be added later
}

const SORT_OPTIONS = [
  { label: "Featured",          value: "featured" },
  { label: "Price Low → High",  value: "price_low_to_high" },
  { label: "Price High → Low",  value: "price_high_to_low" },
  { label: "Newest Arrivals",   value: "new" },
];

const ProductGrid = () => {
  
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  // const [filters, setFilters] = useState<FilterState>({
  //   categoryId: null,
  //   //price: { min: "", max: "" },
  //   stockStatus: null,
  // });
  // const [sortBy, setSortBy] = useState("featured");
  //Changes made to update URL params instead of local state
  const filters: FilterState = {
      categoryId: searchParams.get("categoryId"),

      stockStatus:
        searchParams.get("stockStatus") === null
          ? null
          : searchParams.get("stockStatus") === "true", //You are explicitly converting the string "true" from the URL into the boolean true. true ===true becomes boolean true and false === "true" becomes boolean false. This way, you can handle the stockStatus as a boolean in your application while still using URL parameters to represent its state.
  };

  const sortBy = searchParams.get("sortBy") || "featured";



  useEffect(() => {
    async function fetchProducts(filters: FilterState, sortBy: string) {
      setLoading(true);
      try {
        const prods = await getProducts({
          categoryId: filters.categoryId ? [filters.categoryId] : undefined,
          stockStatus: filters.stockStatus ?? undefined,
          //productId: activeProductId ? parseInt(activeProductId) : undefined,
          sortBy: sortBy,
        });
        setProducts(prods);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts(filters, sortBy);
  }, [filters.categoryId, filters.stockStatus, sortBy]);

  return (
    <div className="w-full px-8 py-6">

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-6">
        
        {/* LEFT: Filters + Count */}
        <div className="flex items-center gap-4 ">
          <button
            onClick={() => setShowFilters((prev) => !prev)}
            className="flex tems-center gap-2 border px-4 py-2 border-gray-300 rounded-lg text-sm"
          >
            <SlidersHorizontal className="w-3 text-gray-600"/>
            <span>Filters</span>
          </button>

          <p className="text-gray-700 text-sm">
            {/* {products.length} products */}
            {loading ? "Loading..." : `${products.length} products`}
          </p>
        </div>

        {/* RIGHT: Sort */}
        {/* <select className="border border-gray-300 px-4 py-2 rounded-lg text-sm">
          <option>Featured</option>
          <option>Price Low → High</option>
          <option>Price High → Low</option>
        </select> */}
        <select
          className="border border-gray-300 px-4 py-2 rounded-lg text-sm"
          value={sortBy}
          // onChange={(e) => setSortBy(e.target.value)} //Changes made to update URL params instead of local state
          onChange={(e) => {
            const params = Object.fromEntries(searchParams.entries());

            params.sortBy = e.target.value;

            setSearchParams(params);
          }}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* GRID */}
      {loading ? (
        <div className="text-center text-gray-400 py-20 text-sm">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-400 py-20 text-sm">No products found.</div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
      {/* <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div> */}

      {showFilters && (
        <div className="fixed inset-0 z-50 flex justify-end">
    
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowFilters(false)}
          />

          {/* SIDEBAR */}
          <div className="relative bg-white shadow-lg overflow-y-auto">
            <SideFilter onChange={(filters) => {
              // setFilters(filters); Changes made to update URL params instead of local state
              
              const params: Record<string, string> = {};

              // CATEGORY
              if (filters.categoryId) {
                params.categoryId = filters.categoryId;
              }

              // STOCK STATUS
              if (
                filters.stockStatus !== null &&
                filters.stockStatus !== undefined
              ) {
                params.stockStatus = String(filters.stockStatus);
              }

              // KEEP SORT
              params.sortBy = sortBy;

              setSearchParams(params);
  
              console.log(filters);
            }} />
          </div>

        </div>
      )}
    </div>


  );
};

export default ProductGrid;