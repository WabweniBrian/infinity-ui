"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Check, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface PricingFeature {
  name: string;
  basic: boolean | string;
  pro: boolean | string;
  business: boolean | string;
}

const features: PricingFeature[] = [
  { name: "Team members", basic: "3", pro: "10", business: "Unlimited" },
  { name: "Projects", basic: "5", pro: "20", business: "Unlimited" },
  { name: "Storage", basic: "10GB", pro: "50GB", business: "500GB" },
  { name: "API access", basic: false, pro: true, business: true },
  { name: "Custom domain", basic: false, pro: true, business: true },
  { name: "Analytics", basic: "Basic", pro: "Advanced", business: "Custom" },
  { name: "Support", basic: "Email", pro: "Priority", business: "24/7 Phone" },
  { name: "Single sign-on", basic: false, pro: false, business: true },
  { name: "Custom branding", basic: false, pro: false, business: true },
];

const plans = [
  { id: "basic", name: "Basic", price: 29, color: "bg-emerald-500" },
  { id: "pro", name: "Pro", price: 79, color: "bg-violet-600", popular: true },
  { id: "business", name: "Business", price: 149, color: "bg-blue-600" },
];

export default function SliderPricingSection() {
  const [activePlan, setActivePlan] = useState("pro");
  const [isYearly, setIsYearly] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const getDiscountedPrice = (price: number) => {
    return isYearly ? Math.round(price * 0.8) : price;
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < plans.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  useEffect(() => {
    // Set active plan based on current slide
    setActivePlan(plans[currentSlide].id);

    // Animate the slider
    if (sliderRef.current) {
      controls.start({
        x: `-${currentSlide * 100}%`,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }
  }, [currentSlide, controls]);

  return (
    <section className="min-h-screen w-full overflow-x-hidden bg-white px-4 py-16 dark:bg-slate-900">
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
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
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
            Choose the perfect plan for your team&apos;s needs
          </motion.p>

          {/* Billing Toggle */}
          <motion.div
            className="mt-8 inline-flex items-center rounded-full bg-slate-100 p-1 dark:bg-slate-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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

        {/* Mobile Slider */}
        <div className="relative md:hidden">
          <motion.div
            ref={sliderRef}
            animate={controls}
            className="flex w-full"
          >
            {plans.map((plan) => (
              <div key={plan.id} className="min-w-full px-4">
                <div
                  className={`overflow-hidden rounded-2xl border shadow-lg ${
                    plan.popular
                      ? "border-violet-500"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-violet-600 py-1 text-center text-sm font-medium text-white">
                      MOST POPULAR
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-extrabold">
                        ${getDiscountedPrice(plan.price)}
                      </span>
                      <span className="ml-1 text-xl font-medium text-slate-500 dark:text-slate-400">
                        /mo
                      </span>
                    </div>

                    <div className="mt-6">
                      <button
                        className={`w-full rounded-lg px-4 py-3 font-medium text-white ${plan.color}`}
                      >
                        Get Started
                      </button>
                    </div>

                    <div className="mt-6">
                      <h4 className="mb-2 font-medium">
                        What&apos;s included:
                      </h4>
                      <ul className="space-y-3">
                        {features.slice(0, 5).map((feature, i) => {
                          const value =
                            feature[
                              plan.id as keyof Omit<PricingFeature, "name">
                            ];
                          return value ? (
                            <li key={i} className="flex items-start">
                              <Check className="mr-2 h-5 w-5 flex-shrink-0 text-emerald-500" />
                              <span>
                                {feature.name}:{" "}
                                <strong>
                                  {typeof value === "string" ? value : ""}
                                </strong>
                              </span>
                            </li>
                          ) : null;
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Slider Controls */}
          <div className="mt-6 flex justify-between">
            <button
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className={`rounded-full p-2 ${
                currentSlide === 0
                  ? "text-slate-300 dark:text-slate-700"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex space-x-2">
              {plans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-2 rounded-full ${
                    currentSlide === index
                      ? "bg-violet-600 dark:bg-violet-500"
                      : "bg-slate-300 dark:bg-slate-700"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              disabled={currentSlide === plans.length - 1}
              className={`rounded-full p-2 ${
                currentSlide === plans.length - 1
                  ? "text-slate-300 dark:text-slate-700"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-6">
            {/* Features Column */}
            <div className="pt-[212px]">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-6">
                  {features.map((feature, i) => (
                    <div key={i} className="py-3 text-left">
                      <p className="font-medium text-slate-700 dark:text-slate-300">
                        {feature.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Plan Columns */}
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: plans.indexOf(plan) * 0.1 + 0.3,
                }}
                className={`overflow-hidden rounded-2xl border shadow-lg ${
                  plan.id === activePlan
                    ? `border-2 ${plan.color.replace("bg-", "border-")}`
                    : "border-slate-200 dark:border-slate-700"
                }`}
              >
                {plan.popular && (
                  <div className="bg-violet-600 py-1 text-center text-sm font-medium text-white">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold">
                      ${getDiscountedPrice(plan.price)}
                    </span>
                    <span className="ml-1 text-xl font-medium text-slate-500 dark:text-slate-400">
                      /mo
                    </span>
                  </div>

                  <div className="mt-6">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full rounded-lg px-4 py-3 font-medium text-white ${plan.color} flex items-center justify-center`}
                      onClick={() => setActivePlan(plan.id)}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.button>
                  </div>

                  <div className="mt-8 space-y-6">
                    {features.map((feature, i) => {
                      const value =
                        feature[plan.id as keyof Omit<PricingFeature, "name">];
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-center py-3"
                        >
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="h-5 w-5 text-emerald-500" />
                            ) : (
                              <span className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700"></span>
                            )
                          ) : (
                            <span className="font-medium">{value}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
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
