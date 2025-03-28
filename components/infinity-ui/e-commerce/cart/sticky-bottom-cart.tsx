"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  ChevronUp,
  ChevronDown,
  Plus,
  Minus,
  Trash2,
  Gift,
  Tag,
} from "lucide-react";
import type { Product } from "@/data/products";
import {
  type CartItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
  isValidPromoCode,
  getDiscountAmount,
} from "@/lib/cart-utlis";

interface StickyBottomCartProps {
  products?: Product[];
}

const StickyBottomCart = ({ products = [] }: StickyBottomCartProps) => {
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

  const [isExpanded, setIsExpanded] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");

  // Calculate cart totals
  const subtotal = calculateSubtotal(cartItems);
  const discount = appliedPromoCode
    ? getDiscountAmount(appliedPromoCode, subtotal)
    : 0;
  const tax = calculateTax(subtotal - discount);
  const total = calculateTotal(subtotal, tax, 0, discount);

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
  };

  // Apply promo code
  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    if (isValidPromoCode(promoCode)) {
      setAppliedPromoCode(promoCode);
      setPromoError("");
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code");
    }
  };

  // Remove promo code
  const removePromoCode = () => {
    setAppliedPromoCode("");
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      {/* Collapsed cart bar */}
      <motion.div
        className="flex items-center justify-between bg-white px-4 py-3 shadow-lg dark:bg-slate-900 sm:px-6"
        animate={{ y: isExpanded ? -20 : 0, opacity: isExpanded ? 0 : 1 }}
      >
        <div className="flex items-center">
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
            <ChevronUp className="ml-1 h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center">
          <div className="mr-4 text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formatCurrency(total)}
            </p>
          </div>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
            Checkout
          </button>
        </div>
      </motion.div>

      {/* Expanded cart */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="bg-white shadow-lg dark:bg-slate-900"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Shopping Cart
                </h2>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <span className="text-sm">Collapse</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>

              <div className="mt-4">
                {cartItems.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* Cart items */}
                    <div className="lg:col-span-8">
                      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {cartItems.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
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
                                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                  <h3>{item.product.name}</h3>
                                  <p className="ml-4">
                                    {formatCurrency(
                                      item.product.price * item.quantity,
                                    )}
                                  </p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                  {item.product.category}
                                </p>
                                {(item.selectedColor || item.selectedSize) && (
                                  <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    {item.selectedColor && (
                                      <div className="flex items-center">
                                        <span>Color:</span>
                                        <span
                                          className="ml-1 inline-block h-3 w-3 rounded-full border border-gray-300 dark:border-gray-600"
                                          style={{
                                            backgroundColor: item.selectedColor,
                                          }}
                                        />
                                      </div>
                                    )}
                                    {item.selectedSize && (
                                      <div>Size: {item.selectedSize}</div>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="mt-4 flex flex-1 items-end justify-between">
                                <div className="flex items-center rounded-md border border-gray-200 dark:border-gray-700">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="flex w-8 items-center justify-center text-sm text-gray-700 dark:text-gray-300">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-sm font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {/* Recommendations */}
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          You might also like
                        </h3>
                        <div className="mt-2 grid grid-cols-2 gap-4 sm:grid-cols-4">
                          {products.slice(3, 7).map((product) => (
                            <div key={product.id} className="group relative">
                              <div className="relative aspect-square overflow-hidden rounded-md bg-gray-100 dark:bg-slate-800">
                                <Image
                                  src={
                                    product.image ||
                                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                  }
                                  alt={product.name}
                                  fill
                                  className="object-cover object-center transition-transform group-hover:scale-105"
                                />
                              </div>
                              <h4 className="mt-1 text-xs font-medium text-gray-900 dark:text-white">
                                {product.name}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {formatCurrency(product.price)}
                              </p>
                              <button className="mt-1 text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                Add to cart
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Order summary */}
                    <div className="lg:col-span-4">
                      <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-slate-800">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Order Summary
                        </h3>

                        {/* Promo code */}
                        <div className="mt-6">
                          {appliedPromoCode ? (
                            <div className="rounded-md bg-green-50 p-3 dark:bg-green-900/20">
                              <div className="flex items-center">
                                <Tag className="h-5 w-5 text-green-400" />
                                <p className="ml-2 text-sm font-medium text-green-800 dark:text-green-400">
                                  Promo code applied: {appliedPromoCode}
                                </p>
                                <button
                                  onClick={removePromoCode}
                                  className="ml-auto text-sm font-medium text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                >
                                  Remove
                                </button>
                              </div>
                              <p className="mt-1 text-sm text-green-700 dark:text-green-500">
                                You saved {formatCurrency(discount)}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <label
                                htmlFor="promo-code"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                              >
                                Promo code
                              </label>
                              <div className="mt-1 flex space-x-2">
                                <input
                                  type="text"
                                  id="promo-code"
                                  value={promoCode}
                                  onChange={(e) => setPromoCode(e.target.value)}
                                  placeholder="Enter code"
                                  className="block w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder-gray-500"
                                />
                                <button
                                  onClick={applyPromoCode}
                                  className="rounded-md bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                  Apply
                                </button>
                              </div>
                              {promoError && (
                                <p className="mt-1 text-xs text-red-500">
                                  {promoError}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Gift options */}
                        <div className="mt-6">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600"
                            />
                            <span className="ml-2 flex items-center text-sm text-gray-700 dark:text-gray-300">
                              <Gift className="mr-1 h-4 w-4 text-gray-400 dark:text-gray-500" />
                              This is a gift
                            </span>
                          </label>
                        </div>

                        {/* Totals */}
                        <div className="mt-6 space-y-4">
                          <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Subtotal
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatCurrency(subtotal)}
                            </div>
                          </div>

                          {discount > 0 && (
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                Discount
                              </div>
                              <div className="text-sm font-medium text-green-600 dark:text-green-400">
                                -{formatCurrency(discount)}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Tax
                            </div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatCurrency(tax)}
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                            <div className="text-base font-medium text-gray-900 dark:text-white">
                              Total
                            </div>
                            <div className="text-base font-bold text-gray-900 dark:text-white">
                              {formatCurrency(total)}
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <button className="w-full rounded-md bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                      Your cart is empty
                    </h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                      Looks like you haven&apos;t added any products to your
                      cart yet.
                    </p>
                    <button className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                      Continue Shopping
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StickyBottomCart;
