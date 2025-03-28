"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown, Lock, Mail, Shield, User } from "lucide-react"

const FinanceSignUp = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showSecurityTips, setShowSecurityTips] = useState(false)

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50">
      {/* Main content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left side - Sign up form */}
        <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Create your account</h2>
              <p className="text-gray-600">Join our secure banking platform</p>
            </div>

            <form className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
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
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-emerald-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{" "}
                  <Link href="#" className="text-emerald-600 hover:text-emerald-500">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-emerald-600 hover:text-emerald-500">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <motion.button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-emerald-600 py-3 font-medium text-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.button>
            </form>

            <div className="mt-8">
              <button
                type="button"
                onClick={() => setShowSecurityTips(!showSecurityTips)}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <Shield className="mr-2 h-4 w-4 text-emerald-600" />
                Security tips for strong passwords
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showSecurityTips ? "rotate-180" : ""}`} />
              </button>

              {showSecurityTips && (
                <motion.div
                  className="mt-3 rounded-lg bg-gray-100 p-4 text-sm text-gray-700"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 text-emerald-600">•</span>
                      Use at least 8 characters with a mix of letters, numbers, and symbols
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 text-emerald-600">•</span>
                      Avoid using easily guessable information like birthdays
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 h-5 w-5 text-emerald-600">•</span>
                      Use a unique password not used on other websites
                    </li>
                  </ul>
                </motion.div>
              )}
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right side - Security information */}
        <div className="hidden w-1/2 bg-gradient-to-br from-emerald-500 to-teal-600 p-12 text-white md:block">
          <motion.div
            className="mx-auto flex h-full max-w-md flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="mb-8">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-4 text-3xl font-bold">Bank-grade security</h2>
              <p className="mb-6 text-emerald-100">
                Your financial data is protected with industry-leading security measures and encryption.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M12 16V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 8H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">Two-factor authentication</h3>
                  <p className="text-sm text-emerald-100">Add an extra layer of security to your account with 2FA.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M2 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 12H22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">Biometric login</h3>
                  <p className="text-sm text-emerald-100">
                    Use your fingerprint or face ID for quick and secure access.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/30">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 12L11 14L15 10"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">Fraud monitoring</h3>
                  <p className="text-sm text-emerald-100">
                    24/7 monitoring to detect and prevent unauthorized transactions.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-emerald-400/30 pt-8">
              <p className="text-sm text-emerald-100">
                Need assistance? Our customer support is available 24/7 at{" "}
                <span className="font-medium text-white">1-800-SECURE-BANK</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default FinanceSignUp

