"use client";

import type React from "react";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Share, Bookmark, ThumbsUp, MessageSquare } from "lucide-react";
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
    role: string;
  };
  relatedArticles?: {
    title: string;
    image: string;
    url: string;
  }[];
};

const MagazineArticle = ({
  title = "The Art of Sustainable Design: Creating Digital Experiences That Last",
  subtitle = "How thoughtful design choices can reduce environmental impact while improving user experience",
  coverImage = "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=1000&width=2000",
  publishDate = "April 25, 2024",
  readTime = "10 min read",
  category = "Design",
  content,
  author = {
    name: "Taylor Reed",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    role: "Design Director",
  },
  relatedArticles = [
    {
      title: "Designing for Accessibility: A Comprehensive Guide",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      url: "#",
    },
    {
      title: "The Psychology of Color in Web Design",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      url: "#",
    },
    {
      title: "Minimalism in UI: Less is More",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      url: "#",
    },
  ],
}: ArticleProps) => {
  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end start"],
  });

  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const headerScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);

  // Default content if none provided
  const defaultContent = (
    <>
      <p className="mb-8 font-serif text-xl leading-relaxed">
        In an era of digital abundance, where new websites and applications
        emerge daily, the concept of sustainable design has never been more
        relevant. Beyond aesthetics and functionality, designers now face the
        challenge of creating digital experiences that are environmentally
        conscious, ethically sound, and built to last.
      </p>

      <div className="relative my-12">
        <div className="absolute -left-16 bottom-0 top-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
        <p className="pl-8 font-serif text-2xl italic text-slate-700 dark:text-slate-300">
          Sustainable design isn&apos;t just about reducing carbon
          footprints—it&apos;s about creating digital experiences that respect
          users&apos; time, attention, and resources while standing the test of
          time.
        </p>
      </div>

      <h2 className="mb-8 mt-16 font-serif text-3xl font-bold">
        The Environmental Impact of Digital Design
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        Every website visit, every animation, every high-resolution image comes
        with an environmental cost. The internet consumes approximately 416.2
        TWh of electricity per year—more than the entire United Kingdom. From
        data centers to the devices in our pockets, the digital world has a very
        real carbon footprint.
      </p>

      <div className="my-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-4 font-serif text-xl font-bold">
            The Hidden Costs
          </h3>
          <p className="text-lg leading-relaxed">
            When we design digital products, we rarely consider their energy
            consumption. Heavy animations, autoplay videos, and unnecessarily
            large images all contribute to increased power usage—both on servers
            and on users&apos; devices.
          </p>
        </div>
        <div>
          <h3 className="mb-4 font-serif text-xl font-bold">
            Measuring Impact
          </h3>
          <p className="text-lg leading-relaxed">
            Tools like Website Carbon Calculator and Ecograder allow designers
            to measure the environmental impact of their digital products,
            providing insights into how design choices affect energy consumption
            and carbon emissions.
          </p>
        </div>
      </div>

      <figure className="relative my-16">
        <Image
          src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=800&width=1200"
          alt="Sustainable design process diagram"
          width={1200}
          height={800}
          className="rounded-lg"
        />
        <figcaption className="mt-4 text-center text-sm italic text-slate-500 dark:text-slate-400">
          The sustainable design process considers environmental impact at every
          stage, from conception to implementation.
        </figcaption>
      </figure>

      <h2 className="mb-8 mt-16 font-serif text-3xl font-bold">
        Principles of Sustainable Digital Design
      </h2>

      <div className="my-12 space-y-12">
        <div className="flex items-start gap-6">
          <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="text-xl font-bold">1</span>
          </div>
          <div>
            <h3 className="mb-4 font-serif text-2xl font-bold">
              Efficiency First
            </h3>
            <p className="text-lg leading-relaxed">
              Sustainable design prioritizes efficiency in every aspect—from
              code to visual elements. This means optimizing images, minimizing
              HTTP requests, and avoiding unnecessary animations or scripts that
              consume processing power without adding significant value.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="text-xl font-bold">2</span>
          </div>
          <div>
            <h3 className="mb-4 font-serif text-2xl font-bold">
              Longevity Over Trends
            </h3>
            <p className="text-lg leading-relaxed">
              Sustainable design favors timeless solutions over fleeting trends.
              By focusing on fundamental design principles rather than the
              latest fads, designers can create interfaces that remain relevant
              and functional for years, reducing the need for frequent redesigns
              and the associated resource consumption.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="mt-1 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
            <span className="text-xl font-bold">3</span>
          </div>
          <div>
            <h3 className="mb-4 font-serif text-2xl font-bold">
              Inclusive and Accessible
            </h3>
            <p className="text-lg leading-relaxed">
              Truly sustainable design is accessible to all users, regardless of
              their abilities or the devices they use. This not only ensures
              that digital products serve the widest possible audience but also
              reduces the need for specialized alternatives that duplicate
              resources.
            </p>
          </div>
        </div>
      </div>

      <div className="my-16 rounded-xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-8 dark:border-emerald-900/30 dark:from-emerald-950/30 dark:to-teal-950/30">
        <h3 className="mb-6 font-serif text-2xl font-bold">
          Case Study: Reformation
        </h3>
        <p className="mb-6 text-lg leading-relaxed">
          Fashion brand Reformation demonstrates sustainable digital design
          principles through their minimalist website. By using a restrained
          color palette, optimized images, and efficient code, they&apos;ve
          created a digital experience that aligns with their brand values while
          minimizing environmental impact.
        </p>
        <p className="text-lg leading-relaxed">
          Their approach proves that sustainability and aesthetic appeal can go
          hand in hand, resulting in a digital presence that&apos;s both
          beautiful and responsible.
        </p>
      </div>

      <h2 className="mb-8 mt-16 font-serif text-3xl font-bold">
        Practical Steps Toward Sustainable Design
      </h2>

      <div className="my-8 space-y-6">
        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
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
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <h4 className="mb-2 font-serif text-xl font-bold">
              Optimize Images and Media
            </h4>
            <p className="text-lg leading-relaxed">
              Use modern formats like WebP and AVIF, implement responsive
              images, and compress assets without sacrificing quality. Consider
              whether every image is necessary—sometimes, thoughtful typography
              or illustrations can be more efficient alternatives.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
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
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <h4 className="mb-2 font-serif text-xl font-bold">
              Embrace System Fonts and Variable Fonts
            </h4>
            <p className="text-lg leading-relaxed">
              System fonts eliminate the need to download additional font files,
              while variable fonts provide multiple styles and weights in a
              single file, reducing HTTP requests and file size.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
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
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <h4 className="mb-2 font-serif text-xl font-bold">
              Design for Dark Mode
            </h4>
            <p className="text-lg leading-relaxed">
              Dark mode not only reduces eye strain but can also save battery
              life on OLED and AMOLED screens, extending device lifespan and
              reducing energy consumption.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
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
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <h4 className="mb-2 font-serif text-xl font-bold">
              Implement Thoughtful Animations
            </h4>
            <p className="text-lg leading-relaxed">
              Use animations purposefully and efficiently. Consider using CSS
              transitions instead of JavaScript animations where possible, and
              respect user preferences for reduced motion.
            </p>
          </div>
        </div>
      </div>

      <div className="relative my-12">
        <div className="absolute -left-16 bottom-0 top-0 w-1 bg-gradient-to-b from-emerald-500 to-teal-500"></div>
        <p className="pl-8 font-serif text-2xl italic text-slate-700 dark:text-slate-300">
          The most sustainable design is one that users don&apos;t need to
          replace or redesign frequently—creating timeless digital experiences
          is perhaps the greatest sustainability achievement.
        </p>
      </div>

      <h2 className="mb-8 mt-16 font-serif text-3xl font-bold">
        The Future of Sustainable Design
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        As awareness of digital sustainability grows, we can expect to see new
        tools, frameworks, and best practices emerge. Already, initiatives like
        the Sustainable Web Manifesto and organizations like the Green Web
        Foundation are providing resources and guidance for designers committed
        to reducing their environmental impact.
      </p>
      <p className="mb-6 text-lg leading-relaxed">
        The future of sustainable design will likely involve greater
        transparency about the environmental costs of digital products, with
        carbon budgets becoming as common as performance budgets in the design
        process.
      </p>

      <h2 className="mb-8 mt-16 font-serif text-3xl font-bold">Conclusion</h2>
      <p className="mb-6 text-lg leading-relaxed">
        Sustainable design is not just an ethical choice—it&apos;s a practical
        approach that benefits users, businesses, and the planet. By creating
        digital experiences that are efficient, accessible, and built to last,
        designers can reduce environmental impact while delivering better user
        experiences.
      </p>
      <p className="mb-12 text-lg leading-relaxed">
        As we face growing environmental challenges, the digital design
        community has both an opportunity and a responsibility to lead the way
        toward a more sustainable future. Through thoughtful choices and a
        commitment to continuous improvement, we can create digital experiences
        that not only look good and work well but also respect the finite
        resources of our planet.
      </p>
    </>
  );

  return (
    <article ref={articleRef} className="relative bg-white dark:bg-slate-900">
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Hero Section with Parallax */}
      <div className="relative h-[80vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ opacity: headerOpacity, scale: headerScale }}
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>

        <div className="relative z-10 flex h-full flex-col justify-center">
          <div className="container mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto max-w-4xl text-center"
            >
              <span className="mb-6 inline-block rounded-full bg-emerald-500 px-3 py-1 text-sm font-medium text-white">
                {category}
              </span>
              <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
                {title}
              </h1>

              {subtitle && (
                <p className="mx-auto max-w-3xl font-serif text-xl text-white/90 md:text-2xl">
                  {subtitle}
                </p>
              )}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto max-w-7xl px-4 py-8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-white/90">
              <div className="flex items-center gap-4">
                <Image
                  src={
                    author.avatar ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={author.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white/30"
                />
                <div>
                  <div className="font-medium">{author.name}</div>
                  <div className="text-sm text-white/70">{author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
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
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="4"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="16" x2="16" y1="2" y2="6"></line>
                    <line x1="8" x2="8" y1="2" y2="6"></line>
                    <line x1="3" x2="21" y1="10" y2="10"></line>
                  </svg>
                  <span>{publishDate}</span>
                </div>
                <div className="flex items-center gap-2">
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
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="mx-auto max-w-4xl">
          {/* Article Actions */}
          <div className="sticky top-8 z-20 float-left -ml-16 hidden flex-col items-center gap-4 lg:flex">
            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share article"
            >
              <Share size={18} />
            </motion.button>

            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Bookmark article"
            >
              <Bookmark size={18} />
            </motion.button>

            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Like article"
            >
              <ThumbsUp size={18} />
            </motion.button>

            <motion.button
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Comment on article"
            >
              <MessageSquare size={18} />
            </motion.button>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {content || defaultContent}
          </div>

          {/* Mobile Article Actions */}
          <div className="mt-12 flex justify-center gap-6 lg:hidden">
            <motion.button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Share article"
            >
              <Share size={20} />
            </motion.button>

            <motion.button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Bookmark article"
            >
              <Bookmark size={20} />
            </motion.button>

            <motion.button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Like article"
            >
              <ThumbsUp size={20} />
            </motion.button>

            <motion.button
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-600 shadow-md transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Comment on article"
            >
              <MessageSquare size={20} />
            </motion.button>
          </div>

          {/* Author Bio */}
          <div className="mt-16 border-t border-slate-200 pt-8 dark:border-gray-700">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
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
              <div className="text-center sm:text-left">
                <h3 className="mb-2 font-serif text-xl font-bold text-slate-900 dark:text-white">
                  About the Author
                </h3>
                <p className="mb-4 text-slate-600 dark:text-slate-400">
                  {author.name} is a {author.role} specializing in sustainable
                  design practices. With a background in both environmental
                  science and digital design, they bring a unique perspective to
                  creating digital experiences that are both beautiful and
                  environmentally responsible.
                </p>
                <motion.button
                  className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Follow
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles && relatedArticles.length > 0 && (
          <div className="mt-24">
            <div className="mx-auto max-w-7xl">
              <h3 className="mb-8 font-serif text-2xl font-bold text-slate-900 dark:text-white">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {relatedArticles.map((article, index) => (
                  <motion.a
                    key={index}
                    href={article.url}
                    className="group block"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative mb-4 h-48 overflow-hidden rounded-lg">
                      <Image
                        src={
                          article.image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-slate-900 transition-colors group-hover:text-emerald-600 dark:text-white dark:group-hover:text-emerald-400">
                      {article.title}
                    </h4>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default MagazineArticle;
