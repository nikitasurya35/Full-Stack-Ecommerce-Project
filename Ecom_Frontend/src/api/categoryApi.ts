import axios from "axios";
import type { CategoryInfo } from "../Data/productListSpring"; //When importing insterface: always add 'type' before it

const API = axios.create({
  //baseURL: "http://localhost:4000",
  baseURL: import.meta.env.VITE_API_URL,
});

export const getCategorieInfo = async (): Promise<CategoryInfo[]> => {
  const response = await API.get("/api/products/categories");
  return response.data;
};