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
];

const MagazineBlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const featuredPost = demoBlogs.find((blog) => blog.featured) || demoBlogs[0];
  const sidebarPosts = demoBlogs
    .filter((blog) => blog.id !== featuredPost.id)
    .slice(0, 4);

  return (
    <section ref={ref} className="bg-amber-50 px-4 py-24 dark:bg-slate-900">
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
                <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                  Magazine Style
                </span>
              </motion.div>
              <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
                Our{" "}
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent dark:from-amber-400 dark:to-orange-400">
                  Publication
                </span>
              </h2>
              <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                Curated content from our expert writers and thought leaders.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex gap-2">
                <button className="rounded-md bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                  Popular
                </button>
                <button className="rounded-md bg-amber-600 px-4 py-2 text-white transition-colors hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-700">
                  Latest
                </button>
                <button className="rounded-md bg-white px-4 py-2 text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
                  Trending
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Featured Article */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <article
              className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800"
              onMouseEnter={() => setHoveredId(featuredPost.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-80 overflow-hidden">
                <motion.div
                  className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                  initial={{ opacity: 0.6 }}
                  animate={{
                    opacity: hoveredId === featuredPost.id ? 0.8 : 0.6,
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="relative h-full w-full"
                  animate={{
                    scale: hoveredId === featuredPost.id ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Image
                    src={
                      featuredPost.coverImage ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>

                <div className="absolute left-6 top-6 z-20 flex gap-3">
                  <span className="rounded-md bg-amber-500 px-3 py-1 text-xs font-medium text-white">
                    Featured
                  </span>
                  <span className="rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-amber-600 dark:bg-slate-900/90 dark:text-amber-400">
                    {featuredPost.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                  <div className="mb-3 flex items-center gap-2 text-sm text-white/80">
                    <span>{featuredPost.date}</span>
                    <span className="h-1 w-1 rounded-full bg-white/60"></span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold leading-tight text-white md:text-3xl">
                    {featuredPost.title}
                  </h3>

                  <p className="mb-6 line-clamp-2 text-white/80 md:line-clamp-3">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          featuredPost.author.avatar ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={featuredPost.author.name}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-white/30"
                      />
                      <span className="text-sm font-medium text-white">
                        {featuredPost.author.name}
                      </span>
                    </div>

                    <motion.button
                      className="flex items-center gap-2 rounded-md bg-amber-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-amber-600"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read Article
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
              </div>
            </article>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <div className="border-b border-slate-100 p-6 dark:border-slate-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Popular Articles
                </h3>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {sidebarPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    className="flex gap-4 p-6 transition-colors duration-300 hover:bg-amber-50 dark:hover:bg-slate-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={
                          post.coverImage ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="rounded-sm bg-amber-100 px-2 py-0.5 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
                          {post.category}
                        </span>
                        <span>{post.date}</span>
                      </div>

                      <h4 className="mb-1 line-clamp-2 text-sm font-bold text-slate-900 transition-colors hover:text-amber-600 dark:text-white dark:hover:text-amber-400">
                        {post.title}
                      </h4>

                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <Image
                          src={
                            post.author.avatar ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={post.author.name}
                          width={16}
                          height={16}
                          className="rounded-full"
                        />
                        <span>{post.author.name}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="border-t border-slate-100 p-6 dark:border-slate-700">
                <motion.button
                  className="w-full rounded-md bg-amber-100 py-2.5 text-sm font-medium text-amber-800 transition-colors hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View All Articles
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MagazineBlogSection;
