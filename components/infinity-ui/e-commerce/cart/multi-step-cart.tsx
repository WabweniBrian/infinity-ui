"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  CreditCard,
  Truck,
  Check,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Plus,
  Minus,
  MapPin,
  CreditCardIcon,
  Clock,
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
} from "@/lib/cart-utlis";

interface MultiStepCartProps {
  products?: Product[];
}

type CartStep = "cart" | "shipping" | "payment" | "review";

const MultiStepCart = ({ products = [] }: MultiStepCartProps) => {
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

  const [currentStep, setCurrentStep] = useState<CartStep>("cart");
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(
    shippingOptions[0],
  );

  // Calculate cart totals
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const shippingCost = selectedShipping.price;
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

  // Navigation between steps
  const goToNextStep = () => {
    if (currentStep === "cart") setCurrentStep("shipping");
    else if (currentStep === "shipping") setCurrentStep("payment");
    else if (currentStep === "payment") setCurrentStep("review");
  };

  const goToPreviousStep = () => {
    if (currentStep === "shipping") setCurrentStep("cart");
    else if (currentStep === "payment") setCurrentStep("shipping");
    else if (currentStep === "review") setCurrentStep("payment");
  };

  // Mock form data
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  // Step indicators
  const steps = [
    { id: "cart", name: "Cart", icon: ShoppingCart },
    { id: "shipping", name: "Shipping", icon: Truck },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "review", name: "Review", icon: Check },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Steps indicator */}
      <nav className="mb-8">
        <ol className="flex items-center">
          {steps.map((step, index) => (
            <li
              key={step.id}
              className={`flex items-center ${index < steps.length - 1 ? "w-full" : ""}`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  currentStep === step.id
                    ? "border-blue-600 bg-blue-600 text-white"
                    : steps.findIndex((s) => s.id === currentStep) > index
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-400"
                }`}
              >
                {steps.findIndex((s) => s.id === currentStep) > index ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <step.icon className="h-5 w-5" />
                )}
              </div>
              <div
                className={`ml-2 hidden text-sm font-medium md:block ${
                  currentStep === step.id
                    ? "text-blue-600 dark:text-blue-400"
                    : steps.findIndex((s) => s.id === currentStep) > index
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step.name}
              </div>

              {index < steps.length - 1 && (
                <div className="flex-1">
                  <div
                    className={`ml-2 h-0.5 ${
                      steps.findIndex((s) => s.id === currentStep) > index
                        ? "bg-blue-600 dark:bg-blue-400"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Main content */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {currentStep === "cart" && (
              <motion.div
                key="cart-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shopping Cart
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Review your items and proceed to checkout
                </p>

                {cartItems.length > 0 ? (
                  <ul className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
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
                ) : (
                  <div className="mt-6 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
                    <ShoppingCart className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                      Your cart is empty
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Start adding items to your cart to see them here.
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {currentStep === "shipping" && (
              <motion.div
                key="shipping-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shipping Information
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Enter your shipping address and select a shipping method
                </p>

                <div className="mt-6 rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
                        Shipping Address
                      </h3>
                    </div>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                      Edit
                    </button>
                  </div>

                  <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    <p>
                      {shippingAddress.firstName} {shippingAddress.lastName}
                    </p>
                    <p>{shippingAddress.address}</p>
                    <p>
                      {shippingAddress.city}, {shippingAddress.state}{" "}
                      {shippingAddress.zip}
                    </p>
                    <p>{shippingAddress.country}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Shipping Method
                  </h3>
                  <div className="mt-4 space-y-4">
                    {shippingOptions.map((option) => (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition-colors ${
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
                            <p className="text-sm text-gray-500 dark:text-gray-400">
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
              </motion.div>
            )}

            {currentStep === "payment" && (
              <motion.div
                key="payment-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Payment Method
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Select your preferred payment method
                </p>

                <div className="mt-6 space-y-4">
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition-colors ${
                      paymentMethod === "credit-card"
                        ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20"
                        : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={paymentMethod === "credit-card"}
                        onChange={() => setPaymentMethod("credit-card")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3 flex items-center">
                        <CreditCardIcon className="mr-2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Credit Card
                        </p>
                      </div>
                    </div>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-md border p-4 transition-colors ${
                      paymentMethod === "paypal"
                        ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20"
                        : "border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          PayPal
                        </p>
                      </div>
                    </div>
                  </label>

                  {paymentMethod === "credit-card" && (
                    <div className="mt-6 rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Expiration Date
                            </label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              CVC
                            </label>
                            <input
                              type="text"
                              placeholder="123"
                              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            placeholder="John Doe"
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-slate-700 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === "review" && (
              <motion.div
                key="review-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Review Your Order
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Please review your order details before placing your order
                </p>

                <div className="mt-6 space-y-6">
                  <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Items
                    </h3>
                    <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
                      {cartItems.map((item) => (
                        <li key={item.id} className="flex py-4">
                          <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
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
                            <div className="flex justify-between text-sm font-medium text-gray-900 dark:text-white">
                              <h4>{item.product.name}</h4>
                              <p className="ml-4">
                                {formatCurrency(
                                  item.product.price * item.quantity,
                                )}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
                          Shipping Address
                        </h3>
                      </div>
                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          {shippingAddress.firstName} {shippingAddress.lastName}
                        </p>
                        <p>{shippingAddress.address}</p>
                        <p>
                          {shippingAddress.city}, {shippingAddress.state}{" "}
                          {shippingAddress.zip}
                        </p>
                        <p>{shippingAddress.country}</p>
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                      <div className="flex items-center">
                        <Truck className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
                          Shipping Method
                        </h3>
                      </div>
                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        <p>{selectedShipping.name}</p>
                        <p>{selectedShipping.estimatedDelivery}</p>
                        <p className="mt-1 font-medium text-gray-900 dark:text-white">
                          {selectedShipping.price === 0
                            ? "Free"
                            : formatCurrency(selectedShipping.price)}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                      <div className="flex items-center">
                        <CreditCardIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
                          Payment Method
                        </h3>
                      </div>
                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          {paymentMethod === "credit-card"
                            ? "Credit Card"
                            : "PayPal"}
                        </p>
                        {paymentMethod === "credit-card" && (
                          <p>Ending in 3456</p>
                        )}
                      </div>
                    </div>

                    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900 dark:text-white">
                          Delivery Estimate
                        </h3>
                      </div>
                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        <p>
                          Estimated delivery within{" "}
                          {selectedShipping.estimatedDelivery}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={goToPreviousStep}
              className={`flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700 ${
                currentStep === "cart" ? "invisible" : ""
              }`}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </button>

            <button
              onClick={goToNextStep}
              className={`flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 ${
                currentStep === "review" ? "hidden" : ""
              }`}
            >
              {currentStep === "cart"
                ? "Proceed to Shipping"
                : currentStep === "shipping"
                  ? "Continue to Payment"
                  : "Review Order"}
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>

            {currentStep === "review" && (
              <button className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700">
                Place Order
                <Check className="ml-2 h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Order summary */}
        <div className="mt-8 lg:col-span-5 lg:mt-0">
          <div className="sticky top-4 rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-slate-800">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                <div className="text-base font-medium text-gray-900 dark:text-white">
                  Subtotal
                </div>
                <div className="text-base font-medium text-gray-900 dark:text-white">
                  {formatCurrency(subtotal)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Shipping
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedShipping.price === 0
                    ? "Free"
                    : formatCurrency(selectedShipping.price)}
                </div>
              </div>

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
                  Order total
                </div>
                <div className="text-base font-bold text-gray-900 dark:text-white">
                  {formatCurrency(total)}
                </div>
              </div>
            </div>

            {currentStep === "cart" && (
              <div className="mt-6">
                <div className="rounded-md bg-gray-50 p-4 dark:bg-slate-700">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Your order qualifies for free shipping with{" "}
                        {selectedShipping.name}. Select this option at checkout.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepCart;
