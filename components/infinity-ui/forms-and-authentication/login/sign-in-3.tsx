"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Loader2 } from "lucide-react";

const SignIn3 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gray-900 p-4 text-gray-100">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-purple-500 opacity-20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -left-20 top-1/4 h-60 w-60 rounded-full bg-blue-500 opacity-20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/3 h-80 w-80 rounded-full bg-teal-500 opacity-20 blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className="mb-8 flex justify-center"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 13H12"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 17H16"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          }}
        >
          <div className="p-8">
            <h1 className="mb-2 text-center text-2xl font-bold">
              Welcome back
            </h1>
            <p className="mb-6 text-center text-gray-400">
              Sign in to continue to Infinity UI
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-300"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-100 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div>
                <div className="mb-1 flex justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-sm text-blue-400 transition-colors hover:text-blue-300"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-100 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-3 font-medium text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </motion.button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gray-900 px-2 text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <motion.button
                type="button"
                className="flex w-full items-center justify-center rounded-xl border border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-300 transition-colors hover:bg-gray-800"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Github className="mr-2 h-5 w-5" />
                Continue with GitHub
              </motion.button>
            </form>
          </div>

          <div className="border-t border-gray-700 bg-gray-800/50 p-6">
            <p className="text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                className="font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <Link
            href="#"
            className="text-gray-400 transition-colors hover:text-gray-300"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="text-gray-400 transition-colors hover:text-gray-300"
          >
            Privacy Policy
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn3;
