"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Smartphone,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const VerificationMethodForgotPassword = () => {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (method === "email" && !email) {
      setError("Please enter your email address");
      return;
    }

    if (method === "phone" && !phone) {
      setError("Please enter your phone number");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="p-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Forgot your password?
            </h2>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="mb-6 text-gray-600">
                    Select how you want to verify your identity and reset your
                    password.
                  </p>

                  <div className="mb-6">
                    <div className="flex space-x-2 rounded-lg bg-gray-100 p-1">
                      <button
                        type="button"
                        onClick={() => setMethod("email")}
                        className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                          method === "email"
                            ? "bg-white text-purple-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setMethod("phone")}
                        className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                          method === "phone"
                            ? "bg-white text-purple-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        Phone
                      </button>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {method === "email" ? (
                        <motion.div
                          key="email"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="mb-6"
                        >
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
                              className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                              placeholder="name@example.com"
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            We&apos;ll send a password reset link to this email
                            address.
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="phone"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="mb-6"
                        >
                          <label
                            htmlFor="phone"
                            className="mb-1 block text-sm font-medium text-gray-700"
                          >
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <Smartphone className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              id="phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                              placeholder="(123) 456-7890"
                            />
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            We&apos;ll send a verification code to this phone
                            number.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 flex items-center text-sm text-red-600"
                      >
                        <AlertCircle className="mr-1 h-4 w-4" />
                        {error}
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      className="flex w-full items-center justify-center rounded-lg border border-transparent bg-purple-600 px-4 py-3 text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <motion.div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                  </motion.div>

                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {method === "email"
                      ? "Check your inbox"
                      : "Check your phone"}
                  </h3>

                  <p className="mb-6 text-gray-600">
                    {method === "email"
                      ? `We&apos;ve sent a password reset link to ${email}`
                      : `We&apos;ve sent a verification code to ${phone}`}
                  </p>

                  <div className="mb-6 rounded-lg bg-purple-50 p-4">
                    <p className="text-sm text-purple-800">
                      {method === "email"
                        ? "If you don&apos;t receive an email within a few minutes, check your spam folder."
                        : "The verification code will expire in 10 minutes."}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-3">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setMethod(method === "email" ? "phone" : "email");
                      }}
                      className="flex w-full items-center justify-center rounded-lg border border-purple-500 bg-white px-4 py-3 text-purple-600 shadow-sm hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      Try with {method === "email" ? "phone number" : "email"}{" "}
                      instead
                    </button>
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
              className="font-medium text-purple-600 hover:text-purple-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationMethodForgotPassword;
