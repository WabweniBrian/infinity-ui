"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Check, X, Shield, Lock, ArrowRight } from "lucide-react"

const PasswordRequirement = ({
  text,
  met,
}: {
  text: string
  met: boolean | null
}) => (
  <motion.div
    className={`flex items-center text-sm ${met === null ? "text-gray-400" : met ? "text-green-500" : "text-gray-400"}`}
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <div
      className={`mr-2 rounded-full flex items-center justify-center w-5 h-5 ${
        met === null ? "border border-gray-400" : met ? "bg-green-500 text-white" : "border border-gray-400"
      }`}
    >
      {met && <Check size={12} />}
    </div>
    {text}
  </motion.div>
)

export default function GradientResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const [requirements, setRequirements] = useState({
    length: null as boolean | null,
    uppercase: null as boolean | null,
    number: null as boolean | null,
    special: null as boolean | null,
    match: null as boolean | null,
  })

  useEffect(() => {
    setRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
      match: password && confirmPassword ? password === confirmPassword : null,
    })
  }, [password, confirmPassword])

  const isValid = Object.values(requirements).every((req) => req === true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValid) {
      setError("Please ensure all password requirements are met.")
      return
    }

    setError("")
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSuccess(true)
  }

  return (
    <div className="max-w-md w-full mx-auto relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-2xl opacity-90 blur-xl animate-pulse" />

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <motion.div
            key="success"
            className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />
            <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              >
                <Check size={36} />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                Password Reset Complete
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your password has been successfully reset. Your account is now secure with your new password.
              </p>
              <motion.button
                className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white rounded-lg font-medium flex items-center justify-center"
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
            className="relative z-10 bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />
            <div className="p-8 space-y-6">
              <div className="text-center">
                <motion.div
                  className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full mx-auto flex items-center justify-center text-pink-600 dark:text-pink-400 mb-4"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Shield size={28} />
                </motion.div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                  Create New Password
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Your new password must be different from previous passwords
                </p>
              </div>

              {error && (
                <motion.div
                  className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm flex items-start"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="shrink-0 h-5 w-5 mr-2 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label htmlFor="password" className="text-sm font-medium block">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="confirmPassword" className="text-sm font-medium block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                        confirmPassword
                          ? requirements.match
                            ? "border-green-300 dark:border-green-700 focus:ring-green-500"
                            : "border-red-300 dark:border-red-700 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-700 focus:ring-pink-500"
                      }`}
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-2">
                  <h3 className="text-sm font-medium flex items-center">
                    <Lock size={14} className="mr-1.5" />
                    Password Requirements:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    <PasswordRequirement text="At least 8 characters" met={requirements.length} />
                    <PasswordRequirement text="At least 1 uppercase letter" met={requirements.uppercase} />
                    <PasswordRequirement text="At least 1 number" met={requirements.number} />
                    <PasswordRequirement text="At least 1 special character" met={requirements.special} />
                  </div>
                  <div className="pt-1">
                    <PasswordRequirement text="Passwords match" met={requirements.match} />
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center transition-all ${
                      isValid
                        ? "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:shadow-lg hover:from-purple-600 hover:via-pink-600 hover:to-orange-500"
                        : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!isValid || isLoading}
                    whileHover={isValid ? { scale: 1.02 } : {}}
                    whileTap={isValid ? { scale: 0.98 } : {}}
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

