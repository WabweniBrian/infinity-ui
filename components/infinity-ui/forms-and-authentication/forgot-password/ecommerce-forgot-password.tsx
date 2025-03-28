"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CreditCard,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";

const EcommerceForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white md:flex-row">
      {/* Left side - Branding and information */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-rose-500 to-pink-600 p-12 md:block">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern
              id="pattern"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        <motion.div
          className="relative z-10 mx-auto flex h-full max-w-md flex-col justify-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="mb-8">
            <motion.div
              className="mb-12 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">ShopHub</span>
            </motion.div>

            <h2 className="mb-4 text-3xl font-bold text-white">
              Recover your account
            </h2>
            <p className="mb-8 text-rose-100">
              We&apos;ll help you reset your password and get back to shopping
              in no time.
            </p>

            <div className="mb-8 grid grid-cols-2 gap-4">
              <motion.div
                className="rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
              >
                <Package className="mb-2 h-6 w-6 text-white" />
                <h3 className="mb-1 font-medium text-white">Fast Delivery</h3>
                <p className="text-sm text-rose-100">
                  Get your items delivered in 24 hours
                </p>
              </motion.div>

              <motion.div
                className="rounded-xl bg-white/10 p-4 backdrop-blur-sm"
                whileHover={{
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
              >
                <CreditCard className="mb-2 h-6 w-6 text-white" />
                <h3 className="mb-1 font-medium text-white">Secure Payment</h3>
                <p className="text-sm text-rose-100">
                  Multiple payment options available
                </p>
              </motion.div>
            </div>
          </div>

          <div className="mt-auto border-t border-rose-400/30 pt-8">
            <div className="flex items-center">
              <div className="mr-4">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <div>
                <p className="font-medium text-white">
                  Free shipping on your first order
                </p>
                <p className="text-sm text-rose-100">Use code: FIRSTORDER</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side - Forgot password form */}
      <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex items-center md:hidden">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ShopHub</span>
          </div>

          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Reset your password
            </h2>
            <p className="text-gray-600">
              Enter your email address and we&apos;ll send you a link to reset
              your password
            </p>
          </div>

          {!submitted ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-rose-500"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="flex w-full items-center justify-center rounded-xl bg-rose-500 py-3 font-medium text-white"
                whileHover={{ scale: 1.02, backgroundColor: "#e11d48" }}
                whileTap={{ scale: 0.98 }}
              >
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="rounded-xl bg-rose-50 p-6 text-rose-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="mb-3 text-lg font-medium">Check your email</h3>
              <p className="mb-4">
                We&apos;ve sent a password reset link to{" "}
                <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-rose-700">
                If you don&apos;t receive an email within a few minutes, check
                your spam folder or{" "}
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-medium text-rose-600 hover:underline"
                >
                  try again
                </button>
                .
              </p>
            </motion.div>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="#"
                className="font-medium text-rose-600 hover:text-rose-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EcommerceForgotPassword;
