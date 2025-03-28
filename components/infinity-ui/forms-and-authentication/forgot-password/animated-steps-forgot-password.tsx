"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle, Mail, AlertCircle } from "lucide-react";

const AnimatedStepsForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
      setCurrentStep(2);
    }, 1500);
  };

  const handleResendEmail = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50 p-4">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Step indicators */}
          <div className="px-8 pb-4 pt-8">
            <div className="mb-8 flex items-center justify-between">
              <div className="flex flex-col items-center">
                <motion.div
                  className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                    currentStep >= 1
                      ? "bg-teal-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  animate={currentStep >= 1 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {currentStep > 1 ? <CheckCircle className="h-5 w-5" /> : "1"}
                </motion.div>
                <span className="text-xs text-gray-500">Request</span>
              </div>

              <motion.div
                className="mx-2 h-1 flex-1 rounded bg-gray-200"
                animate={{
                  backgroundColor: currentStep >= 2 ? "#14b8a6" : "#e5e7eb",
                }}
                transition={{ duration: 0.5 }}
              />

              <div className="flex flex-col items-center">
                <motion.div
                  className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                    currentStep >= 2
                      ? "bg-teal-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  animate={currentStep >= 2 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {currentStep > 2 ? <CheckCircle className="h-5 w-5" /> : "2"}
                </motion.div>
                <span className="text-xs text-gray-500">Verify</span>
              </div>

              <motion.div
                className="mx-2 h-1 flex-1 rounded bg-gray-200"
                animate={{
                  backgroundColor: currentStep >= 3 ? "#14b8a6" : "#e5e7eb",
                }}
                transition={{ duration: 0.5 }}
              />

              <div className="flex flex-col items-center">
                <motion.div
                  className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${
                    currentStep >= 3
                      ? "bg-teal-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  animate={currentStep >= 3 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  &quot;3&quot;
                </motion.div>
                <span className="text-xs text-gray-500">Reset</span>
              </div>
            </div>
          </div>

          <div className="px-8 pb-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    Forgot your password?
                  </h2>
                  <p className="mb-6 text-gray-600">
                    Enter your email address and we&apos;ll send you a link to
                    reset your password.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
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
                          className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                          placeholder="name@example.com"
                        />
                      </div>

                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 flex items-center text-sm text-red-600"
                        >
                          <AlertCircle className="mr-1 h-4 w-4" />
                          {error}
                        </motion.div>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-lg border border-transparent bg-teal-500 px-4 py-3 text-white shadow-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
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
                          Continue
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center">
                    <motion.div
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <Mail className="h-8 w-8 text-teal-500" />
                    </motion.div>

                    <h2 className="mb-2 text-2xl font-bold text-gray-800">
                      Check your inbox
                    </h2>
                    <p className="mb-6 text-gray-600">
                      We&apos;ve sent a password reset link to{" "}
                      <span className="font-medium">{email}</span>
                    </p>

                    <div className="mb-6 rounded-lg bg-teal-50 p-4">
                      <p className="text-sm text-teal-800">
                        The link will expire in 30 minutes. If you don&apos;t
                        see the email, check your spam folder.
                      </p>
                    </div>

                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={handleResendEmail}
                        className="flex w-full items-center justify-center rounded-lg border border-teal-500 bg-white px-4 py-3 text-teal-500 shadow-sm hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <motion.div
                            className="h-5 w-5 rounded-full border-2 border-teal-500 border-t-transparent"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "linear",
                            }}
                          />
                        ) : (
                          "Resend Email"
                        )}
                      </button>

                      <button
                        onClick={() => setCurrentStep(1)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Try a different email
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{" "}
            <a
              href="#"
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedStepsForgotPassword;
