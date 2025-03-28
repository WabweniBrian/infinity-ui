"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

//  partner data with testimonials
const partners = [
  {
    id: 1,
    name: "Acme Corporation",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    industry: "Technology",
    testimonial:
      "Working with this team has transformed our approach to digital innovation. Their expertise and dedication have been instrumental in our success.",
    author: "Jane Smith",
    role: "Chief Technology Officer",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 2,
    name: "TechGiant",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    industry: "Software",
    testimonial:
      "The partnership has exceeded our expectations in every way. Their solutions have helped us achieve unprecedented growth and efficiency.",
    author: "Michael Johnson",
    role: "VP of Operations",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 3,
    name: "Globex",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    industry: "Finance",
    testimonial:
      "We&apos;ve seen a 200% ROI since implementing their platform. The level of support and innovation they provide is unmatched in the industry.",
    author: "Sarah Williams",
    role: "Director of Digital Strategy",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 4,
    name: "Initech",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    industry: "Manufacturing",
    testimonial:
      "Their team's attention to detail and commitment to excellence has made them an invaluable partner in our digital transformation journey.",
    author: "Robert Chen",
    role: "CEO",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
  {
    id: 5,
    name: "Umbrella Corp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    industry: "Healthcare",
    testimonial:
      "The innovative solutions they've implemented have revolutionized our patient care systems, resulting in better outcomes and higher satisfaction.",
    author: "Emily Rodriguez",
    role: "Head of Innovation",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  },
];

const SpotlightPartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextPartner = () => {
    setActiveIndex((prev) => (prev + 1) % partners.length);
  };

  const prevPartner = () => {
    setActiveIndex((prev) => (prev - 1 + partners.length) % partners.length);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-slate-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.1),transparent_40%)] dark:bg-[radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.05),transparent_40%)]" />
      </div>

      {/* Darkmode toggle */}
      <DarkModeToggle />

      <div className="container relative mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Partner{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
              Spotlight
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Hear what our partners have to say about working with us
          </p>
        </motion.div>

        <div className="relative mt-16">
          {/* Featured Partner Spotlight */}
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left side - Partner info */}
              <div className="relative flex flex-col items-center justify-center p-8 lg:items-start lg:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={partners[activeIndex].id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex w-full flex-col items-center lg:items-start"
                  >
                    <div className="flex h-20 items-center justify-center">
                      <div className="relative h-16 w-[180px]">
                        <Image
                          src={
                            partners[activeIndex].logo ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={partners[activeIndex].name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center">
                      <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                        {partners[activeIndex].industry}
                      </span>
                      <div className="ml-4 flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-amber-400 dark:text-amber-300"
                            fill="currentColor"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="relative mt-8">
                      <Quote className="absolute -left-2 -top-2 h-8 w-8 text-purple-200 dark:text-purple-900" />
                      <p className="relative z-10 text-lg italic text-gray-700 dark:text-gray-300">
                        &quot;{partners[activeIndex].testimonial}&quot;
                      </p>
                    </div>

                    <div className="mt-8 flex items-center">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        <Image
                          src={
                            partners[activeIndex].image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={partners[activeIndex].author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white">
                          {partners[activeIndex].author}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {partners[activeIndex].role},{" "}
                          {partners[activeIndex].name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right side - Decorative element */}
              <div className="relative hidden bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 lg:block">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                    className="h-64 w-64 rounded-full bg-white/10 backdrop-blur-sm"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, -5, 0, 5, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      delay: 1,
                    }}
                    className="h-40 w-40 rounded-full bg-white/20 backdrop-blur-sm"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex h-full w-full items-center justify-center"
                  >
                    <Quote className="h-32 w-32 text-white/30" />
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={prevPartner}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
              aria-label="Previous partner"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex space-x-2">
              {partners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    activeIndex === index
                      ? "bg-purple-600 dark:bg-purple-400"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  aria-label={`Go to partner ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextPartner}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
              aria-label="Next partner"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Partner Logos Row */}
        <div className="mt-20">
          <h3 className="mb-8 text-center text-lg font-semibold text-gray-900 dark:text-white">
            Trusted by industry leaders
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex h-16 items-center justify-center rounded-lg bg-white p-4 shadow-sm transition-all duration-300 dark:bg-slate-800 ${
                  activeIndex === index
                    ? "ring-2 ring-purple-500 dark:ring-purple-400"
                    : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="relative h-10 w-[120px]">
                  <Image
                    src={
                      partner.logo ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={partner.name}
                    fill
                    className="object-contain grayscale transition-all duration-300 hover:grayscale-0"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpotlightPartners;
