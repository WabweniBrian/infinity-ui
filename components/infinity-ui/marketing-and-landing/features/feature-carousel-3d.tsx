"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  BarChart3,
  Users,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Feature = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  image: string;
  highlights: string[];
};

const features: Feature[] = [
  {
    id: 1,
    title: "AI-Powered Analytics",
    description:
      "Harness the power of artificial intelligence to uncover insights and patterns in your data.",
    icon: Sparkles,
    color: "from-purple-500 to-indigo-600",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    highlights: [
      "Predictive trend analysis",
      "Anomaly detection",
      "Automated reporting",
      "Custom AI models",
    ],
  },
  {
    id: 2,
    title: "Lightning Performance",
    description:
      "Experience blazing fast load times and responsive interactions across all devices.",
    icon: Zap,
    color: "from-amber-500 to-orange-600",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    highlights: [
      "Global CDN distribution",
      "Optimized asset delivery",
      "Lazy loading components",
      "Instant page transitions",
    ],
  },
  {
    id: 3,
    title: "Enterprise Security",
    description:
      "Bank-grade security features to keep your data safe and your customers protected.",
    icon: Shield,
    color: "from-emerald-500 to-teal-600",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    highlights: [
      "End-to-end encryption",
      "Role-based access control",
      "Compliance certifications",
      "Advanced threat protection",
    ],
  },
  {
    id: 4,
    title: "Advanced Reporting",
    description:
      "Comprehensive analytics and reporting tools to track performance and make data-driven decisions.",
    icon: BarChart3,
    color: "from-blue-500 to-cyan-600",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    highlights: [
      "Custom dashboards",
      "Real-time metrics",
      "Export capabilities",
      "Scheduled reports",
    ],
  },
  {
    id: 5,
    title: "Team Collaboration",
    description:
      "Powerful tools for teams to work together seamlessly, no matter where they are located.",
    icon: Users,
    color: "from-rose-500 to-pink-600",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    highlights: [
      "Real-time editing",
      "Comment threads",
      "Version history",
      "Permission management",
    ],
  },
];

const FeatureCarousel3D = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const rotateY = useMotionValue(0);
  const scale = useTransform(rotateY, [-45, 0, 45], [0.8, 1, 0.8]);
  const opacity = useTransform(rotateY, [-45, 0, 45], [0.5, 1, 0.5]);

  useEffect(() => {
    if (autoRotate) {
      intervalRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoRotate, currentIndex]);

  const handlePrev = () => {
    setAutoRotate(false);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setAutoRotate(false);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentFeature = features[currentIndex];
  const FeatureIcon = currentFeature.icon;

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-900 dark:to-gray-800">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="animate-blob absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-purple-200 opacity-20 mix-blend-multiply blur-3xl filter dark:bg-purple-900/30 dark:mix-blend-normal"></div>
        <div className="animate-blob animation-delay-2000 absolute right-1/4 top-1/2 h-96 w-96 rounded-full bg-yellow-200 opacity-20 mix-blend-multiply blur-3xl filter dark:bg-yellow-900/30 dark:mix-blend-normal"></div>
        <div className="animate-blob animation-delay-4000 absolute bottom-1/4 left-1/2 h-96 w-96 rounded-full bg-pink-200 opacity-20 mix-blend-multiply blur-3xl filter dark:bg-pink-900/30 dark:mix-blend-normal"></div>
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
              Powerful Features
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Discover what sets us apart
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Explore our innovative features designed to transform your
              workflow and boost productivity.
            </p>
          </motion.div>
        </div>

        <div
          ref={carouselRef}
          className="mt-20"
          onMouseEnter={() => setAutoRotate(false)}
          onMouseLeave={() => setAutoRotate(true)}
        >
          <div className="perspective-1000 relative mx-auto h-[600px] max-w-6xl">
            {/* 3D Carousel */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentIndex}
                initial={{
                  rotateY: direction * 90,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  rotateY: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  rotateY: direction * -90,
                  opacity: 0,
                  scale: 0.5,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                style={{
                  rotateY,
                  opacity,
                  scale,
                }}
                className="transform-style-3d absolute inset-0"
              >
                <div className="grid h-full grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800 lg:grid-cols-2">
                  {/* Left: Image */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                    <Image
                      src={
                        currentFeature.image ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={currentFeature.title}
                      fill
                      className="object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    {/* Feature number */}
                    <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white backdrop-blur-md">
                      {currentIndex + 1}
                    </div>

                    {/* Feature title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <h3 className="text-3xl font-bold text-white">
                        {currentFeature.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="flex flex-col justify-center p-8 lg:p-12">
                    <div
                      className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r ${currentFeature.color} p-3 text-white shadow-lg`}
                    >
                      <FeatureIcon className="h-8 w-8" />
                    </div>

                    <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {currentFeature.title}
                    </h3>

                    <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                      {currentFeature.description}
                    </p>

                    <div className="space-y-4">
                      {currentFeature.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 + 0.2 }}
                          className="flex items-center gap-3"
                        >
                          <div
                            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r ${currentFeature.color}`}
                          >
                            <svg
                              className="h-4 w-4 text-white"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">
                            {highlight}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`mt-8 self-start rounded-lg bg-gradient-to-r ${currentFeature.color} px-6 py-3 text-base font-medium text-white shadow-lg transition-all`}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation controls */}
            <div className="absolute -bottom-16 left-0 right-0 flex items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                aria-label="Previous feature"
              >
                <ChevronLeft className="h-6 w-6" />
              </motion.button>

              <div className="flex items-center gap-2">
                {features.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    className={`h-3 w-3 rounded-full transition-all ${
                      idx === currentIndex
                        ? "bg-indigo-600 dark:bg-indigo-400"
                        : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                    }`}
                    aria-label={`Go to feature ${idx + 1}`}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-700 shadow-lg transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                aria-label="Next feature"
              >
                <ChevronRight className="h-6 w-6" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCarousel3D;
