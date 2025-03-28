"use client";

import { useState, useRef } from "react";
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

const FeaturedBlogGrid = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b from-white to-slate-50 px-4 py-24 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl">
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
            <span className="rounded-full bg-teal-50 px-4 py-1.5 text-sm font-medium text-teal-600 dark:bg-teal-900/30 dark:text-teal-300">
              Featured Articles
            </span>
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Latest from our{" "}
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
              Blog
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Discover insights, tutorials, and thought leadership from our
            community of experts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {demoBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              onMouseEnter={() => setHoveredId(blog.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <motion.div
                  className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent"
                  initial={{ opacity: 0.4 }}
                  animate={{ opacity: hoveredId === blog.id ? 0.7 : 0.4 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="relative h-full w-full"
                  animate={{
                    scale: hoveredId === blog.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Image
                    src={
                      blog.coverImage ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute left-4 top-4 z-20">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-teal-600 dark:bg-slate-900/90 dark:text-teal-400">
                    {blog.category}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <h3 className="mb-2 line-clamp-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-teal-200 md:text-2xl">
                    {blog.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <span>{blog.date}</span>
                    <span className="h-1 w-1 rounded-full bg-white/60"></span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="mb-6 text-slate-600 dark:text-slate-400">
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
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-white dark:border-slate-700"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {blog.author.name}
                    </span>
                  </div>

                  <motion.button
                    className="flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.button
            className="group mx-auto flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 font-medium text-white shadow-lg shadow-teal-500/20 hover:bg-teal-700 dark:bg-teal-500 dark:shadow-teal-500/10 dark:hover:bg-teal-600"
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

export default FeaturedBlogGrid;
