"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Check, HelpCircle } from "lucide-react";
import { useEffect, useState } from "react";

const PricingToggleCta = () => {
  const controls = useAnimation();
  const [isAnnual, setIsAnnual] = useState(true);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Calculate savings
  const calculateSavings = (monthlyPrice: number) => {
    const annualPrice = monthlyPrice * 12 * 0.8; // 20% discount
    return Math.round(monthlyPrice * 12 - annualPrice);
  };

  // Plan data
  const plan = {
    name: "Pro Plan",
    description: "Perfect for growing businesses and professionals",
    monthlyPrice: 29,
    features: [
      "All premium features",
      "Unlimited projects",
      "Unlimited team members",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "API access",
    ],
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="p-8">
            <motion.div variants={itemVariants} className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                {plan.name}
              </h2>
              <p className="text-gray-600">{plan.description}</p>
            </motion.div>

            {/* Pricing toggle */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="flex items-center justify-center gap-4">
                <span
                  className={`text-sm font-medium ${!isAnnual ? "text-gray-900" : "text-gray-500"}`}
                >
                  Monthly
                </span>

                <button
                  onClick={() => setIsAnnual(!isAnnual)}
                  className="relative h-6 w-12 rounded-full bg-gray-200"
                >
                  <span className="sr-only">Toggle pricing</span>
                  <motion.div
                    layout
                    className="absolute top-1 h-4 w-4 rounded-full bg-white"
                    animate={{ x: isAnnual ? 26 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      backgroundColor: isAnnual ? "#3b82f6" : "#e5e7eb",
                    }}
                  />
                </button>

                <span
                  className={`flex items-center gap-1 text-sm font-medium ${isAnnual ? "text-gray-900" : "text-gray-500"}`}
                >
                  Annual
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                    Save 20%
                  </span>
                </span>
              </div>
            </motion.div>

            {/* Price display */}
            <motion.div
              variants={itemVariants}
              className="mb-6 flex flex-col items-center justify-center"
            >
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-gray-900">
                  $
                  {isAnnual
                    ? Math.round(plan.monthlyPrice * 0.8)
                    : plan.monthlyPrice}
                </span>
                <span className="ml-1 text-gray-500">/month</span>
              </div>

              {isAnnual && (
                <div className="mt-1 text-sm text-gray-500">
                  Billed annually (${Math.round(plan.monthlyPrice * 0.8 * 12)}
                  /year)
                </div>
              )}

              {isAnnual && (
                <div className="mt-2 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  Save ${calculateSavings(plan.monthlyPrice)} per year
                </div>
              )}
            </motion.div>

            {/* Features */}
            <motion.div variants={itemVariants} className="mb-6 space-y-3">
              <div className="text-center text-sm font-medium text-gray-700">
                What&apos;s included:
              </div>

              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.div variants={itemVariants}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <div className="mt-4 text-center text-xs text-gray-500">
                No credit card required • 14-day free trial
              </div>
            </motion.div>

            {/* Help link */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center justify-center gap-1 text-sm text-gray-500"
            >
              <HelpCircle className="h-4 w-4" />
              <span>
                Need help choosing?{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  Talk to sales
                </a>
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingToggleCta;
