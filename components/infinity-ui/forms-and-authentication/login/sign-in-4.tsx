"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, Mail } from "lucide-react";

const SignIn4 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState("email");

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-violet-200 opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-indigo-200 opacity-50 blur-3xl"></div>

          {/* Card */}
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-white shadow-xl"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.1,
            }}
          >
            {/* Card header with animated illustration */}
            <div className="flex flex-col items-center bg-gradient-to-r from-violet-500 to-indigo-600 p-8">
              <motion.div
                className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/20"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 6,
                  ease: "easeInOut",
                }}
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8Z"
                    stroke="white"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      repeatDelay: 1,
                    }}
                  />
                  <motion.path
                    d="M3 9L10.5 13.5C10.8094 13.6984 11.1906 13.6984 11.5 13.5L19 9"
                    stroke="white"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      repeatDelay: 1,
                      delay: 0.5,
                    }}
                  />
                </svg>
              </motion.div>
              <h1 className="mb-1 text-2xl font-bold text-white">
                Welcome to Infinity UI
              </h1>
              <p className="text-center text-indigo-100">
                Sign in to your account to continue
              </p>
            </div>

            {/* Card body */}
            <div className="p-8">
              {/* Custom Tabs */}
              <div className="mb-6 w-full">
                <div className="grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1">
                  <button
                    onClick={() => setActiveTab("email")}
                    className={`rounded-md py-2 text-sm font-medium transition-all ${
                      activeTab === "email"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Email
                  </button>
                  <button
                    onClick={() => setActiveTab("phone")}
                    className={`rounded-md py-2 text-sm font-medium transition-all ${
                      activeTab === "phone"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-900"
                    }`}
                  >
                    Phone
                  </button>
                </div>
              </div>

              {/* Email Tab Content */}
              {activeTab === "email" && (
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
                      placeholder="name@example.com"
                      className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
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
                        className="text-sm text-indigo-600 transition-colors hover:text-indigo-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-12 w-full rounded-xl border border-gray-300 px-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <motion.button
                      type="button"
                      onClick={() => setRememberMe(!rememberMe)}
                      className={`flex h-5 w-5 items-center justify-center rounded-md border ${rememberMe ? "border-indigo-600 bg-indigo-600" : "border-gray-300"}`}
                      whileTap={{ scale: 0.9 }}
                    >
                      {rememberMe && <Check size={14} className="text-white" />}
                    </motion.button>
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me for 30 days
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    className="flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 font-medium text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </form>
              )}

              {/* Phone Tab Content */}
              {activeTab === "phone" && (
                <div className="flex flex-col items-center justify-center py-8">
                  <Mail className="mb-4 h-12 w-12 text-indigo-600" />
                  <h3 className="mb-1 text-lg font-medium text-gray-900">
                    Phone sign-in coming soon
                  </h3>
                  <p className="mb-4 text-center text-gray-500">
                    We&apos;re working on adding phone authentication.
                  </p>
                  <motion.button
                    type="button"
                    className="font-medium text-indigo-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab("email")}
                  >
                    Go back to email sign-in
                  </motion.button>
                </div>
              )}

              <div className="mt-8">
                <p className="text-center text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="#"
                    className="font-medium text-indigo-600 transition-colors hover:text-indigo-500"
                  >
                    Create a free account
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn4;
