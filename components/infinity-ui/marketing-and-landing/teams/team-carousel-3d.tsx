"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Mail, ExternalLink } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  quote: string;
  imageUrl: string;
  email: string;
  website?: string;
  accent: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Emma Rodriguez",
    role: "Creative Director",
    quote:
      "Design is not just what it looks like and feels like. Design is how it works.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    email: "emma@example.com",
    website: "https://example.com",
    accent: "from-rose-500 to-orange-500",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Technical Lead",
    quote: "Simplicity is the ultimate sophistication in both design and code.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    email: "marcus@example.com",
    accent: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    name: "Sophia Patel",
    role: "UX Strategist",
    quote:
      "Great experiences don&pos;t happen by accident. They are carefully designed.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    email: "sophia@example.com",
    website: "https://example.com",
    accent: "from-violet-500 to-purple-500",
  },
  {
    id: 4,
    name: "Noah Williams",
    role: "Frontend Developer",
    quote: "The details aren&pos;t just details. They make the product.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    email: "noah@example.com",
    accent: "from-blue-500 to-cyan-500",
  },
  {
    id: 5,
    name: "Olivia Johnson",
    role: "Content Strategist",
    quote:
      "Content precedes design. Design in the absence of content is not design.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    email: "olivia@example.com",
    website: "https://example.com",
    accent: "from-amber-500 to-yellow-500",
  },
];

const TeamCarousel3D = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const controls = useAnimation();
  const constraintsRef = useRef(null);

  const nextMember = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length,
    );
  };

  const activeMember = teamMembers[activeIndex];

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextMember();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section className="min-h-screen overflow-hidden bg-slate-50 py-20 dark:bg-slate-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />

      <div className="container relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">
            Our Leadership Team
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Meet the visionaries who are shaping the future of our company
            through innovation and leadership.
          </p>
        </motion.div>

        {/* 3D Card Carousel */}
        <div
          className="relative flex h-[500px] items-center justify-center md:h-[400px]"
          ref={constraintsRef}
        >
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{
                x: direction > 0 ? 300 : -300,
                opacity: 0,
                rotateY: direction > 0 ? 45 : -45,
                scale: 0.8,
              }}
              animate={{
                x: 0,
                opacity: 1,
                rotateY: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.5,
                },
              }}
              exit={{
                x: direction > 0 ? -300 : 300,
                opacity: 0,
                rotateY: direction > 0 ? -45 : 45,
                scale: 0.8,
                transition: { duration: 0.5 },
              }}
              className="perspective-1000 absolute mx-auto w-full max-w-3xl"
              drag="x"
              dragConstraints={constraintsRef}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x < -100) {
                  nextMember();
                } else if (offset.x > 100) {
                  prevMember();
                }
              }}
            >
              <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-slate-800 md:flex-row">
                <div className="relative w-full md:w-2/5">
                  <div className="relative aspect-square">
                    <Image
                      src={
                        activeMember.imageUrl ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                      }
                      alt={activeMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${activeMember.accent} opacity-20 mix-blend-overlay`}
                  />

                  {/* Decorative elements */}
                  <div className="absolute left-0 top-0 h-full w-full">
                    <div className="absolute left-0 top-0 h-16 w-16 rounded-tl-lg border-l-4 border-t-4 border-white/20" />
                    <div className="absolute bottom-0 right-0 h-16 w-16 rounded-br-lg border-b-4 border-r-4 border-white/20" />
                  </div>
                </div>

                <div className="flex w-full flex-col justify-between p-6 md:w-3/5 md:p-8">
                  <div>
                    <div
                      className={`mb-4 h-1 w-16 rounded bg-gradient-to-r ${activeMember.accent}`}
                    />
                    <h3 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white">
                      {activeMember.name}
                    </h3>
                    <p
                      className={`bg-gradient-to-r text-base font-medium ${activeMember.accent} mb-4 bg-clip-text text-transparent`}
                    >
                      {activeMember.role}
                    </p>

                    <blockquote className="relative mb-6 text-base italic text-slate-600 dark:text-slate-300">
                      <span className="absolute -left-2 -top-3 text-4xl text-slate-200 dark:text-slate-700">
                        &quot;
                      </span>
                      {activeMember.quote}
                      <span className="absolute -bottom-8 -right-2 text-4xl text-slate-200 dark:text-slate-700">
                        &quot;
                      </span>
                    </blockquote>
                  </div>

                  <div className="mt-auto flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${activeMember.email}`}
                      className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-sm transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600"
                    >
                      <Mail size={14} />
                      <span>{activeMember.email}</span>
                    </a>

                    {activeMember.website && (
                      <a
                        href={activeMember.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-sm transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600"
                      >
                        <ExternalLink size={14} />
                        <span>Website</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-1.5">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-5 bg-slate-800 dark:bg-white"
                    : "bg-slate-300 dark:bg-slate-600"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="pointer-events-none absolute left-4 right-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between">
          <button
            onClick={prevMember}
            className="pointer-events-auto rounded-full bg-white/80 p-2 text-slate-800 shadow-lg backdrop-blur-sm transition-colors hover:bg-white dark:bg-slate-800/80 dark:text-white dark:hover:bg-slate-700"
            aria-label="Previous team member"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextMember}
            className="pointer-events-auto rounded-full bg-white/80 p-2 text-slate-800 shadow-lg backdrop-blur-sm transition-colors hover:bg-white dark:bg-slate-800/80 dark:text-white dark:hover:bg-slate-700"
            aria-label="Next team member"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default TeamCarousel3D;
