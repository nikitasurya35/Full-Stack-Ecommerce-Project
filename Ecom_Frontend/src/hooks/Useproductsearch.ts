import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../api/productApi";
import type { suggestion } from "../Data/suggestion";

export const useProductSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch suggestions with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    //setTimeout(callback(function), delay in ms) - This means that the callback function will be executed after a delay of 300 milliseconds. If the query changes again within that time, the previous timeout will be cleared and a new one will be set, effectively debouncing the API calls.
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await getProducts.getProductNames({ keyword: query.trim() });
        setSuggestions(results);
        setShowDropdown(results.length > 0);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300); 

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Close dropdown on outside click - check if the user clicks outside the search component (using wrapperRef) and if so, close the dropdown by setting showDropdown to false.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler); 
    //'mousedown'(instead of 'click' eventtype)-fires immediately when the mouse button is pressed, before the click is fully completed.
    // listener/callback function (handler) that runs when the event occurs.
    return () => document.removeEventListener("mousedown", handler); 
    //A cleanup function that removes the event listener when the component unmounts or when the effect is re-run. This prevents memory leaks and ensures that the event listener doesn't persist after the component is gone.
  }, []);

  const commitSearch = (keyword: string) => {
    if (!keyword.trim()) return;
    setShowDropdown(false);
    navigate(`/home?keyword=${encodeURIComponent(keyword.trim())}`);
  };

  const handleSuggestionClick = (name: string) => {
    setQuery(name);
    commitSearch(name);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commitSearch(query);
    if (e.key === "Escape") setShowDropdown(false);
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowDropdown(false);
    navigate("/home");
  };

  return {
    query,
    setQuery,
    suggestions,
    showDropdown,
    setShowDropdown,
    loading,
    wrapperRef,
    commitSearch,
    handleSuggestionClick,
    handleKeyDown,
    clearSearch,
  };
};