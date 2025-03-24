/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  HelpCircle,
  Minus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

// Types for our data
interface FeatureCategory {
  id: string;
  name: string;
  features: Feature[];
}

interface Feature {
  id: string;
  name: string;
  description: string;
  categoryId: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
  };
  logo?: string;
  highlighted?: boolean;
}

interface FeatureSupport {
  productId: string;
  featureId: string;
  supported: boolean | string | null;
  notes?: string;
}

const ComparisonMatrixTable = () => {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({});
  const [searchTerm, setSearchTerm] = useState("");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">(
    "monthly",
  );
  const [showTooltip, setShowTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    content: string;
  }>({ visible: false, x: 0, y: 0, content: "" });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  // Check if system prefers dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Sample data for products
  const products: Product[] = [
    {
      id: "basic",
      name: "Basic Plan",
      description: "Essential features for individuals and small teams",
      price: {
        monthly: 9.99,
        annually: 99.99,
      },
    },
    {
      id: "pro",
      name: "Pro Plan",
      description: "Advanced features for growing businesses",
      price: {
        monthly: 29.99,
        annually: 299.99,
      },
      highlighted: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Complete solution for large organizations",
      price: {
        monthly: 99.99,
        annually: 999.99,
      },
    },
  ];

  // Sample data for feature categories
  const featureCategories: FeatureCategory[] = [
    {
      id: "core",
      name: "Core Features",
      features: [
        {
          id: "feature1",
          name: "Multi-platform Support",
          description: "Access the application from any device or platform",
          categoryId: "core",
        },
        {
          id: "feature2",
          name: "Cloud Storage",
          description: "Store your data securely in the cloud",
          categoryId: "core",
        },
        {
          id: "feature3",
          name: "Offline Mode",
          description: "Continue working without an internet connection",
          categoryId: "core",
        },
      ],
    },
    {
      id: "collaboration",
      name: "Collaboration",
      features: [
        {
          id: "feature4",
          name: "Team Workspaces",
          description: "Create dedicated spaces for different teams",
          categoryId: "collaboration",
        },
        {
          id: "feature5",
          name: "Real-time Editing",
          description: "Collaborate on documents in real-time",
          categoryId: "collaboration",
        },
        {
          id: "feature6",
          name: "Comments & Annotations",
          description: "Add comments and feedback directly to content",
          categoryId: "collaboration",
        },
      ],
    },
    {
      id: "security",
      name: "Security & Compliance",
      features: [
        {
          id: "feature7",
          name: "Two-factor Authentication",
          description: "Add an extra layer of security to your account",
          categoryId: "security",
        },
        {
          id: "feature8",
          name: "Role-based Access Control",
          description: "Define permissions based on user roles",
          categoryId: "security",
        },
        {
          id: "feature9",
          name: "Audit Logs",
          description: "Track all activities within your account",
          categoryId: "security",
        },
        {
          id: "feature10",
          name: "GDPR Compliance",
          description: "Features to help maintain GDPR compliance",
          categoryId: "security",
        },
      ],
    },
    {
      id: "integration",
      name: "Integrations",
      features: [
        {
          id: "feature11",
          name: "API Access",
          description: "Connect with other applications via API",
          categoryId: "integration",
        },
        {
          id: "feature12",
          name: "Third-party App Connections",
          description: "Connect with popular third-party applications",
          categoryId: "integration",
        },
        {
          id: "feature13",
          name: "Custom Webhooks",
          description: "Create custom webhooks for automated workflows",
          categoryId: "integration",
        },
      ],
    },
    {
      id: "support",
      name: "Support & Training",
      features: [
        {
          id: "feature14",
          name: "24/7 Support",
          description: "Get help anytime, day or night",
          categoryId: "support",
        },
        {
          id: "feature15",
          name: "Dedicated Account Manager",
          description: "Work with a dedicated account manager",
          categoryId: "support",
        },
        {
          id: "feature16",
          name: "Training Sessions",
          description: "Access to live training sessions",
          categoryId: "support",
        },
        {
          id: "feature17",
          name: "Knowledge Base",
          description: "Access to comprehensive documentation",
          categoryId: "support",
        },
      ],
    },
  ];

  // Sample data for feature support
  const featureSupport: FeatureSupport[] = [
    // Core Features
    { productId: "basic", featureId: "feature1", supported: true },
    { productId: "pro", featureId: "feature1", supported: true },
    { productId: "enterprise", featureId: "feature1", supported: true },

    { productId: "basic", featureId: "feature2", supported: "5 GB" },
    { productId: "pro", featureId: "feature2", supported: "50 GB" },
    { productId: "enterprise", featureId: "feature2", supported: "Unlimited" },

    { productId: "basic", featureId: "feature3", supported: false },
    { productId: "pro", featureId: "feature3", supported: true },
    { productId: "enterprise", featureId: "feature3", supported: true },

    // Collaboration
    { productId: "basic", featureId: "feature4", supported: "1 workspace" },
    { productId: "pro", featureId: "feature4", supported: "5 workspaces" },
    { productId: "enterprise", featureId: "feature4", supported: "Unlimited" },

    { productId: "basic", featureId: "feature5", supported: false },
    { productId: "pro", featureId: "feature5", supported: true },
    { productId: "enterprise", featureId: "feature5", supported: true },

    { productId: "basic", featureId: "feature6", supported: true },
    { productId: "pro", featureId: "feature6", supported: true },
    { productId: "enterprise", featureId: "feature6", supported: true },

    // Security & Compliance
    { productId: "basic", featureId: "feature7", supported: false },
    { productId: "pro", featureId: "feature7", supported: true },
    { productId: "enterprise", featureId: "feature7", supported: true },

    { productId: "basic", featureId: "feature8", supported: false },
    { productId: "pro", featureId: "feature8", supported: "Basic" },
    { productId: "enterprise", featureId: "feature8", supported: "Advanced" },

    { productId: "basic", featureId: "feature9", supported: false },
    { productId: "pro", featureId: "feature9", supported: "30 days" },
    { productId: "enterprise", featureId: "feature9", supported: "1 year" },

    { productId: "basic", featureId: "feature10", supported: true },
    { productId: "pro", featureId: "feature10", supported: true },
    { productId: "enterprise", featureId: "feature10", supported: true },

    // Integrations
    { productId: "basic", featureId: "feature11", supported: false },
    { productId: "pro", featureId: "feature11", supported: "Limited" },
    { productId: "enterprise", featureId: "feature11", supported: "Full" },

    { productId: "basic", featureId: "feature12", supported: "5 apps" },
    { productId: "pro", featureId: "feature12", supported: "20 apps" },
    { productId: "enterprise", featureId: "feature12", supported: "Unlimited" },

    { productId: "basic", featureId: "feature13", supported: false },
    { productId: "pro", featureId: "feature13", supported: true },
    { productId: "enterprise", featureId: "feature13", supported: true },

    // Support & Training
    { productId: "basic", featureId: "feature14", supported: false },
    { productId: "pro", featureId: "feature14", supported: false },
    { productId: "enterprise", featureId: "feature14", supported: true },

    { productId: "basic", featureId: "feature15", supported: false },
    { productId: "pro", featureId: "feature15", supported: false },
    { productId: "enterprise", featureId: "feature15", supported: true },

    { productId: "basic", featureId: "feature16", supported: false },
    { productId: "pro", featureId: "feature16", supported: "Monthly" },
    { productId: "enterprise", featureId: "feature16", supported: "Weekly" },

    { productId: "basic", featureId: "feature17", supported: true },
    { productId: "pro", featureId: "feature17", supported: true },
    { productId: "enterprise", featureId: "feature17", supported: true },
  ];

  // Initialize expanded state for all categories
  useEffect(() => {
    const initialExpandedState = featureCategories.reduce(
      (acc, category) => {
        acc[category.id] = true;
        return acc;
      },
      {} as Record<string, boolean>,
    );
    setExpandedCategories(initialExpandedState);
  }, []);

  // Toggle category expansion
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Calculate savings percentage
  const calculateSavings = (product: Product) => {
    const monthlyAnnual = product.price.monthly * 12;
    const annually = product.price.annually;
    return Math.round((1 - annually / monthlyAnnual) * 100);
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  // Get feature support for a product
  const getFeatureSupport = (productId: string, featureId: string) => {
    return featureSupport.find(
      (fs) => fs.productId === productId && fs.featureId === featureId,
    );
  };

  // Render feature support
  const renderFeatureSupport = (support: FeatureSupport | undefined) => {
    if (!support)
      return <Minus className="h-5 w-5 text-gray-400 dark:text-gray-500" />;

    if (typeof support.supported === "boolean") {
      return support.supported ? (
        <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
      ) : (
        <X className="h-5 w-5 text-red-500 dark:text-red-400" />
      );
    }

    return (
      <span className="text-sm text-gray-900 dark:text-white">
        {support.supported}
      </span>
    );
  };

  // Filter features based on search term
  const getFilteredFeatures = () => {
    if (!searchTerm) return featureCategories;

    return featureCategories
      .map((category) => {
        const filteredFeatures = category.features.filter(
          (feature) =>
            feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feature.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
        );

        return {
          ...category,
          features: filteredFeatures,
        };
      })
      .filter((category) => category.features.length > 0);
  };

  const filteredFeatures = getFilteredFeatures();

  // Handle tooltip display
  const handleShowTooltip = (e: React.MouseEvent, content: string) => {
    setShowTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      content,
    });
  };

  const handleHideTooltip = () => {
    setShowTooltip({ ...showTooltip, visible: false });
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
        {/* Header */}
        <div className="flex flex-col items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700 sm:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Product Comparison
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Compare features across different plans
            </p>
          </div>

          <div className="mt-4 flex items-center space-x-2 sm:mt-0">
            <div className="flex items-center">
              <span
                className={`text-sm font-medium ${billingCycle === "monthly" ? "text-gray-800 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
              >
                Monthly
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  setBillingCycle((prev) =>
                    prev === "monthly" ? "annually" : "monthly",
                  )
                }
                className="relative mx-3 flex h-6 w-12 items-center rounded-full bg-gray-200 p-1 transition-colors duration-300 dark:bg-gray-700"
              >
                <motion.div
                  className="h-4 w-4 rounded-full bg-blue-600 dark:bg-blue-500"
                  animate={{ x: billingCycle === "monthly" ? 0 : 24 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </motion.button>

              <div className="flex items-center">
                <span
                  className={`text-sm font-medium ${billingCycle === "annually" ? "text-gray-800 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
                >
                  Annually
                </span>

                {billingCycle === "annually" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    Save up to 20%
                  </motion.div>
                )}
              </div>
            </div>

            <button
              onClick={toggleDarkMode}
              className="rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              {isDarkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700">
          <div className="relative min-w-[240px] flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-blue-400"
              placeholder="Search features..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-400">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Customize
            </button>
            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-blue-400">
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Product Headers */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="w-64 bg-white px-6 py-6 text-left dark:bg-gray-800"></th>
                {products.map((product) => (
                  <th
                    key={product.id}
                    className={`px-6 py-6 text-center ${
                      product.highlighted
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "bg-white dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {product.description}
                      </p>
                      <div className="mt-4 flex items-baseline">
                        <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                          {formatPrice(product.price[billingCycle])}
                        </span>
                        <span className="ml-1 text-xl font-medium text-gray-500 dark:text-gray-400">
                          /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                      </div>
                      {billingCycle === "annually" && (
                        <div className="mt-1 text-sm text-green-600 dark:text-green-400">
                          Save {calculateSavings(product)}%
                        </div>
                      )}
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-medium ${
                          product.highlighted
                            ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        } transition-colors duration-200`}
                      >
                        Get started
                      </motion.button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredFeatures.map((category) => (
                <React.Fragment key={category.id}>
                  {/* Category Header */}
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <td
                      colSpan={products.length + 1}
                      className="cursor-pointer px-6 py-3"
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {expandedCategories[category.id] ? (
                            <ChevronDown className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <ChevronUp className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                          )}
                          <span className="font-medium text-gray-900 dark:text-white">
                            {category.name}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>

                  {/* Category Features */}
                  {expandedCategories[category.id] &&
                    category.features.map((feature) => (
                      <tr
                        key={feature.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center">
                            <span>{feature.name}</span>
                            <button
                              className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              onClick={() => setSelectedFeature(feature)}
                              onMouseEnter={(e) =>
                                handleShowTooltip(e, feature.description)
                              }
                              onMouseLeave={handleHideTooltip}
                            >
                              <HelpCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                        {products.map((product) => (
                          <td
                            key={`${feature.id}-${product.id}`}
                            className={`px-6 py-4 text-center ${
                              product.highlighted
                                ? "bg-blue-50 dark:bg-blue-900/20"
                                : ""
                            }`}
                          >
                            <div className="flex items-center justify-center">
                              {renderFeatureSupport(
                                getFeatureSupport(product.id, feature.id),
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Feature Detail Modal */}
        <AnimatePresence>
          {selectedFeature && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {selectedFeature.name}
                  </h3>
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  {selectedFeature.description}
                </p>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Availability by Plan
                  </h4>
                  <div className="mt-2 space-y-2">
                    {products.map((product) => {
                      const support = getFeatureSupport(
                        product.id,
                        selectedFeature.id,
                      );
                      return (
                        <div
                          key={product.id}
                          className="flex items-center justify-between rounded-md border border-gray-200 p-3 dark:border-gray-700"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </span>
                          <div className="flex items-center">
                            {typeof support?.supported === "boolean" ? (
                              support.supported ? (
                                <span className="flex items-center text-green-600 dark:text-green-400">
                                  <Check className="mr-1 h-4 w-4" />
                                  Included
                                </span>
                              ) : (
                                <span className="flex items-center text-red-600 dark:text-red-400">
                                  <X className="mr-1 h-4 w-4" />
                                  Not included
                                </span>
                              )
                            ) : (
                              <span className="text-gray-900 dark:text-white">
                                {support?.supported}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedFeature(null)}
                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tooltip */}
        {showTooltip.visible && (
          <div
            className="pointer-events-none fixed z-50 rounded-md bg-gray-900 p-2 text-xs text-white shadow-lg dark:bg-gray-800"
            style={{
              left: `${showTooltip.x + 10}px`,
              top: `${showTooltip.y + 10}px`,
              maxWidth: "200px",
            }}
          >
            {showTooltip.content}
          </div>
        )}
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
