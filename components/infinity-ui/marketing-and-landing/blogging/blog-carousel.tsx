"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
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

const BlogCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const scrollToCard = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.scrollWidth / demoBlogs.length;
      carouselRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = useCallback(() => {
    if (carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = carouselRef.current.scrollWidth / demoBlogs.length;
      const newActiveIndex = Math.round(scrollPosition / cardWidth);

      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, [activeIndex, handleScroll]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      className="min-h-screen overflow-hidden bg-white px-4 py-24 dark:bg-slate-900"
      ref={ref}
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="mb-4 flex justify-center"
          >
            <div className="h-1.5 w-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="mb-4 text-center text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl"
          >
            Trending{" "}
            <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent dark:from-rose-400 dark:to-pink-400">
              Articles
            </span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-center text-lg text-slate-600 dark:text-slate-400"
          >
            Stay updated with the latest insights and trends in the industry.
          </motion.p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => scrollToCard(Math.max(activeIndex - 1, 0))}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition-colors hover:bg-rose-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Previous slide"
            >
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
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
          </motion.div>

          <motion.div
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() =>
                scrollToCard(Math.min(activeIndex + 1, demoBlogs.length - 1))
              }
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg transition-colors hover:bg-rose-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              aria-label="Next slide"
            >
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
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </motion.div>

          <div
            ref={carouselRef}
            className="scrollbar-hide -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-8"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {demoBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                className="min-w-[85%] snap-center px-3 sm:min-w-[60%] md:min-w-[40%] lg:min-w-[30%]"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
                  <div className="relative h-56 overflow-hidden">
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
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-rose-600 dark:bg-slate-900/90 dark:text-rose-400">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{blog.date}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="mb-3 line-clamp-2 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-rose-600 dark:text-white dark:group-hover:text-rose-400">
                      {blog.title}
                    </h3>

                    <p className="mb-4 line-clamp-2 text-sm text-slate-600 dark:text-slate-400">
                      {blog.excerpt}
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700">
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            blog.author.avatar ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={blog.author.name}
                          width={28}
                          height={28}
                          className="rounded-full border-2 border-white dark:border-slate-700"
                        />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                          {blog.author.name}
                        </span>
                      </div>

                      <motion.button
                        className="flex items-center gap-1 text-sm font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                        whileHover={{ x: 3 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
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
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {demoBlogs.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`transition-all duration-300 ${
                  activeIndex === index
                    ? "h-2 w-8 rounded-full bg-rose-600"
                    : "h-2 w-2 rounded-full bg-slate-300 hover:bg-rose-400 dark:bg-slate-700 dark:hover:bg-rose-700"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
