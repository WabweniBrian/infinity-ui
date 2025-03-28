"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Filter, Search, X, ExternalLink } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

// partner data with categories
const partners = [
  {
    id: 1,
    name: "Acme Corporation",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "technology",
    description: "Leading provider of cloud infrastructure and services.",
    website: "https://example.com",
  },
  {
    id: 2,
    name: "TechGiant",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "technology",
    description: "Innovative solutions for enterprise businesses.",
    website: "https://example.com",
  },
  {
    id: 3,
    name: "Globex",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "finance",
    description: "Global financial services and investment solutions.",
    website: "https://example.com",
  },
  {
    id: 4,
    name: "Initech",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "technology",
    description: "Software development and IT consulting services.",
    website: "https://example.com",
  },
  {
    id: 5,
    name: "Umbrella Corp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "healthcare",
    description: "Pharmaceutical research and healthcare solutions.",
    website: "https://example.com",
  },
  {
    id: 6,
    name: "Stark Industries",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "manufacturing",
    description: "Advanced manufacturing and engineering services.",
    website: "https://example.com",
  },
  {
    id: 7,
    name: "Wayne Enterprises",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "finance",
    description: "Investment and philanthropic foundation.",
    website: "https://example.com",
  },
  {
    id: 8,
    name: "Cyberdyne Systems",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "technology",
    description: "Robotics and artificial intelligence research.",
    website: "https://example.com",
  },
  {
    id: 9,
    name: "Oscorp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "healthcare",
    description: "Biotechnology research and medical innovations.",
    website: "https://example.com",
  },
  {
    id: 10,
    name: "LexCorp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "manufacturing",
    description: "Industrial manufacturing and engineering solutions.",
    website: "https://example.com",
  },
  {
    id: 11,
    name: "Massive Dynamic",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "technology",
    description: "Cutting-edge technology research and development.",
    website: "https://example.com",
  },
  {
    id: 12,
    name: "Tyrell Corporation",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    category: "manufacturing",
    description: "Advanced manufacturing and bioengineering.",
    website: "https://example.com",
  },
];

// Extract unique categories
const categories = [
  "all",
  ...Array.from(new Set(partners.map((partner) => partner.category))),
];

// Category colors
const categoryColors: Record<string, string> = {
  all: "bg-gray-600 dark:bg-gray-400",
  technology: "bg-blue-600 dark:bg-blue-400",
  finance: "bg-emerald-600 dark:bg-emerald-400",
  healthcare: "bg-rose-600 dark:bg-rose-400",
  manufacturing: "bg-amber-600 dark:bg-amber-400",
};

const PartnerCard = ({ partner }: { partner: (typeof partners)[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 dark:bg-slate-800"
    >
      {/* Category indicator */}
      <div
        className={`absolute left-0 top-0 h-1 w-full ${categoryColors[partner.category]}`}
      />

      <div className="flex flex-col p-6">
        <div className="flex items-center justify-between">
          <div className="flex h-8 items-center">
            <span
              className={`mr-2 inline-block h-2 w-2 rounded-full ${categoryColors[partner.category]}`}
            />
            <span className="text-xs font-medium capitalize text-gray-600 dark:text-gray-400">
              {partner.category}
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
          >
            {isExpanded ? (
              <X className="h-4 w-4" />
            ) : (
              <ExternalLink className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="mt-4 flex h-24 items-center justify-center">
          <div className="relative h-16 w-[160px]">
            <Image
              src={
                partner.logo ||
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
              }
              alt={partner.name}
              fill
              className="object-contain transition-all duration-300 group-hover:scale-105"
            />
          </div>
        </div>

        <h3 className="mt-4 text-center text-lg font-medium text-gray-900 dark:text-white">
          {partner.name}
        </h3>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {partner.description}
              </p>

              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Visit Website
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const InteractivePartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter partners based on category and search query
  const filteredPartners = partners.filter((partner) => {
    const matchesCategory =
      selectedCategory === "all" || partner.category === selectedCategory;
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-100 py-24 dark:bg-slate-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div
          className="absolute h-96 w-96 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-900/20"
          style={{ top: "10%", left: "10%" }}
        />
        <div
          className="absolute h-96 w-96 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-900/20"
          style={{ bottom: "10%", right: "10%" }}
        />
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
              Partner Network
            </span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Explore our diverse ecosystem of partners across various industries
          </p>
        </motion.div>

        {/* Filter and Search Controls */}
        <div className="mt-12 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-10 items-center rounded-lg bg-white px-3 dark:bg-slate-800">
              <Filter className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter:
              </span>
            </div>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
                }`}
              >
                <span className="capitalize">{category}</span>
                {selectedCategory === category && category !== "all" && (
                  <span
                    className={`ml-2 inline-block h-2 w-2 rounded-full ${categoryColors[category]}`}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-auto">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search partners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border-0 bg-white py-2 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-slate-800 dark:text-white dark:ring-gray-700 dark:placeholder:text-gray-500 dark:focus:ring-blue-500 sm:w-64"
            />
          </div>
        </div>

        {/* Partners Grid */}
        <motion.div layout className="mt-8">
          <AnimatePresence>
            {filteredPartners.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filteredPartners.map((partner) => (
                  <PartnerCard key={partner.id} partner={partner} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-16 text-center"
              >
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  No partners found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractivePartners;
