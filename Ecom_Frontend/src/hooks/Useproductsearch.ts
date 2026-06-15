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
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await getProducts.getProductNames({ keyword: query.trim() });
        setSuggestions(results);
        setShowDropdown(results.length > 0);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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