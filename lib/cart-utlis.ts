import type { Product } from "@/data/products";

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDelivery: string;
}

export const shippingOptions: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 4.99,
    estimatedDelivery: "3-5 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 9.99,
    estimatedDelivery: "1-2 business days",
  },
  {
    id: "free",
    name: "Free Shipping",
    price: 0,
    estimatedDelivery: "5-7 business days",
  },
];

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
}

export function calculateTax(subtotal: number, taxRate = 0.08): number {
  return subtotal * taxRate;
}

export function calculateTotal(
  subtotal: number,
  tax: number,
  shippingCost: number,
  discount = 0,
): number {
  return subtotal + tax + shippingCost - discount;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function getDiscountAmount(code: string, subtotal: number): number {
  // Mock discount codes
  const discountCodes = {
    WELCOME10: { type: "percentage", value: 0.1 },
    SAVE20: { type: "percentage", value: 0.2 },
    FREESHIP: { type: "fixed", value: 10 },
    "50OFF": { type: "fixed", value: 50 },
  };

  const discount = discountCodes[code as keyof typeof discountCodes];

  if (!discount) return 0;

  if (discount.type === "percentage") {
    return subtotal * discount.value;
  } else {
    return Math.min(discount.value, subtotal); // Don't allow discount to exceed subtotal
  }
}

export function isValidPromoCode(code: string): boolean {
  const validCodes = ["WELCOME10", "SAVE20", "FREESHIP", "50OFF"];
  return validCodes.includes(code);
}
