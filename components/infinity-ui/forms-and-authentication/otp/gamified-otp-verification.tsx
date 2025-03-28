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
  Clock,
  GamepadIcon,
  RefreshCw,
  Trophy,
} from "lucide-react";

const GamifiedOTPVerification = () => {
  const [otp, setOtp] = useState<string[]>(Array(5).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(90);
  const [isResending, setIsResending] = useState(false);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Update score when fields are filled
  useEffect(() => {
    let newScore = 0;
    otp.forEach((digit) => {
      if (digit) newScore += 20;
    });
    setScore(newScore);
  }, [otp]);

  // Handle input change
  const handleChange = (index: number, value: string) => {
    // Clear any previous errors
    setError("");

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if value is entered
    if (value && index < 4) {
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
    if (e.key === "ArrowRight" && index < 4) {
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
    const pastedOtp = pastedData.split("").slice(0, 5);
    const newOtp = [...otp];

    pastedOtp.forEach((digit, index) => {
      if (index < 5) newOtp[index] = digit;
    });

    setOtp(newOtp);

    // Focus the next empty field or the last field
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[4]?.focus();
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

      // For demo purposes, let's say "12345" is the correct OTP
      if (otp.join("") === "12345") {
        setIsVerified(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
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
      setTimeLeft(90);
      setOtp(Array(5).fill(""));
      setError("");
      inputRefs.current[0]?.focus();
    }, 1000);
  };

  // Confetti component
  const Confetti = () => {
    return (
      <div className="pointer-events-none fixed inset-0 z-50">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              top: "-10%",
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
              borderRadius: "50%",
            }}
            animate={{
              top: "100%",
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              ease: "easeOut",
              delay: Math.random() * 0.5,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      {showConfetti && <Confetti />}

      {/* Game UI Header */}
      <motion.div
        className="z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-t-2xl border border-white/10 bg-gray-900/50 p-4 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <GamepadIcon className="mr-2 h-6 w-6 text-purple-400" />
              <span className="font-bold text-white">GameQuest</span>
            </div>
            <div className="flex items-center rounded-full bg-purple-900/50 px-3 py-1">
              <Trophy className="mr-1 h-4 w-4 text-yellow-400" />
              <motion.span
                className="text-sm font-medium text-white"
                key={score}
                initial={{ scale: 1.5, color: "#FBBF24" }}
                animate={{ scale: 1, color: "#FFFFFF" }}
                transition={{ duration: 0.5 }}
              >
                {score} XP
              </motion.span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <motion.div
          className="overflow-hidden rounded-b-2xl border border-t-0 border-white/10 bg-gray-900/80 shadow-xl backdrop-blur-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1,
          }}
        >
          <AnimatePresence mode="wait">
            {!isVerified ? (
              <motion.div
                key="verification"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-8"
              >
                <h1 className="mb-2 text-center text-2xl font-bold text-white">
                  Enter Verification Code
                </h1>
                <p className="mb-6 text-center text-purple-300">
                  Complete the quest by entering the magic code
                </p>

                {/* Progress Bar */}
                <div className="mb-8 h-3 w-full overflow-hidden rounded-full bg-gray-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: "0%" }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="mb-6">
                  <div className="flex justify-center space-x-3">
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
                          className="h-14 w-14 rounded-xl border border-purple-500/30 bg-gray-800/50 text-center text-xl font-bold text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
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
                  <Clock className="mr-2 h-4 w-4 text-purple-400" />
                  <span className="text-sm text-purple-300">
                    {timeLeft > 0
                      ? `Quest expires in ${timeLeft} seconds`
                      : "Quest expired"}
                  </span>
                </div>

                <motion.button
                  type="button"
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 font-medium text-white"
                  onClick={handleVerify}
                  disabled={isVerifying || otp.some((digit) => !digit)}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
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
                      Complete Quest
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </motion.button>

                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={timeLeft > 0 || isResending}
                    className={`flex items-center justify-center text-sm ${
                      timeLeft > 0
                        ? "text-gray-500"
                        : "text-purple-400 hover:text-purple-300"
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
                        Casting new spell...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Cast new spell
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
                className="p-8 text-center"
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
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  <Trophy className="h-10 w-10 text-white" />
                </motion.div>

                <h2 className="mb-2 text-2xl font-bold text-white">
                  Quest Completed!
                </h2>
                <p className="mb-8 text-purple-300">
                  You&apos;ve successfully verified your identity and earned 100
                  XP!
                </p>

                <Link href="#">
                  <motion.button
                    className="inline-flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium text-white"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Adventure
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Achievements */}
        <div className="mt-8 rounded-xl border border-white/10 bg-gray-900/50 p-4 backdrop-blur-lg">
          <h3 className="mb-3 flex items-center text-sm font-medium text-white">
            <Trophy className="mr-2 h-4 w-4 text-yellow-400" />
            Verification Progress
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {otp.map((digit, index) => (
              <motion.div
                key={index}
                className={`rounded-lg p-2 ${digit ? "border border-purple-500/30 bg-purple-900/50" : "border border-gray-700/30 bg-gray-800/50"}`}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <span
                    className={`text-xs ${digit ? "text-purple-300" : "text-gray-500"}`}
                  >
                    {index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GamifiedOTPVerification;
