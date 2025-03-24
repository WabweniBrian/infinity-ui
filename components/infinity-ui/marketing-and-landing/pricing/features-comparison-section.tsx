"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, X, HelpCircle, ArrowRight, ChevronDown } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const FeaturesComparisonSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<string>("monthly");
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);

  const plans = [
    {
      name: "Basic",
      description: "For individuals and small teams",
      monthlyPrice: "$29",
      annualPrice: "$290",
      color: "from-blue-500 to-cyan-500",
      popular: false,
    },
    {
      name: "Pro",
      description: "For growing businesses",
      monthlyPrice: "$79",
      annualPrice: "$790",
      color: "from-violet-500 to-purple-500",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations",
      monthlyPrice: "$199",
      annualPrice: "$1,990",
      color: "from-emerald-500 to-teal-500",
      popular: false,
    },
  ];

  const featureCategories = [
    {
      id: "core",
      name: "Core Features",
      features: [
        {
          id: "projects",
          name: "Projects",
          description: "Number of projects you can create",
          basic: "3 projects",
          pro: "Unlimited",
          enterprise: "Unlimited",
          tooltip: "Projects are separate workspaces for your team's work.",
        },
        {
          id: "users",
          name: "Team Members",
          description: "Number of users who can access your workspace",
          basic: "Up to 5",
          pro: "Up to 20",
          enterprise: "Unlimited",
          tooltip: "Add team members to collaborate on your projects.",
        },
        {
          id: "storage",
          name: "Storage",
          description: "Cloud storage for your files and assets",
          basic: "10 GB",
          pro: "50 GB",
          enterprise: "Unlimited",
          tooltip: "Secure cloud storage for all your project files.",
        },
      ],
    },
    {
      id: "collaboration",
      name: "Collaboration Tools",
      features: [
        {
          id: "sharing",
          name: "Sharing & Permissions",
          description: "Control who can view or edit your projects",
          basic: "Basic",
          pro: "Advanced",
          enterprise: "Enterprise-grade",
          tooltip:
            "Set granular permissions for team members and external collaborators.",
        },
        {
          id: "comments",
          name: "Comments & Feedback",
          description: "Collaborate with comments and annotations",
          basic: true,
          pro: true,
          enterprise: true,
          tooltip:
            "Leave comments and feedback directly on designs and documents.",
        },
        {
          id: "versioning",
          name: "Version History",
          description: "Track changes and restore previous versions",
          basic: "7 days",
          pro: "90 days",
          enterprise: "Unlimited",
          tooltip: "Access and restore previous versions of your work.",
        },
      ],
    },
    {
      id: "advanced",
      name: "Advanced Features",
      features: [
        {
          id: "api",
          name: "API Access",
          description: "Access to our developer API",
          basic: false,
          pro: true,
          enterprise: true,
          tooltip:
            "Integrate our platform with your existing tools and workflows.",
        },
        {
          id: "analytics",
          name: "Advanced Analytics",
          description: "Detailed insights and reports",
          basic: false,
          pro: true,
          enterprise: true,
          tooltip:
            "Get detailed insights into your team's performance and project progress.",
        },
        {
          id: "customization",
          name: "White Labeling",
          description: "Custom branding and domain",
          basic: false,
          pro: false,
          enterprise: true,
          tooltip: "Apply your own branding and use your custom domain.",
        },
      ],
    },
    {
      id: "support",
      name: "Support & Security",
      features: [
        {
          id: "support",
          name: "Customer Support",
          description: "Access to our support team",
          basic: "Email",
          pro: "Priority Email & Chat",
          enterprise: "24/7 Phone & Email",
          tooltip:
            "Get help when you need it through various support channels.",
        },
        {
          id: "sla",
          name: "SLA",
          description: "Service Level Agreement",
          basic: false,
          pro: false,
          enterprise: true,
          tooltip:
            "Guaranteed uptime and response times with financial penalties.",
        },
        {
          id: "security",
          name: "Advanced Security",
          description: "Enhanced security features",
          basic: "Basic",
          pro: "Advanced",
          enterprise: "Enterprise-grade",
          tooltip:
            "Additional security features like SSO, 2FA, and audit logs.",
        },
      ],
    },
  ];

  const renderFeatureValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex justify-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <X className="h-4 w-4 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
      );
    }
    return (
      <div className="text-center text-gray-700 dark:text-gray-300">
        {value}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-100 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="comparison-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#comparison-pattern)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute right-1/4 top-1/3 h-64 w-64 rounded-full bg-gradient-to-r from-violet-300/20 to-purple-300/20 blur-3xl dark:from-violet-900/10 dark:to-purple-900/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-300/20 to-cyan-300/20 blur-3xl dark:from-blue-900/10 dark:to-cyan-900/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-violet-500"></span>
            <span className="mx-2 font-medium text-violet-500">FEATURES</span>
            <span className="h-1 w-12 rounded-full bg-violet-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Compare our
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              features
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Find the perfect plan for your needs. All plans include core
            features with no hidden fees.
          </p>

          <div className="mb-8 inline-flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
            <button
              onClick={() => setActiveTab("monthly")}
              className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
                activeTab === "monthly"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setActiveTab("annual")}
              className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
                activeTab === "annual"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <span className="flex items-center">
                Annual
                <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700 dark:bg-green-900/50 dark:text-green-400">
                  Save 20%
                </span>
              </span>
            </button>
          </div>
        </motion.div>

        {/* Plan Headers */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="col-span-1"></div>
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="relative col-span-1"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${plan.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 hover:opacity-100`}
              ></div>

              <div className="relative h-full rounded-3xl border border-gray-200/50 bg-white p-6 text-center shadow-lg transition-colors duration-300 hover:border-transparent dark:border-gray-700/50 dark:bg-gray-800">
                {plan.popular && (
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 text-xs font-bold text-white shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    {activeTab === "monthly"
                      ? plan.monthlyPrice
                      : plan.annualPrice}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {activeTab === "monthly" ? "per month" : "per year"}
                  </div>
                </div>

                <button
                  className={`w-full rounded-xl px-4 py-3 font-medium transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:from-violet-700 hover:to-purple-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative mb-16"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 blur-xl"></div>
          <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-xl dark:border-gray-700/50 dark:bg-gray-800">
            {featureCategories.map((category, categoryIndex) => (
              <div
                key={category.id}
                className={
                  categoryIndex !== 0
                    ? "border-t border-gray-200 dark:border-gray-700"
                    : ""
                }
              >
                <button
                  onClick={() =>
                    setExpandedFeature(
                      expandedFeature === category.id ? null : category.id,
                    )
                  }
                  className="flex w-full items-center justify-between bg-gray-50 px-6 py-4 transition-colors hover:bg-gray-100 dark:bg-gray-900/50 dark:hover:bg-gray-900"
                >
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 dark:text-gray-400 ${expandedFeature === category.id ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {(expandedFeature === category.id ||
                    expandedFeature === null) && (
                    <motion.div
                      initial={
                        expandedFeature !== null
                          ? { height: 0, opacity: 0 }
                          : { opacity: 1 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <tbody>
                            {category.features.map((feature, featureIndex) => (
                              <tr
                                key={feature.id}
                                className={
                                  featureIndex % 2 === 0
                                    ? "bg-white dark:bg-gray-800"
                                    : "bg-gray-50 dark:bg-gray-900/30"
                                }
                              >
                                <td className="w-1/4 px-6 py-4">
                                  <div className="flex items-center">
                                    <div>
                                      <div className="font-medium text-gray-900 dark:text-white">
                                        {feature.name}
                                      </div>
                                      <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {feature.description}
                                      </div>
                                    </div>
                                    {feature.tooltip && (
                                      <div className="relative ml-2">
                                        <button
                                          onMouseEnter={() =>
                                            setTooltipVisible(feature.id)
                                          }
                                          onMouseLeave={() =>
                                            setTooltipVisible(null)
                                          }
                                          className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                                        >
                                          <HelpCircle className="h-4 w-4" />
                                        </button>
                                        {tooltipVisible === feature.id && (
                                          <div className="absolute left-6 top-0 z-10 w-64 rounded-lg bg-gray-900 p-3 text-sm text-white shadow-lg dark:bg-gray-700">
                                            {feature.tooltip}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="w-1/4 px-6 py-4">
                                  {renderFeatureValue(feature.basic)}
                                </td>
                                <td className="w-1/4 bg-violet-50/50 px-6 py-4 dark:bg-violet-900/10">
                                  {renderFeatureValue(feature.pro)}
                                </td>
                                <td className="w-1/4 px-6 py-4">
                                  {renderFeatureValue(feature.enterprise)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
            Not sure which plan is right for you? Contact our sales team for a
            personalized recommendation.
          </p>
          <button className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-violet-700 hover:to-purple-700 hover:shadow-xl hover:shadow-violet-500/25">
            Contact Sales
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
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
};

export default FeaturesComparisonSection;
