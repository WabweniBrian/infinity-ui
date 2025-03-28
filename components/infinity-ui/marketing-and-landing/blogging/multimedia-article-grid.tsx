"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type MediaType = "text" | "video" | "audio" | "interactive";

type MultimediaArticle = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime?: string;
  author: {
    name: string;
    avatar: string;
  };
  coverImage: string;
  mediaType: MediaType;
  duration?: string;
};

const demoArticles: MultimediaArticle[] = [
  {
    id: "1",
    title: "The Future of Remote Work: Balancing Flexibility and Connection",
    excerpt:
      "How companies are reimagining workplace culture in a distributed world.",
    category: "Business",
    date: "Apr 18, 2024",
    readTime: "9 min read",
    author: {
      name: "Morgan Chen",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    mediaType: "text",
  },
  {
    id: "2",
    title: "Inside the Studio: The Making of Modern Music",
    excerpt:
      "A behind-the-scenes look at how today's biggest hits come together.",
    category: "Culture",
    date: "Apr 16, 2024",
    author: {
      name: "Jamal Washington",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    mediaType: "video",
    duration: "14:32",
  },
  {
    id: "3",
    title: "Climate Solutions: Innovations That Could Save Our Planet",
    excerpt:
      "From carbon capture to sustainable agriculture, the technologies offering hope.",
    category: "Science",
    date: "Apr 15, 2024",
    readTime: "11 min read",
    author: {
      name: "Sophia Rodriguez",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    mediaType: "text",
  },
  {
    id: "4",
    title: "The History of Money: From Shells to Digital Currency",
    excerpt:
      "Exploring the evolution of value exchange across human civilization.",
    category: "Economics",
    date: "Apr 14, 2024",
    author: {
      name: "David Kim",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    mediaType: "audio",
    duration: "38:15",
  },
  {
    id: "5",
    title: "Explore the Human Genome: An Interactive Journey",
    excerpt: "Navigate through our DNA to understand what makes us human.",
    category: "Science",
    date: "Apr 12, 2024",
    author: {
      name: "Elena Patel",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    mediaType: "interactive",
  },
  {
    id: "6",
    title: "The Art of Slow Living in a Fast-Paced World",
    excerpt:
      "Finding balance and meaning by embracing a more deliberate lifestyle.",
    category: "Wellness",
    date: "Apr 10, 2024",
    readTime: "7 min read",
    author: {
      name: "Thomas Lee",
      avatar:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    },
    coverImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    mediaType: "text",
  },
];

const MultimediaArticleGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<MediaType | "all">("all");

  const filteredArticles =
    activeFilter === "all"
      ? demoArticles
      : demoArticles.filter((article) => article.mediaType === activeFilter);

  const getMediaTypeIcon = (type: MediaType) => {
    switch (type) {
      case "video":
        return (
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
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        );
      case "audio":
        return (
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
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
          </svg>
        );
      case "interactive":
        return (
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
            <path d="M14 4h6v6"></path>
            <path d="m15 5 5 5"></path>
            <path d="M10 20a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"></path>
          </svg>
        );
      default:
        return (
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
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z"></path>
            <path d="M8 7h6"></path>
            <path d="M8 11h8"></path>
            <path d="M8 15h6"></path>
          </svg>
        );
    }
  };

  return (
    <section
      ref={ref}
      className="bg-gradient-to-b from-gray-50 to-white px-4 py-24 dark:from-slate-900 dark:to-slate-800"
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
            <span className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              Multimedia Experience
            </span>
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Stories in{" "}
            <span className="bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent dark:from-gray-300 dark:to-gray-500">
              Every Format
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Explore our content in the way that suits you best—read, watch,
            listen, or interact.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {["all", "text", "video", "audio", "interactive"].map(
            (filter, index) => (
              <motion.button
                key={filter}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gray-900 text-white dark:bg-gray-700"
                    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
                onClick={() => setActiveFilter(filter as MediaType | "all")}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                {filter === "all" ? (
                  <>
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
                      <rect width="7" height="7" x="3" y="3" rx="1"></rect>
                      <rect width="7" height="7" x="14" y="3" rx="1"></rect>
                      <rect width="7" height="7" x="14" y="14" rx="1"></rect>
                      <rect width="7" height="7" x="3" y="14" rx="1"></rect>
                    </svg>
                    All Formats
                  </>
                ) : (
                  <>
                    {getMediaTypeIcon(filter as MediaType)}
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </>
                )}
              </motion.button>
            ),
          )}
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, index) => (
            <motion.article
              key={article.id}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredId(article.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -5 }}
              layout
            >
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
                </motion.div>

                {/* Media Type Badge */}
                <div className="absolute left-4 top-4 z-10">
                  <div
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${article.mediaType === "video" ? "bg-red-500 text-white" : ""} ${article.mediaType === "audio" ? "bg-purple-500 text-white" : ""} ${article.mediaType === "interactive" ? "bg-blue-500 text-white" : ""} ${article.mediaType === "text" ? "bg-white/90 text-gray-800 dark:bg-gray-900/90 dark:text-gray-200" : ""} `}
                  >
                    {getMediaTypeIcon(article.mediaType)}
                    {article.mediaType === "video" && "Video"}
                    {article.mediaType === "audio" && "Podcast"}
                    {article.mediaType === "interactive" && "Interactive"}
                    {article.mediaType === "text" && article.category}
                  </div>
                </div>

                {/* Play Button for Video/Audio */}
                {(article.mediaType === "video" ||
                  article.mediaType === "audio") && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className={`flex h-16 w-16 items-center justify-center rounded-full ${article.mediaType === "video" ? "bg-red-500/90" : "bg-purple-500/90"} text-white`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {article.mediaType === "video" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
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
                      )}
                    </motion.div>
                  </div>
                )}

                {/* Duration Badge */}
                {article.duration && (
                  <div className="absolute bottom-4 right-4 z-10">
                    <div className="rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                      {article.duration}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  {article.mediaType === "text" && (
                    <>
                      <span>{article.date}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-600"></span>
                      <span>{article.readTime}</span>
                    </>
                  )}
                  {article.mediaType !== "text" && (
                    <>
                      <span>{article.category}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-600"></span>
                      <span>{article.date}</span>
                    </>
                  )}
                </div>

                <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                  {article.title}
                </h3>

                <p className="mb-6 line-clamp-2 flex-grow text-sm text-gray-600 dark:text-gray-400">
                  {article.excerpt}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8 overflow-hidden rounded-full">
                      <Image
                        src={
                          article.author.avatar ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={article.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {article.author.name}
                    </span>
                  </div>

                  <motion.button
                    className={`flex items-center gap-1 text-sm font-medium ${article.mediaType === "video" ? "text-red-600 dark:text-red-400" : ""} ${article.mediaType === "audio" ? "text-purple-600 dark:text-purple-400" : ""} ${article.mediaType === "interactive" ? "text-blue-600 dark:text-blue-400" : ""} ${article.mediaType === "text" ? "text-gray-600 dark:text-gray-400" : ""} `}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {article.mediaType === "video" && "Watch"}
                    {article.mediaType === "audio" && "Listen"}
                    {article.mediaType === "interactive" && "Explore"}
                    {article.mediaType === "text" && "Read"}
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
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.button
            className="group mx-auto flex items-center gap-2 rounded-full bg-gray-900 px-8 py-3 font-medium text-white shadow-lg hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Explore All Content
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

export default MultimediaArticleGrid;
