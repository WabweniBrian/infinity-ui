"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 pb-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="bg-grid-white/[0.02] absolute inset-0 bg-[length:50px_50px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Text content */}
          <motion.div
            className="text-center lg:w-1/2 lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 inline-block rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1 text-blue-400 backdrop-blur-sm"
            >
              Introducing Infinity UI
            </motion.div>

            <motion.h1
              className="mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Modern UI Components for the Infinite Web
            </motion.h1>

            <motion.p
              className="mx-auto mb-8 max-w-xl text-lg text-slate-300 lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              A collection of beautifully designed, responsive components that
              you can copy and paste into your apps. Accessible. Customizable.
              Open Source.
            </motion.p>

            <motion.div
              className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.button
                className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>

              <motion.button
                className="rounded-lg border border-slate-700 bg-slate-800 px-8 py-3 font-medium text-white transition-colors hover:bg-slate-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                View Components
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Visual element */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Glowing effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-30 blur-xl" />

              {/* Card */}
              <motion.div
                className="relative rounded-2xl border border-slate-700/50 bg-slate-800/80 p-6 shadow-xl backdrop-blur-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-400" />
                    <div className="h-3 w-3 rounded-full bg-yellow-400" />
                    <div className="h-3 w-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs text-slate-400">
                    components/Button.tsx
                  </div>
                </div>

                <pre className="overflow-x-auto text-sm text-slate-300">
                  <code>{`import { motion } from 'framer-motion'

export const Button = ({ 
  children,
  variant = 'primary'
}) => {
  return (
    <motion.button
      className="px-4 py-2 rounded-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}`}</code>
                </pre>

                <div className="mt-6 flex justify-center">
                  <motion.div
                    className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Button Component
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                className="absolute -right-8 -top-8 h-16 w-16 rounded-xl border border-purple-500/30 bg-purple-500/20 backdrop-blur-md"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -bottom-10 -left-10 h-20 w-20 rounded-xl border border-blue-500/30 bg-blue-500/20 backdrop-blur-md"
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 transform"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm text-slate-400">Scroll to explore</span>
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-slate-400 pt-2">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-slate-400"
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
