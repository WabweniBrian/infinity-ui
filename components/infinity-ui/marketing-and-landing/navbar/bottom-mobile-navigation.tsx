"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Home,
  Search,
  Heart,
  ShoppingBag,
  User,
  X,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react";
import Image from "next/image";

const BottomMobileNavigation = () => {
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const togglePanel = (panel: string) => {
    if (activePanel === panel) {
      setActivePanel(null);
    } else {
      setActivePanel(panel);
    }
  };

  const toggleAccordion = (accordion: string) => {
    if (activeAccordion === accordion) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(accordion);
    }
  };

  const navItems = [
    {
      name: "Home",
      icon: <Home className="h-6 w-6" />,
      panel: null,
      href: "/",
    },
    { name: "Search", icon: <Search className="h-6 w-6" />, panel: "search" },
    {
      name: "Wishlist",
      icon: <Heart className="h-6 w-6" />,
      panel: "wishlist",
    },
    { name: "Cart", icon: <ShoppingBag className="h-6 w-6" />, panel: "cart" },
    { name: "Account", icon: <User className="h-6 w-6" />, panel: "account" },
  ];

  const categories = [
    {
      name: "Clothing",
      subcategories: ["T-Shirts", "Shirts", "Pants", "Jackets"],
    },
    {
      name: "Shoes",
      subcategories: ["Sneakers", "Boots", "Sandals", "Formal"],
    },
    {
      name: "Accessories",
      subcategories: ["Watches", "Bags", "Sunglasses", "Jewelry"],
    },
    {
      name: "Beauty",
      subcategories: ["Skincare", "Makeup", "Fragrance", "Hair"],
    },
  ];

  const wishlistItems = [
    {
      id: 1,
      name: "Premium Leather Jacket",
      price: "$199.99",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoCH9hebL5viIzPn7DJtm4WQfEosSFCkOZuYcj",
    },
    {
      id: 2,
      name: "Wireless Noise-Cancelling Headphones",
      price: "$149.99",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoOGdUTbuESu7HVtwxD35N20KedygBWohmp8lG",
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      price: "$89.99",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoLtQbSx92btexfpgAjKLEUq3onTiJ8cDy1dHG",
    },
  ];

  const cartItems = [
    {
      id: 1,
      name: "Casual Cotton T-Shirt",
      price: "$29.99",
      quantity: 2,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoepckVTBGZljIQpV8xdfgatbs5J3rcz1Tw6F2",
    },
    {
      id: 2,
      name: "Running Shoes",
      price: "$119.99",
      quantity: 1,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9yponirM9rkZTfiFCGP2SjpuR60dcYLrWkal19K3",
    },
  ];

  return (
    <div className="relative min-h-screen pb-16 md:pb-0">
      {/* Main content area */}
      <main className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Bottom Mobile Navigation
          </h2>
          <p className="mb-2 text-gray-600">
            This navigation is optimized for mobile devices with a fixed bottom
            bar and slide-up panels.
          </p>
          <p className="text-gray-600">
            Try clicking on the navigation icons at the bottom of the screen to
            see the slide-up panels.
          </p>
        </div>
      </main>

      {/* Bottom navigation bar - visible on all screen sizes for demo purposes */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200 bg-white">
        <div className="grid h-16 grid-cols-5">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => item.panel && togglePanel(item.panel)}
              className={`flex flex-col items-center justify-center ${
                activePanel === item.panel
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              aria-label={item.name}
            >
              {item.icon}
              <span className="mt-1 text-xs">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Slide-up panels */}
      <AnimatePresence>
        {activePanel && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-20 overflow-auto bg-white pb-16"
          >
            {/* Panel header */}
            <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold">
                  {activePanel.charAt(0).toUpperCase() + activePanel.slice(1)}
                </h2>
                <button
                  onClick={() => setActivePanel(null)}
                  className="rounded-full p-2 hover:bg-gray-100"
                  aria-label="Close panel"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Panel content */}
            <div className="p-4">
              {activePanel === "search" && (
                <div>
                  <div className="mb-6">
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                      Popular Categories
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {categories.map((category) => (
                        <button
                          key={category.name}
                          onClick={() => toggleAccordion(category.name)}
                          className="text-left"
                        >
                          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 hover:bg-gray-100">
                            <span className="font-medium">{category.name}</span>
                            {activeAccordion === category.name ? (
                              <Minus className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Plus className="h-4 w-4 text-gray-500" />
                            )}
                          </div>

                          <AnimatePresence>
                            {activeAccordion === category.name && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-1 py-2 pl-3">
                                  {category.subcategories.map((sub) => (
                                    <Link
                                      key={sub}
                                      href="#"
                                      className="block py-2 text-gray-600 hover:text-gray-900"
                                    >
                                      {sub}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                      Recent Searches
                    </h3>
                    <div className="space-y-2">
                      <button className="flex items-center text-gray-600 hover:text-gray-900">
                        <Search className="mr-2 h-4 w-4 text-gray-400" />
                        <span>Wireless headphones</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-gray-900">
                        <Search className="mr-2 h-4 w-4 text-gray-400" />
                        <span>Running shoes</span>
                      </button>
                      <button className="flex items-center text-gray-600 hover:text-gray-900">
                        <Search className="mr-2 h-4 w-4 text-gray-400" />
                        <span>Smart watch</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activePanel === "wishlist" && (
                <div>
                  {wishlistItems.length > 0 ? (
                    <div className="space-y-4">
                      {wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center rounded-lg bg-gray-50 p-3"
                        >
                          <Image
                            src={
                              item.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={item.name}
                            width={80}
                            height={80}
                            className="h-20 w-20 rounded-md object-cover"
                          />
                          <div className="ml-4 flex-grow">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-gray-600">{item.price}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                              <ShoppingBag className="h-5 w-5" />
                            </button>
                            <button className="p-2 text-red-500 hover:text-red-700">
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      <button className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700">
                        Add All to Cart
                      </button>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <Heart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <h3 className="mb-2 text-lg font-medium text-gray-900">
                        Your wishlist is empty
                      </h3>
                      <p className="mb-6 text-gray-600">
                        Save items you love to your wishlist
                      </p>
                      <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activePanel === "cart" && (
                <div>
                  {cartItems.length > 0 ? (
                    <div>
                      <div className="mb-6 space-y-4">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center rounded-lg bg-gray-50 p-3"
                          >
                            <Image
                              src={
                                item.image ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                              }
                              alt={item.name}
                              width={80}
                              height={80}
                              className="h-20 w-20 rounded-md object-cover"
                            />
                            <div className="ml-4 flex-grow">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-gray-600">{item.price}</p>
                              <div className="mt-2 flex items-center">
                                <button className="rounded-full bg-gray-200 p-1 text-gray-700">
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="mx-3">{item.quantity}</span>
                                <button className="rounded-full bg-gray-200 p-1 text-gray-700">
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <button className="p-2 text-gray-500 hover:text-gray-700">
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-200 pb-6 pt-4">
                        <div className="mb-2 flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">$179.97</span>
                        </div>
                        <div className="mb-2 flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span className="font-medium">$5.99</span>
                        </div>
                        <div className="mt-4 flex justify-between text-lg font-semibold">
                          <span>Total</span>
                          <span>$185.96</span>
                        </div>
                      </div>

                      <button className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition-colors hover:bg-blue-700">
                        Checkout
                      </button>
                    </div>
                  ) : (
                    <div className="py-8 text-center">
                      <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-300" />
                      <h3 className="mb-2 text-lg font-medium text-gray-900">
                        Your cart is empty
                      </h3>
                      <p className="mb-6 text-gray-600">
                        Add items to your cart to checkout
                      </p>
                      <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
                        Start Shopping
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activePanel === "account" && (
                <div>
                  <div className="mb-6 rounded-lg bg-gray-50 py-6 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
                      <User className="h-10 w-10 text-gray-500" />
                    </div>
                    <h3 className="mb-1 text-lg font-medium text-gray-900">
                      Welcome
                    </h3>
                    <p className="mb-4 text-gray-600">
                      Sign in to your account
                    </p>
                    <div className="flex justify-center space-x-3">
                      <button className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700">
                        Sign In
                      </button>
                      <button className="rounded-lg border border-gray-300 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                        Register
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="#"
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 hover:bg-gray-100"
                    >
                      <span className="font-medium">Orders</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 hover:bg-gray-100"
                    >
                      <span className="font-medium">Addresses</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 hover:bg-gray-100"
                    >
                      <span className="font-medium">Payment Methods</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 hover:bg-gray-100"
                    >
                      <span className="font-medium">Settings</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 hover:bg-gray-100"
                    >
                      <span className="font-medium">Help Center</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BottomMobileNavigation;
