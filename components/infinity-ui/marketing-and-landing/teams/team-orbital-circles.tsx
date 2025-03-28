"use client";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {
  ChevronRight,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Olivia Martinez",
    role: "CEO & Founder",
    description:
      "Visionary leader with 15+ years of experience in the tech industry, driving innovation and growth.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: 2,
    name: "Ethan Williams",
    role: "CTO",
    description:
      "Technical genius with a passion for cutting-edge solutions and scalable architecture.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 3,
    name: "Sophia Chen",
    role: "Design Director",
    description:
      "Award-winning designer focused on creating beautiful and functional user experiences.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: 4,
    name: "Jackson Brown",
    role: "Lead Developer",
    description:
      "Full-stack expert who transforms complex requirements into elegant code solutions.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 5,
    name: "Ava Johnson",
    role: "Marketing Lead",
    description:
      "Strategic marketer with a data-driven approach to growing brand awareness and user acquisition.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 6,
    name: "Noah Garcia",
    role: "Product Manager",
    description:
      "Customer-focused product leader who balances user needs with business objectives.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: 7,
    name: "Emma Wilson",
    role: "UX Researcher",
    description:
      "Empathetic researcher who uncovers deep insights to inform product decisions.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 8,
    name: "Liam Taylor",
    role: "Backend Engineer",
    description:
      "Systems architect specializing in high-performance and secure infrastructure.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
];

const TeamOrbitalCircles = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const orbitRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const activeMember = teamMembers[activeIndex];

  // Calculate positions in a circle
  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y };
  };

  // Auto-rotate
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoRotate) {
      interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % teamMembers.length);
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [autoRotate]);

  // Pause auto-rotation when hovering
  const handleMouseEnter = () => setAutoRotate(false);
  const handleMouseLeave = () => setAutoRotate(true);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 to-indigo-950 py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-full w-full opacity-30">
            {/* Stars */}
            {Array.from({ length: 100 }).map((_, i) => {
              const size = Math.random() * 2 + 1;
              return (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.8 + 0.2,
                    animation: `twinkle ${Math.random() * 5 + 5}s infinite alternate`,
                  }}
                />
              );
            })}
          </div>

          {/* Gradient orbs */}
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-purple-600/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Our Leadership <span className="text-indigo-400">Orbit</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-indigo-200">
            Meet the stellar team guiding our mission to transform the digital
            landscape.
          </p>
        </motion.div>

        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Featured team member */}
          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMember.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg"
              >
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                  <motion.div
                    className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-indigo-500/30"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(99, 102, 241, 0.3)",
                        "0 0 40px rgba(99, 102, 241, 0.5)",
                        "0 0 20px rgba(99, 102, 241, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  >
                    <Image
                      src={
                        activeMember.imageUrl ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                      }
                      alt={activeMember.name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>

                  <div className="flex-1 text-center md:text-left">
                    <motion.h3
                      className="mb-2 text-2xl font-bold text-white md:text-3xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {activeMember.name}
                    </motion.h3>

                    <motion.div
                      className="mb-4 inline-block rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 text-sm font-medium text-white"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {activeMember.role}
                    </motion.div>

                    <motion.p
                      className="mb-6 text-indigo-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {activeMember.description}
                    </motion.p>

                    <motion.div
                      className="flex justify-center gap-4 md:justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {activeMember.social.twitter && (
                        <a
                          href={activeMember.social.twitter}
                          className="text-indigo-300 transition-colors hover:text-white"
                          aria-label={`${activeMember.name}'s Twitter`}
                        >
                          <Twitter size={20} />
                        </a>
                      )}
                      {activeMember.social.linkedin && (
                        <a
                          href={activeMember.social.linkedin}
                          className="text-indigo-300 transition-colors hover:text-white"
                          aria-label={`${activeMember.name}'s LinkedIn`}
                        >
                          <Linkedin size={20} />
                        </a>
                      )}
                      {activeMember.social.github && (
                        <a
                          href={activeMember.social.github}
                          className="text-indigo-300 transition-colors hover:text-white"
                          aria-label={`${activeMember.name}'s GitHub`}
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {activeMember.social.website && (
                        <a
                          href={activeMember.social.website}
                          className="text-indigo-300 transition-colors hover:text-white"
                          aria-label={`${activeMember.name}'s website`}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </motion.div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() =>
                        setActiveIndex(
                          (prev) =>
                            (prev - 1 + teamMembers.length) %
                            teamMembers.length,
                        )
                      }
                      className="flex items-center gap-1 text-indigo-300 transition-colors hover:text-white"
                    >
                      <ChevronRight size={16} className="rotate-180" />
                      <span>Previous</span>
                    </button>

                    <div className="flex gap-1">
                      {teamMembers.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveIndex(idx)}
                          className={`h-2 w-2 rounded-full transition-all ${
                            idx === activeIndex
                              ? "w-6 bg-indigo-500"
                              : "bg-indigo-500/30 hover:bg-indigo-500/50"
                          }`}
                          aria-label={`View team member ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={() =>
                        setActiveIndex(
                          (prev) => (prev + 1) % teamMembers.length,
                        )
                      }
                      className="flex items-center gap-1 text-indigo-300 transition-colors hover:text-white"
                    >
                      <span>Next</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Orbital view */}
          <div
            className="flex w-full items-center justify-center lg:w-1/2"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={orbitRef}
              className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]"
            >
              {/* Center circle */}
              <motion.div
                className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(99, 102, 241, 0.5)",
                    "0 0 40px rgba(99, 102, 241, 0.7)",
                    "0 0 20px rgba(99, 102, 241, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="text-center text-white">
                  <div className="font-bold">Team</div>
                  <div className="text-xs">of {teamMembers.length}</div>
                </div>
              </motion.div>

              {/* Orbit path */}
              <div className="absolute left-1/2 top-1/2 h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-indigo-500/20" />

              {/* Team members in orbit */}
              {teamMembers.map((member, index) => {
                const position = getPosition(index, teamMembers.length, 150);
                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={member.id}
                    initial={false}
                    animate={{
                      x: position.x,
                      y: position.y,
                      scale: isActive ? 1.2 : 1,
                      zIndex: isActive ? 20 : 10,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                    onClick={() => setActiveIndex(index)}
                  >
                    <motion.div
                      className={`h-12 w-12 cursor-pointer overflow-hidden rounded-full border-2 ${
                        isActive ? "border-indigo-400" : "border-indigo-500/30"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      animate={{
                        boxShadow: isActive
                          ? [
                              "0 0 10px rgba(99, 102, 241, 0.5)",
                              "0 0 20px rgba(99, 102, 241, 0.7)",
                              "0 0 10px rgba(99, 102, 241, 0.5)",
                            ]
                          : "none",
                      }}
                      transition={{
                        duration: 2,
                        repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                      }}
                    >
                      <Image
                        src={
                          member.imageUrl ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                        }
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  );
};

export default TeamOrbitalCircles;
