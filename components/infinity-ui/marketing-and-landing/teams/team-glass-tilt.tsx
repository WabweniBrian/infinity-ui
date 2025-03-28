"use client";

import type React from "react";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    instagram?: string;
  };
  accent: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ryan Cooper",
    role: "UI/UX Designer",
    bio: "Crafting intuitive digital experiences through thoughtful design and user research.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
    accent: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    name: "Mia Zhang",
    role: "Frontend Developer",
    bio: "Building beautiful interfaces with modern frameworks and a focus on performance.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
    accent: "from-cyan-500 to-blue-500",
  },
  {
    id: 3,
    name: "Andre Fernandez",
    role: "Product Manager",
    bio: "Guiding product vision and strategy to deliver exceptional user experiences.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    accent: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Graphic Designer",
    bio: "Creating visual identities and illustrations that tell compelling stories.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
    accent: "from-violet-500 to-purple-500",
  },
  {
    id: 5,
    name: "Kai Nakamura",
    role: "Motion Designer",
    bio: "Bringing interfaces to life through thoughtful animation and interaction design.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      github: "https://github.com",
    },
    accent: "from-emerald-500 to-green-500",
  },
  {
    id: 6,
    name: "Elena Petrov",
    role: "Content Strategist",
    bio: "Developing content that resonates with audiences and drives engagement.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
    accent: "from-red-500 to-pink-500",
  },
];

const TeamGlassTilt = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-full opacity-30">
          <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-700 to-indigo-700 mix-blend-overlay blur-3xl" />
          <div className="absolute right-1/4 top-3/4 h-80 w-80 rounded-full bg-gradient-to-r from-blue-700 to-cyan-700 mix-blend-overlay blur-3xl" />
          <div className="absolute bottom-1/4 left-1/2 h-72 w-72 rounded-full bg-gradient-to-r from-rose-700 to-pink-700 mix-blend-overlay blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-slate-900 bg-opacity-50 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Creative
            </span>{" "}
            Team
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Talented individuals working together to create extraordinary
            digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <TiltCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TiltCard = ({ member }: { member: TeamMember }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for rotation
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(
    useTransform(mouseY, [0, 1], [10, -10]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [0, 1], [-10, 10]),
    springConfig,
  );

  // Smooth spring physics for shine effect
  const shineX = useSpring(
    useTransform(mouseX, [0, 1], [0, 100]),
    springConfig,
  );
  const shineY = useSpring(
    useTransform(mouseY, [0, 1], [0, 100]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card (0-1)
    const xPos = (e.clientX - rect.left) / width;
    const yPos = (e.clientY - rect.top) / height;

    mouseX.set(xPos);
    mouseY.set(yPos);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full"
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        transition={{ duration: 0.2 }}
        className="relative h-full overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-xl backdrop-blur-md"
      >
        {/* Shine effect */}
        <motion.div
          style={{
            background: `linear-gradient(
              to bottom right, 
              rgba(255, 255, 255, 0.2) 0%, 
              rgba(255, 255, 255, 0) 50%
            )`,
            top: shineY,
            left: shineX,
            transform: "translate(-50%, -50%)",
          }}
          className={`pointer-events-none absolute h-[200%] w-[200%] opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""}`}
        />

        <div className="flex h-full flex-col p-6">
          <div className="relative mx-auto mb-6">
            <div className="relative h-24 w-24 overflow-hidden rounded-full md:h-28 md:w-28">
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
              className={`absolute inset-0 rounded-full bg-gradient-to-br ${member.accent} opacity-30 mix-blend-overlay`}
            />
            <motion.div
              className={`absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-gradient-to-br ${member.accent}`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>

          <div className="mb-4 text-center">
            <h3 className="mb-1 text-xl font-bold text-white">{member.name}</h3>
            <p
              className={`bg-gradient-to-r text-sm ${member.accent} bg-clip-text font-medium text-transparent`}
            >
              {member.role}
            </p>
          </div>

          <p className="mb-6 flex-grow text-center text-sm text-slate-300">
            {member.bio}
          </p>

          <div className="mt-auto flex justify-center space-x-3">
            {member.social.twitter && (
              <a
                href={member.social.twitter}
                className="text-slate-400 transition-colors hover:text-white"
              >
                <Twitter size={18} />
              </a>
            )}
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                className="text-slate-400 transition-colors hover:text-white"
              >
                <Linkedin size={18} />
              </a>
            )}
            {member.social.github && (
              <a
                href={member.social.github}
                className="text-slate-400 transition-colors hover:text-white"
              >
                <Github size={18} />
              </a>
            )}
            {member.social.instagram && (
              <a
                href={member.social.instagram}
                className="text-slate-400 transition-colors hover:text-white"
              >
                <Instagram size={18} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamGlassTilt;
