"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type ArticleHeaderProps = {
  title: string;
  subtitle: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  isPremium?: boolean;
};

const PremiumArticleHeader = ({
  title = "The Transformation of Modern Technology and Its Impact on Society",
  subtitle = "An in-depth analysis of how technological advancements are reshaping our world and what it means for the future of humanity.",
  author = {
    name: "Jonathan Harrington",
    role: "Technology Correspondent",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  category = "Technology",
  date = "April 18, 2024",
  readTime = "12 min read",
  coverImage = "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=1200&width=2000",
  isPremium = true,
}: ArticleHeaderProps) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[90vh] items-center justify-center overflow-hidden"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Hero Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ opacity, scale }}>
        <Image
          src={
            coverImage ||
            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
          }
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
      </motion.div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 py-24 text-white">
        <div ref={ref} className="mx-auto max-w-4xl">
          {/* Category and Premium Badge */}
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <span className="border-b-2 border-white/30 pb-1 text-sm font-medium uppercase tracking-widest">
              {category}
            </span>
            {isPremium && (
              <span className="rounded-sm bg-amber-500/90 px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">
                Premium
              </span>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mb-6 font-serif text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
            style={{ y: titleY }}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mb-10 font-serif text-xl leading-relaxed text-white/80 md:text-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {subtitle}
          </motion.p>

          {/* Author Info and Meta */}
          <motion.div
            className="flex flex-col gap-6 border-t border-white/20 pt-6 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/30">
                <Image
                  src={
                    author.avatar ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{author.name}</div>
                <div className="text-sm text-white/70">{author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-white/70">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                <span>{date}</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-white/40"></div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <span>{readTime}</span>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/70"
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span className="text-xs uppercase tracking-widest">
              Scroll to read
            </span>
            <motion.div
              className="flex h-10 w-6 items-center justify-center rounded-full border-2 border-white/30"
              animate={{ y: [0, 5, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
            >
              <motion.div className="h-1.5 w-1.5 rounded-full bg-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PremiumArticleHeader;
