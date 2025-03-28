"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Mail, Map, Plane, Sunrise } from "lucide-react";
import Image from "next/image";

const TravelForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-sky-50 to-white md:flex-row">
      {/* Left side - Forgot password form */}
      <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <motion.div
              className="mb-6 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-500">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                TravelEase
              </span>
            </motion.div>

            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Reset your password
            </h2>
            <p className="text-gray-600">
              Enter your email and we&apos;ll send you instructions to reset
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
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-sky-500"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 py-3 font-medium text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="rounded-xl bg-sky-50 p-6 text-sky-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="mb-3 text-lg font-medium">Check your inbox</h3>
              <p className="mb-4">
                We&apos;ve sent password reset instructions to{" "}
                <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-sky-700">
                If you don&apos;t receive an email within a few minutes, check
                your spam folder or{" "}
                <button
                  onClick={() => setSubmitted(false)}
                  className="font-medium text-sky-600 hover:underline"
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
                className="font-medium text-sky-600 transition-colors hover:text-sky-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right side - Travel imagery and information */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-sky-400 to-blue-500 p-12 md:block">
        {/* Decorative elements */}
        <motion.div
          className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10"
          animate={{
            y: [0, 10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 h-40 w-40 rounded-full bg-white/10"
          animate={{
            y: [0, -10, 0],
            x: [0, -5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 6,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative z-10 mx-auto flex h-full max-w-md flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="mb-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              We&apos;ve got you covered
            </h2>
            <p className="mb-6 text-sky-100">
              Don&apos;t worry, we&apos;ll help you get back to planning your
              next adventure in no time.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-300/30">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  Quick recovery
                </h3>
                <p className="text-sm text-sky-100">
                  Reset your password in just a few simple steps.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-300/30">
                <Map className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  Secure process
                </h3>
                <p className="text-sm text-sky-100">
                  Your account security is our top priority.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-300/30">
                <Sunrise className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  24/7 Support
                </h3>
                <p className="text-sm text-sky-100">
                  Our customer service team is always ready to assist you.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-sky-400/30 pt-8">
            <div className="flex items-center">
              <div className="mr-4 flex -space-x-2">
                <Image
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  src="/images/1.png"
                  alt="User"
                  width={32}
                  height={32}
                />
                <Image
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  src="/images/1.png"
                  alt="User"
                  width={32}
                  height={32}
                />
                <Image
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  src="/images/1.png"
                  alt="User"
                  width={32}
                  height={32}
                />
              </div>
              <p className="text-sm text-sky-100">
                Join <span className="font-medium text-white">2M+</span>{" "}
                travelers worldwide
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelForgotPassword;
