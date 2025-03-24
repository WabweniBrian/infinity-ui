"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";
import { Check, ChevronDown, ChevronUp, HelpCircle, X } from "lucide-react";

interface Feature {
  name: string;
  description: string;
  tiers: {
    free: boolean | string;
    pro: boolean | string;
    enterprise: boolean | string;
  };
}

interface FeatureCategory {
  name: string;
  features: Feature[];
}

const featureCategories: FeatureCategory[] = [
  {
    name: "Core Features",
    features: [
      {
        name: "Projects",
        description: "Number of projects you can create",
        tiers: {
          free: "3",
          pro: "Unlimited",
          enterprise: "Unlimited",
        },
      },
      {
        name: "Team members",
        description: "Number of team members you can invite",
        tiers: {
          free: "2",
          pro: "10",
          enterprise: "Unlimited",
        },
      },
      {
        name: "Storage",
        description: "Cloud storage for your files",
        tiers: {
          free: "5GB",
          pro: "100GB",
          enterprise: "1TB",
        },
      },
      {
        name: "API access",
        description: "Access to our REST API",
        tiers: {
          free: false,
          pro: true,
          enterprise: true,
        },
      },
    ],
  },
  {
    name: "Collaboration",
    features: [
      {
        name: "Shared workspaces",
        description: "Create shared team workspaces",
        tiers: {
          free: "1",
          pro: "5",
          enterprise: "Unlimited",
        },
      },
      {
        name: "Guest access",
        description: "Invite guests with limited permissions",
        tiers: {
          free: false,
          pro: true,
          enterprise: true,
        },
      },
      {
        name: "Version history",
        description: "Access to previous versions",
        tiers: {
          free: "7 days",
          pro: "90 days",
          enterprise: "Unlimited",
        },
      },
      {
        name: "Real-time collaboration",
        description: "Work together in real-time",
        tiers: {
          free: true,
          pro: true,
          enterprise: true,
        },
      },
    ],
  },
  {
    name: "Security & Compliance",
    features: [
      {
        name: "Two-factor authentication",
        description: "Secure your account with 2FA",
        tiers: {
          free: true,
          pro: true,
          enterprise: true,
        },
      },
      {
        name: "SSO integration",
        description: "Single sign-on with your identity provider",
        tiers: {
          free: false,
          pro: false,
          enterprise: true,
        },
      },
      {
        name: "Audit logs",
        description: "Track all activities in your workspace",
        tiers: {
          free: false,
          pro: "30 days",
          enterprise: "1 year",
        },
      },
      {
        name: "Data encryption",
        description: "End-to-end encryption for your data",
        tiers: {
          free: "Standard",
          pro: "Advanced",
          enterprise: "Enterprise-grade",
        },
      },
    ],
  },
  {
    name: "Support",
    features: [
      {
        name: "Support channels",
        description: "Ways to get help when you need it",
        tiers: {
          free: "Email",
          pro: "Email & Chat",
          enterprise: "Email, Chat & Phone",
        },
      },
      {
        name: "Response time",
        description: "How quickly we respond to your inquiries",
        tiers: {
          free: "48 hours",
          pro: "24 hours",
          enterprise: "4 hours",
        },
      },
      {
        name: "Dedicated account manager",
        description: "Personal point of contact for your account",
        tiers: {
          free: false,
          pro: false,
          enterprise: true,
        },
      },
      {
        name: "Training sessions",
        description: "Personalized training for your team",
        tiers: {
          free: false,
          pro: "1 session",
          enterprise: "Unlimited",
        },
      },
    ],
  },
];

// Custom tooltip component
const CustomTooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <motion.div
          className="absolute left-10 top-1/2 z-10 -mt-1 min-w-[250px] -translate-y-1/2 rounded-md bg-slate-900 px-3 py-2 text-sm text-white shadow-lg"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: -14 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
        >
          {content}
          <div className="absolute -left-1 top-3 h-2 w-2 rotate-45 transform bg-slate-900"></div>
        </motion.div>
      )}
    </div>
  );
};

export default function FeatureMatrixPricing() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(
    featureCategories.map((category) => category.name),
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((name) => name !== categoryName)
        : [...prev, categoryName],
    );
  };

  const isExpanded = (categoryName: string) =>
    expandedCategories.includes(categoryName);

  return (
    <section className="overflow-hidden bg-slate-50 py-24 dark:bg-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Background elements */}
        <div className="absolute right-0 top-0 h-1/3 w-1/3 rounded-full bg-gradient-to-br from-violet-300/10 to-indigo-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-gradient-to-tr from-violet-300/10 to-indigo-300/10 blur-3xl" />

        <div className="relative mb-16 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Compare Features
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Detailed breakdown of what&apos;s included in each plan
          </motion.p>
        </div>

        <div className="w-full overflow-x-auto rounded-xl shadow-2xl shadow-violet-500/5">
          <div className="relative min-w-[800px]">
            {/* Card background with gradient border */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/30 to-indigo-500/30" />
            <div className="absolute inset-[1px] rounded-xl bg-white dark:bg-slate-800" />

            <div className="relative">
              {/* Header */}
              <div className="grid grid-cols-4 border-b border-slate-200 dark:border-slate-700">
                <div className="p-6">
                  <div className="flex h-full items-end">
                    <h3 className="text-lg font-bold">Features</h3>
                  </div>
                </div>

                {/* Plan headers */}
                <div className="border-l border-slate-200 p-6 dark:border-slate-700">
                  <div className="text-center">
                    <h3 className="mb-2 text-lg font-bold">Free</h3>
                    <p className="mb-4 text-slate-600 dark:text-slate-400">
                      For individuals
                    </p>
                    <div className="mb-1 text-3xl font-bold">$0</div>
                    <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                      Forever free
                    </p>
                    <button className="w-full rounded-lg bg-slate-100 px-4 py-2 font-medium transition-all duration-300 hover:bg-slate-200 hover:shadow-lg dark:bg-slate-700 dark:hover:bg-slate-600">
                      Get started
                    </button>
                  </div>
                </div>

                <div className="border-l border-slate-200 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-6 dark:border-slate-700">
                  <div className="text-center">
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 transform rounded-b-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1 text-xs font-bold text-white">
                      MOST POPULAR
                    </div>
                    <h3 className="mb-2 text-lg font-bold">Pro</h3>
                    <p className="mb-4 text-slate-600 dark:text-slate-400">
                      For small teams
                    </p>
                    <div className="mb-1 text-3xl font-bold">$12</div>
                    <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                      Per user/month
                    </p>
                    <button className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 font-medium text-white shadow-lg transition-all duration-300 hover:from-violet-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-violet-500/20">
                      Start free trial
                    </button>
                  </div>
                </div>

                <div className="border-l border-slate-200 p-6 dark:border-slate-700">
                  <div className="text-center">
                    <h3 className="mb-2 text-lg font-bold">Enterprise</h3>
                    <p className="mb-4 text-slate-600 dark:text-slate-400">
                      For organizations
                    </p>
                    <div className="mb-1 text-3xl font-bold">Custom</div>
                    <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                      Contact for pricing
                    </p>
                    <button className="w-full rounded-lg bg-slate-100 px-4 py-2 font-medium transition-all duration-300 hover:bg-slate-200 hover:shadow-lg dark:bg-slate-700 dark:hover:bg-slate-600">
                      Contact sales
                    </button>
                  </div>
                </div>
              </div>

              {/* Feature categories */}
              {featureCategories.map((category, categoryIndex) => (
                <div
                  key={category.name}
                  className="border-b border-slate-200 last:border-b-0 dark:border-slate-700"
                >
                  <motion.div
                    className="grid cursor-pointer grid-cols-4 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-700/50"
                    onClick={() => toggleCategory(category.name)}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center p-4">
                      <div className="flex items-center">
                        {isExpanded(category.name) ? (
                          <ChevronUp className="mr-2 h-5 w-5 text-slate-500" />
                        ) : (
                          <ChevronDown className="mr-2 h-5 w-5 text-slate-500" />
                        )}
                        <h4 className="font-bold">{category.name}</h4>
                      </div>
                    </div>
                    <div className="border-l border-slate-200 p-4 dark:border-slate-700"></div>
                    <div className="border-l border-slate-200 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-4 dark:border-slate-700"></div>
                    <div className="border-l border-slate-200 p-4 dark:border-slate-700"></div>
                  </motion.div>

                  {/* Features in this category */}
                  {isExpanded(category.name) &&
                    category.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature.name}
                        className="grid grid-cols-4 border-t border-slate-200 dark:border-slate-700"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.2,
                          delay: featureIndex * 0.05,
                        }}
                      >
                        <div className="p-4 pl-10">
                          <div className="flex items-center">
                            <span>{feature.name}</span>
                            <CustomTooltip content={feature.description}>
                              <button className="ml-1.5">
                                <HelpCircle className="h-4 w-4 text-slate-400" />
                              </button>
                            </CustomTooltip>
                          </div>
                        </div>

                        <div className="flex items-center justify-center border-l border-slate-200 p-4 dark:border-slate-700">
                          {typeof feature.tiers.free === "boolean" ? (
                            feature.tiers.free ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                            )
                          ) : (
                            <span>{feature.tiers.free}</span>
                          )}
                        </div>

                        <div className="flex items-center justify-center border-l border-slate-200 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-4 dark:border-slate-700">
                          {typeof feature.tiers.pro === "boolean" ? (
                            feature.tiers.pro ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                            )
                          ) : (
                            <span>{feature.tiers.pro}</span>
                          )}
                        </div>

                        <div className="flex items-center justify-center border-l border-slate-200 p-4 dark:border-slate-700">
                          {typeof feature.tiers.enterprise === "boolean" ? (
                            feature.tiers.enterprise ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-slate-300 dark:text-slate-600" />
                            )
                          ) : (
                            <span>{feature.tiers.enterprise}</span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                </div>
              ))}
            </div>
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
