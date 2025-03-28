"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, X } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  imageUrl: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Product Designer",
    bio: "Passionate about creating intuitive and beautiful user experiences that solve real problems.",
    skills: ["UI/UX", "Prototyping", "User Research"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "alex@example.com",
    },
  },
  {
    id: 2,
    name: "Jamie Chen",
    role: "Frontend Developer",
    bio: "Crafting performant and accessible web applications with modern frameworks and best practices.",
    skills: ["React", "TypeScript", "Animation"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "jamie@example.com",
    },
  },
  {
    id: 3,
    name: "Taylor Smith",
    role: "Content Strategist",
    bio: "Creating compelling narratives and content strategies that connect brands with their audiences.",
    skills: ["Copywriting", "SEO", "Brand Voice"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "taylor@example.com",
    },
  },
  {
    id: 4,
    name: "Jordan Lee",
    role: "Backend Engineer",
    bio: "Building robust and scalable server-side solutions with a focus on performance and security.",
    skills: ["Node.js", "Databases", "API Design"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "jordan@example.com",
    },
  },
  {
    id: 5,
    name: "Casey Wilson",
    role: "UX Researcher",
    bio: "Uncovering user insights through research methodologies to inform product decisions.",
    skills: ["User Testing", "Interviews", "Data Analysis"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "casey@example.com",
    },
  },
  {
    id: 6,
    name: "Riley Johnson",
    role: "Product Manager",
    bio: "Guiding product strategy and execution with a focus on user needs and business goals.",
    skills: ["Strategy", "Roadmapping", "Analytics"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "riley@example.com",
    },
  },
];

const TeamCardFlip = () => {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const toggleFlip = (id: number) => {
    if (flippedCards.includes(id)) {
      setFlippedCards(flippedCards.filter((cardId) => cardId !== id));
    } else {
      setFlippedCards([...flippedCards, id]);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-100 to-white py-20 dark:from-slate-900 dark:to-slate-800">
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Geometric pattern background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          {/* Triangles */}
          {Array.from({ length: 20 }).map((_, i) => {
            const size = Math.random() * 100 + 50;
            const opacity = Math.random() * 0.5 + 0.1;
            const rotation = Math.random() * 360;
            const top = Math.random() * 100;
            const left = Math.random() * 100;

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                  transform: `rotate(${rotation}deg)`,
                  borderLeft: "2px solid rgba(99, 102, 241, 0.2)",
                  borderBottom: "2px solid rgba(99, 102, 241, 0.2)",
                }}
                animate={{
                  rotate: [rotation, rotation + 10, rotation],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Circles */}
          {Array.from({ length: 15 }).map((_, i) => {
            const size = Math.random() * 60 + 20;
            const opacity = Math.random() * 0.3 + 0.1;
            const top = Math.random() * 100;
            const left = Math.random() * 100;

            return (
              <motion.div
                key={`circle-${i}`}
                className="absolute rounded-full border-2 border-pink-500/20 dark:border-pink-500/10"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: Math.random() * 8 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Squares */}
          {Array.from({ length: 10 }).map((_, i) => {
            const size = Math.random() * 80 + 30;
            const opacity = Math.random() * 0.3 + 0.1;
            const rotation = Math.random() * 45;
            const top = Math.random() * 100;
            const left = Math.random() * 100;

            return (
              <motion.div
                key={`square-${i}`}
                className="absolute border-2 border-cyan-500/20 dark:border-cyan-500/10"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  opacity,
                  transform: `rotate(${rotation}deg)`,
                }}
                animate={{
                  rotate: [rotation, rotation + 20, rotation],
                }}
                transition={{
                  duration: Math.random() * 12 + 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            );
          })}
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
            Our{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Expert</span>{" "}
            Team
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Meet the talented individuals who make our company thrive through
            collaboration and expertise.
          </p>
        </motion.div>

        {/* Team grid with flip cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => {
            const isFlipped = flippedCards.includes(member.id);

            return (
              <div key={member.id} className="perspective-1000">
                <motion.div
                  className="relative h-[400px] w-full cursor-pointer"
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                  onClick={() => toggleFlip(member.id)}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of card */}
                  <div
                    className="backface-hidden absolute inset-0 flex flex-col rounded-xl bg-white p-6 shadow-lg dark:bg-slate-800"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-lg">
                      <Image
                        src={
                          member.imageUrl ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="mb-1 text-xl font-bold text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-white/80">{member.role}</p>
                      </div>
                    </div>

                    <p className="mb-6 flex-grow text-sm text-slate-600 dark:text-slate-300">
                      {member.bio}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex space-x-2">
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            className="text-slate-400 transition-colors hover:text-indigo-500 dark:hover:text-indigo-400"
                          >
                            <Twitter size={18} />
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            className="text-slate-400 transition-colors hover:text-indigo-500 dark:hover:text-indigo-400"
                          >
                            <Linkedin size={18} />
                          </a>
                        )}
                        {member.social.github && (
                          <a
                            href={member.social.github}
                            className="text-slate-400 transition-colors hover:text-indigo-500 dark:hover:text-indigo-400"
                          >
                            <Github size={18} />
                          </a>
                        )}
                      </div>

                      <button
                        className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(member.id);
                        }}
                      >
                        More info
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 5L16 12L9 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="backface-hidden absolute inset-0 flex flex-col rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 shadow-lg dark:from-indigo-600 dark:to-purple-800"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <button
                      className="absolute right-4 top-4 text-white/80 transition-colors hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlip(member.id);
                      }}
                    >
                      <X size={20} />
                    </button>

                    <div className="mb-6 flex items-center">
                      <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-full border-2 border-white/30">
                        <Image
                          src={
                            member.imageUrl ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="mb-1 text-xl font-bold text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-white/80">{member.role}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-white/20 px-2 py-1 text-xs text-white"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 flex-grow">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">
                        About
                      </h4>
                      <p className="text-sm text-white/80">{member.bio}</p>
                    </div>

                    <div className="mt-auto">
                      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white">
                        Connect
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {member.social.email && (
                          <a
                            href={`mailto:${member.social.email}`}
                            className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/30"
                          >
                            <Mail size={14} />
                            <span>Email</span>
                          </a>
                        )}
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/30"
                          >
                            <Linkedin size={14} />
                            <span>LinkedIn</span>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/30"
                          >
                            <Twitter size={14} />
                            <span>Twitter</span>
                          </a>
                        )}
                        {member.social.github && (
                          <a
                            href={member.social.github}
                            className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/30"
                          >
                            <Github size={14} />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  );
};

export default TeamCardFlip;
