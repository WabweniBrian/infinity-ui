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
import { ArrowRight, CheckCircle2, Leaf, RefreshCw, Timer } from "lucide-react";

const NatureOTPVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(180);
  const [isResending, setIsResending] = useState(false);

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
    if (value && index < 3) {
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
    if (e.key === "ArrowRight" && index < 3) {
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
    const pastedOtp = pastedData.split("").slice(0, 4);
    const newOtp = [...otp];

    pastedOtp.forEach((digit, index) => {
      if (index < 4) newOtp[index] = digit;
    });

    setOtp(newOtp);

    // Focus the next empty field or the last field
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[3]?.focus();
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

      // For demo purposes, let's say "1234" is the correct OTP
      if (otp.join("") === "1234") {
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
      setTimeLeft(180);
      setOtp(Array(4).fill(""));
      setError("");
      inputRefs.current[0]?.focus();
    }, 1000);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-green-50 to-teal-50 p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-green-200 opacity-30 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-teal-200 opacity-30 blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-emerald-200 opacity-20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -15, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 20,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!isVerified ? (
            <motion.div
              key="verification"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-3xl bg-white/80 shadow-xl backdrop-blur-sm"
            >
              <div className="relative overflow-hidden p-8">
                {/* Small decorative leaves */}
                <motion.div
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-green-100"
                  animate={{
                    rotate: [0, 10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 8,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-teal-100"
                  animate={{
                    rotate: [0, -10, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 10,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative">
                  <div className="mb-8 flex flex-col items-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500">
                      <Leaf className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-gray-800">
                      Verification Code
                    </h2>
                    <p className="text-center text-gray-600">
                      We&apos;ve sent a verification code to your email. Please
                      enter it below.
                    </p>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-center space-x-4">
                      {otp.map((digit, index) => (
                        <motion.div
                          key={index}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
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
                            className="h-16 w-16 rounded-2xl border-2 border-emerald-100 bg-white text-center text-2xl font-bold text-gray-800 shadow-sm outline-none transition-all duration-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                            autoFocus={index === 0}
                          />
                        </motion.div>
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
                    <Timer className="mr-2 h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-gray-600">
                      {timeLeft > 0
                        ? `Code expires in ${formatTime(timeLeft)}`
                        : "Code expired"}
                    </span>
                  </div>

                  <motion.button
                    type="button"
                    className="mb-4 flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 py-4 font-medium text-white shadow-md"
                    onClick={handleVerify}
                    disabled={isVerifying || otp.some((digit) => !digit)}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
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

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={timeLeft > 0 || isResending}
                      className={`flex items-center justify-center text-sm ${
                        timeLeft > 0
                          ? "text-gray-400"
                          : "text-emerald-600 hover:text-emerald-700"
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
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-3xl bg-white/80 shadow-xl backdrop-blur-sm"
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
                  className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500"
                >
                  <CheckCircle2 className="h-12 w-12 text-white" />
                </motion.div>

                <h2 className="mb-2 text-2xl font-bold text-gray-800">
                  Verification Successful
                </h2>
                <p className="mb-8 text-gray-600">
                  Your identity has been verified successfully
                </p>

                <Link href="#">
                  <motion.button
                    className="inline-flex items-center rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 px-8 py-4 font-medium text-white shadow-md"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NatureOTPVerification;
