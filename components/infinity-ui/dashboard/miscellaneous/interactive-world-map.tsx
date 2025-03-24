"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  TrendingUp,
  Users,
  ArrowRight,
  Search,
  X,
  Info,
} from "lucide-react";

interface RegionData {
  id: string;
  name: string;
  code: string;
  value: number;
  growth: number;
  users: number;
  color: string;
}

const InteractiveWorldMap = () => {
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipRegion, setTooltipRegion] = useState<RegionData | null>(null);
  const mapRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockRegions: RegionData[] = [
          {
            id: "1",
            name: "North America",
            code: "na",
            value: 4250000,
            growth: 12.3,
            users: 1250000,
            color: "#3b82f6",
          },
          {
            id: "2",
            name: "South America",
            code: "sa",
            value: 2180000,
            growth: 18.7,
            users: 780000,
            color: "#10b981",
          },
          {
            id: "3",
            name: "Europe",
            code: "eu",
            value: 3950000,
            growth: 8.2,
            users: 1420000,
            color: "#8b5cf6",
          },
          {
            id: "4",
            name: "Africa",
            code: "af",
            value: 1680000,
            growth: 24.5,
            users: 620000,
            color: "#f59e0b",
          },
          {
            id: "5",
            name: "Asia",
            code: "as",
            value: 5720000,
            growth: 15.8,
            users: 2180000,
            color: "#ec4899",
          },
          {
            id: "6",
            name: "Oceania",
            code: "oc",
            value: 980000,
            growth: 9.4,
            users: 340000,
            color: "#06b6d4",
          },
        ];

        setRegions(mockRegions);
        setSelectedRegion(mockRegions[0]);
        setError(null);
      } catch (err) {
        setError("Failed to load region data. Please try again later.");
        console.error("Error fetching region data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const handleRegionHover = (region: RegionData, e: React.MouseEvent) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setTooltipRegion(region);
      setShowTooltip(true);
    }
  };

  const handleRegionLeave = () => {
    setShowTooltip(false);
  };

  const filteredRegions = searchQuery
    ? regions.filter((region) =>
        region.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : regions;

  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Global Performance
            </h3>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search regions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400"
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Map Visualization */}
        <div className="col-span-2 p-4">
          {loading ? (
            <div className="flex h-[400px] flex-col items-center justify-center">
              <motion.div
                className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-blue-500"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Loading map data...
              </p>
            </div>
          ) : error ? (
            <div className="flex h-[400px] flex-col items-center justify-center">
              <div className="rounded-full bg-red-100 p-3 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                <Info className="h-8 w-8" />
              </div>
              <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                {error}
              </p>
              <button
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : (
            <div className="relative h-[400px]">
              <svg
                ref={mapRef}
                viewBox="0 0 1000 500"
                className="h-full w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Simplified world map paths */}
                <motion.path
                  d="M170,80 L300,80 L320,150 L250,200 L150,170 Z"
                  fill={regions[0]?.color || "#ccc"}
                  stroke="#fff"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  onMouseMove={(e) => handleRegionHover(regions[0], e)}
                  onMouseLeave={handleRegionLeave}
                  onClick={() => setSelectedRegion(regions[0])}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                />
                <motion.path
                  d="M200,220 L300,250 L280,350 L180,320 Z"
                  fill={regions[1]?.color || "#ccc"}
                  stroke="#fff"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  onMouseMove={(e) => handleRegionHover(regions[1], e)}
                  onMouseLeave={handleRegionLeave}
                  onClick={() => setSelectedRegion(regions[1])}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                />
                <motion.path
                  d="M450,100 L550,80 L580,150 L520,180 L470,160 Z"
                  fill={regions[2]?.color || "#ccc"}
                  stroke="#fff"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  onMouseMove={(e) => handleRegionHover(regions[2], e)}
                  onMouseLeave={handleRegionLeave}
                  onClick={() => setSelectedRegion(regions[2])}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                />
                <motion.path
                  d="M450,200 L550,200 L580,320 L480,350 L430,300 Z"
                  fill={regions[3]?.color || "#ccc"}
                  stroke="#fff"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  onMouseMove={(e) => handleRegionHover(regions[3], e)}
                  onMouseLeave={handleRegionLeave}
                  onClick={() => setSelectedRegion(regions[3])}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                />
                <motion.path
                  d="M650,100 L800,120 L780,250 L650,230 Z"
                  fill={regions[4]?.color || "#ccc"}
                  stroke="#fff"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  onMouseMove={(e) => handleRegionHover(regions[4], e)}
                  onMouseLeave={handleRegionLeave}
                  onClick={() => setSelectedRegion(regions[4])}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                />
                <motion.path
                  d="M800,300 L850,320 L830,350 L780,340 Z"
                  fill={regions[5]?.color || "#ccc"}
                  stroke="#fff"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  onMouseMove={(e) => handleRegionHover(regions[5], e)}
                  onMouseLeave={handleRegionLeave}
                  onClick={() => setSelectedRegion(regions[5])}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                />

                {/* Pulsing dots for major cities */}
                <motion.circle
                  cx="220"
                  cy="120"
                  r="5"
                  fill="#fff"
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.2,
                  }}
                />
                <motion.circle
                  cx="500"
                  cy="130"
                  r="5"
                  fill="#fff"
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.5,
                  }}
                />
                <motion.circle
                  cx="720"
                  cy="150"
                  r="5"
                  fill="#fff"
                  initial={{ opacity: 0.5, scale: 0.8 }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: 0.8,
                  }}
                />

                {/* Tooltip */}
                {showTooltip && tooltipRegion && (
                  <foreignObject
                    x={tooltipPosition.x + 10}
                    y={tooltipPosition.y + 10}
                    width="150"
                    height="100"
                    style={{ overflow: "visible" }}
                  >
                    <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {tooltipRegion.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        ${formatNumber(tooltipRegion.value)} revenue
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {formatNumber(tooltipRegion.users)} users
                      </p>
                    </div>
                  </foreignObject>
                )}
              </svg>
            </div>
          )}
        </div>

        {/* Region Details */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-800 md:border-l md:border-t-0">
          <h4 className="mb-4 font-medium text-gray-900 dark:text-white">
            Region Details
          </h4>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div className="mt-2 h-8 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Unable to load region details
            </p>
          ) : (
            <div>
              <div className="mb-6 space-y-4">
                <AnimatePresence mode="wait">
                  {filteredRegions.length > 0 ? (
                    <motion.div
                      key="regions-list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <div className="mb-4 space-y-2">
                        {filteredRegions.map((region) => (
                          <motion.div
                            key={region.id}
                            className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                              selectedRegion?.id === region.id
                                ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                                : "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-900 dark:hover:bg-blue-900/10"
                            }`}
                            onClick={() => setSelectedRegion(region)}
                            whileHover={{ y: -2 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-3 w-3 rounded-full"
                                  style={{ backgroundColor: region.color }}
                                ></div>
                                <span className="font-medium text-gray-900 dark:text-white">
                                  {region.name}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                ${formatNumber(region.value)}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-regions"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-8 text-center"
                    >
                      <Globe className="mb-2 h-10 w-10 text-gray-400" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No regions match your search
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {selectedRegion && (
                <motion.div
                  key={selectedRegion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                >
                  <h5 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedRegion.name}
                  </h5>

                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Revenue
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        ${formatNumber(selectedRegion.value)}
                      </p>
                      <div className="mt-1 flex items-center text-xs">
                        <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                        <span className="text-green-500">
                          +{selectedRegion.growth}%
                        </span>
                        <span className="ml-1 text-gray-500 dark:text-gray-400">
                          vs last year
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Users
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        {formatNumber(selectedRegion.users)}
                      </p>
                      <div className="mt-1 flex items-center text-xs">
                        <Users className="mr-1 h-3 w-3 text-blue-500" />
                        <span className="text-blue-500">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">
                        Regional contribution
                      </span>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {Math.round(
                          (selectedRegion.value /
                            regions.reduce((sum, r) => sum + r.value, 0)) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: selectedRegion.color }}
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.round((selectedRegion.value / regions.reduce((sum, r) => sum + r.value, 0)) * 100)}%`,
                        }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  <button className="mt-4 flex w-full items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    View detailed report
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveWorldMap;
