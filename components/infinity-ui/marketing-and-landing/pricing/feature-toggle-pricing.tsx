"use client";

import React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface PricingFeature {
  id: string;
  name: string;
  description: string;
  category: string;
  starter: boolean | string;
  plus: boolean | string;
  pro: boolean | string;
}

const features: PricingFeature[] = [
  {
    id: "projects",
    name: "Projects",
    description: "Number of projects you can create",
    category: "Core",
    starter: "3",
    plus: "10",
    pro: "Unlimited",
  },
  {
    id: "storage",
    name: "Storage",
    description: "Cloud storage for your files",
    category: "Core",
    starter: "10GB",
    plus: "50GB",
    pro: "250GB",
  },
  {
    id: "team-members",
    name: "Team members",
    description: "Number of team members you can invite",
    category: "Collaboration",
    starter: "1",
    plus: "5",
    pro: "Unlimited",
  },
  {
    id: "api-access",
    name: "API access",
    description: "Access to our developer API",
    category: "Development",
    starter: false,
    plus: true,
    pro: true,
  },
  {
    id: "custom-domain",
    name: "Custom domain",
    description: "Use your own domain name",
    category: "Branding",
    starter: false,
    plus: true,
    pro: true,
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Track usage and performance",
    category: "Reporting",
    starter: "Basic",
    plus: "Advanced",
    pro: "Custom",
  },
  {
    id: "support",
    name: "Support",
    description: "Get help when you need it",
    category: "Support",
    starter: "Email",
    plus: "Priority",
    pro: "24/7",
  },
  {
    id: "sso",
    name: "Single sign-on",
    description: "Enterprise-grade security",
    category: "Security",
    starter: false,
    plus: false,
    pro: true,
  },
  {
    id: "custom-branding",
    name: "Custom branding",
    description: "Remove our branding",
    category: "Branding",
    starter: false,
    plus: false,
    pro: true,
  },
];

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 12, yearly: 120 },
    description: "Perfect for individuals and small projects",
    color: "bg-emerald-500",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-500",
  },
  {
    id: "plus",
    name: "Plus",
    price: { monthly: 29, yearly: 290 },
    description: "Great for professionals and growing teams",
    color: "bg-violet-600",
    textColor: "text-violet-600",
    borderColor: "border-violet-600",
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: { monthly: 79, yearly: 790 },
    description: "For businesses with advanced needs",
    color: "bg-blue-600",
    textColor: "text-blue-600",
    borderColor: "border-blue-600",
  },
];

export default function FeatureTogglePricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["Core"]);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  const toggleFeatureCategory = (category: string) => {
    if (selectedFeatures.includes(category)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== category));
    } else {
      setSelectedFeatures([...selectedFeatures, category]);
    }
  };

  const categories = Array.from(new Set(features.map((f) => f.category)));

  const filteredFeatures = features.filter((f) =>
    selectedFeatures.includes(f.category),
  );

  return (
    <section className="w-full bg-white px-4 py-20 dark:bg-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Compare Features & Plans
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Select the features that matter most to you
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="mt-8 inline-flex items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                !isYearly
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 dark:text-slate-400"
              }`}
              onClick={() => setIsYearly(false)}
            >
              Monthly
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                isYearly
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 dark:text-slate-400"
              }`}
              onClick={() => setIsYearly(true)}
            >
              Yearly{" "}
              <span className="font-bold text-emerald-500 dark:text-emerald-400">
                -20%
              </span>
            </button>
          </motion.div>
        </div>

        {/* Feature Category Toggles */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => toggleFeatureCategory(category)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                selectedFeatures.includes(category)
                  ? "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Mobile View - Plan Cards */}
        <div className="space-y-8 md:hidden">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: plans.indexOf(plan) * 0.1 + 0.3,
              }}
              className={`overflow-hidden rounded-xl border ${
                plan.popular
                  ? plan.borderColor
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              {plan.popular && (
                <div
                  className={`${plan.color} py-1 text-center text-xs font-medium text-white`}
                >
                  MOST POPULAR
                </div>
              )}
              <div className="bg-white p-6 dark:bg-slate-800">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-3xl font-extrabold">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="ml-1 text-lg text-slate-500 dark:text-slate-400">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  {plan.description}
                </p>

                <button
                  className={`mt-6 w-full rounded-lg px-4 py-2 font-medium text-white ${plan.color}`}
                >
                  Get Started
                </button>

                {/* Feature List */}
                <div className="mt-8 space-y-4">
                  {filteredFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className="border-b border-slate-100 py-2 dark:border-slate-800"
                    >
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium">{feature.name}</p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {feature.description}
                          </p>
                        </div>
                        <div className="ml-4">
                          {typeof feature[
                            plan.id as keyof Omit<
                              PricingFeature,
                              "id" | "name" | "description" | "category"
                            >
                          ] === "boolean" ? (
                            feature[
                              plan.id as keyof Omit<
                                PricingFeature,
                                "id" | "name" | "description" | "category"
                              >
                            ] ? (
                              <Check className={`h-5 w-5 text-emerald-500`} />
                            ) : (
                              <X className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                            )
                          ) : (
                            <span
                              className={`text-sm font-medium ${plan.textColor}`}
                            >
                              {
                                feature[
                                  plan.id as keyof Omit<
                                    PricingFeature,
                                    "id" | "name" | "description" | "category"
                                  >
                                ]
                              }
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop View - Feature Comparison Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-1/3 p-4 text-left"></th>
                {plans.map((plan) => (
                  <motion.th
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: plans.indexOf(plan) * 0.1 + 0.3,
                    }}
                    className={`w-1/5 p-4 text-center ${plan.popular ? "bg-violet-50 dark:bg-violet-900/20" : ""}`}
                    onMouseEnter={() => setHoveredPlan(plan.id)}
                    onMouseLeave={() => setHoveredPlan(null)}
                  >
                    {plan.popular && (
                      <span className="mb-2 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-800 dark:bg-violet-900 dark:text-violet-200">
                        MOST POPULAR
                      </span>
                    )}
                    <div className="text-xl font-bold">{plan.name}</div>
                    <div className="mt-2 flex items-baseline justify-center">
                      <span className="text-3xl font-extrabold">
                        ${isYearly ? plan.price.yearly : plan.price.monthly}
                      </span>
                      <span className="ml-1 text-slate-500 dark:text-slate-400">
                        /{isYearly ? "year" : "month"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      {plan.description}
                    </p>
                    <div className="mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-lg px-6 py-2 font-medium text-white ${plan.color} ${
                          hoveredPlan === plan.id ? "scale-105" : ""
                        }`}
                      >
                        Get Started
                      </motion.button>
                    </div>
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories
                .filter((category) => selectedFeatures.includes(category))
                .map((category) => (
                  <React.Fragment key={category}>
                    <tr>
                      <td colSpan={4} className="pb-2 pt-8">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {category}
                        </h3>
                      </td>
                    </tr>
                    {features
                      .filter((f) => f.category === category)
                      .map((feature) => (
                        <tr
                          key={feature.id}
                          className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                        >
                          <td className="px-4 py-4">
                            <div>
                              <p className="font-medium">{feature.name}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                {feature.description}
                              </p>
                            </div>
                          </td>
                          {plans.map((plan) => {
                            const value =
                              feature[
                                plan.id as keyof Omit<
                                  PricingFeature,
                                  "id" | "name" | "description" | "category"
                                >
                              ];
                            return (
                              <td
                                key={`${feature.id}-${plan.id}`}
                                className={`px-4 py-4 text-center ${
                                  plan.popular
                                    ? "bg-violet-50 dark:bg-violet-900/20"
                                    : ""
                                } ${hoveredPlan === plan.id ? "bg-slate-50 dark:bg-slate-800/50" : ""}`}
                              >
                                {typeof value === "boolean" ? (
                                  value ? (
                                    <Check className="mx-auto h-5 w-5 text-emerald-500" />
                                  ) : (
                                    <X className="mx-auto h-5 w-5 text-slate-300 dark:text-slate-600" />
                                  )
                                ) : (
                                  <span
                                    className={`font-medium ${plan.textColor}`}
                                  >
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

        <div className="mt-16 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
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
    </section>
  );
}
