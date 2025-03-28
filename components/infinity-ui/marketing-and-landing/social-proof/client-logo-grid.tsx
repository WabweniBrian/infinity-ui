"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Client = {
  id: number;
  name: string;
  logo: string;
  tier: "gold" | "silver" | "bronze";
};

const clients: Client[] = [
  {
    id: 1,
    name: "Acme Inc",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "gold",
  },
  {
    id: 2,
    name: "TechCorp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "gold",
  },
  {
    id: 3,
    name: "Innovate",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "gold",
  },
  {
    id: 4,
    name: "FutureTech",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "gold",
  },
  {
    id: 5,
    name: "GlobalSoft",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "silver",
  },
  {
    id: 6,
    name: "Quantum",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "silver",
  },
  {
    id: 7,
    name: "Nexus",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "silver",
  },
  {
    id: 8,
    name: "Apex Systems",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "silver",
  },
  {
    id: 9,
    name: "EchoTech",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "bronze",
  },
  {
    id: 10,
    name: "Pulse",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "bronze",
  },
  {
    id: 11,
    name: "Horizon",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "bronze",
  },
  {
    id: 12,
    name: "Zenith",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    tier: "bronze",
  },
];

const ClientLogoGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for pattern elements
  const patternY1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const patternY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const patternRotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  // Group clients by tier
  const goldClients = clients.filter((client) => client.tier === "gold");
  const silverClients = clients.filter((client) => client.tier === "silver");
  const bronzeClients = clients.filter((client) => client.tier === "bronze");

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-100 to-white py-20 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Animated pattern background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pattern elements */}
        <motion.div
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]"
          style={{ y: patternY1 }}
        >
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid-pattern"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(5)"
              >
                <path
                  d="M 0,20 L 40,20 M 20,0 L 20,40"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-slate-400 dark:text-slate-500"
                />
              </pattern>
              <pattern
                id="dots-pattern"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(10)"
              >
                <circle
                  cx="3"
                  cy="3"
                  r="1.5"
                  fill="currentColor"
                  className="text-indigo-400 dark:text-indigo-700"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            <rect width="100%" height="100%" fill="url(#dots-pattern)" />
          </svg>
        </motion.div>

        {/* Geometric shapes */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full border-2 border-indigo-200 opacity-70 dark:border-indigo-900/30 dark:opacity-30"
          style={{ y: patternY2, rotate: patternRotate }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full border-2 border-indigo-200 opacity-70 dark:border-indigo-900/30 dark:opacity-30"
          style={{ y: patternY1, rotate: patternRotate }}
        />
        <motion.div
          className="absolute right-1/3 top-1/2 h-48 w-48 rotate-45 border-2 border-indigo-200 opacity-70 dark:border-indigo-900/30 dark:opacity-30"
          style={{
            y: patternY2,
            rotate: useTransform(patternRotate, (r) => r + 45),
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl"
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Join the thousands of companies using our platform to grow their
            business
          </motion.p>
        </div>

        {/* Gold tier clients */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-xl font-semibold text-slate-700 dark:text-slate-200"
          >
            <span className="inline-block rounded-full bg-gradient-to-r from-amber-200 to-yellow-400 px-4 py-1 text-white dark:from-amber-700 dark:to-yellow-600">
              Premium Partners
            </span>
          </motion.h3>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {goldClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex h-32 items-center justify-center rounded-xl border border-amber-100 bg-white p-6 shadow-lg transition-colors hover:border-amber-300 dark:border-amber-900/30 dark:bg-slate-800 dark:hover:border-amber-700"
              >
                <div className="relative h-16 w-full">
                  <Image
                    src={
                      client.logo ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Silver tier clients */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-xl font-semibold text-slate-700 dark:text-slate-200"
          >
            <span className="inline-block rounded-full bg-gradient-to-r from-slate-300 to-slate-400 px-4 py-1 text-white dark:from-slate-600 dark:to-slate-500">
              Key Partners
            </span>
          </motion.h3>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {silverClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex h-28 items-center justify-center rounded-xl border border-slate-100 bg-white p-5 shadow-md transition-colors hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
              >
                <div className="relative h-14 w-full">
                  <Image
                    src={
                      client.logo ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bronze tier clients */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 text-center text-xl font-semibold text-slate-700 dark:text-slate-200"
          >
            <span className="inline-block rounded-full bg-gradient-to-r from-orange-300 to-orange-400 px-4 py-1 text-white dark:from-orange-800 dark:to-orange-700">
              Partners
            </span>
          </motion.h3>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {bronzeClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex h-24 items-center justify-center rounded-lg border border-slate-100 bg-white p-4 shadow-sm transition-colors hover:border-orange-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-orange-900"
              >
                <div className="relative h-12 w-full">
                  <Image
                    src={
                      client.logo ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={client.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            Want to become our next success story?
          </p>
          <a
            href="#"
            className="inline-block rounded-full bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Join Our Partner Program
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogoGrid;
