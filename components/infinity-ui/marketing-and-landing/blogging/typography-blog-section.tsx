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
];

const TypographyBlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b from-purple-50 to-white px-4 py-24 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-20 text-center"
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
            <span className="rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
              Typography Focus
            </span>
          </motion.div>
          <h2 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-7xl">
            The{" "}
            <span className="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-violet-400">
              Journal
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-slate-600 dark:text-slate-400">
            Where ideas come to life through carefully crafted words.
          </p>
        </motion.div>

        <div className="space-y-20">
          {demoBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.2 }}
            >
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                <div
                  className={`${index % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}
                >
                  <motion.div
                    className="relative h-80 overflow-hidden rounded-2xl"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                    <div className="absolute bottom-6 left-6 z-10">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-purple-600 dark:bg-slate-900/90 dark:text-purple-400">
                        {blog.category}
                      </span>
                    </div>
                  </motion.div>
                </div>

                <div
                  className={`${index % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="mb-4 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span>{blog.date}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="mb-6 text-3xl font-bold leading-tight text-slate-900 transition-colors duration-300 group-hover:text-purple-600 dark:text-white dark:group-hover:text-purple-400 md:text-4xl">
                    {blog.title}
                  </h3>

                  <p className="mb-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          blog.author.avatar ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={blog.author.name}
                        width={48}
                        height={48}
                        className="rounded-full border-2 border-white dark:border-slate-700"
                      />
                      <span className="font-medium text-slate-900 dark:text-white">
                        {blog.author.name}
                      </span>
                    </div>

                    <motion.button
                      className="flex items-center gap-2 font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      Continue Reading
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
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>

              {index < demoBlogs.length - 1 && (
                <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />
              )}
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.button
            className="group mx-auto flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 px-8 py-4 text-lg font-medium text-white shadow-lg shadow-purple-500/20 hover:from-purple-700 hover:to-violet-700 dark:from-purple-500 dark:to-violet-500 dark:shadow-purple-500/10 dark:hover:from-purple-600 dark:hover:to-violet-600"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore All Articles
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

export default TypographyBlogSection;
