"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

// partner data organized by sectors
const sectors = [
  {
    id: 1,
    name: "Technology",
    color: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400",
    partners: [
      {
        id: 101,
        name: "Acme Corporation",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Enterprise-grade solutions with advanced security features.",
        website: "https://example.com",
      },
      {
        id: 102,
        name: "TechGiant",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Innovative solutions focused on user experience and design.",
        website: "https://example.com",
      },
    ],
  },
  {
    id: 2,
    name: "Finance",
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    partners: [
      {
        id: 201,
        name: "Globex",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Comprehensive financial solutions for enterprise clients.",
        website: "https://example.com",
      },
      {
        id: 202,
        name: "Wayne Enterprises",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Specialized financial services with a focus on security.",
        website: "https://example.com",
      },
    ],
  },
  {
    id: 3,
    name: "Healthcare",
    color: "from-rose-500 to-pink-500 dark:from-rose-400 dark:to-pink-400",
    partners: [
      {
        id: 301,
        name: "Umbrella Corp",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Innovative healthcare solutions with global reach.",
        website: "https://example.com",
      },
      {
        id: 302,
        name: "Oscorp",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Cutting-edge biotechnology research and applications.",
        website: "https://example.com",
      },
    ],
  },
  {
    id: 4,
    name: "Manufacturing",
    color:
      "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
    partners: [
      {
        id: 401,
        name: "Stark Industries",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Advanced manufacturing with sustainable practices.",
        website: "https://example.com",
      },
      {
        id: 402,
        name: "Cyberdyne Systems",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Robotics and automation solutions for industry.",
        website: "https://example.com",
      },
    ],
  },
  {
    id: 5,
    name: "Media",
    color:
      "from-purple-500 to-violet-500 dark:from-purple-400 dark:to-violet-400",
    partners: [
      {
        id: 501,
        name: "Daily Planet",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Global media coverage and content distribution.",
        website: "https://example.com",
      },
      {
        id: 502,
        name: "Massive Dynamic",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Innovative media technology and distribution platforms.",
        website: "https://example.com",
      },
    ],
  },
];

const SectorWheelPartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeSector, setActiveSector] = useState<number | null>(null);
  const [selectedPartner, setSelectedPartner] = useState<any | null>(null);

  // Calculate positions for sectors in the wheel
  const getSectorPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total;
    const radius = 150; // Radius of the wheel
    const x = radius * Math.cos(angle - Math.PI / 2); // Adjust to start from top
    const y = radius * Math.sin(angle - Math.PI / 2);
    return { x, y };
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-slate-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
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
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
              Industry Sectors
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Explore our partners across different industry verticals
          </p>
        </motion.div>

        <div className="mt-16 flex flex-col items-center">
          {/* Sector Wheel - Desktop & Tablet */}
          <div className="relative hidden h-[400px] w-[400px] sm:block">
            {/* Center circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 text-center text-sm font-medium text-gray-700 dark:bg-slate-800 dark:text-gray-300"
            >
              Select a sector
            </motion.div>

            {/* Sector buttons */}
            {sectors.map((sector, index) => {
              const position = getSectorPosition(index, sectors.length);

              return (
                <motion.button
                  key={sector.id}
                  initial={{ opacity: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: 1,
                    x: position.x,
                    y: position.y,
                    scale: activeSector === sector.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  onClick={() => setActiveSector(sector.id)}
                  className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-center text-sm font-medium shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-800"
                  style={{
                    boxShadow:
                      activeSector === sector.id
                        ? `0 0 0 3px ${sector.color.includes("blue") ? "#3b82f6" : sector.color.includes("emerald") ? "#10b981" : sector.color.includes("rose") ? "#f43f5e" : sector.color.includes("amber") ? "#f59e0b" : "#8b5cf6"}`
                        : "",
                  }}
                >
                  <div>
                    <div
                      className="mx-auto mb-1 h-2 w-8 rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${sector.color.split(" ").slice(1).join(" ")})`,
                      }}
                    />
                    {sector.name}
                  </div>
                </motion.button>
              );
            })}

            {/* Connecting lines */}
            <svg className="absolute inset-0 h-full w-full">
              {sectors.map((sector, index) => {
                const position = getSectorPosition(index, sectors.length);

                return (
                  <motion.line
                    key={sector.id}
                    x1="200"
                    y1="200"
                    x2={200 + position.x}
                    y2={200 + position.y}
                    stroke={
                      activeSector === sector.id
                        ? sector.color.includes("blue")
                          ? "#3b82f6"
                          : sector.color.includes("emerald")
                            ? "#10b981"
                            : sector.color.includes("rose")
                              ? "#f43f5e"
                              : sector.color.includes("amber")
                                ? "#f59e0b"
                                : "#8b5cf6"
                        : "#e5e7eb"
                    }
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: 1,
                      opacity: activeSector === sector.id ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="dark:stroke-gray-700"
                  />
                );
              })}
            </svg>
          </div>

          {/* Mobile Sector Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2 sm:hidden">
            {sectors.map((sector) => (
              <button
                key={sector.id}
                onClick={() => setActiveSector(sector.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeSector === sector.id
                    ? "bg-gradient-to-r text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
                }`}
                style={
                  activeSector === sector.id
                    ? {
                        backgroundImage: `linear-gradient(to right, ${sector.color.split(" ").slice(1).join(" ")})`,
                      }
                    : {}
                }
              >
                {sector.name}
              </button>
            ))}
          </div>

          {/* Partners List */}
          <AnimatePresence mode="wait">
            {activeSector !== null && (
              <motion.div
                key={activeSector}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-8 w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800 sm:mt-16"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {sectors.find((s) => s.id === activeSector)?.name} Partners
                </h3>

                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {sectors
                    .find((s) => s.id === activeSector)
                    ?.partners.map((partner, index) => (
                      <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-lg bg-gray-50 p-4 transition-all duration-300 hover:shadow-md dark:bg-slate-700"
                        onClick={() => setSelectedPartner(partner)}
                      >
                        <div className="flex items-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white p-2 shadow-sm dark:bg-slate-800">
                            <div className="relative h-10 w-[80px]">
                              <Image
                                src={
                                  partner.logo ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                }
                                alt={partner.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>

                          <div className="ml-4">
                            <h4 className="text-base font-medium text-gray-900 dark:text-white">
                              {partner.name}
                            </h4>
                            <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                              {partner.description}
                            </p>
                          </div>
                        </div>

                        <div
                          className="mt-4 h-0.5 w-full rounded-full bg-gradient-to-r"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${sectors
                              .find((s) => s.id === activeSector)
                              ?.color.split(" ")
                              .slice(1)
                              .join(" ")})`,
                          }}
                        />

                        <div className="mt-2 flex justify-end">
                          <a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm font-medium"
                            style={{
                              color: sectors
                                .find((s) => s.id === activeSector)
                                ?.color.includes("blue")
                                ? "#3b82f6"
                                : sectors
                                      .find((s) => s.id === activeSector)
                                      ?.color.includes("emerald")
                                  ? "#10b981"
                                  : sectors
                                        .find((s) => s.id === activeSector)
                                        ?.color.includes("rose")
                                    ? "#f43f5e"
                                    : sectors
                                          .find((s) => s.id === activeSector)
                                          ?.color.includes("amber")
                                      ? "#f59e0b"
                                      : "#8b5cf6",
                            }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Visit website
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selected Partner Modal */}
          <AnimatePresence>
            {selectedPartner && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
                onClick={() => setSelectedPartner(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedPartner(null)}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                  >
                    ✕
                  </button>

                  <div className="flex flex-col items-center">
                    <div className="flex h-20 items-center justify-center">
                      <div className="relative h-16 w-[160px]">
                        <Image
                          src={
                            selectedPartner.logo ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={selectedPartner.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedPartner.name}
                    </h3>

                    <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                      {selectedPartner.description}
                    </p>

                    <a
                      href={selectedPartner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center rounded-md bg-gradient-to-r px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${sectors
                          .find((s) => s.id === activeSector)
                          ?.color.split(" ")
                          .slice(1)
                          .join(" ")})`,
                      }}
                    >
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SectorWheelPartners;
