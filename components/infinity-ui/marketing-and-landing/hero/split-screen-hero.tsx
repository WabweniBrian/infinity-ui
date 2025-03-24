"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { useState } from "react"

const SplitScreenHero = () => {
  const [activeTab, setActiveTab] = useState(0)

  // Tab data
  const tabs = [
    {
      title: "For Designers",
      description: "Beautiful components that follow modern design principles",
      features: ["Customizable themes", "Responsive layouts", "Design tokens", "Figma library"],
    },
    {
      title: "For Developers",
      description: "Clean, maintainable code that's easy to implement",
      features: ["Copy & paste ready", "TypeScript support", "Accessibility built-in", "Zero dependencies"],
    },
    {
      title: "For Teams",
      description: "Streamline collaboration between design and development",
      features: ["Shared language", "Consistent patterns", "Versioned components", "Documentation"],
    },
  ]

  // SVG animation variants
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          type: "spring",
          duration: 1.5,
          bounce: 0,
          delay: 0.2 + i * 0.1,
        },
        opacity: { duration: 0.2 },
      },
    }),
  }

  // Circle animation variants
  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        bounce: 0.4,
        delay: 0.5 + i * 0.1,
      },
    }),
  }

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2">
          {/* Left Content - Text and Tabs */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600"
            >
              Introducing Infinity UI
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            >
              Design system for the{" "}
              <span className="relative inline-block">
                modern web
                <motion.div
                  className="absolute -bottom-1 left-0 h-3 w-full bg-indigo-100"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 max-w-lg text-lg text-gray-600"
            >
              A comprehensive collection of UI components designed to help you build beautiful interfaces faster than
              ever before.
            </motion.p>

            {/* Tabs */}
            <div className="mb-8">
              <div className="mb-6 flex space-x-1 rounded-full bg-gray-100 p-1">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`relative flex-1 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      activeTab === index ? "text-white" : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {activeTab === index && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 rounded-full bg-indigo-600"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{tab.title}</span>
                  </button>
                ))}
              </div>

              <div className="relative min-h-[200px]">
                {tabs.map((tab, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: activeTab === index ? 1 : 0,
                      x: activeTab === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 ${activeTab === index ? "pointer-events-auto" : "pointer-events-none"}`}
                  >
                    <p className="mb-4 text-gray-600">{tab.description}</p>
                    <ul className="space-y-2">
                      {tab.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: activeTab === index ? 1 : 0,
                            x: activeTab === index ? 0 : -10,
                          }}
                          transition={{ duration: 0.3, delay: 0.1 + i * 0.1 }}
                          className="flex items-center gap-2 text-gray-700"
                        >
                          <Check className="h-4 w-4 text-indigo-500" />
                          {feature}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="group flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-700">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="rounded-full border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50">
                View Documentation
              </button>
            </motion.div>
          </div>

          {/* Right Content - Animated SVG Illustration */}
          <div className="relative flex items-center justify-center bg-indigo-50 p-8 md:p-12 lg:p-16">
            <div className="relative h-full w-full max-w-md">
              {/* Animated SVG Illustration */}
              <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                {/* Grid Background */}
                <motion.path
                  d="M50 50H350M50 100H350M50 150H350M50 200H350M50 250H350M50 300H350M50 350H350M50 50V350M100 50V350M150 50V350M200 50V350M250 50V350M300 50V350M350 50V350"
                  stroke="#E0E7FF"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Decorative Circles */}
                {[
                  { cx: 100, cy: 100, r: 8, fill: "#818CF8" },
                  { cx: 300, cy: 150, r: 6, fill: "#6366F1" },
                  { cx: 150, cy: 300, r: 10, fill: "#4F46E5" },
                  { cx: 250, cy: 250, r: 7, fill: "#4338CA" },
                  { cx: 200, cy: 100, r: 5, fill: "#3730A3" },
                ].map((circle, i) => (
                  <motion.circle
                    key={i}
                    cx={circle.cx}
                    cy={circle.cy}
                    r={circle.r}
                    fill={circle.fill}
                    variants={circleVariants}
                    initial="hidden"
                    animate="visible"
                    custom={i}
                  />
                ))}

                {/* Main UI Component Outlines */}
                <motion.rect
                  x="100"
                  y="150"
                  width="200"
                  height="120"
                  rx="8"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  fill="white"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={0}
                />

                <motion.rect
                  x="120"
                  y="170"
                  width="160"
                  height="16"
                  rx="4"
                  fill="#EEF2FF"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                />

                <motion.rect
                  x="120"
                  y="196"
                  width="120"
                  height="8"
                  rx="4"
                  fill="#C7D2FE"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                />

                <motion.rect
                  x="120"
                  y="214"
                  width="80"
                  height="8"
                  rx="4"
                  fill="#C7D2FE"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                />

                <motion.rect
                  x="120"
                  y="240"
                  width="60"
                  height="16"
                  rx="8"
                  fill="#4F46E5"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={4}
                />

                {/* Connection Lines */}
                <motion.path
                  d="M200 120V150"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={5}
                />

                <motion.path
                  d="M300 200H330C335.523 200 340 195.523 340 190V100"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={6}
                />

                <motion.path
                  d="M200 270V300"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                  custom={7}
                />

                {/* Animated Pulse Circle */}
                <motion.circle
                  cx="200"
                  cy="200"
                  r="80"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  fill="transparent"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [0.8, 1.1, 0.8],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    ease: "easeInOut",
                  }}
                />
              </svg>

              {/* Floating Labels */}
              <motion.div
                className="absolute left-[25%] top-[15%] rounded-lg bg-white px-3 py-1 text-xs font-medium text-indigo-600 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                Components
              </motion.div>

              <motion.div
                className="absolute right-[15%] top-[40%] rounded-lg bg-white px-3 py-1 text-xs font-medium text-indigo-600 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                Responsive
              </motion.div>

              <motion.div
                className="absolute bottom-[25%] left-[30%] rounded-lg bg-white px-3 py-1 text-xs font-medium text-indigo-600 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                Accessible
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SplitScreenHero

