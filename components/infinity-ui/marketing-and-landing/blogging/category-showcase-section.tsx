"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Category = {
  id: string;
  name: string;
  description: string;
  postCount: number;
  image: string;
  color: string;
};

const demoCategories: Category[] = [
  {
    id: "1",
    name: "Development",
    description:
      "Tutorials, tips, and best practices for web and app development.",
    postCount: 42,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: "2",
    name: "Design",
    description:
      "Insights on UI/UX design, visual design trends, and creative inspiration.",
    postCount: 38,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "3",
    name: "Business",
    description:
      "Strategies for growth, marketing tips, and entrepreneurship advice.",
    postCount: 27,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "4",
    name: "Technology",
    description:
      "The latest in tech news, innovations, and digital transformation.",
    postCount: 35,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    color: "from-emerald-500 to-green-600",
  },
  {
    id: "5",
    name: "Productivity",
    description: "Tools and techniques to boost your efficiency and workflow.",
    postCount: 19,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "6",
    name: "Tutorials",
    description:
      "Step-by-step guides to help you master new skills and technologies.",
    postCount: 31,
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    color: "from-cyan-500 to-blue-600",
  },
];

const CategoryShowcaseSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="bg-white px-4 py-24 dark:bg-slate-900">
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
            <span className="rounded-full bg-violet-100 px-4 py-1.5 text-sm font-medium text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
              Browse by Topic
            </span>
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-purple-400">
              Categories
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Find the content that matters most to you, organized by topic.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {demoCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className="group relative h-64 overflow-hidden rounded-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={
                    category.image ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 transition-opacity duration-300 group-hover:opacity-90`}
              ></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <div>
                  <h3 className="mb-2 text-2xl font-bold">{category.name}</h3>
                  <p className="line-clamp-2 text-sm text-white/80">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {category.postCount} Articles
                  </span>

                  <motion.button
                    className="flex items-center gap-2 rounded-md bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/30 group-hover:bg-white group-hover:text-violet-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcaseSection;
