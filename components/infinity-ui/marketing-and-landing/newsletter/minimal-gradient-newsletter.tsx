"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";

const MinimalGradientNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section className="w-full bg-white py-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-[1px]">
            <div className="absolute inset-0 rounded-3xl bg-white"></div>
          </div>

          <div className="relative p-8 sm:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-teal-100 to-blue-100"
              >
                <Mail className="h-8 w-8 text-blue-600" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-4 text-3xl font-bold sm:text-4xl"
              >
                Subscribe to our newsletter
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-teal-400 to-blue-600"
              ></motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8 text-gray-600"
              >
                Stay up to date with the latest news, updates, and exclusive
                offers. We&apos;ll send you a curated digest of the most
                important stories.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="mx-auto max-w-md">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="flex-1 rounded-xl border border-gray-200 px-5 py-3 text-gray-800 outline-none transition-colors focus:border-blue-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-3 font-medium text-white transition-all hover:shadow-lg sm:whitespace-nowrap"
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
                    className="mx-auto flex max-w-md items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4"
                  >
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                    <p className="text-green-800">
                      Thanks for subscribing! Check your email to confirm.
                    </p>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-500"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-teal-500" />
                  <span>No spam</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>Unsubscribe anytime</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>Weekly digest</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              name: "Alex Morgan",
              role: "Product Designer",
              quote:
                "The newsletter has been invaluable for staying updated with industry trends.",
              delay: 0.2,
            },
            {
              name: "Sarah Johnson",
              role: "Marketing Director",
              quote:
                "Concise, relevant, and actually useful. One of the few newsletters I always read.",
              delay: 0.3,
            },
            {
              name: "Michael Chen",
              role: "Startup Founder",
              quote:
                "Their insights have directly influenced several of our strategic decisions.",
              delay: 0.4,
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: testimonial.delay }}
              className="rounded-2xl bg-gray-50 p-6"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-teal-400 to-blue-500 font-medium text-white">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{testimonial.quote}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MinimalGradientNewsletter;
