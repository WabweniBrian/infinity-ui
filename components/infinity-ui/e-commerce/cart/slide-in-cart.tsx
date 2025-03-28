"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  Trash2,
  ChevronRight,
  Gift,
} from "lucide-react";
import type { Product } from "@/data/products";
import {
  type CartItem,
  type ShippingOption,
  shippingOptions,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
  isValidPromoCode,
  getDiscountAmount,
} from "@/lib/cart-utlis";

interface SlideInCartProps {
  isOpen: boolean;
  onClose: () => void;
  products?: Product[];
}

const SlideInCart = ({ isOpen, onClose, products = [] }: SlideInCartProps) => {
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

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(
    shippingOptions[0],
  );
  const [isGiftWrapping, setIsGiftWrapping] = useState(false);
  const giftWrappingCost = 5.99;

  // Calculate cart totals
  const subtotal = calculateSubtotal(cartItems);
  const discount = appliedPromoCode
    ? getDiscountAmount(appliedPromoCode, subtotal)
    : 0;
  const tax = calculateTax(subtotal - discount);
  const shippingCost = selectedShipping.price;
  const giftWrapCost = isGiftWrapping ? giftWrappingCost : 0;
  const total = calculateTotal(
    subtotal,
    tax,
    shippingCost + giftWrapCost,
    discount,
  );

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

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Cart drawer */}
          <motion.div
            className="fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-xl dark:bg-slate-900 sm:max-w-md"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-4 dark:border-gray-700">
              <div className="flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-300" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Your Cart ({cartItems.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart content */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.id}
                      className="py-6"
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
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
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                {item.product.name}
                              </h3>
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
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
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {formatCurrency(
                                item.product.price * item.quantity,
                              )}
                            </p>
                          </div>

                          <div className="mt-2 flex items-center justify-between">
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
                              className="text-xs font-medium text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="flex h-full flex-col items-center justify-center py-12">
                  <ShoppingBag className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
                  <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    Your cart is empty
                  </h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Looks like you haven&apos;t added any products to your cart
                    yet.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <>
                {/* Promo code */}
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  {appliedPromoCode ? (
                    <div className="flex items-center justify-between rounded-md bg-green-50 p-3 dark:bg-green-900/20">
                      <div>
                        <p className="text-sm font-medium text-green-800 dark:text-green-400">
                          Promo code applied: {appliedPromoCode}
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-500">
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
                  ) : (
                    <div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="Enter promo code"
                          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-800 dark:text-white dark:placeholder-gray-500"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
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
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Shipping
                  </h3>
                  <div className="space-y-2">
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

                {/* Gift wrapping */}
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <label className="flex cursor-pointer items-center justify-between">
                    <div className="flex items-center">
                      <Gift className="mr-2 h-5 w-5 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Add gift wrapping
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2 text-sm text-gray-500 dark:text-gray-400">
                        {formatCurrency(giftWrappingCost)}
                      </span>
                      <input
                        type="checkbox"
                        checked={isGiftWrapping}
                        onChange={() => setIsGiftWrapping(!isGiftWrapping)}
                        className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </label>
                </div>

                {/* Order summary */}
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <h3 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                    Order Summary
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-500 dark:text-gray-400">
                        Subtotal
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(subtotal)}
                      </p>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <p className="text-gray-500 dark:text-gray-400">
                          Discount
                        </p>
                        <p className="font-medium text-green-600 dark:text-green-400">
                          -{formatCurrency(discount)}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-500 dark:text-gray-400">
                        Shipping
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {selectedShipping.price === 0
                          ? "Free"
                          : formatCurrency(selectedShipping.price)}
                      </p>
                    </div>
                    {isGiftWrapping && (
                      <div className="flex justify-between text-sm">
                        <p className="text-gray-500 dark:text-gray-400">
                          Gift Wrapping
                        </p>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {formatCurrency(giftWrappingCost)}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <p className="text-gray-500 dark:text-gray-400">Tax</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(tax)}
                      </p>
                    </div>
                    <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
                      <div className="flex justify-between">
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          Total
                        </p>
                        <p className="text-base font-bold text-gray-900 dark:text-white">
                          {formatCurrency(total)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout button */}
                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <button className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Checkout
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="mt-3 flex w-full items-center justify-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SlideInCart;
