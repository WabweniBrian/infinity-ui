"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

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
  };
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Founder & CEO",
    bio: "Passionate about creating beautiful user experiences and building great teams.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 2,
    name: "Sam Taylor",
    role: "Lead Designer",
    bio: "Crafting pixel-perfect designs with a focus on accessibility and usability.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 3,
    name: "Jordan Lee",
    role: "Senior Developer",
    bio: "Building robust and scalable applications with modern technologies.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 4,
    name: "Casey Kim",
    role: "Product Manager",
    bio: "Turning ideas into products that users love through strategic planning.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 5,
    name: "Riley Johnson",
    role: "Marketing Lead",
    bio: "Creating compelling narratives that connect products with audiences.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 6,
    name: "Jamie Wilson",
    role: "UX Researcher",
    bio: "Understanding user needs through research and data-driven insights.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: 7,
    name: "Taylor Reed",
    role: "Frontend Engineer",
    bio: "Crafting responsive and accessible user interfaces with modern frameworks.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 8,
    name: "Morgan Chen",
    role: "Backend Developer",
    bio: "Architecting scalable and secure server-side solutions for complex applications.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
];

const TeamGridSpotlight = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-20 dark:from-slate-950 dark:to-slate-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />

      <div className="container mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl"
          >
            Meet Our Exceptional Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            The brilliant minds behind our success, working together to create
            amazing experiences.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={item}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl">
                <div className="relative aspect-[3/4]">
                  <Image
                    src={
                      member.imageUrl ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                    }
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 text-white"
                  initial={{ y: 20, opacity: 0.8 }}
                  animate={{
                    y: hoveredId === member.id ? 0 : 10,
                    opacity: hoveredId === member.id ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mb-1 text-lg font-bold">{member.name}</h3>
                  <p className="mb-2 text-sm font-medium text-violet-300">
                    {member.role}
                  </p>

                  <motion.p
                    className="mb-3 text-xs text-white/80"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: hoveredId === member.id ? "auto" : 0,
                      opacity: hoveredId === member.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {member.bio}
                  </motion.p>

                  <div className="flex space-x-3">
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="text-white/80 transition-colors hover:text-white"
                      >
                        <Twitter size={16} />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="text-white/80 transition-colors hover:text-white"
                      >
                        <Linkedin size={16} />
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        className="text-white/80 transition-colors hover:text-white"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="absolute -bottom-2 -right-2 h-16 w-16 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 opacity-30 blur-xl"
                animate={{
                  scale: hoveredId === member.id ? 1.2 : 1,
                  opacity: hoveredId === member.id ? 0.5 : 0.3,
                }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamGridSpotlight;
