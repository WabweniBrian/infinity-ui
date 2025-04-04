"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import {
  Share2,
  Bookmark,
  Copy,
  ChevronUp,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TableOfContentsItem = {
  id: string;
  title: string;
  level: number;
};

type ArticleProps = {
  title: string;
  coverImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  content: React.ReactNode;
  author: {
    name: string;
    avatar: string;
  };
};

const InteractiveArticle = ({
  title = "The Future of AI in Web Development: Transforming How We Build",
  coverImage = "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=1000&width=2000",
  publishDate = "April 24, 2024",
  readTime = "15 min read",
  category = "Artificial Intelligence",
  content,
  author = {
    name: "Jamie Chen",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
}: ArticleProps) => {
  const [activeSection, setActiveSection] = useState("");
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>(
    [],
  );
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);

  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
  });

  // Generate table of contents from headings
  useEffect(() => {
    if (articleRef.current) {
      const headings = articleRef.current.querySelectorAll("h2, h3");
      const toc: TableOfContentsItem[] = [];

      headings.forEach((heading) => {
        const id =
          heading.id ||
          heading.textContent?.toLowerCase().replace(/\s+/g, "-") ||
          `section-${toc.length}`;
        if (!heading.id) heading.id = id;

        toc.push({
          id,
          title: heading.textContent || "",
          level: heading.tagName === "H2" ? 2 : 3,
        });
      });

      setTableOfContents(toc);
    }
  }, [content]);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (articleRef.current) {
        const headings = articleRef.current.querySelectorAll("h2, h3");

        // Show scroll to top button when scrolled down
        if (window.scrollY > 500) {
          setShowScrollTop(true);
        } else {
          setShowScrollTop(false);
        }

        // Find the current active section
        for (let i = headings.length - 1; i >= 0; i--) {
          const heading = headings[i];
          const rect = heading.getBoundingClientRect();

          if (rect.top <= 100) {
            setActiveSection(heading.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setShowMobileMenu(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Default content if none provided
  const defaultContent = (
    <>
      <p className="mb-6 text-lg leading-relaxed">
        Artificial Intelligence is rapidly transforming the landscape of web
        development, introducing new capabilities and workflows that were
        unimaginable just a few years ago. From automated code generation to
        intelligent user interfaces, AI is reshaping how developers build and
        optimize web applications.
      </p>

      <h2 id="ai-code-generation" className="mb-6 mt-12 text-3xl font-bold">
        AI-Powered Code Generation
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        One of the most significant impacts of AI on web development is the
        emergence of sophisticated code generation tools. These AI assistants
        can now write functional code based on natural language descriptions,
        dramatically accelerating development workflows.
      </p>

      <div className="my-8 rounded-xl border border-purple-100 bg-gradient-to-r from-purple-50 to-blue-50 p-8 dark:border-purple-900/30 dark:from-purple-950/30 dark:to-blue-950/30">
        <h4 className="mb-4 text-xl font-bold text-purple-800 dark:text-purple-300">
          Key AI Code Generation Tools:
        </h4>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-200 text-purple-700 dark:bg-purple-800 dark:text-purple-200">
              1
            </div>
            <div>
              <strong className="font-medium">GitHub Copilot:</strong>{" "}
              Integrated directly into code editors, Copilot can suggest entire
              functions and blocks of code as you type.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-200 text-purple-700 dark:bg-purple-800 dark:text-purple-200">
              2
            </div>
            <div>
              <strong className="font-medium">ChatGPT & Claude:</strong> These
              conversational AI models can generate code snippets, explain
              programming concepts, and help debug issues.
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-purple-200 text-purple-700 dark:bg-purple-800 dark:text-purple-200">
              3
            </div>
            <div>
              <strong className="font-medium">Vercel v0:</strong> Specialized in
              generating UI components from descriptions or images, streamlining
              frontend development.
            </div>
          </li>
        </ul>
      </div>

      <p className="mb-6 text-lg leading-relaxed">
        These tools are not just productivity enhancers—they&apos;re
        fundamentally changing how developers approach problem-solving. Rather
        than writing every line of code manually, developers can focus on
        higher-level architecture and design decisions, letting AI handle the
        implementation details.
      </p>

      <h3 id="limitations" className="mb-4 mt-10 text-2xl font-bold">
        Limitations and Considerations
      </h3>
      <p className="mb-6 text-lg leading-relaxed">
        While AI code generation is impressive, it&apos;s important to
        understand its limitations. AI models can produce code that looks
        correct but contains subtle bugs or security vulnerabilities. They may
        also generate inefficient solutions or fail to follow best practices for
        specific frameworks.
      </p>
      <p className="mb-6 text-lg leading-relaxed">
        Developers still need to carefully review AI-generated code, understand
        its functionality, and ensure it meets project requirements and quality
        standards.
      </p>

      <h2 id="intelligent-interfaces" className="mb-6 mt-12 text-3xl font-bold">
        Intelligent User Interfaces
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        AI is enabling a new generation of web interfaces that can adapt to user
        behavior, predict user needs, and provide more personalized experiences.
        These intelligent interfaces go beyond static designs to create dynamic,
        responsive systems.
      </p>

      <div className="relative my-10 overflow-hidden rounded-xl">
        <Image
          src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=600&width=1200"
          alt="AI-powered user interface example"
          width={1200}
          height={600}
          className="h-auto w-full rounded-xl"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <p className="text-sm text-white">
            AI-powered interfaces can adapt to user behavior and preferences in
            real-time
          </p>
        </div>
      </div>

      <h3 id="personalization" className="mb-4 mt-10 text-2xl font-bold">
        Personalization at Scale
      </h3>
      <p className="mb-6 text-lg leading-relaxed">
        AI enables web applications to deliver highly personalized experiences
        without requiring manual configuration. By analyzing user behavior
        patterns, AI can:
      </p>

      <ul className="mb-6 list-disc space-y-2 pl-6 text-lg">
        <li>Customize navigation paths based on user preferences</li>
        <li>Prioritize content that aligns with user interests</li>
        <li>Adjust UI elements to match user interaction patterns</li>
        <li>Provide smart defaults that reduce user effort</li>
      </ul>

      <h3
        id="conversational-interfaces"
        className="mb-4 mt-10 text-2xl font-bold"
      >
        Conversational Interfaces
      </h3>
      <p className="mb-6 text-lg leading-relaxed">
        Natural language processing advancements have made conversational
        interfaces more capable and useful. Modern chatbots and virtual
        assistants can understand complex queries, maintain context across
        conversations, and provide helpful responses that feel natural.
      </p>

      <blockquote className="my-8 border-l-4 border-purple-400 pl-6 text-xl italic text-slate-700 dark:border-purple-600 dark:text-slate-300">
        &quot;The best AI interfaces don&apos;t feel like you&apos;re
        interacting with technology at all—they simply understand what you need
        and deliver it seamlessly.&quot;
      </blockquote>

      <h2
        id="performance-optimization"
        className="mb-6 mt-12 text-3xl font-bold"
      >
        AI-Driven Performance Optimization
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        Web performance optimization is another area where AI is making
        significant contributions. Machine learning algorithms can analyze user
        behavior, network conditions, and application metrics to identify
        performance bottlenecks and suggest improvements.
      </p>

      <h3 id="predictive-loading" className="mb-4 mt-10 text-2xl font-bold">
        Predictive Loading
      </h3>
      <p className="mb-6 text-lg leading-relaxed">
        AI can predict which resources a user is likely to need next and preload
        them before they&apos;re requested. This approach significantly reduces
        perceived loading times and improves the overall user experience,
        especially on slower connections.
      </p>

      <h3 id="automated-testing" className="mb-4 mt-10 text-2xl font-bold">
        Automated Testing and Quality Assurance
      </h3>
      <p className="mb-6 text-lg leading-relaxed">
        AI is revolutionizing testing by automatically generating test cases,
        identifying potential edge cases, and even fixing common bugs. This
        leads to more robust applications with fewer defects reaching
        production.
      </p>

      <p className="mb-6 text-lg leading-relaxed">
        Machine learning models can analyze patterns in bug reports and code
        changes to predict which parts of an application are most likely to
        contain defects, allowing developers to focus their testing efforts more
        effectively.
      </p>

      <h2 id="future-trends" className="mb-6 mt-12 text-3xl font-bold">
        Future Trends and Opportunities
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        As AI continues to evolve, we can expect even more profound changes in
        web development. Some emerging trends include:
      </p>

      <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-6 dark:border-blue-900/30 dark:bg-blue-950/30">
          <h4 className="mb-3 text-xl font-bold text-blue-800 dark:text-blue-300">
            No-Code Development
          </h4>
          <p className="text-slate-700 dark:text-slate-300">
            AI will power increasingly sophisticated no-code platforms, allowing
            non-developers to create complex web applications through natural
            language instructions and visual interfaces.
          </p>
        </div>

        <div className="rounded-xl border border-purple-100 bg-purple-50 p-6 dark:border-purple-900/30 dark:bg-purple-950/30">
          <h4 className="mb-3 text-xl font-bold text-purple-800 dark:text-purple-300">
            Self-Healing Applications
          </h4>
          <p className="text-slate-700 dark:text-slate-300">
            Applications will increasingly be able to monitor their own
            performance, detect issues, and automatically implement fixes
            without human intervention.
          </p>
        </div>

        <div className="rounded-xl border border-green-100 bg-green-50 p-6 dark:border-green-900/30 dark:bg-green-950/30">
          <h4 className="mb-3 text-xl font-bold text-green-800 dark:text-green-300">
            Multimodal Interfaces
          </h4>
          <p className="text-slate-700 dark:text-slate-300">
            Web applications will combine voice, text, and visual inputs to
            create more natural and accessible user experiences that adapt to
            different contexts and user needs.
          </p>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50 p-6 dark:border-amber-900/30 dark:bg-amber-950/30">
          <h4 className="mb-3 text-xl font-bold text-amber-800 dark:text-amber-300">
            Ethical AI Integration
          </h4>
          <p className="text-slate-700 dark:text-slate-300">
            As AI becomes more prevalent, frameworks and tools for ensuring
            ethical AI use in web applications will become essential parts of
            the development process.
          </p>
        </div>
      </div>

      <h2 id="conclusion" className="mb-6 mt-12 text-3xl font-bold">
        Conclusion
      </h2>
      <p className="mb-6 text-lg leading-relaxed">
        AI is not replacing web developers—it&apos;s augmenting their
        capabilities and changing the nature of their work. The most successful
        developers will be those who learn to effectively collaborate with AI
        tools, focusing their human creativity and problem-solving skills on the
        aspects of development where they add the most value.
      </p>
      <p className="mb-6 text-lg leading-relaxed">
        As we move forward, the line between developer and AI will continue to
        blur, creating new opportunities for innovation and efficiency in web
        development. Those who embrace these changes will be well-positioned to
        build the next generation of intelligent, adaptive web applications.
      </p>
    </>
  );

  return (
    <article
      ref={articleRef}
      className="relative min-h-screen bg-white dark:bg-slate-900"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Progress Bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-purple-600 dark:bg-purple-500"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <header className="relative h-[50vh] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <span className="mb-4 inline-block rounded-full bg-purple-600 px-3 py-1 text-sm font-medium text-white">
                {category}
              </span>
              <h1 className="mb-6 text-3xl font-bold text-white md:text-5xl">
                {title}
              </h1>

              <div className="flex items-center gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Image
                    src={
                      author.avatar ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>{author.name}</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-white/50"></div>
                <span>{publishDate}</span>
                <div className="h-1 w-1 rounded-full bg-white/50"></div>
                <span>{readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Button */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <motion.button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-700 shadow-lg dark:bg-slate-800 dark:text-slate-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Table of Contents */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            className="fixed inset-0 z-30 overflow-y-auto bg-white/95 p-6 dark:bg-slate-900/95 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="pb-20 pt-12">
              <h3 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
                Table of Contents
              </h3>
              <nav className="space-y-4">
                {tableOfContents.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full rounded-lg px-4 py-2 text-left transition-colors ${
                      activeSection === item.id
                        ? "bg-purple-100 font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                        : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    } ${item.level === 3 ? "pl-8" : ""}`}
                    whileHover={{ x: item.level === 3 ? 8 : 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.title}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-12 md:flex-row">
          {/* Desktop Sidebar / Table of Contents */}
          <div className="hidden md:block md:w-1/4 lg:w-1/5">
            <div className="sticky top-8 space-y-6">
              <div>
                <h3 className="mb-4 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full rounded-lg px-3 py-2 text-left transition-colors ${
                        activeSection === item.id
                          ? "bg-purple-100 font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      } ${item.level === 3 ? "pl-6 text-sm" : ""}`}
                      whileHover={{ x: item.level === 3 ? 6 : 3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.title}
                    </motion.button>
                  ))}
                </nav>
              </div>

              <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
                <h3 className="mb-4 text-sm uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Share
                </h3>
                <div className="flex gap-2">
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
            </div>
          </div>

          {/* Article Content */}
          <div className="md:w-3/4 lg:w-4/5">
            <div className="max-w-3xl">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {content || defaultContent}
              </div>

              {/* Comment Section Teaser */}
              <div className="mt-16 border-t border-slate-200 pt-8 dark:border-slate-800">
                <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                  Join the Conversation
                </h3>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    </div>
                    <div className="flex-1">
                      <textarea
                        className="w-full rounded-lg border border-slate-200 bg-white p-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:ring-purple-400"
                        placeholder="Share your thoughts..."
                        rows={3}
                      ></textarea>
                      <div className="mt-3 flex justify-end">
                        <motion.button
                          className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Comment
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default InteractiveArticle;
