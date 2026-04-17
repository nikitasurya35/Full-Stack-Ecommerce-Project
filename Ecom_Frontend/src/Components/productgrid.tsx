import ProductCard from "./productcard";
import { products } from "../Data/ListOfProducts";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import SideFilter from "./sidefilter";

const ProductGrid = () => {
  const [showFilters, setShowFilters] = useState(false);

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
            {products.length} products
          </p>
        </div>

        {/* RIGHT: Sort */}
        <select className="border border-gray-300 px-4 py-2 rounded-lg text-sm">
          <option>Featured</option>
          <option>Price Low → High</option>
          <option>Price High → Low</option>
        </select>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {showFilters && (
        <div className="fixed inset-0 z-50 flex justify-end">
    
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setShowFilters(false)}
          />

          {/* SIDEBAR */}
          <div className="relative bg-white shadow-lg overflow-y-auto">
            <SideFilter onChange={(filters) => console.log(filters)} />
          </div>

        </div>
      )}
    </div>


  );
};

export default ProductGrid;