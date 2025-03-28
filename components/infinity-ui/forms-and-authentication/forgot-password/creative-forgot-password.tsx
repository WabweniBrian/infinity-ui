"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brush, Layers, Palette, Zap } from "lucide-react";

const CreativeForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white md:flex-row">
      {/* Left side - Branding and creative elements */}
      <div className="relative flex w-full flex-col justify-between overflow-hidden bg-black p-8 md:w-1/2 md:p-12">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-3xl filter"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30 blur-3xl filter"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 18,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10">
          <motion.div
            className="mb-16 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">ARTISTRY</span>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="mb-6 text-4xl font-bold leading-tight md:text-5xl"
              variants={itemVariants}
            >
              Recover your <br />
              creative account
            </motion.h1>

            <motion.p
              className="mb-8 max-w-md text-gray-400"
              variants={itemVariants}
            >
              We&apos;ll send you a link to reset your password and get you back
              to creating amazing projects.
            </motion.p>

            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <Brush className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">Creative tools</h3>
                  <p className="text-sm text-gray-400">
                    Access our suite of design and creative tools in one place.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Layers className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">
                    Project management
                  </h3>
                  <p className="text-sm text-gray-400">
                    Organize your projects with our intuitive management system.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">
                    Instant collaboration
                  </h3>
                  <p className="text-sm text-gray-400">
                    Work together in real-time with your team members.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 mt-12 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p>© 2023 Artistry Creative Agency. All rights reserved.</p>
        </motion.div>
      </div>

      {/* Right side - Forgot password form */}
      <div className="flex w-full items-center justify-center bg-zinc-900 p-8 md:w-1/2 md:p-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold">Reset password</h2>
            <p className="text-gray-400">
              Enter your email to receive password reset instructions
            </p>
          </div>

          {!submitted ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-medium text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Reset Link
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </form>
          ) : (
            <motion.div
              className="rounded-lg bg-zinc-800 p-6 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="mb-3 text-xl font-medium text-purple-400">
                Check your inbox
              </h3>
              <p className="mb-4">
                We&apos;ve sent password reset instructions to{" "}
                <span className="font-medium">{email}</span>
              </p>
              <p className="text-sm text-gray-400">
                If you don&apos;t see the email, check your spam folder or{" "}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-purple-400 hover:text-purple-300"
                >
                  try again
                </button>
                .
              </p>
            </motion.div>
          )}

          <div className="mt-8">
            <p className="text-center text-sm text-gray-400">
              Remember your password?{" "}
              <Link
                href="#"
                className="font-medium text-purple-400 transition-colors hover:text-purple-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreativeForgotPassword;
