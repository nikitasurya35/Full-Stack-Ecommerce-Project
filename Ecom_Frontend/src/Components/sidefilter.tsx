//"use client";

import { useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = "All" | "Audio" | "Peripherals" | "Accessories";

interface PriceRange {
  min: string;
  max: string;
}

interface FilterState {
  category: Category;
  price: PriceRange;
}

interface ProductFiltersProps {
  /** Called whenever the active filters change */
  onChange?: (filters: FilterState) => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = ["All", "Audio", "Peripherals", "Accessories"];

const CATEGORY_COLORS: Record<Category, string> = {
  All: "bg-slate-900 text-white",
  Audio: "bg-violet-600 text-white",
  Peripherals: "bg-teal-600 text-white",
  Accessories: "bg-amber-500 text-white",
};

const CATEGORY_DOT: Record<Category, string> = {
  All: "bg-slate-400",
  Audio: "bg-violet-400",
  Peripherals: "bg-teal-400",
  Accessories: "bg-amber-400",
};

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
  const [activeCategory, setActiveCategory] = useState<Category>("All"); //default value
  const [price, setPrice] = useState<PriceRange>({ min: "", max: "" }); //default value

  function handleCategoryChange(cat: Category) {
    setActiveCategory(cat);
    onChange?.({ category: cat, price });
  }

  function handlePriceChange(field: keyof PriceRange, value: string) {
    const updated = { ...price, [field]: value };
    setPrice(updated);
    onChange?.({ category: activeCategory, price: updated });
  }

  function handleClear() {
    setActiveCategory("All");
    setPrice({ min: "", max: "" });
    onChange?.({ category: "All", price: { min: "", max: "" } });
  }

  const hasActiveFilters = activeCategory !== "All" || price.min !== "" || price.max !== "";

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
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <li key={cat}>
                <button
                  onClick={() => handleCategoryChange(cat)}
                  className={`
                    w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium
                    transition-all duration-150 text-left
                    ${
                      isActive
                        ? `${CATEGORY_COLORS[cat]} shadow-sm`
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <span
                    className={`
                      w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors
                      ${isActive ? "bg-white opacity-70" : CATEGORY_DOT[cat]}
                    `}
                  />
                  {cat}
                  {isActive && (
                    <span className="ml-auto">
                      <CheckIcon />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <Divider />

      {/* Price Range */}
      <div>
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
      </div>

      <Divider />

      {/* Rating (static UI, extend as needed) */}
      {/* <div>
        <SectionLabel>Min rating</SectionLabel>
        <RatingSelector />
      </div> */}

      {/* Apply CTA */}
      <button
        className="
          mt-5 w-full py-2.5 rounded-xl text-sm font-semibold
          bg-slate-900 text-white hover:bg-slate-700
          active:scale-[0.98] transition-all duration-150
          shadow-sm
        "
        onClick={() => onChange?.({ category: activeCategory, price })}
      >
        Apply filters
      </button>
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