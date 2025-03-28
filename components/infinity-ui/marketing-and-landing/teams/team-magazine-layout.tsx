"use client";

import { useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  quote: string;
  feature?: boolean;
  imageUrl: string;
  accent: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sophia Chen",
    role: "Creative Director",
    quote:
      "Design is not just what it looks like and feels like. Design is how it works.",
    feature: true,
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    accent: "from-rose-500 to-orange-500",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Lead Developer",
    quote:
      "The best code is no code at all. Every line of code you write is a line you have to maintain.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Olivia Martinez",
    role: "UX Researcher",
    quote:
      "Research is formalized curiosity. It is poking and prying with a purpose.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    accent: "from-amber-500 to-yellow-500",
  },
  {
    id: 4,
    name: "Ethan Williams",
    role: "Product Manager",
    quote:
      "A good product manager is the CEO of the product. They establish a vision and convince others to believe in it.",
    feature: true,
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    accent: "from-emerald-500 to-green-500",
  },
  {
    id: 5,
    name: "Zoe Taylor",
    role: "Motion Designer",
    quote:
      "Animation is not the art of drawings that move but the art of movements that are drawn.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    accent: "from-purple-500 to-violet-500",
  },
  {
    id: 6,
    name: "Noah Garcia",
    role: "Frontend Engineer",
    quote: "The details are not the details. They make the design.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    accent: "from-indigo-500 to-blue-500",
  },
];

const TeamMagazineLayout = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const featuredMembers = teamMembers.filter((member) => member.feature);
  const regularMembers = teamMembers.filter((member) => !member.feature);

  // Transforms for parallax effect
  const yTransform0 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yTransform1 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-20 dark:bg-slate-900"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          {/* Main gradient blobs */}
          <div className="absolute left-0 top-0 h-full w-full opacity-20 dark:opacity-30">
            <motion.div
              className="absolute left-1/4 top-1/4 h-[40vw] w-[40vw] rounded-full bg-gradient-to-r from-pink-300 to-purple-300 blur-3xl dark:from-pink-700 dark:to-purple-700"
              animate={{
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 h-[35vw] w-[35vw] rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 blur-3xl dark:from-blue-700 dark:to-cyan-700"
              animate={{
                x: [0, -30, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute left-1/3 top-2/3 h-[25vw] w-[25vw] rounded-full bg-gradient-to-r from-amber-300 to-yellow-300 blur-3xl dark:from-amber-700 dark:to-yellow-700"
              animate={{
                x: [0, 20, 0],
                y: [0, 20, 0],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>

          {/* Mesh grid overlay */}
          <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-[length:50px_50px] opacity-5"></div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl">
            The{" "}
            <span className="italic text-indigo-600 dark:text-indigo-400">
              Visionaries
            </span>{" "}
            Behind Our Success
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Meet the talented individuals who shape our company&apos;s future
            through innovation and leadership.
          </p>
        </motion.div>

        {/* Magazine-style layout */}
        <div className="space-y-24">
          {/* Featured team members */}
          {featuredMembers.map((member, index) => {
            const isEven = index % 2 === 0;

            // Use the pre-calculated transform based on index
            const yTransform = isEven ? yTransform0 : yTransform1;

            return (
              <div
                key={member.id}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}
              >
                {/* Image column */}
                <motion.div
                  className="w-full md:w-1/2"
                  style={{ y: yTransform }}
                >
                  <div className="relative">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-xl">
                      <Image
                        src={
                          member.imageUrl ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                        }
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${member.accent} rounded-lg opacity-30 mix-blend-overlay`}
                    />

                    {/* Decorative elements */}
                    <div className="absolute -bottom-4 -right-4 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg dark:bg-slate-800">
                      <Quote
                        size={30}
                        className="text-indigo-500 dark:text-indigo-400"
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Content column */}
                <div className="w-full md:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    <div
                      className={`h-1 w-16 rounded bg-gradient-to-r ${member.accent} mb-6`}
                    />

                    <h3 className="mb-2 text-3xl font-bold text-slate-800 dark:text-white">
                      {member.name}
                    </h3>
                    <p
                      className={`bg-gradient-to-r text-lg font-medium ${member.accent} mb-6 bg-clip-text text-transparent`}
                    >
                      {member.role}
                    </p>

                    <blockquote className="relative mb-8 text-xl italic text-slate-600 dark:text-slate-300">
                      <span className="absolute -left-2 -top-3 text-5xl text-slate-200 dark:text-slate-700">
                        &quot;
                      </span>
                      {member.quote}
                      <span className="absolute -bottom-8 -right-2 text-5xl text-slate-200 dark:text-slate-700">
                        &quot;
                      </span>
                    </blockquote>

                    <a
                      href="#"
                      className="inline-flex items-center font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Read full interview
                      <ArrowRight size={16} className="ml-1" />
                    </a>
                  </motion.div>
                </div>
              </div>
            );
          })}

          {/* Regular team members in grid */}
          <div>
            <h3 className="mb-8 text-center text-2xl font-bold text-slate-800 dark:text-white">
              Meet the Rest of Our Amazing Team
            </h3>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {regularMembers.map((member, index) => {
                // Staggered animation
                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-slate-800"
                  >
                    <div className="relative h-64">
                      <Image
                        src={
                          member.imageUrl ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${member.accent} opacity-30 mix-blend-overlay`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="mb-1 text-xl font-bold text-white">
                          {member.name}
                        </h4>
                        <p
                          className={`inline-block rounded-full bg-gradient-to-r px-2 py-1 text-xs text-white ${member.accent}`}
                        >
                          {member.role}
                        </p>
                      </div>
                    </div>

                    <div className="p-6">
                      <blockquote className="relative text-sm italic text-slate-600 dark:text-slate-300">
                        <span className="absolute -left-2 -top-3 text-3xl text-slate-200 dark:text-slate-700">
                          &quot;
                        </span>
                        {member.quote}
                      </blockquote>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamMagazineLayout;
