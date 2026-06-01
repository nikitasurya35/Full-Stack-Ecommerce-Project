//"use client";

import { useState, useEffect } from "react";
import type { CategoryInfo } from "../Data/productListSpring";
import { getCategorieInfo } from "../api/categoryApi";

// ─── Types ───────────────────────────────────────────────────────────────────

// type Category = "All" | "Audio" | "Peripherals" | "Accessories";

interface PriceRange {
  min: string;
  max: string;
}

interface FilterState {
  categoryId: string | null; // null = "All"
  //price: PriceRange;
  stockStatus?: boolean | null; // optional, can be added later
}

interface ProductFiltersProps {
  // Called whenever the active filters change
  onChange?: (filters: FilterState) => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

// const CATEGORIES: Category[] = ["All", "Audio", "Peripherals", "Accessories"];

// const CATEGORY_COLORS: Record<Category, string> = {
//   All: "bg-slate-900 text-white",
//   Audio: "bg-violet-600 text-white",
//   Peripherals: "bg-teal-600 text-white",
//   Accessories: "bg-amber-500 text-white",
// };

// const CATEGORY_DOT: Record<Category, string> = {
//   All: "bg-slate-400",
//   Audio: "bg-violet-400",
//   Peripherals: "bg-teal-400",
//   Accessories: "bg-amber-400",
// };

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-3">
      {children}
    </span>
  );
}

function Divider() {
  return <hr className="border-slate-100 my-5" />;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SideFilter({ onChange }: ProductFiltersProps) {
  const [categories, setCategories] = useState<CategoryInfo[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [price, setPrice] = useState<PriceRange>({ min: "", max: "" }); //default value
  const [stockStatus, setStockStatus] = useState<boolean | null>(null); //default value

  useEffect(() => {
    getCategorieInfo()
      .then(setCategories)
      .catch((error) => console.error("Error in fecthing the categories: ", error));

    // ****this is old way of doing Promise(async and await) calls***
    // async function fetchCategories() {
    //   try {
    //     const data = await getCategorieInfo();
    //     setCategories(data);
    //   } catch (error){
    //     console.error("Error in fecthing the categories: ", error);
    //   }
    // } 
  }, []); //fetch categories from backend and setCategories; []=> run once on mount

  function handleCategoryChange(catId: string | null) {
    setActiveCategoryId(catId);
    onChange?.({ categoryId: catId, /*price,*/ stockStatus });
  }

  function handleStockStatusChange(status: boolean | null) {
    const updatedStatus = stockStatus === status ? null : status; // toggle logic
    setStockStatus(updatedStatus);
    onChange?.({ categoryId: activeCategoryId, /*price,*/ stockStatus: updatedStatus });
  }

  // function handlePriceChange(field: keyof PriceRange, value: string) { //keyof PriceRange  // = "min" | "max"
  //   const updated = { ...price, [field]: value };
  //   setPrice(updated);
  //   onChange?.({ categoryId: activeCategoryId, price: updated, stockStatus: stockStatus }); // pass the updated
  // }

  function handleClear() {
    setActiveCategoryId(null);
    setPrice({ min: "", max: "" });
    setStockStatus(null);
    onChange?.({ categoryId: null, /*price: { min: "", max: "" },*/ stockStatus: null }); 
    // Here, we are not passing the useState variables as those get updated asynchronously, so they might have old values when onChange is called. Instead, we directly pass the cleared values.
  }

  // if ANY of these is true → hasActiveFilters = true → show "Clear all"
  const hasActiveFilters = activeCategoryId !== null || price.min !== "" || price.max !== "" || stockStatus !== null;


  //It prepends the hardcoded "All" option to the dynamic list from the API, so you get one unified array to .map() over
  const totalCount = categories.reduce((sum, cat) => sum + cat.totalCount, 0);
  const inStockCount = categories.reduce((sum, cat) => sum + cat.inStockCount, 0);
  const outOfStockCount = categories.reduce((sum, cat) => sum + cat.outOfStockCount, 0);
  
  const allCategories: CategoryInfo[] = [
    { categoryId: null, categoryName: "All", totalCount: totalCount, inStockCount: inStockCount, outOfStockCount: outOfStockCount }, ...categories
  ];



  return (
    <aside className="w-full   p-5 shadow-sm select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-[15px] font-semibold text-slate-900 tracking-tight">
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={handleClear}
            className="text-[11px] text-slate-400 hover:text-slate-700 transition-colors font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Category */}
      <div>
        <SectionLabel>Category</SectionLabel>
        <ul className="space-y-1">
          {allCategories.map((cat) => {
            const isActive = activeCategoryId === cat.categoryId;
            return (
              //Nullish Coalescing=> ??
              // if cat.categoryId is null or undefined → use "all"
              // otherwise → use cat.categoryId
              <li key={cat.categoryId ?? "All"}> 
                <button
                  onClick={() => handleCategoryChange(cat.categoryId)}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-150 text-left
                    ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                > 
                
                <span className="flex-1">{cat.categoryName}</span>

                {"totalCount" in cat && (  // 👈 only show badge for real categories, not "All"
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {cat.totalCount}
                  </span>
                )}
                
                {isActive && <CheckIcon />}
                
                </button>
              
              </li>
            );
          })}
        </ul>
      </div>

      <Divider />

      {/* Stock Status */}
      <div>
        <SectionLabel>Stock Status</SectionLabel>
        <ul className="space-y-1">
          <li> 
            <button
            onClick={() => handleStockStatusChange(true)}
            className={`
                    w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-150 text-left
                    ${
                      stockStatus === true
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0 bg-emerald-400" />
              <span className="flex-1">In stock</span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                stockStatus === true ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
              }`}>
                {inStockCount}
              </span>
              {stockStatus === true && <CheckIcon />}
            </button>
          </li>

          <li> 
            <button
            onClick={() => handleStockStatusChange(false)}
            className={`
                    w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-150 text-left
                    ${
                      stockStatus === false
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0 bg-emerald-400" />
              <span className="flex-1">Out of stock</span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full 
              ${
                stockStatus === false 
                ? "bg-white/20 text-white" 
                : "bg-slate-100 text-slate-500"
              }`}
              >
                {outOfStockCount}
              </span>
              {stockStatus === false && <CheckIcon />}
            </button>
          </li>

        </ul>
      </div>


      {/* Price Range */}
      {/* <div>
        <SectionLabel>Price range</SectionLabel>
        <div className="space-y-2">
          <PriceInput
            placeholder="Min"
            value={price.min}
            onChange={(v) => handlePriceChange("min", v)}
          />
          <PriceInput
            placeholder="Max"
            value={price.max}
            onChange={(v) => handlePriceChange("max", v)}
          />
        </div>
      </div> */}

      <Divider />

      {/* Apply */}
      {/* Button to apply features */}
    </aside>
  );
}

// ─── Price Input ──────────────────────────────────────────────────────────────

interface PriceInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function PriceInput({ placeholder, value, onChange }: PriceInputProps) {
  return (
    <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus-within:border-slate-400 focus-within:bg-white transition-colors">
      <span className="text-slate-400 text-sm">₹</span>
      <input
        type="number"
        min={0}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          flex-1 bg-transparent border-none outline-none
          text-sm text-slate-800 placeholder:text-slate-400
          [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none
        "
      />
    </div>
  );
}

// ─── Rating Selector ──────────────────────────────────────────────────────────

function RatingSelector() {
  const [selected, setSelected] = useState<number | null>(null);
  const options = [4, 3, 2, 1];

  return (
    <div className="space-y-1">
      {options.map((stars) => (
        <button
          key={stars}
          onClick={() => setSelected(selected === stars ? null : stars)}
          className={`
            w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm
            transition-all duration-150
            ${
              selected === stars
                ? "bg-amber-50 border border-amber-200 text-amber-800"
                : "hover:bg-slate-50 text-slate-600"
            }
          `}
        >
          <Stars count={stars} />
          <span className="text-xs font-medium">& up</span>
        </button>
      ))}
    </div>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          className={`w-3.5 h-3.5 ${i < count ? "fill-amber-400" : "fill-slate-200"}`}
        >
          <path d="M8 1l1.854 3.756L14 5.528l-3 2.924.708 4.131L8 10.5l-3.708 2.083L5 8.452 2 5.528l4.146-.772z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Check Icon ───────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="w-3.5 h-3.5 fill-none stroke-current stroke-2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 8 6.5 11.5 13 5" />
    </svg>
  );
}