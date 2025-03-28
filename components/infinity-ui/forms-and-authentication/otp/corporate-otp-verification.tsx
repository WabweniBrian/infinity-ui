"use client";

import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  HelpCircle,
  Shield,
} from "lucide-react";

const CorporateOTPVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [isResending, setIsResending] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Clear any previous errors
    setError("");

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key down events
  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste event
  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    // Check if pasted content is a valid OTP (numbers only)
    if (!/^\d+$/.test(pastedData)) {
      setError("Please paste numbers only");
      return;
    }

    // Fill the OTP fields with pasted data
    const pastedOtp = pastedData.split("").slice(0, 6);
    const newOtp = [...otp];

    pastedOtp.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });

    setOtp(newOtp);

    // Focus the next empty field or the last field
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  // Handle verification
  const handleVerify = () => {
    // Check if OTP is complete
    if (otp.some((digit) => !digit)) {
      setError("Please enter all digits");
      return;
    }

    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);

      // For demo purposes, let's say "123456" is the correct OTP
      if (otp.join("") === "123456") {
        setIsVerified(true);
      } else {
        setError("Invalid verification code");
      }
    }, 1500);
  };

  // Handle resend
  const handleResend = () => {
    if (timeLeft > 0) return;

    setIsResending(true);

    // Simulate resend process
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(300);
      setOtp(Array(6).fill(""));
      setError("");
      inputRefs.current[0]?.focus();
    }, 1000);
  };

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
          <AnimatePresence mode="wait">
            {!isVerified ? (
              <motion.div
                key="verification"
                className="overflow-hidden rounded-lg bg-white shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-8">
                  <div className="mb-8 text-center">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                      Two-Factor Authentication
                    </h2>
                    <p className="text-gray-600">
                      Enter the verification code sent to your email
                    </p>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-center space-x-2">
                      {otp.map((digit, index) => (
                        <div key={index} className="w-10">
                          <input
                            ref={(el: HTMLInputElement | null) => {
                              inputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleChange(
                                index,
                                e.target.value.replace(/[^0-9]/g, ""),
                              )
                            }
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            className="h-12 w-full rounded-lg border border-gray-300 bg-white text-center text-lg font-bold text-gray-900 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            autoFocus={index === 0}
                          />
                        </div>
                      ))}
                    </div>

                    {error && (
                      <motion.p
                        className="mt-3 text-center text-sm text-red-500"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>

                  <div className="mb-6 flex items-center justify-center">
                    <Clock className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {timeLeft > 0
                        ? `Code expires in ${formatTime(timeLeft)}`
                        : "Code expired"}
                    </span>
                  </div>

                  <motion.button
                    type="button"
                    className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-3 font-medium text-white"
                    onClick={handleVerify}
                    disabled={isVerifying || otp.some((digit) => !digit)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isVerifying ? (
                      <motion.div
                        className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                    ) : (
                      <>
                        Verify Code
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </motion.button>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setShowHelp(!showHelp)}
                      className="flex items-center text-sm text-gray-600 hover:text-gray-900"
                    >
                      <HelpCircle className="mr-2 h-4 w-4 text-blue-600" />
                      Need help with verification?
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
                            <span className="mr-2 h-5 w-5 text-blue-600">
                              •
                            </span>
                            Check your email inbox and spam folder for the
                            verification code
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 h-5 w-5 text-blue-600">
                              •
                            </span>
                            The code is 6 digits and is valid for 5 minutes
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 h-5 w-5 text-blue-600">
                              •
                            </span>
                            If you didn&apos;t receive a code, you can request a
                            new one
                          </li>
                        </ul>
                      </motion.div>
                    )}
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={timeLeft > 0 || isResending}
                      className={`text-sm ${timeLeft > 0 ? "text-gray-400" : "text-blue-600 hover:text-blue-700"}`}
                    >
                      {isResending
                        ? "Sending new code..."
                        : "Didn&apos;t receive a code? Resend"}
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <div className="flex items-center">
                    <Shield className="mr-3 h-5 w-5 text-blue-600" />
                    <p className="text-xs text-gray-500">
                      Your connection to Enterprise Portal is secure and
                      encrypted
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                className="overflow-hidden rounded-lg bg-white shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.1,
                    }}
                    className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
                  >
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </motion.div>

                  <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Verification Successful
                  </h2>
                  <p className="mb-8 text-gray-600">
                    Your identity has been verified successfully
                  </p>

                  <Link href="#">
                    <motion.button
                      className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Continue to Dashboard
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </motion.button>
                  </Link>
                </div>

                <div className="border-t border-gray-200 bg-gray-50 p-6">
                  <div className="flex items-center">
                    <Shield className="mr-3 h-5 w-5 text-blue-600" />
                    <p className="text-xs text-gray-500">
                      Your connection to Enterprise Portal is secure and
                      encrypted
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              © 2023 Enterprise Corporation. All rights reserved. v3.4.2
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateOTPVerification;
