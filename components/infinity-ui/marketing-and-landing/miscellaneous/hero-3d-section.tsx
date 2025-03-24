"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const Hero3DSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950"
    >
      {/* 3D Geometric Shapes */}
      <div className="pointer-events-none absolute inset-0">
        {/* Floating Gradient Orbs */}
        <motion.div
          className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-3xl"
          style={{ y: y1 }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/4 h-80 w-80 rounded-full bg-gradient-to-tr from-pink-400/30 to-rose-400/30 blur-3xl"
          style={{ y: y2 }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* 3D Shapes */}
        <motion.div
          className="absolute right-[15%] top-1/3 h-40 w-40"
          style={{ y: y3 }}
          animate={{
            rotateY: [0, 360],
            rotateX: [0, 15, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="transform-style-3d relative h-full w-full">
            <div className="rotateY-20 absolute inset-0 rotate-12 transform rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm"></div>
            <div className="absolute inset-2 rounded-xl border border-white/50 bg-white/80 shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80"></div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-[20%] h-32 w-32"
          style={{ y: y1 }}
          animate={{
            rotateZ: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="relative h-full w-full">
            <div className="absolute inset-0 transform rounded-full bg-gradient-to-br from-rose-500/20 to-orange-500/20 backdrop-blur-sm"></div>
            <div className="absolute inset-1 rounded-full border border-white/50 bg-white/80 shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80"></div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 py-32 text-center"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="mb-6 inline-flex items-center justify-center rounded-full border border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-4 py-2 backdrop-blur-sm dark:border-indigo-500/30 dark:from-indigo-500/20 dark:to-purple-500/20">
            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Introducing Infinity UI
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 dark:text-white md:text-7xl">
            Design the future with
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Infinity UI
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 dark:text-gray-300 md:text-2xl">
            A modern UI component library that helps you build stunning
            interfaces with speed and creativity.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl hover:shadow-indigo-500/25">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>

            <button className="inline-flex items-center rounded-xl border border-gray-200 bg-white px-8 py-4 font-medium text-gray-900 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
              View Components
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap justify-center gap-8"
        >
          {[
            { value: "50+", label: "UI Components" },
            { value: "99.9%", label: "Lighthouse Score" },
            { value: "15k+", label: "Happy Developers" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">
                {stat.value}
              </div>
              <div className="mt-1 text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 transform"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-6 w-6 text-gray-400 dark:text-gray-500" />
        </motion.div>
      </motion.div>

      <style jsx>{`
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotateY-20 {
          transform: rotateY(20deg);
        }
      `}</style>
    </section>
  );
};

export default Hero3DSection;
