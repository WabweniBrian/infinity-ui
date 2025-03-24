"use client";

import type React from "react";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Bell, CheckCircle, Mail, Star } from "lucide-react";

const FloatingCardNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

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
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-purple-100 opacity-30 blur-3xl"></div>
        <div className="absolute left-1/4 top-1/2 h-60 w-60 rounded-full bg-blue-100 opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 h-60 w-60 rounded-full bg-teal-100 opacity-30 blur-3xl"></div>
      </div>

      <div className="container relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative z-10 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-xl"
          style={{
            boxShadow:
              "0 10px 40px -10px rgba(0, 0, 0, 0.1), 0 20px 60px -30px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="p-8 sm:p-12">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
              {/* Content */}
              <div className="lg:col-span-3">
                <motion.div
                  variants={itemVariants}
                  className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-2 text-sm font-medium text-purple-600"
                >
                  <Star className="mr-2 h-4 w-4" />
                  <span>Premium Newsletter</span>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="mb-6 text-3xl font-bold sm:text-4xl"
                >
                  Get the{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    inside scoop
                  </span>{" "}
                  on the latest trends
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="mb-8 max-w-xl text-lg text-gray-600"
                >
                  Join our exclusive newsletter and get weekly insights, tips,
                  and resources delivered straight to your inbox. Stay ahead of
                  the curve!
                </motion.p>

                <motion.div variants={itemVariants}>
                  {!isSubmitted ? (
                    <form
                      onSubmit={handleSubmit}
                      className="max-w-xl space-y-4 sm:flex sm:gap-3 sm:space-y-0"
                    >
                      <div className="relative flex-grow">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email address"
                          required
                          className="w-full rounded-xl border-2 border-gray-200 py-4 pl-12 pr-4 text-gray-800 outline-none transition-colors focus:border-purple-500"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 font-medium text-white transition-all hover:shadow-lg sm:whitespace-nowrap"
                      >
                        <span>Subscribe Now</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex max-w-xl items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-6"
                    >
                      <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                      <div>
                        <h4 className="mb-1 font-medium text-green-800">
                          You&apos;re all set!
                        </h4>
                        <p className="text-green-700">
                          We&apos;ve sent a confirmation email to{" "}
                          <span className="font-medium">{email}</span>. Check
                          your inbox to complete the subscription.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                      <Bell className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        Weekly Updates
                      </div>
                      <div className="text-gray-500">Every Monday</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        Exclusive Content
                      </div>
                      <div className="text-gray-500">Subscriber only</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                      <Star className="h-5 w-5 text-teal-600" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">
                        Premium Insights
                      </div>
                      <div className="text-gray-500">Expert analysis</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating cards */}
              <div className="relative lg:col-span-2">
                <div className="relative flex h-full min-h-[300px] items-center justify-center">
                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3,
                      ease: "easeInOut",
                    }}
                    className="absolute z-20 w-64 -rotate-6 transform rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
                    style={{
                      top: "10%",
                      left: "5%",
                      boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100">
                        <Star className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-800">
                        Weekly Digest
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded-full bg-gray-100"></div>
                      <div className="h-3 w-5/6 rounded-full bg-gray-100"></div>
                      <div className="h-3 w-4/6 rounded-full bg-gray-100"></div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2.5,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="absolute z-10 w-64 rotate-3 transform rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
                    style={{
                      top: "30%",
                      right: "5%",
                      boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <Bell className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-sm font-medium text-gray-800">
                        Latest Trends
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full rounded-full bg-gray-100"></div>
                      <div className="h-3 w-3/4 rounded-full bg-gray-100"></div>
                      <div className="h-3 w-5/6 rounded-full bg-gray-100"></div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: [0, -12, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 3.5,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                    className="absolute z-30 w-48 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 p-6 text-white shadow-lg"
                    style={{
                      bottom: "15%",
                      left: "15%",
                      boxShadow: "0 10px 30px -5px rgba(79, 70, 229, 0.4)",
                    }}
                  >
                    <div className="mb-2 text-sm font-medium">
                      Join 25,000+ readers
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-white bg-opacity-20"></div>
                      <div className="h-2 w-4/5 rounded-full bg-white bg-opacity-20"></div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FloatingCardNewsletter;
