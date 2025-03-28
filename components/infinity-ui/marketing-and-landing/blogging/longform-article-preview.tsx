"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type LongformArticle = {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  coverImage: string;
  pullQuote?: string;
};

const demoArticle: LongformArticle = {
  id: "1",
  title:
    "The Silent Revolution: How Artificial Intelligence is Reshaping Our World",
  subtitle:
    "From healthcare to transportation, AI is transforming industries and challenging our understanding of what it means to be human.",
  excerpt:
    "In the quiet corridors of research labs and behind the screens of developers worldwide, a revolution is taking place. Unlike the industrial revolutions of centuries past, this one doesn't announce itself with the clang of machinery or the smoke of factories. Instead, it unfolds in algorithms and neural networks, in the invisible architecture of artificial intelligence that increasingly shapes our daily lives.",
  category: "Technology",
  date: "April 15, 2024",
  readTime: "18 min read",
  author: {
    name: "Elizabeth Chen",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    bio: 'Elizabeth Chen is a technology journalist and author of "The Digital Horizon: Navigating Our Technological Future." Her work has appeared in The Atlantic, Wired, and MIT Technology Review.',
  },
  coverImage:
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=1200&width=2000",
  pullQuote:
    "We stand at a crossroads where the decisions we make about AI today will echo through generations to come, shaping not just our tools, but our very conception of humanity.",
};

const LongformArticlePreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="bg-slate-50 px-4 py-24 dark:bg-slate-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-4xl">
        <motion.article
          className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header */}
          <div className="border-b border-slate-200 p-8 dark:border-slate-700 md:p-12">
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-medium uppercase tracking-wider text-slate-900 dark:text-white">
                {demoArticle.category}
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
              <span>{demoArticle.date}</span>
            </div>

            <h1 className="mb-4 font-serif text-3xl font-bold leading-tight text-slate-900 dark:text-white md:text-4xl">
              {demoArticle.title}
            </h1>

            <p className="mb-8 font-serif text-xl italic text-slate-600 dark:text-slate-300">
              {demoArticle.subtitle}
            </p>

            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={
                    demoArticle.author.avatar ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={demoArticle.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-medium text-slate-900 dark:text-white">
                  {demoArticle.author.name}
                </div>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {demoArticle.readTime}
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative h-80 md:h-96">
            <Image
              src={
                demoArticle.coverImage ||
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
              }
              alt={demoArticle.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Article Preview */}
          <div className="p-8 md:p-12">
            <div className="mb-8 font-serif text-lg leading-relaxed text-slate-700 dark:text-slate-300 md:text-xl">
              <p className="mb-6 first-letter:float-left first-letter:mr-1 first-letter:text-5xl first-letter:font-bold first-letter:leading-none">
                {demoArticle.excerpt}
              </p>

              <p className="mb-6">
                The implications of this shift are profound and far-reaching. As
                AI systems become more sophisticated, they&apos;re not just
                automating routine tasks but making decisions that were once the
                exclusive domain of human judgment. From diagnosing diseases to
                approving loans, from recommending content to driving cars, AI
                is increasingly the invisible hand guiding our choices and
                opportunities.
              </p>

              {demoArticle.pullQuote && (
                <blockquote className="my-8 border-l-4 border-slate-300 pl-6 text-2xl font-medium italic text-slate-800 dark:border-slate-600 dark:text-slate-200">
                  &quot;{demoArticle.pullQuote}&quot;
                </blockquote>
              )}

              <p className="mb-6">
                Yet for all its promise, this revolution brings challenges that
                we&apos;re only beginning to grapple with. Questions of bias,
                accountability, privacy, and the future of work loom large. As
                algorithms make more decisions about our lives, who ensures they
                do so fairly? As automation reshapes industries, what becomes of
                the workers displaced? And as AI systems become more autonomous,
                how do we maintain meaningful human control?
              </p>

              <p className="text-slate-400 dark:text-slate-500">
                Continue reading to explore these questions and more...
              </p>
            </div>

            {/* Author Bio */}
            <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-700">
              <h3 className="mb-4 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                About the Author
              </h3>
              <div className="flex flex-col items-start gap-6 md:flex-row">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={
                      demoArticle.author.avatar ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={demoArticle.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="mb-2 font-medium text-slate-900 dark:text-white">
                    {demoArticle.author.name}
                  </h4>
                  <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                    {demoArticle.author.bio}
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
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
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
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
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect width="4" height="12" x="2" y="9"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
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
                        <rect
                          width="20"
                          height="20"
                          x="2"
                          y="2"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Reading Button */}
            <div className="mt-10 text-center">
              <motion.button
                className="mx-auto flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3 font-medium text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue Reading
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
      </div>
    </section>
  );
};

export default LongformArticlePreview;
