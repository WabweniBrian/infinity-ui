"use client";

import type React from "react";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { Check, ChevronRight, HelpCircle, X } from "lucide-react";
import { useRef, useState } from "react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const FeaturesComparisonSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false);
  const [tooltipContent, setTooltipContent] = useState<string>("");
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const showTooltip = (content: string, e: React.MouseEvent) => {
    setTooltipContent(content);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  const features = [
    {
      name: "Core Features",
      items: [
        {
          name: "Unlimited Projects",
          basic: true,
          pro: true,
          enterprise: true,
          tooltip:
            "Create and manage as many projects as you need without limitations.",
        },
        {
          name: "API Access",
          basic: false,
          pro: true,
          enterprise: true,
          tooltip:
            "Integrate with our API to build custom solutions and automations.",
        },
        {
          name: "Custom Domain",
          basic: false,
          pro: true,
          enterprise: true,
          tooltip: "Use your own domain name for a branded experience.",
        },
        {
          name: "Export Options",
          basic: "Limited",
          pro: "Advanced",
          enterprise: "Enterprise",
          tooltip:
            "Export your data in various formats for backup or analysis.",
        },
      ],
    },
    {
      name: "Collaboration",
      items: [
        {
          name: "Team Members",
          basic: "Up to 3",
          pro: "Up to 10",
          enterprise: "Unlimited",
          tooltip: "Add team members to collaborate on your projects.",
        },
        {
          name: "Guest Access",
          basic: false,
          pro: true,
          enterprise: true,
          tooltip:
            "Invite guests with limited permissions to view or comment on your projects.",
        },
        {
          name: "Role Management",
          basic: false,
          pro: "Basic",
          enterprise: "Advanced",
          tooltip: "Define custom roles and permissions for team members.",
        },
        {
          name: "Workspaces",
          basic: 1,
          pro: 3,
          enterprise: "Unlimited",
          tooltip:
            "Separate workspaces to organize different teams or departments.",
        },
      ],
    },
    {
      name: "Security & Support",
      items: [
        {
          name: "2FA Authentication",
          basic: true,
          pro: true,
          enterprise: true,
          tooltip: "Secure your account with two-factor authentication.",
        },
        {
          name: "SSO Integration",
          basic: false,
          pro: false,
          enterprise: true,
          tooltip: "Single sign-on integration with your identity provider.",
        },
        {
          name: "Priority Support",
          basic: false,
          pro: true,
          enterprise: true,
          tooltip: "Get faster responses from our support team.",
        },
        {
          name: "Dedicated Account Manager",
          basic: false,
          pro: false,
          enterprise: true,
          tooltip: "A dedicated point of contact for all your needs.",
        },
      ],
    },
  ];

  const renderValue = (value: any) => {
    if (value === true) {
      return <Check className="h-5 w-5 text-emerald-500" />;
    } else if (value === false) {
      return <X className="h-5 w-5 text-gray-300 dark:text-gray-600" />;
    } else {
      return <span className="text-gray-700 dark:text-gray-300">{value}</span>;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-gray-900"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 0.3, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-1/4 top-0 h-32 w-1/2 bg-gradient-to-r from-blue-400/30 via-violet-400/30 to-purple-400/30 blur-3xl dark:from-blue-900/20 dark:via-violet-900/20 dark:to-purple-900/20"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 0.3, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-0 right-1/4 h-32 w-1/2 bg-gradient-to-r from-emerald-400/30 via-blue-400/30 to-sky-400/30 blur-3xl dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-sky-900/20"
        ></motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-violet-500/10 px-3 py-1 text-sm font-medium text-blue-600 dark:from-blue-500/20 dark:to-violet-500/20 dark:text-blue-400">
            Feature Comparison
          </span>
          <h2 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
            Compare our plans
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Find the perfect plan for your needs. All plans include our core
            features.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-3xl bg-white shadow-xl dark:bg-gray-800"></div>

          <div className="relative overflow-hidden rounded-3xl">
            <div className="grid grid-cols-4 border-b border-gray-100 bg-gray-50 py-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
              <div className="pl-8 text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Plans
                </h3>
              </div>
              <div>
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
                    Basic
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  $19
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  per month
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-600 dark:bg-violet-900/50 dark:text-violet-400">
                    Pro
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  $49
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  per month
                </div>
              </div>
              <div>
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                    Enterprise
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  $99
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  per month
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800">
              {features.map((category, index) => (
                <div
                  key={index}
                  className={
                    index !== features.length - 1
                      ? "border-b border-gray-100 dark:border-gray-700"
                      : ""
                  }
                >
                  <div className="grid grid-cols-4 bg-gray-50 py-4 dark:bg-gray-800/50">
                    <div className="pl-8 font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>

                  {category.items.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.3 + index * 0.1 + featureIndex * 0.05,
                      }}
                      className={`grid grid-cols-4 py-4 ${featureIndex % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-800/50"} transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/10`}
                      onMouseEnter={() =>
                        setHoveredFeature(index * 100 + featureIndex)
                      }
                      onMouseLeave={() => setHoveredFeature(null)}
                    >
                      <div className="flex items-center pl-8">
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature.name}
                        </span>
                        {feature.tooltip && (
                          <button
                            className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            onMouseEnter={(e) =>
                              showTooltip(feature.tooltip, e)
                            }
                            onMouseLeave={hideTooltip}
                          >
                            <HelpCircle className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <div className="flex items-center justify-center">
                        {renderValue(feature.basic)}
                      </div>
                      <div className="flex items-center justify-center">
                        {renderValue(feature.pro)}
                      </div>
                      <div className="flex items-center justify-center">
                        {renderValue(feature.enterprise)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-4 border-t border-gray-100 bg-gray-50 py-8 dark:border-gray-700 dark:bg-gray-800/50">
              <div></div>
              <div className="px-4">
                <button className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700">
                  Get Started
                </button>
              </div>
              <div className="px-4">
                <button className="w-full rounded-lg bg-violet-600 px-4 py-2 font-medium text-white transition-colors hover:bg-violet-700">
                  Get Started
                </button>
              </div>
              <div className="px-4">
                <button className="w-full rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition-colors hover:bg-emerald-700">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {[
            {
              title: "90-day money-back guarantee",
              description:
                "Not satisfied? Get a full refund within 90 days, no questions asked.",
              icon: "🛡️",
              color:
                "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
            },
            {
              title: "No long-term contracts",
              description:
                "All plans are month-to-month. Upgrade, downgrade, or cancel anytime.",
              icon: "📝",
              color:
                "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
            },
            {
              title: "24/7 customer support",
              description:
                "Our support team is available around the clock to assist you.",
              icon: "🌎",
              color:
                "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div
                className={`h-12 w-12 rounded-lg ${item.color} mb-4 flex items-center justify-center text-xl`}
              >
                {item.icon}
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
            Need a custom solution for your enterprise? We&apos;ve got you
            covered.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Contact our sales team
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </motion.div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltipVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 max-w-xs rounded-lg border border-gray-200 bg-white p-2 text-sm text-gray-900 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            style={{
              left: `${tooltipPosition.x + 10}px`,
              top: `${tooltipPosition.y + 10}px`,
            }}
          >
            {tooltipContent}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FeaturesComparisonSection;
