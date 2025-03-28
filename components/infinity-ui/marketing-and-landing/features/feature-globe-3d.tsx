"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, Zap, Shield, BarChart3, Users, Globe } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type FeatureNode = {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  image: string;
  position: {
    theta: number; // horizontal angle (0-360)
    phi: number; // vertical angle (0-180)
    radius: number; // distance from center
  };
};

const features: FeatureNode[] = [
  {
    id: "ai",
    title: "AI-Powered Insights",
    description:
      "Harness the power of artificial intelligence to uncover insights and patterns in your data.",
    icon: Sparkles,
    color: "bg-purple-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    position: { theta: 0, phi: 90, radius: 180 },
  },
  {
    id: "performance",
    title: "Lightning Performance",
    description:
      "Experience blazing fast load times and responsive interactions across all devices.",
    icon: Zap,
    color: "bg-amber-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    position: { theta: 72, phi: 60, radius: 180 },
  },
  {
    id: "security",
    title: "Enterprise Security",
    description:
      "Bank-grade security features to keep your data safe and your customers protected.",
    icon: Shield,
    color: "bg-emerald-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    position: { theta: 144, phi: 120, radius: 180 },
  },
  {
    id: "analytics",
    title: "Advanced Analytics",
    description:
      "Comprehensive analytics and reporting tools to track performance and make data-driven decisions.",
    icon: BarChart3,
    color: "bg-blue-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    position: { theta: 216, phi: 60, radius: 180 },
  },
  {
    id: "collaboration",
    title: "Team Collaboration",
    description:
      "Powerful tools for teams to work together seamlessly, no matter where they are located.",
    icon: Users,
    color: "bg-rose-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    position: { theta: 288, phi: 120, radius: 180 },
  },
];

const FeatureGlobe3D = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotationAngle, setRotationAngle] = useState(0);
  const globeRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const controls = useAnimation();

  // Convert spherical coordinates to Cartesian (3D)
  const sphericalToCartesian = (theta: number, phi: number, radius: number) => {
    // Convert degrees to radians
    const thetaRad = (theta * Math.PI) / 180;
    const phiRad = (phi * Math.PI) / 180;

    return {
      x: radius * Math.sin(phiRad) * Math.cos(thetaRad),
      y: radius * Math.cos(phiRad),
      z: radius * Math.sin(phiRad) * Math.sin(thetaRad),
    };
  };

  // Auto-rotation effect
  useEffect(() => {
    const animate = () => {
      if (autoRotate) {
        setRotationAngle((prev) => (prev + 0.2) % 360);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [autoRotate]);

  // Calculate node positions with current rotation
  const getNodePosition = (feature: FeatureNode) => {
    // Apply global rotation to the theta angle
    const rotatedTheta = (feature.position.theta + rotationAngle) % 360;

    // Convert to cartesian coordinates
    const { x, y, z } = sphericalToCartesian(
      rotatedTheta,
      feature.position.phi,
      feature.position.radius,
    );

    // Scale for visibility (nodes in front are larger)
    const scale =
      0.6 +
      ((z + feature.position.radius) / (2 * feature.position.radius)) * 0.4;

    // Determine if node is in front or back half of the sphere
    const isInFront = z > 0;

    return { x, y, z, scale, isInFront };
  };

  // Handle feature selection
  const handleFeatureClick = (id: string) => {
    setAutoRotate(false);
    setActiveFeature(id === activeFeature ? null : id);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-900 dark:to-gray-800">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.indigo.100/30%),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,theme(colors.indigo.900/20%),transparent_70%)]"></div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10 dark:opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(86, 106, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(86, 106, 255, 0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
              Global Features
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Explore our feature universe
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Discover how our interconnected features create a powerful
              ecosystem for your business.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-16 lg:grid-cols-2">
          {/* Left: 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex h-[500px] items-center justify-center"
            onMouseEnter={() => setAutoRotate(false)}
            onMouseLeave={() => !activeFeature && setAutoRotate(true)}
            ref={globeRef}
          >
            {/* Globe center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="h-32 w-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-20 blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
              <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-80 blur-sm" />
              <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg dark:bg-gray-800">
                <div className="flex h-full w-full items-center justify-center">
                  <Globe className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </div>

            {/* Orbital rings */}
            <div
              className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-200/30 dark:border-indigo-800/30"
              style={{
                transform: `rotateX(70deg) rotateZ(${rotationAngle}deg)`,
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-200/20 dark:border-indigo-800/20"
              style={{
                transform: `rotateX(70deg) rotateZ(${rotationAngle + 60}deg)`,
              }}
            />
            <div
              className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-200/10 dark:border-indigo-800/10"
              style={{
                transform: `rotateX(70deg) rotateZ(${rotationAngle + 120}deg)`,
              }}
            />

            {/* Feature nodes */}
            {features.map((feature) => {
              const { x, y, z, scale, isInFront } = getNodePosition(feature);
              const FeatureIcon = feature.icon;
              const isActive = activeFeature === feature.id;

              return (
                <motion.div
                  key={feature.id}
                  className="absolute left-1/2 top-1/2 cursor-pointer"
                  style={{
                    x,
                    y,
                    z: z * 0.01, // Small z value for subtle 3D effect in CSS
                    scale,
                    zIndex: isInFront ? 10 : 1,
                    opacity: !activeFeature || isActive ? 1 : 0.5,
                    translateX: "-50%",
                    translateY: "-50%",
                  }}
                  whileHover={{ scale: scale * 1.1 }}
                  onClick={() => handleFeatureClick(feature.id)}
                >
                  <motion.div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${feature.color} text-white shadow-lg transition-all duration-300 ${isActive ? "ring-2 ring-white ring-offset-2 dark:ring-offset-gray-900" : ""}`}
                    animate={{
                      boxShadow: isActive
                        ? "0 0 20px 5px rgba(99, 102, 241, 0.5)"
                        : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <FeatureIcon className="h-8 w-8" />
                  </motion.div>

                  {/* Connection line to center when active */}
                  {isActive && (
                    <motion.div
                      className="absolute left-1/2 top-1/2 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"
                      style={{
                        width: Math.sqrt(x * x + y * y),
                        rotate: `${Math.atan2(y, x) * (180 / Math.PI)}deg`,
                        transformOrigin: "left center",
                        opacity: 0.6,
                        zIndex: -1,
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              );
            })}

            {/* Rotation control */}
            <motion.button
              className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-md transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAutoRotate(!autoRotate)}
            >
              {autoRotate ? "Pause Rotation" : "Resume Rotation"}
            </motion.button>
          </motion.div>

          {/* Right: Feature Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <AnimatePresence mode="wait">
              {activeFeature ? (
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800"
                >
                  {(() => {
                    const feature = features.find(
                      (f) => f.id === activeFeature,
                    );
                    if (!feature) return null;

                    const FeatureIcon = feature.icon;

                    return (
                      <div>
                        <div className="mb-6 flex items-center gap-4">
                          <div
                            className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl ${feature.color} text-white shadow-lg`}
                          >
                            <FeatureIcon className="h-8 w-8" />
                          </div>
                          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {feature.title}
                          </h3>
                        </div>

                        <div className="relative mb-8 h-48 overflow-hidden rounded-xl">
                          <Image
                            src={
                              feature.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={feature.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>

                        <div className="grid gap-4 sm:grid-cols-2">
                          {[1, 2, 3, 4].map((item) => (
                            <motion.div
                              key={item}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: item * 0.1 }}
                              className="flex items-start gap-2"
                            >
                              <div
                                className={`mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${feature.color}`}
                              >
                                <svg
                                  className="h-3 w-3 text-white"
                                  viewBox="0 0 12 12"
                                  fill="none"
                                >
                                  <path
                                    d="M3.5 6L5.5 8L8.5 4"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                              <span className="text-gray-700 dark:text-gray-300">
                                Feature benefit {item}
                              </span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-8 flex justify-between">
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className={`rounded-lg ${feature.color} px-6 py-3 text-base font-medium text-white shadow-lg transition-colors hover:opacity-90`}
                          >
                            Learn More
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveFeature(null)}
                            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                          >
                            Close
                          </motion.button>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              ) : (
                <motion.div
                  key="instructions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30">
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          duration: 20,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <Globe className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                      </motion.div>
                    </div>

                    <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                      Explore Our Features
                    </h3>

                    <p className="mb-8 text-gray-600 dark:text-gray-300">
                      Click on any feature node in the globe to learn more about
                      our powerful capabilities.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                      {features.map((feature) => {
                        const FeatureIcon = feature.icon;

                        return (
                          <motion.button
                            key={feature.id}
                            className={`flex items-center gap-2 rounded-full ${feature.color} px-4 py-2 text-sm font-medium text-white shadow-md transition-transform`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFeatureClick(feature.id)}
                          >
                            <FeatureIcon className="h-4 w-4" />
                            <span>{feature.title}</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureGlobe3D;
