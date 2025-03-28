"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Zap, Shield, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const features = [
  {
    id: 1,
    title: "Lightning Fast Performance",
    description:
      "Optimized for speed with 99.9% uptime and global CDN distribution.",
    icon: Zap,
    color: "from-amber-400 to-orange-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=240&width=240",
    stats: ["50ms response time", "99.9% uptime", "Global CDN"],
  },
  {
    id: 2,
    title: "Enterprise-Grade Security",
    description:
      "Bank-level encryption with SOC2, GDPR, and HIPAA compliance built-in.",
    icon: Shield,
    color: "from-emerald-400 to-teal-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=240&width=240",
    stats: ["End-to-end encryption", "SOC2 certified", "GDPR compliant"],
  },
  {
    id: 3,
    title: "Advanced Analytics",
    description:
      "Gain deep insights with customizable dashboards and real-time reporting.",
    icon: BarChart3,
    color: "from-blue-400 to-indigo-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=240&width=240",
    stats: ["Real-time metrics", "Custom reports", "Data visualization"],
  },
];

const IsometricFeatures = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  return (
    <section className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-gray-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <svg
          className="absolute left-0 top-0 h-full w-full opacity-5 dark:opacity-10"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Gradient blobs */}
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-purple-200 opacity-30 blur-3xl dark:bg-purple-900/30"></div>
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-blue-200 opacity-30 blur-3xl dark:bg-blue-900/30"></div>
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
              Everything you need to scale
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our platform provides all the tools you need to manage your team,
              track progress, and grow your business.
            </p>
          </motion.div>
        </div>

        <div
          ref={containerRef}
          className="mt-20 grid gap-16 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* 3D Card with isometric effect */}
              <div className="perspective-1000 relative h-[300px] w-full">
                <motion.div
                  className="absolute inset-0 origin-[center_bottom_-100px] rounded-2xl bg-white p-6 shadow-xl transition-transform duration-500 dark:bg-gray-800"
                  style={{
                    transform: "rotateX(10deg) rotateY(15deg) rotateZ(-5deg)",
                    transformStyle: "preserve-3d",
                  }}
                  whileHover={{
                    transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                    transition: { duration: 0.4 },
                  }}
                >
                  {/* Card content */}
                  <div className="relative z-10 h-full">
                    <div
                      className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.color} p-3 text-white shadow-lg`}
                    >
                      <feature.icon className="h-6 w-6" />
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>

                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>

                    <div className="mt-auto space-y-2">
                      {feature.stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {stat}
                          </span>
                        </div>
                      ))}
                    </div>

                    <motion.a
                      href="#"
                      className="mt-6 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </motion.a>
                  </div>

                  {/* Floating elements */}
                  <motion.div
                    className="absolute -right-6 -top-6 h-16 w-16 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 p-0.5 shadow-lg"
                    initial={{ opacity: 0, y: 20, rotate: -5 }}
                    animate={{ opacity: 1, y: 0, rotate: -5 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(20px)",
                    }}
                  >
                    <div className="h-full w-full rounded-md bg-white dark:bg-gray-800">
                      <div className="flex h-full items-center justify-center">
                        <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                          {index + 1}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 h-20 w-20 rounded-lg bg-white p-1 shadow-lg dark:bg-gray-800"
                    initial={{ opacity: 0, x: -10, rotate: 5 }}
                    animate={{ opacity: 1, x: 0, rotate: 5 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: "translateZ(30px)",
                    }}
                  >
                    <div className="h-full w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-700">
                      <Image
                        src={
                          feature.image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={feature.title}
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-700 dark:shadow-indigo-900/20"
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default IsometricFeatures;
