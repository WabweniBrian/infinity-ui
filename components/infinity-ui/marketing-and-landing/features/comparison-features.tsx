"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  ChevronRight,
  Zap,
  Shield,
  BarChart3,
  Users,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

// Define the icon components map to avoid the "icon is not a function" error
const IconComponents = {
  Zap,
  Shield,
  BarChart3,
  Users,
};

type Category = {
  id: string;
  name: string;
  iconName: keyof typeof IconComponents;
  description: string;
};

type Feature = {
  id: string;
  name: string;
  categoryId: string;
  basic: boolean;
  pro: boolean;
  enterprise: boolean;
};

const categories: Category[] = [
  {
    id: "performance",
    name: "Performance",
    iconName: "Zap",
    description: "Features that optimize speed and efficiency",
  },
  {
    id: "security",
    name: "Security",
    iconName: "Shield",
    description: "Advanced protection for your data and users",
  },
  {
    id: "analytics",
    name: "Analytics",
    iconName: "BarChart3",
    description: "Insights and reporting capabilities",
  },
  {
    id: "collaboration",
    name: "Collaboration",
    iconName: "Users",
    description: "Tools for team productivity and communication",
  },
];

const features: Feature[] = [
  // Performance features
  {
    id: "cdn",
    name: "Global CDN",
    categoryId: "performance",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    id: "optimization",
    name: "Image Optimization",
    categoryId: "performance",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    id: "caching",
    name: "Advanced Caching",
    categoryId: "performance",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    id: "edge",
    name: "Edge Functions",
    categoryId: "performance",
    basic: false,
    pro: false,
    enterprise: true,
  },

  // Security features
  {
    id: "ssl",
    name: "SSL Certificates",
    categoryId: "security",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    id: "ddos",
    name: "DDoS Protection",
    categoryId: "security",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    id: "waf",
    name: "Web Application Firewall",
    categoryId: "security",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    id: "sso",
    name: "Single Sign-On (SSO)",
    categoryId: "security",
    basic: false,
    pro: false,
    enterprise: true,
  },

  // Analytics features
  {
    id: "basic-analytics",
    name: "Basic Analytics",
    categoryId: "analytics",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    id: "real-time",
    name: "Real-time Metrics",
    categoryId: "analytics",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    id: "custom-reports",
    name: "Custom Reports",
    categoryId: "analytics",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    id: "data-export",
    name: "Data Export API",
    categoryId: "analytics",
    basic: false,
    pro: false,
    enterprise: true,
  },

  // Collaboration features
  {
    id: "users",
    name: "Multiple Users",
    categoryId: "collaboration",
    basic: true,
    pro: true,
    enterprise: true,
  },
  {
    id: "roles",
    name: "Role-based Access",
    categoryId: "collaboration",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    id: "audit",
    name: "Audit Logs",
    categoryId: "collaboration",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    id: "teams",
    name: "Team Workspaces",
    categoryId: "collaboration",
    basic: false,
    pro: false,
    enterprise: true,
  },
];

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$29",
    description: "Essential features for small teams",
    color: "bg-gray-600",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$79",
    description: "Advanced features for growing businesses",
    color: "bg-indigo-600",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$199",
    description: "Complete solution for large organizations",
    color: "bg-purple-600",
  },
];

const ComparisonFeatures = () => {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0].id,
  );

  const filteredFeatures = features.filter(
    (feature) => feature.categoryId === activeCategory,
  );
  const currentCategory = categories.find((cat) => cat.id === activeCategory);

  // Get the correct icon component using the iconName
  const IconComponent = currentCategory
    ? IconComponents[currentCategory.iconName]
    : null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-gray-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.gray.100),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,theme(colors.gray.800/30%),transparent_50%)]"></div>
      </div>

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
              Feature Comparison
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Choose the right plan for you
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Compare our plans to find the perfect fit for your needs.
            </p>
          </motion.div>
        </div>

        <div className="mt-16">
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mb-12 flex max-w-2xl flex-wrap justify-center gap-2 md:gap-4"
          >
            {categories.map((category) => {
              const CategoryIcon = IconComponents[category.iconName];
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all md:text-base ${
                    activeCategory === category.id
                      ? "bg-white text-gray-900 shadow-lg dark:bg-gray-800 dark:text-white"
                      : "bg-transparent text-gray-600 hover:bg-white/50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-white"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <CategoryIcon className="h-4 w-4 md:h-5 md:w-5" />
                  <span>{category.name}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Category description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mx-auto mb-12 max-w-3xl text-center"
            >
              {IconComponent && (
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                  <IconComponent className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              )}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentCategory?.name} Features
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {currentCategory?.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Comparison table */}
          <div className="mx-auto max-w-6xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            {/* Table header */}
            <div className="grid grid-cols-4 border-b border-gray-200 dark:border-gray-700">
              <div className="p-6 text-left font-medium text-gray-500 dark:text-gray-400">
                Features
              </div>
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-6 text-center ${plan.popular ? "bg-indigo-50 dark:bg-indigo-900/10" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-0 right-0 mx-auto w-32 rounded-full bg-indigo-600 py-1 text-center text-xs font-medium text-white">
                      Most Popular
                    </div>
                  )}
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      /mo
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {plan.description}
                  </div>
                </div>
              ))}
            </div>

            {/* Table body */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="grid grid-cols-4"
                    >
                      <div className="flex items-center p-6">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {feature.name}
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-6">
                        {feature.basic ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                        )}
                      </div>
                      <div
                        className={`flex items-center justify-center p-6 ${plans[1].popular ? "bg-indigo-50 dark:bg-indigo-900/10" : ""}`}
                      >
                        {feature.pro ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                        )}
                      </div>
                      <div className="flex items-center justify-center p-6">
                        {feature.enterprise ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Table footer */}
            <div className="grid grid-cols-4 border-t border-gray-200 dark:border-gray-700">
              <div className="p-6"></div>
              {plans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`p-6 text-center ${plan.popular ? "bg-indigo-50 dark:bg-indigo-900/10" : ""}`}
                >
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`inline-flex items-center justify-center rounded-lg ${plan.color} px-4 py-2 text-sm font-medium text-white shadow-md transition-colors hover:opacity-90`}
                  >
                    Choose {plan.name}
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </motion.button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonFeatures;
