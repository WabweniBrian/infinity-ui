"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type ArchiveArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  originalDate: string;
  readTime: string;
  author: {
    name: string;
  };
  coverImage: string;
  relevanceNote?: string;
  year: number;
};

const demoArchiveArticles: ArchiveArticle[] = [
  {
    id: "1",
    title: "The Dawn of Mobile Computing: Predictions That Came True",
    excerpt:
      "Looking back at our 2007 analysis of how smartphones would transform daily life.",
    category: "Technology",
    originalDate: "June 12, 2007",
    readTime: "8 min read",
    author: {
      name: "Michael Chen",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    relevanceNote:
      "With the recent launch of AI-powered smartphones, this piece offers fascinating context on how far mobile technology has evolved.",
    year: 2007,
  },
  {
    id: "2",
    title: "Climate Change: The Warning Signs We Missed",
    excerpt:
      "Our environmental correspondent's early report on climate indicators that went unheeded.",
    category: "Environment",
    originalDate: "March 24, 2011",
    readTime: "12 min read",
    author: {
      name: "Sarah Johnson",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    relevanceNote:
      "As world leaders gather for the 2024 Climate Summit, this article provides crucial historical perspective on missed opportunities.",
    year: 2011,
  },
  {
    id: "3",
    title: "The Future of Work: Remote Revolution Begins",
    excerpt:
      "Examining the early adopters of distributed teams and their unconventional methods.",
    category: "Business",
    originalDate: "November 8, 2015",
    readTime: "10 min read",
    author: {
      name: "David Rodriguez",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    relevanceNote:
      "This prescient analysis predated the global shift to remote work by years, offering lessons still relevant today.",
    year: 2015,
  },
  {
    id: "4",
    title: "The Ethics of AI: Questions We Should Have Asked Sooner",
    excerpt:
      "Our tech ethics columnist raised concerns about artificial intelligence development that remain unresolved.",
    category: "Technology",
    originalDate: "February 17, 2018",
    readTime: "14 min read",
    author: {
      name: "Amara Patel",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    relevanceNote:
      "As AI regulation becomes a global priority, this piece shows how early ethical questions went unanswered.",
    year: 2018,
  },
];

const FromArchivesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section ref={ref} className="bg-slate-50 px-4 py-24 dark:bg-slate-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"></path>
                    <path d="M12 11h4"></path>
                    <path d="M12 16h4"></path>
                    <path d="M8 11h.01"></path>
                    <path d="M8 16h.01"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                  From the Archives
                </h2>
              </div>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Revisiting our most insightful articles that have stood the test
                of time and remain relevant today.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button
                className="flex items-center gap-2 font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                Browse full archives
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {demoArchiveArticles.map((article, index) => (
            <motion.article
              key={article.id}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(article.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -5 }}
            >
              <div className="relative">
                <div className="relative h-56 overflow-hidden">
                  <motion.div
                    animate={{
                      scale: hoveredId === article.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="h-full w-full"
                  >
                    <Image
                      src={
                        article.coverImage ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                  </motion.div>
                </div>

                {/* Year Badge */}
                <div className="absolute left-4 top-4 z-10">
                  <div className="rounded bg-amber-500/90 px-3 py-1 text-sm font-bold text-white">
                    {article.year}
                  </div>
                </div>

                {/* Original Date */}
                <div className="absolute bottom-4 left-4 z-10">
                  <div className="flex items-center gap-1.5 rounded bg-black/60 px-3 py-1 text-xs text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        width="18"
                        height="18"
                        x="3"
                        y="4"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                    Originally published: {article.originalDate}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-amber-600 dark:text-amber-400">
                    {article.category}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400">
                  {article.title}
                </h3>

                <p className="mb-4 text-slate-600 dark:text-slate-400">
                  {article.excerpt}
                </p>

                <div className="mb-6 text-xs text-slate-500 dark:text-slate-400">
                  By {article.author.name}
                </div>

                {article.relevanceNote && (
                  <div className="mb-6 rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:border-amber-600 dark:bg-amber-900/20">
                    <div className="text-sm text-amber-800 dark:text-amber-300">
                      <span className="font-medium">Why it matters now:</span>{" "}
                      {article.relevanceNote}
                    </div>
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
                  <div className="flex items-center gap-2">
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
                      className="text-amber-500 dark:text-amber-400"
                    >
                      <path d="M12 8v4l3 3"></path>
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      From our archives
                    </span>
                  </div>

                  <motion.button
                    className="flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Read article
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
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FromArchivesSection;
