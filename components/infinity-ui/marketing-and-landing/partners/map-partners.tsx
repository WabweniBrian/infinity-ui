"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

//  partner data with locations
const partners = [
  {
    id: 1,
    name: "Acme Corporation",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    location: "New York, USA",
    description:
      "Global leader in innovative solutions for businesses of all sizes.",
    coordinates: { x: 25, y: 30 },
  },
  {
    id: 2,
    name: "TechGiant",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    location: "San Francisco, USA",
    description: "Pioneering technology solutions for the modern enterprise.",
    coordinates: { x: 15, y: 32 },
  },
  {
    id: 3,
    name: "Globex",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    location: "London, UK",
    description: "Transforming industries through cutting-edge technology.",
    coordinates: { x: 45, y: 25 },
  },
  {
    id: 4,
    name: "Initech",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    location: "Tokyo, Japan",
    description: "Streamlining business processes for over two decades.",
    coordinates: { x: 80, y: 32 },
  },
  {
    id: 5,
    name: "Umbrella Corp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    location: "Sydney, Australia",
    description:
      "Protecting businesses with next-generation security solutions.",
    coordinates: { x: 85, y: 65 },
  },
  {
    id: 6,
    name: "Stark Industries",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    location: "Berlin, Germany",
    description: "Powering the future with sustainable energy solutions.",
    coordinates: { x: 50, y: 27 },
  },
  {
    id: 7,
    name: "Wayne Enterprises",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    location: "Dubai, UAE",
    description:
      "Building a better tomorrow through philanthropic initiatives.",
    coordinates: { x: 58, y: 38 },
  },
  {
    id: 8,
    name: "Cyberdyne Systems",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    location: "Singapore",
    description: "Advancing AI and robotics for a connected world.",
    coordinates: { x: 75, y: 45 },
  },
  {
    id: 9,
    name: "Oscorp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    location: "São Paulo, Brazil",
    description: "Developing breakthrough solutions in biotechnology.",
    coordinates: { x: 30, y: 60 },
  },
  {
    id: 10,
    name: "LexCorp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    location: "Cape Town, South Africa",
    description: "Industrial manufacturing and engineering solutions.",
    coordinates: { x: 52, y: 68 },
  },
];

const MapPartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [selectedPartner, setSelectedPartner] = useState<
    (typeof partners)[0] | null
  >(null);
  const [hoveredPartnerId, setHoveredPartnerId] = useState<number | null>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-slate-950"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/30 dark:to-slate-950" />

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
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
              Global Network
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Partnering with leading organizations around the world
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* World Map */}
          <div className="relative mx-auto aspect-[2/1] max-w-5xl overflow-hidden rounded-xl bg-blue-50 shadow-md dark:bg-slate-800">
            {/* Map SVG - simplified world map outline */}
            <svg
              viewBox="0 0 100 50"
              className="absolute inset-0 h-full w-full text-blue-200 dark:text-blue-900"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified world map paths */}
              <path d="M10,20 Q20,10 30,20 T50,20 T70,20 T90,20 Q95,25 90,30 T70,30 T50,30 T30,30 Q20,35 10,30 Z" />
              <path d="M30,32 Q40,35 50,32 T70,32 Q75,38 70,40 T50,40 Q45,38 40,40 T30,40 Q25,35 30,32 Z" />
            </svg>

            {/* Partner Location Pins */}
            {partners.map((partner) => (
              <motion.div
                key={partner.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: partner.id * 0.1 }}
                className="absolute"
                style={{
                  left: `${partner.coordinates.x}%`,
                  top: `${partner.coordinates.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <button
                  onClick={() => setSelectedPartner(partner)}
                  onMouseEnter={() => setHoveredPartnerId(partner.id)}
                  onMouseLeave={() => setHoveredPartnerId(null)}
                  className="group relative"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                    className="absolute -inset-4 rounded-full bg-blue-500/20 dark:bg-blue-400/20"
                    style={{
                      opacity:
                        hoveredPartnerId === partner.id ||
                        selectedPartner?.id === partner.id
                          ? 0.6
                          : 0,
                    }}
                  />
                  <MapPin className="h-6 w-6 text-blue-600 drop-shadow-md transition-transform group-hover:scale-125 dark:text-blue-400" />
                </button>

                {/* Tooltip on hover */}
                <AnimatePresence>
                  {hoveredPartnerId === partner.id &&
                    selectedPartner?.id !== partner.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute left-1/2 top-full z-40 mt-1 w-40 -translate-x-1/2 rounded-md bg-white p-2 text-center text-xs font-medium shadow-lg dark:bg-slate-700"
                      >
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {partner.name}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {partner.location}
                        </p>
                      </motion.div>
                    )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Selected Partner Modal */}
            <AnimatePresence>
              {selectedPartner && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                >
                  <div className="relative mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-slate-800">
                    <button
                      onClick={() => setSelectedPartner(null)}
                      className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    <div className="flex flex-col items-center">
                      <div className="flex h-20 items-center justify-center">
                        <div className="relative h-12 w-[140px]">
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

                      <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <MapPin className="mr-1 h-4 w-4 text-blue-600 dark:text-blue-400" />
                        {selectedPartner.location}
                      </div>

                      <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                        {selectedPartner.description}
                      </p>

                      <button
                        onClick={() => setSelectedPartner(null)}
                        className="mt-6 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Partner List */}
          <div className="mt-12 block lg:hidden">
            <h3 className="mb-6 text-center text-xl font-semibold text-gray-900 dark:text-white">
              Our Global Partners
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {partners.map((partner) => (
                <motion.div
                  key={partner.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: partner.id * 0.05 }}
                  className="flex items-center rounded-lg bg-white p-4 shadow-sm dark:bg-slate-800"
                  onClick={() => setSelectedPartner(partner)}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>

                  <div className="ml-4">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {partner.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {partner.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapPartners;
