"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

//  partner data
const partners = [
  {
    id: 1,
    name: "Acme Corporation",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "platinum",
  },
  {
    id: 2,
    name: "TechGiant",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "platinum",
  },
  {
    id: 3,
    name: "Globex",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "gold",
  },
  {
    id: 4,
    name: "Initech",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "gold",
  },
  {
    id: 5,
    name: "Umbrella Corp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "silver",
  },
  {
    id: 6,
    name: "Stark Industries",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "silver",
  },
  {
    id: 7,
    name: "Wayne Enterprises",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "bronze",
  },
  {
    id: 8,
    name: "Cyberdyne Systems",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "bronze",
  },
];

const PartnerCard = ({
  partner,
  index,
}: {
  partner: (typeof partners)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
        y: -5,
      }}
      className="group relative flex h-40 items-center justify-center overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all duration-300 dark:bg-slate-800"
    >
      {/* Tier indicator */}
      <div className="absolute -right-12 -top-12 h-24 w-24 rotate-45">
        <div
          className={`absolute bottom-0 left-0 right-0 top-0 ${
            partner.tier === "platinum"
              ? "bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-400 dark:to-slate-500"
              : partner.tier === "gold"
                ? "bg-gradient-to-br from-amber-300 to-amber-400 dark:from-amber-400 dark:to-amber-500"
                : partner.tier === "silver"
                  ? "bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-400 dark:to-gray-500"
                  : "bg-gradient-to-br from-amber-700 to-amber-800 dark:from-amber-600 dark:to-amber-700"
          } opacity-20`}
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ filter: "grayscale(100%)" }}
        whileHover={{ filter: "grayscale(0%)" }}
        className="relative h-16 w-[160px]"
      >
        <Image
          src={
            partner.logo ||
            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
          }
          alt={partner.name}
          fill
          className="object-contain transition-all duration-300 group-hover:scale-110"
        />
      </motion.div>

      {/* Partner name tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-10 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-2 pt-6 text-center text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100 dark:from-black/90"
      >
        {partner.name}
      </motion.div>
    </motion.div>
  );
};

const GridPartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40 dark:opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
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
                className="text-gray-300 dark:text-gray-700"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

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
            Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
              Trusted Partners
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We collaborate with industry leaders to deliver exceptional results
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {partners.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GridPartners;
