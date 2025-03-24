"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Map, Flag, Trophy, Compass, Star } from "lucide-react"

type Step = {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
  position: { x: number; y: number }
}

const steps: Step[] = [
  {
    id: 1,
    title: "Start Journey",
    description:
      "We begin by understanding your business goals, target audience, and project requirements to establish a clear direction.",
    icon: <Flag className="h-6 w-6" />,
    color: "green",
    position: { x: 10, y: 70 },
  },
  {
    id: 2,
    title: "Exploration",
    description:
      "Our team researches market trends, competitor analysis, and user behavior to identify opportunities for innovation.",
    icon: <Compass className="h-6 w-6" />,
    color: "blue",
    position: { x: 30, y: 30 },
  },
  {
    id: 3,
    title: "Milestone",
    description:
      "We develop prototypes and concepts based on research insights, allowing for early feedback and validation.",
    icon: <Star className="h-6 w-6" />,
    color: "purple",
    position: { x: 50, y: 60 },
  },
  {
    id: 4,
    title: "Challenge",
    description:
      "Our developers build your solution using cutting-edge technologies while overcoming technical challenges.",
    icon: <Map className="h-6 w-6" />,
    color: "orange",
    position: { x: 70, y: 20 },
  },
  {
    id: 5,
    title: "Victory",
    description: "We launch your product and implement strategies to ensure market success and continuous improvement.",
    icon: <Trophy className="h-6 w-6" />,
    color: "red",
    position: { x: 90, y: 50 },
  },
]

const GameMapSteps = () => {
  const [activeStep, setActiveStep] = useState(1)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })

  const handleStepClick = (id: number) => {
    setActiveStep(id)
  }

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-indigo-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-100 to-blue-50 -translate-y-1/3 translate-x-1/3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-50 to-teal-50 translate-y-1/3 -translate-x-1/4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Your Project Adventure</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Navigate through our proven process to achieve your business goals
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Game map */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="aspect-square relative max-w-xl mx-auto">
              {/* Map background with path */}
              <div className="absolute inset-0 rounded-xl overflow-hidden border-4 border-amber-800/20 shadow-xl">
                <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=600')] bg-no-repeat bg-center bg-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50" />

                {/* Path connecting points */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d={`M ${steps[0].position.x} ${steps[0].position.y} 
                        C ${steps[0].position.x + 10} ${steps[0].position.y - 20}, 
                          ${steps[1].position.x - 10} ${steps[1].position.y + 20}, 
                          ${steps[1].position.x} ${steps[1].position.y}
                        C ${steps[1].position.x + 10} ${steps[1].position.y - 10}, 
                          ${steps[2].position.x - 10} ${steps[2].position.y - 10}, 
                          ${steps[2].position.x} ${steps[2].position.y}
                        C ${steps[2].position.x + 10} ${steps[2].position.y - 20}, 
                          ${steps[3].position.x - 10} ${steps[3].position.y + 20}, 
                          ${steps[3].position.x} ${steps[3].position.y}
                        C ${steps[3].position.x + 10} ${steps[3].position.y - 10}, 
                          ${steps[4].position.x - 10} ${steps[4].position.y - 10}, 
                          ${steps[4].position.x} ${steps[4].position.y}`}
                    stroke="url(#gradient-path)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient-path" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#10B981" />
                      <stop offset="0.25" stopColor="#3B82F6" />
                      <stop offset="0.5" stopColor="#8B5CF6" />
                      <stop offset="0.75" stopColor="#F59E0B" />
                      <stop offset="1" stopColor="#EF4444" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Decorative elements */}
                <div className="absolute inset-0">
                  {/* Trees, mountains, clouds, etc. */}
                  <div className="absolute top-[15%] left-[15%] w-6 h-6 text-emerald-500 opacity-30">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L4 20h16L12 2z" />
                    </svg>
                  </div>
                  <div className="absolute top-[65%] left-[25%] w-8 h-8 text-emerald-600 opacity-30">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L4 20h16L12 2z" />
                    </svg>
                  </div>
                  <div className="absolute top-[25%] right-[20%] w-10 h-5 text-blue-300 opacity-30">
                    <svg viewBox="0 0 24 12" fill="currentColor">
                      <path d="M0 12 A 12 6 0 0 1 24 12 Z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-[30%] right-[30%] w-12 h-6 text-blue-300 opacity-30">
                    <svg viewBox="0 0 24 12" fill="currentColor">
                      <path d="M0 12 A 12 6 0 0 1 24 12 Z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step markers */}
              {steps.map((step, index) => {
                const isActive = step.id === activeStep
                const isCompleted = step.id < activeStep

                return (
                  <motion.div
                    key={step.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${step.position.x}%`,
                      top: `${step.position.y}%`,
                      zIndex: isActive ? 10 : 5,
                    }}
                    initial={{ scale: 0 }}
                    animate={
                      isInView
                        ? {
                            scale: 1,
                            transition: {
                              delay: 0.5 + index * 0.2,
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                            },
                          }
                        : { scale: 0 }
                    }
                  >
                    <button onClick={() => handleStepClick(step.id)} className="relative group" aria-pressed={isActive}>
                      {/* Pulse animation for active step */}
                      {isActive && (
                        <motion.div
                          className={`absolute inset-0 rounded-full ${
                            step.color === "green"
                              ? "bg-green-500"
                              : step.color === "blue"
                                ? "bg-blue-500"
                                : step.color === "purple"
                                  ? "bg-purple-500"
                                  : step.color === "orange"
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                          } opacity-30`}
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.1, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                          }}
                        />
                      )}

                      {/* Step marker */}
                      <div
                        className={`
                        relative flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full
                        transition-all duration-300 shadow-lg
                        ${isActive ? "scale-110 border-4 border-white" : "scale-100 border-2 border-white/70"}
                        ${
                          isCompleted
                            ? step.color === "green"
                              ? "bg-green-500"
                              : step.color === "blue"
                                ? "bg-blue-500"
                                : step.color === "purple"
                                  ? "bg-purple-500"
                                  : step.color === "orange"
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                            : step.color === "green"
                              ? "bg-green-400"
                              : step.color === "blue"
                                ? "bg-blue-400"
                                : step.color === "purple"
                                  ? "bg-purple-400"
                                  : step.color === "orange"
                                    ? "bg-orange-400"
                                    : "bg-red-400"
                        }
                      `}
                      >
                        <div className="text-white">{step.icon}</div>
                      </div>

                      {/* Step title tooltip */}
                      <div
                        className={`
                        absolute top-full left-1/2 -translate-x-1/2 mt-2
                        px-3 py-1 rounded-full bg-white shadow-md border border-gray-100
                        text-xs font-medium whitespace-nowrap
                        ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
                        transition-opacity duration-200
                      `}
                      >
                        {step.title}
                      </div>
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Step content */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              {steps.map((step) => {
                if (step.id !== activeStep) return null

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <div className="relative">
                      <div className="rounded-xl overflow-hidden">
                        <div className="relative bg-white rounded-xl p-8 border border-gray-100 shadow-md">
                          <div
                            className={`absolute top-0 left-0 w-full h-1 ${
                              step.color === "green"
                                ? "bg-green-500"
                                : step.color === "blue"
                                  ? "bg-blue-500"
                                  : step.color === "purple"
                                    ? "bg-purple-500"
                                    : step.color === "orange"
                                      ? "bg-orange-500"
                                      : "bg-red-500"
                            }`}
                          />

                          <div className="flex items-center mb-6">
                            <div
                              className={`p-3 rounded-full mr-4 ${
                                step.color === "green"
                                  ? "bg-green-100 text-green-500"
                                  : step.color === "blue"
                                    ? "bg-blue-100 text-blue-500"
                                    : step.color === "purple"
                                      ? "bg-purple-100 text-purple-500"
                                      : step.color === "orange"
                                        ? "bg-orange-100 text-orange-500"
                                        : "bg-red-100 text-red-500"
                              }`}
                            >
                              {step.icon}
                            </div>
                            <div>
                              <span
                                className={`inline-block text-xs font-semibold rounded-full px-2 py-0.5 mb-1 ${
                                  step.color === "green"
                                    ? "bg-green-100 text-green-700"
                                    : step.color === "blue"
                                      ? "bg-blue-100 text-blue-700"
                                      : step.color === "purple"
                                        ? "bg-purple-100 text-purple-700"
                                        : step.color === "orange"
                                          ? "bg-orange-100 text-orange-700"
                                          : "bg-red-100 text-red-700"
                                }`}
                              >
                                Step {step.id}
                              </span>
                              <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-6 text-lg">{step.description}</p>

                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleStepClick(step.id === 1 ? steps.length : step.id - 1)}
                              className="px-5 py-2 border border-gray-200 rounded-lg text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors"
                              disabled={step.id === 1}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="rotate-180"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                              <span>Previous</span>
                            </button>

                            <button
                              onClick={() => handleStepClick(step.id === steps.length ? 1 : step.id + 1)}
                              className={`px-5 py-2 rounded-lg text-white flex items-center gap-2 transition-colors ${
                                step.color === "green"
                                  ? "bg-green-500 hover:bg-green-600"
                                  : step.color === "blue"
                                    ? "bg-blue-500 hover:bg-blue-600"
                                    : step.color === "purple"
                                      ? "bg-purple-500 hover:bg-purple-600"
                                      : step.color === "orange"
                                        ? "bg-orange-500 hover:bg-orange-600"
                                        : "bg-red-500 hover:bg-red-600"
                              }`}
                              disabled={step.id === steps.length}
                            >
                              <span>Next</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GameMapSteps

