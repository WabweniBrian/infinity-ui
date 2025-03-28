"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MapPin, Compass, Flag, Trophy, Mountain } from "lucide-react";

type Step = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  position: { x: number; y: number };
  tileType: "start" | "forest" | "mountain" | "castle" | "treasure";
};

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
];

const IsometricJourneySteps = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [characterPosition, setCharacterPosition] = useState({ x: 1, y: 4 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const handleStepClick = (id: number) => {
    const step = steps.find((s) => s.id === id);
    if (step) {
      setActiveStep(id);
      // Animate character movement
      setCharacterPosition(step.position);
    }
  };

  // Helper to convert grid coordinates to isometric position
  const toIso = (x: number, y: number) => {
    // Isometric transformation
    const isoX = (x - y) * 30;
    const isoY = (x + y) * 15;
    return { x: isoX, y: isoY };
  };

  // Generate grid tiles
  const renderGrid = () => {
    const gridSize = 10;
    const tiles = [];

    // Create base grid
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const { x: isoX, y: isoY } = toIso(x, y);

        // Check if this position has a step
        const stepAtPosition = steps.find(
          (s) => s.position.x === x && s.position.y === y,
        );
        const isStepTile = Boolean(stepAtPosition);
        const isActiveTile = stepAtPosition?.id === activeStep;

        // Determine tile type and style
        let tileColor = "bg-gray-200";
        let tileElement = null;

        if (isStepTile && stepAtPosition) {
          const { tileType, color } = stepAtPosition;

          switch (tileType) {
            case "start":
              tileColor = "bg-emerald-200";
              tileElement = (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="h-8 w-4 rounded-t-full bg-emerald-500" />
                </div>
              );
              break;
            case "forest":
              tileColor = "bg-green-200";
              tileElement = (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="border-b-16 h-0 w-0 border-l-8 border-r-8 border-b-green-600 border-l-transparent border-r-transparent" />
                </div>
              );
              break;
            case "mountain":
              tileColor = "bg-blue-200";
              tileElement = (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="border-l-10 border-r-10 border-b-16 h-0 w-0 border-b-blue-600 border-l-transparent border-r-transparent" />
                </div>
              );
              break;
            case "castle":
              tileColor = "bg-purple-200";
              tileElement = (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="relative h-10 w-12 rounded-t-lg bg-purple-500">
                    <div className="absolute left-0 right-0 top-0 flex h-3">
                      <div className="mx-0.5 h-3 w-2 bg-purple-700" />
                      <div className="mx-0.5 h-3 w-2 bg-purple-700" />
                      <div className="mx-0.5 h-3 w-2 bg-purple-700" />
                    </div>
                  </div>
                </div>
              );
              break;
            case "treasure":
              tileColor = "bg-amber-200";
              tileElement = (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="relative h-6 w-8 rounded-t-lg bg-amber-600">
                    <div className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 transform rounded-full bg-yellow-400" />
                  </div>
                </div>
              );
              break;
          }
        }

        // Path tiles
        const isPathTile = steps.some((step, idx, arr) => {
          if (idx === arr.length - 1) return false;

          const current = step.position;
          const next = arr[idx + 1].position;

          // Check if this tile is on the path between two steps
          // Simple linear interpolation
          const dx = next.x - current.x;
          const dy = next.y - current.y;
          const steps = Math.max(Math.abs(dx), Math.abs(dy));

          for (let i = 0; i <= steps; i++) {
            const ratio = steps === 0 ? 0 : i / steps;
            const pathX = Math.round(current.x + dx * ratio);
            const pathY = Math.round(current.y + dy * ratio);

            if (pathX === x && pathY === y && !isStepTile) {
              return true;
            }
          }

          return false;
        });

        if (isPathTile) {
          tileColor = "bg-amber-100";
        }

        // Character position
        const hasCharacter =
          characterPosition.x === x && characterPosition.y === y;

        tiles.push(
          <div
            key={`${x}-${y}`}
            className={`absolute h-8 w-16 ${tileColor} ${
              isStepTile ? "cursor-pointer hover:brightness-110" : ""
            } ${isActiveTile ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
            style={{
              left: `calc(50% + ${isoX}px)`,
              top: `${isoY}px`,
              transform: "rotateX(60deg) rotateZ(45deg)",
              transformStyle: "preserve-3d",
              boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() =>
              isStepTile && stepAtPosition && handleStepClick(stepAtPosition.id)
            }
          >
            {tileElement}

            {/* Character */}
            {hasCharacter && (
              <motion.div
                className="absolute left-1/2 top-1/2 z-10 h-6 w-6 rounded-full bg-red-500"
                style={{
                  transform:
                    "translate(-50%, -50%) rotateX(-60deg) rotateZ(-45deg)",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1, y: [0, -10, 0] }}
                transition={{
                  scale: { duration: 0.3 },
                  y: {
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  },
                }}
              />
            )}
          </div>,
        );
      }
    }

    return tiles;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-24"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-indigo-100 to-blue-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-emerald-50 to-green-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Adventure Journey
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Navigate through our isometric project landscape to reach your
            business goals
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Isometric map */}
          <motion.div
            className="relative w-full lg:w-1/2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="perspective-1000 relative mx-auto aspect-square max-w-xl">
              {/* Isometric grid container */}
              <div className="transform-style-3d relative h-full w-full">
                {/* Render grid tiles */}
                <div
                  className="transform-style-3d absolute inset-0"
                  style={{ perspective: "1000px" }}
                >
                  {renderGrid()}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step content */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              {steps.map((step) => {
                if (step.id !== activeStep) return null;

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
                      <div className="overflow-hidden rounded-xl">
                        <div className="relative rounded-xl border border-gray-100 bg-white p-8 shadow-md">
                          <div
                            className={`absolute left-0 top-0 h-1 w-full ${
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

                          <div className="mb-6 flex items-center">
                            <div
                              className={`mr-4 rounded-lg p-4 ${
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
                                className={`mb-1 inline-block rounded-full px-3 py-1 text-sm font-semibold ${
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
                              <h3 className="text-2xl font-bold text-gray-900">
                                {step.title}
                              </h3>
                            </div>
                          </div>

                          <p className="mb-6 text-lg text-gray-600">
                            {step.description}
                          </p>

                          <div className="flex flex-wrap gap-4">
                            <button
                              onClick={() =>
                                handleStepClick(
                                  step.id === 1 ? steps.length : step.id - 1,
                                )
                              }
                              className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2 text-gray-700 transition-colors hover:bg-gray-50"
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
                              onClick={() =>
                                handleStepClick(
                                  step.id === steps.length ? 1 : step.id + 1,
                                )
                              }
                              className={`flex items-center gap-2 rounded-lg px-5 py-2 text-white transition-colors ${
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
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IsometricJourneySteps;
