"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

const IllustratedForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white md:flex-row">
      {/* Left side - Illustration */}
      <div className="flex w-full items-center justify-center bg-rose-50 p-8 md:w-1/2 md:p-12">
        <div className="max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {!submitted ? (
              <svg
                width="100%"
                height="auto"
                viewBox="0 0 520 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.5 293.5C31.5 293.5 73 262 127.5 293.5C182 325 202 339 249.5 325C297 311 306.5 293.5 342.5 293.5C378.5 293.5 414.5 325 453 311C491.5 297 491.5 262 491.5 262"
                  stroke="#FDA4AF"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="12 12"
                />
                <circle cx="260" cy="150" r="100" fill="#FECDD3" />
                <path
                  d="M200 170V230H320V170L260 210L200 170Z"
                  fill="#FB7185"
                />
                <path
                  d="M200 110H320V170L260 210L200 170V110Z"
                  fill="#F43F5E"
                />
                <path
                  d="M230 140H290"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M230 160H290"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="100%"
                height="auto"
                viewBox="0 0 520 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.5 293.5C31.5 293.5 73 262 127.5 293.5C182 325 202 339 249.5 325C297 311 306.5 293.5 342.5 293.5C378.5 293.5 414.5 325 453 311C491.5 297 491.5 262 491.5 262"
                  stroke="#FDA4AF"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="12 12"
                />
                <circle cx="260" cy="150" r="100" fill="#FECDD3" />
                <path d="M200 230L260 170L320 230H200Z" fill="#FB7185" />
                <path
                  d="M200 110H320V170L260 210L200 170V110Z"
                  fill="#F43F5E"
                />
                <path
                  d="M260 250L230 220M260 250L290 220"
                  stroke="#F43F5E"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <path
                  d="M240 150L260 170L300 130"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}

            <div className="mt-8 text-center md:text-left">
              <h2 className="mb-4 text-2xl font-bold text-rose-600">
                Password Recovery
              </h2>
              <p className="text-rose-800">
                {!submitted
                  ? "We&apos;ll help you get back into your account by sending a secure reset link to your email."
                  : "Check your inbox for the reset link. We&apos;ve sent instructions to help you create a new password securely."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Forgot your password?
            </h1>
            <p className="text-gray-600">
              {!submitted
                ? "No worries! Enter your email and we&apos;ll send you instructions to reset your password."
                : "We&apos;ve sent you an email with a link to reset your password."}
            </p>
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-gray-700"
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
                        className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 focus:border-transparent focus:ring-2 focus:ring-rose-500"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-lg border border-transparent bg-rose-500 px-4 py-3 text-white shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
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
              >
                <div className="mb-6 rounded-lg bg-rose-50 p-6">
                  <h3 className="mb-2 font-medium text-rose-800">
                    Check your inbox
                  </h3>
                  <p className="mb-4 text-sm text-rose-700">
                    We&apos;ve sent a password reset link to{" "}
                    <span className="font-medium">{email}</span>
                  </p>
                  <p className="text-sm text-rose-700">
                    The link will expire in 30 minutes. If you don&apos;t see
                    the email, check your spam folder.
                  </p>
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="flex w-full items-center justify-center rounded-lg border border-rose-500 bg-white px-4 py-3 text-rose-500 shadow-sm hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  >
                    Try a different email
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <a
                href="#"
                className="font-medium text-rose-600 hover:text-rose-500"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IllustratedForgotPassword;
