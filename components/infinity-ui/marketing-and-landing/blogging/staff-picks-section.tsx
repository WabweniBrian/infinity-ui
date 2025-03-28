"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type StaffPick = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  editorNote?: string;
  editorName?: string;
};

const demoStaffPicks: StaffPick[] = [
  {
    id: "1",
    title: "The Subtle Art of Writing Code That Humans Can Understand",
    excerpt:
      "Beyond functionality: how readability and maintainability create lasting value in software development.",
    category: "Programming",
    date: "Apr 15, 2024",
    readTime: "8 min read",
    author: {
      name: "Alex Chen",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    editorNote:
      "A refreshing take on code quality that focuses on the human element rather than just technical metrics.",
    editorName: "Sarah Johnson",
  },
  {
    id: "2",
    title: "The Psychology Behind Successful Digital Products",
    excerpt:
      "How understanding human behavior leads to better user experiences and more engaging products.",
    category: "UX Design",
    date: "Apr 12, 2024",
    readTime: "10 min read",
    author: {
      name: "Maya Patel",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    editorNote:
      "Maya brilliantly connects psychological principles to practical design decisions in this must-read piece.",
    editorName: "David Wong",
  },
  {
    id: "3",
    title: "Beyond Agile: Rethinking How We Build Software in 2024",
    excerpt:
      "Is it time to move past traditional Agile methodologies? A critical examination of modern development practices.",
    category: "Product Development",
    date: "Apr 8, 2024",
    readTime: "12 min read",
    author: {
      name: "James Wilson",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    editorNote:
      "A thought-provoking critique that challenges conventional wisdom about software development processes.",
    editorName: "Sarah Johnson",
  },
];

const StaffPicksSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section ref={ref} className="bg-white px-4 py-24 dark:bg-slate-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 text-white">
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
                    <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z"></path>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                  Staff Picks
                </h2>
              </div>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Curated by our editors, these thought-provoking articles
                represent some of the best writing on our platform.
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
                View all staff picks
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

        <div className="space-y-12">
          {demoStaffPicks.map((pick, index) => (
            <motion.article
              key={pick.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredId(pick.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                {/* Content */}
                <div className="lg:col-span-7 lg:pr-6">
                  <div className="mb-3 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {pick.category}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span>{pick.date}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                    <span>{pick.readTime}</span>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-400 md:text-3xl">
                    {pick.title}
                  </h3>

                  <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                    {pick.excerpt}
                  </p>

                  <div className="mb-6 flex items-center gap-4">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={
                          pick.author.avatar ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={pick.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {pick.author.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Author
                      </div>
                    </div>
                  </div>

                  <motion.button
                    className="flex items-center gap-2 rounded-full border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Read full article
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

                {/* Image and Editor's Note */}
                <div className="lg:col-span-5">
                  <div className="space-y-6">
                    <motion.div
                      className="relative h-64 overflow-hidden rounded-lg"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={
                          pick.coverImage ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={pick.title}
                        fill
                        className="object-cover"
                      />
                    </motion.div>

                    {pick.editorNote && (
                      <div className="rounded-r-lg border-l-4 border-amber-500 bg-amber-50 p-4 dark:border-amber-600 dark:bg-amber-900/20">
                        <div className="mb-2 text-sm italic text-amber-800 dark:text-amber-300">
                          &quot;{pick.editorNote}&quot;
                        </div>
                        <div className="text-xs font-medium text-amber-700 dark:text-amber-400">
                          — {pick.editorName}, Editor
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {index < demoStaffPicks.length - 1 && (
                <div className="mt-12 h-px w-full bg-slate-200 dark:bg-slate-800" />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffPicksSection;
