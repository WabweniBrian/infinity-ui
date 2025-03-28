"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plane, Map, Globe, Users } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  color: string;
  destinations: string[];
  index: number;
}

const stats: StatProps[] = [
  {
    icon: <Plane className="h-6 w-6" />,
    title: "Destinations",
    value: "120+",
    description: "Countries available in our catalog",
    color: "from-sky-500 to-blue-500 dark:from-sky-400 dark:to-blue-400",
    destinations: ["Paris", "Tokyo", "New York", "Bali"],
    index: 0,
  },
  {
    icon: <Map className="h-6 w-6" />,
    title: "Tours Booked",
    value: "45,000+",
    description: "Experiences booked annually",
    color:
      "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
    destinations: ["Safari", "Cruise", "Hiking", "Cultural"],
    index: 1,
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Happy Travelers",
    value: "98.7%",
    description: "Customer satisfaction rate",
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    destinations: ["Families", "Couples", "Solo", "Groups"],
    index: 2,
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Local Guides",
    value: "2,500+",
    description: "Expert guides worldwide",
    color:
      "from-fuchsia-500 to-purple-500 dark:from-fuchsia-400 dark:to-purple-400",
    destinations: ["Europe", "Asia", "Americas", "Africa"],
    index: 3,
  },
];

// Floating clouds animation
const FloatingClouds = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 dark:opacity-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white dark:bg-gray-300"
          style={{
            width: 40 + Math.random() * 60,
            height: 20 + Math.random() * 30,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: "blur(8px)",
          }}
          animate={{
            x: [0, 100, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};

// Map dots background
const MapDotsBackground = () => {
  return (
    <div className="absolute inset-0 opacity-5 dark:opacity-10">
      <svg width="100%" height="100%">
        <pattern
          id="map-dots"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="10"
            cy="10"
            r="1"
            fill="currentColor"
            className="text-blue-500 dark:text-blue-400"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#map-dots)" />
      </svg>
    </div>
  );
};

// Plane animation
const FlyingPlane = () => {
  return (
    <motion.div
      className="absolute -top-10 left-0 text-blue-500/30 dark:text-blue-400/20"
      animate={{
        x: ["-10%", "110%"],
        y: [0, 20, 40, 20, 0],
      }}
      transition={{
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      <Plane className="h-20 w-20 rotate-12 transform" />
    </motion.div>
  );
};

const TravelStats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-50 to-white py-24 dark:from-slate-950 dark:to-slate-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <MapDotsBackground />
      <FloatingClouds />
      <FlyingPlane />

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex items-center justify-center rounded-full bg-sky-100 px-4 py-1 dark:bg-sky-900/30">
            <Globe className="mr-2 h-4 w-4 text-sky-600 dark:text-sky-400" />
            <span className="text-sm font-medium text-sky-600 dark:text-sky-400">
              Travel Insights
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Explore the world with{" "}
            <span className="text-sky-600 dark:text-sky-400">confidence</span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Discover why travelers choose our premium experiences
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-md dark:bg-slate-800"
              onHoverStart={() => setHoveredIndex(stat.index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Passport Stamp Corner */}
              <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full border-2 border-dashed border-sky-200 opacity-50 dark:border-sky-700" />

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${stat.color} text-white`}
              >
                {stat.icon}
              </div>

              <h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-gray-200">
                {stat.title}
              </h3>

              <motion.p
                className="mt-2 text-3xl font-bold text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: stat.index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.p>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.description}
              </p>

              {/* Destination Tags */}
              <AnimatePresence>
                {hoveredIndex === stat.index && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-4 flex flex-wrap gap-2"
                  >
                    {stat.destinations.map((destination, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: i * 0.1 }}
                        className="rounded-full bg-sky-100 px-2 py-1 text-xs font-medium text-sky-600 dark:bg-sky-900/30 dark:text-sky-400"
                      >
                        {destination}
                      </motion.span>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated Compass */}
              <div className="absolute bottom-3 right-3">
                <motion.div
                  className="h-6 w-6 text-sky-500/50 dark:text-sky-400/50"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <motion.path
                      d="M12 2L12 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      style={{ transformOrigin: "center" }}
                    />
                    <motion.path
                      d="M12 18L12 22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      style={{ transformOrigin: "center" }}
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelStats;
