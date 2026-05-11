import axios from "axios";
import type { Product } from "../Data/productListSpring"; //When importing insterface: always add 'type' before it

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export const getProducts = async (params?: {
  categoryId?: string[];
  productId?: number;
  status?: boolean;
  sortBy?: string;
}): Promise<Product[]> => {
  const response = await API.get("/homeapp", { params });
  return response.data.products;
};