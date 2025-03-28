// User Profile Types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: BeautyPreferences;
  savedProducts: string[];
  recentSearches: string[];
  skinJournal: SkinJournalEntry[];
}

export interface BeautyPreferences {
  skinType: SkinType;
  skinConcerns: SkinConcern[];
  beautyGoals: BeautyGoal[];
  allergies: string[];
  preferredBrands?: string[];
  priceRange?: PriceRange;
  ingredients?: {
    preferred: string[];
    avoided: string[];
  };
}

export interface SkinJournalEntry {
  id: string;
  date: string;
  image?: string;
  notes: string;
  concerns: SkinConcern[];
  productsUsed: string[];
  mood: "great" | "good" | "okay" | "bad";
}

export type SkinType = "dry" | "oily" | "combination" | "normal" | "sensitive";

export type SkinConcern =
  | "acne"
  | "aging"
  | "dullness"
  | "hyperpigmentation"
  | "redness"
  | "dryness"
  | "oiliness"
  | "pores"
  | "texture"
  | "dark circles";

export type BeautyGoal =
  | "anti-aging"
  | "brightening"
  | "hydration"
  | "acne treatment"
  | "pore minimizing"
  | "evening skin tone"
  | "firming"
  | "sun protection"
  | "natural look"
  | "bold look";

export type PriceRange = "budget" | "mid-range" | "luxury";

// Product Types
export interface BeautyProduct {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory?: string;
  description: string;
  price: number;
  currency: string;
  size: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  ingredients: string[];
  benefits: string[];
  suitableFor: SkinType[];
  addressesConcerns: SkinConcern[];
  howToUse: string;
  tags: string[];
  inStock: boolean;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  sustainabilityScore?: number;
  crueltyFree: boolean;
  vegan?: boolean;
}

export type ProductCategory =
  | "skincare"
  | "makeup"
  | "haircare"
  | "fragrance"
  | "tools"
  | "bath & body"
  | "wellness";

// AI Recommendation Types
export interface AIRecommendation {
  id: string;
  userId: string;
  products: RecommendedProduct[];
  routine?: BeautyRoutine;
  reasonForRecommendation: string;
  createdAt: string;
  basedOn: {
    preferences?: boolean;
    skinJournal?: boolean;
    uploadedImage?: boolean;
    chatQuery?: boolean;
  };
}

export interface RecommendedProduct extends BeautyProduct {
  matchScore: number;
  reasonForRecommendation: string;
  alternativeProducts?: string[];
}

export interface BeautyRoutine {
  name: string;
  description: string;
  timeOfDay: "morning" | "evening" | "anytime";
  steps: RoutineStep[];
}

export interface RoutineStep {
  order: number;
  productId: string;
  instruction: string;
  duration?: string;
  optional?: boolean;
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  attachments?: ChatAttachment[];
  productSuggestions?: BeautyProduct[];
  routineSuggestion?: BeautyRoutine;
}

export interface ChatAttachment {
  id: string;
  type: "image" | "video" | "document";
  url: string;
  thumbnailUrl?: string;
  name: string;
  size: number;
  analysis?: ImageAnalysis;
}

export interface ImageAnalysis {
  skinConcerns: SkinConcern[];
  detectedConditions: string[];
  skinType?: SkinType;
  confidence: number;
}

// Sample Data
export const sampleSkinTypes: SkinType[] = [
  "dry",
  "oily",
  "combination",
  "normal",
  "sensitive",
];

export const sampleSkinConcerns: SkinConcern[] = [
  "acne",
  "aging",
  "dullness",
  "hyperpigmentation",
  "redness",
  "dryness",
  "oiliness",
  "pores",
  "texture",
  "dark circles",
];

export const sampleBeautyGoals: BeautyGoal[] = [
  "anti-aging",
  "brightening",
  "hydration",
  "acne treatment",
  "pore minimizing",
  "evening skin tone",
  "firming",
  "sun protection",
  "natural look",
  "bold look",
];

export const sampleProducts: BeautyProduct[] = [
  {
    id: "prod-001",
    name: "Hydrating Serum",
    brand: "Glow Essentials",
    category: "skincare",
    subCategory: "serums",
    description:
      "A deeply hydrating serum with hyaluronic acid to plump and moisturize skin.",
    price: 48,
    currency: "$",
    size: "30ml",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    rating: 4.7,
    reviewCount: 1243,
    ingredients: [
      "Hyaluronic Acid",
      "Glycerin",
      "Niacinamide",
      "Panthenol",
      "Aloe Vera",
    ],
    benefits: ["Hydration", "Plumping", "Smoothing"],
    suitableFor: ["dry", "normal", "combination", "sensitive"],
    addressesConcerns: ["dryness", "dullness", "aging"],
    howToUse:
      "Apply 2-3 drops to clean, damp skin morning and evening before moisturizer.",
    tags: ["hydrating", "plumping", "essential"],
    inStock: true,
    featured: true,
    crueltyFree: true,
    vegan: true,
    sustainabilityScore: 8,
  },
  {
    id: "prod-002",
    name: "Vitamin C Brightening Cream",
    brand: "Radiance",
    category: "skincare",
    subCategory: "moisturizers",
    description:
      "Brightening cream with 15% vitamin C to even skin tone and boost radiance.",
    price: 65,
    currency: "$",
    size: "50ml",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    rating: 4.5,
    reviewCount: 856,
    ingredients: [
      "Vitamin C (15%)",
      "Vitamin E",
      "Ferulic Acid",
      "Squalane",
      "Shea Butter",
    ],
    benefits: ["Brightening", "Antioxidant Protection", "Even Skin Tone"],
    suitableFor: ["normal", "combination", "oily"],
    addressesConcerns: ["dullness", "hyperpigmentation", "aging"],
    howToUse:
      "Apply a small amount to face and neck every morning after serum.",
    tags: ["brightening", "antioxidant", "vitamin c"],
    inStock: true,
    bestSeller: true,
    crueltyFree: true,
    vegan: false,
  },
  {
    id: "prod-003",
    name: "Gentle Exfoliating Toner",
    brand: "Pure Beauty",
    category: "skincare",
    subCategory: "toners",
    description:
      "Gentle exfoliating toner with BHA and PHA to unclog pores and smooth skin texture.",
    price: 32,
    currency: "$",
    size: "200ml",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    rating: 4.6,
    reviewCount: 723,
    ingredients: [
      "Salicylic Acid",
      "Gluconolactone",
      "Aloe Vera",
      "Centella Asiatica",
      "Green Tea",
    ],
    benefits: ["Exfoliation", "Pore Cleansing", "Texture Improvement"],
    suitableFor: ["oily", "combination", "normal"],
    addressesConcerns: ["acne", "pores", "texture", "oiliness"],
    howToUse:
      "Apply to clean skin with a cotton pad, avoiding the eye area. Use 2-3 times per week.",
    tags: ["exfoliating", "pore-clearing", "toner"],
    inStock: true,
    crueltyFree: true,
    vegan: true,
  },
  {
    id: "prod-004",
    name: "Dewy Finish Foundation",
    brand: "Luminous",
    category: "makeup",
    subCategory: "foundation",
    description:
      "Lightweight, buildable foundation that creates a natural, dewy finish while hydrating skin.",
    price: 42,
    currency: "$",
    size: "30ml",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    rating: 4.4,
    reviewCount: 1089,
    ingredients: [
      "Water",
      "Dimethicone",
      "Glycerin",
      "Niacinamide",
      "Hyaluronic Acid",
    ],
    benefits: ["Medium Coverage", "Dewy Finish", "Hydration"],
    suitableFor: ["dry", "normal", "combination"],
    addressesConcerns: ["dullness", "dryness", "redness"],
    howToUse: "Apply with fingers, brush, or sponge. Build coverage as needed.",
    tags: ["foundation", "dewy", "hydrating"],
    inStock: true,
    newArrival: true,
    crueltyFree: true,
    vegan: true,
  },
  {
    id: "prod-005",
    name: "Overnight Repair Mask",
    brand: "Glow Essentials",
    category: "skincare",
    subCategory: "masks",
    description:
      "Intensive overnight mask that repairs and rejuvenates skin while you sleep.",
    price: 55,
    currency: "$",
    size: "75ml",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    rating: 4.8,
    reviewCount: 645,
    ingredients: [
      "Retinol",
      "Peptides",
      "Ceramides",
      "Squalane",
      "Niacinamide",
    ],
    benefits: ["Repair", "Rejuvenation", "Hydration"],
    suitableFor: ["dry", "normal", "combination", "sensitive"],
    addressesConcerns: ["aging", "dryness", "dullness", "texture"],
    howToUse:
      "Apply a generous layer as the final step in your evening routine 2-3 times per week.",
    tags: ["overnight", "repair", "anti-aging"],
    inStock: true,
    bestSeller: true,
    crueltyFree: true,
    vegan: false,
  },
];

export const sampleUserProfile: UserProfile = {
  id: "user-001",
  name: "Emma Johnson",
  email: "emma.johnson@example.com",
  avatar:
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  preferences: {
    skinType: "combination",
    skinConcerns: ["dullness", "pores", "aging"],
    beautyGoals: ["brightening", "anti-aging", "natural look"],
    allergies: ["Fragrance", "Lanolin"],
    preferredBrands: ["Glow Essentials", "Radiance", "Pure Beauty"],
    priceRange: "mid-range",
    ingredients: {
      preferred: ["Hyaluronic Acid", "Vitamin C", "Niacinamide"],
      avoided: ["Parabens", "Sulfates", "Synthetic Fragrance"],
    },
  },
  savedProducts: ["prod-001", "prod-005"],
  recentSearches: ["vitamin c serum", "gentle cleanser", "spf 50"],
  skinJournal: [
    {
      id: "journal-001",
      date: "2023-04-10T08:30:00Z",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      notes:
        "Skin feeling dehydrated today, noticing some redness around nose.",
      concerns: ["dryness", "redness"],
      productsUsed: ["prod-001", "prod-002"],
      mood: "okay",
    },
  ],
};

export const sampleChatMessages: ChatMessage[] = [
  {
    id: "msg-001",
    role: "system",
    content: "Welcome to your AI Beauty Assistant! How can I help you today?",
    timestamp: "2023-04-10T10:00:00Z",
  },
  {
    id: "msg-002",
    role: "user",
    content:
      "I need help finding a good moisturizer for combination skin that won't make my T-zone oily.",
    timestamp: "2023-04-10T10:01:30Z",
  },
  {
    id: "msg-003",
    role: "assistant",
    content:
      "Based on your combination skin type, I recommend looking for a lightweight, oil-free gel moisturizer. These formulas provide hydration without adding excess oil to your T-zone. Here are some options that would work well for you:",
    timestamp: "2023-04-10T10:01:45Z",
    productSuggestions: [sampleProducts[1], sampleProducts[4]],
  },
];

export const skinConcernsData = [
  { name: "Dryness", value: 35 },
  { name: "Acne", value: 25 },
  { name: "Aging", value: 20 },
  { name: "Hyperpigmentation", value: 10 },
  { name: "Other", value: 10 },
];

export const COLORS = ["#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d"];

export const skinProgressData = [
  { month: "Jan", hydration: 40, texture: 30 },
  { month: "Feb", hydration: 45, texture: 35 },
  { month: "Mar", hydration: 55, texture: 40 },
  { month: "Apr", hydration: 60, texture: 50 },
  { month: "May", hydration: 75, texture: 65 },
];

export const routineConsistencyData = [
  { day: "Mon", percentage: 85 },
  { day: "Tue", percentage: 90 },
  { day: "Wed", percentage: 75 },
  { day: "Thu", percentage: 95 },
  { day: "Fri", percentage: 80 },
  { day: "Sat", percentage: 70 },
  { day: "Sun", percentage: 65 },
];
