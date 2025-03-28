"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Check, X, ArrowRight, Lock } from "lucide-react";

const PasswordStrengthIndicator = ({ strength }: { strength: number }) => {
  const levels = [
    { color: "bg-red-500", label: "Weak" },
    { color: "bg-orange-500", label: "Fair" },
    { color: "bg-yellow-500", label: "Good" },
    { color: "bg-green-500", label: "Strong" },
  ];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex h-1 gap-1">
        {levels.map((level, i) => (
          <motion.div
            key={i}
            className={`h-full flex-1 rounded-full ${i < strength ? level.color : "bg-gray-200 dark:bg-gray-700"}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: i < strength ? 1 : 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {strength > 0
          ? levels[Math.min(strength - 1, 3)].label
          : "Enter password"}
      </p>
    </div>
  );
};

export default function MinimalResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const calculateStrength = (pass: string) => {
    if (!pass) return 0;

    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

    return strength;
  };

  const passwordStrength = calculateStrength(password);
  const passwordsMatch = password === confirmPassword && password !== "";
  const isValid = passwordStrength >= 3 && passwordsMatch;

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

  if (isSuccess) {
    return (
      <motion.div
        className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Check size={32} />
          </motion.div>
          <h2 className="text-2xl font-medium">Password Reset Complete</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Your password has been successfully reset. You can now log in with
            your new password.
          </p>
          <motion.button
            className="mt-4 flex items-center justify-center rounded-md bg-black px-6 py-2 font-medium text-white dark:bg-white dark:text-black"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => (window.location.href = "#")}
          >
            Go to Login <ArrowRight className="ml-2" size={16} />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="mx-auto w-full max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-medium">Reset Your Password</h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Create a new password for your account
          </p>
        </div>

        {error && (
          <motion.div
            className="flex items-start rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <X className="mr-2 mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium">
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-2 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-black dark:border-gray-700 dark:focus:ring-white"
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <PasswordStrengthIndicator strength={passwordStrength} />
          </div>

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
                className={`w-full rounded-md border bg-transparent px-4 py-2 transition-all focus:border-transparent focus:outline-none focus:ring-2 ${
                  confirmPassword
                    ? passwordsMatch
                      ? "border-green-300 focus:ring-green-500 dark:border-green-700 dark:focus:ring-green-500"
                      : "border-red-300 focus:ring-red-500 dark:border-red-700 dark:focus:ring-red-500"
                    : "border-gray-300 focus:ring-black dark:border-gray-700 dark:focus:ring-white"
                }`}
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                    <Check size={14} className="mr-1" /> Passwords match
                  </motion.div>
                ) : (
                  <motion.div
                    className="flex items-center text-red-600 dark:text-red-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <X size={14} className="mr-1" /> Passwords don&apos;t match
                  </motion.div>
                )}
              </div>
            )}
          </div>

          <div className="pt-2">
            <motion.button
              type="submit"
              className={`flex w-full items-center justify-center rounded-md py-2.5 font-medium transition-all ${
                isValid
                  ? "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  : "cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
              }`}
              disabled={!isValid || isLoading}
              whileHover={isValid ? { scale: 1.02 } : {}}
              whileTap={isValid ? { scale: 0.98 } : {}}
            >
              {isLoading ? (
                <svg
                  className="h-5 w-5 animate-spin text-white dark:text-black"
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
        </form>

        <div className="space-y-2 border-t border-gray-200 pt-4 text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <p className="flex items-center">
            <Lock size={14} className="mr-1.5" />
            Your password must be at least 8 characters
          </p>
          <p className="flex items-center">
            <Lock size={14} className="mr-1.5" />
            Include at least one uppercase letter, number, and special character
          </p>
        </div>
      </div>
    </motion.div>
  );
}
