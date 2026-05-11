export interface Product {
  id: number;
  productName: string;
  categoryName: string;
  categoryId: string | null; // null represents "All" category
  price: number;
  comparePrice: number;
  availableStock: number;
  createdAt: string;
  status: string | null; // "In Stock", "Out of Stock", or null for unknown
  productImageUrl: string;
  rating: 4;
  reviewCount: 128;
  description:
    "Professional-grade studio monitors engineered for flat frequency response and accurate sound reproduction. Ideal for music production, mixing, and critical listening.";
  highlights: [
    "50W bi-amplified power per speaker",
    "5-inch woofer + 1-inch tweeter",
    "Frequency response: 47Hz – 20kHz",
    "Balanced XLR & unbalanced RCA inputs",
    "Acoustic space & HF controls",
  ];
  images: ["📦", "🔊", "🎵"];
  tag?: "HOT" | "NEW";
}

export interface CategoryInfo {
  categoryName: string;
  categoryId: string | null; // null represents "All" category;
  totalCount: number;
  inStockCount: number;
  outOfStockCount: number;
}