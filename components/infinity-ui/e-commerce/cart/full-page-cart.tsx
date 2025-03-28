"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Heart,
  ArrowLeft,
  Tag,
  CreditCard,
  Truck,
  Shield,
  Clock,
} from "lucide-react";
import type { Product } from "@/data/products";

import {
  type CartItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
  shippingOptions,
  ShippingOption,
  isValidPromoCode,
  getDiscountAmount,
} from "@/lib/cart-utlis";

interface FullPageCartProps {
  products?: Product[];
  onClose?: () => void;
}

const FullPageCart = ({ products = [], onClose }: FullPageCartProps) => {
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

  const [savedForLater, setSavedForLater] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(
    shippingOptions[0],
  );

  // Calculate cart totals
  const subtotal = calculateSubtotal(cartItems);
  const discount = appliedPromoCode
    ? getDiscountAmount(appliedPromoCode, subtotal)
    : 0;
  const tax = calculateTax(subtotal - discount);
  const shippingCost = selectedShipping.price;
  const total = calculateTotal(subtotal, tax, shippingCost, discount);

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

  // Save for later
  const saveForLater = (itemId: string) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;

    setSavedForLater((prev) => [...prev, item]);
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Move to cart
  const moveToCart = (itemId: string) => {
    const item = savedForLater.find((item) => item.id === itemId);
    if (!item) return;

    setCartItems((prev) => [...prev, item]);
    setSavedForLater((prev) => prev.filter((item) => item.id !== itemId));
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

  // Recently viewed products
  const recentlyViewed = products.slice(3, 7);

  return (
    <div className="bg-gray-50 py-8 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            {onClose && (
              <button
                onClick={onClose}
                className="mr-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          </div>

          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Continue Shopping
          </a>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-8">
            {/* Cart items */}
            {cartItems.length > 0 ? (
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-800">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.id}
                      className="p-6"
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center sm:items-start">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-32">
                          <Image
                            src={
                              item.product.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={item.product.name}
                            fill
                            className="object-cover object-center"
                          />
                          {item.product.isOnSale && (
                            <div className="absolute left-0 top-0 rounded-br bg-red-500 px-2 py-1 text-xs font-bold text-white">
                              SALE
                            </div>
                          )}
                        </div>

                        <div className="ml-6 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                {item.product.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {item.product.category}
                              </p>

                              {(item.selectedColor || item.selectedSize) && (
                                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                  {item.selectedColor && (
                                    <div className="flex items-center">
                                      <span>Color:</span>
                                      <span
                                        className="ml-1 inline-block h-4 w-4 rounded-full border border-gray-300 dark:border-gray-600"
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

                            <div className="text-right">
                              <p className="text-base font-medium text-gray-900 dark:text-white">
                                {formatCurrency(
                                  item.product.price * item.quantity,
                                )}
                              </p>
                              {item.product.originalPrice && (
                                <p className="text-sm text-gray-500 line-through dark:text-gray-400">
                                  {formatCurrency(
                                    item.product.originalPrice * item.quantity,
                                  )}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center rounded-md border border-gray-200 dark:border-gray-700">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                              >
                                <Minus className="h-4 w-4" />
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
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => saveForLater(item.id)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                Save for later
                              </button>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-sm font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-slate-800">
                <ShoppingBag className="h-16 w-16 text-gray-400 dark:text-gray-500" />
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  Looks like you haven&apos;t added any products to your cart
                  yet.
                </p>
                <button className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Start Shopping
                </button>
              </div>
            )}

            {/* Saved for later */}
            {savedForLater.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Saved for later ({savedForLater.length})
                </h2>
                <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-800">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {savedForLater.map((item) => (
                      <motion.li
                        key={item.id}
                        className="p-6"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
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

                          <div className="ml-6 flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="text-base font-medium text-gray-900 dark:text-white">
                                  {item.product.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                  {item.product.category}
                                </p>
                              </div>

                              <p className="text-base font-medium text-gray-900 dark:text-white">
                                {formatCurrency(item.product.price)}
                              </p>
                            </div>

                            <div className="mt-4 flex items-center justify-end space-x-4">
                              <button
                                onClick={() => moveToCart(item.id)}
                                className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                Move to cart
                              </button>
                              <button
                                onClick={() =>
                                  setSavedForLater((prev) =>
                                    prev.filter((i) => i.id !== item.id),
                                  )
                                }
                                className="text-sm font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Recently viewed */}
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Recently viewed
              </h2>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {recentlyViewed.map((product) => (
                  <div key={product.id} className="group relative">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800">
                      <Image
                        src={
                          product.image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={product.name}
                        fill
                        className="object-cover object-center transition-transform group-hover:scale-105"
                      />
                      <button className="absolute right-2 top-2 rounded-full bg-white/80 p-1.5 text-gray-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 dark:bg-black/50 dark:text-gray-400 dark:hover:text-red-400">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(product.price)}
                    </p>
                    <button className="mt-1 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                      Add to cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="mt-8 lg:col-span-4 lg:mt-0">
            <div className="sticky top-4 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-800">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Order Summary
                </h2>

                {/* Promo code */}
                <div className="mt-6">
                  {appliedPromoCode ? (
                    <div className="rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                      <div className="flex">
                        <Tag className="h-5 w-5 text-green-400" />
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-green-800 dark:text-green-400">
                            Promo code applied: {appliedPromoCode}
                          </p>
                          <p className="mt-1 text-sm text-green-700 dark:text-green-500">
                            You saved {formatCurrency(discount)}
                          </p>
                        </div>
                        <button
                          onClick={removePromoCode}
                          className="text-sm font-medium text-green-700 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                        >
                          Remove
                        </button>
                      </div>
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

                {/* Shipping options */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Shipping
                  </h3>
                  <div className="mt-2 space-y-2">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-center justify-between rounded-md border p-3 transition-colors ${
                          selectedShipping.id === option.id
                            ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20"
                            : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            checked={selectedShipping.id === option.id}
                            onChange={() => setSelectedShipping(option)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {option.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {option.estimatedDelivery}
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {option.price === 0
                            ? "Free"
                            : formatCurrency(option.price)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Totals */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Subtotal
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(subtotal)}
                    </p>
                  </div>

                  {discount > 0 && (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Discount
                      </p>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        -{formatCurrency(discount)}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Shipping
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {selectedShipping.price === 0
                        ? "Free"
                        : formatCurrency(selectedShipping.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tax
                    </p>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatCurrency(tax)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                    <p className="text-base font-medium text-gray-900 dark:text-white">
                      Total
                    </p>
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {formatCurrency(total)}
                    </p>
                  </div>
                </div>

                {/* Checkout button */}
                <div className="mt-6">
                  <button className="w-full rounded-md bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Checkout
                  </button>
                </div>

                {/* Trust badges */}
                <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <h3 className="text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                    We accept
                  </h3>
                  <div className="mt-2 flex items-center space-x-2">
                    <CreditCard className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      All major credit cards
                    </span>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        Free shipping on orders over $50
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        Secure checkout
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                        30-day returns
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageCart;
