"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, X, ChevronRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: {
    text: string;
    included: boolean;
  }[];
  popular?: boolean;
  color: string;
}

const plans: PricingPlan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 19,
    description: "Essential features for small teams",
    color: "from-purple-400 to-indigo-500",
    features: [
      { text: "5 Team Members", included: true },
      { text: "10GB Storage", included: true },
      { text: "Basic Analytics", included: true },
      { text: "Email Support", included: true },
      { text: "API Access", included: false },
      { text: "Custom Domains", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 49,
    description: "Perfect for growing businesses",
    popular: true,
    color: "from-pink-500 to-rose-500",
    features: [
      { text: "15 Team Members", included: true },
      { text: "50GB Storage", included: true },
      { text: "Advanced Analytics", included: true },
      { text: "Priority Support", included: true },
      { text: "API Access", included: true },
      { text: "Custom Domains", included: false },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    description: "Advanced features for large teams",
    color: "from-cyan-500 to-blue-500",
    features: [
      { text: "Unlimited Team Members", included: true },
      { text: "250GB Storage", included: true },
      { text: "Custom Analytics", included: true },
      { text: "24/7 Support", included: true },
      { text: "API Access", included: true },
      { text: "Custom Domains", included: true },
    ],
  },
];

export default function RotatingPricingSection() {
  const [activeIndex, setActiveIndex] = useState(1); // Pro plan
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-16 dark:from-slate-900 dark:to-slate-800">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <motion.h2
            className="mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent dark:from-violet-400 dark:to-indigo-400 md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Choose Your Perfect Plan
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Select the plan that fits your needs. Upgrade or downgrade anytime.
          </motion.p>
        </div>

        <div
          ref={containerRef}
          className="perspective-1000 relative mx-auto w-full max-w-5xl px-4 py-8"
        >
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-4 lg:gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`w-full max-w-sm cursor-pointer ${index === activeIndex ? "z-10" : "z-0"}`}
                initial={{
                  rotateY: index === activeIndex ? 0 : 15,
                  scale: index === activeIndex ? 1 : 0.9,
                  opacity: index === activeIndex ? 1 : 0.7,
                }}
                animate={{
                  rotateY:
                    index === activeIndex ? 0 : index < activeIndex ? 15 : -15,
                  scale: index === activeIndex ? 1 : 0.9,
                  opacity: index === activeIndex ? 1 : 0.7,
                  y: index === activeIndex ? -20 : 0,
                }}
                transition={{ duration: 0.5 }}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={`relative h-full overflow-hidden rounded-2xl shadow-xl transition-all duration-300 ${index === activeIndex ? "shadow-2xl" : "shadow-lg"} ${plan.popular ? "border-2 border-rose-500 dark:border-rose-400" : "border border-slate-200 dark:border-slate-700"} `}
                >
                  {plan.popular && (
                    <div className="absolute right-0 top-0">
                      <div className="rounded-bl-lg bg-gradient-to-r from-rose-500 to-pink-500 px-4 py-1 text-xs font-bold text-white shadow-lg">
                        POPULAR
                      </div>
                    </div>
                  )}

                  <div
                    className={`bg-gradient-to-br ${plan.color} p-6 text-white`}
                  >
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-extrabold">
                        ${plan.price}
                      </span>
                      <span className="ml-1 text-xl font-medium">/mo</span>
                    </div>
                    <p className="mt-2 text-sm opacity-90">
                      {plan.description}
                    </p>
                  </div>

                  <div className="bg-white p-6 dark:bg-slate-800">
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          {feature.included ? (
                            <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                          ) : (
                            <X className="mr-2 h-5 w-5 flex-shrink-0 text-slate-300 dark:text-slate-600" />
                          )}
                          <span
                            className={
                              feature.included
                                ? "text-slate-700 dark:text-slate-200"
                                : "text-slate-400 dark:text-slate-500"
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`mt-8 flex w-full items-center justify-center rounded-lg px-4 py-3 font-medium ${
                        index === activeIndex
                          ? `bg-gradient-to-r ${plan.color} text-white shadow-lg`
                          : "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200"
                      } `}
                    >
                      Get Started
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
