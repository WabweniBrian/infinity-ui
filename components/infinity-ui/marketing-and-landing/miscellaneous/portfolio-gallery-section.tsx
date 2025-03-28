"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, Filter } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const PortfolioGallerySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [expandedItem, setExpandedItem] = useState<number | null>(null);

  const filters = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Design" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "branding", name: "Branding" },
  ];

  const projects = [
    {
      id: 1,
      title: "Eco-Commerce Platform",
      category: "web",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      client: "GreenLife",
      description:
        "A sustainable e-commerce platform with carbon footprint tracking for eco-conscious consumers.",
      tags: ["React", "Node.js", "Tailwind CSS"],
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: 2,
      title: "Fitness Tracking App",
      category: "mobile",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      client: "FitTrack",
      description:
        "A comprehensive fitness app with personalized workout plans and nutrition tracking.",
      tags: ["React Native", "Firebase", "Redux"],
      color: "from-blue-500 to-indigo-500",
    },
    {
      id: 3,
      title: "Creative Agency Rebrand",
      category: "branding",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      client: "Artisan Studios",
      description:
        "Complete brand identity redesign for a growing creative agency, including logo, color palette, and brand guidelines.",
      tags: ["Branding", "Logo Design", "Identity"],
      color: "from-rose-500 to-pink-500",
    },
    {
      id: 4,
      title: "Financial Dashboard",
      category: "web",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      client: "WealthWise",
      description:
        "An intuitive financial dashboard with real-time data visualization and predictive analytics.",
      tags: ["Vue.js", "D3.js", "Express"],
      color: "from-amber-500 to-orange-500",
    },
    {
      id: 5,
      title: "Travel Companion App",
      category: "mobile",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      client: "Wanderlust",
      description:
        "A travel app with AI-powered recommendations, itinerary planning, and offline maps.",
      tags: ["Flutter", "TensorFlow", "GraphQL"],
      color: "from-violet-500 to-purple-500",
    },
    {
      id: 6,
      title: "Restaurant Brand Identity",
      category: "branding",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      client: "Savory",
      description:
        "Comprehensive brand identity for a farm-to-table restaurant chain, including menus, signage, and packaging.",
      tags: ["Branding", "Print Design", "Packaging"],
      color: "from-red-500 to-rose-500",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="portfolio-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#portfolio-pattern)" />
          </svg>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute right-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-emerald-300/20 to-teal-300/20 blur-3xl dark:from-emerald-900/10 dark:to-teal-900/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-violet-300/20 to-purple-300/20 blur-3xl dark:from-violet-900/10 dark:to-purple-900/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-emerald-500"></span>
            <span className="mx-2 font-medium text-emerald-500">OUR WORK</span>
            <span className="h-1 w-12 rounded-full bg-emerald-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Showcasing our
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {" "}
              creative portfolio
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Explore our diverse collection of projects showcasing our expertise
            across web design, mobile apps, and branding.
          </p>

          {/* Filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-xl px-6 py-2 text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.id === "all" ? (
                  filter.name
                ) : (
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    {filter.name}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredItem(project.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() =>
                  setExpandedItem(
                    expandedItem === project.id ? null : project.id,
                  )
                }
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
                ></div>

                <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-lg transition-colors duration-300 group-hover:border-transparent dark:border-gray-700/50 dark:bg-gray-800">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}
                    ></div>
                    <Image
                      src={
                        project.image ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={project.title}
                      fill
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <button className="inline-flex items-center rounded-lg border border-white/30 bg-white/20 px-4 py-2 font-medium text-white backdrop-blur-sm">
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <span
                        className={`rounded-full bg-gradient-to-r px-2 py-1 text-xs ${project.color} text-white`}
                      >
                        {filters.find((f) => f.id === project.category)?.name}
                      </span>
                    </div>

                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                      {expandedItem === project.id
                        ? project.description
                        : `${project.description.substring(0, 80)}...`}
                    </p>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Client: {project.client}
                      </span>
                      <button className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {expandedItem === project.id
                          ? "Show less"
                          : "Read more"}
                        <ArrowRight
                          className={`ml-1 h-4 w-4 transition-transform duration-300 ${expandedItem === project.id ? "rotate-90" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
            Interested in working with us? Let&apos;s create something amazing
            together.
          </p>
          <button className="inline-flex transform items-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl hover:shadow-emerald-500/25">
            Start a Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioGallerySection;
