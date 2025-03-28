"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Mail, Phone } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  location: string;
  bio: string;
  imageUrl: string;
  contact: {
    email?: string;
    phone?: string;
    website?: string;
  };
  color: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Creative Director",
    location: "New York, USA",
    bio: "Leading our creative vision with over 10 years of experience in digital design and branding.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "alex@example.com",
      phone: "+1 (555) 123-4567",
      website: "https://example.com",
    },
    color: "from-rose-500 to-orange-500",
  },
  {
    id: 2,
    name: "Sophia Lee",
    role: "Lead Developer",
    location: "San Francisco, USA",
    bio: "Building robust and scalable applications with a focus on performance and user experience.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "sophia@example.com",
      phone: "+1 (555) 987-6543",
    },
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "UX Strategist",
    location: "London, UK",
    bio: "Crafting user-centered experiences through research, testing, and thoughtful design.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "marcus@example.com",
      website: "https://example.com",
    },
    color: "from-violet-500 to-purple-500",
  },
  {
    id: 4,
    name: "Zara Patel",
    role: "Marketing Lead",
    location: "Toronto, Canada",
    bio: "Developing marketing strategies that connect brands with their audiences in meaningful ways.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "zara@example.com",
      phone: "+1 (555) 456-7890",
    },
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 5,
    name: "David Chen",
    role: "Product Manager",
    location: "Berlin, Germany",
    bio: "Guiding product development with a focus on solving real user problems and business goals.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "david@example.com",
      phone: "+1 (555) 234-5678",
      website: "https://example.com",
    },
    color: "from-amber-500 to-yellow-500",
  },
];

const TeamScrollGradient = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // For morphing background
  const backgroundX = useMotionValue(0);
  const smoothBackgroundX = useSpring(backgroundX, {
    damping: 50,
    stiffness: 400,
  });

  // All transform functions
  const background1Opacity = useTransform(
    smoothBackgroundX,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [1, 0.5, 0, 0, 0, 0],
  );

  const background2Opacity = useTransform(
    smoothBackgroundX,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0.5, 1, 0.5, 0, 0],
  );

  const background3Opacity = useTransform(
    smoothBackgroundX,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0, 0, 0.5, 1, 0.5],
  );

  const background4Opacity = useTransform(
    smoothBackgroundX,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0, 0, 0, 0.5, 1],
  );

  // Update background based on active index
  useEffect(() => {
    backgroundX.set(activeIndex / (teamMembers.length - 1));
  }, [activeIndex, backgroundX]);

  const scrollToMember = (index: number) => {
    if (containerRef.current && index >= 0 && index < teamMembers.length) {
      const container = containerRef.current;
      const memberElement = container.children[index] as HTMLElement;

      if (memberElement) {
        const scrollLeft =
          memberElement.offsetLeft -
          container.offsetWidth / 2 +
          memberElement.offsetWidth / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });

        setActiveIndex(index);
      }
    }
  };

  const handleScroll = () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.offsetWidth,
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const nextMember = () => {
    if (activeIndex < teamMembers.length - 1) {
      scrollToMember(activeIndex + 1);
    }
  };

  const prevMember = () => {
    if (activeIndex > 0) {
      scrollToMember(activeIndex - 1);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden py-20">
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Morphing background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ opacity: background1Opacity }}
          className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-purple-600/20 dark:from-rose-500/30 dark:via-pink-500/30 dark:to-purple-600/30"
        />
        <motion.div
          style={{ opacity: background2Opacity }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-teal-500/20 dark:from-blue-500/30 dark:via-cyan-500/30 dark:to-teal-500/30"
        />
        <motion.div
          style={{ opacity: background3Opacity }}
          className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20 dark:from-amber-500/30 dark:via-orange-500/30 dark:to-red-500/30"
        />
        <motion.div
          style={{ opacity: background4Opacity }}
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20 dark:from-emerald-500/30 dark:via-green-500/30 dark:to-lime-500/30"
        />
      </div>

      <div className="relative z-10">
        <div className="container mx-auto mb-12 max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl">
              Our Leadership Team
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
              Meet the talented individuals guiding our company&apos;s vision
              and success.
            </p>
          </motion.div>
        </div>

        {/* Navigation controls */}
        <div className="container mx-auto mb-8 max-w-7xl px-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={prevMember}
              disabled={!canScrollLeft}
              className="rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800/80"
              aria-label="Previous team member"
            >
              <ArrowLeft
                size={20}
                className="text-slate-700 dark:text-slate-200"
              />
            </button>

            <div className="flex gap-2">
              {teamMembers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToMember(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-6 bg-slate-800 dark:bg-white"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  aria-label={`Go to team member ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextMember}
              disabled={!canScrollRight}
              className="rounded-full bg-white/80 p-2 shadow-md backdrop-blur-sm transition-opacity disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-800/80"
              aria-label="Next team member"
            >
              <ArrowRight
                size={20}
                className="text-slate-700 dark:text-slate-200"
              />
            </button>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div
          ref={containerRef}
          className="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto pb-8"
          style={{ scrollbarWidth: "none" }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="min-w-full flex-shrink-0 snap-center px-4 sm:min-w-[80%] md:min-w-[60%] lg:min-w-[40%]"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex h-full flex-col overflow-hidden rounded-xl bg-white/70 shadow-xl backdrop-blur-md dark:bg-slate-800/70 md:flex-row"
              >
                <div className="relative md:w-2/5">
                  <div className="relative aspect-[3/4] md:h-full">
                    <Image
                      src={
                        member.imageUrl ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                      }
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-30 mix-blend-overlay`}
                    />
                  </div>
                </div>

                <div className="flex flex-col p-6 md:w-3/5 md:p-8">
                  <div
                    className={`h-1 w-16 rounded bg-gradient-to-r ${member.color} mb-6`}
                  />

                  <h3 className="mb-1 text-2xl font-bold text-slate-800 dark:text-white">
                    {member.name}
                  </h3>
                  <p
                    className={`bg-gradient-to-r text-base font-medium ${member.color} mb-2 bg-clip-text text-transparent`}
                  >
                    {member.role}
                  </p>
                  <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
                    {member.location}
                  </p>

                  <p className="mb-6 text-slate-600 dark:text-slate-300">
                    {member.bio}
                  </p>

                  <div className="mt-auto space-y-2">
                    {member.contact.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={16} className="text-slate-400" />
                        <a
                          href={`mailto:${member.contact.email}`}
                          className="text-slate-700 hover:underline dark:text-slate-300"
                        >
                          {member.contact.email}
                        </a>
                      </div>
                    )}

                    {member.contact.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={16} className="text-slate-400" />
                        <a
                          href={`tel:${member.contact.phone}`}
                          className="text-slate-700 hover:underline dark:text-slate-300"
                        >
                          {member.contact.phone}
                        </a>
                      </div>
                    )}

                    {member.contact.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <ExternalLink size={16} className="text-slate-400" />
                        <a
                          href={member.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-700 hover:underline dark:text-slate-300"
                        >
                          Personal Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default TeamScrollGradient;
