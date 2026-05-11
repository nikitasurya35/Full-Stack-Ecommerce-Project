import axios from "axios";
import type { CategoryInfo } from "../Data/productListSpring"; //When importing insterface: always add 'type' before it

const API = axios.create({
  baseURL: "http://localhost:4000",
});

export const getCategorieInfo = async (): Promise<CategoryInfo[]> => {
  const response = await API.get("/categories");
  return response.data;
};