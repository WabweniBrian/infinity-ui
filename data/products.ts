export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  hoverImage?: string;
  category: string;
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isOnSale?: boolean;
  isBestSeller?: boolean;
  isLimitedEdition?: boolean;
  discount?: number;
  stock: number;
  colors?: Array<{ name: string; value: string }>;
  sizes?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Desk Lamp",
    description: "A sleek, adjustable desk lamp with wireless charging base.",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 124,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Home Office",
    tags: ["lighting", "desk", "modern"],
    isNew: true,
    isOnSale: true,
    discount: 25,
    stock: 45,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#ffffff" },
      { name: "Silver", value: "#c0c0c0" },
    ],
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    description: "Fully adjustable premium office chair with lumbar support.",
    price: 349.99,
    rating: 4.9,
    reviewCount: 87,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Furniture",
    tags: ["chair", "office", "ergonomic"],
    isFeatured: true,
    isBestSeller: true,
    stock: 12,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Gray", value: "#808080" },
    ],
  },
  {
    id: "3",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with 30-hour battery life.",
    price: 249.99,
    originalPrice: 299.99,
    rating: 4.7,
    reviewCount: 215,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Electronics",
    tags: ["audio", "wireless", "headphones"],
    isOnSale: true,
    discount: 17,
    stock: 28,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "White", value: "#ffffff" },
      { name: "Blue", value: "#0000ff" },
    ],
  },
  {
    id: "4",
    name: "Smart Home Hub",
    description: "Control all your smart devices from one central hub.",
    price: 129.99,
    rating: 4.5,
    reviewCount: 63,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Smart Home",
    tags: ["smart home", "tech", "automation"],
    isNew: true,
    stock: 50,
  },
  {
    id: "5",
    name: "Ceramic Pour-Over Coffee Set",
    description: "Handcrafted ceramic coffee dripper with matching mug.",
    price: 59.99,
    rating: 4.6,
    reviewCount: 42,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Kitchen",
    tags: ["coffee", "ceramic", "handmade"],
    stock: 18,
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Black", value: "#000000" },
      { name: "Terracotta", value: "#e2725b" },
    ],
  },
  {
    id: "6",
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360° sound and 20-hour battery life.",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.4,
    reviewCount: 178,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Electronics",
    tags: ["audio", "bluetooth", "portable"],
    isOnSale: true,
    discount: 20,
    stock: 32,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Blue", value: "#0000ff" },
      { name: "Red", value: "#ff0000" },
    ],
  },
  {
    id: "7",
    name: "Minimalist Analog Watch",
    description: "Scandinavian-designed timepiece with Italian leather strap.",
    price: 189.99,
    rating: 4.9,
    reviewCount: 56,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Accessories",
    tags: ["watch", "analog", "minimalist"],
    isFeatured: true,
    isBestSeller: true,
    stock: 9,
    colors: [
      { name: "Brown", value: "#964b00" },
      { name: "Black", value: "#000000" },
    ],
  },
  {
    id: "8",
    name: "Organic Cotton Throw Blanket",
    description:
      "Soft, sustainably-made blanket in a modern geometric pattern.",
    price: 69.99,
    rating: 4.7,
    reviewCount: 31,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Home Decor",
    tags: ["blanket", "organic", "sustainable"],
    stock: 24,
    colors: [
      { name: "Gray", value: "#808080" },
      { name: "Beige", value: "#f5f5dc" },
      { name: "Blue", value: "#0000ff" },
    ],
  },
  {
    id: "9",
    name: "Premium Leather Backpack",
    description:
      "Handcrafted full-grain leather backpack with laptop compartment.",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.8,
    reviewCount: 42,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Accessories",
    tags: ["backpack", "leather", "travel"],
    isOnSale: true,
    discount: 20,
    stock: 15,
    colors: [
      { name: "Brown", value: "#964b00" },
      { name: "Black", value: "#000000" },
    ],
  },
  {
    id: "10",
    name: "Smart Fitness Tracker",
    description: "Advanced health monitoring with 7-day battery life.",
    price: 129.99,
    originalPrice: 149.99,
    rating: 4.6,
    reviewCount: 93,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Fitness",
    tags: ["fitness", "tech", "health"],
    isOnSale: true,
    discount: 13,
    stock: 38,
    colors: [
      { name: "Black", value: "#000000" },
      { name: "Blue", value: "#0000ff" },
      { name: "Pink", value: "#ffc0cb" },
    ],
  },
  {
    id: "11",
    name: "Artisanal Ceramic Vase",
    description: "Handmade ceramic vase with unique glazed finish.",
    price: 49.99,
    rating: 4.5,
    reviewCount: 28,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Home Decor",
    tags: ["vase", "ceramic", "handmade"],
    isNew: true,
    stock: 21,
    colors: [
      { name: "White", value: "#ffffff" },
      { name: "Blue", value: "#0000ff" },
      { name: "Green", value: "#008000" },
    ],
  },
  {
    id: "12",
    name: "Limited Edition Sneakers",
    description: "Exclusive designer collaboration with premium materials.",
    price: 199.99,
    rating: 4.9,
    reviewCount: 17,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    hoverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "Footwear",
    tags: ["sneakers", "limited", "designer"],
    isLimitedEdition: true,
    stock: 5,
    sizes: ["7", "8", "9", "10", "11"],
  },
];
