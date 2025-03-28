"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface StatProps {
  title: string;
  value: string;
  description: string;
  index: number;
}

const stats: StatProps[] = [
  {
    title: "Customer Retention",
    value: "97%",
    description: "Industry average: 65%",
    index: 0,
  },
  {
    title: "Revenue Growth",
    value: "3.8x",
    description: "Year-over-year increase",
    index: 1,
  },
  {
    title: "Support Response",
    value: "<2h",
    description: "Average response time",
    index: 2,
  },
  {
    title: "Client Satisfaction",
    value: "4.9/5",
    description: "Based on 10k+ reviews",
    index: 3,
  },
];

const Particle = ({ delay }: { delay: number }) => {
  const size = Math.random() * 4 + 2;
  const duration = Math.random() * 10 + 10;
  const initialX = Math.random() * 100;
  const initialY = Math.random() * 100;

  return (
    <motion.div
      className="absolute rounded-full bg-blue-500/30 dark:bg-blue-400/30"
      style={{
        width: size,
        height: size,
        left: `${initialX}%`,
        top: `${initialY}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.5, 0],
        y: [0, -100],
        x: [0, Math.random() * 50 - 25],
      }}
      transition={{
        duration,
        delay: delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  );
};

const ParticleBackground = () => {
  const particles = Array.from({ length: 50 }).map((_, i) => (
    <Particle key={i} delay={i * 0.2} />
  ));

  return (
    <div className="absolute inset-0 overflow-hidden opacity-40 dark:opacity-60">
      {particles}
    </div>
  );
};

const WaveStats = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-slate-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            className="text-blue-50 dark:text-blue-900/20"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Metrics that{" "}
            <span className="relative inline-block">
              <span className="relative z-10">matter</span>
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-3 bg-blue-100 dark:bg-blue-900/30"
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Our platform consistently outperforms industry benchmarks
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: stat.index * 0.1 }}
              onHoverStart={() => setHoveredIndex(stat.index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative overflow-hidden rounded-xl bg-white p-6 shadow-lg backdrop-blur-sm dark:bg-slate-800/50 dark:shadow-slate-800/10"
            >
              {/* Animated Wave Background */}
              <AnimatePresence>
                {hoveredIndex === stat.index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent"
                  />
                )}
              </AnimatePresence>

              <div className="relative">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">
                  {stat.title}
                </h3>

                <div className="mt-2 flex items-baseline">
                  <motion.p
                    className="text-4xl font-bold text-blue-600 dark:text-blue-400"
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: stat.index * 0.1 + 0.3,
                    }}
                  >
                    {stat.value}
                  </motion.p>
                </div>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </p>

                {/* Decorative Dots */}
                <div className="absolute bottom-0 right-0 flex space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-blue-200 dark:bg-blue-700"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{
                        duration: 0.3,
                        delay: stat.index * 0.1 + 0.5 + i * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WaveStats;
