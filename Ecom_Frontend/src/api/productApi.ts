import axios from "axios";
import type { Product } from "../Data/productListSpring"; //When importing insterface: always add 'type' before it

const API = axios.create({
  //baseURL: "http://localhost:4000",
  baseURL: import.meta.env.VITE_API_URL,
});

export const getProducts = async (params?: {
  categoryId?: string[];
  productId?: string;
  stockStatus?: boolean;
  sortBy?: string;
}): Promise<Product[]> => {
  const response = await API.get("/api/products/homeapp", { params });
  console.log("API params:", params); // Log the API params for debugging
  console.log("Products Data:", response.data.products); // Log the products data specifically
  return response.data.products;
};