"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Heart,
  DollarSign,
  Leaf,
  Droplet,
  Utensils,
  Home,
} from "lucide-react";
import type { Product } from "@/data/products";
import {
  type CartItem,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
} from "@/lib/cart-utlis";

interface CharityCartProps {
  products?: Product[];
  onClose?: () => void;
}

interface Charity {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  image: string;
}

const CharityCart = ({ products = [], onClose }: CharityCartProps) => {
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

  const [selectedCharity, setSelectedCharity] = useState<string | null>(null);
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [customDonation, setCustomDonation] = useState<string>("");
  const [roundUp, setRoundUp] = useState<boolean>(false);

  // Available charities
  const charities: Charity[] = [
    {
      id: "environment",
      name: "Environmental Conservation",
      description: "Protecting forests and wildlife habitats around the world",
      icon: Leaf,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=120&width=200",
    },
    {
      id: "water",
      name: "Clean Water Initiative",
      description: "Providing clean water access to communities in need",
      icon: Droplet,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=120&width=200",
    },
    {
      id: "hunger",
      name: "Food for All",
      description: "Fighting hunger and food insecurity globally",
      icon: Utensils,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=120&width=200",
    },
    {
      id: "shelter",
      name: "Housing Support",
      description: "Building homes and providing shelter for those in need",
      icon: Home,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=120&width=200",
    },
  ];

  // Donation options
  const donationOptions = [1, 5, 10];

  // Calculate cart totals
  const subtotal = calculateSubtotal(cartItems);
  const tax = calculateTax(subtotal);

  // Calculate round up amount
  const calculateRoundUp = () => {
    const total = subtotal + tax;
    return Math.ceil(total) - total;
  };

  // Calculate total donation
  const totalDonation = () => {
    let amount = donationAmount;

    // Add custom donation if any
    if (customDonation && !isNaN(Number.parseFloat(customDonation))) {
      amount += Number.parseFloat(customDonation);
    }

    // Add round up amount if selected
    if (roundUp) {
      amount += calculateRoundUp();
    }

    return amount;
  };

  const donation = totalDonation();
  const total = calculateTotal(subtotal, tax, 0) + donation;

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

  // Handle donation option selection
  const selectDonationOption = (amount: number) => {
    setDonationAmount(amount);
    setCustomDonation("");
  };

  // Handle custom donation input
  const handleCustomDonationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;

    // Allow only numbers and decimal point
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setCustomDonation(value);
      setDonationAmount(0); // Clear preset options
    }
  };

  // Handle charity selection
  const selectCharity = (charityId: string) => {
    setSelectedCharity(charityId);
  };

  // Calculate impact metrics
  const calculateImpact = () => {
    const donation = totalDonation();

    // These are simplified examples - real metrics would be charity-specific
    return {
      trees: Math.floor(donation * 2),
      meals: Math.floor(donation * 4),
      waterGallons: Math.floor(donation * 10),
      shelterDays: Math.floor(donation),
    };
  };

  const impact = calculateImpact();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Your Cart
            </h1>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
          >
            Continue Shopping
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Main content */}
          <div className="lg:col-span-7">
            {/* Cart items */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Shopping Cart
              </h2>

              {cartItems.length > 0 ? (
                <ul className="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <li key={item.id} className="py-6">
                      <div className="flex">
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
                              <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
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
                                className="rounded-l-md p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-gray-800"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="w-8 text-center text-sm text-gray-700 dark:text-gray-300">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="rounded-r-md p-2 text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:hover:bg-gray-800"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-6 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
                  <ShoppingBag className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                    Your cart is empty
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Looks like you haven&apos;t added any products to your cart
                    yet.
                  </p>
                  <button className="mt-6 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700">
                    Browse Products
                  </button>
                </div>
              )}
            </div>

            {/* Charity selection */}
            <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Support a Cause
                </h2>
                <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Choose a charity to support with your purchase. 100% of your
                donation goes directly to the cause.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {charities.map((charity) => (
                  <div
                    key={charity.id}
                    className={`relative cursor-pointer rounded-lg border p-4 transition-colors ${
                      selectedCharity === charity.id
                        ? "border-green-600 bg-green-50 dark:border-green-500 dark:bg-green-900/20"
                        : "border-gray-200 hover:border-green-200 dark:border-gray-700 dark:hover:border-green-800"
                    }`}
                    onClick={() => selectCharity(charity.id)}
                  >
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        <charity.icon className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          {charity.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {charity.description}
                        </p>
                      </div>
                    </div>

                    {selectedCharity === charity.id && (
                      <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {selectedCharity && (
                <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-900/20">
                  <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                    {charities.find((c) => c.id === selectedCharity)?.name}
                  </h3>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {donationOptions.map((amount) => (
                      <button
                        key={amount}
                        className={`rounded-full px-4 py-1 text-sm font-medium ${
                          donationAmount === amount && customDonation === ""
                            ? "bg-green-600 text-white"
                            : "bg-white text-green-600 hover:bg-green-100 dark:bg-slate-800 dark:text-green-400 dark:hover:bg-slate-700"
                        }`}
                        onClick={() => selectDonationOption(amount)}
                      >
                        ${amount}
                      </button>
                    ))}

                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                      <input
                        type="text"
                        value={customDonation}
                        onChange={handleCustomDonationChange}
                        placeholder="Custom"
                        className={`w-24 rounded-full border py-1 pl-8 pr-2 text-sm ${
                          customDonation !== ""
                            ? "border-green-600 bg-green-600 text-white placeholder-white dark:border-green-500 dark:bg-green-600"
                            : "border-gray-300 bg-white text-gray-900 placeholder-gray-500 dark:border-gray-600 dark:bg-slate-800 dark:text-white dark:placeholder-gray-400"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center">
                    <input
                      id="round-up"
                      type="checkbox"
                      checked={roundUp}
                      onChange={() => setRoundUp(!roundUp)}
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 dark:border-gray-600 dark:bg-slate-700"
                    />
                    <label
                      htmlFor="round-up"
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      Round up to the nearest dollar (
                      {formatCurrency(calculateRoundUp())})
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Impact visualization */}
            {selectedCharity && donation > 0 && (
              <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Your Impact
                </h2>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Here&apos;s how your donation of {formatCurrency(donation)}{" "}
                  will help:
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {selectedCharity === "environment" && (
                    <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                      <Leaf className="mx-auto h-8 w-8 text-green-600 dark:text-green-400" />
                      <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
                        {impact.trees}
                      </p>
                      <p className="text-xs text-green-800 dark:text-green-300">
                        Trees Planted
                      </p>
                    </div>
                  )}

                  {selectedCharity === "water" && (
                    <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                      <Droplet className="mx-auto h-8 w-8 text-blue-600 dark:text-blue-400" />
                      <p className="mt-2 text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {impact.waterGallons}
                      </p>
                      <p className="text-xs text-blue-800 dark:text-blue-300">
                        Gallons of Clean Water
                      </p>
                    </div>
                  )}

                  {selectedCharity === "hunger" && (
                    <div className="rounded-lg bg-orange-50 p-4 text-center dark:bg-orange-900/20">
                      <Utensils className="mx-auto h-8 w-8 text-orange-600 dark:text-orange-400" />
                      <p className="mt-2 text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {impact.meals}
                      </p>
                      <p className="text-xs text-orange-800 dark:text-orange-300">
                        Meals Provided
                      </p>
                    </div>
                  )}

                  {selectedCharity === "shelter" && (
                    <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-900/20">
                      <Home className="mx-auto h-8 w-8 text-purple-600 dark:text-purple-400" />
                      <p className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {impact.shelterDays}
                      </p>
                      <p className="text-xs text-purple-800 dark:text-purple-300">
                        Shelter Days Funded
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="mt-16 lg:col-span-5 lg:mt-0">
            <div className="sticky top-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-slate-800">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Subtotal
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(subtotal)}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Shipping
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Free
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Taxes
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatCurrency(tax)}
                  </p>
                </div>

                {donation > 0 && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Donation
                    </p>
                    <p className="text-sm font-medium text-green-600 dark:text-green-400">
                      {formatCurrency(donation)}
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    Order total
                  </p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {formatCurrency(total)}
                  </p>
                </div>
              </div>

              {donation > 0 && (
                <div className="mt-6 rounded-md bg-green-50 p-4 dark:bg-green-900/20">
                  <div className="flex">
                    <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-300">
                        Thank you for your donation!
                      </h3>
                      <p className="mt-1 text-xs text-green-700 dark:text-green-400">
                        Your donation of {formatCurrency(donation)} to{" "}
                        {charities.find((c) => c.id === selectedCharity)?.name}{" "}
                        will make a real difference.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6">
                <button className="w-full rounded-md bg-green-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:bg-green-700">
                  Proceed to Checkout
                </button>
              </div>

              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                100% of your donation goes directly to your selected charity.
                You&apos;ll receive a tax receipt for your donation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityCart;
