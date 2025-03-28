"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Globe,
  CreditCard,
  ChevronDown,
  ArrowLeft,
  Flag,
  MapPin,
  Truck,
} from "lucide-react";
import type { Product } from "@/data/products";
import {
  type CartItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
} from "@/lib/cart-utlis";

interface InternationalCartProps {
  products?: Product[];
  onClose?: () => void;
}

interface Country {
  code: string;
  name: string;
  flag: string;
  currency: {
    code: string;
    symbol: string;
    rate: number; // Exchange rate from USD
  };
  shipping: {
    available: boolean;
    cost: number;
    time: string;
  };
}

const countries: Country[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currency: {
      code: "USD",
      symbol: "$",
      rate: 1,
    },
    shipping: {
      available: true,
      cost: 0,
      time: "3-5 business days",
    },
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    currency: {
      code: "CAD",
      symbol: "C$",
      rate: 1.35,
    },
    shipping: {
      available: true,
      cost: 15,
      time: "5-7 business days",
    },
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    currency: {
      code: "GBP",
      symbol: "£",
      rate: 0.78,
    },
    shipping: {
      available: true,
      cost: 25,
      time: "7-10 business days",
    },
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    currency: {
      code: "AUD",
      symbol: "A$",
      rate: 1.48,
    },
    shipping: {
      available: true,
      cost: 30,
      time: "10-14 business days",
    },
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    currency: {
      code: "JPY",
      symbol: "¥",
      rate: 147.5,
    },
    shipping: {
      available: true,
      cost: 35,
      time: "10-14 business days",
    },
  },
];

const InternationalCart = ({
  products = [],
  onClose,
}: InternationalCartProps) => {
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

  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  });

  // Format price in selected currency
  const formatLocalPrice = (priceUSD: number) => {
    const localPrice = priceUSD * selectedCountry.currency.rate;

    // Format based on currency
    if (selectedCountry.currency.code === "JPY") {
      // JPY doesn't use decimal places
      return `${selectedCountry.currency.symbol}${Math.round(localPrice)}`;
    }

    return `${selectedCountry.currency.symbol}${localPrice.toFixed(2)}`;
  };

  // Calculate cart totals
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);
  const shippingCost = selectedCountry.shipping.cost;
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

          <div className="relative">
            <button
              className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
            >
              <span className="mr-1">{selectedCountry.flag}</span>
              <span>{selectedCountry.name}</span>
              <span className="ml-1 text-xs text-gray-500">
                ({selectedCountry.currency.code})
              </span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>

            <AnimatePresence>
              {isCountryDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                >
                  <div className="py-1">
                    {countries.map((country) => (
                      <button
                        key={country.code}
                        className={`flex w-full items-center px-4 py-2 text-left text-sm ${
                          selectedCountry.code === country.code
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsCountryDropdownOpen(false);
                        }}
                      >
                        <span className="mr-2 text-lg">{country.flag}</span>
                        <span>{country.name}</span>
                        <span className="ml-1 text-xs text-gray-500">
                          ({country.currency.code})
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Main content */}
          <div className="lg:col-span-7">
            {cartItems.length > 0 ? (
              <div>
                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Shopping Cart
                    </h2>
                    <span className="text-sm text-gray-500">
                      {cartItems.length}{" "}
                      {cartItems.length === 1 ? "item" : "items"}
                    </span>
                  </div>

                  <ul className="mt-6 divide-y divide-gray-200">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex py-6">
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
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.product.name}</h3>
                              <div className="text-right">
                                <p>
                                  {formatLocalPrice(
                                    item.product.price * item.quantity,
                                  )}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatCurrency(
                                    item.product.price * item.quantity,
                                  )}{" "}
                                  USD
                                </p>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.product.category}
                            </p>

                            {(item.selectedColor || item.selectedSize) && (
                              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                                {item.selectedColor && (
                                  <div className="flex items-center">
                                    <span>Color:</span>
                                    <span
                                      className="ml-1 inline-block h-3 w-3 rounded-full border border-gray-300"
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
                            <div className="flex items-center rounded-md border border-gray-200">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="rounded-l-md p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="rounded-r-md p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shipping Information
                  </h2>

                  <div className="mt-6 flex items-center rounded-md bg-blue-50 p-4">
                    <Globe className="h-6 w-6 text-blue-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">
                        International Shipping
                      </h3>
                      <p className="mt-1 text-sm text-blue-700">
                        Shipping to {selectedCountry.name}. Estimated delivery
                        time: {selectedCountry.shipping.time}.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.firstName}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            firstName: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.lastName}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            lastName: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Address
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.address}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            address: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            city: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State / Province / Region
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.state}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            state: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Postal code
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.zip}
                        onChange={(e) =>
                          setShippingAddress({
                            ...shippingAddress,
                            zip: e.target.value,
                          })
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <div className="mt-1 flex items-center rounded-md border border-gray-300 bg-white px-3 py-2">
                        <span className="mr-2 text-lg">
                          {selectedCountry.flag}
                        </span>
                        <span>{selectedCountry.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
          <div className="mt-16 lg:col-span-5 lg:mt-0">
            <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-medium text-gray-900">
                Order Summary
              </h2>

              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center">
                  <Flag className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">Country:</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-lg">{selectedCountry.flag}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedCountry.name}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">Currency:</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {selectedCountry.currency.code} (
                  {selectedCountry.currency.symbol})
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">
                    Shipping to:
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {selectedCountry.name}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-sm text-gray-500">
                    Delivery time:
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {selectedCountry.shipping.time}
                </span>
              </div>

              <div className="mt-6 space-y-4 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatLocalPrice(subtotal)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(subtotal)} USD
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {shippingCost === 0
                        ? "Free"
                        : formatLocalPrice(shippingCost)}
                    </p>
                    {shippingCost > 0 && (
                      <p className="text-xs text-gray-500">
                        {formatCurrency(shippingCost)} USD
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Taxes</p>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatLocalPrice(tax)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(tax)} USD
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <div className="text-right">
                    <p className="text-base font-bold text-gray-900">
                      {formatLocalPrice(total)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatCurrency(total)} USD
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full rounded-md bg-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
                  Proceed to Checkout
                </button>
              </div>

              <div className="mt-6 rounded-md bg-gray-50 p-4">
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <p className="ml-2 text-sm text-gray-500">
                    International orders may be subject to customs duties and
                    taxes upon arrival.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalCart;
