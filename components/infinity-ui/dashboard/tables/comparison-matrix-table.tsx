"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, HelpCircle } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  features: Record<string, boolean | string | number>;
}

interface ComparisonMatrixTableProps {
  features: Feature[];
  products: Product[];
  title?: string;
  subtitle?: string;
}

// Default data
const defaultFeatures: Feature[] = [
  {
    id: "f1",
    name: "Real-time collaboration",
    description: "Work together with team members in real-time",
    category: "Collaboration",
  },
  {
    id: "f2",
    name: "Version history",
    description: "Track changes and restore previous versions",
    category: "Content Management",
  },
  {
    id: "f3",
    name: "Custom templates",
    description: "Create and save custom templates",
    category: "Customization",
  },
  {
    id: "f4",
    name: "API access",
    description: "Programmatic access to platform features",
    category: "Integration",
  },
  {
    id: "f5",
    name: "Mobile app",
    description: "Native mobile applications for iOS and Android",
    category: "Accessibility",
  },
  {
    id: "f6",
    name: "Offline mode",
    description: "Work without an internet connection",
    category: "Accessibility",
  },
  {
    id: "f7",
    name: "Single sign-on",
    description: "Enterprise-grade security with SSO",
    category: "Security",
  },
  {
    id: "f8",
    name: "Two-factor authentication",
    description: "Additional security layer for account access",
    category: "Security",
  },
  {
    id: "f9",
    name: "Custom domains",
    description: "Use your own domain for published content",
    category: "Customization",
  },
  {
    id: "f10",
    name: "Analytics",
    description: "Track performance and user engagement",
    category: "Reporting",
  },
];

const defaultProducts: Product[] = [
  {
    id: "p1",
    name: "Product A",
    description: "Enterprise solution with advanced features",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    features: {
      f1: true,
      f2: true,
      f3: true,
      f4: true,
      f5: true,
      f6: true,
      f7: true,
      f8: true,
      f9: true,
      f10: true,
    },
  },
  {
    id: "p2",
    name: "Product B",
    description: "Mid-tier solution with essential features",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    features: {
      f1: true,
      f2: true,
      f3: true,
      f4: true,
      f5: true,
      f6: false,
      f7: false,
      f8: true,
      f9: false,
      f10: true,
    },
  },
  {
    id: "p3",
    name: "Product C",
    description: "Budget-friendly option for small teams",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    features: {
      f1: true,
      f2: true,
      f3: false,
      f4: false,
      f5: true,
      f6: false,
      f7: false,
      f8: false,
      f9: false,
      f10: false,
    },
  },
  {
    id: "p4",
    name: "Product D",
    description: "Specialized solution for specific use cases",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    features: {
      f1: false,
      f2: true,
      f3: true,
      f4: true,
      f5: false,
      f6: true,
      f7: true,
      f8: true,
      f9: true,
      f10: true,
    },
  },
];

const ComparisonMatrixTable = ({
  features = defaultFeatures,
  products = defaultProducts,
  title = "Product Comparison",
  subtitle = "Compare features across different products",
}: ComparisonMatrixTableProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [tooltipFeature, setTooltipFeature] = useState<string | null>(null);

  // Get unique categories
  const categories = Array.from(
    new Set(features.map((feature) => feature.category)),
  );

  // Filter features by active category
  const filteredFeatures = activeCategory
    ? features.filter((feature) => feature.category === activeCategory)
    : features;

  return (
    <div className="min-h-screen overflow-hidden bg-white px-4 py-10 dark:bg-gray-950">
      {/* DarkMode Toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="mt-1 text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
              activeCategory === null
                ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
                : "dark:hover:bg-gray-650 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
            }`}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
                  : "dark:hover:bg-gray-650 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="sticky left-0 z-10 min-w-[200px] border-r border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                >
                  Feature
                </th>
                {products.map((product) => (
                  <th
                    key={product.id}
                    scope="col"
                    className="min-w-[150px] px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    <div className="flex flex-col items-center">
                      <Image
                        src={
                          product.logo ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={product.name}
                        width={32}
                        height={32}
                        className="mb-2 h-8 w-8 rounded-full"
                      />
                      <span>{product.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {filteredFeatures.map((feature, featureIdx) => (
                <tr
                  key={feature.id}
                  className={
                    featureIdx % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700"
                  }
                >
                  <td className="sticky left-0 z-10 whitespace-nowrap border-r border-gray-200 bg-inherit px-6 py-4 text-sm font-medium text-gray-900 dark:border-gray-700 dark:text-white">
                    <div className="flex items-center">
                      <span>{feature.name}</span>
                      <div className="relative">
                        <button
                          className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          onMouseEnter={() => setTooltipFeature(feature.id)}
                          onMouseLeave={() => setTooltipFeature(null)}
                        >
                          <HelpCircle className="h-4 w-4" />
                        </button>
                        {tooltipFeature === feature.id && (
                          <div className="absolute bottom-full left-8 z-20 w-64 rounded-lg bg-gray-900 p-3 text-sm text-white shadow-lg dark:bg-gray-800">
                            <div className="whitespace-normal break-words">
                              {feature.description}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  {products.map((product) => {
                    const hasFeature = product.features[feature.id];
                    return (
                      <td
                        key={`${product.id}-${feature.id}`}
                        className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                      >
                        {typeof hasFeature === "boolean" ? (
                          hasFeature ? (
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
                          <span>{hasFeature}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
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

export default ComparisonMatrixTable;
