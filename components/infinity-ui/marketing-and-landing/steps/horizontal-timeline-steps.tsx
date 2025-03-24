"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { CheckCircle, ArrowRight } from "lucide-react"

type Step = {
  id: number
  title: string
  description: string
}

const steps: Step[] = [
  {
    id: 1,
    title: "Research & Discovery",
    description:
      "We analyze your business needs, target audience, and competitive landscape to establish project goals and strategy.",
  },
  {
    id: 2,
    title: "Planning & Strategy",
    description:
      "Our team creates a detailed roadmap including timelines, deliverables, and technical specifications aligned with your vision.",
  },
  {
    id: 3,
    title: "Design & Prototyping",
    description:
      "We develop visual concepts and interactive prototypes that bring your ideas to life with user-centered design principles.",
  },
  {
    id: 4,
    title: "Development & Testing",
    description:
      "Our developers build your solution with clean code while ensuring functionality, performance, and compatibility.",
  },
  {
    id: 5,
    title: "Launch & Support",
    description:
      "We deploy your project and provide ongoing maintenance, updates, and technical support to ensure continued success.",
  },
]

const HorizontalTimelineSteps = () => {
  const [activeStep, setActiveStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })

  // Auto-progress through steps
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => {
          if (prev >= steps.length) {
            return 1
          }
          return prev + 1
        })
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [isInView])

  // Update progress bar when active step changes
  useEffect(() => {
    setProgress(((activeStep - 1) / (steps.length - 1)) * 100)
  }, [activeStep])

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId)
  }

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-sky-50 to-indigo-50 -translate-y-1/2 translate-x-1/3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-50 to-red-50 translate-y-1/3 -translate-x-1/4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.6 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Our Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            We follow a proven step-by-step methodology to deliver exceptional results
          </p>
        </motion.div>

        {/* Timeline steps on larger screens */}
        <motion.div
          className="hidden md:block mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Progress bar background */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200 rounded-full" />

          {/* Animated progress overlay */}
          <motion.div
            className="absolute top-12 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          {/* Step markers */}
          <div className="relative flex justify-between">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + step.id * 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <button
                  onClick={() => handleStepClick(step.id)}
                  className="relative flex flex-col items-center"
                  aria-current={activeStep === step.id ? "step" : undefined}
                >
                  <div
                    className={`relative z-10 flex items-center justify-center w-10 h-10 mb-2 rounded-full ${
                      step.id <= activeStep
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white"
                        : "bg-white border-2 border-gray-300 text-gray-400"
                    } transition-colors duration-300`}
                  >
                    {step.id < activeStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-semibold">{step.id}</span>
                    )}
                  </div>

                  {/* Step title */}
                  <span
                    className={`absolute top-14 text-sm font-medium text-center w-32 -ml-16 ${
                      step.id === activeStep ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Active step details */}
        <div className="relative mt-24">
          <AnimatePresence mode="wait">
            {steps.map((step) => {
              if (step.id !== activeStep) return null

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row items-center gap-8 md:gap-16 py-8"
                >
                  <motion.div
                    className="w-full md:w-1/3 relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="aspect-square relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 blur-2xl opacity-20" />
                      <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90" />
                        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] bg-no-repeat bg-center bg-cover mix-blend-overlay opacity-10" />

                        <div className="absolute inset-0 flex items-center justify-center text-white">
                          <div className="text-center p-8">
                            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                              <span className="text-5xl font-bold">{step.id}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="w-full md:w-2/3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:hidden">{step.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>

                    <div className="flex space-x-4">
                      <button
                        onClick={() => handleStepClick(step.id - 1 > 0 ? step.id - 1 : steps.length)}
                        className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={step.id === 1}
                      >
                        <ArrowRight className="w-4 h-4 rotate-180" />
                        <span>Previous</span>
                      </button>

                      <button
                        onClick={() => handleStepClick(step.id + 1 <= steps.length ? step.id + 1 : 1)}
                        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white flex items-center gap-2 hover:from-blue-600 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={step.id === steps.length}
                      >
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          {/* Mobile stepper */}
          <div className="md:hidden flex justify-center mt-8">
            <div className="flex space-x-2">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => handleStepClick(step.id)}
                  className={`w-3 h-3 rounded-full ${
                    step.id === activeStep ? "bg-blue-500" : step.id < activeStep ? "bg-blue-300" : "bg-gray-300"
                  }`}
                  aria-label={`Go to step ${step.id}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HorizontalTimelineSteps

