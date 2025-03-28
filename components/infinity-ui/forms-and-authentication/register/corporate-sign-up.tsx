"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  HelpCircle,
  Lock,
  Mail,
  Shield,
  User,
} from "lucide-react";

const CorporateSignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [showDomainSelector, setShowDomainSelector] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("@company.com");

  const domains = [
    "@company.com",
    "@enterprise.org",
    "@corp.net",
    "@business.co",
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mr-2 flex h-8 w-8 items-center justify-center rounded bg-blue-600">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Enterprise Portal
            </span>
          </motion.div>

          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Help Center
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Contact IT
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <motion.div
            className="overflow-hidden rounded-lg bg-white shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                  Create your account
                </h2>
                <p className="text-gray-600">
                  Join your company&apos;s corporate network
                </p>
              </div>

              <form className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Work Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex">
                      <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-l-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        placeholder="username"
                      />
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() =>
                            setShowDomainSelector(!showDomainSelector)
                          }
                          className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-300 bg-gray-50 px-4 py-3 text-gray-500 hover:bg-gray-100"
                        >
                          {selectedDomain}
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </button>
                        {showDomainSelector && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 z-10 mt-2 w-full rounded-md border border-gray-200 bg-white shadow-lg"
                          >
                            <ul className="py-1">
                              {domains.map((domain) => (
                                <li key={domain}>
                                  <button
                                    type="button"
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => {
                                      setSelectedDomain(domain);
                                      setShowDomainSelector(false);
                                    }}
                                  >
                                    {domain}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
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
                      className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    className="form-checkbox h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-medium text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </form>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setShowHelp(!showHelp)}
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                >
                  <HelpCircle className="mr-2 h-4 w-4 text-blue-600" />
                  Need help signing up?
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transition-transform ${showHelp ? "rotate-180" : ""}`}
                  />
                </button>

                {showHelp && (
                  <motion.div
                    className="mt-3 rounded-lg bg-gray-50 p-4 text-sm text-gray-700"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                  >
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2 h-5 w-5 text-blue-600">•</span>
                        Contact your IT department if you&apos;re having trouble
                        creating an account
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 h-5 w-5 text-blue-600">•</span>
                        Use your company email address and create a strong
                        password
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 h-5 w-5 text-blue-600">•</span>
                        Your account will need to be approved by an
                        administrator
                      </li>
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 bg-gray-50 p-6">
              <div className="flex items-center">
                <Shield className="mr-3 h-5 w-5 text-blue-600" />
                <p className="text-xs text-gray-500">
                  Your connection to Enterprise Portal is secure and encrypted
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="#" className="font-medium text-blue-600">
                Sign in
              </Link>
            </p>
            <p className="mt-4 text-xs text-gray-500">
              © 2023 Enterprise Corporation. All rights reserved. v3.4.2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateSignUp;
