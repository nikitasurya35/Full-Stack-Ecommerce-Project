import { NavLink } from "react-router-dom";
import { Heart } from 'lucide-react';
import { ShoppingCart } from "lucide-react";
import { User } from "lucide-react";
import { Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-8 py-4 bg-white shadow">
      <div className="flex items-center gap-6">
        <h1 className="font-bold text-lg">StockFlow</h1>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
            {[
                { label: "Shop", path: "/home" },
                { label: "Checkout", path: "/checkout" },
                { label: "Order placed", path: "/orderhistory" },
                { label: "My orders", path: "/orders" },
            ].map((item) => (
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

        <div className="flex items-center gap-4">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-72">
                <button><Search className="w-4 h-4 text-gray-500 mr-2" /></button>
                <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent outline-none text-sm w-full"
                />
            </div>
        </div>

        <div className="flex items-center gap-4">
            <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 shadow-sm">
                <Heart className="w-3 h-3 text-gray-600" />
            </button>

            <button className=" p-2 rounded-full border border-gray-200 hover:bg-gray-100 shadow-sm">
               <ShoppingCart className="w-3 h-3 text-gray-600" />
            </button>
            <button className=" p-2 bg-black rounded-full border border-gray-200 hover:bg-gray-700 shadow-sm">
               <User className="w-3 h-3 text-white" />
            </button>
        </div>
    </div>
  );
};

export default Navbar;