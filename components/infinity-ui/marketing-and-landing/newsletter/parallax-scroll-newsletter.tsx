"use client";

import type React from "react";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  Layers,
  MousePointer,
  Sparkles,
} from "lucide-react";

const ParallaxScrollNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const opacity1 = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.3, 1, 0.3]);
  const opacity2 = useTransform(
    scrollYProgress,
    [0.2, 0.5, 0.8],
    [0.3, 1, 0.3],
  );
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.7, 1], [0.3, 1, 0.3]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[150vh] w-full bg-gradient-to-b from-slate-50 to-white"
    >
      {/* Parallax background elements*/}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: y1, opacity: opacity1 }}
          className="absolute left-[10%] top-[10%] h-64 w-64 rounded-full bg-pink-200 opacity-30 blur-3xl"
        />
        <motion.div
          style={{ y: y2, opacity: opacity2 }}
          className="absolute right-[15%] top-[30%] h-80 w-80 rounded-full bg-blue-200 opacity-30 blur-3xl"
        />
        <motion.div
          style={{ y: y3, opacity: opacity3 }}
          className="absolute bottom-[20%] left-[20%] h-72 w-72 rounded-full bg-purple-200 opacity-30 blur-3xl"
        />
      </div>

      {/* Main content - positioned at the top section for better visibility */}
      <div className="sticky top-0 z-10 flex min-h-screen items-center">
        <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-pink-50 to-purple-50 px-4 py-2 text-sm font-medium text-pink-600"
              >
                <Layers className="mr-2 h-4 w-4" />
                <span>Parallax Newsletter</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-6 text-4xl font-bold sm:text-5xl"
              >
                Experience depth with our{" "}
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  parallax newsletter
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="mb-8 max-w-xl text-lg text-gray-600"
              >
                Subscribe to our newsletter and dive into a world of depth and
                dimension. Get the latest updates, insights, and exclusive
                content delivered straight to your inbox.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="max-w-md">
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <div className="relative flex-grow">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="w-full rounded-xl border-2 border-gray-200 py-4 pl-12 pr-4 text-gray-800 outline-none transition-colors focus:border-pink-500"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-6 py-4 font-medium text-white transition-all hover:shadow-lg"
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
                    className="flex max-w-md items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-6"
                  >
                    <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                    <div>
                      <h4 className="mb-1 font-medium text-green-800">
                        Thank you for subscribing!
                      </h4>
                      <p className="text-green-700">
                        We&apos;ve sent a confirmation email to{" "}
                        <span className="font-medium">{email}</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-8 flex flex-col gap-4 text-sm text-gray-500 sm:flex-row sm:items-center"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-pink-500" />
                  <span>Weekly updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  <span>Exclusive content</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <span>No spam, ever</span>
                </div>
              </motion.div>
            </div>

            {/* Right illustration */}
            <div className="relative h-[500px]">
              {/* Parallax layers */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="absolute inset-0"
              >
                {/* Background layer */}
                <motion.div
                  style={{ y: y1 }}
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-pink-50 to-purple-50"
                />

                {/* Middle layer */}
                <motion.div
                  style={{ y: y2 }}
                  className="absolute inset-10 rounded-2xl border border-gray-100 bg-white shadow-sm"
                >
                  <div className="absolute left-6 right-6 top-6 h-40 rounded-xl bg-gradient-to-r from-pink-100 to-purple-100" />
                  <div className="absolute left-6 right-6 top-52 h-12 rounded-lg bg-gray-100" />
                  <div className="absolute left-6 right-6 top-72 h-12 rounded-lg bg-gray-100" />
                  <div className="absolute bottom-12 left-6 h-12 w-24 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500" />
                </motion.div>

                {/* Foreground elements */}
                <motion.div
                  style={{ y: y3 }}
                  className="absolute right-1/4 top-1/4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg"
                >
                  <Mail className="h-8 w-8 text-pink-500" />
                </motion.div>

                <motion.div
                  style={{ y: y2 }}
                  className="absolute bottom-1/4 left-1/4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg"
                >
                  <Sparkles className="h-6 w-6 text-purple-500" />
                </motion.div>

                <motion.div
                  style={{ y: y1 }}
                  className="absolute left-1/3 top-1/3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg"
                >
                  <MousePointer className="h-5 w-5 text-blue-500" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="fixed bottom-4 left-1/2 flex -translate-x-1/2 transform flex-col items-center text-sm text-gray-400"
        >
          <span>Scroll to see parallax effect</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="mt-2"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxScrollNewsletter;
