"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Facebook,
  Github,
  Lock,
  LogIn,
  Mail,
  Moon,
  Sparkles,
  Sun,
  Twitter,
  User,
} from "lucide-react";

type AuthMode = "signin" | "signup" | "forgot";
type TimeOfDay = "morning" | "afternoon" | "evening" | "night";

const ContextualAdaptiveAuth = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("morning");

  // Determine time of day on component mount
  useEffect(() => {
    const determineTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) {
        return "morning";
      } else if (hour >= 12 && hour < 17) {
        return "afternoon";
      } else if (hour >= 17 && hour < 21) {
        return "evening";
      } else {
        return "night";
      }
    };

    setTimeOfDay(determineTimeOfDay());

    // Update time of day every hour
    const interval = setInterval(
      () => {
        setTimeOfDay(determineTimeOfDay());
      },
      60 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

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

  // Get theme colors based on time of day
  const getThemeColors = () => {
    switch (timeOfDay) {
      case "morning":
        return {
          gradient: "from-amber-400 to-orange-500",
          icon: <Sun className="h-6 w-6" />,
          greeting: "Good morning",
          message: "Start your day right",
          accent: "amber",
          accentHex: "#f59e0b",
          bgStart: "bg-amber-50",
          bgEnd: "bg-orange-50",
        };
      case "afternoon":
        return {
          gradient: "from-blue-400 to-cyan-500",
          icon: <Sun className="h-6 w-6" />,
          greeting: "Good afternoon",
          message: "Hope your day is going well",
          accent: "blue",
          accentHex: "#3b82f6",
          bgStart: "bg-blue-50",
          bgEnd: "bg-cyan-50",
        };
      case "evening":
        return {
          gradient: "from-purple-400 to-pink-500",
          icon: <Sparkles className="h-6 w-6" />,
          greeting: "Good evening",
          message: "Winding down for the day?",
          accent: "purple",
          accentHex: "#8b5cf6",
          bgStart: "bg-purple-50",
          bgEnd: "bg-pink-50",
        };
      case "night":
        return {
          gradient: "from-indigo-500 to-blue-600",
          icon: <Moon className="h-6 w-6" />,
          greeting: "Good night",
          message: "Burning the midnight oil?",
          accent: "indigo",
          accentHex: "#6366f1",
          bgStart: "bg-indigo-50",
          bgEnd: "bg-blue-50",
        };
    }
  };

  const theme = getThemeColors();

  return (
    <div
      className={`flex min-h-screen w-full items-center justify-center bg-gradient-to-br ${theme.bgStart} ${theme.bgEnd} p-4`}
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            {/* Card Header */}
            <div
              className={`relative overflow-hidden bg-gradient-to-r ${theme.gradient} p-8 text-white`}
            >
              {/* Decorative elements */}
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white opacity-10"></div>

              <div className="relative z-10">
                <div className="mb-4 flex items-center">
                  <div className="mr-3 rounded-full bg-white/20 p-2">
                    {theme.icon}
                  </div>
                  <div>
                    <h2 className="text-lg font-medium">{theme.greeting}</h2>
                    <p className="text-sm text-white/80">{theme.message}</p>
                  </div>
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
                      <h1 className="text-2xl font-bold">Welcome back</h1>
                      <p className="mt-1 text-white/80">
                        Sign in to continue to your account
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
                      <h1 className="text-2xl font-bold">Create account</h1>
                      <p className="mt-1 text-white/80">
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
                      <h1 className="text-2xl font-bold">Reset password</h1>
                      <p className="mt-1 text-white/80">
                        We&apos;ll send you instructions to reset your password
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-8">
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
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-${theme.accent}-500 focus:ring-1 focus:ring-${theme.accent}-500`}
                          placeholder="name@example.com"
                          required
                          style={{
                            borderColor: email ? theme.accentHex : "",
                            boxShadow: email
                              ? `0 0 0 1px ${theme.accentHex}`
                              : "",
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setAuthMode("forgot")}
                          className={`text-xs font-medium text-${theme.accent}-600 hover:text-${theme.accent}-700`}
                          style={{ color: theme.accentHex }}
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 outline-none transition-colors focus:border-${theme.accent}-500 focus:ring-1 focus:ring-${theme.accent}-500`}
                          placeholder="••••••••"
                          required
                          style={{
                            borderColor: password ? theme.accentHex : "",
                            boxShadow: password
                              ? `0 0 0 1px ${theme.accentHex}`
                              : "",
                          }}
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
                        className={`form-checkbox h-4 w-4 rounded border-gray-300 text-${theme.accent}-600 focus:ring-${theme.accent}-500`}
                        style={{ color: theme.accentHex }}
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>

                    <motion.button
                      type="submit"
                      className={`relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r ${theme.gradient} py-3 font-medium text-white transition-all hover:shadow-lg`}
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
                            <Check className="ml-2 h-4 w-4" />
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
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <motion.button
                        type="button"
                        className="flex items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 transition-colors hover:bg-gray-50"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        type="button"
                        className="flex items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 transition-colors hover:bg-gray-50"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Facebook className="h-5 w-5 text-blue-600" />
                      </motion.button>
                      <motion.button
                        type="button"
                        className="flex items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 transition-colors hover:bg-gray-50"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Twitter className="h-5 w-5 text-blue-400" />
                      </motion.button>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-600">
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setAuthMode("signup")}
                        className={`font-medium text-${theme.accent}-600 hover:text-${theme.accent}-700`}
                        style={{ color: theme.accentHex }}
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
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-${theme.accent}-500 focus:ring-1 focus:ring-${theme.accent}-500`}
                          placeholder="John Doe"
                          required
                          style={{
                            borderColor: name ? theme.accentHex : "",
                            boxShadow: name
                              ? `0 0 0 1px ${theme.accentHex}`
                              : "",
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="signup-email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="signup-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-${theme.accent}-500 focus:ring-1 focus:ring-${theme.accent}-500`}
                          placeholder="name@example.com"
                          required
                          style={{
                            borderColor: email ? theme.accentHex : "",
                            boxShadow: email
                              ? `0 0 0 1px ${theme.accentHex}`
                              : "",
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="signup-password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 outline-none transition-colors focus:border-${theme.accent}-500 focus:ring-1 focus:ring-${theme.accent}-500`}
                          placeholder="••••••••"
                          required
                          style={{
                            borderColor: password ? theme.accentHex : "",
                            boxShadow: password
                              ? `0 0 0 1px ${theme.accentHex}`
                              : "",
                          }}
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
                      <p className="mt-1 text-xs text-gray-500">
                        Must be at least 8 characters with 1 uppercase, 1
                        number, and 1 special character
                      </p>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className={`form-checkbox h-4 w-4 rounded border-gray-300 text-${theme.accent}-600 focus:ring-${theme.accent}-500`}
                        required
                        style={{ color: theme.accentHex }}
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        I agree to the{" "}
                        <Link
                          href="#"
                          className={`text-${theme.accent}-600 hover:text-${theme.accent}-700`}
                          style={{ color: theme.accentHex }}
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="#"
                          className={`text-${theme.accent}-600 hover:text-${theme.accent}-700`}
                          style={{ color: theme.accentHex }}
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <motion.button
                      type="submit"
                      className={`relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r ${theme.gradient} py-3 font-medium text-white transition-all hover:shadow-lg`}
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
                            <Check className="ml-2 h-4 w-4" />
                          </span>
                        </>
                      ) : (
                        <>
                          Create account
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </motion.button>

                    <p className="mt-4 text-center text-sm text-gray-600">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setAuthMode("signin")}
                        className={`font-medium text-${theme.accent}-600 hover:text-${theme.accent}-700`}
                        style={{ color: theme.accentHex }}
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
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="forgot-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-${theme.accent}-500 focus:ring-1 focus:ring-${theme.accent}-500`}
                          placeholder="name@example.com"
                          required
                          style={{
                            borderColor: email ? theme.accentHex : "",
                            boxShadow: email
                              ? `0 0 0 1px ${theme.accentHex}`
                              : "",
                          }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        We&apos;ll send a password reset link to this email
                        address
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      className={`relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r ${theme.gradient} py-3 font-medium text-white transition-all hover:shadow-lg`}
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
                            <Check className="ml-2 h-4 w-4" />
                          </span>
                        </>
                      ) : (
                        <>
                          Send reset link
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </motion.button>

                    <p className="mt-4 text-center text-sm text-gray-600">
                      <button
                        type="button"
                        onClick={() => setAuthMode("signin")}
                        className={`font-medium text-${theme.accent}-600 hover:text-${theme.accent}-700`}
                        style={{ color: theme.accentHex }}
                      >
                        Back to sign in
                      </button>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContextualAdaptiveAuth;
