"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Moon,
  Sun,
  Mail,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const DarkModeForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check system preference on mount
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
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="w-full max-w-md">
        <div
          className={`overflow-hidden rounded-2xl shadow-xl transition-colors duration-300 ${
            isDarkMode ? "border border-gray-700 bg-gray-800" : "bg-white"
          }`}
        >
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <h2
                className={`text-2xl font-bold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Forgot Password
              </h2>

              <motion.button
                onClick={toggleDarkMode}
                className={`rounded-full p-2 transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-gray-700 text-yellow-300"
                    : "bg-gray-100 text-gray-700"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </motion.button>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p
                    className={`mb-6 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Enter your email address and we&apos;ll send you
                    instructions to reset your password.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className={`mb-2 block text-sm font-medium transition-colors duration-300 ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Mail
                            className={`h-5 w-5 transition-colors duration-300 ${
                              isDarkMode ? "text-gray-500" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`block w-full rounded-lg border py-3 pl-10 pr-3 transition-colors duration-300 focus:border-transparent focus:ring-2 focus:ring-indigo-500 ${
                            isDarkMode
                              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                              : "border-gray-300 bg-white text-gray-900 placeholder-gray-400"
                          }`}
                          placeholder="name@example.com"
                        />
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 flex items-center text-sm text-red-500"
                        >
                          <AlertCircle className="mr-1 h-4 w-4" />
                          {error}
                        </motion.div>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-lg border border-transparent bg-indigo-600 px-4 py-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        />
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <motion.div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>

                  <h3
                    className={`mb-2 text-xl font-bold transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Check your inbox
                  </h3>

                  <p
                    className={`mb-6 transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    We&apos;ve sent a password reset link to{" "}
                    <span className="font-medium">{email}</span>
                  </p>

                  <div
                    className={`mb-6 rounded-lg p-4 transition-colors duration-300 ${
                      isDarkMode ? "bg-gray-700/50" : "bg-indigo-50"
                    }`}
                  >
                    <p
                      className={`text-sm transition-colors duration-300 ${
                        isDarkMode ? "text-gray-300" : "text-indigo-800"
                      }`}
                    >
                      If you don&apos;t receive an email within a few minutes,
                      check your spam folder or try again.
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isDarkMode
                        ? "text-indigo-400 hover:text-indigo-300"
                        : "text-indigo-600 hover:text-indigo-700"
                    }`}
                  >
                    Try a different email
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p
            className={`text-sm transition-colors duration-300 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            Remember your password?{" "}
            <a
              href="#"
              className={`font-medium transition-colors duration-300 ${
                isDarkMode
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:text-indigo-700"
              }`}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DarkModeForgotPassword;
