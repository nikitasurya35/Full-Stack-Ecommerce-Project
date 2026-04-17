export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  tag?: "HOT" | "NEW";
}

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    category: "Audio",
    price: 849,
    rating: 4.5,
    tag: "HOT",
  },
  {
    id: 2,
    name: "Mechanical Keyboard TKL",
    category: "Peripherals",
    price: 8500,
    rating: 4.2,
    tag: "NEW",
  },
  {
    id: 3,
    name: "USB-C Hub 7-in-1",
    category: "Accessories",
    price: 799,
    rating: 4.3,
  },
];