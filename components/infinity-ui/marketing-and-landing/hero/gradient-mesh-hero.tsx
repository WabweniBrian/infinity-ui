"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const GradientMeshHero = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black py-20 md:py-32">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-[10%] -top-[40%] h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[120px]" />
        <div className="absolute -bottom-[20%] right-[20%] h-[600px] w-[600px] rounded-full bg-indigo-500/20 blur-[120px]" />
        <div className="absolute left-[30%] top-[20%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[150px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff22 1px, transparent 1px), linear-gradient(to right, #ffffff22 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-2 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-teal-400"></span>
              Introducing Infinity UI
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Design without{" "}
              <span className="relative inline-block">
                <span className="relative z-10">boundaries</span>
                <span className="absolute bottom-2 left-0 z-0 h-3 w-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-50"></span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 max-w-lg text-lg text-gray-300"
            >
              A collection of modern, responsive UI components designed for the next generation of web applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <button className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10">
                View Components
              </button>
            </motion.div>
          </div>

          {/* Right Content - 3D Elements */}
          <div className="relative h-[400px] md:h-[500px]">
            {/* Floating Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative h-full w-full"
            >
              {/* Main circle */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-90 blur-[60px]"
              />

              {/* Floating card 1 */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 8,
                  ease: "easeInOut",
                }}
                className="absolute left-[10%] top-[20%] h-40 w-56 rounded-2xl bg-white/10 p-4 shadow-lg backdrop-blur-md"
              >
                <div className="mb-2 h-2 w-10 rounded-full bg-white/50"></div>
                <div className="mb-4 h-3 w-3/4 rounded-full bg-white/30"></div>
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-500/50"></div>
                  <div className="h-8 w-20 rounded-full bg-white/20"></div>
                </div>
              </motion.div>

              {/* Floating card 2 */}
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, -15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 10,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[15%] right-[5%] h-48 w-64 rounded-2xl bg-white/10 p-4 shadow-lg backdrop-blur-md"
              >
                <div className="mb-3 h-3 w-1/2 rounded-full bg-white/40"></div>
                <div className="mb-6 grid grid-cols-2 gap-2">
                  <div className="h-16 rounded-lg bg-indigo-500/30"></div>
                  <div className="h-16 rounded-lg bg-purple-500/30"></div>
                  <div className="h-16 rounded-lg bg-blue-500/30"></div>
                  <div className="h-16 rounded-lg bg-teal-500/30"></div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 7,
                  ease: "easeInOut",
                }}
                className="absolute right-[20%] top-[10%] h-12 w-12 rounded-full border border-white/20 bg-gradient-to-r from-blue-500 to-teal-500 shadow-lg"
              />

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, 20, 0],
                  rotate: [0, -15, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 9,
                  ease: "easeInOut",
                }}
                className="absolute bottom-[30%] left-[15%] h-16 w-16 rounded-lg border border-white/20 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GradientMeshHero

