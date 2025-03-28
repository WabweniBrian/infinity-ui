"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Briefcase, MapPin, Sparkles, X } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  location: string;
  experience: number;
  bio: string;
  achievements: string[];
  imageUrl: string;
  bgColor: string;
  textColor: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Eliza Thompson",
    role: "Product Designer",
    location: "San Francisco",
    experience: 7,
    bio: "Specializes in creating intuitive user experiences with a focus on accessibility and inclusive design.",
    achievements: [
      "Led redesign of flagship product",
      "Reduced user onboarding time by 40%",
      "Speaker at Design Systems Conference",
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    bgColor: "bg-amber-100",
    textColor: "text-amber-900",
  },
  {
    id: 2,
    name: "Marcus Rivera",
    role: "Frontend Developer",
    location: "New York",
    experience: 5,
    bio: "Passionate about building performant web applications with modern frameworks and animation techniques.",
    achievements: [
      "Optimized rendering performance by 60%",
      "Created custom animation library",
      "Open source contributor",
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-900",
  },
  {
    id: 3,
    name: "Sophia Chen",
    role: "UX Researcher",
    location: "Toronto",
    experience: 6,
    bio: "Conducts user research to uncover insights that drive product decisions and improve user satisfaction.",
    achievements: [
      "Established research practice from scratch",
      "Increased user satisfaction by 25%",
      "Published case studies on UX research methods",
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    bgColor: "bg-violet-100",
    textColor: "text-violet-900",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Creative Director",
    location: "London",
    experience: 10,
    bio: "Guides the creative vision of our products with a focus on brand consistency and innovative design solutions.",
    achievements: [
      "Rebranded company identity",
      "Won 3 design awards",
      "Featured in Design Magazine",
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    bgColor: "bg-blue-100",
    textColor: "text-blue-900",
  },
  {
    id: 5,
    name: "Aisha Patel",
    role: "Product Manager",
    location: "Berlin",
    experience: 8,
    bio: "Drives product strategy and execution with a data-driven approach and strong user advocacy.",
    achievements: [
      "Launched 5 successful products",
      "Grew user base by 200%",
      "Implemented agile methodology",
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    bgColor: "bg-rose-100",
    textColor: "text-rose-900",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Backend Engineer",
    location: "Seoul",
    experience: 9,
    bio: "Builds scalable and reliable backend systems that power our applications with a focus on performance.",
    achievements: [
      "Reduced server costs by 35%",
      "Implemented microservices architecture",
      "Created developer documentation system",
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    bgColor: "bg-cyan-100",
    textColor: "text-cyan-900",
  },
];

const TeamFloatingCards = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position for card movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900 dark:to-slate-800">
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute left-0 top-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-slate-200 dark:text-slate-700"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Decorative blobs */}
        <div className="animate-blob absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-200 to-cyan-200 opacity-30 blur-3xl dark:from-blue-900/30 dark:to-cyan-900/30" />
        <div className="animate-blob animation-delay-2000 absolute right-1/4 top-3/4 h-80 w-80 rounded-full bg-gradient-to-r from-purple-200 to-pink-200 opacity-30 blur-3xl dark:from-purple-900/30 dark:to-pink-900/30" />
        <div className="animate-blob animation-delay-4000 absolute bottom-1/4 left-1/2 h-72 w-72 rounded-full bg-gradient-to-r from-amber-200 to-yellow-200 opacity-30 blur-3xl dark:from-amber-900/30 dark:to-yellow-900/30" />
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
            <span className="relative inline-block">
              <span className="relative z-10">Talented Team</span>
              <motion.span
                className="absolute -bottom-2 left-0 right-0 z-0 h-3 bg-yellow-300 opacity-50 dark:bg-yellow-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            A diverse group of creative minds working together to bring
            innovative ideas to life.
          </p>
        </motion.div>

        {/* Floating cards grid */}
        <div
          ref={containerRef}
          className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                x: mousePosition.x * 10,
                y: mousePosition.y * 10,
                rotateX: mousePosition.y * -5,
                rotateY: mousePosition.x * 5,
                perspective: 1000,
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              className="relative"
            >
              <div
                className={`h-full overflow-hidden rounded-xl shadow-lg ${member.bgColor} transition-all duration-300 dark:bg-slate-800`}
                onClick={() => setSelectedMember(member)}
              >
                <div className="flex h-full flex-col p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
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

                    <motion.div
                      whileHover={{ rotate: 45 }}
                      transition={{ duration: 0.2 }}
                      className="cursor-pointer rounded-full bg-white/80 p-2 shadow-sm dark:bg-slate-700/80"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMember(member);
                      }}
                    >
                      <ArrowUpRight
                        size={16}
                        className="text-slate-600 dark:text-slate-200"
                      />
                    </motion.div>
                  </div>

                  <h3
                    className={`mb-1 text-xl font-bold ${member.textColor} dark:text-white`}
                  >
                    {member.name}
                  </h3>
                  <p className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-300">
                    {member.role}
                  </p>

                  <div className="mb-4 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin size={14} />
                    <span>{member.location}</span>
                  </div>

                  <div className="mb-6 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Briefcase size={14} />
                    <span>{member.experience} years experience</span>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles
                        size={16}
                        className={`${member.textColor} dark:text-yellow-400`}
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                        Key Achievement
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {member.achievements[0]}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="max-h-[90vh] w-full max-w-2xl overflow-hidden overflow-y-auto rounded-2xl bg-white shadow-2xl dark:bg-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`${selectedMember.bgColor} relative p-6 dark:bg-slate-700`}
              >
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute right-4 top-4 rounded-full bg-white/80 p-2 transition-colors hover:bg-white dark:bg-slate-600/80 dark:hover:bg-slate-600"
                >
                  <X size={20} className="text-slate-600 dark:text-slate-200" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white dark:border-slate-600">
                    <Image
                      src={
                        selectedMember.imageUrl ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3
                      className={`text-2xl font-bold ${selectedMember.textColor} dark:text-white`}
                    >
                      {selectedMember.name}
                    </h3>
                    <p className="font-medium text-slate-700 dark:text-slate-300">
                      {selectedMember.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                    <MapPin size={16} />
                    <span>{selectedMember.location}</span>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                    <Briefcase size={16} />
                    <span>{selectedMember.experience} years experience</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-2 text-lg font-semibold text-slate-800 dark:text-white">
                    About
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300">
                    {selectedMember.bio}
                  </p>
                </div>

                <div>
                  <h4 className="mb-3 text-lg font-semibold text-slate-800 dark:text-white">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {selectedMember.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Sparkles
                          size={18}
                          className={`${selectedMember.textColor} mt-0.5 dark:text-yellow-400`}
                        />
                        <span className="text-slate-600 dark:text-slate-300">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default TeamFloatingCards;
