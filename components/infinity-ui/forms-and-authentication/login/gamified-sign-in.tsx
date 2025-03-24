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
  User,
} from "lucide-react";

const GamifiedSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // Update score when fields are filled
  useEffect(() => {
    let newScore = 0;
    if (email) newScore += 50;
    if (password) newScore += 50;
    setScore(newScore);
  }, [email, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
              Player Login
            </h1>
            <p className="mb-6 text-center text-purple-300">
              Complete the quest to enter the game
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-purple-300"
                      >
                        Player Email
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
                          <User className="h-5 w-5 text-purple-400" />
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
                          +50 XP! Email quest completed!
                        </motion.p>
                      )}
                    </div>

                    <motion.button
                      type="button"
                      className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-medium text-white"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                      disabled={!email}
                    >
                      Continue Quest
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-purple-300"
                      >
                        Secret Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded-xl border border-purple-500/30 bg-gray-800/50 px-4 py-3 text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                          placeholder="••••••••"
                          required
                        />
                        {password && (
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
                      {password && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-1 text-xs text-green-400"
                        >
                          +50 XP! Password quest completed!
                        </motion.p>
                      )}
                    </div>

                    <div className="flex space-x-3">
                      <motion.button
                        type="button"
                        className="w-1/3 rounded-xl bg-gray-700 py-3 font-medium text-white"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep(1)}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        type="submit"
                        className="flex w-2/3 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-medium text-white"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        disabled={!password}
                      >
                        Complete Quest
                        <Trophy className="ml-2 h-4 w-4 text-yellow-300" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          <div className="border-t border-white/10 bg-gray-800/50 p-6">
            <p className="text-center text-sm text-purple-300">
              New player?{" "}
              <Link
                href="#"
                className="font-medium text-pink-400 transition-colors hover:text-pink-300"
              >
                Create your character
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Achievements */}
        <div className="mt-8 rounded-xl border border-white/10 bg-gray-900/50 p-4 backdrop-blur-lg">
          <h3 className="mb-3 flex items-center text-sm font-medium text-white">
            <Trophy className="mr-2 h-4 w-4 text-yellow-400" />
            Player Achievements
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <motion.div
              className={`rounded-lg p-2 ${email ? "border border-purple-500/30 bg-purple-900/50" : "border border-gray-700/30 bg-gray-800/50"}`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <User
                  className={`mx-auto mb-1 h-5 w-5 ${email ? "text-purple-400" : "text-gray-500"}`}
                />
                <span
                  className={`text-xs ${email ? "text-purple-300" : "text-gray-500"}`}
                >
                  Identity
                </span>
              </div>
            </motion.div>
            <motion.div
              className={`rounded-lg p-2 ${password ? "border border-pink-500/30 bg-pink-900/50" : "border border-gray-700/30 bg-gray-800/50"}`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <svg
                  className={`mx-auto mb-1 h-5 w-5 ${password ? "text-pink-400" : "text-gray-500"}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span
                  className={`text-xs ${password ? "text-pink-300" : "text-gray-500"}`}
                >
                  Security
                </span>
              </div>
            </motion.div>
            <motion.div
              className={`rounded-lg p-2 ${score === 100 ? "border border-purple-500/30 bg-gradient-to-br from-purple-900/50 to-pink-900/50" : "border border-gray-700/30 bg-gray-800/50"}`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-center">
                <GameController
                  className={`mx-auto mb-1 h-5 w-5 ${score === 100 ? "text-yellow-400" : "text-gray-500"}`}
                />
                <span
                  className={`text-xs ${score === 100 ? "text-yellow-300" : "text-gray-500"}`}
                >
                  Gamer
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GamifiedSignIn;
