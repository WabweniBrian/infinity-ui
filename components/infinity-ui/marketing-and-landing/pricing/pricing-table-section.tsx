"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, ArrowRight, Sparkles, Shield, Zap } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const PricingTableSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      monthlyPrice: 29,
      annualPrice: 290,
      savings: 58,
      features: [
        { name: "Up to 5 projects", included: true },
        { name: "Basic components", included: true },
        { name: "Community support", included: true },
        { name: "1GB storage", included: true },
        { name: "Basic analytics", included: true },
        { name: "Custom themes", included: false },
        { name: "Priority support", included: false },
        { name: "API access", included: false },
      ],
      color: "from-blue-500 to-cyan-500",
      bgPattern:
        "radial-gradient(circle at 10% 90%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)",
      popular: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing teams and businesses",
      monthlyPrice: 79,
      annualPrice: 790,
      savings: 158,
      features: [
        { name: "Unlimited projects", included: true },
        { name: "All components", included: true },
        { name: "Developer support", included: true },
        { name: "10GB storage", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Custom themes", included: true },
        { name: "Priority support", included: false },
        { name: "API access", included: false },
      ],
      color: "from-violet-500 to-purple-500",
      bgPattern:
        "radial-gradient(circle at 90% 10%, rgba(139, 92, 246, 0.1) 0%, transparent 40%)",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Advanced features for large organizations",
      monthlyPrice: 199,
      annualPrice: 1990,
      savings: 398,
      features: [
        { name: "Unlimited projects", included: true },
        { name: "All components", included: true },
        { name: "Dedicated support", included: true },
        { name: "Unlimited storage", included: true },
        { name: "Custom analytics", included: true },
        { name: "Custom themes", included: true },
        { name: "Priority support", included: true },
        { name: "API access", included: true },
      ],
      color: "from-emerald-500 to-teal-500",
      bgPattern:
        "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 40%)",
      popular: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-violet-400/30 to-purple-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-400/30 to-cyan-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="pricing-grid"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 0H40V40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pricing-grid)" />
          </svg>
        </div>

        {/* Floating Elements */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-violet-400/10 to-purple-400/10"
            style={{
              width: Math.random() * 50 + 10,
              height: Math.random() * 50 + 10,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
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
            <span className="mx-2 font-medium text-violet-500">PRICING</span>
            <span className="h-1 w-12 rounded-full bg-violet-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Simple, transparent
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              pricing
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Choose the perfect plan for your needs. All plans include core
            features with no hidden fees.
          </p>

          <div className="mb-8 inline-flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`rounded-lg px-6 py-2 text-sm font-medium transition-all ${
                billingCycle === "annual"
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

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${plan.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
              ></div>

              <div
                className="relative h-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 shadow-lg transition-colors duration-300 group-hover:border-transparent dark:border-gray-700/50 dark:bg-gray-800"
                style={{ backgroundImage: plan.bgPattern }}
              >
                {plan.popular && (
                  <div className="absolute right-0 top-0">
                    <div className="relative">
                      <div className="absolute right-0 top-0 h-24 w-24 -translate-y-12 translate-x-12 rotate-45 transform bg-gradient-to-br from-violet-500 to-purple-500"></div>
                      <div className="absolute right-[2px] top-[11px] rotate-45 transform">
                        <span className="text-xs font-bold text-white">
                          POPULAR
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6">
                    <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        $
                        {billingCycle === "monthly"
                          ? plan.monthlyPrice
                          : Math.round(plan.annualPrice / 12)}
                      </span>
                      <span className="ml-2 text-gray-600 dark:text-gray-400">
                        /month
                      </span>
                    </div>

                    {billingCycle === "annual" && (
                      <div className="mt-2 flex items-center text-sm text-green-600 dark:text-green-400">
                        <span className="flex items-center">
                          <svg
                            className="mr-1 h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
                              fill="currentColor"
                            />
                          </svg>
                          Save ${plan.savings} per year
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mb-8 flex-1 space-y-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start">
                        {feature.included ? (
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-500">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        ) : (
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                            <X className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                          </div>
                        )}
                        <span
                          className={`ml-3 ${feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-500"}`}
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <button
                      className={`flex w-full items-center justify-center rounded-xl px-4 py-3 font-medium transition-all ${
                        plan.popular
                          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:from-violet-700 hover:to-purple-700"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                      }`}
                    >
                      Get started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-violet-500/10 to-purple-500/10 blur-xl"></div>
          <div className="relative rounded-3xl border border-gray-200/50 bg-white p-8 shadow-xl dark:border-gray-700/50 dark:bg-gray-800">
            <div className="mb-8 text-center">
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Compare Plan Features
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                See which plan is right for you
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-4 text-left font-medium text-gray-500 dark:text-gray-400">
                      Feature
                    </th>
                    {plans.map((plan, index) => (
                      <th key={index} className="px-4 py-4 text-center">
                        <span
                          className={`inline-block rounded-full bg-gradient-to-r px-3 py-1 text-sm font-medium text-white ${plan.color}`}
                        >
                          {plan.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Components",
                      starter: "Basic",
                      professional: "Advanced",
                      enterprise: "All + Custom",
                    },
                    {
                      name: "Updates",
                      starter: "Monthly",
                      professional: "Weekly",
                      enterprise: "Daily",
                    },
                    {
                      name: "Support",
                      starter: "Community",
                      professional: "Business Hours",
                      enterprise: "24/7 Dedicated",
                    },
                    {
                      name: "Team Members",
                      starter: "3",
                      professional: "10",
                      enterprise: "Unlimited",
                    },
                  ].map((feature, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-gray-50 dark:bg-gray-900/50" : ""
                      }
                    >
                      <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center">
                          {index === 0 && (
                            <Sparkles className="mr-2 h-5 w-5 text-violet-500" />
                          )}
                          {index === 1 && (
                            <Zap className="mr-2 h-5 w-5 text-blue-500" />
                          )}
                          {index === 2 && (
                            <Shield className="mr-2 h-5 w-5 text-emerald-500" />
                          )}
                          {index === 3 && (
                            <svg
                              className="mr-2 h-5 w-5 text-amber-500"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17 20H22V18C22 16.3431 20.6569 15 19 15C18.0444 15 17.1931 15.4468 16.6438 16.1429M17 20H7M17 20V18C17 17.3438 16.8736 16.717 16.6438 16.1429M7 20H2V18C2 16.3431 3.34315 15 5 15C5.95561 15 6.80686 15.4468 7.35625 16.1429M7 20V18C7 17.3438 7.12642 16.717 7.35625 16.1429M7.35625 16.1429C8.0935 14.301 9.89482 13 12 13C14.1052 13 15.9065 14.301 16.6438 16.1429M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7ZM21 10C21 11.1046 20.1046 12 19 12C17.8954 12 17 11.1046 17 10C17 8.89543 17.8954 8 19 8C20.1046 8 21 8.89543 21 10ZM7 10C7 11.1046 6.10457 12 5 12C3.89543 12 3 11.1046 3 10C3 8.89543 3.89543 8 5 8C6.10457 8 7 8.89543 7 10Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {feature.name}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">
                        {feature.starter}
                      </td>
                      <td className="bg-violet-50/50 px-4 py-4 text-center text-gray-700 dark:bg-violet-900/10 dark:text-gray-300">
                        {feature.professional}
                      </td>
                      <td className="px-4 py-4 text-center text-gray-700 dark:text-gray-300">
                        {feature.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Have more questions?{" "}
            <a
              href="#"
              className="font-medium text-violet-600 hover:underline dark:text-violet-400"
            >
              Contact our sales team
            </a>
          </p>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 text-left md:grid-cols-2">
            {[
              {
                question: "Can I upgrade or downgrade my plan later?",
                answer:
                  "Yes, you can change your plan at any time. When you upgrade, you'll be charged the prorated difference. When you downgrade, you'll receive credit towards your next bill.",
              },
              {
                question: "Is there a free trial available?",
                answer:
                  "Yes, we offer a 14-day free trial on all plans. No credit card required to start your trial.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
              },
              {
                question: "Can I get a refund if I'm not satisfied?",
                answer:
                  "We offer a 30-day money-back guarantee. If you're not completely satisfied, contact our support team for a full refund.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="rounded-xl bg-gray-50 p-6 dark:bg-gray-900/50"
              >
                <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
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

export default PricingTableSection;
