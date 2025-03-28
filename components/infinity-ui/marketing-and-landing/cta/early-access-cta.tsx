"use client";

import type React from "react";

import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Bell, Check, Mail, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const EarlyAccessCta = () => {
  const controls = useAnimation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

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

  // Features
  const features = [
    "Be the first to access our platform",
    "Exclusive early adopter pricing",
    "Shape the product with direct feedback",
    "Priority onboarding and support",
  ];

  return (
    <div className="w-full bg-gradient-to-b from-cyan-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content - Product Preview */}
            <div className="relative bg-gradient-to-br from-cyan-600 to-blue-700 p-8 text-white md:p-10">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="smallGrid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#smallGrid)" />
                </svg>
              </div>

              <div className="relative">
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                    <Bell className="h-3 w-3" />
                    COMING SOON
                  </div>

                  <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
                    Get Early Access to Our Revolutionary Platform
                  </h2>

                  <p className="text-cyan-50">
                    Join our exclusive waitlist for early access to the most
                    innovative productivity tool of 2023. Limited spots
                    available.
                  </p>
                </motion.div>

                {/* Product mockup */}
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="relative mx-auto h-[200px] w-full max-w-sm overflow-hidden rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-md">
                    <Image
                      src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp&text=Product+Preview"
                      alt="Product preview"
                      fill
                      className="rounded object-cover"
                    />

                    {/* Floating elements */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                      className="absolute -right-10 -top-10 h-20 w-20 rounded-full bg-cyan-500/30 backdrop-blur-md"
                    />

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="absolute -bottom-10 -left-10 h-16 w-16 rounded-full bg-blue-500/30 backdrop-blur-md"
                    />
                  </div>
                </motion.div>

                {/* Waitlist counter */}
                <motion.div
                  variants={itemVariants}
                  className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-cyan-200" />
                      <span className="font-medium">Waitlist Status</span>
                    </div>
                    <div className="rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold">
                      85% Full
                    </div>
                  </div>

                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
                    <motion.div
                      className="h-full rounded-full bg-cyan-300"
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </div>

                  <div className="mt-2 text-center text-sm text-cyan-100">
                    <strong>1,275 people</strong> ahead of you
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Content - Signup Form */}
            <div className="p-8 md:p-10">
              {!submitted ? (
                <>
                  <motion.div variants={itemVariants} className="mb-6">
                    <h3 className="mb-2 text-xl font-bold text-gray-900">
                      Reserve Your Spot
                    </h3>
                    <p className="text-gray-600">
                      Join our waitlist to be among the first to experience our
                      platform when we launch.
                    </p>
                  </motion.div>

                  <motion.form
                    variants={itemVariants}
                    onSubmit={handleSubmit}
                    className="mb-6"
                  >
                    <div className="mb-4">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                        <Mail className="h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-medium text-white transition-all hover:bg-cyan-700"
                    >
                      Join the Waitlist
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                  </motion.form>

                  {/* Features */}
                  <motion.div variants={itemVariants} className="mb-6">
                    <div className="mb-3 text-sm font-medium text-gray-700">
                      Early access benefits:
                    </div>
                    <div className="space-y-3">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-sm text-gray-600">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Social proof */}
                  <motion.div
                    variants={itemVariants}
                    className="rounded-lg bg-gray-50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((_, i) => (
                          <div
                            key={i}
                            className="h-8 w-8 overflow-hidden rounded-full border-2 border-white"
                          >
                            <Image
                              src={`https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=32&width=32&text=${i + 1}`}
                              alt={`User ${i + 1}`}
                              width={32}
                              height={32}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>1,500+</strong> people have already joined the
                        waitlist
                      </div>
                    </div>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-100">
                    <Check className="h-10 w-10 text-cyan-600" />
                  </div>

                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    You&apos;re on the List!
                  </h3>
                  <p className="mb-6 max-w-md text-gray-600">
                    Thank you for joining our waitlist. We&apos;ll notify you
                    when early access becomes available.
                  </p>

                  <div className="rounded-lg bg-gray-50 p-4 text-center">
                    <div className="mb-2 text-sm font-medium text-gray-700">
                      Share with friends to move up the list:
                    </div>
                    <div className="flex justify-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                        </svg>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white"
                      >
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EarlyAccessCta;
