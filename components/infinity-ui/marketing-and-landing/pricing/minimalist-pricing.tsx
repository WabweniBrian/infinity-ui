"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small projects",
    monthlyPrice: 12,
    yearlyPrice: 120,
    features: [
      "Single user",
      "5 projects",
      "5GB storage",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for professionals and growing teams",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Up to 5 users",
      "Unlimited projects",
      "50GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
    highlighted: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations with advanced needs",
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      "Unlimited users",
      "Unlimited projects",
      "500GB storage",
      "Custom analytics",
      "24/7 support",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager",
      "SSO authentication",
    ],
  },
];

export default function MinimalistPricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section className="w-full bg-slate-50 px-4 py-20 dark:bg-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Simple, Transparent Pricing
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            No hidden fees. No surprises. Choose the plan that works for you.
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="mt-8 flex items-center justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              className={`text-sm font-medium ${!isYearly ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
            >
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:bg-slate-700"
            >
              <span className="sr-only">Toggle billing frequency</span>
              <motion.span
                className="inline-block h-4 w-4 rounded-full bg-white shadow-lg"
                initial={false}
                animate={{
                  x: isYearly ? 24 : 4,
                  backgroundColor: isYearly ? "#8B5CF6" : "#FFFFFF",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span
              className={`flex items-center text-sm font-medium ${isYearly ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
            >
              Yearly
              <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                Save 20%
              </span>
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: plans.indexOf(plan) * 0.1 + 0.3,
              }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative overflow-hidden rounded-2xl ${
                plan.highlighted
                  ? "ring-2 ring-violet-500 dark:ring-violet-400"
                  : "border border-slate-200 dark:border-slate-700"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute left-0 right-0 top-0 bg-violet-500 py-1 text-center text-xs font-medium text-white">
                  MOST POPULAR
                </div>
              )}

              <div
                className={`p-8 ${plan.highlighted ? "pt-7" : ""} flex h-full flex-col bg-white dark:bg-slate-800`}
              >
                <div>
                  <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                  <p className="mb-6 text-sm text-slate-500 dark:text-slate-400">
                    {plan.description}
                  </p>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isYearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="mb-6"
                    >
                      <div className="flex items-baseline">
                        <span className="text-4xl font-extrabold">
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        <span className="ml-1 text-slate-500 dark:text-slate-400">
                          /{isYearly ? "year" : "month"}
                        </span>
                      </div>
                      {isYearly && (
                        <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                          ${plan.monthlyPrice * 12 - plan.yearlyPrice} savings
                          per year
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-2 flex-grow space-y-4">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    What&apos;s included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-8 flex w-full items-center justify-center rounded-lg px-4 py-3 font-medium ${
                    plan.highlighted || hoveredPlan === plan.id
                      ? "bg-violet-600 text-white hover:bg-violet-700"
                      : "bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                  }`}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Need a custom plan?{" "}
            <a
              href="#"
              className="font-medium text-violet-600 hover:underline dark:text-violet-400"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
