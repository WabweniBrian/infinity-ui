"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";
import {
  type CartItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
} from "@/lib/cart-utlis";

interface MinimalistCartProps {
  products?: Product[];
  onClose?: () => void;
}

const MinimalistCart = ({ products = [], onClose }: MinimalistCartProps) => {
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

  const [activeStep, setActiveStep] = useState<"cart" | "shipping" | "payment">(
    "cart",
  );
  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
  });

  // Calculate cart totals
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const shippingCost = 0; // Free shipping
  const total = calculateTotal(subtotal, tax, shippingCost);

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

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Go to next step
  const goToNextStep = () => {
    if (activeStep === "cart") setActiveStep("shipping");
    else if (activeStep === "shipping") setActiveStep("payment");
  };

  // Go to previous step
  const goToPreviousStep = () => {
    if (activeStep === "shipping") setActiveStep("cart");
    else if (activeStep === "payment") setActiveStep("shipping");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-10 flex h-16 items-center justify-between border-b border-gray-100 bg-white/80 px-6 backdrop-blur-sm dark:border-gray-800 dark:bg-slate-900/80">
        <div className="flex items-center">
          <button
            onClick={onClose}
            className="mr-4 text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-normal text-gray-900 dark:text-white">
            {activeStep === "cart"
              ? "Cart"
              : activeStep === "shipping"
                ? "Shipping"
                : "Payment"}
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex">
            <div
              className={`h-1 w-8 ${activeStep === "cart" ? "bg-black dark:bg-white" : "bg-gray-200 dark:bg-gray-700"}`}
            ></div>
            <div
              className={`h-1 w-8 ${activeStep === "shipping" ? "bg-black dark:bg-white" : "bg-gray-200 dark:bg-gray-700"}`}
            ></div>
            <div
              className={`h-1 w-8 ${activeStep === "payment" ? "bg-black dark:bg-white" : "bg-gray-200 dark:bg-gray-700"}`}
            ></div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 pb-32 pt-24">
        <AnimatePresence mode="wait">
          {activeStep === "cart" && (
            <motion.div
              key="cart-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {cartItems.length > 0 ? (
                <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.id}
                      className="py-6"
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center">
                        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-800">
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
                          <div className="flex justify-between">
                            <h3 className="text-base font-normal text-gray-900 dark:text-white">
                              {item.product.name}
                            </h3>
                            <p className="text-base font-normal text-gray-900 dark:text-white">
                              {formatCurrency(
                                item.product.price * item.quantity,
                              )}
                            </p>
                          </div>

                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="mx-2 min-w-[1.5rem] text-center text-sm text-gray-700 dark:text-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-sm text-gray-400 transition-colors hover:text-gray-900 dark:hover:text-white"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    Your cart is empty
                  </p>
                  <button className="mt-4 text-sm text-gray-900 underline dark:text-white">
                    Continue shopping
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeStep === "shipping" && (
            <motion.div
              key="shipping-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-normal text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-none border-b border-gray-200 bg-transparent p-0 pb-1 text-gray-900 focus:border-black focus:ring-0 dark:border-gray-700 dark:text-white dark:focus:border-white"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-normal text-gray-700 dark:text-gray-300"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={shippingInfo.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-none border-b border-gray-200 bg-transparent p-0 pb-1 text-gray-900 focus:border-black focus:ring-0 dark:border-gray-700 dark:text-white dark:focus:border-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-normal text-gray-700 dark:text-gray-300"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-none border-b border-gray-200 bg-transparent p-0 pb-1 text-gray-900 focus:border-black focus:ring-0 dark:border-gray-700 dark:text-white dark:focus:border-white"
                  placeholder="123 Main St"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-normal text-gray-700 dark:text-gray-300"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-none border-b border-gray-200 bg-transparent p-0 pb-1 text-gray-900 focus:border-black focus:ring-0 dark:border-gray-700 dark:text-white dark:focus:border-white"
                    placeholder="New York"
                  />
                </div>

                <div>
                  <label
                    htmlFor="zip"
                    className="block text-sm font-normal text-gray-700 dark:text-gray-300"
                  >
                    ZIP / Postal code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={shippingInfo.zip}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-none border-b border-gray-200 bg-transparent p-0 pb-1 text-gray-900 focus:border-black focus:ring-0 dark:border-gray-700 dark:text-white dark:focus:border-white"
                    placeholder="10001"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-normal text-gray-700 dark:text-gray-300"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={shippingInfo.country}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      country: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-none border-b border-gray-200 bg-transparent p-0 pb-1 text-gray-900 focus:border-black focus:ring-0 dark:border-gray-700 dark:text-white dark:focus:border-white"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                  <option>Germany</option>
                  <option>France</option>
                  <option>Japan</option>
                </select>
              </div>
            </motion.div>
          )}

          {activeStep === "payment" && (
            <motion.div
              key="payment-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="card-number"
                  className="block text-sm font-normal text-gray-700 dark:text-gray-300"
                >
                  Card number
                </label>
                <input
                  type="text"
                  id="card-number"
                  className="mt-1 block w-full rounded-none border-b border-gray-200 bg-transparent p-0 pb-1 text-gray-900 focus:border-black focus:ring-0 dark:border-gray-700 dark:text-white dark:focus:border-white"
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-normal text-gray-700 dark:text-gray-300"
                  >
                    Expiry date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    className="mt-1 block w-full rounded-none border-b border-gray-200 bg-transparent p-0 pb-1 text-gray-900 focus:border-black focus:ring-0 dark:border-gray-700 dark:text-white dark:focus:border-white"
                    placeholder="MM / YY"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-normal text-gray-700 dark:text-gray-300"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    className="mt-1 block w-full rounded-none border-b border-gray-200 bg-transparent p-0 pb-1 text-gray-900 focus:border-black focus:ring-0 dark:border-gray-700 dark:text-white dark:focus:border-white"
                    placeholder="123"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="name-on-card"
                  className="block text-sm font-normal text-gray-700 dark:text-gray-300"
                >
                  Name on card
                </label>
                <input
                  type="text"
                  id="name-on-card"
                  className="mt-1 block w-full rounded-none border-b border-gray-200 bg-transparent p-0 pb-1 text-gray-900 focus:border-black focus:ring-0 dark:border-gray-700 dark:text-white dark:focus:border-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="mt-6">
                <div className="relative flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="save-card"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-0 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="save-card"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Save card for future purchases
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer with summary and navigation */}
      <footer className="fixed inset-x-0 bottom-0 z-10 border-t border-gray-100 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-slate-900/80">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
              <p className="text-lg font-normal text-gray-900 dark:text-white">
                {formatCurrency(total)}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {activeStep !== "cart" && (
                <button
                  onClick={goToPreviousStep}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  Back
                </button>
              )}

              <button
                onClick={activeStep === "payment" ? onClose : goToNextStep}
                className="flex items-center rounded-full bg-black px-6 py-2 text-sm font-normal text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                {activeStep === "cart"
                  ? "Checkout"
                  : activeStep === "shipping"
                    ? "Continue to payment"
                    : "Place order"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MinimalistCart;
