"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  GamepadIcon as GameController,
  Trophy,
  Mail,
} from "lucide-react";

const GamifiedForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Update score when fields are filled
  useEffect(() => {
    let newScore = 0;
    if (email) newScore += 100;
    setScore(newScore);
  }, [email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  // Confetti component
  const Confetti = () => {
    return (
      <div className="pointer-events-none fixed inset-0 z-50">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              top: "-10%",
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              borderRadius: "50%",
            }}
            animate={{
              top: "100%",
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              ease: "easeOut",
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-500 opacity-20 blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-pink-500 opacity-20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, -40, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
            ease: "easeInOut",
          }}
        />
      </div>

      {showConfetti && <Confetti />}

      <motion.div
        className="z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Game UI Header */}
        <div className="rounded-t-2xl border border-white/10 bg-gray-900/50 p-4 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <GameController className="mr-2 h-6 w-6 text-purple-400" />
              <span className="font-bold text-white">GameQuest</span>
            </div>
            <div className="flex items-center rounded-full bg-purple-900/50 px-3 py-1">
              <Trophy className="mr-1 h-4 w-4 text-yellow-400" />
              <motion.span
                className="text-sm font-medium text-white"
                key={score}
                initial={{ scale: 1.5, color: "#FBBF24" }}
                animate={{ scale: 1, color: "#FFFFFF" }}
                transition={{ duration: 0.5 }}
              >
                {score} XP
              </motion.span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          className="overflow-hidden rounded-b-2xl border border-t-0 border-white/10 bg-gray-900/80 shadow-xl backdrop-blur-lg"
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
            <h1 className="mb-2 text-center text-2xl font-bold text-white">
              Recover Your Character
            </h1>
            <p className="mb-6 text-center text-purple-300">
              Lost your password? Let&apos;s get you back in the game!
            </p>

            {/* Progress Bar */}
            <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-gray-800">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: "0%" }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-purple-300"
                    >
                      Your Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-purple-500/30 bg-gray-800/50 py-3 pl-10 pr-4 text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                        placeholder="name@example.com"
                        required
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-purple-400" />
                      </div>
                      {email && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500">
                            <Check className="h-3 w-3 text-white" />
                          </div>
                        </motion.div>
                      )}
                    </div>
                    {email && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-1 text-xs text-green-400"
                      >
                        +100 XP! Character recovery initiated!
                      </motion.p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-medium text-white"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!email}
                  >
                    Send Recovery Spell
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </motion.form>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl bg-gray-800/80 p-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    <Mail className="h-8 w-8 text-white" />
                  </motion.div>
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Recovery Spell Cast!
                  </h3>
                  <p className="mb-4 text-purple-300">
                    We&apos;ve sent a magical recovery link to:
                  </p>
                  <p className="mb-6 rounded-lg bg-gray-700/50 p-2 font-mono text-pink-300">
                    {email}
                  </p>
                  <p className="text-sm text-gray-400">
                    Check your inbox and click the link to reset your password.
                    The spell expires in 30 minutes.
                  </p>
                  <motion.button
                    type="button"
                    onClick={() => setStep(1)}
                    className="mt-6 inline-flex items-center rounded-lg border border-purple-500/30 bg-gray-800/50 px-4 py-2 text-sm font-medium text-purple-300 hover:bg-gray-700/50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Try another email
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="border-t border-white/10 bg-gray-800/50 p-6">
            <p className="text-center text-sm text-purple-300">
              Remember your password?{" "}
              <Link
                href="#"
                className="font-medium text-pink-400 transition-colors hover:text-pink-300"
              >
                Back to login
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Quest Status */}
        <div className="mt-8 rounded-xl border border-white/10 bg-gray-900/50 p-4 backdrop-blur-lg">
          <h3 className="mb-3 flex items-center text-sm font-medium text-white">
            <Trophy className="mr-2 h-4 w-4 text-yellow-400" />
            Recovery Quest Status
          </h3>
          <div className="flex items-center justify-between rounded-lg border border-gray-700/30 bg-gray-800/50 p-3">
            <div className="flex items-center">
              <div
                className={`mr-3 h-2 w-2 rounded-full ${step === 2 ? "bg-green-500" : "bg-gray-500"}`}
              ></div>
              <span className="text-sm text-gray-300">
                {step === 1 ? "Awaiting email..." : "Recovery link sent!"}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              {step === 1 ? "0/1 completed" : "1/1 completed"}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GamifiedForgotPassword;
