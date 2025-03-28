"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, Mail, Smartphone, X } from "lucide-react";

const MobileForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", ""]);
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState("phone");

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

  const handleSubmitMethod = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
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
          <h1 className="text-lg font-semibold text-gray-900">
            Reset Password
          </h1>
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
                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  Forgot your password?
                </h2>
                <p className="text-gray-600">
                  Select how you want to reset your password
                </p>
              </div>

              <form onSubmit={handleSubmitMethod} className="space-y-6">
                <div className="space-y-4">
                  <div className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center">
                      <input
                        id="phone-method"
                        name="reset-method"
                        type="radio"
                        checked={method === "phone"}
                        onChange={() => setMethod("phone")}
                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="phone-method"
                        className="ml-3 flex flex-1 cursor-pointer items-center"
                      >
                        <Smartphone className="mr-3 h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Via SMS
                          </p>
                          <p className="text-xs text-gray-500">
                            We&apos;ll send a code to your phone
                          </p>
                        </div>
                      </label>
                    </div>

                    {method === "phone" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 border-t border-gray-100 pt-4"
                      >
                        <div className="space-y-2">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="(123) 456-7890"
                            required={method === "phone"}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center">
                      <input
                        id="email-method"
                        name="reset-method"
                        type="radio"
                        checked={method === "email"}
                        onChange={() => setMethod("email")}
                        className="form-radio h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="email-method"
                        className="ml-3 flex flex-1 cursor-pointer items-center"
                      >
                        <Mail className="mr-3 h-5 w-5 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            Via Email
                          </p>
                          <p className="text-xs text-gray-500">
                            We&apos;ll send a link to your email
                          </p>
                        </div>
                      </label>
                    </div>

                    {method === "email" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 border-t border-gray-100 pt-4"
                      >
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            placeholder="name@example.com"
                            required={method === "email"}
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-medium text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={
                    (method === "phone" && !phone) ||
                    (method === "email" && !email)
                  }
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </form>
            </motion.div>
          )}

          {step === 2 && method === "phone" && (
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

          {step === 2 && method === "email" && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  Check your inbox
                </h2>
                <p className="text-gray-600">
                  We&apos;ve sent a password reset link to:
                </p>
                <p className="mt-2 font-medium text-gray-900">{email}</p>
              </div>

              <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
                <p>
                  If you don&apos;t see the email, check your spam folder or{" "}
                  <button
                    onClick={() => setStep(1)}
                    className="font-medium text-blue-600"
                  >
                    try another method
                  </button>
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="#"
                  className="inline-flex items-center text-blue-600"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back to sign in
                </Link>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-xl font-bold text-gray-900">
                  Create new password
                </h2>
                <p className="text-gray-600">
                  Your new password must be different from previous passwords
                </p>
              </div>

              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-medium text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Reset Password
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </form>
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

export default MobileForgotPassword;
