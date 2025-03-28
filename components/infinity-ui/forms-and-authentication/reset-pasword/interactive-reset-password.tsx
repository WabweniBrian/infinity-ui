"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Check,
  X,
  Lock,
  Unlock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const PasswordStrengthGame = ({ password }: { password: string }) => {
  const [score, setScore] = useState(0);
  const maxScore = 100;

  useEffect(() => {
    if (!password) {
      setScore(0);
      return;
    }

    let currentScore = 0;

    // Length
    currentScore += Math.min(password.length * 5, 40);

    // Complexity
    if (/[A-Z]/.test(password)) currentScore += 15;
    if (/[0-9]/.test(password)) currentScore += 15;
    if (/[^A-Za-z0-9]/.test(password)) currentScore += 20;
    if (/[a-z]/.test(password)) currentScore += 10;

    // Variety
    const uniqueChars = new Set(password).size;
    currentScore += Math.min(uniqueChars * 2, 20);

    // Cap at max score
    setScore(Math.min(currentScore, maxScore));
  }, [password]);

  const getEmoji = () => {
    if (score === 0) return "😴";
    if (score < 30) return "😢";
    if (score < 50) return "😐";
    if (score < 70) return "🙂";
    if (score < 90) return "😃";
    return "🔥";
  };

  const getMessage = () => {
    if (score === 0) return "Start typing...";
    if (score < 30) return "Very weak!";
    if (score < 50) return "Could be stronger";
    if (score < 70) return "Getting better!";
    if (score < 90) return "Strong password!";
    return "Excellent password!";
  };

  return (
    <div className="mb-4 mt-3">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-sm font-medium">Password Strength</span>
        <span className="text-sm font-medium">
          {score}/{maxScore} {getEmoji()}
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <motion.div
          className={`h-full ${
            score < 30
              ? "bg-red-500"
              : score < 50
                ? "bg-orange-500"
                : score < 70
                  ? "bg-yellow-500"
                  : score < 90
                    ? "bg-green-500"
                    : "bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
          }`}
          initial={{ width: "0%" }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        {getMessage()}
      </p>

      {score >= 90 && (
        <motion.div
          className="mt-2 flex items-center text-xs text-purple-600 dark:text-purple-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Sparkles size={14} className="mr-1" /> Achievement unlocked: Password
          Master!
        </motion.div>
      )}
    </div>
  );
};

export default function InteractiveResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const passwordsMatch = password === confirmPassword && password !== "";
  const passwordScore = password
    ? Math.min(
        (password.length >= 8 ? 25 : 0) +
          (/[A-Z]/.test(password) ? 25 : 0) +
          (/[0-9]/.test(password) ? 25 : 0) +
          (/[^A-Za-z0-9]/.test(password) ? 25 : 0),
        100,
      )
    : 0;

  const isValid = passwordScore >= 75 && passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      setError(
        "Please ensure your password is strong and both passwords match.",
      );
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSuccess(true);
  };

  const handleContinue = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (passwordScore < 75) {
      setError("Please create a stronger password");
      return;
    }

    setError("");
    setCurrentStep(2);
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500" />
            <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
              <motion.div
                className="relative h-24 w-24"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-purple-100 dark:bg-purple-900/30"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Unlock size={40} />
                </div>
              </motion.div>
              <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                Password Reset Complete!
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your password has been successfully reset. You&apos;ve created a
                strong password that will help keep your account secure.
              </p>
              <motion.button
                className="mt-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 font-medium text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "#")}
              >
                Continue to Login <ArrowRight className="ml-2" size={18} />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={`step-${currentStep}`}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900"
            initial={{ opacity: 0, x: currentStep === 1 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: currentStep === 1 ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500" />
            <div className="space-y-6 p-8">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <motion.div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      currentStep === 1
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                        : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    }`}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    {currentStep === 1 ? "1" : <Check size={16} />}
                  </motion.div>
                  <motion.div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      currentStep === 2
                        ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                        : "bg-gray-100 text-gray-400 dark:bg-gray-800"
                    }`}
                  >
                    2
                  </motion.div>
                </div>
                <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {currentStep === 1 ? "Create Password" : "Confirm Password"}
                </h2>
              </div>

              {error && (
                <motion.div
                  className="flex items-start rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="mr-2 mt-0.5 h-5 w-5 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {currentStep === 1 ? (
                  <>
                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-gray-700"
                          placeholder="Enter new password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>

                      <PasswordStrengthGame password={password} />

                      <div className="mt-3 flex flex-wrap gap-2">
                        <div
                          className={`rounded px-2 py-1 text-xs ${
                            password.length >= 8
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                          }`}
                        >
                          8+ characters
                        </div>
                        <div
                          className={`rounded px-2 py-1 text-xs ${
                            /[A-Z]/.test(password)
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                          }`}
                        >
                          Uppercase
                        </div>
                        <div
                          className={`rounded px-2 py-1 text-xs ${
                            /[0-9]/.test(password)
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                          }`}
                        >
                          Number
                        </div>
                        <div
                          className={`rounded px-2 py-1 text-xs ${
                            /[^A-Za-z0-9]/.test(password)
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-gray-100 text-gray-500 dark:bg-gray-800"
                          }`}
                        >
                          Special character
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <motion.button
                        type="button"
                        onClick={handleContinue}
                        className={`flex w-full items-center justify-center rounded-lg py-3 font-medium transition-all ${
                          password.length >= 8 && passwordScore >= 75
                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg"
                            : "cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                        disabled={password.length < 8 || passwordScore < 75}
                        whileHover={
                          password.length >= 8 && passwordScore >= 75
                            ? { scale: 1.02 }
                            : {}
                        }
                        whileTap={
                          password.length >= 8 && passwordScore >= 75
                            ? { scale: 0.98 }
                            : {}
                        }
                      >
                        Continue
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium"
                      >
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={`w-full rounded-lg border bg-transparent px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 ${
                            confirmPassword
                              ? passwordsMatch
                                ? "border-green-300 focus:ring-green-500 dark:border-green-700"
                                : "border-red-300 focus:ring-red-500 dark:border-red-700"
                              : "border-gray-300 focus:ring-purple-500 dark:border-gray-700"
                          }`}
                          placeholder="Confirm your password"
                          required
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                      {confirmPassword && (
                        <div className="mt-1 flex items-center text-xs">
                          {passwordsMatch ? (
                            <motion.div
                              className="flex items-center text-green-600 dark:text-green-400"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <Check size={14} className="mr-1" /> Passwords
                              match
                            </motion.div>
                          ) : (
                            <motion.div
                              className="flex items-center text-red-600 dark:text-red-400"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <X size={14} className="mr-1" /> Passwords
                              don&apos;t match
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-3 pt-2">
                      <motion.button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1 rounded-lg border border-gray-300 py-3 font-medium hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        type="submit"
                        className={`flex flex-1 items-center justify-center rounded-lg py-3 font-medium transition-all ${
                          passwordsMatch
                            ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:shadow-lg"
                            : "cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                        disabled={!passwordsMatch || isLoading}
                        whileHover={passwordsMatch ? { scale: 1.02 } : {}}
                        whileTap={passwordsMatch ? { scale: 0.98 } : {}}
                      >
                        {isLoading ? (
                          <svg
                            className="h-5 w-5 animate-spin text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          "Reset Password"
                        )}
                      </motion.button>
                    </div>
                  </>
                )}
              </form>

              <div className="space-y-2 border-t border-gray-200 pt-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
                <p className="flex items-center">
                  <Lock size={14} className="mr-1.5" />
                  Your password is encrypted and secure
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
