"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type NewsItem = {
  id: string;
  headline: string;
  timestamp: string;
  category: string;
  isLive?: boolean;
  url: string;
};

const demoNewsItems: NewsItem[] = [
  {
    id: "1",
    headline:
      "Global tech leaders announce new AI safety coalition at international summit",
    timestamp: "12 minutes ago",
    category: "Technology",
    isLive: true,
    url: "#",
  },
  {
    id: "2",
    headline:
      "Markets react to central bank's unexpected interest rate decision",
    timestamp: "43 minutes ago",
    category: "Finance",
    url: "#",
  },
  {
    id: "3",
    headline:
      "Scientists discover potential breakthrough in renewable energy storage",
    timestamp: "1 hour ago",
    category: "Science",
    url: "#",
  },
  {
    id: "4",
    headline:
      "Major climate agreement reached after marathon negotiation session",
    timestamp: "2 hours ago",
    category: "Environment",
    isLive: true,
    url: "#",
  },
  {
    id: "5",
    headline:
      "New study reveals surprising findings about remote work productivity",
    timestamp: "3 hours ago",
    category: "Business",
    url: "#",
  },
];

const BreakingNewsTicker = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextNews = () => {
    setActiveIndex((prev) => (prev + 1) % demoNewsItems.length);
  };

  const prevNews = () => {
    setActiveIndex(
      (prev) => (prev - 1 + demoNewsItems.length) % demoNewsItems.length,
    );
  };

  useEffect(() => {
    if (isInView && !isPaused) {
      intervalRef.current = setInterval(() => {
        nextNews();
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isInView, isPaused]);

  return (
    <section
      ref={ref}
      className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center">
          {/* Breaking News Label */}
          <div className="flex flex-shrink-0 items-center gap-2 bg-red-600 px-4 py-3 text-white md:px-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              className="h-2 w-2 rounded-full bg-white"
            />
            <span className="text-sm font-bold uppercase tracking-wider md:text-base">
              Breaking
            </span>
          </div>

          {/* News Ticker */}
          <div className="relative flex-1 overflow-hidden px-4 py-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {demoNewsItems[activeIndex].category}
                    </span>
                    {demoNewsItems[activeIndex].isLive && (
                      <span className="flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        <motion.div
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1.5,
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400"
                        />
                        LIVE
                      </span>
                    )}
                  </div>
                  <h3 className="truncate font-medium text-slate-900 dark:text-white">
                    {demoNewsItems[activeIndex].headline}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0 text-xs text-slate-500 dark:text-slate-400">
                  {demoNewsItems[activeIndex].timestamp}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex flex-shrink-0 items-center border-l border-slate-200 px-2 py-2 dark:border-gray-700">
            <button
              onClick={prevNews}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              aria-label="Previous news"
            >
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
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <div className="px-2 text-xs text-slate-500 dark:text-slate-400">
              {activeIndex + 1}/{demoNewsItems.length}
            </div>
            <button
              onClick={nextNews}
              className="p-1.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              aria-label="Next news"
            >
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
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreakingNewsTicker;
