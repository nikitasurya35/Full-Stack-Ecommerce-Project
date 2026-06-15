import axios from "axios";
import type { HomePageResponse } from "../Data/productListSpring"; //When importing insterface: always add 'type' before it
import type { suggestion } from "../Data/suggestion";

const API = axios.create({
  //baseURL: "http://localhost:4000",
  baseURL: import.meta.env.VITE_API_URL,
});


export const getProducts = {
  
  getListOfProducts: async (params?: {
  categoryId?: string[];
  productId?: string;
  stockStatus?: boolean;
  sortBy?: string;
  page?: number;
  size?: number;
  keyword?: string;
  }): Promise<HomePageResponse> => {
  const response = await API.get("/api/products/homeapp", { params });
  console.log("API params:", params); // Log the API params for debugging
  console.log("Products Data:", response.data); // Log the entire response data for debugging
  return response.data; // Assuming the API returns the paginated response directly
  },

  getProductNames: async (params?: {keyword?: string;}): Promise<suggestion[]> => {
    console.log("API params for namesss:", params); // Log the API params for debugging
    const response = await API.get("api/products/suggestions", {params});
    console.log("Products Data:", response.data); 
    return response.data;
  },

};

// export const getProducts = async (params?: {
//   categoryId?: string[];
//   productId?: string;
//   stockStatus?: boolean;
//   sortBy?: string;
// }): Promise<Product[]> => {
//   const response = await API.get("/api/products/homeapp", { params });
//   console.log("API params:", params); // Log the API params for debugging
//   console.log("Products Data:", response.data.products); // Log the products data specifically
//   return response.data.products;
// };