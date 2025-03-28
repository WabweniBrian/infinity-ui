"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Mail, ExternalLink, ArrowUpRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  contact: {
    email: string;
    website?: string;
  };
  color: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sophia Chen",
    role: "Creative Director",
    bio: "Leads our creative vision with a focus on innovative design solutions that connect with audiences.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "sophia@example.com",
      website: "https://example.com",
    },
    color: "from-rose-400 to-red-500",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Lead Developer",
    bio: "Architects our technical solutions with a passion for clean code and performance.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "marcus@example.com",
    },
    color: "from-blue-400 to-indigo-500",
  },
  {
    id: 3,
    name: "Olivia Martinez",
    role: "UX Researcher",
    bio: "Uncovers user insights that drive our product decisions and improve experiences.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "olivia@example.com",
      website: "https://example.com",
    },
    color: "from-amber-400 to-orange-500",
  },
  {
    id: 4,
    name: "Ethan Williams",
    role: "Product Manager",
    bio: "Guides our product strategy with a data-driven approach and user advocacy.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "ethan@example.com",
    },
    color: "from-emerald-400 to-green-500",
  },
  {
    id: 5,
    name: "Zoe Taylor",
    role: "Motion Designer",
    bio: "Creates engaging animations and interactions that bring our products to life.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "zoe@example.com",
      website: "https://example.com",
    },
    color: "from-purple-400 to-violet-500",
  },
  {
    id: 6,
    name: "Noah Garcia",
    role: "Frontend Engineer",
    bio: "Builds beautiful and responsive interfaces with modern web technologies.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "noah@example.com",
    },
    color: "from-cyan-400 to-blue-500",
  },
];

const TeamWaveStagger = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-950 dark:to-slate-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Dynamic wave background */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute h-full w-full min-w-[1000px] opacity-30 dark:opacity-20"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,800 C200,700 400,900 600,800 C800,700 1000,800 1000,800 L1000,1000 L0,1000 Z"
            fill="url(#wave-gradient-1)"
            animate={{
              d: [
                "M0,800 C200,700 400,900 600,800 C800,700 1000,800 1000,800 L1000,1000 L0,1000 Z",
                "M0,850 C200,750 400,850 600,850 C800,850 1000,850 1000,850 L1000,1000 L0,1000 Z",
                "M0,800 C200,700 400,900 600,800 C800,700 1000,800 1000,800 L1000,1000 L0,1000 Z",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M0,900 C150,850 300,950 450,900 C600,850 750,900 900,850 C950,825 1000,850 1000,850 L1000,1000 L0,1000 Z"
            fill="url(#wave-gradient-2)"
            animate={{
              d: [
                "M0,900 C150,850 300,950 450,900 C600,850 750,900 900,850 C950,825 1000,850 1000,850 L1000,1000 L0,1000 Z",
                "M0,950 C150,900 300,900 450,950 C600,900 750,950 900,900 C950,875 1000,900 1000,900 L1000,1000 L0,1000 Z",
                "M0,900 C150,850 300,950 450,900 C600,850 750,900 900,850 C950,825 1000,850 1000,850 L1000,1000 L0,1000 Z",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          />
          <defs>
            <linearGradient
              id="wave-gradient-1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#EC4899" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient
              id="wave-gradient-2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating blobs */}
        <div className="animate-blob absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-pink-200 to-purple-200 opacity-30 blur-3xl dark:from-pink-900/20 dark:to-purple-900/20" />
        <div className="animate-blob animation-delay-2000 absolute right-1/4 top-3/4 h-80 w-80 rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 opacity-30 blur-3xl dark:from-blue-900/20 dark:to-cyan-900/20" />
        <div className="animate-blob animation-delay-4000 absolute bottom-1/4 left-1/2 h-72 w-72 rounded-full bg-gradient-to-r from-yellow-200 to-amber-200 opacity-30 blur-3xl dark:from-yellow-900/20 dark:to-amber-900/20" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              Creative Team
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            The talented individuals behind our success, working together to
            create amazing experiences.
          </p>
        </motion.div>

        {/* Team grid with staggered animation */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.21, 0.45, 0.46, 0.94],
              }}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group"
            >
              <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 group-hover:shadow-xl dark:bg-slate-800">
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-xl p-0.5">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent to-transparent opacity-70 transition-all duration-500 group-hover:from-violet-600 group-hover:to-indigo-600 dark:group-hover:from-violet-500 dark:group-hover:to-indigo-500" />
                </div>

                <div className="relative flex h-full flex-col p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="relative">
                      <div className="h-20 w-20 overflow-hidden rounded-full">
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
                      <motion.div
                        className={`absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-r ${member.color}`}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: index * 0.2,
                        }}
                      />
                    </div>

                    <motion.div
                      whileHover={{ rotate: 45 }}
                      transition={{ duration: 0.2 }}
                      className="cursor-pointer rounded-full bg-slate-100 p-2 shadow-sm dark:bg-slate-700"
                    >
                      <ArrowUpRight
                        size={16}
                        className="text-slate-600 dark:text-slate-200"
                      />
                    </motion.div>
                  </div>

                  <h3 className="mb-1 text-xl font-bold text-slate-800 dark:text-white">
                    {member.name}
                  </h3>
                  <div
                    className={`inline-block rounded-full bg-gradient-to-r px-3 py-1 text-xs text-white ${member.color} mb-4 w-fit`}
                  >
                    {member.role}
                  </div>

                  <p className="mb-6 flex-grow text-sm text-slate-600 dark:text-slate-300">
                    {member.bio}
                  </p>

                  <div className="mt-auto flex flex-wrap gap-2">
                    <a
                      href={`mailto:${member.contact.email}`}
                      className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-sm transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600"
                    >
                      <Mail size={14} />
                      <span>Email</span>
                    </a>

                    {member.contact.website && (
                      <a
                        href={member.contact.website}
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

                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-indigo-600/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-violet-600/20 dark:to-indigo-600/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === member.id ? 1 : 0 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 15s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default TeamWaveStagger;
