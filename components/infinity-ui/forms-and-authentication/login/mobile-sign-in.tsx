"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  Fingerprint,
  Smartphone,
  X,
} from "lucide-react";

const MobileSignIn = () => {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1);
  const [showBiometric, setShowBiometric] = useState(false);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmitPhone = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBiometric(true);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-white">
      {/* Mobile-style header */}
      <header className="border-b border-gray-200 bg-white px-4 py-4">
        <div className="flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="-ml-2 rounded-full p-2 hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          ) : (
            <div className="w-5"></div>
          )}
          <h1 className="text-lg font-semibold text-gray-900">Sign In</h1>
          <Link href="/" className="-mr-2 rounded-full p-2 hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-600" />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mx-auto w-full max-w-md">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center">
                <div className="mb-6 flex justify-center">
                  <motion.div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Smartphone className="h-8 w-8 text-blue-600" />
                  </motion.div>
                </div>
                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  Enter your phone number
                </h2>
                <p className="text-gray-600">
                  We&apos;ll send you a verification code
                </p>
              </div>

              <form onSubmit={handleSubmitPhone} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Standard message and data rates may apply
                  </p>
                </div>

                <motion.button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-medium text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!phone}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="#"
                    className="font-medium text-blue-600 transition-colors hover:text-blue-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  Verification code
                </h2>
                <p className="text-gray-600">
                  Enter the 4-digit code sent to {phone}
                </p>
              </div>

              <form onSubmit={handleSubmitCode} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-center space-x-3">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleCodeChange(index, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="h-14 w-14 rounded-xl border border-gray-300 text-center text-xl font-bold outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    ))}
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      Resend code
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-medium text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={code.some((digit) => !digit)}
                >
                  Verify
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Biometric authentication modal */}
          {showBiometric && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-full max-w-xs rounded-2xl bg-white p-6"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">
                    Use biometric authentication
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sign in quickly and securely with your fingerprint
                  </p>
                </div>

                <div className="mb-6 flex justify-center">
                  <motion.button
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100"
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onClick={() => setShowBiometric(false)}
                  >
                    <Fingerprint className="h-12 w-12 text-blue-600" />
                  </motion.button>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowBiometric(false)}
                    className="flex-1 rounded-xl border border-gray-300 py-3 font-medium text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowBiometric(false)}
                    className="flex-1 rounded-xl bg-blue-600 py-3 font-medium text-white"
                  >
                    Use password
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom navigation bar - mobile style */}
      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="#" className="text-xs text-gray-600">
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs text-gray-600">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs text-gray-600">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileSignIn;
