"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Calendar, CreditCard, Shield, Zap } from "lucide-react";
import { useEffect } from "react";

const FreeTrialCta = () => {
  const controls = useAnimation();

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

  return (
    <div className="w-full bg-gradient-to-br from-violet-50 via-white to-violet-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-5">
            {/* Left Content - 3 columns */}
            <div className="p-8 md:col-span-3 md:p-10">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700"
              >
                <Zap className="h-3 w-3" />
                START FOR FREE
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl"
              >
                Try <span className="text-violet-600">14 days</span> of premium
                features
              </motion.h2>

              <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                Experience all our premium features with no limitations. No
                credit card required, cancel anytime.
              </motion.p>

              {/* Feature list */}
              <motion.div
                variants={itemVariants}
                className="mb-8 grid gap-4 sm:grid-cols-2"
              >
                {[
                  { icon: Zap, text: "Full access to all features" },
                  { icon: CreditCard, text: "No credit card required" },
                  { icon: Calendar, text: "14-day free trial" },
                  { icon: Shield, text: "Cancel anytime" },
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                      <feature.icon className="h-3 w-3" />
                    </div>
                    <span className="text-sm text-gray-600">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition-all hover:bg-violet-700"
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <a
                  href="#"
                  className="flex items-center gap-1 text-sm font-medium text-violet-600 hover:text-violet-700"
                >
                  Learn more about our plans
                  <ArrowRight className="h-3 w-3" />
                </a>
              </motion.div>
            </div>

            {/* Right Content - 2 columns */}
            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 p-8 text-white md:col-span-2">
              <motion.div variants={itemVariants} className="mb-6">
                <div className="mb-1 text-lg font-medium">After your trial</div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-bold">$29</span>
                  <span>/month</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="h-5 w-5 text-violet-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>All premium features</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="h-5 w-5 text-violet-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Unlimited projects</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg
                    className="h-5 w-5 text-violet-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Priority support</span>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Money-back guarantee</div>
                    <div className="text-sm text-white/80">
                      30-day no-questions-asked refund policy
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FreeTrialCta;
