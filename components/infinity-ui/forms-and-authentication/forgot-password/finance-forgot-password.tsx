"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Mail, Shield } from "lucide-react";

const FinanceForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showSecurityTips, setShowSecurityTips] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      {/* Main content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left side - Forgot password form */}
        <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Reset your password
              </h2>
              <p className="text-gray-600">
                Enter your email address and we&apos;ll send you instructions to
                reset your password
              </p>
            </div>

            {!submitted ? (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
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
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                      placeholder="name@example.com"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-emerald-600 py-3 font-medium text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Reset Link
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </form>
            ) : (
              <motion.div
                className="rounded-lg bg-emerald-50 p-6 text-emerald-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h3 className="mb-3 text-lg font-medium">Check your inbox</h3>
                <p className="mb-4">
                  We&apos;ve sent password reset instructions to{" "}
                  <span className="font-medium">{email}</span>
                </p>
                <p className="text-sm text-emerald-700">
                  If you don&apos;t receive an email within a few minutes, check
                  your spam folder or{" "}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-medium text-emerald-600 hover:underline"
                  >
                    try again
                  </button>
                  .
                </p>
              </motion.div>
            )}

            <div className="mt-8">
              <button
                type="button"
                onClick={() => setShowSecurityTips(!showSecurityTips)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <Shield className="mr-2 h-4 w-4 text-emerald-600" />
                Security reminder
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform ${showSecurityTips ? "rotate-180" : ""}`}
                />
              </button>

              {showSecurityTips && (
                <motion.div
                  className="mt-3 rounded-lg bg-gray-100 p-4 text-sm text-gray-700"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 text-emerald-600">•</span>
                      We will never ask for your password in an email
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 text-emerald-600">•</span>
                      Make sure to create a strong, unique password
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 text-emerald-600">•</span>
                      If you didn&apos;t request a password reset, contact us
                      immediately
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-center text-sm text-gray-600">
                Remember your password?{" "}
                <Link
                  href="#"
                  className="font-medium text-emerald-600 hover:text-emerald-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right side - Security information */}
        <div className="hidden w-1/2 bg-gradient-to-br from-emerald-500 to-teal-600 p-12 text-white md:block">
          <motion.div
            className="mx-auto flex h-full max-w-md flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-4 text-3xl font-bold">Account recovery</h2>
              <p className="mb-6 text-emerald-100">
                We take your account security seriously. Follow these steps to
                safely reset your password.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/30">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22 4L12 14.01L9 11.01"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">
                    Verify your identity
                  </h3>
                  <p className="text-sm text-emerald-100">
                    We&apos;ll send a secure link to your registered email
                    address.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/30">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12H9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15 12H22"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">
                    Create a new password
                  </h3>
                  <p className="text-sm text-emerald-100">
                    Choose a strong, unique password that you haven&apos;t used
                    before.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/30">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 12L11 14L15 10"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">
                    Secure your account
                  </h3>
                  <p className="text-sm text-emerald-100">
                    Consider enabling two-factor authentication for added
                    security.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-emerald-400/30 pt-8">
              <p className="text-sm text-emerald-100">
                Need assistance? Our customer support is available 24/7 at{" "}
                <span className="font-medium text-white">
                  1-800-SECURE-BANK
                </span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FinanceForgotPassword;
