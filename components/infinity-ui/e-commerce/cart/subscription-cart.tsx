"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Calendar,
  RefreshCw,
  Clock,
  ArrowLeft,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Product } from "@/data/products";
import {
  type CartItem,
  calculateTax,
  calculateTotal,
  formatCurrency,
} from "@/lib/cart-utlis";

interface SubscriptionCartProps {
  products?: Product[];
  onClose?: () => void;
}

type SubscriptionFrequency = "one-time" | "weekly" | "biweekly" | "monthly";

interface SubscriptionOption {
  id: SubscriptionFrequency;
  label: string;
  discount: number;
  description: string;
}

const subscriptionOptions: SubscriptionOption[] = [
  {
    id: "one-time",
    label: "One-time purchase",
    discount: 0,
    description: "No recurring deliveries",
  },
  {
    id: "weekly",
    label: "Weekly",
    discount: 15,
    description: "Delivered every week",
  },
  {
    id: "biweekly",
    label: "Every 2 weeks",
    discount: 10,
    description: "Delivered every two weeks",
  },
  {
    id: "monthly",
    label: "Monthly",
    discount: 5,
    description: "Delivered once a month",
  },
];

const SubscriptionCart = ({
  products = [],
  onClose,
}: SubscriptionCartProps) => {
  // Mock cart items using the provided products
  const [cartItems, setCartItems] = useState<CartItem[]>(
    products.slice(0, 3).map((product) => ({
      id: product.id,
      product,
      quantity: 1,
      selectedColor: product.colors?.[0]?.value,
      selectedSize: product.sizes?.[0],
    })),
  );

  const [subscriptionFrequencies, setSubscriptionFrequencies] = useState<
    Record<string, SubscriptionFrequency>
  >(Object.fromEntries(cartItems.map((item) => [item.id, "one-time"])));

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
    Object.fromEntries(cartItems.map((item) => [item.id, false])),
  );

  // Calculate cart totals with subscription discounts
  const calculateItemPrice = (item: CartItem) => {
    const basePrice = item.product.price * item.quantity;
    const frequency = subscriptionFrequencies[item.id];
    const option = subscriptionOptions.find((opt) => opt.id === frequency);
    return option ? basePrice * (1 - option.discount / 100) : basePrice;
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + calculateItemPrice(item),
    0,
  );
  const tax = calculateTax(subtotal);
  const total = calculateTotal(subtotal, tax, 0);

  // Handle quantity changes
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // Remove item from cart
  const removeItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));

    // Also remove from subscription frequencies
    setSubscriptionFrequencies((prev) => {
      const newFrequencies = { ...prev };
      delete newFrequencies[itemId];
      return newFrequencies;
    });

    // Also remove from expanded items
    setExpandedItems((prev) => {
      const newExpanded = { ...prev };
      delete newExpanded[itemId];
      return newExpanded;
    });
  };

  // Toggle subscription options
  const toggleItemExpanded = (itemId: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  // Update subscription frequency
  const updateSubscriptionFrequency = (
    itemId: string,
    frequency: SubscriptionFrequency,
  ) => {
    setSubscriptionFrequencies((prev) => ({
      ...prev,
      [itemId]: frequency,
    }));
  };

  // Get total savings from subscriptions
  const getTotalSavings = () => {
    return cartItems.reduce((sum, item) => {
      const basePrice = item.product.price * item.quantity;
      const discountedPrice = calculateItemPrice(item);
      return sum + (basePrice - discountedPrice);
    }, 0);
  };

  const totalSavings = getTotalSavings();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Continue Shopping
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Main content */}
          <div className="lg:col-span-7">
            {cartItems.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => {
                  const frequency = subscriptionFrequencies[item.id];
                  const subscriptionOption = subscriptionOptions.find(
                    (opt) => opt.id === frequency,
                  );
                  const isExpanded = expandedItems[item.id];
                  const originalPrice = item.product.price * item.quantity;
                  const discountedPrice = calculateItemPrice(item);
                  const savings = originalPrice - discountedPrice;

                  return (
                    <li key={item.id} className="py-6">
                      <div className="flex">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={
                              item.product.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={item.product.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-base font-medium text-gray-900">
                                {item.product.name}
                              </h3>
                              <div className="text-right">
                                <p className="text-base font-medium text-gray-900">
                                  {formatCurrency(discountedPrice)}
                                </p>
                                {savings > 0 && (
                                  <p className="text-sm text-gray-500 line-through">
                                    {formatCurrency(originalPrice)}
                                  </p>
                                )}
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.category}
                            </p>
                          </div>

                          {/* Subscription selection */}
                          <div className="mt-4 flex flex-col">
                            <div
                              className="flex cursor-pointer items-center justify-between rounded-md border border-gray-200 bg-gray-50 p-3"
                              onClick={() => toggleItemExpanded(item.id)}
                            >
                              <div className="flex items-center">
                                {frequency !== "one-time" ? (
                                  <RefreshCw className="mr-2 h-5 w-5 text-indigo-600" />
                                ) : (
                                  <ShoppingBag className="mr-2 h-5 w-5 text-gray-400" />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {subscriptionOption?.label}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {subscriptionOption?.description}
                                    {subscriptionOption?.discount &&
                                      subscriptionOption.discount > 0 &&
                                      ` (Save ${subscriptionOption.discount}%)`}
                                  </p>
                                </div>
                              </div>
                              <div>
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-gray-400" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-400" />
                                )}
                              </div>
                            </div>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-2 space-y-2 rounded-md border border-gray-200 p-3">
                                    {subscriptionOptions.map((option) => (
                                      <label
                                        key={option.id}
                                        className={`flex cursor-pointer items-center justify-between rounded-md p-2 ${
                                          frequency === option.id
                                            ? "bg-indigo-50 text-indigo-700"
                                            : "hover:bg-gray-50"
                                        }`}
                                      >
                                        <div className="flex items-center">
                                          <input
                                            type="radio"
                                            checked={frequency === option.id}
                                            onChange={() =>
                                              updateSubscriptionFrequency(
                                                item.id,
                                                option.id,
                                              )
                                            }
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                          />
                                          <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                              {option.label}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                              {option.description}
                                            </p>
                                          </div>
                                        </div>
                                        {option.discount > 0 && (
                                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                            Save {option.discount}%
                                          </span>
                                        )}
                                      </label>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          <div className="mt-4 flex items-end justify-between">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="rounded-md border border-gray-300 p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-500"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-gray-500">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="rounded-md border border-gray-300 p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-500"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Looks like you haven&apos;t added any products to your cart
                  yet.
                </p>
                <button className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                  Browse Products
                </button>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="mt-16 rounded-lg border border-gray-200 bg-gray-50 p-6 lg:col-span-5 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

            {totalSavings > 0 && (
              <div className="mt-4 rounded-md bg-green-50 p-4">
                <div className="flex">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Subscription Savings
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>
                        You&apos;re saving {formatCurrency(totalSavings)} with
                        your subscription choices!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrency(subtotal)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="text-sm font-medium text-gray-900">Free</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Taxes</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatCurrency(tax)}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <p className="text-base font-medium text-gray-900">
                  Order total
                </p>
                <p className="text-base font-bold text-gray-900">
                  {formatCurrency(total)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                Proceed to Checkout
              </button>
            </div>

            <div className="mt-6 space-y-4 rounded-md border border-gray-200 bg-white p-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400" />
                <p className="ml-2 text-sm text-gray-500">
                  First delivery estimated:{" "}
                  <span className="font-medium text-gray-900">March 15-17</span>
                </p>
              </div>

              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 text-gray-400" />
                <p className="ml-2 text-sm text-gray-500">
                  Subscriptions can be managed or canceled anytime
                </p>
              </div>

              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400" />
                <p className="ml-2 text-sm text-gray-500">
                  Next billing date:{" "}
                  <span className="font-medium text-gray-900">
                    April 15, 2025
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCart;
