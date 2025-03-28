"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  X,
  Minus,
  Plus,
  ChevronRight,
  Gift,
  CreditCard,
  Truck,
  Clock,
  Heart,
} from "lucide-react";
import type { Product } from "@/data/products";
import {
  type CartItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
} from "@/lib/cart-utlis";

interface LuxuryFullCartProps {
  products?: Product[];
  onClose?: () => void;
}

const LuxuryFullCart = ({ products = [], onClose }: LuxuryFullCartProps) => {
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

  const [isGiftWrapping, setIsGiftWrapping] = useState(false);
  const [selectedShippingOption, setSelectedShippingOption] =
    useState("standard");
  const [activeSection, setActiveSection] = useState("cart");

  // Calculate cart totals
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const shippingCost = selectedShippingOption === "express" ? 25 : 0;
  const giftWrappingCost = isGiftWrapping ? 15 : 0;
  const total = calculateTotal(subtotal, tax, shippingCost + giftWrappingCost);

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

  return (
    <div className="min-h-screen bg-[#f8f5f2]">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-8 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
            <h1 className="font-serif text-2xl font-light tracking-wide text-gray-900">
              Your Shopping Bag
            </h1>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Continue Shopping
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Save for Later
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Main content */}
          <div className="lg:col-span-8">
            {/* Progress steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveSection("cart")}
                  className={`flex flex-col items-center ${activeSection === "cart" ? "text-black" : "text-gray-400"}`}
                >
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full border ${activeSection === "cart" ? "border-black bg-black text-white" : "border-gray-300"}`}
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Bag
                  </span>
                </button>

                <div className="mx-4 h-px flex-1 bg-gray-300"></div>

                <button
                  onClick={() => setActiveSection("shipping")}
                  className={`flex flex-col items-center ${activeSection === "shipping" ? "text-black" : "text-gray-400"}`}
                >
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full border ${activeSection === "shipping" ? "border-black bg-black text-white" : "border-gray-300"}`}
                  >
                    <Truck className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Shipping
                  </span>
                </button>

                <div className="mx-4 h-px flex-1 bg-gray-300"></div>

                <button
                  onClick={() => setActiveSection("payment")}
                  className={`flex flex-col items-center ${activeSection === "payment" ? "text-black" : "text-gray-400"}`}
                >
                  <div
                    className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full border ${activeSection === "payment" ? "border-black bg-black text-white" : "border-gray-300"}`}
                  >
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Payment
                  </span>
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeSection === "cart" && (
                <motion.div
                  key="cart-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {cartItems.length > 0 ? (
                    <div className="space-y-8">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex border-b border-gray-200 pb-8"
                        >
                          <div className="relative h-40 w-32 flex-shrink-0 overflow-hidden bg-gray-100">
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

                          <div className="ml-8 flex flex-1 flex-col">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-serif text-lg font-medium text-gray-900">
                                  {item.product.name}
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.product.category}
                                </p>

                                {(item.selectedColor || item.selectedSize) && (
                                  <div className="mt-2 space-y-1">
                                    {item.selectedColor && (
                                      <div className="flex items-center">
                                        <span className="text-xs text-gray-500">
                                          Color:
                                        </span>
                                        <span
                                          className="ml-2 inline-block h-4 w-4 rounded-full border border-gray-300"
                                          style={{
                                            backgroundColor: item.selectedColor,
                                          }}
                                        />
                                      </div>
                                    )}
                                    {item.selectedSize && (
                                      <div className="text-xs text-gray-500">
                                        Size: {item.selectedSize}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>

                              <p className="text-lg font-light text-gray-900">
                                {formatCurrency(
                                  item.product.price * item.quantity,
                                )}
                              </p>
                            </div>

                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center border border-gray-200">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:text-gray-700"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="flex w-8 items-center justify-center text-sm text-gray-700">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="flex h-8 w-8 items-center justify-center text-gray-500 transition-colors hover:text-gray-700"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>

                              <div className="flex space-x-4">
                                <button className="text-sm font-medium text-gray-500 hover:text-gray-700">
                                  <Heart className="h-5 w-5" />
                                </button>
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-sm font-medium text-gray-500 hover:text-gray-700"
                                >
                                  <X className="h-5 w-5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 py-12 text-center">
                      <ShoppingBag className="h-16 w-16 text-gray-400" />
                      <h3 className="mt-4 font-serif text-lg font-medium text-gray-900">
                        Your bag is empty
                      </h3>
                      <p className="mt-1 text-gray-500">
                        Add items to your bag to continue shopping
                      </p>
                      <button className="mt-6 rounded-md border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800">
                        Browse Products
                      </button>
                    </div>
                  )}

                  {cartItems.length > 0 && (
                    <div className="mt-8 flex justify-between">
                      <button
                        onClick={() => setActiveSection("shipping")}
                        className="flex items-center rounded-md border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
                      >
                        Continue to Shipping
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </button>

                      <div className="text-right">
                        <p className="text-sm text-gray-500">Subtotal</p>
                        <p className="text-xl font-light text-gray-900">
                          {formatCurrency(subtotal)}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeSection === "shipping" && (
                <motion.div
                  key="shipping-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h3 className="font-serif text-lg font-medium text-gray-900">
                      Shipping Options
                    </h3>

                    <div className="mt-4 space-y-4">
                      <label
                        className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition-colors ${selectedShippingOption === "standard" ? "border-gray-900 bg-gray-50" : "border-gray-200"}`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            checked={selectedShippingOption === "standard"}
                            onChange={() =>
                              setSelectedShippingOption("standard")
                            }
                            className="h-4 w-4 text-gray-900 focus:ring-gray-500"
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              Complimentary Shipping
                            </p>
                            <p className="text-sm text-gray-500">
                              7-10 business days
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          Free
                        </span>
                      </label>

                      <label
                        className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition-colors ${selectedShippingOption === "express" ? "border-gray-900 bg-gray-50" : "border-gray-200"}`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            checked={selectedShippingOption === "express"}
                            onChange={() =>
                              setSelectedShippingOption("express")
                            }
                            className="h-4 w-4 text-gray-900 focus:ring-gray-500"
                          />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              Express Shipping
                            </p>
                            <p className="text-sm text-gray-500">
                              2-3 business days
                            </p>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          $25.00
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Gift className="h-5 w-5 text-gray-400" />
                        <h3 className="ml-2 font-serif text-lg font-medium text-gray-900">
                          Gift Options
                        </h3>
                      </div>
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={isGiftWrapping}
                          onChange={() => setIsGiftWrapping(!isGiftWrapping)}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-gray-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-gray-300"></div>
                      </label>
                    </div>

                    {isGiftWrapping && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <p className="text-sm text-gray-500">
                          Your items will be wrapped in premium paper with a
                          personalized note. Additional fee of $15.00 applies.
                        </p>
                        <textarea
                          placeholder="Add a gift message (optional)"
                          className="mt-3 w-full rounded-md border border-gray-300 p-3 text-sm placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                          rows={3}
                        ></textarea>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setActiveSection("cart")}
                      className="flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Back to Bag
                    </button>

                    <button
                      onClick={() => setActiveSection("payment")}
                      className="flex items-center rounded-md border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800"
                    >
                      Continue to Payment
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {activeSection === "payment" && (
                <motion.div
                  key="payment-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h3 className="font-serif text-lg font-medium text-gray-900">
                      Payment Method
                    </h3>

                    <div className="mt-4 space-y-4">
                      <div className="rounded-md border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <input
                              type="radio"
                              checked={true}
                              className="h-4 w-4 text-gray-900 focus:ring-gray-500"
                              readOnly
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                Credit Card
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="h-8 w-12 rounded bg-gray-200"></div>
                            <div className="h-8 w-12 rounded bg-gray-200"></div>
                            <div className="h-8 w-12 rounded bg-gray-200"></div>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Expiration Date
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Security Code
                            </label>
                            <input
                              type="text"
                              placeholder="CVC"
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              placeholder="John Doe"
                              className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-sm placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between">
                    <button
                      onClick={() => setActiveSection("shipping")}
                      className="flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Back to Shipping
                    </button>

                    <button className="flex items-center rounded-md border border-gray-900 bg-gray-900 px-6 py-3 text-sm font-medium text-white hover:bg-gray-800">
                      Complete Order
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-6">
              <h2 className="font-serif text-lg font-medium text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                  <p className="text-sm text-gray-600">
                    Subtotal ({cartItems.length} items)
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(subtotal)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">
                    {shippingCost === 0 ? "Free" : formatCurrency(shippingCost)}
                  </p>
                </div>

                {isGiftWrapping && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Gift Wrapping</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(giftWrappingCost)}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Estimated Tax</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(tax)}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-bold text-gray-900">
                    {formatCurrency(total)}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-md bg-gray-50 p-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <p className="ml-2 text-sm text-gray-600">
                    Estimated delivery:{" "}
                    {selectedShippingOption === "express" ? "2-3" : "7-10"}{" "}
                    business days
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <input
                    id="save-info"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                  />
                  <label
                    htmlFor="save-info"
                    className="ml-2 block text-sm text-gray-600"
                  >
                    Save my information for faster checkout
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="newsletter"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
                  />
                  <label
                    htmlFor="newsletter"
                    className="ml-2 block text-sm text-gray-600"
                  >
                    Sign up for exclusive offers and updates
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LuxuryFullCart;
