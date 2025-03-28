"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type BlogPost = {
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
};

const demoBlogs: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: What to Expect in 2025",
    excerpt:
      "Explore the upcoming trends and technologies that will shape the future of web development in the coming years.",
    category: "Development",
    date: "Mar 15, 2024",
    readTime: "6 min read",
    author: {
      name: "Alex Morgan",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: "2",
    title: "Designing for Accessibility: A Comprehensive Guide",
    excerpt:
      "Learn how to create inclusive web experiences that work for everyone, regardless of abilities or disabilities.",
    category: "Design",
    date: "Mar 12, 2024",
    readTime: "8 min read",
    author: {
      name: "Jamie Chen",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: "3",
    title: "Optimizing Performance with Modern JavaScript",
    excerpt:
      "Discover techniques to boost your web application performance using the latest JavaScript features.",
    category: "Performance",
    date: "Mar 10, 2024",
    readTime: "5 min read",
    author: {
      name: "Sam Wilson",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: "4",
    title: "The Psychology of Color in Web Design",
    excerpt:
      "Understanding how color choices influence user perception and behavior on your website.",
    category: "Design",
    date: "Mar 8, 2024",
    readTime: "7 min read",
    author: {
      name: "Taylor Reed",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
];

const TimelineBlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b from-cyan-50 to-white px-4 py-24 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="mb-3 inline-block"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
          >
            <span className="rounded-full bg-cyan-100 px-4 py-1.5 text-sm font-medium text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300">
              Latest Updates
            </span>
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Our{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent dark:from-cyan-400 dark:to-blue-400">
              Timeline
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Follow our journey through the latest articles and insights.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline center line */}
          <motion.div
            className="absolute bottom-0 left-1/2 top-0 w-0.5 bg-gradient-to-b from-cyan-300 to-blue-500 dark:from-cyan-700 dark:to-blue-700"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {demoBlogs.map((blog, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={blog.id}
                className={`relative mb-16 flex flex-col md:mb-24 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-1/2 top-0 z-10 h-6 w-6 -translate-x-1/2 rounded-full border-4 border-cyan-500 bg-white dark:border-cyan-400 dark:bg-slate-800 md:top-1/2 md:-translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                    delay: 0.2 + index * 0.2,
                  }}
                />

                {/* Date bubble */}
                <motion.div
                  className={`absolute left-1/2 top-0 -translate-x-1/2 md:top-1/2 md:-translate-y-1/2 ${isEven ? "md:left-auto md:right-1/2 md:translate-x-12" : "md:left-1/2 md:right-auto md:-translate-x-12"} z-10 rounded-full bg-cyan-500 px-4 py-2 text-sm font-medium text-white shadow-lg dark:bg-cyan-600`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                >
                  {blog.date}
                </motion.div>

                {/* Content card */}
                <div
                  className={`mt-12 w-full md:mt-0 md:w-5/12 ${isEven ? "md:pr-16" : "md:pl-16"}`}
                >
                  <motion.div
                    className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-800"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={
                          blog.coverImage ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60" />
                      <div className="absolute left-4 top-4 z-10">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-cyan-600 dark:bg-slate-900/90 dark:text-cyan-400">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-3 line-clamp-2 text-xl font-bold text-slate-900 transition-colors duration-300 hover:text-cyan-600 dark:text-white dark:hover:text-cyan-400">
                        {blog.title}
                      </h3>

                      <p className="mb-6 line-clamp-3 text-slate-600 dark:text-slate-400">
                        {blog.excerpt}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={
                              blog.author.avatar ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={blog.author.name}
                            width={32}
                            height={32}
                            className="rounded-full border-2 border-white dark:border-slate-700"
                          />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {blog.author.name}
                          </span>
                        </div>

                        <motion.button
                          className="flex items-center gap-1 text-sm font-medium text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                          whileHover={{ x: 3 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          Read more
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
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.button
            className="group mx-auto flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-medium text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-600 hover:to-blue-600 dark:from-cyan-600 dark:to-blue-600 dark:shadow-cyan-500/10 dark:hover:from-cyan-500 dark:hover:to-blue-500"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            View all articles
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
              className="transform transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineBlogSection;
