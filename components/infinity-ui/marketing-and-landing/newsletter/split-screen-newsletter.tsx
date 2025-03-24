"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";

const SplitScreenNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center p-8 md:w-1/2 md:p-16"
        >
          <div className="mb-6 inline-flex w-fit items-center rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
            <Mail className="mr-2 h-4 w-4" />
            <span>Join our newsletter</span>
          </div>

          <h2 className="mb-6 bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Get insights delivered to your inbox
          </h2>

          <p className="mb-8 max-w-md text-lg text-gray-600">
            Join 25,000+ subscribers and get our 5-minute daily newsletter on
            what matters in tech and business.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-xl border-2 border-gray-200 px-5 py-4 text-gray-800 outline-none transition-colors focus:border-indigo-500"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-4 font-medium text-white transition-all hover:shadow-lg"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-6"
            >
              <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
              <div>
                <h4 className="mb-1 font-medium text-green-800">
                  Thank you for subscribing!
                </h4>
                <p className="text-sm text-green-700">
                  We&apos;ve sent a confirmation email to{" "}
                  <span className="font-medium">{email}</span>
                </p>
              </div>
            </motion.div>
          )}

          <div className="mt-8 flex flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-500" />
              <span>No spam, ever</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-500" />
              <span>Unsubscribe anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-500" />
              <span>Daily insights</span>
            </div>
          </div>
        </motion.div>

        {/* Right illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center bg-gradient-to-br from-indigo-50 to-violet-50 p-8 md:w-1/2 md:p-16"
        >
          <div className="relative w-full max-w-md">
            {/* Email illustration */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -15, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                ease: "easeInOut",
              }}
              className="relative z-10 mb-6 rounded-2xl bg-white p-6 shadow-xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                  <Mail className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    Daily Insights
                  </div>
                  <div className="text-xs text-gray-500">8:30 AM</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-4 w-3/4 rounded-full bg-gray-100"></div>
                <div className="h-4 rounded-full bg-gray-100"></div>
                <div className="h-4 w-5/6 rounded-full bg-gray-100"></div>
                <div className="h-4 w-2/3 rounded-full bg-gray-100"></div>
              </div>

              <div className="mt-5 flex justify-end">
                <div className="rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
                  Read More
                </div>
              </div>
            </motion.div>

            {/* Second email */}
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2.5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="relative z-20 ml-12 rounded-2xl bg-white p-6 shadow-lg"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100">
                  <Mail className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">
                    Weekly Roundup
                  </div>
                  <div className="text-xs text-gray-500">Yesterday</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-4 rounded-full bg-gray-100"></div>
                <div className="h-4 w-4/5 rounded-full bg-gray-100"></div>
                <div className="h-4 w-3/4 rounded-full bg-gray-100"></div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-200 opacity-20 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-violet-300 opacity-20 blur-3xl"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SplitScreenNewsletter;
