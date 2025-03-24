"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Mail, Check } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const CtaSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-purple-400/30 to-indigo-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-400/30 to-blue-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="diagonalLines"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="10"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diagonalLines)" />
          </svg>
        </div>

        {/* Floating Elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-purple-400/10 to-indigo-400/10"
            style={{
              width: Math.random() * 60 + 20,
              height: Math.random() * 60 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
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
        <div className="relative">
          <div className="absolute -inset-4 rotate-1 transform rounded-3xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 blur-xl"></div>
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.8 }}
                className="p-8 md:p-12"
              >
                <div className="mb-6 inline-flex items-center justify-center rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 px-4 py-2 backdrop-blur-sm dark:border-purple-500/30 dark:from-purple-500/20 dark:to-indigo-500/20">
                  <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    Limited Time Offer
                  </span>
                </div>

                <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                  Get 20% off when you
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
                    {" "}
                    subscribe today
                  </span>
                </h2>

                <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                  Join thousands of satisfied customers using our UI components
                  to build stunning interfaces. Subscribe to our newsletter and
                  get exclusive access to:
                </p>

                <div className="mb-8 space-y-4">
                  {[
                    "Early access to new components",
                    "Exclusive design resources and templates",
                    "Monthly tips and tutorials from our experts",
                    "Special discounts on premium products",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-indigo-500">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="ml-3 text-gray-600 dark:text-gray-300">
                        {benefit}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex-1">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:ring-purple-400"
                      />
                    </div>
                  </div>
                  <button className="inline-flex transform items-center justify-center whitespace-nowrap rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-purple-500/25">
                    Subscribe Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  By subscribing, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </motion.div>

              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }
                }
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-full min-h-[300px] lg:min-h-0"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600"></div>
                <div className="animate-shimmer absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.2)_50%,_transparent_75%,_transparent_100%)] bg-[length:250%_250%]"></div>

                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="max-w-md rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
                    <div className="mb-4 flex items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-white">Newsletter</h4>
                        <p className="text-sm text-white/80">
                          Join 25,000+ subscribers
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="rounded-lg bg-white/10 p-3">
                          <div className="mb-2 h-2 w-full rounded-full bg-white/20"></div>
                          <div className="h-2 w-2/3 rounded-full bg-white/20"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default CtaSection;
