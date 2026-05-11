import axios from "axios";
import type { Product } from "../Data/productListSpring"; //When importing insterface: always add 'type' before it

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export const getProducts = async (params?: {
  categoryId?: string[];
  productId?: number;
  stockStatus?: boolean;
  sortBy?: string;
}): Promise<Product[]> => {
  const response = await API.get("/homeapp", { params });
  console.log("API params:", params); // Log the API params for debugging
  console.log("Products Data:", response.data.products); // Log the products data specifically
  return response.data.products;
};