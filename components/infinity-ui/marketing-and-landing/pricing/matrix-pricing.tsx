"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface Feature {
  id: string;
  name: string;
  description: string;
  category: string;
  basic: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

interface Category {
  id: string;
  name: string;
  description: string;
}

const categories: Category[] = [
  {
    id: "essentials",
    name: "Essential Features",
    description: "Core functionality for every business",
  },
  {
    id: "advanced",
    name: "Advanced Features",
    description: "Enhanced capabilities for growing teams",
  },
  {
    id: "premium",
    name: "Premium Features",
    description: "Enterprise-grade tools and support",
  },
  {
    id: "security",
    name: "Security & Compliance",
    description: "Advanced security and compliance features",
  },
];

const features: Feature[] = [
  // Essential Features
  {
    id: "contacts",
    name: "Contact Management",
    description: "Store and manage contact information",
    category: "essentials",
    basic: "1,000",
    pro: "10,000",
    enterprise: "Unlimited",
  },
  {
    id: "email",
    name: "Email Campaigns",
    description: "Create and send email campaigns",
    category: "essentials",
    basic: "5,000/mo",
    pro: "50,000/mo",
    enterprise: "Unlimited",
  },
  {
    id: "automation",
    name: "Basic Automation",
    description: "Simple automated workflows",
    category: "essentials",
    basic: true,
    pro: true,
    enterprise: true,
  },
  // Advanced Features
  {
    id: "workflow",
    name: "Advanced Workflows",
    description: "Complex automation sequences",
    category: "advanced",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    id: "api",
    name: "API Access",
    description: "Access to our REST API",
    category: "advanced",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    id: "integrations",
    name: "Third-party Integrations",
    description: "Connect with other tools",
    category: "advanced",
    basic: "3",
    pro: "20+",
    enterprise: "Unlimited",
  },
  // Premium Features
  {
    id: "dedicated",
    name: "Dedicated Support",
    description: "Priority support channel",
    category: "premium",
    basic: false,
    pro: true,
    enterprise: true,
  },
  {
    id: "custom",
    name: "Custom Development",
    description: "Custom feature development",
    category: "premium",
    basic: false,
    pro: false,
    enterprise: true,
  },
  // Security Features
  {
    id: "sso",
    name: "Single Sign-On",
    description: "Enterprise SSO integration",
    category: "security",
    basic: false,
    pro: false,
    enterprise: true,
  },
  {
    id: "audit",
    name: "Audit Logs",
    description: "Detailed activity tracking",
    category: "security",
    basic: false,
    pro: true,
    enterprise: true,
  },
];

export default function MatrixPricing() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categories.map((c) => c.id),
  );
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId],
    );
  };

  const filteredFeatures = features.filter(
    (f) =>
      selectedCategories.includes(f.category) &&
      (showAll || categories.findIndex((c) => c.id === f.category) < 2),
  );

  return (
    <section className="w-full bg-white px-4 py-20 dark:bg-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Compare Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400"
          >
            Select categories to compare features across different plans
          </motion.p>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-400" />
            <span className="font-medium">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategories.includes(category.id)
                    ? "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="relative overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50">
                <th className="p-4 text-left font-medium text-slate-600 dark:text-slate-400">
                  Feature
                </th>
                <th className="p-4 font-medium text-slate-600 dark:text-slate-400">
                  Basic
                </th>
                <th className="p-4 font-medium text-slate-600 dark:text-slate-400">
                  Pro
                </th>
                <th className="p-4 font-medium text-slate-600 dark:text-slate-400">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFeatures.map((feature, index) => (
                <motion.tr
                  key={feature.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="border-t border-slate-200 dark:border-slate-700"
                >
                  <td className="p-4">
                    <div className="flex items-start gap-2">
                      <div>
                        <div className="font-medium">{feature.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {feature.description}
                        </div>
                      </div>
                      <button className="group relative">
                        <HelpCircle className="h-4 w-4 text-slate-400" />
                        <div className="pointer-events-none absolute left-full top-0 z-10 ml-2 w-48 rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {feature.description}
                        </div>
                      </button>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {typeof feature.basic === "boolean" ? (
                      feature.basic ? (
                        <Check className="mx-auto h-5 w-5 text-emerald-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-slate-300 dark:text-slate-600" />
                      )
                    ) : (
                      <span className="font-medium text-slate-900 dark:text-white">
                        {feature.basic}
                      </span>
                    )}
                  </td>
                  <td className="bg-violet-50/50 p-4 text-center dark:bg-violet-900/10">
                    {typeof feature.pro === "boolean" ? (
                      feature.pro ? (
                        <Check className="mx-auto h-5 w-5 text-emerald-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-slate-300 dark:text-slate-600" />
                      )
                    ) : (
                      <span className="font-medium text-slate-900 dark:text-white">
                        {feature.pro}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof feature.enterprise === "boolean" ? (
                      feature.enterprise ? (
                        <Check className="mx-auto h-5 w-5 text-emerald-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-slate-300 dark:text-slate-600" />
                      )
                    ) : (
                      <span className="font-medium text-slate-900 dark:text-white">
                        {feature.enterprise}
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Show More/Less Button */}
        <motion.button
          onClick={() => setShowAll(!showAll)}
          className="mx-auto mt-8 flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showAll ? (
            <>
              Show Less <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Show More Features <ChevronDown className="h-4 w-4" />
            </>
          )}
        </motion.button>
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
    </section>
  );
}
