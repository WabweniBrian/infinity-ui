"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Zap, Shield, Users, BarChart } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface PricingPlan {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
  accent: string;
  popular?: boolean;
}

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: { monthly: 15, yearly: 150 },
    description: "Perfect for individuals and small projects",
    icon: <Zap className="h-8 w-8" />,
    color: "bg-gradient-to-br from-teal-400 to-emerald-500",
    accent: "text-emerald-500",
    features: [
      "3 projects",
      "1 team member",
      "10GB storage",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: { monthly: 39, yearly: 390 },
    description: "For professionals and growing teams",
    icon: <Users className="h-8 w-8" />,
    color: "bg-gradient-to-br from-violet-500 to-purple-600",
    accent: "text-violet-500",
    popular: true,
    features: [
      "Unlimited projects",
      "5 team members",
      "50GB storage",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: { monthly: 89, yearly: 890 },
    description: "For large organizations with advanced needs",
    icon: <BarChart className="h-8 w-8" />,
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    accent: "text-blue-500",
    features: [
      "Unlimited projects",
      "Unlimited team members",
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

export default function AnimatedIllustrationsPricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white px-4 py-20 dark:bg-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block rounded-full bg-violet-100 p-3 dark:bg-violet-900/30"
          >
            <Shield className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </motion.div>

          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Choose the Perfect Plan for Your Needs
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            All plans include a 14-day free trial. No credit card required.
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
              className={`relative overflow-hidden rounded-2xl ${
                plan.popular
                  ? "ring-2 ring-violet-500 dark:ring-violet-400"
                  : "border border-slate-200 dark:border-slate-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute left-0 right-0 top-0 bg-violet-500 py-1 text-center text-xs font-medium text-white">
                  MOST POPULAR
                </div>
              )}

              <div
                className={`p-8 ${plan.popular ? "pt-7" : ""} flex h-full flex-col bg-white dark:bg-slate-800`}
              >
                <div className="mb-6">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${plan.color} mb-4 text-white`}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-extrabold">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="ml-1 text-slate-500 dark:text-slate-400">
                      /{isYearly ? "year" : "month"}
                    </span>
                  </div>
                  {isYearly && (
                    <p className="mt-1 text-sm text-emerald-600 dark:text-emerald-400">
                      ${plan.price.monthly * 12 - plan.price.yearly} savings per
                      year
                    </p>
                  )}
                </div>

                <div className="flex-grow space-y-4">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    What&apos;s included:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -10 }
                        }
                        transition={{ duration: 0.3, delay: i * 0.05 + 0.5 }}
                        className="flex items-start"
                      >
                        <div className="mr-2 mt-1">
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : { scale: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 10,
                              delay: i * 0.05 + 0.5,
                            }}
                            className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30"
                          >
                            <Check className="h-3 w-3 text-emerald-500" />
                          </motion.div>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-8 flex w-full items-center justify-center rounded-lg px-4 py-3 font-medium ${
                    plan.popular
                      ? `${plan.color} text-white`
                      : `bg-slate-100 hover:bg-slate-200 ${plan.accent} dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600`
                  }`}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-slate-100 opacity-30 dark:bg-slate-700"></div>
              <div className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-slate-200 opacity-30 dark:bg-slate-600"></div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20 rounded-2xl bg-slate-50 p-8 dark:bg-slate-800/50 md:p-12"
        >
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="md:w-1/3">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-900/30">
                  <svg
                    className="h-10 w-10 text-violet-600 dark:text-violet-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.13456 9H5.25654C4.85754 9 4.58854 8.407 4.81254 8.079C5.68954 6.777 7.16454 4.5 9.13456 4.5V9ZM16.0786 9H12.2006C11.8016 9 11.5326 8.407 11.7566 8.079C12.6336 6.777 14.1086 4.5 16.0786 4.5V9Z"
                      fill="currentColor"
                    />
                    <path
                      d="M19.5 9.75C19.5 11.96 17.71 13.75 15.5 13.75C13.29 13.75 11.5 11.96 11.5 9.75C11.5 7.54 13.29 5.75 15.5 5.75C17.71 5.75 19.5 7.54 19.5 9.75Z"
                      fill="currentColor"
                    />
                    <path
                      d="M12.5 14.75C12.5 16.96 10.71 18.75 8.5 18.75C6.29 18.75 4.5 16.96 4.5 14.75C4.5 12.54 6.29 10.75 8.5 10.75C10.71 10.75 12.5 12.54 12.5 14.75Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Check className="h-4 w-4 text-emerald-500" />
                </div>
              </div>
            </div>
            <div className="md:w-2/3">
              <p className="mb-4 text-lg italic text-slate-600 dark:text-slate-300">
                &quot;Switching to this platform has been a game-changer for our
                team. The pricing is transparent, and the features are exactly
                what we needed. We&apos;ve seen a 40% increase in productivity
                since we started using it.&quot;
              </p>
              <div>
                <p className="font-bold">Wabweni Brian</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  CTO at Wabtwch
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need a custom plan?{" "}
            <a
              href="#"
              className="font-medium text-violet-600 hover:underline dark:text-violet-400"
            >
              Contact our sales team
            </a>{" "}
            for a personalized quote.
          </p>
        </div>
      </div>
    </section>
  );
}
