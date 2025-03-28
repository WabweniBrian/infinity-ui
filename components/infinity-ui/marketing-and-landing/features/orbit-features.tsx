"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  Users,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type FeatureNode = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
};

const features: FeatureNode[] = [
  {
    id: 1,
    title: "AI-Powered Insights",
    description:
      "Leverage machine learning algorithms to uncover patterns and predict future trends.",
    icon: Sparkles,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 2,
    title: "Real-time Collaboration",
    description:
      "Work together seamlessly with your team, no matter where they are located.",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "Advanced Analytics",
    description:
      "Gain deep insights with customizable dashboards and comprehensive reporting.",
    icon: BarChart3,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: 4,
    title: "Enterprise Security",
    description:
      "Bank-level encryption with SOC2, GDPR, and HIPAA compliance built-in.",
    icon: Shield,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 5,
    title: "Lightning Performance",
    description:
      "Optimized for speed with 99.9% uptime and global CDN distribution.",
    icon: Zap,
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 6,
    title: "Global Infrastructure",
    description:
      "Deployed across multiple regions for reliability and low-latency access.",
    icon: Globe,
    color: "from-indigo-500 to-blue-600",
  },
];

const OrbitFeatures = () => {
  const [activeFeature, setActiveFeature] = useState<number>(1);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const orbitRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const rotateY = useMotionValue(0);

  // Calculate positions in 3D space
  const calculateNodePositions = (numNodes: number, radius = 250) => {
    const angleStep = (2 * Math.PI) / numNodes;
    return Array.from({ length: numNodes }).map((_, i) => {
      const angle = i * angleStep;
      const x = radius * Math.sin(angle);
      const z = radius * Math.cos(angle);
      return { x, z };
    });
  };

  const positions = calculateNodePositions(features.length);

  // Auto-rotate effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoRotate) {
      interval = setInterval(() => {
        setActiveFeature((prev) => (prev % features.length) + 1);
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [autoRotate]);

  // Update rotation when active feature changes
  useEffect(() => {
    const targetRotation =
      ((activeFeature - 1) * (360 / features.length)) % 360;

    controls.start({
      rotateY: targetRotation,
      transition: { type: "spring", stiffness: 60, damping: 20 },
    });

    rotateY.set(targetRotation);
  }, [activeFeature, controls, rotateY]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-900 dark:to-gray-800">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Radial gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,theme(colors.indigo.100/30%),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,theme(colors.indigo.900/20%),transparent_70%)]"></div>

        {/* Animated particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-indigo-500 opacity-30 dark:opacity-50"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
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
              Interactive Experience
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Discover our universe of features
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Explore our comprehensive suite of tools designed to elevate your
              workflow and productivity.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 flex flex-col items-center">
          {/* 3D Orbit */}
          <div
            className="perspective-1000 relative h-[500px] w-full max-w-4xl"
            onMouseEnter={() => setAutoRotate(false)}
            onMouseLeave={() => setAutoRotate(true)}
            ref={orbitRef}
          >
            <motion.div
              className="transform-style-3d absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
              animate={controls}
              style={{ rotateY }}
            >
              {features.map((feature, index) => {
                const { x, z } = positions[index];
                const isActive = activeFeature === feature.id;

                return (
                  <motion.div
                    key={feature.id}
                    className="transform-style-3d absolute left-1/2 top-1/2"
                    style={{
                      x,
                      z,
                      translateX: "-50%",
                      translateY: "-50%",
                    }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveFeature(feature.id)}
                  >
                    <motion.div
                      className={`flex h-64 w-64 cursor-pointer flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-xl transition-all duration-300 dark:bg-gray-800 ${
                        isActive
                          ? "ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900"
                          : ""
                      }`}
                      animate={{
                        scale: isActive ? 1.1 : 0.9,
                        opacity: z < 0 ? 0.6 : 1,
                        rotateY: -rotateY.get(),
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <div
                        className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} p-3 text-white shadow-lg`}
                      >
                        <feature.icon className="h-8 w-8" />
                      </div>

                      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>

                      {isActive && (
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                        >
                          Learn more <ArrowRight className="ml-1 h-4 w-4" />
                        </motion.button>
                      )}
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Center sphere */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="h-24 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 opacity-90 blur-md"></div>
              <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-lg dark:bg-gray-800">
                <div className="flex h-full w-full items-center justify-center">
                  <Layers className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Feature navigation */}
          <div className="mt-16 flex flex-wrap justify-center gap-2">
            {features.map((feature) => (
              <motion.button
                key={feature.id}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeFeature === feature.id
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFeature(feature.id)}
              >
                <feature.icon className="h-4 w-4" />
                <span>{feature.title}</span>
              </motion.button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {autoRotate ? "Pause Rotation" : "Resume Rotation"}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OrbitFeatures;
