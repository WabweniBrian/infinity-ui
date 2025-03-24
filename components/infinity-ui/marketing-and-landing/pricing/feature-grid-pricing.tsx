"use client";

import React from "react";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface PricingFeature {
  category: string;
  features: {
    name: string;
    description: string;
    free: boolean | string;
    pro: boolean | string;
    enterprise: boolean | string;
  }[];
}

const featureCategories: PricingFeature[] = [
  {
    category: "Core Features",
    features: [
      {
        name: "Projects",
        description: "Number of projects you can create",
        free: "3",
        pro: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Team members",
        description: "Number of team members you can invite",
        free: "1",
        pro: "10",
        enterprise: "Unlimited",
      },
      {
        name: "Storage",
        description: "Cloud storage for your projects",
        free: "5GB",
        pro: "50GB",
        enterprise: "500GB",
      },
      {
        name: "API access",
        description: "Access to our developer API",
        free: false,
        pro: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Collaboration",
    features: [
      {
        name: "Team collaboration",
        description: "Work together with your team",
        free: "Basic",
        pro: "Advanced",
        enterprise: "Advanced",
      },
      {
        name: "Sharing permissions",
        description: "Control who can view or edit",
        free: "Limited",
        pro: "Full",
        enterprise: "Full",
      },
      {
        name: "Version history",
        description: "Access previous versions",
        free: "7 days",
        pro: "90 days",
        enterprise: "Unlimited",
      },
      {
        name: "Comments & feedback",
        description: "Leave comments on projects",
        free: true,
        pro: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Security & Support",
    features: [
      {
        name: "Priority support",
        description: "Get help when you need it",
        free: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "SLA",
        description: "Service level agreement",
        free: false,
        pro: false,
        enterprise: "99.9% uptime",
      },
      {
        name: "SSO authentication",
        description: "Single sign-on with your identity provider",
        free: false,
        pro: false,
        enterprise: true,
      },
      {
        name: "Custom contract",
        description: "Tailored legal agreement",
        free: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
];

export default function FeatureGridPricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(
    "Core Features",
  );
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "For individuals just getting started",
      cta: "Get Started",
      color: "bg-slate-600",
      popular: false,
    },
    {
      name: "Pro",
      price: { monthly: 19, yearly: 190 },
      description: "For professionals and growing teams",
      cta: "Start Free Trial",
      color: "bg-violet-600",
      popular: true,
    },
    {
      name: "Enterprise",
      price: { monthly: 49, yearly: 490 },
      description: "For large organizations with advanced needs",
      cta: "Contact Sales",
      color: "bg-blue-600",
      popular: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white px-4 py-20 dark:bg-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Compare Plans & Features
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Find the perfect plan for your needs. All plans include a 14-day
            free trial.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="mt-8 inline-flex items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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

        {/* Mobile View - Plan Cards */}
        <div className="space-y-8 md:hidden">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
              className={`overflow-hidden rounded-xl border ${
                plan.popular
                  ? "border-violet-500"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            >
              {plan.popular && (
                <div className="bg-violet-600 py-1 text-center text-xs font-medium text-white">
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
                  {plan.cta}
                </button>

                {/* Feature Categories Accordion */}
                <div className="mt-8 space-y-4">
                  {featureCategories.map((category) => (
                    <div
                      key={category.category}
                      className="border-b border-slate-200 pb-4 dark:border-slate-700"
                    >
                      <button
                        onClick={() => toggleCategory(category.category)}
                        className="flex w-full items-center justify-between py-2 text-left font-medium"
                      >
                        {category.category}
                        {expandedCategory === category.category ? (
                          <ChevronUp className="h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-slate-500" />
                        )}
                      </button>

                      {expandedCategory === category.category && (
                        <div className="mt-2 space-y-3">
                          {category.features.map((feature) => (
                            <div key={feature.name} className="py-2">
                              <div className="flex justify-between">
                                <div className="flex items-start">
                                  <span className="text-sm font-medium">
                                    {feature.name}
                                  </span>
                                  <button className="ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                    <HelpCircle className="h-4 w-4" />
                                  </button>
                                </div>
                                <div>
                                  {typeof feature[
                                    plan.name.toLowerCase() as keyof Omit<
                                      typeof feature,
                                      "name" | "description"
                                    >
                                  ] === "boolean" ? (
                                    feature[
                                      plan.name.toLowerCase() as keyof Omit<
                                        typeof feature,
                                        "name" | "description"
                                      >
                                    ] ? (
                                      <Check className="h-5 w-5 text-emerald-500" />
                                    ) : (
                                      <X className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                                    )
                                  ) : (
                                    <span className="text-sm font-medium">
                                      {
                                        feature[
                                          plan.name.toLowerCase() as keyof Omit<
                                            typeof feature,
                                            "name" | "description"
                                          >
                                        ]
                                      }
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                {feature.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
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
                {plans.map((plan, i) => (
                  <motion.th
                    key={plan.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                    className={`w-1/5 p-4 text-center ${plan.popular ? "bg-violet-50 dark:bg-violet-900/20" : ""}`}
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
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className={`rounded-lg px-6 py-2 font-medium text-white ${plan.color}`}
                      >
                        {plan.cta}
                      </motion.button>
                    </div>
                  </motion.th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureCategories.map((category) => (
                <React.Fragment key={category.category}>
                  <tr>
                    <td colSpan={4} className="pb-2 pt-8">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        {category.category}
                      </h3>
                    </td>
                  </tr>
                  {category.features.map((feature) => (
                    <tr
                      key={feature.name}
                      className="border-b border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <span className="font-medium">{feature.name}</span>
                          <button className="group relative ml-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                            <HelpCircle className="h-4 w-4" />
                            <span className="pointer-events-none absolute left-full top-1/2 z-10 ml-2 w-48 -translate-y-1/2 rounded bg-white p-2 text-xs text-slate-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-slate-800 dark:text-slate-300">
                              {feature.description}
                            </span>
                          </button>
                        </div>
                      </td>
                      {plans.map((plan) => {
                        const value =
                          feature[
                            plan.name.toLowerCase() as keyof Omit<
                              typeof feature,
                              "name" | "description"
                            >
                          ];
                        return (
                          <td
                            key={`${feature.name}-${plan.name}`}
                            className={`px-4 py-4 text-center ${
                              plan.popular
                                ? "bg-violet-50 dark:bg-violet-900/20"
                                : ""
                            }`}
                          >
                            {typeof value === "boolean" ? (
                              value ? (
                                <Check className="mx-auto h-5 w-5 text-emerald-500" />
                              ) : (
                                <X className="mx-auto h-5 w-5 text-slate-300 dark:text-slate-600" />
                              )
                            ) : (
                              <span className="font-medium">{value}</span>
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
            Need help choosing the right plan?{" "}
            <a
              href="#"
              className="font-medium text-violet-600 hover:underline dark:text-violet-400"
            >
              Contact our sales team
            </a>
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
