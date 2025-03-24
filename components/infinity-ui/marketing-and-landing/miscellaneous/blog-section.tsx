"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  User,
  Clock,
  Tag,
  Search,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const BlogSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "design", name: "Design" },
    { id: "development", name: "Development" },
    { id: "business", name: "Business" },
    { id: "technology", name: "Technology" },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "10 UI/UX Design Trends to Watch in 2022",
      excerpt:
        "Explore the latest design trends that are shaping the digital landscape and enhancing user experiences.",
      category: "design",
      author: "Wabweni Brian",
      date: "June 15, 2023",
      readTime: "5 min read",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypouhz0wkNED5Qlqj4MCfA9YZF8a17gLJpISKTi",
      featured: true,
      tags: ["Design", "Trends", "UI/UX"],
    },
    {
      id: 2,
      title: "Building Scalable Applications with Next.js",
      excerpt:
        "Learn how to leverage Next.js features to build performant and scalable web applications.",
      category: "development",
      author: "Sam Chen",
      date: "May 28, 2023",
      readTime: "8 min read",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoIO9aqQfJg2woBpC7zun1UTeXvFLckMQhDxO4",
      featured: false,
      tags: ["Next.js", "React", "Performance"],
    },
    {
      id: 3,
      title: "The Future of AI in Business Operations",
      excerpt:
        "Discover how artificial intelligence is transforming business operations and creating new opportunities.",
      category: "business",
      author: "Jordan Lee",
      date: "June 2, 2023",
      readTime: "6 min read",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoHmn5yb4LPQRizs519hDeHlYBAUcyNFxWk2M6",
      featured: false,
      tags: ["AI", "Business", "Innovation"],
    },
    {
      id: 4,
      title: "Optimizing React Performance with Memo and Callbacks",
      excerpt:
        "Deep dive into React's performance optimization techniques to build faster and more efficient applications.",
      category: "development",
      author: "Taylor Swift",
      date: "May 15, 2023",
      readTime: "10 min read",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo2Mkzo3nMDpXfNQxBWlLjIOS4rh86E13UCnAg",
      featured: false,
      tags: ["React", "Performance", "JavaScript"],
    },
    {
      id: 5,
      title: "The Rise of Web3 Technologies",
      excerpt:
        "Explore the emerging Web3 ecosystem and how it's changing the future of internet applications.",
      category: "technology",
      author: "Chris Johnson",
      date: "June 10, 2023",
      readTime: "7 min read",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoTHHHFYmxINGL43Bmkhwazp7exFWUt06ZryRu",
      featured: false,
      tags: ["Web3", "Blockchain", "Crypto"],
    },
    {
      id: 6,
      title: "Creating Accessible Design Systems",
      excerpt:
        "Learn how to build inclusive design systems that work for everyone, regardless of ability or context.",
      category: "design",
      author: "Jamie Rodriguez",
      date: "May 20, 2023",
      readTime: "6 min read",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo4S1TnrdV8HBnj2sim5N7M41k9TADhtKvdpry",
      featured: false,
      tags: ["Accessibility", "Design Systems", "Inclusion"],
    },
  ];

  const filteredPosts = blogPosts
    .filter(
      (post) => activeCategory === "all" || post.category === activeCategory,
    )
    .filter(
      (post) =>
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );

  const featuredPost = blogPosts.find((post) => post.featured);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-rose-400/30 to-orange-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-amber-400/30 to-yellow-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="blog-grid"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0 0L40 40M40 0L0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-grid)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-amber-500"></span>
            <span className="mx-2 font-medium text-amber-500">OUR BLOG</span>
            <span className="h-1 w-12 rounded-full bg-amber-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Latest insights and
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              {" "}
              industry trends
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Stay updated with our latest articles, tutorials, and insights on
            design, development, and technology.
          </p>

          {/* Search and Filters */}
          <div className="mx-auto mb-12 max-w-3xl">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 pl-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-amber-400"
              />
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400 dark:text-gray-500" />
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-xl px-5 py-2 text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-16"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 blur-xl"></div>
            <div className="relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-xl dark:border-gray-700/50 dark:bg-gray-800">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative aspect-[4/3] lg:aspect-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 opacity-20"></div>
                  <Image
                    src={featuredPost.image || "/default-image.jpg"}
                    alt={featuredPost.title}
                    fill
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-4 top-4 rounded-lg bg-amber-500 px-3 py-1 text-sm font-medium text-white">
                    Featured
                  </div>
                </div>

                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <div className="mb-4 flex items-center space-x-4">
                    <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="mr-1 h-4 w-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <User className="mr-1 h-4 w-4" />
                      {featuredPost.author}
                    </span>
                    <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <Clock className="mr-1 h-4 w-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
                    {featuredPost.title}
                  </h3>

                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    {featuredPost.excerpt}
                  </p>

                  <div className="mb-8 flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                      >
                        <Tag className="mr-1 inline-block h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="inline-flex transform items-center self-start rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-500/25">
                    Read Article
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredPosts
              .filter((post) => !post.featured)
              .map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>

                  <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200/50 bg-white shadow-lg transition-colors duration-300 group-hover:border-transparent dark:border-gray-700/50 dark:bg-gray-800">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 opacity-20"></div>
                      <Image
                        src={post.image || "/default-image.jpg"}
                        alt={post.title}
                        fill
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                      <div className="absolute left-4 top-4 rounded-lg bg-white/80 px-3 py-1 text-sm font-medium text-amber-600 backdrop-blur-sm dark:bg-gray-800/80 dark:text-amber-400">
                        {categories.find((c) => c.id === post.category)?.name}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <div className="mb-3 flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {post.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                        {post.title}
                      </h3>

                      <p className="mb-4 flex-1 text-sm text-gray-600 dark:text-gray-300">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          By {post.author}
                        </span>
                        <button className="flex items-center text-sm font-medium text-amber-600 group-hover:underline dark:text-amber-400">
                          Read more
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">
            Want to stay updated with our latest articles and news?
          </p>
          <div className="mx-auto flex max-w-xl flex-col gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 rounded-xl border border-gray-300 bg-white px-5 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-amber-400"
            />
            <button className="inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg hover:shadow-amber-500/25">
              Subscribe
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
