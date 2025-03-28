"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ForgotPassword2 = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute -left-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-teal-200 to-teal-300 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-200 to-purple-300 opacity-20 blur-3xl"></div>

          {/* Card */}
          <motion.div
            className="relative overflow-hidden rounded-2xl bg-white shadow-xl"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.1,
            }}
            whileHover={{
              boxShadow:
                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              translateY: -5,
            }}
          >
            {/* Card header */}
            <div className="px-8 pb-6 pt-8">
              <motion.div
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                    stroke="#0D9488"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              <h1 className="text-center text-2xl font-bold text-gray-900">
                Reset your password
              </h1>
              <p className="mt-2 text-center text-gray-500">
                Enter your email and we&apos;ll send you instructions to reset
                your password
              </p>
            </div>

            {/* Card body */}
            <div className="p-8 pt-0">
              {!submitted ? (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <motion.div
                      whileFocus={{ scale: 1.01 }}
                      className="relative"
                    >
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-teal-500"
                        placeholder="Enter your email"
                        required
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-xl bg-teal-500 py-3 font-medium text-white"
                    whileHover={{ scale: 1.02, backgroundColor: "#0D9488" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Reset Link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  className="rounded-xl bg-teal-50 p-6 text-teal-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="mb-3 text-lg font-medium">Check your inbox</h3>
                  <p className="mb-4">
                    We&apos;ve sent password reset instructions to{" "}
                    <span className="font-medium">{email}</span>
                  </p>
                  <p className="text-sm text-teal-700">
                    If you don&apos;t receive an email within a few minutes,
                    check your spam folder or{" "}
                    <button
                      onClick={() => setSubmitted(false)}
                      className="font-medium text-teal-600 hover:underline"
                    >
                      try again
                    </button>
                    .
                  </p>
                </motion.div>
              )}

              <p className="mt-8 text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link
                  href="#"
                  className="font-medium text-teal-600 transition-colors hover:text-teal-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword2;
