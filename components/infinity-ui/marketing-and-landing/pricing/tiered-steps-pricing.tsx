"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface PricingTier {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  color: string;
  icon: React.ReactNode;
}

const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 9, yearly: 90 },
    description: "Perfect for individuals and small projects",
    features: [
      "Up to 3 projects",
      "1 team member",
      "5GB storage",
      "Basic analytics",
      "Email support",
    ],
    color: "from-emerald-400 to-teal-500",
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 16L7 11L8.4 9.55L12 13.15L19.6 5.5L21 7L12 16Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "professional",
    name: "Professional",
    price: { monthly: 29, yearly: 290 },
    description: "For professionals and growing teams",
    features: [
      "Unlimited projects",
      "Up to 10 team members",
      "50GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
    color: "from-violet-400 to-purple-500",
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "business",
    name: "Business",
    price: { monthly: 79, yearly: 790 },
    description: "For larger teams with advanced needs",
    features: [
      "Unlimited projects",
      "Unlimited team members",
      "250GB storage",
      "Custom analytics",
      "24/7 support",
      "Advanced API access",
      "Custom integrations",
      "Dedicated account manager",
      "SSO authentication",
    ],
    color: "from-blue-400 to-indigo-500",
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 7H4V5H6V7ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 7H8V5H10V7ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function TieredStepsPricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [currentTier, setCurrentTier] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const nextTier = () => {
    if (currentTier < pricingTiers.length - 1) {
      setCurrentTier(currentTier + 1);
    }
  };

  const prevTier = () => {
    if (currentTier > 0) {
      setCurrentTier(currentTier - 1);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 to-white px-4 py-20 dark:from-slate-900 dark:to-slate-800">
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
            Choose Your Growth Path
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Select the plan that aligns with your journey. Upgrade as you grow.
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

        {/* Steps Indicator - Desktop */}
        <div className="mb-12 hidden md:block">
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-slate-200 dark:bg-slate-700"></div>
            <div className="relative flex justify-between">
              {pricingTiers.map((tier, index) => (
                <motion.button
                  key={tier.id}
                  onClick={() => setCurrentTier(index)}
                  className="relative z-10 flex flex-col items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${
                      index <= currentTier
                        ? `bg-gradient-to-r ${tier.color}`
                        : "bg-slate-300 dark:bg-slate-600"
                    }`}
                    animate={{
                      scale: index === currentTier ? 1.1 : 1,
                      boxShadow:
                        index === currentTier
                          ? "0 0 0 4px rgba(139, 92, 246, 0.3)"
                          : "none",
                    }}
                  >
                    {tier.icon}
                  </motion.div>
                  <div className="mt-2 text-center">
                    <p
                      className={`font-medium ${
                        index === currentTier
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-500 dark:text-slate-400"
                      }`}
                    >
                      {tier.name}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      ${isYearly ? tier.price.yearly : tier.price.monthly}/
                      {isYearly ? "yr" : "mo"}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <button
            onClick={prevTier}
            disabled={currentTier === 0}
            className={`rounded-full p-2 ${
              currentTier === 0
                ? "text-slate-300 dark:text-slate-700"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <div className="text-center">
            <p className="text-lg font-bold">
              {pricingTiers[currentTier].name}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              $
              {isYearly
                ? pricingTiers[currentTier].price.yearly
                : pricingTiers[currentTier].price.monthly}
              /{isYearly ? "yr" : "mo"}
            </p>
          </div>

          <button
            onClick={nextTier}
            disabled={currentTier === pricingTiers.length - 1}
            className={`rounded-full p-2 ${
              currentTier === pricingTiers.length - 1
                ? "text-slate-300 dark:text-slate-700"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Pricing Tier Details */}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTier}
              initial={{
                opacity: 0,
                x: isMobile ? 0 : 20,
                y: isMobile ? 20 : 0,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{
                opacity: 0,
                x: isMobile ? 0 : -20,
                y: isMobile ? -20 : 0,
              }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-800"
            >
              <div
                className={`bg-gradient-to-r ${pricingTiers[currentTier].color} p-8 text-white`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold">
                      {pricingTiers[currentTier].name}
                    </h3>
                    <p className="mt-2 opacity-90">
                      {pricingTiers[currentTier].description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold">
                      $
                      {isYearly
                        ? pricingTiers[currentTier].price.yearly
                        : pricingTiers[currentTier].price.monthly}
                    </div>
                    <div className="text-sm opacity-90">
                      per {isYearly ? "year" : "month"}
                    </div>
                    {isYearly && (
                      <div className="mt-1 inline-block rounded-full bg-white/20 px-2 py-0.5 text-sm">
                        Save $
                        {pricingTiers[currentTier].price.monthly * 12 -
                          pricingTiers[currentTier].price.yearly}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h4 className="mb-4 text-lg font-medium">
                  What&apos;s included:
                </h4>
                <ul className="mb-8 space-y-4">
                  {pricingTiers[currentTier].features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="flex items-start"
                    >
                      <Check className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full rounded-lg bg-gradient-to-r px-4 py-3 font-medium text-white ${pricingTiers[currentTier].color} flex items-center justify-center`}
                >
                  Get Started with {pricingTiers[currentTier].name}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>

                <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
                  No credit card required. 14-day free trial.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons - Desktop */}
        <div className="mt-8 hidden justify-center space-x-4 md:flex">
          <button
            onClick={prevTier}
            disabled={currentTier === 0}
            className={`rounded-lg border px-4 py-2 ${
              currentTier === 0
                ? "border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-600"
                : "border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <span className="flex items-center">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </span>
          </button>
          <button
            onClick={nextTier}
            disabled={currentTier === pricingTiers.length - 1}
            className={`rounded-lg border px-4 py-2 ${
              currentTier === pricingTiers.length - 1
                ? "border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-600"
                : "border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <span className="flex items-center">
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
