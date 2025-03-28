"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Facebook,
  Github,
  Lock,
  Mail,
  Twitter,
  User,
} from "lucide-react";

type AuthMode = "signin" | "signup" | "forgot";
type SignUpStep = "account" | "personal" | "verification" | "complete";

const StepperAuth = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [signUpStep, setSignUpStep] = useState<SignUpStep>("account");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);

      if (authMode === "signup") {
        if (signUpStep === "account") {
          setSignUpStep("personal");
        } else if (signUpStep === "personal") {
          setSignUpStep("verification");
          // Simulate sending verification code
          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
          }, 2000);
        } else if (signUpStep === "verification") {
          setSignUpStep("complete");
        }
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
      }
    }, 1500);
  };

  // Reset sign up step when changing auth mode
  useEffect(() => {
    setSignUpStep("account");
  }, [authMode]);

  // Get progress percentage for sign up steps
  const getProgressPercentage = () => {
    switch (signUpStep) {
      case "account":
        return 25;
      case "personal":
        return 50;
      case "verification":
        return 75;
      case "complete":
        return 100;
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-white">
            {/* Decorative elements */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white opacity-10"></div>

            <div className="relative z-10">
              {authMode === "signin" && (
                <div>
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="mt-1 text-emerald-100">
                    Sign in to continue to your account
                  </p>
                </div>
              )}

              {authMode === "signup" && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Create account</h1>
                    <div className="text-sm">
                      Step{" "}
                      {signUpStep === "account"
                        ? "1"
                        : signUpStep === "personal"
                          ? "2"
                          : signUpStep === "verification"
                            ? "3"
                            : "4"}{" "}
                      of 4
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/30">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: `${getProgressPercentage() - 25}%` }}
                      animate={{ width: `${getProgressPercentage()}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="mt-2">
                    {signUpStep === "account" && (
                      <p className="text-emerald-100">
                        Create your login credentials
                      </p>
                    )}
                    {signUpStep === "personal" && (
                      <p className="text-emerald-100">Tell us about yourself</p>
                    )}
                    {signUpStep === "verification" && (
                      <p className="text-emerald-100">Verify your account</p>
                    )}
                    {signUpStep === "complete" && (
                      <p className="text-emerald-100">
                        All set! Your account is ready
                      </p>
                    )}
                  </div>
                </div>
              )}

              {authMode === "forgot" && (
                <div>
                  <h1 className="text-2xl font-bold">Reset password</h1>
                  <p className="mt-1 text-emerald-100">
                    We&apos;ll send you instructions to reset your password
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {/* Sign In Form */}
              {authMode === "signin" && (
                <motion.form
                  key="signin-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
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
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setAuthMode("forgot")}
                        className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 py-3 font-medium text-white transition-all hover:shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting || isSuccess}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1,
                          ease: "linear",
                        }}
                      />
                    ) : isSuccess ? (
                      <>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.5 }}
                          className="absolute inset-0 bg-green-500"
                        />
                        <span className="relative z-10 flex items-center">
                          Success
                          <Check className="ml-2 h-4 w-4" />
                        </span>
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </motion.button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <motion.button
                      type="button"
                      className="flex items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 transition-colors hover:bg-gray-50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      type="button"
                      className="flex items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 transition-colors hover:bg-gray-50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                    </motion.button>
                    <motion.button
                      type="button"
                      className="flex items-center justify-center rounded-lg border border-gray-300 bg-white py-2.5 transition-colors hover:bg-gray-50"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Twitter className="h-5 w-5 text-blue-400" />
                    </motion.button>
                  </div>

                  <p className="mt-4 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("signup")}
                      className="font-medium text-emerald-600 hover:text-emerald-700"
                    >
                      Sign up
                    </button>
                  </p>
                </motion.form>
              )}

              {/* Sign Up Form - Step 1: Account */}
              {authMode === "signup" && signUpStep === "account" && (
                <motion.form
                  key="signup-account-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="signup-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="signup-password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Must be at least 8 characters with 1 uppercase, 1 number,
                      and 1 special character
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      type="button"
                      onClick={() => setAuthMode("signin")}
                      className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </motion.button>

                    <motion.button
                      type="submit"
                      className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 font-medium text-white transition-all hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1,
                            ease: "linear",
                          }}
                        />
                      ) : (
                        <>
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {/* Sign Up Form - Step 2: Personal */}
              {authMode === "signup" && signUpStep === "personal" && (
                <motion.form
                  key="signup-personal-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      We&apos;ll send a verification code to this number
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      type="button"
                      onClick={() => setSignUpStep("account")}
                      className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </motion.button>

                    <motion.button
                      type="submit"
                      className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 font-medium text-white transition-all hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || isSuccess}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1,
                            ease: "linear",
                          }}
                        />
                      ) : isSuccess ? (
                        <>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-green-500"
                          />
                          <span className="relative z-10 flex items-center">
                            Code Sent
                            <Check className="ml-2 h-4 w-4" />
                          </span>
                        </>
                      ) : (
                        <>
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {/* Sign Up Form - Step 3: Verification */}
              {authMode === "signup" && signUpStep === "verification" && (
                <motion.form
                  key="signup-verification-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                      <Mail className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h2 className="text-lg font-medium text-gray-900">
                      Verification code
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                      We&apos;ve sent a verification code to {phone}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="verification-code"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Enter verification code
                    </label>
                    <div className="flex justify-center space-x-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          className="h-12 w-12 rounded-lg border border-gray-300 text-center text-lg font-bold outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                          value={verificationCode[index] || ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^[0-9]$/.test(value) || value === "") {
                              const newCode = verificationCode.split("");
                              newCode[index] = value;
                              setVerificationCode(newCode.join(""));

                              // Auto-focus next input
                              if (value && index < 5) {
                                const nextInput =
                                  e.target.parentElement?.nextElementSibling?.querySelector(
                                    "input",
                                  );
                                if (nextInput) nextInput.focus();
                              }
                            }
                          }}
                          onKeyDown={(e) => {
                            // Handle backspace to go to previous input
                            if (
                              e.key === "Backspace" &&
                              !verificationCode[index] &&
                              index > 0
                            ) {
                              const prevInput =
                                e.currentTarget.parentElement?.previousElementSibling?.querySelector(
                                  "input",
                                );
                              if (prevInput) prevInput.focus();
                            }
                          }}
                          required
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-center text-sm text-gray-600">
                      Didn&apos;t receive the code?{" "}
                      <button
                        type="button"
                        className="font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        Resend
                      </button>
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      type="button"
                      onClick={() => setSignUpStep("personal")}
                      className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </motion.button>

                    <motion.button
                      type="submit"
                      className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 font-medium text-white transition-all hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || verificationCode.length !== 6}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1,
                            ease: "linear",
                          }}
                        />
                      ) : (
                        <>
                          Verify
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}

              {/* Sign Up Form - Step 4: Complete */}
              {authMode === "signup" && signUpStep === "complete" && (
                <motion.div
                  key="signup-complete"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 py-4 text-center"
                >
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <Check className="h-10 w-10 text-green-600" />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Account created!
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Your account has been successfully created and is ready to
                      use.
                    </p>
                  </div>

                  <motion.button
                    type="button"
                    onClick={() => setAuthMode("signin")}
                    className="mx-auto flex items-center justify-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-3 font-medium text-white transition-all hover:shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue to Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </motion.div>
              )}

              {/* Forgot Password Form */}
              {authMode === "forgot" && (
                <motion.form
                  key="forgot-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="forgot-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="forgot-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none transition-colors focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      We&apos;ll send a password reset link to this email
                      address
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <motion.button
                      type="button"
                      onClick={() => setAuthMode("signin")}
                      className="flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Sign In
                    </motion.button>

                    <motion.button
                      type="submit"
                      className="relative flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-2 font-medium text-white transition-all hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting || isSuccess}
                    >
                      {isSubmitting ? (
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1,
                            ease: "linear",
                          }}
                        />
                      ) : isSuccess ? (
                        <>
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-green-500"
                          />
                          <span className="relative z-10 flex items-center">
                            Email Sent
                            <Check className="ml-2 h-4 w-4" />
                          </span>
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StepperAuth;
