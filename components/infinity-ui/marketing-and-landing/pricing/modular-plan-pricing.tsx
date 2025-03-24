"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";
import {
  Check,
  Plus,
  Minus,
  Package,
  Users,
  Database,
  Shield,
  Zap,
  LifeBuoy,
} from "lucide-react";

interface PlanFeature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  included: boolean;
  required?: boolean;
  price: number;
  category: string;
}

interface PlanCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  features: PlanFeature[];
}

const planCategories: PlanCategory[] = [
  {
    id: "core",
    name: "Core Features",
    icon: <Package className="h-5 w-5" />,
    features: [
      {
        id: "base-plan",
        name: "Base Plan",
        description: "The foundation of your subscription",
        icon: <Package className="h-5 w-5" />,
        included: true,
        required: true,
        price: 29,
        category: "core",
      },
      {
        id: "api-access",
        name: "API Access",
        description: "Full access to our REST API",
        icon: <Zap className="h-5 w-5" />,
        included: false,
        price: 10,
        category: "core",
      },
      {
        id: "advanced-analytics",
        name: "Advanced Analytics",
        description: "Detailed insights and reporting",
        icon: <Zap className="h-5 w-5" />,
        included: false,
        price: 15,
        category: "core",
      },
    ],
  },
  {
    id: "team",
    name: "Team Features",
    icon: <Users className="h-5 w-5" />,
    features: [
      {
        id: "team-members",
        name: "Additional Team Members",
        description: "Add more users to your workspace",
        icon: <Users className="h-5 w-5" />,
        included: false,
        price: 8,
        category: "team",
      },
      {
        id: "collaboration-tools",
        name: "Collaboration Tools",
        description: "Enhanced tools for team productivity",
        icon: <Users className="h-5 w-5" />,
        included: false,
        price: 12,
        category: "team",
      },
    ],
  },
  {
    id: "storage",
    name: "Storage & Data",
    icon: <Database className="h-5 w-5" />,
    features: [
      {
        id: "extra-storage",
        name: "Extra Storage",
        description: "Additional cloud storage space",
        icon: <Database className="h-5 w-5" />,
        included: false,
        price: 5,
        category: "storage",
      },
      {
        id: "data-export",
        name: "Data Export",
        description: "Export your data in various formats",
        icon: <Database className="h-5 w-5" />,
        included: false,
        price: 7,
        category: "storage",
      },
    ],
  },
  {
    id: "security",
    name: "Security & Compliance",
    icon: <Shield className="h-5 w-5" />,
    features: [
      {
        id: "advanced-security",
        name: "Advanced Security",
        description: "Enhanced security features",
        icon: <Shield className="h-5 w-5" />,
        included: false,
        price: 20,
        category: "security",
      },
      {
        id: "audit-logs",
        name: "Audit Logs",
        description: "Detailed activity tracking",
        icon: <Shield className="h-5 w-5" />,
        included: false,
        price: 10,
        category: "security",
      },
    ],
  },
  {
    id: "support",
    name: "Support",
    icon: <LifeBuoy className="h-5 w-5" />,
    features: [
      {
        id: "priority-support",
        name: "Priority Support",
        description: "Faster response times",
        icon: <LifeBuoy className="h-5 w-5" />,
        included: false,
        price: 15,
        category: "support",
      },
      {
        id: "dedicated-manager",
        name: "Dedicated Account Manager",
        description: "Personal point of contact",
        icon: <LifeBuoy className="h-5 w-5" />,
        included: false,
        price: 50,
        category: "support",
      },
    ],
  },
];

// Custom toggle component
const CustomToggle = ({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) => {
  return (
    <div
      className={`relative h-6 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${checked ? "bg-gradient-to-r from-violet-600 to-indigo-600" : "bg-slate-300 dark:bg-slate-700"}`}
      onClick={() => !disabled && onChange(!checked)}
    >
      <div
        className={`absolute top-1 h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
          checked ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </div>
  );
};

// Custom tabs component
const CustomTabs = ({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: { id: string; name: string; icon: React.ReactNode }[];
  activeTab: string;
  onChange: (id: string) => void;
}) => {
  return (
    <div className="scrollbar-hide mb-6 flex space-x-1 overflow-x-auto rounded-lg bg-slate-100 p-1 dark:bg-slate-800/50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 md:flex-auto ${
            activeTab === tab.id
              ? "bg-white text-violet-600 shadow-sm dark:bg-slate-700 dark:text-violet-400"
              : "text-slate-600 hover:bg-white/50 dark:text-slate-400 dark:hover:bg-slate-700/50"
          }`}
          onClick={() => onChange(tab.id)}
        >
          {tab.icon}
          <span className="hidden md:block">{tab.name}</span>
        </button>
      ))}
    </div>
  );
};

export default function ModularPlanPricing() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    "base-plan",
  ]);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );
  const [activeTab, setActiveTab] = useState<string>("core");
  const [teamSize, setTeamSize] = useState<number>(1);

  const toggleFeature = (featureId: string, included: boolean) => {
    if (included) {
      setSelectedFeatures((prev) => [...prev, featureId]);
    } else {
      setSelectedFeatures((prev) => prev.filter((id) => id !== featureId));
    }
  };

  const calculateTotal = () => {
    let total = 0;

    planCategories.forEach((category) => {
      category.features.forEach((feature) => {
        if (selectedFeatures.includes(feature.id)) {
          if (feature.id === "team-members") {
            total += feature.price * (teamSize - 1); // First user is included
          } else {
            total += feature.price;
          }
        }
      });
    });

    // Apply annual discount
    if (billingCycle === "annual") {
      total = total * 10; // 12 months for the price of 10
    }

    return total;
  };

  const getSelectedFeatureCount = () => {
    return selectedFeatures.length;
  };

  return (
    <section className="overflow-hidden bg-white py-24 dark:bg-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Background elements */}
        <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-violet-300/10 to-indigo-300/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-gradient-to-tr from-violet-300/10 to-indigo-300/10 blur-3xl" />

        <div className="relative mb-16 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Build Your Perfect Plan
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Only pay for what you need. Add or remove features anytime.
          </motion.p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-2/3">
            <motion.div
              className="relative mb-6 rounded-xl p-6 shadow-xl shadow-violet-500/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Card background with gradient border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20" />
              <div className="absolute inset-[1px] rounded-xl bg-white/95 backdrop-blur-sm dark:bg-slate-800/95" />

              <div className="relative">
                <div className="mb-6 flex items-center sm:justify-between">
                  <h3 className="flex-1 truncate text-xl font-bold">
                    Customize Your Plan
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-sm ${billingCycle === "monthly" ? "font-medium text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
                    >
                      Monthly
                    </span>
                    <CustomToggle
                      checked={billingCycle === "annual"}
                      onChange={(checked) =>
                        setBillingCycle(checked ? "annual" : "monthly")
                      }
                    />
                    <span
                      className={`text-sm ${billingCycle === "annual" ? "font-medium text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
                    >
                      Annual{" "}
                      <span className="font-medium text-green-500">
                        (Save 16%)
                      </span>
                    </span>
                  </div>
                </div>

                <CustomTabs
                  tabs={planCategories.map((category) => ({
                    id: category.id,
                    name: category.name,
                    icon: category.icon,
                  }))}
                  activeTab={activeTab}
                  onChange={setActiveTab}
                />

                <div className="space-y-4">
                  {planCategories
                    .find((category) => category.id === activeTab)
                    ?.features.map((feature) => {
                      const isSelected = selectedFeatures.includes(feature.id);

                      return (
                        <motion.div
                          key={feature.id}
                          className={`rounded-lg border p-4 ${
                            isSelected
                              ? "border-violet-500 bg-violet-50 dark:bg-violet-900/20"
                              : "border-slate-200 dark:border-slate-700"
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          onClick={() =>
                            !feature.required &&
                            toggleFeature(feature.id, !isSelected)
                          }
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start">
                              <div
                                className={`mr-3 rounded-lg p-2 ${
                                  isSelected
                                    ? "bg-violet-100 text-violet-600 dark:bg-violet-800/30 dark:text-violet-400"
                                    : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                }`}
                              >
                                {feature.icon}
                              </div>
                              <div>
                                <h4 className="mb-1 font-medium">
                                  {feature.name}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {feature.description}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <div className="mr-4 text-right">
                                <div className="font-medium">
                                  ${feature.price}
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">
                                  per month
                                </div>
                              </div>

                              {feature.id === "team-members" && isSelected ? (
                                <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700">
                                  <button
                                    className="rounded-l-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setTeamSize(Math.max(1, teamSize - 1));
                                    }}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </button>
                                  <span className="px-3 py-1">{teamSize}</span>
                                  <button
                                    className="rounded-r-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-700"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setTeamSize(teamSize + 1);
                                    }}
                                  >
                                    <Plus className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <CustomToggle
                                  checked={isSelected}
                                  onChange={(checked) =>
                                    toggleFeature(feature.id, checked)
                                  }
                                  disabled={feature.required}
                                />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/3">
            <motion.div
              className="relative top-6 rounded-xl p-6 shadow-xl shadow-violet-500/5"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Card background with gradient border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20" />
              <div className="absolute inset-[1px] rounded-xl bg-white/95 backdrop-blur-sm dark:bg-slate-800/95" />

              <div className="relative">
                <h3 className="mb-6 text-xl font-bold">Your Custom Plan</h3>

                <div className="mb-6 space-y-4">
                  {planCategories.map((category) => {
                    const categoryFeatures = category.features.filter(
                      (feature) => selectedFeatures.includes(feature.id),
                    );

                    if (categoryFeatures.length === 0) return null;

                    return (
                      <div key={category.id}>
                        <h4 className="mb-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                          {category.name}
                        </h4>
                        <ul className="space-y-2">
                          {categoryFeatures.map((feature) => (
                            <li
                              key={feature.id}
                              className="flex justify-between"
                            >
                              <div className="flex items-center">
                                <Check className="mr-2 h-4 w-4 shrink-0 text-green-500" />
                                <span>{feature.name}</span>
                              </div>
                              <span className="font-medium">
                                {feature.id === "team-members"
                                  ? `$${feature.price * (teamSize - 1)}`
                                  : `$${feature.price}`}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                <div className="mb-6 border-t border-slate-200 pt-4 dark:border-slate-700">
                  <div className="mb-2 flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium">${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                    <span>
                      Billed{" "}
                      {billingCycle === "annual" ? "annually" : "monthly"}
                    </span>
                    <span>
                      {billingCycle === "annual"
                        ? `$${(calculateTotal() * 12) / 10} per year`
                        : ""}
                    </span>
                  </div>
                </div>

                <button className="mb-4 w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-violet-500/20">
                  Subscribe Now
                </button>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Cancel or change your plan anytime
                </p>
              </div>
            </motion.div>
          </div>
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
