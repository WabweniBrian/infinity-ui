"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Palette,
  Lightbulb,
  BarChart,
  Zap,
  MessageSquare,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  specialty:
    | "design"
    | "development"
    | "strategy"
    | "marketing"
    | "product"
    | "communication";
  bio: string;
  imageUrl: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "UI/UX Designer",
    specialty: "design",
    bio: "Creates beautiful interfaces with a focus on user experience and accessibility.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 2,
    name: "Jamie Chen",
    role: "Frontend Developer",
    specialty: "development",
    bio: "Builds responsive and performant web applications using modern frameworks.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 3,
    name: "Taylor Smith",
    role: "Product Strategist",
    specialty: "strategy",
    bio: "Develops product roadmaps and strategies to meet user needs and business goals.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 4,
    name: "Jordan Lee",
    role: "Marketing Specialist",
    specialty: "marketing",
    bio: "Creates campaigns that connect our products with the right audiences.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 5,
    name: "Casey Wilson",
    role: "Product Manager",
    specialty: "product",
    bio: "Oversees product development from conception to launch with a user-centered approach.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 6,
    name: "Riley Johnson",
    role: "Content Strategist",
    specialty: "communication",
    bio: "Crafts compelling narratives and content that resonates with our users.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 7,
    name: "Avery Williams",
    role: "Visual Designer",
    specialty: "design",
    bio: "Creates stunning visuals and illustrations that bring our brand to life.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 8,
    name: "Morgan Taylor",
    role: "Backend Developer",
    specialty: "development",
    bio: "Builds robust and scalable server-side solutions for our applications.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 9,
    name: "Quinn Martinez",
    role: "Data Analyst",
    specialty: "strategy",
    bio: "Analyzes user data to provide insights that drive product decisions.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
];

const getSpecialtyIcon = (specialty: TeamMember["specialty"]) => {
  switch (specialty) {
    case "design":
      return <Palette className="text-pink-500" size={24} />;
    case "development":
      return <Code className="text-blue-500" size={24} />;
    case "strategy":
      return <Lightbulb className="text-amber-500" size={24} />;
    case "marketing":
      return <BarChart className="text-emerald-500" size={24} />;
    case "product":
      return <Zap className="text-purple-500" size={24} />;
    case "communication":
      return <MessageSquare className="text-cyan-500" size={24} />;
    default:
      return <Lightbulb className="text-amber-500" size={24} />;
  }
};

const getSpecialtyColor = (specialty: TeamMember["specialty"]) => {
  switch (specialty) {
    case "design":
      return "bg-pink-500/10 border-pink-500/30 hover:border-pink-500";
    case "development":
      return "bg-blue-500/10 border-blue-500/30 hover:border-blue-500";
    case "strategy":
      return "bg-amber-500/10 border-amber-500/30 hover:border-amber-500";
    case "marketing":
      return "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500";
    case "product":
      return "bg-purple-500/10 border-purple-500/30 hover:border-purple-500";
    case "communication":
      return "bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500";
    default:
      return "bg-slate-500/10 border-slate-500/30 hover:border-slate-500";
  }
};

const TeamSpecialtyGrid = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<
    TeamMember["specialty"] | "all"
  >("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredMembers =
    selectedFilter === "all"
      ? teamMembers
      : teamMembers.filter((member) => member.specialty === selectedFilter);

  return (
    <section className="min-h-screen overflow-hidden bg-white py-20 dark:bg-slate-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl">
            Our{" "}
            <span className="relative">
              <span className="relative z-10">Expert Team</span>
              <motion.span
                className="absolute bottom-1 left-0 right-0 z-0 h-3 bg-yellow-300 opacity-40 dark:bg-yellow-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Meet the talented individuals who make our company thrive through
            collaboration and expertise.
          </p>

          {/* Filter buttons */}
          <div className="mb-12 flex flex-wrap justify-center gap-2">
            <FilterButton
              active={selectedFilter === "all"}
              onClick={() => setSelectedFilter("all")}
            >
              All
            </FilterButton>
            <FilterButton
              active={selectedFilter === "design"}
              onClick={() => setSelectedFilter("design")}
              icon={<Palette size={16} />}
            >
              Design
            </FilterButton>
            <FilterButton
              active={selectedFilter === "development"}
              onClick={() => setSelectedFilter("development")}
              icon={<Code size={16} />}
            >
              Development
            </FilterButton>
            <FilterButton
              active={selectedFilter === "strategy"}
              onClick={() => setSelectedFilter("strategy")}
              icon={<Lightbulb size={16} />}
            >
              Strategy
            </FilterButton>
            <FilterButton
              active={selectedFilter === "marketing"}
              onClick={() => setSelectedFilter("marketing")}
              icon={<BarChart size={16} />}
            >
              Marketing
            </FilterButton>
            <FilterButton
              active={selectedFilter === "product"}
              onClick={() => setSelectedFilter("product")}
              icon={<Zap size={16} />}
            >
              Product
            </FilterButton>
            <FilterButton
              active={selectedFilter === "communication"}
              onClick={() => setSelectedFilter("communication")}
              icon={<MessageSquare size={16} />}
            >
              Communication
            </FilterButton>
          </div>
        </motion.div>

        {/* Specialty grid */}
        <div ref={containerRef} className="relative mx-auto max-w-6xl">
          <motion.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <AnimatePresence>
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredId(member.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <motion.div
                    className={`relative h-64 rounded-lg border-2 transition-colors duration-300 ${getSpecialtyColor(member.specialty)}`}
                    whileHover={{ y: -5 }}
                    animate={{
                      scale: hoveredId === member.id ? 1.03 : 1,
                      boxShadow:
                        hoveredId === member.id
                          ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                          : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {/* Image */}
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                      <Image
                        src={
                          member.imageUrl ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                        }
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4">
                      <div className="absolute right-3 top-3">
                        {getSpecialtyIcon(member.specialty)}
                      </div>

                      <h3 className="text-lg font-bold leading-tight text-white">
                        {member.name}
                      </h3>
                      <p className="text-sm text-white/80">{member.role}</p>
                    </div>

                    {/* Hover content */}
                    <motion.div
                      className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/80 p-4 text-center backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === member.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="mb-2">
                        {getSpecialtyIcon(member.specialty)}
                      </div>
                      <h3 className="mb-1 text-lg font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="mb-2 text-sm text-white/80">
                        {member.role}
                      </p>
                      <p className="text-xs text-white/70">{member.bio}</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FilterButton = ({
  children,
  active,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-indigo-600 text-white"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
      }`}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default TeamSpecialtyGrid;
