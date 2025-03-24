"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle, Mail, Moon, Sun, Star } from "lucide-react";

const DarkModeNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check user's preferred color scheme on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <section
      className={`w-full py-20 transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-end">
          <button
            onClick={toggleDarkMode}
            className={`rounded-full p-2 ${isDarkMode ? "bg-gray-800 text-yellow-400" : "bg-white text-gray-700 shadow-sm"}`}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className={`mb-6 inline-flex items-center rounded-full px-4 py-2 ${
                isDarkMode
                  ? "bg-gray-800 text-teal-400"
                  : "bg-teal-50 text-teal-600"
              } text-sm font-medium`}
            >
              <Star className="mr-2 h-4 w-4" />
              <span>Adaptive Newsletter</span>
            </div>

            <h2
              className={`mb-6 text-4xl font-bold sm:text-5xl ${isDarkMode ? "text-white" : "text-gray-900"}`}
            >
              A newsletter that adapts to{" "}
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                your preferences
              </span>
            </h2>

            <p
              className={`mb-8 max-w-xl text-lg ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              Subscribe to our newsletter and receive content that adapts to
              your reading preferences. Toggle between light and dark mode for a
              personalized experience.
            </p>

            <div className="mb-8 space-y-6">
              {[
                {
                  icon: (
                    <Sun
                      className={`h-5 w-5 ${isDarkMode ? "text-teal-400" : "text-teal-600"}`}
                    />
                  ),
                  title: "Light Mode Content",
                  description:
                    "Optimized for daytime reading with bright, engaging visuals.",
                },
                {
                  icon: (
                    <Moon
                      className={`h-5 w-5 ${isDarkMode ? "text-teal-400" : "text-teal-600"}`}
                    />
                  ),
                  title: "Dark Mode Content",
                  description:
                    "Easy on the eyes for nighttime reading with dark-optimized images.",
                },
                {
                  icon: (
                    <Star
                      className={`h-5 w-5 ${isDarkMode ? "text-teal-400" : "text-teal-600"}`}
                    />
                  ),
                  title: "Personalized Experience",
                  description:
                    "Content that adapts to your preferences and reading habits.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div
                    className={`h-12 w-12 flex-shrink-0 rounded-xl ${
                      isDarkMode ? "bg-gray-800" : "bg-white shadow-sm"
                    } flex items-center justify-center`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3
                      className={`mb-1 font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div
              className={`${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"} rounded-3xl border p-8 shadow-xl sm:p-10`}
            >
              <div className="mb-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${
                    isDarkMode ? "bg-gray-700" : "bg-teal-50"
                  }`}
                >
                  <Mail
                    className={`h-8 w-8 ${isDarkMode ? "text-teal-400" : "text-teal-600"}`}
                  />
                </motion.div>

                <h3
                  className={`mb-2 text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Join our newsletter
                </h3>
                <p
                  className={`mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Get adaptive content delivered to your inbox
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className={`w-full rounded-xl px-4 py-3 ${
                        isDarkMode
                          ? "border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                          : "border-gray-200 bg-white text-gray-800"
                      } border outline-none transition-colors focus:border-teal-500`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="dark-mode-email"
                      className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Mail
                          className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
                        />
                      </div>
                      <input
                        id="dark-mode-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className={`w-full rounded-xl py-3 pl-12 pr-4 ${
                          isDarkMode
                            ? "border-gray-600 bg-gray-700 text-white placeholder:text-gray-400"
                            : "border-gray-200 bg-white text-gray-800"
                        } border outline-none transition-colors focus:border-teal-500`}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex cursor-pointer items-start gap-2">
                      <div className="flex h-5 items-center">
                        <input
                          type="checkbox"
                          className={`form-checkbox h-4 w-4 rounded ${
                            isDarkMode
                              ? "border-gray-600 bg-gray-700"
                              : "border-gray-300 bg-white"
                          } border text-teal-500 focus:ring-teal-500`}
                        />
                      </div>
                      <span
                        className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                      >
                        I&apos;d like to receive personalized content based on
                        my reading preferences
                      </span>
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 py-3 font-medium text-white transition-all hover:shadow-lg"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${
                    isDarkMode
                      ? "border-gray-600 bg-gray-700"
                      : "border-teal-100 bg-teal-50"
                  } flex items-start gap-3 rounded-xl border p-6`}
                >
                  <CheckCircle
                    className={`h-6 w-6 ${isDarkMode ? "text-teal-400" : "text-teal-600"} mt-0.5 flex-shrink-0`}
                  />
                  <div>
                    <h4
                      className={`mb-1 font-medium ${isDarkMode ? "text-teal-300" : "text-teal-800"}`}
                    >
                      Thank you for subscribing!
                    </h4>
                    <p
                      className={isDarkMode ? "text-gray-300" : "text-teal-700"}
                    >
                      We&apos;ve sent a confirmation email to{" "}
                      <span className="font-medium">{email}</span>
                    </p>
                  </div>
                </motion.div>
              )}

              <div
                className={`mt-6 text-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                <p>We respect your privacy. Unsubscribe at any time.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DarkModeNewsletter;
