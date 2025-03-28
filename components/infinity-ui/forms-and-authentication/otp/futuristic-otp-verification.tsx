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
  Fingerprint,
  RefreshCw,
  Scan,
  ShieldCheck,
  Timer,
} from "lucide-react";

const FuturisticOTPVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
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
      setTimeLeft(120);
      setOtp(Array(6).fill(""));
      setError("");
      inputRefs.current[0]?.focus();
    }, 1000);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9IiMxYTFhMWEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-10"></div>
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-500 opacity-20 blur-3xl filter"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 15,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan-500 opacity-20 blur-3xl filter"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 18,
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
              className="overflow-hidden rounded-3xl border border-blue-500/20 bg-gray-900/80 shadow-lg shadow-blue-500/10 backdrop-blur-xl"
            >
              <div className="p-8">
                <div className="mb-8 flex flex-col items-center">
                  <motion.div
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/10"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.2)",
                        "0 0 0 10px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0)",
                      ],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                    }}
                  >
                    <Fingerprint className="h-10 w-10 text-blue-400" />
                  </motion.div>
                  <h2 className="mb-2 text-2xl font-bold text-white">
                    Identity Verification
                  </h2>
                  <p className="text-center text-blue-200">
                    Enter the 6-digit security code sent to your device
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex justify-center space-x-2">
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
                          className="h-14 w-12 rounded-xl border border-blue-500/30 bg-gray-800 text-center text-xl font-bold text-blue-400 outline-none transition-all duration-200 focus:border-blue-500 focus:bg-gray-800/80 focus:ring-2 focus:ring-blue-500/50"
                          autoFocus={index === 0}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {error && (
                    <motion.p
                      className="mt-3 text-center text-sm text-red-400"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <div className="mb-6 flex items-center justify-center">
                  <Timer className="mr-2 h-4 w-4 text-blue-400" />
                  <span className="text-sm text-blue-200">
                    {timeLeft > 0
                      ? `Code expires in ${formatTime(timeLeft)}`
                      : "Code expired"}
                  </span>
                </div>

                <motion.button
                  type="button"
                  className="mb-4 flex w-full items-center justify-center rounded-xl bg-blue-600 py-4 font-medium text-white"
                  onClick={handleVerify}
                  disabled={isVerifying || otp.some((digit) => !digit)}
                  whileHover={{ scale: 1.02, backgroundColor: "#2563eb" }}
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
                      Authenticate
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
                        ? "text-gray-500"
                        : "text-blue-400 hover:text-blue-300"
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
                        Generating new code...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Generate new code
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="border-t border-blue-500/20 bg-blue-900/20 p-4">
                <div className="flex items-center justify-center">
                  <ShieldCheck className="mr-2 h-4 w-4 text-blue-400" />
                  <p className="text-xs text-blue-200">
                    Secured with end-to-end encryption
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-3xl border border-blue-500/20 bg-gray-900/80 shadow-lg shadow-blue-500/10 backdrop-blur-xl"
            >
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delayscale: 1,
                  }}
                  className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600"
                >
                  <Scan className="h-12 w-12 text-white" />
                </motion.div>

                <h2 className="mb-2 text-2xl font-bold text-white">
                  Authentication Successful
                </h2>
                <p className="mb-8 text-blue-200">
                  Your identity has been verified successfully
                </p>

                <Link href="#">
                  <motion.button
                    className="inline-flex items-center rounded-xl bg-blue-600 px-8 py-4 font-medium text-white"
                    whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </Link>
              </div>

              <div className="border-t border-blue-500/20 bg-blue-900/20 p-4">
                <div className="flex items-center justify-center">
                  <ShieldCheck className="mr-2 h-4 w-4 text-blue-400" />
                  <p className="text-xs text-blue-200">
                    Secured with end-to-end encryption
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FuturisticOTPVerification;
