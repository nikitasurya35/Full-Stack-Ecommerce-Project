import { NavLink } from "react-router-dom";
import { Heart, ShoppingCart, User, Search, X } from "lucide-react";
import { useProductSearch } from "../hooks/Useproductsearch";

const NAV_LINKS = [
  { label: "Shop",         path: "/home" },
  { label: "Checkout",     path: "/checkout" },
  { label: "Order placed", path: "/orderhistory" },
  { label: "My orders",    path: "/orders" },
];

const Navbar = () => {
  const {
    query, setQuery,
    suggestions, showDropdown, setShowDropdown,
    loading, wrapperRef,
    commitSearch, handleSuggestionClick, handleKeyDown, clearSearch,
  } = useProductSearch();

  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow">

      {/* LEFT: Logo + Nav */}
      <div className="flex items-center gap-6">
        <h1 className="font-bold text-lg">StockFlow</h1>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-white text-black shadow-sm"
                    : "text-gray-500 hover:text-black hover:bg-gray-200"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* CENTER: Search */}
      <div ref={wrapperRef} className="relative">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-72">
          <button onClick={() => commitSearch(query)}>
            <Search className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
          </button>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
            placeholder="Search products..."
            className="bg-transparent outline-none text-sm w-full"
          />
          {query && (
            <button onClick={clearSearch}>
              <X className="w-3.5 h-3.5 text-gray-400 ml-1 hover:text-gray-600 flex-shrink-0" />
            </button>
          )}
        </div>

        {/* Suggestions dropdown */}
        {showDropdown && (
          <ul className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
            {loading ? (
              <li className="px-4 py-3 text-sm text-gray-400">Searching...</li>
            ) : (
              suggestions.map((s) => (
                <li
                  key={s.productId}
                  onMouseDown={() => handleSuggestionClick(s.productName)} // Use onMouseDown to ensure it fires before input blur
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <Search className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  {s.productName}
                </li>
              ))
            )}
          </ul>
        )}
      </div>

      {/* RIGHT: Actions */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 shadow-sm">
          <Heart className="w-3 h-3 text-gray-600" />
        </button>
        <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 shadow-sm">
          <ShoppingCart className="w-3 h-3 text-gray-600" />
        </button>
        <button className="p-2 bg-black rounded-full border border-gray-200 hover:bg-gray-700 shadow-sm">
          <User className="w-3 h-3 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;