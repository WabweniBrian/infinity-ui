"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Facebook,
  Github,
  Lock,
  Mail,
  Twitter,
  User,
} from "lucide-react";

type AuthMode = "signin" | "signup" | "forgot";

const ThreeDCardFlipAuth = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [flipping, setFlipping] = useState(false);

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

  // Handle auth mode change with flipping animation
  const changeAuthMode = (mode: AuthMode) => {
    if (mode === authMode) return;

    setFlipping(true);
    setTimeout(() => {
      setAuthMode(mode);
      setFlipping(false);
    }, 400); // Half of the flip animation duration
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ perspective: "1000px" }}
        >
          <motion.div
            animate={{
              rotateY: flipping ? 90 : 0,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="rounded-2xl bg-white shadow-xl">
              {/* Card Header */}
              <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-white">
                {/* Decorative circles */}
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
                <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white opacity-10"></div>

                <div className="relative z-10">
                  {authMode === "signin" && (
                    <div>
                      <h1 className="text-2xl font-bold">Welcome back</h1>
                      <p className="mt-1 text-blue-100">
                        Sign in to continue to your account
                      </p>
                    </div>
                  )}

                  {authMode === "signup" && (
                    <div>
                      <h1 className="text-2xl font-bold">Create account</h1>
                      <p className="mt-1 text-blue-100">
                        Sign up to get started with our platform
                      </p>
                    </div>
                  )}

                  {authMode === "forgot" && (
                    <div>
                      <h1 className="text-2xl font-bold">Reset password</h1>
                      <p className="mt-1 text-blue-100">
                        We&apos;ll send you instructions to reset your password
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                {authMode === "signin" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="name@example.com"
                          required
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
                          onClick={() => changeAuthMode("forgot")}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700"
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
                          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
                      className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-3 font-medium text-white transition-all hover:shadow-lg"
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
                          <ArrowRight className="ml-2 h-4 w-4" />
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
                        onClick={() => changeAuthMode("signup")}
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        Sign up
                      </button>
                    </p>
                  </form>
                )}

                {authMode === "signup" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="John Doe"
                          required
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
                          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="name@example.com"
                          required
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
                          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        I agree to the{" "}
                        <Link
                          href="#"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="#"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <motion.button
                      type="submit"
                      className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-3 font-medium text-white transition-all hover:shadow-lg"
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
                        onClick={() => changeAuthMode("signin")}
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        Sign in
                      </button>
                    </p>
                  </form>
                )}

                {authMode === "forgot" && (
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        We&apos;ll send a password reset link to this email
                        address
                      </p>
                    </div>

                    <motion.button
                      type="submit"
                      className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 py-3 font-medium text-white transition-all hover:shadow-lg"
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
                        onClick={() => changeAuthMode("signin")}
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        Back to sign in
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Card flip indicators */}
        <div className="mt-8 flex justify-center space-x-2">
          <button
            onClick={() => changeAuthMode("signin")}
            className={`h-2 w-2 rounded-full transition-colors ${
              authMode === "signin"
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label="Sign in form"
          />
          <button
            onClick={() => changeAuthMode("signup")}
            className={`h-2 w-2 rounded-full transition-colors ${
              authMode === "signup"
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label="Sign up form"
          />
          <button
            onClick={() => changeAuthMode("forgot")}
            className={`h-2 w-2 rounded-full transition-colors ${
              authMode === "forgot"
                ? "bg-blue-500"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label="Forgot password form"
          />
        </div>
      </div>
    </div>
  );
};

export default ThreeDCardFlipAuth;
