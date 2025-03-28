"use client";

import type React from "react";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  Users,
  TrendingUp,
  Star,
  BarChart,
  CheckCircle,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Milestone = {
  id: number;
  year: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  color: string;
};

const milestones: Milestone[] = [
  {
    id: 1,
    year: 2018,
    title: "Company Founded",
    description:
      "Our journey began with a vision to transform the industry with innovative solutions that address real customer needs.",
    icon: <Star className="h-6 w-6" />,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    stats: [
      { label: "Initial Team", value: "5" },
      { label: "First Clients", value: "3" },
      { label: "Funding", value: "$500K" },
    ],
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 2,
    year: 2019,
    title: "Product Launch",
    description:
      "After months of development and testing, we launched our flagship product to the market, receiving positive feedback from early adopters.",
    icon: <TrendingUp className="h-6 w-6" />,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    stats: [
      { label: "Beta Users", value: "250+" },
      { label: "Features", value: "15" },
      { label: "Uptime", value: "99.9%" },
    ],
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    year: 2020,
    title: "Rapid Growth",
    description:
      "Our customer base expanded rapidly as word spread about our product's effectiveness and our exceptional customer service.",
    icon: <Users className="h-6 w-6" />,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    stats: [
      { label: "New Customers", value: "1,200+" },
      { label: "Team Size", value: "25" },
      { label: "Revenue Growth", value: "300%" },
    ],
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    year: 2021,
    title: "Industry Recognition",
    description:
      "Our hard work paid off with multiple industry awards and recognition from leading analysts for our innovative approach.",
    icon: <Award className="h-6 w-6" />,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    stats: [
      { label: "Awards Won", value: "5" },
      { label: "Press Features", value: "20+" },
      { label: "Customer Rating", value: "4.8/5" },
    ],
    color: "from-emerald-500 to-green-500",
  },
  {
    id: 5,
    year: 2022,
    title: "Global Expansion",
    description:
      "We expanded our operations globally, opening new offices and supporting customers across multiple continents.",
    icon: <BarChart className="h-6 w-6" />,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    stats: [
      { label: "Countries", value: "15+" },
      { label: "Languages", value: "8" },
      { label: "Global Team", value: "100+" },
    ],
    color: "from-red-500 to-rose-500",
  },
  {
    id: 6,
    year: 2023,
    title: "Enterprise Solutions",
    description:
      "We launched our enterprise solution suite, bringing our powerful tools to larger organizations with complex needs.",
    icon: <CheckCircle className="h-6 w-6" />,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    stats: [
      { label: "Enterprise Clients", value: "50+" },
      { label: "Integrations", value: "30+" },
      { label: "Data Processed", value: "10TB+/day" },
    ],
    color: "from-cyan-500 to-blue-500",
  },
];

const MilestoneParallaxTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute left-0 top-0 h-full w-full opacity-[0.15] dark:opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="diagonalLines"
              patternUnits="userSpaceOnUse"
              width="40"
              height="40"
              patternTransform="rotate(45)"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="40"
                stroke="currentColor"
                strokeWidth="1"
                className="text-slate-400 dark:text-slate-600"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)" />
        </svg>

        {/* Decorative elements */}
        <div className="absolute right-0 top-0 h-1/3 w-1/3 rounded-full bg-gradient-to-b from-indigo-200/30 to-purple-200/30 opacity-70 blur-3xl dark:from-indigo-900/20 dark:to-purple-900/20 dark:opacity-40" />
        <div className="absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-gradient-to-t from-blue-200/30 to-cyan-200/30 opacity-70 blur-3xl dark:from-blue-900/20 dark:to-cyan-900/20 dark:opacity-40" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl"
          >
            Our Journey to Success
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Explore our growth story and the milestones that have shaped our
            company
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute bottom-0 left-1/2 top-0 w-1 -translate-x-1/2 transform rounded-full bg-gradient-to-b from-indigo-200 via-purple-300 to-blue-200 dark:from-indigo-900 dark:via-purple-800 dark:to-blue-900"
            style={{
              scaleY: scrollYProgress,
            }}
            initial={{ scaleY: 0 }}
          />

          {/* Timeline items */}
          <div className="space-y-32">
            {milestones.map((milestone, index) => (
              <TimelineItem
                key={milestone.id}
                milestone={milestone}
                index={index}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Current status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-block rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
            <div className="rounded-full bg-white px-6 py-3 dark:bg-slate-800">
              <h3 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                Today: Serving 10,000+ customers worldwide
              </h3>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="rounded-xl bg-white p-6 text-center shadow-md dark:bg-slate-800">
              <div className="mb-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                98%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Customer Satisfaction
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-md dark:bg-slate-800">
              <div className="mb-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                24/7
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Customer Support
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-md dark:bg-slate-800">
              <div className="mb-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                99.99%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Uptime Reliability
              </div>
            </div>
            <div className="rounded-xl bg-white p-6 text-center shadow-md dark:bg-slate-800">
              <div className="mb-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                15+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Industry Awards
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Timeline Item Component
const TimelineItem = ({
  milestone,
  index,
  scrollYProgress,
}: {
  milestone: Milestone;
  index: number;
  scrollYProgress: any;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: itemProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "center center"],
  });

  // Calculate progress for this specific item
  const opacity = useTransform(itemProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(itemProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const y = useTransform(itemProgress, [0, 0.5, 1], [50, 0, -50]);

  // Alternate layout direction for even/odd
  const isEven = index % 2 === 0;

  return (
    <div ref={itemRef} className="relative">
      {/* Year marker */}
      <div className="absolute left-1/2 z-10 flex h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-4 border-indigo-500 bg-white shadow-lg dark:border-indigo-400 dark:bg-slate-800">
        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          {milestone.year}
        </span>
      </div>

      {/* Content */}
      <motion.div
        className={`grid gap-8 md:grid-cols-2 ${isEven ? "md:text-right" : ""}`}
        style={{ opacity, scale, y }}
      >
        <div className={`${isEven ? "md:order-1" : ""}`}>
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
            <div
              className={`inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${milestone.color} mb-4 text-white`}
            >
              {milestone.icon}
            </div>

            <h3 className="mb-2 text-2xl font-bold text-slate-800 dark:text-white">
              {milestone.title}
            </h3>

            <p className="mb-6 text-slate-600 dark:text-slate-300">
              {milestone.description}
            </p>

            {milestone.stats && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {milestone.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`text-center ${isEven ? "md:text-right" : "md:text-left"}`}
                  >
                    <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {milestone.image && (
          <div className="relative">
            <div className="aspect-[3/2] overflow-hidden rounded-xl shadow-lg">
              <Image
                src={
                  milestone.image ||
                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                }
                alt={milestone.title}
                fill
                className="object-cover"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-20 mix-blend-overlay`}
              />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default MilestoneParallaxTimeline;
