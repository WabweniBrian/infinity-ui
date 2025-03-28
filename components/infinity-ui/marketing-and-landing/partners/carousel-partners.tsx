"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

// partner data
const partners = [
  {
    id: 1,
    name: "Acme Corporation",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 2,
    name: "TechGiant",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 3,
    name: "Globex",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 4,
    name: "Initech",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 5,
    name: "Umbrella Corp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 6,
    name: "Stark Industries",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 7,
    name: "Wayne Enterprises",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 8,
    name: "Cyberdyne Systems",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 9,
    name: "Oscorp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 10,
    name: "LexCorp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
];

// Duplicate the partners array to create a seamless infinite scroll effect
const allPartners = [...partners, ...partners];

const CarouselPartners = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  // Start the animation when the component is in view
  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    } else {
      controls.stop();
    }
  }, [isInView, controls]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-slate-950"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent dark:from-transparent dark:via-purple-900/5 dark:to-transparent" />

      {/* Darkmode toggle */}
      <DarkModeToggle />

      <div className="container relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Partnering with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
              Industry Leaders
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We&apos;re proud to work with these amazing organizations
          </p>
        </motion.div>

        <div className="relative mt-16 overflow-hidden py-10">
          {/* Top and bottom fade effect */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent dark:from-slate-950 dark:to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent dark:from-slate-950 dark:to-transparent" />

          {/* First row - moves left */}
          <motion.div
            variants={{
              animate: {
                x: [0, -1920],
                transition: {
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 50,
                    ease: "linear",
                  },
                },
              },
            }}
            animate={controls}
            className="flex space-x-12 py-4"
          >
            {allPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex h-20 w-48 shrink-0 items-center justify-center rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-slate-800/50 dark:hover:bg-slate-800"
              >
                <Image
                  src={
                    partner.logo ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={partner.name}
                  width={120}
                  height={48}
                  className="max-h-12 max-w-[120px] object-contain grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </motion.div>

          {/* Second row - moves right */}
          <motion.div
            variants={{
              animate: {
                x: [-1920, 0],
                transition: {
                  x: {
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    duration: 50,
                    ease: "linear",
                  },
                },
              },
            }}
            animate={controls}
            className="mt-8 flex space-x-12 py-4"
          >
            {allPartners.reverse().map((partner, index) => (
              <div
                key={`${partner.id}-${index}-reverse`}
                className="flex h-20 w-48 shrink-0 items-center justify-center rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-slate-800/50 dark:hover:bg-slate-800"
              >
                <Image
                  src={
                    partner.logo ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={partner.name}
                  width={120}
                  height={48}
                  className="max-h-12 max-w-[120px] object-contain grayscale transition-all duration-300 hover:grayscale-0"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CarouselPartners;
