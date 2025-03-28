"use client";

import type React from "react";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Check,
  X,
  Shield,
  Lock,
  ArrowRight,
  AlertTriangle,
} from "lucide-react";

const PasswordStrengthMeter = ({ strength }: { strength: number }) => {
  const getColor = (value: number) => {
    if (value <= 1) return "bg-red-500";
    if (value === 2) return "bg-orange-500";
    if (value === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getLabel = (value: number) => {
    if (value <= 1) return "Weak";
    if (value === 2) return "Fair";
    if (value === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="mt-2 space-y-1">
      <div className="flex items-center justify-between">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
          <motion.div
            className={`h-full ${getColor(strength)}`}
            initial={{ width: "0%" }}
            animate={{ width: `${(strength / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <span
          className={`ml-3 text-sm font-medium ${getColor(strength).replace("bg-", "text-")}`}
        >
          {getLabel(strength)}
        </span>
      </div>
    </div>
  );
};

export default function SecurityResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [breachWarning, setBreachWarning] = useState(false);

  const commonPasswords = useMemo(
    () => ["password", "123456", "qwerty", "admin", "welcome"],
    [],
  );

  useEffect(() => {
    if (!password) {
      setPasswordStrength(0);
      setBreachWarning(false);
      return;
    }

    // Check if password is in common list (simulating breach check)
    const isCommon = commonPasswords.some((p) =>
      password.toLowerCase().includes(p),
    );

    setBreachWarning(isCommon);

    // Calculate strength
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 0.5;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    // Reduce strength if password is common
    if (isCommon) strength = Math.max(0, strength - 2);

    setPasswordStrength(Math.min(4, strength));
  }, [commonPasswords, password]);

  const passwordsMatch = password === confirmPassword && password !== "";
  const isValid = passwordStrength >= 3 && passwordsMatch && !breachWarning;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      setError(
        "Please ensure your password is strong, unique, and both passwords match.",
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

  return (
    <div className="mx-auto w-full max-w-md">
      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            className="relative z-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-2 bg-green-500" />
            <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
              <motion.div
                className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <Shield
                  size={36}
                  className="text-green-600 dark:text-green-400"
                />
              </motion.div>
              <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                Password Reset Complete
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your password has been successfully reset with a strong, secure
                password. Your account is now protected.
              </p>
              <motion.button
                className="mt-4 flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
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
            key="form"
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-2 bg-blue-600" />
            <div className="space-y-6 p-8">
              <div className="text-center">
                <motion.div
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Lock size={28} />
                </motion.div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Secure Password Reset
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Create a strong, unique password to protect your account
                </p>
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

              {breachWarning && (
                <motion.div
                  className="flex items-start rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-600 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <AlertTriangle className="mr-2 mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    This password appears in known data breaches. Please choose
                    a more unique password.
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="flex justify-between text-sm font-medium"
                  >
                    <span>New Password</span>
                    <span className="text-xs text-gray-500">
                      Security Level: {passwordStrength}/4
                    </span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
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
                  <PasswordStrengthMeter strength={passwordStrength} />
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
                      className={`w-full rounded-lg border bg-transparent px-4 py-3 transition-all focus:border-transparent focus:outline-none focus:ring-2 ${
                        confirmPassword
                          ? passwordsMatch
                            ? "border-green-300 focus:ring-green-500 dark:border-green-700"
                            : "border-red-300 focus:ring-red-500 dark:border-red-700"
                          : "border-gray-300 focus:ring-blue-500 dark:border-gray-700"
                      }`}
                      placeholder="Confirm new password"
                      required
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
                          <Check size={14} className="mr-1" /> Passwords match
                        </motion.div>
                      ) : (
                        <motion.div
                          className="flex items-center text-red-600 dark:text-red-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <X size={14} className="mr-1" /> Passwords don&apos;t
                          match
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2 rounded-lg border border-blue-100 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                  <h3 className="flex items-center text-sm font-medium text-blue-700 dark:text-blue-300">
                    <Shield size={14} className="mr-1.5" />
                    Security Tips:
                  </h3>
                  <ul className="ml-5 list-disc space-y-1 text-xs text-gray-600 dark:text-gray-300">
                    <li>Use at least 12 characters for maximum security</li>
                    <li>Include uppercase letters, numbers, and symbols</li>
                    <li>Avoid using personal information or common words</li>
                    <li>Don&apos;t reuse passwords from other accounts</li>
                  </ul>
                </div>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    className={`flex w-full items-center justify-center rounded-lg py-3 font-medium transition-all ${
                      isValid
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                    disabled={!isValid || isLoading}
                    whileHover={isValid ? { scale: 1.02 } : {}}
                    whileTap={isValid ? { scale: 0.98 } : {}}
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
                      "Reset Password Securely"
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
