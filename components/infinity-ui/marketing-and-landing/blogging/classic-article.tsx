"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type ArticleProps = {
  title: string;
  subtitle?: string;
  coverImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  content: React.ReactNode;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  tags?: string[];
};

const ClassicArticle = ({
  title = "Understanding Modern Web Architecture: A Comprehensive Guide",
  subtitle = "Exploring the evolution of web architecture and best practices for building scalable applications",
  coverImage = "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  publishDate = "April 22, 2024",
  readTime = "12 min read",
  category = "Web Development",
  content,
  author = {
    name: "Alex Morgan",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    bio: "Senior Web Developer with over 10 years of experience building scalable web applications. Passionate about modern web technologies and best practices.",
  },
  tags = [
    "Web Development",
    "Architecture",
    "Frontend",
    "Backend",
    "Performance",
  ],
}: ArticleProps) => {
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Default content if none provided
  const defaultContent = (
    <>
      <p className="mb-6 text-lg leading-relaxed">
        Web architecture has evolved significantly over the past decade, moving
        from simple client-server models to complex distributed systems.
        Understanding these architectural patterns is crucial for building
        modern, scalable applications that can handle the demands of
        today&apos;s users.
      </p>

      <h2 className="mb-4 mt-10 text-2xl font-bold">
        The Evolution of Web Architecture
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        In the early days of the web, most applications followed a monolithic
        architecture where all components of the application were interconnected
        and ran as a single service. While this approach was simpler to develop
        and deploy, it posed significant challenges in terms of scalability and
        maintenance.
      </p>
      <p className="mb-6 text-lg leading-relaxed">
        As web applications grew in complexity, developers began breaking down
        these monoliths into smaller, more manageable services. This led to the
        rise of service-oriented architecture (SOA) and eventually
        microservices, where applications are composed of loosely coupled,
        independently deployable services.
      </p>

      <h2 className="mb-4 mt-10 text-2xl font-bold">
        Modern Architectural Patterns
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        Today, several architectural patterns dominate the web development
        landscape:
      </p>

      <h3 className="mb-3 mt-8 text-xl font-bold">
        1. Microservices Architecture
      </h3>
      <p className="mb-6 text-lg leading-relaxed">
        Microservices architecture breaks down applications into small,
        specialized services that communicate through well-defined APIs. Each
        service is responsible for a specific business capability and can be
        developed, deployed, and scaled independently.
      </p>

      <div className="my-8 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
        <h4 className="mb-2 text-lg font-bold">
          Key Benefits of Microservices:
        </h4>
        <ul className="list-disc space-y-2 pl-6">
          <li>Independent scaling of services based on demand</li>
          <li>
            Technology flexibility - different services can use different tech
            stacks
          </li>
          <li>
            Improved fault isolation - a failure in one service doesn&apos;t
            bring down the entire application
          </li>
          <li>Easier continuous deployment and integration</li>
        </ul>
      </div>

      <h3 className="mb-3 mt-8 text-xl font-bold">
        2. Serverless Architecture
      </h3>
      <p className="mb-6 text-lg leading-relaxed">
        Serverless architecture takes the concept of managed services to the
        next level by allowing developers to build and run applications without
        thinking about servers. In this model, cloud providers automatically
        manage the infrastructure required to run your code.
      </p>

      <h3 className="mb-3 mt-8 text-xl font-bold">
        3. JAMstack (JavaScript, APIs, and Markup)
      </h3>
      <p className="mb-6 text-lg leading-relaxed">
        JAMstack is an architecture designed to make the web faster, more
        secure, and easier to scale. It decouples the frontend from the backend
        and database, relying instead on client-side JavaScript, reusable APIs,
        and prebuilt Markup.
      </p>

      <blockquote className="my-8 border-l-4 border-slate-300 pl-6 text-xl italic text-slate-700 dark:border-slate-600 dark:text-slate-300">
        &quot;The best architecture is the one that best serves your specific
        application&apos;s needs. There&apos;s no one-size-fits-all solution in
        web development.&quot;
      </blockquote>

      <h2 className="mb-4 mt-10 text-2xl font-bold">
        Choosing the Right Architecture
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        Selecting the appropriate architecture for your web application depends
        on various factors, including:
      </p>

      <ul className="mb-6 list-disc space-y-2 pl-6 text-lg">
        <li>Application complexity and scale</li>
        <li>Team size and expertise</li>
        <li>Development and deployment constraints</li>
        <li>Performance requirements</li>
        <li>Budget considerations</li>
      </ul>

      <p className="mb-6 text-lg leading-relaxed">
        It&apos;s important to remember that architectural decisions should be
        driven by business requirements rather than technical preferences. The
        goal is to create a system that delivers value to users while being
        maintainable and scalable over time.
      </p>

      <h2 className="mb-4 mt-10 text-2xl font-bold">Conclusion</h2>
      <p className="mb-6 text-lg leading-relaxed">
        Web architecture continues to evolve as new technologies and patterns
        emerge. By understanding the strengths and weaknesses of different
        architectural approaches, developers can make informed decisions that
        lead to successful, scalable web applications.
      </p>
      <p className="mb-6 text-lg leading-relaxed">
        Whether you choose microservices, serverless, JAMstack, or a hybrid
        approach, the key is to align your architecture with your business goals
        and user needs. Remember that architecture is not a goal in itself but a
        means to deliver value through software.
      </p>
    </>
  );

  return (
    <article ref={articleRef} className="relative bg-white dark:bg-slate-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Hero Section with Parallax */}
      <div className="relative h-[70vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: headerOpacity }}
        >
          <Image
            src={
              coverImage ||
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
            }
            alt={title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 dark:bg-black/70" />
        </motion.div>

        <motion.div
          className="relative z-10 flex h-full flex-col justify-end"
          style={{ opacity: headerOpacity, y: headerTranslateY }}
        >
          <div className="container mx-auto max-w-7xl px-4 pb-16 md:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                {category}
              </span>
            </motion.div>

            <motion.h1
              className="mb-4 max-w-4xl text-4xl font-bold text-white md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.p
                className="max-w-3xl text-xl text-white/90 md:text-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>
            )}

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-4 text-white/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <Image
                  src={
                    author.avatar ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={author.name}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-white/30"
                />
                <span>{author.name}</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-white/50"></div>
              <span>{publishDate}</span>
              <div className="h-1 w-1 rounded-full bg-white/50"></div>
              <span>{readTime}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Sidebar */}
          <div className="lg:w-1/6">
            <div className="sticky top-8 mb-8 flex gap-4 lg:mb-0 lg:flex-col">
              <motion.button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Share article"
              >
                <Share2 size={18} />
              </motion.button>

              <motion.button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Bookmark article"
              >
                <Bookmark size={18} />
              </motion.button>

              <motion.button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Like article"
              >
                <Heart size={18} />
              </motion.button>

              <motion.button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Comment on article"
              >
                <MessageCircle size={18} />
              </motion.button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-4/6">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {content || defaultContent}
            </div>

            {/* Tags */}
            {tags && tags.length > 0 && (
              <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
                <h3 className="mb-4 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <motion.a
                      key={index}
                      href={`/tags/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
              <div className="flex flex-col items-start gap-6 sm:flex-row">
                <Image
                  src={
                    author.avatar ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                    About {author.name}
                  </h3>
                  <p className="mb-4 text-slate-600 dark:text-slate-400">
                    {author.bio}
                  </p>
                  <motion.button
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Follow
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:w-1/6">
            <div className="sticky top-8">
              <h3 className="mb-4 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Share
              </h3>
              <div className="flex flex-row gap-3 lg:flex-col">
                <motion.a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition-colors hover:bg-opacity-90"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Share on Facebook"
                >
                  <Facebook size={18} />
                </motion.a>

                <motion.a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA1F2] text-white transition-colors hover:bg-opacity-90"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Share on Twitter"
                >
                  <Twitter size={18} />
                </motion.a>

                <motion.a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white transition-colors hover:bg-opacity-90"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={18} />
                </motion.a>

                <motion.button
                  onClick={copyToClipboard}
                  className="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Copy link"
                >
                  <Copy size={18} />
                  {copied && (
                    <motion.div
                      className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      Copied!
                    </motion.div>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ClassicArticle;
