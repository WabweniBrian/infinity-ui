"use client";

import React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Star,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const ProductComparisonTable = () => {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    basic: true,
    performance: true,
    features: true,
    connectivity: true,
    physical: true,
  });

  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [highlightedProduct, setHighlightedProduct] = useState<string | null>(
    null,
  );

  // Product data with row spanning for categories
  const products = [
    {
      id: "product1",
      name: "Premium Pro X",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      price: 1299,
      rating: 4.8,
      recommended: true,
      description:
        "Our flagship model with cutting-edge technology and premium features",
      color: "bg-gradient-to-r from-blue-500 to-purple-600",
    },
    {
      id: "product2",
      name: "Advanced Plus",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      price: 899,
      rating: 4.5,
      recommended: false,
      description:
        "High-performance model with advanced features at a competitive price",
      color: "bg-gradient-to-r from-cyan-500 to-blue-500",
    },
    {
      id: "product3",
      name: "Essential",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      price: 599,
      rating: 4.2,
      recommended: false,
      description: "Entry-level model with all the essential features you need",
      color: "bg-gradient-to-r from-green-500 to-teal-500",
    },
    {
      id: "product4",
      name: "Budget Friendly",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      price: 399,
      rating: 3.9,
      recommended: false,
      description: "Affordable option without compromising on quality",
      color: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
  ];

  // Feature categories with row spanning
  const featureCategories = [
    {
      id: "basic",
      name: "Basic Information",
      features: [
        {
          id: "processor",
          name: "Processor",
          tooltip: "Central processing unit that executes instructions",
          values: {
            product1: "Octa-core 3.2 GHz",
            product2: "Octa-core 2.8 GHz",
            product3: "Quad-core 2.4 GHz",
            product4: "Quad-core 2.0 GHz",
          },
        },
        {
          id: "memory",
          name: "Memory (RAM)",
          tooltip: "Random-access memory used for running applications",
          values: {
            product1: "16 GB",
            product2: "12 GB",
            product3: "8 GB",
            product4: "6 GB",
          },
        },
        {
          id: "storage",
          name: "Storage",
          tooltip: "Space for storing files and applications",
          values: {
            product1: "1 TB SSD",
            product2: "512 GB SSD",
            product3: "256 GB SSD",
            product4: "128 GB SSD",
          },
        },
      ],
    },
    {
      id: "performance",
      name: "Performance",
      features: [
        {
          id: "benchmark",
          name: "Benchmark Score",
          tooltip: "Standardized performance measurement",
          values: {
            product1: "12,500",
            product2: "10,200",
            product3: "8,100",
            product4: "6,300",
          },
        },
        {
          id: "graphics",
          name: "Graphics",
          tooltip: "Graphics processing capabilities",
          values: {
            product1: "Dedicated GPU 8GB",
            product2: "Dedicated GPU 6GB",
            product3: "Integrated Graphics",
            product4: "Integrated Graphics",
          },
        },
        {
          id: "cooling",
          name: "Cooling System",
          tooltip: "System for managing device temperature",
          values: {
            product1: "Advanced Liquid Cooling",
            product2: "Dual Fan System",
            product3: "Single Fan",
            product4: "Passive Cooling",
          },
        },
      ],
    },
    {
      id: "features",
      name: "Special Features",
      features: [
        {
          id: "ai",
          name: "AI Capabilities",
          tooltip: "Artificial intelligence processing features",
          values: {
            product1: true,
            product2: true,
            product3: false,
            product4: false,
          },
        },
        {
          id: "biometric",
          name: "Biometric Security",
          tooltip: "Security features using biological characteristics",
          values: {
            product1: true,
            product2: true,
            product3: true,
            product4: false,
          },
        },
        {
          id: "voicecontrol",
          name: "Voice Control",
          tooltip: "Ability to control device with voice commands",
          values: {
            product1: true,
            product2: true,
            product3: true,
            product4: true,
          },
        },
        {
          id: "waterproof",
          name: "Water Resistance",
          tooltip: "Protection against water damage",
          values: {
            product1: true,
            product2: true,
            product3: false,
            product4: false,
          },
        },
      ],
    },
    {
      id: "connectivity",
      name: "Connectivity",
      features: [
        {
          id: "wifi",
          name: "Wi-Fi",
          tooltip: "Wireless networking capabilities",
          values: {
            product1: "Wi-Fi 6E",
            product2: "Wi-Fi 6",
            product3: "Wi-Fi 5",
            product4: "Wi-Fi 5",
          },
        },
        {
          id: "bluetooth",
          name: "Bluetooth",
          tooltip: "Short-range wireless technology standard",
          values: {
            product1: "Bluetooth 5.2",
            product2: "Bluetooth 5.1",
            product3: "Bluetooth 5.0",
            product4: "Bluetooth 4.2",
          },
        },
        {
          id: "ports",
          name: "Ports",
          tooltip: "Physical connection interfaces",
          values: {
            product1: "4× USB-C, HDMI, Card Reader",
            product2: "3× USB-C, HDMI",
            product3: "2× USB-C, 1× USB-A",
            product4: "1× USB-C, 2× USB-A",
          },
        },
      ],
    },
    {
      id: "physical",
      name: "Physical Specifications",
      features: [
        {
          id: "weight",
          name: "Weight",
          tooltip: "Device weight",
          values: {
            product1: "1.8 kg",
            product2: "1.9 kg",
            product3: "2.1 kg",
            product4: "2.3 kg",
          },
        },
        {
          id: "dimensions",
          name: "Dimensions",
          tooltip: "Physical size of the device",
          values: {
            product1: "35.6 × 24.8 × 1.6 cm",
            product2: "35.8 × 25.0 × 1.8 cm",
            product3: "36.2 × 25.4 × 2.0 cm",
            product4: "36.5 × 25.8 × 2.2 cm",
          },
        },
        {
          id: "battery",
          name: "Battery Life",
          tooltip: "Expected battery duration",
          values: {
            product1: "Up to 12 hours",
            product2: "Up to 10 hours",
            product3: "Up to 8 hours",
            product4: "Up to 6 hours",
          },
        },
      ],
    },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white px-4 py-10 dark:bg-gray-950">
      {/* DarkMode Toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Product Comparison
          </h2>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Compare features across different models
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="w-48 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                  Features
                </th>
                {products.map((product) => (
                  <th
                    key={product.id}
                    className={`bg-gray-50 px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-700 dark:text-gray-400 ${
                      highlightedProduct === product.id
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : ""
                    }`}
                    onMouseEnter={() => setHighlightedProduct(product.id)}
                    onMouseLeave={() => setHighlightedProduct(null)}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`mb-3 h-1 w-full rounded-full ${product.color}`}
                      ></div>
                      <Image
                        src={
                          product.image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={product.name}
                        width={64}
                        height={64}
                        className="mb-2 h-16 w-16 object-contain"
                      />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {product.name}
                      </span>
                      {product.recommended && (
                        <span className="mt-1 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Recommended
                        </span>
                      )}
                      <div className="mt-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : i < product.rating
                                  ? "fill-yellow-400 text-yellow-400 opacity-50"
                                  : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                          {product.rating}
                        </span>
                      </div>
                      <div className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                        {formatPrice(product.price)}
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                        {product.description}
                      </p>
                      <button className="mt-3 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-600">
                        <ShoppingCart className="mr-1 h-4 w-4" />
                        Add to Cart
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {featureCategories.map((category) => (
                <React.Fragment key={category.id}>
                  {/* Category Header */}
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <td
                      colSpan={products.length + 1}
                      className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center">
                        {expandedCategories[category.id] ? (
                          <ChevronDown className="mr-2 h-4 w-4" />
                        ) : (
                          <ChevronUp className="mr-2 h-4 w-4" />
                        )}
                        {category.name}
                      </div>
                    </td>
                  </tr>

                  {/* Category Features */}
                  {expandedCategories[category.id] &&
                    category.features.map((feature) => (
                      <tr
                        key={feature.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <span>{feature.name}</span>
                            <div className="relative">
                              <button
                                className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                onMouseEnter={() => setShowTooltip(feature.id)}
                                onMouseLeave={() => setShowTooltip(null)}
                              >
                                <HelpCircle className="h-4 w-4" />
                              </button>
                              {showTooltip === feature.id && (
                                <div className="absolute left-8 top-0 z-10 w-64 rounded-lg bg-gray-900 p-3 text-sm text-white shadow-lg dark:bg-gray-800">
                                  <div className="whitespace-normal break-words">
                                    {feature.tooltip}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        {products.map((product) => {
                          const value =
                            feature.values[
                              product.id as keyof typeof feature.values
                            ];
                          return (
                            <td
                              key={`${feature.id}-${product.id}`}
                              className={`whitespace-nowrap px-6 py-4 text-center text-sm ${
                                highlightedProduct === product.id
                                  ? "bg-blue-50 dark:bg-blue-900/20"
                                  : ""
                              }`}
                            >
                              {typeof value === "boolean" ? (
                                value ? (
                                  <div className="flex justify-center">
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                      }}
                                      className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30"
                                    >
                                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    </motion.div>
                                  </div>
                                ) : (
                                  <div className="flex justify-center">
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                      }}
                                      className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30"
                                    >
                                      <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                                    </motion.div>
                                  </div>
                                )
                              ) : (
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {value}
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          height: 0.5rem;
          width: 0.5rem;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default ProductComparisonTable;
