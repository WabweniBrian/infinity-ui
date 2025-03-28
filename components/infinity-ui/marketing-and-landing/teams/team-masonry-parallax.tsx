"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  skills: string[];
  imageUrl: string;
  color: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Eliza Wright",
    role: "Product Designer",
    description:
      "Specializes in user-centered design with a focus on creating intuitive and accessible interfaces.",
    skills: ["UI/UX", "Prototyping", "User Research"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    color: "bg-amber-400",
  },
  {
    id: 2,
    name: "David Park",
    role: "Frontend Architect",
    description:
      "Passionate about building performant and accessible web applications with modern technologies.",
    skills: ["React", "TypeScript", "Accessibility"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    color: "bg-emerald-400",
  },
  {
    id: 3,
    name: "Aisha Johnson",
    role: "Creative Director",
    description:
      "Leads our creative vision with over 10 years of experience in branding and digital design.",
    skills: ["Brand Strategy", "Art Direction", "Team Leadership"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    color: "bg-violet-400",
  },
  {
    id: 4,
    name: "Miguel Santos",
    role: "Motion Designer",
    description:
      "Creates engaging animations and interactive experiences that bring our products to life.",
    skills: ["Animation", "3D Modeling", "Interaction Design"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    color: "bg-blue-400",
  },
  {
    id: 5,
    name: "Zoe Chen",
    role: "Content Strategist",
    description:
      "Crafts compelling narratives and ensures our messaging resonates with our target audience.",
    skills: ["Copywriting", "SEO", "Brand Voice"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    color: "bg-rose-400",
  },
  {
    id: 6,
    name: "Thomas Miller",
    role: "Backend Developer",
    description:
      "Builds robust and scalable server-side solutions that power our applications.",
    skills: ["Node.js", "Databases", "API Design"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    color: "bg-cyan-400",
  },
  {
    id: 7,
    name: "Leila Patel",
    role: "UI Designer",
    description:
      "Creates beautiful and functional user interfaces with attention to detail and user experience.",
    skills: ["Visual Design", "Design Systems", "Figma"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    color: "bg-purple-400",
  },
  {
    id: 8,
    name: "James Wilson",
    role: "DevOps Engineer",
    description:
      "Ensures smooth deployment and operation of our applications in production environments.",
    skills: ["CI/CD", "Cloud Infrastructure", "Monitoring"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    color: "bg-orange-400",
  },
];

const TeamMasonryParallax = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transforms for parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      className="min-h-screen overflow-hidden bg-slate-100 py-20 dark:bg-slate-900"
      ref={containerRef}
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16"
        >
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h2 className="mb-4 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl">
              Our Talented Team
            </h2>
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              A diverse group of creative minds working together to bring
              innovative ideas to life.
            </p>
          </motion.div>

          <motion.div
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 opacity-20 blur-3xl dark:opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {teamMembers.map((member, index) => {
            // Determine which parallax effect to use based on index
            let yValue;
            if (index % 4 === 0) yValue = y1;
            else if (index % 4 === 1) yValue = y2;
            else if (index % 4 === 2) yValue = y3;
            else yValue = y4;

            return (
              <motion.div
                key={member.id}
                style={{ y: yValue }}
                whileHover={{ y: 0 }}
                className={`group relative ${
                  index % 4 === 0
                    ? "sm:mt-8"
                    : index % 4 === 1
                      ? "sm:mt-0"
                      : index % 4 === 2
                        ? "sm:mt-16"
                        : "sm:mt-4"
                }`}
                onMouseEnter={() => setActiveId(member.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 group-hover:shadow-xl dark:bg-slate-800">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={
                        member.imageUrl ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Colored overlay */}
                    <div
                      className={`absolute inset-0 ${member.color} opacity-30 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-40`}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-80" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 p-4">
                    <div
                      className={`h-1 w-10 ${member.color} mb-3 rounded transition-all duration-300 group-hover:w-16`}
                    />
                    <h3 className="mb-1 text-lg font-bold text-slate-800 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                      {member.role}
                    </p>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: activeId === member.id ? "auto" : 0,
                        opacity: activeId === member.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mb-3 text-xs text-slate-600 dark:text-slate-400">
                        {member.description}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {member.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${member.color} bg-opacity-20 text-slate-800 dark:text-white`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Hover indicator */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${member.color}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeId === member.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Decorative elements */}
                <motion.div
                  className={`absolute -bottom-2 -right-2 h-16 w-16 ${member.color} rounded-full opacity-30 blur-xl`}
                  animate={{
                    scale: activeId === member.id ? 1.5 : 1,
                    opacity: activeId === member.id ? 0.5 : 0.3,
                  }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Decorative background elements */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
          <motion.div
            className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-amber-300 opacity-10 blur-3xl dark:bg-amber-700"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-violet-400 opacity-10 blur-3xl dark:bg-violet-800"
            animate={{
              x: [0, -50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TeamMasonryParallax;
