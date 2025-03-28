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
import { ArrowRight, CheckCircle2, Clock, RefreshCw } from "lucide-react";

const MinimalOTPVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

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
      setTimeLeft(60);
      setOtp(Array(6).fill(""));
      setError("");
      inputRefs.current[0]?.focus();
    }, 1000);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {!isVerified ? (
            <motion.div
              key="verification"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center">
                <h1 className="mb-2 text-3xl font-bold text-gray-900">
                  Verification
                </h1>
                <p className="mb-8 text-gray-600">
                  We&apos;ve sent a verification code to your email. Enter the
                  code below.
                </p>
              </div>

              <div className="mb-8">
                <div className="flex justify-center space-x-3">
                  {otp.map((digit, index) => (
                    <div key={index} className="relative w-12">
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
                        className="h-14 w-full border-b-2 border-gray-300 bg-transparent text-center text-xl font-bold text-gray-900 outline-none transition-all"
                        autoFocus={index === 0}
                      />
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-black"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: digit ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
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
                    ? `Code expires in ${timeLeft} seconds`
                    : "Code expired"}
                </span>
              </div>

              <motion.button
                type="button"
                className="mb-4 flex w-full items-center justify-center rounded-lg bg-black py-3 font-medium text-white"
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
                    Verify
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </motion.button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={timeLeft > 0 || isResending}
                  className={`flex items-center justify-center text-sm ${
                    timeLeft > 0
                      ? "text-gray-400"
                      : "text-gray-900 hover:underline"
                  }`}
                >
                  {isResending ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                      </motion.div>
                      Resending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Resend code
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
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
                Your identity has been verified successfully.
              </p>

              <Link href="#">
                <motion.button
                  className="inline-flex items-center rounded-lg bg-black px-6 py-3 font-medium text-white"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MinimalOTPVerification;
