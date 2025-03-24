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

const EcommerceSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
              Shopping made simple
            </h2>
            <p className="mb-8 text-rose-100">
              Sign in to access your shopping cart, track orders, and discover
              personalized recommendations.
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

      {/* Right side - Sign in form */}
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
              Welcome back
            </h2>
            <p className="text-gray-600">Sign in to continue shopping</p>
          </div>

          <form className="space-y-5">
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
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-sm text-rose-600 transition-colors hover:text-rose-500"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-rose-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <motion.button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`flex h-5 w-5 items-center justify-center rounded border ${rememberMe ? "border-rose-500 bg-rose-500" : "border-gray-300"}`}
                whileTap={{ scale: 0.9 }}
              >
                {rememberMe && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </motion.button>
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Keep me signed in
              </label>
            </div>

            <motion.button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl bg-rose-500 py-3 font-medium text-white"
              whileHover={{ scale: 1.02, backgroundColor: "#e11d48" }}
              whileTap={{ scale: 0.98 }}
            >
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <motion.button
              type="button"
              className="flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                width="20"
                height="20"
                className="mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.72 16.69 5.82 14.09H2.12V16.95C3.94 20.53 7.69 23 12 23Z"
                  fill="#34A853"
                />
                <path
                  d="M5.82 14.09C5.6 13.43 5.48 12.73 5.48 12C5.48 11.27 5.6 10.57 5.82 9.91V7.05H2.12C1.41 8.57 1 10.24 1 12C1 13.76 1.41 15.43 2.12 16.95L5.82 14.09Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.37C13.62 5.37 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.69 1 3.94 3.47 2.12 7.05L5.82 9.91C6.72 7.31 9.13 5.37 12 5.37Z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </motion.button>

            <motion.button
              type="button"
              className="flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-3 shadow-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                width="20"
                height="20"
                className="mr-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 12.073C24 5.40541 18.6274 0 12 0C5.37258 0 0 5.40541 0 12.073C0 18.0995 4.38823 23.0943 10.125 24V15.563H7.07812V12.073H10.125V9.41306C10.125 6.38751 11.9166 4.71627 14.6576 4.71627C15.9701 4.71627 17.3438 4.95169 17.3438 4.95169V7.92145H15.8306C14.34 7.92145 13.875 8.85225 13.875 9.8069V12.073H17.2031L16.6711 15.563H13.875V24C19.6118 23.0943 24 18.0995 24 12.073Z"
                  fill="#1877F2"
                />
              </svg>
              Continue with Facebook
            </motion.button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                className="font-medium text-rose-600 hover:text-rose-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EcommerceSignIn;
