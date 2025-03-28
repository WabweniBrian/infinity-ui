"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const NewsletterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real implementation, you would send this to your API
      console.log("Subscribing email:", email);
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section
      ref={ref}
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-24 dark:from-slate-900 dark:via-indigo-950/30 dark:to-purple-950/20"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-xl dark:border-indigo-900/20 dark:bg-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content Side */}
            <motion.div
              className="p-8 md:p-12"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-4 inline-block">
                <span className="rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                  Stay Updated
                </span>
              </div>

              <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Subscribe to Our{" "}
                <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                  Newsletter
                </span>
              </h2>

              <p className="mb-8 text-slate-600 dark:text-slate-400">
                Get the latest articles, tutorials, and updates delivered
                straight to your inbox. No spam, just valuable content to help
                you stay ahead.
              </p>

              {!subscribed ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:ring-indigo-400"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="consent"
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:text-indigo-400 dark:focus:ring-indigo-400"
                      required
                    />
                    <label
                      htmlFor="consent"
                      className="ml-2 block text-sm text-slate-600 dark:text-slate-400"
                    >
                      I agree to receive emails and accept the{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:underline dark:text-indigo-400"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-medium text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-600 hover:to-purple-600 dark:from-indigo-600 dark:to-purple-600 dark:shadow-indigo-500/10 dark:hover:from-indigo-500 dark:hover:to-purple-500"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Subscribe Now
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  className="rounded-lg border border-green-100 bg-green-50 p-6 text-center dark:border-green-900/30 dark:bg-green-900/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    Thank You for Subscribing!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    You&apos;ve successfully subscribed to our newsletter. Check
                    your inbox for a confirmation email.
                  </p>
                </motion.div>
              )}

              <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  2,500+ Subscribers
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9"></path>
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
                  </svg>
                  Weekly Updates
                </span>
              </div>
            </motion.div>

            {/* Image Side */}
            <motion.div
              className="relative h-64 bg-indigo-100 dark:bg-indigo-900/20 lg:h-auto"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/40 dark:to-purple-500/40" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-3/4 w-3/4">
                  <svg
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-full w-full text-indigo-500 opacity-10 dark:text-indigo-400"
                  >
                    <path
                      fill="currentColor"
                      d="M45.3,-76.2C59.9,-69.2,73.5,-59.3,81.5,-45.6C89.5,-31.9,91.9,-14.3,89.5,2.4C87.2,19,80.1,34.8,70.2,48.1C60.3,61.5,47.6,72.4,33.3,77.8C18.9,83.3,2.8,83.3,-12.9,80.1C-28.6,76.9,-44,70.5,-56.6,60.1C-69.2,49.7,-79,35.3,-83.1,19.3C-87.3,3.3,-85.8,-14.3,-79.2,-29.2C-72.6,-44.1,-60.9,-56.3,-47.1,-63.7C-33.2,-71.1,-17.1,-73.7,-0.6,-72.7C15.9,-71.7,30.7,-83.2,45.3,-76.2Z"
                      transform="translate(100 100)"
                    />
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500 text-white dark:bg-indigo-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                      </svg>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                      Never Miss an Update
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Join our community of readers and stay informed with the
                      latest trends and insights.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
