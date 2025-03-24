"use client";

import type React from "react";

import { motion, useAnimation, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MinimalistTypographyHero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Update cursor position
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    setCursorPosition({ x, y });
  };

  // Animate when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Split text into letters for animation
  const title = "Simplicity is the ultimate sophistication";
  const letters = title.split("");

  return (
    <div
      ref={ref}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-50 px-4 py-20 pb-8"
      onMouseMove={handleMouseMove}
    >
      {/* Gradient blob that follows cursor */}
      <motion.div
        className="pointer-events-none absolute h-[500px] w-[500px] rounded-full bg-gradient-to-r from-blue-100 to-purple-100 opacity-60 blur-[120px]"
        animate={{
          x: `calc(${cursorPosition.x * 100}% - 250px)`,
          y: `calc(${cursorPosition.y * 100}% - 250px)`,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 50,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        {/* Animated title */}
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate={controls}
          className="mb-8 flex flex-wrap justify-center text-4xl font-light tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={letter === " " ? "mr-4" : ""}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 1.2, duration: 0.8 },
            },
          }}
          className="mx-auto mb-12 max-w-2xl text-lg text-gray-600"
        >
          Infinity UI embraces minimalism without sacrificing functionality.
          Clean interfaces that let your content shine.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 1.4, duration: 0.8 },
            },
          }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <button className="group flex items-center gap-2 rounded-full border-2 border-gray-900 bg-gray-900 px-6 py-3 font-medium text-white transition-all hover:bg-gray-800">
              Explore Collection
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <button className="rounded-full border-2 border-gray-900 bg-transparent px-6 py-3 font-medium text-gray-900 transition-all hover:bg-gray-100">
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Decorative elements */}
        <div className="mt-20 flex justify-center space-x-8">
          {[1, 2, 3].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 1.6 + index * 0.1, duration: 0.8 },
                },
              }}
              className="h-[1px] w-16 bg-gray-300"
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center text-sm text-gray-500"
          >
            <span>Scroll</span>
            <ArrowRight className="mt-2 h-4 w-4 rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default MinimalistTypographyHero;
