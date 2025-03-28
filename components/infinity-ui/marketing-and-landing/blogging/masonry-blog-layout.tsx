"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
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
  featured?: boolean;
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
    featured: true,
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
    featured: true,
  },
  {
    id: "5",
    title: "Building Scalable APIs with GraphQL",
    excerpt:
      "A deep dive into creating efficient and scalable APIs using GraphQL instead of traditional REST.",
    category: "Development",
    date: "Mar 5, 2024",
    readTime: "9 min read",
    author: {
      name: "Jordan Lee",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: "6",
    title: "The Rise of AI in Content Creation",
    excerpt:
      "How artificial intelligence is transforming the way we create and consume digital content.",
    category: "AI",
    date: "Mar 3, 2024",
    readTime: "6 min read",
    author: {
      name: "Casey Kim",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
];

const MasonryBlogLayout = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(demoBlogs);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const categories = [
    "All",
    ...Array.from(new Set(demoBlogs.map((blog) => blog.category))),
  ];

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredBlogs(demoBlogs);
    } else {
      setFilteredBlogs(
        demoBlogs.filter((blog) => blog.category === selectedCategory),
      );
    }
  }, [selectedCategory]);

  return (
    <section ref={ref} className="bg-slate-50 px-4 py-24 dark:bg-slate-900">
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
            <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300">
              Explore Topics
            </span>
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Curated{" "}
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Articles
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Filter by category to find exactly what you&apos;re looking for.
          </p>
        </motion.div>

        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <AnimatePresence mode="wait">
            {filteredBlogs.length > 0 ? (
              <>
                {filteredBlogs.map((blog, index) => {
                  // Create a true masonry layout with different column spans
                  const isWide = blog.featured || index % 5 === 0;
                  const isTall = blog.featured || index % 3 === 0;

                  return (
                    <motion.article
                      key={blog.id}
                      className={`group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-500 hover:shadow-xl dark:bg-slate-800 ${
                        isWide
                          ? "md:col-span-6 lg:col-span-8"
                          : "md:col-span-6 lg:col-span-4"
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      layout
                    >
                      <div
                        className={`relative overflow-hidden ${isTall ? "h-72 md:h-80" : "h-56 md:h-64"}`}
                      >
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                        <motion.div
                          className="h-full w-full"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Image
                            src={
                              blog.coverImage ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        </motion.div>
                        <div className="absolute left-4 top-4 z-20">
                          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-indigo-600 dark:bg-slate-900/90 dark:text-indigo-400">
                            {blog.category}
                          </span>
                        </div>
                        {blog.featured && (
                          <div className="absolute right-4 top-4 z-20">
                            <span className="flex items-center gap-1 rounded-full bg-indigo-600/90 px-3 py-1 text-xs font-medium text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                              </svg>
                              Featured
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                          <h3 className="mb-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-indigo-200">
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
                              width={32}
                              height={32}
                              className="rounded-full border-2 border-white dark:border-slate-700"
                            />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {blog.author.name}
                            </span>
                          </div>

                          <motion.button
                            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
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
                    </motion.article>
                  );
                })}
              </>
            ) : (
              <motion.div
                className="col-span-12 py-20 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 inline-block rounded-full bg-slate-100 p-4 dark:bg-slate-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-400"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.3-4.3"></path>
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-medium text-slate-900 dark:text-white">
                  No articles found
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  We couldn&apos;t find any articles in this category.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MasonryBlogLayout;
