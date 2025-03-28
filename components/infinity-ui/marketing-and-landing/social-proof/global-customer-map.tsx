"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Globe, TrendingUp, ChevronRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Region = {
  id: string;
  name: string;
  customers: number;
  growth: number;
  color: string;
  coordinates: {
    x: number;
    y: number;
  };
  countries: string[];
};

const regions: Region[] = [
  {
    id: "na",
    name: "North America",
    customers: 4250,
    growth: 32,
    color: "bg-blue-500",
    coordinates: { x: 20, y: 30 },
    countries: ["United States", "Canada", "Mexico"],
  },
  {
    id: "sa",
    name: "South America",
    customers: 1850,
    growth: 45,
    color: "bg-green-500",
    coordinates: { x: 30, y: 60 },
    countries: ["Brazil", "Argentina", "Colombia", "Chile"],
  },
  {
    id: "eu",
    name: "Europe",
    customers: 3750,
    growth: 28,
    color: "bg-purple-500",
    coordinates: { x: 48, y: 28 },
    countries: [
      "United Kingdom",
      "Germany",
      "France",
      "Italy",
      "Spain",
      "Netherlands",
    ],
  },
  {
    id: "af",
    name: "Africa",
    customers: 950,
    growth: 62,
    color: "bg-amber-500",
    coordinates: { x: 48, y: 50 },
    countries: ["South Africa", "Nigeria", "Kenya", "Egypt", "Morocco"],
  },
  {
    id: "as",
    name: "Asia",
    customers: 3200,
    growth: 54,
    color: "bg-red-500",
    coordinates: { x: 70, y: 35 },
    countries: [
      "Japan",
      "China",
      "India",
      "Singapore",
      "South Korea",
      "Indonesia",
    ],
  },
  {
    id: "oc",
    name: "Oceania",
    customers: 850,
    growth: 36,
    color: "bg-cyan-500",
    coordinates: { x: 85, y: 65 },
    countries: ["Australia", "New Zealand"],
  },
];

const GlobalCustomerMap = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  const totalCustomers = regions.reduce(
    (sum, region) => sum + region.customers,
    0,
  );

  const handleRegionHover = (regionId: string, x: number, y: number) => {
    setActiveRegion(regionId);
    setShowTooltip(true);
    setTooltipPosition({ x, y });
  };

  const handleRegionLeave = () => {
    setShowTooltip(false);
  };

  // Responsive positioning for pins
  useEffect(() => {
    const handleResize = () => {
      setShowTooltip(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900 dark:to-slate-800">
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2U9InJnYmEoMCwwLDAsMC4wNSkiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMDUpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTMwIDBIMHYzMGgzMHoiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxwYXRoIGQ9Ik0zMCAwaDMwdjMwSDMweiIgc3Ryb2tlPSJyZ2JhKDAsMCwwLDAuMDUpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-[0.15] dark:opacity-[0.07]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl"
          >
            Global Customer Reach
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Trusted by over {totalCustomers.toLocaleString()} customers across
            50+ countries
          </motion.p>
        </div>

        {/* World Map */}
        <div className="relative mx-auto mb-16 max-w-5xl">
          <div
            ref={mapRef}
            className="relative aspect-[2/1] overflow-hidden rounded-xl bg-slate-100 shadow-lg dark:bg-slate-800"
          >
            {/* Map SVG */}
            <svg
              viewBox="0 0 100 50"
              className="absolute inset-0 h-full w-full"
              style={{ filter: "drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.1))" }}
            >
              <defs>
                <pattern
                  id="dots-pattern"
                  width="4"
                  height="4"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="1"
                    cy="1"
                    r="0.5"
                    fill="currentColor"
                    className="text-slate-300 dark:text-slate-600"
                  />
                </pattern>
              </defs>
              <rect width="100" height="50" fill="url(#dots-pattern)" />

              {/* Simplified continent outlines - for illustration purposes */}
              <path
                d="M15,20 Q20,15 25,20 Q30,25 35,20 Q40,15 45,20 Q50,25 55,20 L55,35 Q50,40 45,35 Q40,30 35,35 Q30,40 25,35 Q20,30 15,35 Z"
                fill="currentColor"
                className="text-slate-200 dark:text-slate-700"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M45,25 Q50,20 55,25 Q60,30 65,25 Q70,20 75,25 L75,40 Q70,45 65,40 Q60,35 55,40 Q50,45 45,40 Z"
                fill="currentColor"
                className="text-slate-200 dark:text-slate-700"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M25,45 Q30,40 35,45 Q40,50 45,45 L45,55 Q40,60 35,55 Q30,50 25,55 Z"
                fill="currentColor"
                className="text-slate-200 dark:text-slate-700"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M80,50 Q85,45 90,50 L90,60 Q85,65 80,60 Z"
                fill="currentColor"
                className="text-slate-200 dark:text-slate-700"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

            {/* Region pins */}
            {regions.map((region) => (
              <motion.div
                key={region.id}
                className="absolute"
                style={{
                  left: `${region.coordinates.x}%`,
                  top: `${region.coordinates.y}%`,
                }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: Math.random() * 0.5,
                }}
                whileHover={{ scale: 1.2 }}
                onMouseEnter={(e) => {
                  const rect = mapRef.current?.getBoundingClientRect();
                  if (rect) {
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    handleRegionHover(region.id, x, y);
                  }
                }}
                onMouseLeave={handleRegionLeave}
              >
                <div
                  className={`h-4 w-4 ${region.color} relative flex items-center justify-center rounded-full shadow-lg`}
                >
                  <div
                    className={`absolute h-8 w-8 ${region.color} animate-ping rounded-full opacity-30`}
                  />
                  <MapPin className="h-3 w-3 text-white" />
                </div>
              </motion.div>
            ))}

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && activeRegion && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-40 w-64 rounded-lg bg-white p-4 shadow-xl dark:bg-slate-700"
                  style={{
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y}px`,
                    transform: "translate(-50%, -130%)",
                  }}
                >
                  {regions.find((r) => r.id === activeRegion) && (
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-bold text-slate-800 dark:text-white">
                          {regions.find((r) => r.id === activeRegion)?.name}
                        </h4>
                        <div
                          className={`h-3 w-3 ${regions.find((r) => r.id === activeRegion)?.color} rounded-full`}
                        />
                      </div>

                      <div className="mb-3 grid grid-cols-2 gap-2">
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            {regions
                              .find((r) => r.id === activeRegion)
                              ?.customers.toLocaleString()}{" "}
                            customers
                          </span>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="mr-1 h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            {regions.find((r) => r.id === activeRegion)?.growth}
                            % growth
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        <strong>Countries:</strong>{" "}
                        {regions
                          .find((r) => r.id === activeRegion)
                          ?.countries.join(", ")}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Region stats */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.1 * regions.findIndex((r) => r.id === region.id),
              }}
              className="rounded-lg border border-slate-100 bg-white p-5 shadow-md dark:border-slate-700 dark:bg-slate-800"
              onMouseEnter={() => setActiveRegion(region.id)}
              onMouseLeave={() => setActiveRegion(null)}
            >
              <div className="mb-4 flex items-center">
                <div
                  className={`h-10 w-10 ${region.color} mr-3 flex items-center justify-center rounded-full`}
                >
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  {region.name}
                </h3>
              </div>

              <div className="mb-4 space-y-3">
                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      Customers
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {region.customers.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <motion.div
                      className={`h-full ${region.color}`}
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${(region.customers / 5000) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">
                      Growth
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {region.growth}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <motion.div
                      className={`h-full ${region.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(region.growth / 70) * 100}%` }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>

              <a
                href="#"
                className="flex items-center text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
              >
                View details <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalCustomerMap;
