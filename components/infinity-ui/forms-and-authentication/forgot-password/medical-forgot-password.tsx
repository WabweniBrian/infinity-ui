"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Mail } from "lucide-react";

const MedicalForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("patient");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-blue-50 to-white md:flex-row">
      {/* Left side - Branding and information */}
      <div className="flex w-full flex-col justify-between bg-gradient-to-br from-cyan-500 to-blue-600 p-8 text-white md:w-1/2 md:p-12">
        <div>
          <motion.div
            className="mb-12 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold">MediCare</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              Reset your password
            </h1>
            <p className="mb-6 text-blue-100">
              We&apos;ll help you recover your account and get back to managing
              your healthcare.
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="mr-3 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-400/30">
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
                </div>
                <p className="text-sm text-blue-100">
                  Simple and secure password reset process
                </p>
              </div>
              <div className="flex items-start">
                <div className="mr-3 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-400/30">
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
                </div>
                <p className="text-sm text-blue-100">
                  Verify your identity to protect your medical data
                </p>
              </div>
              <div className="flex items-start">
                <div className="mr-3 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-400/30">
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
                </div>
                <p className="text-sm text-blue-100">
                  Quick access back to your healthcare portal
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-blue-100">
            Need help? Contact our support team at{" "}
            <span className="text-white">support@medicare.com</span>
          </p>
        </motion.div>
      </div>

      {/* Right side - Forgot password form */}
      <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Reset your password
            </h2>
            <p className="text-gray-600">
              Enter your email address and we&apos;ll send you instructions to
              reset your password
            </p>
          </div>

          <div className="mb-6">
            <div className="mb-6 flex rounded-lg border border-gray-200 p-1">
              <button
                type="button"
                onClick={() => setUserType("patient")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  userType === "patient"
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => setUserType("doctor")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  userType === "doctor"
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Doctor
              </button>
              <button
                type="button"
                onClick={() => setUserType("staff")}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  userType === "staff"
                    ? "bg-blue-500 text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Staff
              </button>
            </div>
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
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-medium text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="rounded-lg bg-blue-50 p-6 text-blue-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="mb-3 text-lg font-medium">Check your inbox</h3>
              <p className="mb-4">
                We&apos;ve sent password reset instructions to{" "}
                <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-blue-700">
                If you don&apos;t receive an email within a few minutes, check
                your spam folder or{" "}
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-medium text-blue-600 hover:underline"
                >
                  try again
                </button>
                .
              </p>
            </motion.div>
          )}

          <div className="mt-8">
            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="#"
                className="font-medium text-blue-600 transition-colors hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-center text-xs text-gray-500">
              By using this service, you agree to our{" "}
              <Link href="#" className="text-blue-600 hover:text-blue-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue-600 hover:text-blue-500">
                Privacy Policy
              </Link>
            </p>
            <p className="mt-2 text-center text-xs text-gray-500">
              Protected by HIPAA compliance and secure encryption
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MedicalForgotPassword;
