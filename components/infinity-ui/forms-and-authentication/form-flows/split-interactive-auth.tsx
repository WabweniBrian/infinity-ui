"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  Eye,
  EyeOff,
  Facebook,
  Github,
  Lock,
  LogIn,
  Mail,
  Moon,
  Sun,
  User,
  X,
} from "lucide-react";

type AuthMode = "signin" | "signup" | "forgot";

const SplitInteractiveAuth = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset success state after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div
      className={`flex min-h-screen w-full transition-colors duration-300 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Left panel - Form */}
      <div className="relative flex w-full flex-col justify-center p-8 md:w-1/2 md:p-12 lg:p-16">
        <button
          onClick={toggleDarkMode}
          className={`absolute right-8 top-8 rounded-full p-2 transition-colors ${isDarkMode ? "bg-gray-800 text-gray-200 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="mx-auto w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div
              className={`mb-2 h-12 w-12 rounded-xl ${isDarkMode ? "bg-violet-500" : "bg-violet-600"}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-full w-full p-2 text-white"
              >
                <path
                  d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              {authMode === "signin" && (
                <motion.div
                  key="signin-header"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1
                    className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Welcome back
                  </h1>
                  <p
                    className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Sign in to your account to continue
                  </p>
                </motion.div>
              )}

              {authMode === "signup" && (
                <motion.div
                  key="signup-header"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1
                    className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Create account
                  </h1>
                  <p
                    className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Sign up to get started with our platform
                  </p>
                </motion.div>
              )}

              {authMode === "forgot" && (
                <motion.div
                  key="forgot-header"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1
                    className={`text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Reset password
                  </h1>
                  <p
                    className={`mt-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    We&apos;ll send you instructions to reset your password
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence mode="wait">
            {authMode === "signin" && (
              <motion.form
                key="signin-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail
                        className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                      />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full rounded-lg py-3 pl-10 pr-4 outline-none transition-colors ${
                        isDarkMode
                          ? "border border-gray-700 bg-gray-800 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                          : "border border-gray-300 bg-white text-gray-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      }`}
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthMode("forgot")}
                      className={`text-xs font-medium ${isDarkMode ? "text-violet-400 hover:text-violet-300" : "text-violet-600 hover:text-violet-700"}`}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock
                        className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                      />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full rounded-lg py-3 pl-10 pr-10 outline-none transition-colors ${
                        isDarkMode
                          ? "border border-gray-700 bg-gray-800 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                          : "border border-gray-300 bg-white text-gray-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      }`}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className={`h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 ${isDarkMode ? "bg-gray-700" : ""}`}
                  />
                  <label
                    htmlFor="remember-me"
                    className={`ml-2 block text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Remember me
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className={`relative flex w-full items-center justify-center overflow-hidden rounded-lg py-3 font-medium text-white transition-all ${
                    isSubmitting || isSuccess
                      ? "cursor-not-allowed"
                      : "hover:shadow-lg"
                  } ${isDarkMode ? "bg-violet-600 hover:bg-violet-700" : "bg-violet-600 hover:bg-violet-700"}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1,
                        ease: "linear",
                      }}
                    />
                  ) : isSuccess ? (
                    <>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-green-500"
                      />
                      <span className="relative z-10 flex items-center">
                        Success
                        <svg
                          className="ml-2 h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      Sign in
                      <LogIn className="ml-2 h-4 w-4" />
                    </>
                  )}
                </motion.button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div
                      className={`w-full border-t ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
                    ></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span
                      className={`px-2 ${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-50 text-gray-500"}`}
                    >
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <motion.button
                    type="button"
                    className={`flex items-center justify-center rounded-lg py-2.5 transition-colors ${
                      isDarkMode
                        ? "border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    type="button"
                    className={`flex items-center justify-center rounded-lg py-2.5 transition-colors ${
                      isDarkMode
                        ? "border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                  </motion.button>
                  <motion.button
                    type="button"
                    className={`flex items-center justify-center rounded-lg py-2.5 transition-colors ${
                      isDarkMode
                        ? "border border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <p
                  className={`mt-4 text-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("signup")}
                    className={`font-medium ${isDarkMode ? "text-violet-400 hover:text-violet-300" : "text-violet-600 hover:text-violet-700"}`}
                  >
                    Sign up
                  </button>
                </p>
              </motion.form>
            )}

            {authMode === "signup" && (
              <motion.form
                key="signup-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <User
                        className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                      />
                    </div>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full rounded-lg py-3 pl-10 pr-4 outline-none transition-colors ${
                        isDarkMode
                          ? "border border-gray-700 bg-gray-800 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                          : "border border-gray-300 bg-white text-gray-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      }`}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="signup-email"
                    className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail
                        className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                      />
                    </div>
                    <input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full rounded-lg py-3 pl-10 pr-4 outline-none transition-colors ${
                        isDarkMode
                          ? "border border-gray-700 bg-gray-800 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                          : "border border-gray-300 bg-white text-gray-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      }`}
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="signup-password"
                    className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock
                        className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                      />
                    </div>
                    <input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full rounded-lg py-3 pl-10 pr-10 outline-none transition-colors ${
                        isDarkMode
                          ? "border border-gray-700 bg-gray-800 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                          : "border border-gray-300 bg-white text-gray-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      }`}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p
                    className={`mt-1 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Must be at least 8 characters with 1 uppercase, 1 number,
                    and 1 special character
                  </p>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className={`h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500 ${isDarkMode ? "bg-gray-700" : ""}`}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className={`ml-2 block text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    I agree to the{" "}
                    <Link
                      href="#"
                      className={`${isDarkMode ? "text-violet-400 hover:text-violet-300" : "text-violet-600 hover:text-violet-700"}`}
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className={`${isDarkMode ? "text-violet-400 hover:text-violet-300" : "text-violet-600 hover:text-violet-700"}`}
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className={`relative flex w-full items-center justify-center overflow-hidden rounded-lg py-3 font-medium text-white transition-all ${
                    isSubmitting || isSuccess
                      ? "cursor-not-allowed"
                      : "hover:shadow-lg"
                  } ${isDarkMode ? "bg-violet-600 hover:bg-violet-700" : "bg-violet-600 hover:bg-violet-700"}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1,
                        ease: "linear",
                      }}
                    />
                  ) : isSuccess ? (
                    <>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-green-500"
                      />
                      <span className="relative z-10 flex items-center">
                        Success
                        <svg
                          className="ml-2 h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </motion.button>

                <p
                  className={`mt-4 text-center text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("signin")}
                    className={`font-medium ${isDarkMode ? "text-violet-400 hover:text-violet-300" : "text-violet-600 hover:text-violet-700"}`}
                  >
                    Sign in
                  </button>
                </p>
              </motion.form>
            )}

            {authMode === "forgot" && (
              <motion.form
                key="forgot-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="forgot-email"
                    className={`block text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail
                        className={`h-5 w-5 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
                      />
                    </div>
                    <input
                      id="forgot-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full rounded-lg py-3 pl-10 pr-4 outline-none transition-colors ${
                        isDarkMode
                          ? "border border-gray-700 bg-gray-800 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                          : "border border-gray-300 bg-white text-gray-900 focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
                      }`}
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                  <p
                    className={`mt-1 text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    We&apos;ll send a password reset link to this email address
                  </p>
                </div>

                <motion.button
                  type="submit"
                  className={`relative flex w-full items-center justify-center overflow-hidden rounded-lg py-3 font-medium text-white transition-all ${
                    isSubmitting || isSuccess
                      ? "cursor-not-allowed"
                      : "hover:shadow-lg"
                  } ${isDarkMode ? "bg-violet-600 hover:bg-violet-700" : "bg-violet-600 hover:bg-violet-700"}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting || isSuccess}
                >
                  {isSubmitting ? (
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1,
                        ease: "linear",
                      }}
                    />
                  ) : isSuccess ? (
                    <>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-green-500"
                      />
                      <span className="relative z-10 flex items-center">
                        Email sent
                        <svg
                          className="ml-2 h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      Send reset link
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </motion.button>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setAuthMode("signin")}
                    className={`flex items-center text-sm font-medium ${isDarkMode ? "text-violet-400 hover:text-violet-300" : "text-violet-600 hover:text-violet-700"}`}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to sign in
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right panel - Interactive illustration */}
      <div
        className={`hidden md:block md:w-1/2 ${isDarkMode ? "bg-gray-800" : "bg-violet-50"}`}
      >
        <div className="relative flex h-full items-center justify-center">
          <AnimatePresence mode="wait">
            {authMode === "signin" && (
              <motion.div
                key="signin-illustration"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="p-12 text-center"
              >
                <div className="mx-auto mb-8 h-64 w-64">
                  <svg
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-full w-full ${isDarkMode ? "text-violet-400" : "text-violet-500"}`}
                  >
                    <circle
                      cx="200"
                      cy="200"
                      r="150"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray="30 30"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      d="M200 120C244.183 120 280 155.817 280 200C280 244.183 244.183 280 200 280C155.817 280 120 244.183 120 200C120 155.817 155.817 120 200 120Z"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M200 160C217.673 160 232 174.327 232 192C232 209.673 217.673 224 200 224C182.327 224 168 209.673 168 192C168 174.327 182.327 160 200 160Z"
                      fill="currentColor"
                    />
                    <path
                      d="M144 280C144 253.49 169.072 232 200 232C230.928 232 256 253.49 256 280"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h2
                  className={`mb-2 text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Welcome back!
                </h2>
                <p
                  className={`mx-auto max-w-md ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Sign in to access your account dashboard, manage your
                  settings, and continue your journey with us.
                </p>
              </motion.div>
            )}

            {authMode === "signup" && (
              <motion.div
                key="signup-illustration"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="p-12 text-center"
              >
                <div className="mx-auto mb-8 h-64 w-64">
                  <svg
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-full w-full ${isDarkMode ? "text-violet-400" : "text-violet-500"}`}
                  >
                    <rect
                      x="100"
                      y="100"
                      width="200"
                      height="200"
                      rx="20"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <path
                      d="M160 150H240"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M160 200H240"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M160 250H240"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="300"
                      cy="300"
                      r="40"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M300 280V320"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M280 300H320"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h2
                  className={`mb-2 text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Join our community
                </h2>
                <p
                  className={`mx-auto max-w-md ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Create an account to unlock all features, save your
                  preferences, and become part of our growing community.
                </p>
              </motion.div>
            )}

            {authMode === "forgot" && (
              <motion.div
                key="forgot-illustration"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="p-12 text-center"
              >
                <div className="mx-auto mb-8 h-64 w-64">
                  <svg
                    viewBox="0 0 400 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-full w-full ${isDarkMode ? "text-violet-400" : "text-violet-500"}`}
                  >
                    <path
                      d="M200 100L300 150V250L200 300L100 250V150L200 100Z"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <path
                      d="M200 100V300"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="10 10"
                    />
                    <path
                      d="M100 150L300 250"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="10 10"
                    />
                    <path
                      d="M300 150L100 250"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="10 10"
                    />
                    <circle
                      cx="200"
                      cy="200"
                      r="40"
                      fill="currentColor"
                      fillOpacity="0.2"
                    />
                    <path
                      d="M180 200H220"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M200 180V220"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h2
                  className={`mb-2 text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}
                >
                  Reset your password
                </h2>
                <p
                  className={`mx-auto max-w-md ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Don&apos;t worry, it happens to the best of us. Enter your
                  email and we&apos;ll send you instructions to reset your
                  password.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SplitInteractiveAuth;
