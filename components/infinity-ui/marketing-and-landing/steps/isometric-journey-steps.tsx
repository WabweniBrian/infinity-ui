"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { MapPin, Compass, Flag, Trophy, Mountain } from "lucide-react"

type Step = {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  color: string
  position: { x: number; y: number }
  tileType: "start" | "forest" | "mountain" | "castle" | "treasure"
}

const steps: Step[] = [
  {
    id: 1,
    title: "Expedition Start",
    description:
      "We begin by mapping your business landscape, identifying challenges and opportunities to establish clear objectives.",
    icon: <Flag className="h-6 w-6" />,
    color: "emerald",
    position: { x: 1, y: 4 },
    tileType: "start",
  },
  {
    id: 2,
    title: "Forest of Ideas",
    description:
      "Our team explores creative solutions, brainstorming innovative approaches tailored to your unique business needs.",
    icon: <Compass className="h-6 w-6" />,
    color: "green",
    position: { x: 3, y: 3 },
    tileType: "forest",
  },
  {
    id: 3,
    title: "Strategy Summit",
    description:
      "We develop a comprehensive roadmap, outlining the technical architecture and implementation plan for your project.",
    icon: <Mountain className="h-6 w-6" />,
    color: "blue",
    position: { x: 5, y: 2 },
    tileType: "mountain",
  },
  {
    id: 4,
    title: "Implementation Castle",
    description:
      "Our developers build your solution using cutting-edge technologies, with regular checkpoints to ensure alignment with your vision.",
    icon: <MapPin className="h-6 w-6" />,
    color: "purple",
    position: { x: 7, y: 3 },
    tileType: "castle",
  },
  {
    id: 5,
    title: "Success Treasure",
    description:
      "We launch your solution and implement strategies for continuous improvement, ensuring long-term success and growth.",
    icon: <Trophy className="h-6 w-6" />,
    color: "amber",
    position: { x: 9, y: 4 },
    tileType: "treasure",
  },
]

const IsometricJourneySteps = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [characterPosition, setCharacterPosition] = useState({ x: 1, y: 4 })
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })

  const handleStepClick = (id: number) => {
    const step = steps.find((s) => s.id === id)
    if (step) {
      setActiveStep(id)
      // Animate character movement
      setCharacterPosition(step.position)
    }
  }

  // Helper to convert grid coordinates to isometric position
  const toIso = (x: number, y: number) => {
    // Isometric transformation
    const isoX = (x - y) * 30
    const isoY = (x + y) * 15
    return { x: isoX, y: isoY }
  }

  // Generate grid tiles
  const renderGrid = () => {
    const gridSize = 10
    const tiles = []

    // Create base grid
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const { x: isoX, y: isoY } = toIso(x, y)

        // Check if this position has a step
        const stepAtPosition = steps.find((s) => s.position.x === x && s.position.y === y)
        const isStepTile = Boolean(stepAtPosition)
        const isActiveTile = stepAtPosition?.id === activeStep

        // Determine tile type and style
        let tileColor = "bg-gray-200"
        let tileElement = null

        if (isStepTile && stepAtPosition) {
          const { tileType, color } = stepAtPosition

          switch (tileType) {
            case "start":
              tileColor = "bg-emerald-200"
              tileElement = (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-4 h-8 bg-emerald-500 rounded-t-full" />
                </div>
              )
              break
            case "forest":
              tileColor = "bg-green-200"
              tileElement = (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-green-600" />
                </div>
              )
              break
            case "mountain":
              tileColor = "bg-blue-200"
              tileElement = (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-10 border-r-10 border-b-16 border-l-transparent border-r-transparent border-b-blue-600" />
                </div>
              )
              break
            case "castle":
              tileColor = "bg-purple-200"
              tileElement = (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-12 h-10 bg-purple-500 rounded-t-lg relative">
                    <div className="absolute top-0 left-0 right-0 h-3 flex">
                      <div className="w-2 h-3 bg-purple-700 mx-0.5" />
                      <div className="w-2 h-3 bg-purple-700 mx-0.5" />
                      <div className="w-2 h-3 bg-purple-700 mx-0.5" />
                    </div>
                  </div>
                </div>
              )
              break
            case "treasure":
              tileColor = "bg-amber-200"
              tileElement = (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-8 h-6 bg-amber-600 rounded-t-lg relative">
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full" />
                  </div>
                </div>
              )
              break
          }
        }

        // Path tiles
        const isPathTile = steps.some((step, idx, arr) => {
          if (idx === arr.length - 1) return false

          const current = step.position
          const next = arr[idx + 1].position

          // Check if this tile is on the path between two steps
          // Simple linear interpolation
          const dx = next.x - current.x
          const dy = next.y - current.y
          const steps = Math.max(Math.abs(dx), Math.abs(dy))

          for (let i = 0; i <= steps; i++) {
            const ratio = steps === 0 ? 0 : i / steps
            const pathX = Math.round(current.x + dx * ratio)
            const pathY = Math.round(current.y + dy * ratio)

            if (pathX === x && pathY === y && !isStepTile) {
              return true
            }
          }

          return false
        })

        if (isPathTile) {
          tileColor = "bg-amber-100"
        }

        // Character position
        const hasCharacter = characterPosition.x === x && characterPosition.y === y

        tiles.push(
          <div
            key={`${x}-${y}`}
            className={`absolute w-16 h-8 ${tileColor} ${
              isStepTile ? "cursor-pointer hover:brightness-110" : ""
            } ${isActiveTile ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
            style={{
              left: `calc(50% + ${isoX}px)`,
              top: `${isoY}px`,
              transform: "rotateX(60deg) rotateZ(45deg)",
              transformStyle: "preserve-3d",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => isStepTile && stepAtPosition && handleStepClick(stepAtPosition.id)}
          >
            {tileElement}

            {/* Character */}
            {hasCharacter && (
              <motion.div
                className="absolute top-1/2 left-1/2 w-6 h-6 bg-red-500 rounded-full z-10"
                style={{
                  transform: "translate(-50%, -50%) rotateX(-60deg) rotateZ(-45deg)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [0, -10, 0] }}
                transition={{
                  scale: { duration: 0.3 },
                  y: { duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
                }}
              />
            )}
          </div>,
        )
      }
    }

    return tiles
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
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-emerald-50 to-green-50 translate-y-1/3 -translate-x-1/4"
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Adventure Journey</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Navigate through our isometric project landscape to reach your business goals
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Isometric map */}
          <motion.div
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="aspect-square relative max-w-xl mx-auto perspective-1000">
              {/* Isometric grid container */}
              <div className="relative w-full h-full transform-style-3d">
                {/* Render grid tiles */}
                <div className="absolute inset-0 transform-style-3d" style={{ perspective: "1000px" }}>
                  {renderGrid()}
                </div>
              </div>
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
                              step.color === "emerald"
                                ? "bg-emerald-500"
                                : step.color === "green"
                                  ? "bg-green-500"
                                  : step.color === "blue"
                                    ? "bg-blue-500"
                                    : step.color === "purple"
                                      ? "bg-purple-500"
                                      : "bg-amber-500"
                            }`}
                          />

                          <div className="flex items-center mb-6">
                            <div
                              className={`p-4 rounded-lg mr-4 ${
                                step.color === "emerald"
                                  ? "bg-emerald-100 text-emerald-600"
                                  : step.color === "green"
                                    ? "bg-green-100 text-green-600"
                                    : step.color === "blue"
                                      ? "bg-blue-100 text-blue-600"
                                      : step.color === "purple"
                                        ? "bg-purple-100 text-purple-600"
                                        : "bg-amber-100 text-amber-600"
                              }`}
                            >
                              {step.icon}
                            </div>
                            <div>
                              <span
                                className={`inline-block text-sm font-semibold rounded-full px-3 py-1 mb-1 ${
                                  step.color === "emerald"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : step.color === "green"
                                      ? "bg-green-100 text-green-700"
                                      : step.color === "blue"
                                        ? "bg-blue-100 text-blue-700"
                                        : step.color === "purple"
                                          ? "bg-purple-100 text-purple-700"
                                          : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                Location {step.id}
                              </span>
                              <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-6 text-lg">{step.description}</p>

                          <div className="flex flex-wrap gap-4">
                            <button
                              onClick={() => handleStepClick(step.id === 1 ? steps.length : step.id - 1)}
                              className="px-5 py-2 border border-gray-200 rounded-lg text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors"
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
                                step.color === "emerald"
                                  ? "bg-emerald-500 hover:bg-emerald-600"
                                  : step.color === "green"
                                    ? "bg-green-500 hover:bg-green-600"
                                    : step.color === "blue"
                                      ? "bg-blue-500 hover:bg-blue-600"
                                      : step.color === "purple"
                                        ? "bg-purple-500 hover:bg-purple-600"
                                        : "bg-amber-500 hover:bg-amber-600"
                              }`}
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

export default IsometricJourneySteps

