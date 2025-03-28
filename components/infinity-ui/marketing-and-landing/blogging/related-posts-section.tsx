"use client";

import { useRef, useState } from "react";
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
  tags: string[];
};

const demoPosts: BlogPost[] = [
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
    tags: ["Web Development", "Future Tech", "Trends"],
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
    tags: ["Accessibility", "UX Design", "Inclusive Design"],
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
    tags: ["JavaScript", "Performance", "Optimization"],
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
    tags: ["Web Design", "Color Theory", "Psychology"],
  },
];

const RelatedPostsSection = () => {
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
                <span className="rounded-full bg-rose-100 px-4 py-1.5 text-sm font-medium text-rose-800 dark:bg-rose-900/30 dark:text-rose-300">
                  You Might Also Like
                </span>
              </motion.div>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
                Related{" "}
                <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent dark:from-rose-400 dark:to-pink-400">
                  Articles
                </span>
              </h2>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Discover more content based on what you&apos;re currently
                reading.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {demoPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(post.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -5 }}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.div
                  animate={{
                    scale: hoveredId === post.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="h-full w-full"
                >
                  <Image
                    src={
                      post.coverImage ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                <div className="absolute left-4 top-4 z-10">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-rose-600 dark:bg-slate-900/90 dark:text-rose-400">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="mb-3 line-clamp-2 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-rose-600 dark:text-white dark:group-hover:text-rose-400">
                  {post.title}
                </h3>

                <p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                  {post.excerpt}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Image
                      src={
                        post.author.avatar ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      {post.author.name}
                    </span>
                  </div>

                  <motion.button
                    className="flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Read
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

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.button
            className="group mx-auto flex items-center gap-2 rounded-full bg-rose-600 px-6 py-3 font-medium text-white shadow-lg shadow-rose-500/20 hover:bg-rose-700 dark:bg-rose-500 dark:shadow-rose-500/10 dark:hover:bg-rose-600"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            View more recommendations
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

export default RelatedPostsSection;
