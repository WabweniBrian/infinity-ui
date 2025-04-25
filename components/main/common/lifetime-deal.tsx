"use client";

import { motion } from "framer-motion";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const LifetimeDealCTA = () => {
  const features = [
    "Ulimited licenses for all components",
    "Access to all components and packs (ecommerce, dashboard, marketing, forms)",
    "AI components included",
    "Over 450+ premium modern components",
    "New components added regularly",
    "Free lifetime updates",
  ];

  return (
    <div className="w-full px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-pink via-[#e85542] to-brand-yellow shadow-xl">
          {/* Background elements */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/20 blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-brand/20 blur-3xl"></div>

          <div className="relative z-10 grid gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-12">
            {/* Left column - Main content */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm"
                >
                  <Sparkles className="mr-2 h-4 w-4 text-brand-yellow" />
                  <span>Limited Time Offer</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
                >
                  Get <span className="text-brand-yellow">Lifetime Access</span>{" "}
                  to Infinity UI
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl text-white/90"
                >
                  Unlock all components at an exclusive{" "}
                  <span className="font-bold text-white">65% discount</span>
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-medium text-white">
                  What you&#39;ll get:
                </h3>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className="flex items-start"
                    >
                      <div className="mr-3 mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-white">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-white/90">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
              >
                <Link
                  href="/checkout?paymentFor=bundle"
                  className="group relative overflow-hidden rounded-lg bg-white px-6 py-3 text-center font-medium text-brand shadow-lg transition-all hover:!text-white hover:shadow-xl"
                >
                  <span className="relative z-10">Get Early Access</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-brand to-[#0d8a96] opacity-0 transition-opacity group-hover:opacity-100"></span>
                </Link>

                <Link
                  href="/components"
                  className="flex items-center justify-center rounded-lg border border-white/30 px-6 py-3 text-center font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <span>Explore Components</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            {/* Right column - Pricing */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-medium text-white">
                    Lifetime Deal
                  </h3>
                  <div className="rounded-full bg-yellow-800 px-3 py-1 text-xs font-medium text-yellow-100">
                    65% OFF
                  </div>
                </div>

                <div className="mb-4 flex items-end">
                  <div className="text-4xl font-bold text-white">$199</div>
                  <div className="ml-2 text-lg text-white/80 line-through">
                    $569
                  </div>
                </div>

                <div className="mb-6 text-sm text-white/90">
                  One-time payment, lifetime access
                </div>

                <div className="mb-6 rounded-lg bg-white/5 p-4">
                  <p className="text-sm text-white/90">
                    <span className="font-medium text-yellow-400">
                      Limited offer:
                    </span>{" "}
                    This special pricing is only available for a limited time.
                    Get lifetime access before prices increase.
                  </p>
                </div>

                <Link
                  href="/checkout?paymentFor=bundle"
                  className="group relative block w-full overflow-hidden rounded-lg bg-white px-6 py-3 text-center font-medium text-brand-yellow shadow-lg transition-all hover:!text-white hover:shadow-xl"
                >
                  <span className="relative z-10">Claim Your Discount</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-brand-yellow/80 to-brand-pink/80 opacity-0 transition-opacity group-hover:opacity-100"></span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifetimeDealCTA;
