"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { MessageSquare, ThumbsUp, Star } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type FeedbackWord = {
  id: number;
  text: string;
  size: number;
  color: string;
  x: number;
  y: number;
  rotation: number;
};

type CustomerQuote = {
  id: number;
  name: string;
  company: string;
  quote: string;
  rating: number;
};

// Generate a set of common feedback words with varying sizes
const generateFeedbackWords = (): FeedbackWord[] => {
  const words = [
    "Amazing",
    "Intuitive",
    "Powerful",
    "Reliable",
    "Fast",
    "Innovative",
    "Seamless",
    "Efficient",
    "User-friendly",
    "Responsive",
    "Secure",
    "Flexible",
    "Scalable",
    "Robust",
    "Exceptional",
    "Outstanding",
    "Game-changer",
    "Time-saving",
    "Cost-effective",
    "Revolutionary",
    "Simple",
    "Elegant",
    "Effective",
    "Impressive",
    "Transformative",
    "Productive",
    "Streamlined",
    "Customizable",
    "Comprehensive",
    "Brilliant",
  ];

  return words.map((word, index) => {
    // Random size between 1 (small) and 4 (large)
    const size = Math.floor(Math.random() * 4) + 1;

    // Random position within the container
    const x = Math.random() * 80 + 10; // 10% to 90% of container width
    const y = Math.random() * 80 + 10; // 10% to 90% of container height

    // Random rotation between -20 and 20 degrees
    const rotation = Math.random() * 40 - 20;

    // Assign a color from a predefined palette
    const colors = [
      "text-blue-500 dark:text-blue-400",
      "text-indigo-500 dark:text-indigo-400",
      "text-purple-500 dark:text-purple-400",
      "text-pink-500 dark:text-pink-400",
      "text-red-500 dark:text-red-400",
      "text-orange-500 dark:text-orange-400",
      "text-amber-500 dark:text-amber-400",
      "text-green-500 dark:text-green-400",
      "text-teal-500 dark:text-teal-400",
      "text-cyan-500 dark:text-cyan-400",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      id: index + 1,
      text: word,
      size,
      color,
      x,
      y,
      rotation,
    };
  });
};

const customerQuotes: CustomerQuote[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "TechCorp",
    quote:
      "This platform has completely transformed our workflow. The intuitive interface and powerful features have increased our team's productivity by 40%.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    company: "Innovate Inc",
    quote:
      "The level of customer support we&apos;ve received has been exceptional. Any questions or issues we&apos;ve had were resolved quickly and professionally.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    company: "DesignHub",
    quote:
      "We&apos;ve seen a significant ROI since implementing this solution. Not only has it streamlined our processes, but it's also helped us identify new opportunities for growth.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Kim",
    company: "Startup Ventures",
    quote:
      "As a fast-growing startup, we needed a solution that could scale with us. This platform has been the perfect fit, adapting to our changing needs.",
    rating: 5,
  },
  {
    id: 5,
    name: "Olivia Martinez",
    company: "Creative Solutions",
    quote:
      "The attention to detail in this product is impressive. It's clear that the team understands the challenges we face and has designed features specifically to address them.",
    rating: 5,
  },
];

const FeedbackWordCloud = () => {
  const [words, setWords] = useState<FeedbackWord[]>([]);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [activeQuote, setActiveQuote] = useState<CustomerQuote | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Generate words on component mount
  useEffect(() => {
    setWords(generateFeedbackWords());
  }, []);

  // Animate words on hover
  const handleWordHover = (word: string) => {
    setHoveredWord(word);

    // Find quotes that contain this word
    const matchingQuotes = customerQuotes.filter((quote) =>
      quote.quote.toLowerCase().includes(word.toLowerCase()),
    );

    if (matchingQuotes.length > 0) {
      // Randomly select one of the matching quotes
      const randomIndex = Math.floor(Math.random() * matchingQuotes.length);
      setActiveQuote(matchingQuotes[randomIndex]);
    } else {
      setActiveQuote(null);
    }
  };

  const handleWordLeave = () => {
    setHoveredWord(null);
    // Don&apos;t immediately clear the quote for better UX
    setTimeout(() => {
      if (!hoveredWord) {
        setActiveQuote(null);
      }
    }, 2000);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900 dark:to-slate-800">
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_70%)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl"
          >
            What Customers Are Saying
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Explore the most common words our customers use to describe their
            experience
          </motion.p>
        </div>

        {/* Word Cloud */}
        <div
          ref={containerRef}
          className="relative mb-12 h-[400px] overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800 md:h-[500px]"
        >
          {words.map((word) => (
            <motion.div
              key={word.id}
              className={`absolute cursor-pointer ${word.color} font-bold transition-all duration-300`}
              style={{
                left: `${word.x}%`,
                top: `${word.y}%`,
                fontSize: `${word.size * 0.5 + 0.8}rem`,
                transform: `translate(-50%, -50%) rotate(${word.rotation}deg)`,
                zIndex: hoveredWord === word.text ? 10 : 1,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: hoveredWord === word.text ? 1 : 0.8,
                scale: hoveredWord === word.text ? 1.2 : 1,
                transition: { duration: 0.3 },
              }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: word.id * 0.03,
                type: "spring",
                stiffness: 200,
                damping: 10,
              }}
              whileHover={{ scale: 1.2 }}
              onMouseEnter={() => handleWordHover(word.text)}
              onMouseLeave={handleWordLeave}
            >
              {word.text}
            </motion.div>
          ))}

          {/* Animated connections between words */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            <defs>
              <linearGradient
                id="line-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
            {words.slice(0, 20).map((word, index) => {
              const nextWord = words[(index + 1) % 20];
              return (
                <motion.line
                  key={`line-${index}`}
                  x1={`${word.x}%`}
                  y1={`${word.y}%`}
                  x2={`${nextWord.x}%`}
                  y2={`${nextWord.y}%`}
                  stroke="url(#line-gradient)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                />
              );
            })}
          </svg>
        </div>

        {/* Customer Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: activeQuote ? 1 : 0,
            y: activeQuote ? 0 : 20,
          }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl"
        >
          {activeQuote && (
            <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-800">
              <div className="mb-4 flex items-center">
                <div className="mr-4 rounded-full bg-indigo-100 p-3 dark:bg-indigo-900/50">
                  <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                    {activeQuote.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {activeQuote.company}
                  </p>
                </div>
                <div className="ml-auto flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < activeQuote.rating
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <blockquote className="relative italic text-slate-600 dark:text-slate-300">
                <span className="absolute -left-2 -top-2 text-4xl text-indigo-200 dark:text-indigo-800">
                  &quot;
                </span>
                <p className="pl-6">{activeQuote.quote}</p>
                <span className="absolute -bottom-6 -right-2 text-4xl text-indigo-200 dark:text-indigo-800">
                  &quot;
                </span>
              </blockquote>
            </div>
          )}
        </motion.div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
              <Star className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="mb-2 text-3xl font-bold text-slate-800 dark:text-white">
              4.8/5
            </div>
            <p className="text-slate-500 dark:text-slate-400">Average Rating</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
              <ThumbsUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="mb-2 text-3xl font-bold text-slate-800 dark:text-white">
              96%
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Satisfaction Rate
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-slate-800"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
              <MessageSquare className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="mb-2 text-3xl font-bold text-slate-800 dark:text-white">
              2,500+
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Customer Reviews
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackWordCloud;
