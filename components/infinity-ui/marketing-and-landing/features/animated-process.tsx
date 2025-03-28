"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Step = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Sign Up",
    description:
      "Create your account in seconds. No credit card required to get started with our free tier.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 2,
    title: "Configure",
    description:
      "Set up your workspace with our intuitive dashboard. Import your data or start from scratch.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 3,
    title: "Collaborate",
    description:
      "Invite your team members and start collaborating in real-time with powerful tools.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 4,
    title: "Launch",
    description:
      "Deploy your project with one click and scale seamlessly as your needs grow.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
];

const AnimatedProcess = () => {
  const [activeStep, setActiveStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-gray-900"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,theme(colors.purple.100/30%),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_bottom,theme(colors.purple.900/20%),transparent_70%)]"></div>

        {/* Decorative elements */}
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-purple-200 opacity-20 blur-3xl dark:bg-purple-900/30"></div>
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-indigo-200 opacity-20 blur-3xl dark:bg-indigo-900/30"></div>
      </div>

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Get started in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our streamlined process makes it easy to get up and running
              quickly.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* Left side: Steps */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  className={`group relative cursor-pointer rounded-xl p-6 transition-all duration-300 ${
                    activeStep === step.id
                      ? "bg-white shadow-xl dark:bg-gray-800"
                      : "hover:bg-white/50 hover:shadow-lg dark:hover:bg-gray-800/50"
                  }`}
                  onClick={() => setActiveStep(step.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                        activeStep === step.id
                          ? "bg-indigo-600 text-white"
                          : "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                      } text-xl font-bold shadow-lg transition-colors`}
                    >
                      {step.id}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connection line */}
                  {step.id < steps.length && (
                    <div
                      className={`absolute bottom-0 left-[1.45rem] top-12 w-0.5 ${
                        activeStep > step.id
                          ? "bg-indigo-600 dark:bg-indigo-500"
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    ></div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side: Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[400px] w-full max-w-lg">
              {/* Main image container */}
              <div className="absolute inset-0 rounded-2xl bg-white p-2 shadow-2xl dark:bg-gray-800">
                <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-700">
                  <AnimatePresence mode="wait">
                    {steps.map(
                      (step) =>
                        step.id === activeStep && (
                          <motion.div
                            key={step.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={
                                step.image ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                              }
                              alt={step.title}
                              fill
                              className="object-cover"
                            />
                          </motion.div>
                        ),
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Decorative elements */}
              <motion.div
                className="absolute -right-8 -top-8 h-24 w-24 rounded-lg bg-indigo-600 p-2 shadow-lg"
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                  },
                }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-md bg-indigo-500 text-white">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16L16 12L12 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12H16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -left-8 h-24 w-24 rounded-lg bg-purple-600 p-2 shadow-lg"
                animate={{
                  rotate: [0, -5, 0, 5, 0],
                  transition: {
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 5,
                    ease: "easeInOut",
                    delay: 0.5,
                  },
                }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-md bg-purple-500 text-white">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 12H18L15 21L9 3L6 12H2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-700 dark:shadow-indigo-900/20"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedProcess;
