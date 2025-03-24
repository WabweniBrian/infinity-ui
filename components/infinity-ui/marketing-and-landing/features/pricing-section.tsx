"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";

const PricingSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const plans = [
    {
      name: "Basic",
      description: "Perfect for individuals and small projects",
      priceMonthly: 19,
      priceAnnual: 190,
      savings: 38,
      features: [
        { name: "Up to 3 projects", included: true },
        { name: "Basic analytics", included: true },
        { name: "24-hour support response time", included: true },
        { name: "5GB storage", included: true },
        { name: "API access", included: false },
        { name: "Advanced security", included: false },
        { name: "Custom domain", included: false },
      ],
      color: "from-blue-500 to-sky-500",
      popular: false,
    },
    {
      name: "Pro",
      description: "Ideal for growing teams and businesses",
      priceMonthly: 49,
      priceAnnual: 490,
      savings: 98,
      features: [
        { name: "Unlimited projects", included: true },
        { name: "Advanced analytics", included: true },
        { name: "4-hour support response time", included: true },
        { name: "25GB storage", included: true },
        { name: "API access", included: true },
        { name: "Advanced security", included: true },
        { name: "Custom domain", included: false },
      ],
      color: "from-violet-500 to-purple-500",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Advanced features for large organizations",
      priceMonthly: 99,
      priceAnnual: 990,
      savings: 198,
      features: [
        { name: "Unlimited projects", included: true },
        { name: "Advanced analytics with custom reports", included: true },
        { name: "1-hour support response time", included: true },
        { name: "Unlimited storage", included: true },
        { name: "API access with higher rate limits", included: true },
        { name: "Enterprise-grade security", included: true },
        { name: "Custom domain with SSL", included: true },
      ],
      color: "from-emerald-500 to-teal-500",
      popular: false,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Radial gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Grid pattern */}
        <div className="bg-grid-gray-100/[0.2] dark:bg-grid-gray-800/[0.2] absolute inset-0 bg-[length:30px_30px]"></div>

        {/* Floating shapes */}
        <motion.div
          initial={{ opacity: 0, x: -100, y: -100, rotate: -20 }}
          animate={
            isInView
              ? { opacity: 0.5, x: 0, y: 0, rotate: 0 }
              : { opacity: 0, x: -100, y: -100, rotate: -20 }
          }
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-10 top-20 h-24 w-24 rounded-xl bg-violet-200/30 blur-xl dark:bg-violet-900/20"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100, y: 100, rotate: 20 }}
          animate={
            isInView
              ? { opacity: 0.5, x: 0, y: 0, rotate: 0 }
              : { opacity: 0, x: 100, y: 100, rotate: 20 }
          }
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-20 right-10 h-32 w-32 rounded-full bg-emerald-200/30 blur-xl dark:bg-emerald-900/20"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50, y: -50 }}
          animate={
            isInView
              ? { opacity: 0.3, scale: 1, x: 0, y: 0 }
              : { opacity: 0, scale: 0.8, x: 50, y: -50 }
          }
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="absolute right-1/4 top-1/2 h-40 w-40 rounded-full bg-blue-200/30 blur-xl dark:bg-blue-900/20"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -50, y: 50 }}
          animate={
            isInView
              ? { opacity: 0.3, scale: 1, x: 0, y: 0 }
              : { opacity: 0, scale: 0.8, x: -50, y: 50 }
          }
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="absolute bottom-1/3 left-1/4 h-36 w-36 rounded-full bg-purple-200/30 blur-xl dark:bg-purple-900/20"
        ></motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 px-3 py-1 text-sm font-medium text-violet-600 dark:from-violet-500/20 dark:to-purple-500/20 dark:text-violet-400">
            Simple Pricing
          </span>
          <h2 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
            Choose the right plan for you
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Start free and scale as you grow. No hidden fees. No credit card
            required.
          </p>

          <div className="inline-flex items-center rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
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
                Annual{" "}
                <span className="ml-2 rounded bg-green-100 px-1.5 py-0.5 text-xs text-green-700 dark:bg-green-900/50 dark:text-green-400">
                  Save 20%
                </span>
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
              {plan.popular && (
                <div className="absolute inset-x-0 -top-5 flex justify-center">
                  <div className="flex items-center rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1 text-sm font-medium text-white shadow-lg shadow-violet-500/30">
                    <Sparkles className="mr-1 h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${plan.color} opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
              ></div>

              {plan.popular ? (
                <div className="absolute inset-px rounded-[23px] bg-gradient-to-r from-violet-500 to-purple-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              ) : (
                <div className="absolute inset-0 rounded-3xl bg-white opacity-70 dark:bg-gray-800"></div>
              )}

              <div className="relative flex h-full flex-col rounded-3xl border border-gray-200 bg-white p-8 transition-colors group-hover:border-transparent dark:border-gray-700 dark:bg-gray-800">
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6 mt-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      $
                      {billingCycle === "monthly"
                        ? plan.priceMonthly
                        : Math.round(plan.priceAnnual / 12)}
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

                <ul className="mb-8 flex-1 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      {feature.included ? (
                        <Check className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400" />
                      ) : (
                        <X className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400 dark:text-gray-600" />
                      )}
                      <span
                        className={`${feature.included ? "text-gray-700 dark:text-gray-300" : "text-gray-500 dark:text-gray-500"}`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>

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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 rounded-3xl bg-gray-50 p-8 dark:bg-gray-900 md:p-12"
        >
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-sky-500/10 px-3 py-1 text-sm font-medium text-blue-600 dark:from-blue-500/20 dark:to-sky-500/20 dark:text-blue-400">
                Enterprise Solutions
              </span>
              <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                Need a custom plan?
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Our enterprise plans offer enhanced security, dedicated support,
                and customizable features to meet your organization&apos;s
                specific needs.
              </p>

              <ul className="mb-8 space-y-3">
                {[
                  "Dedicated account manager",
                  "Custom integrations",
                  "Advanced security controls",
                  "SLA guarantees",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-3 h-5 w-5 text-blue-500 dark:text-blue-400" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/30 hover:from-blue-700 hover:to-sky-700">
                Contact sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-blue-500/20 to-sky-500/20 blur-xl"></div>
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
                <div className="border-b border-gray-100 p-6 dark:border-gray-700">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    Request a custom quote
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    Fill in the form below and we&apos;ll get back to you within
                    24 hours
                  </p>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          First name
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Work email
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Company
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Message
                      </label>
                      <textarea className="h-24 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"></textarea>
                    </div>

                    <button className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 px-4 py-3 font-medium text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-sky-700">
                      Submit request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <h3 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Frequently asked questions
          </h3>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                question: "Can I cancel my subscription at any time?",
                answer:
                  "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
              },
              {
                question: "Do you offer a free trial?",
                answer:
                  "Yes, we offer a 14-day free trial for all our plans. No credit card required.",
              },
              {
                question: "How do I change my plan?",
                answer:
                  "You can upgrade or downgrade your plan at any time through your account settings. Changes take effect immediately.",
              },
              {
                question: "Is there a setup fee?",
                answer:
                  "No, there are no setup fees for any of our plans. You only pay the advertised subscription price.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-6 text-left dark:border-gray-700 dark:bg-gray-800"
              >
                <h4 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
