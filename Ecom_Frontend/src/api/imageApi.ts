import type { ProductImage } from "../Data/image";
import type { ProductSlug } from "../Data/slug";
import axios from "axios";

// const BASE = import.meta.env.VITE_API_URL;
const API = axios.create({
  //baseURL: "http://localhost:4000",
  baseURL: import.meta.env.VITE_API_URL,
});

export const imageApi = {
  // upload: async (file: File, productId: string): Promise<ProductImage> => {
  //   const form = new FormData();
  //   form.append('file', file);
  //   // form.append('productSlug', productSlug);
  //   form.append('productId', productId);
  //   const res = await fetch(`${BASE}/api/images/upload`, { method: 'POST', body: form });
  //   if (!res.ok) throw new Error(await res.text());
  //   return res.json();
  // },

  upload: async (file: File,productId: string): Promise<ProductImage> => {
    const form = new FormData();
    form.append('file', file);
    form.append('productId', productId);
    const res = await API.post("/api/images/upload", form);
    return res.data;
  },

  getProductSlugs: async (): Promise<ProductSlug[]> => {
    const res = await API.get("/api/images/slugs");
    console.log("Request URL:", res.config.url);
    return res.data;
  },

  deleteImage: async (productId: string): Promise<void> => {
    const res = await API.delete(`/api/images/delete/${productId}`);
    return res.data;
  },

  getImageValues: async (productId: string): Promise<ProductImage[]> => {
    const response = await API.get(`/api/images/product/${productId}`);
    console.log("Request URL:", response.config.url);
    console.log("Status:", response.status);
    console.log("Content-Type:", response.headers["content-type"]);
    console.log("Data:", response.data);
    return response.data;
  },


};