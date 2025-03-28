"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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

const FloatingElementsAuth = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Reset success state after 2 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };

  // Floating elements animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Create floating elements
    const elements: {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      opacity: number;
      shape: "circle" | "square" | "triangle";
    }[] = [];

    const colors = ["#f472b6", "#ec4899", "#db2777", "#be185d", "#9d174d"];

    for (let i = 0; i < 30; i++) {
      const size = Math.random() * 40 + 10;
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        shape: ["circle", "square", "triangle"][
          Math.floor(Math.random() * 3)
        ] as "circle" | "square" | "triangle",
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      elements.forEach((element) => {
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = element.color;

        // Draw different shapes
        if (element.shape === "circle") {
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (element.shape === "square") {
          ctx.fillRect(
            element.x - element.size / 2,
            element.y - element.size / 2,
            element.size,
            element.size,
          );
        } else if (element.shape === "triangle") {
          ctx.beginPath();
          ctx.moveTo(element.x, element.y - element.size / 2);
          ctx.lineTo(
            element.x + element.size / 2,
            element.y + element.size / 2,
          );
          ctx.lineTo(
            element.x - element.size / 2,
            element.y + element.size / 2,
          );
          ctx.closePath();
          ctx.fill();
        }

        // Update position
        element.x += element.speedX;
        element.y += element.speedY;

        // Bounce off edges
        if (element.x < 0 || element.x > canvas.width) {
          element.speedX *= -1;
        }

        if (element.y < 0 || element.y > canvas.height) {
          element.speedY *= -1;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-rose-100 to-pink-100 p-4">
      {/* Floating elements canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl backdrop-blur-lg"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-r from-pink-500 to-rose-500 p-8 text-white">
            {/* Decorative elements */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white opacity-10"></div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {authMode === "signin" && (
                  <motion.div
                    key="signin-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="mt-1 text-pink-100">
                      Sign in to continue to your account
                    </p>
                  </motion.div>
                )}

                {authMode === "signup" && (
                  <motion.div
                    key="signup-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="text-2xl font-bold">Create account</h1>
                    <p className="mt-1 text-pink-100">
                      Sign up to get started with our platform
                    </p>
                  </motion.div>
                )}

                {authMode === "forgot" && (
                  <motion.div
                    key="forgot-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h1 className="text-2xl font-bold">Reset password</h1>
                    <p className="mt-1 text-pink-100">
                      We&apos;ll send you instructions to reset your password
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
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
                        className="w-full rounded-lg border border-gray-300 bg-white/50 py-3 pl-10 pr-4 outline-none backdrop-blur-sm transition-colors focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
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
                        className="text-xs font-medium text-pink-600 hover:text-pink-700"
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
                        className="w-full rounded-lg border border-gray-300 bg-white/50 py-3 pl-10 pr-10 outline-none backdrop-blur-sm transition-colors focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
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
                      className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
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
                    className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-medium text-white transition-all hover:shadow-lg"
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
                      <span className="bg-white/70 px-2 text-gray-500 backdrop-blur-sm">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <motion.button
                      type="button"
                      className="flex items-center justify-center rounded-lg border border-gray-300 bg-white/50 py-2.5 backdrop-blur-sm transition-colors hover:bg-white/80"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      type="button"
                      className="flex items-center justify-center rounded-lg border border-gray-300 bg-white/50 py-2.5 backdrop-blur-sm transition-colors hover:bg-white/80"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                    </motion.button>
                    <motion.button
                      type="button"
                      className="flex items-center justify-center rounded-lg border border-gray-300 bg-white/50 py-2.5 backdrop-blur-sm transition-colors hover:bg-white/80"
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
                      className="font-medium text-pink-600 hover:text-pink-700"
                    >
                      Sign up
                    </button>
                  </p>
                </motion.form>
              )}

              {/* Sign Up Form */}
              {authMode === "signup" && (
                <motion.form
                  key="signup-form"
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
                        className="w-full rounded-lg border border-gray-300 bg-white/50 py-3 pl-10 pr-4 outline-none backdrop-blur-sm transition-colors focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>

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
                        className="w-full rounded-lg border border-gray-300 bg-white/50 py-3 pl-10 pr-4 outline-none backdrop-blur-sm transition-colors focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
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
                        className="w-full rounded-lg border border-gray-300 bg-white/50 py-3 pl-10 pr-10 outline-none backdrop-blur-sm transition-colors focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
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
                      className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      I agree to the{" "}
                      <a href="#" className="text-pink-600 hover:text-pink-700">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-pink-600 hover:text-pink-700">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-medium text-white transition-all hover:shadow-lg"
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
                        Create account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </motion.button>

                  <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("signin")}
                      className="font-medium text-pink-600 hover:text-pink-700"
                    >
                      Sign in
                    </button>
                  </p>
                </motion.form>
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
                        className="w-full rounded-lg border border-gray-300 bg-white/50 py-3 pl-10 pr-4 outline-none backdrop-blur-sm transition-colors focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      We&apos;ll send a password reset link to this email
                      address
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    className="relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 py-3 font-medium text-white transition-all hover:shadow-lg"
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
                          Email sent
                          <Check className="ml-2 h-4 w-4" />
                        </span>
                      </>
                    ) : (
                      <>
                        Send reset link
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </motion.button>

                  <p className="mt-4 text-center text-sm text-gray-600">
                    <button
                      type="button"
                      onClick={() => setAuthMode("signin")}
                      className="font-medium text-pink-600 hover:text-pink-700"
                    >
                      Back to sign in
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FloatingElementsAuth;
