"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

//  partner data
const partners = [
  {
    id: 1,
    name: "Acme Corporation",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    description:
      "Global leader in innovative solutions for businesses of all sizes.",
    website: "https://example.com",
    color: "from-blue-500 to-cyan-500 dark:from-blue-400 dark:to-cyan-400",
  },
  {
    id: 2,
    name: "TechGiant",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    description: "Pioneering technology solutions for the modern enterprise.",
    website: "https://example.com",
    color:
      "from-purple-500 to-violet-500 dark:from-purple-400 dark:to-violet-400",
  },
  {
    id: 3,
    name: "Globex",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    description: "Transforming industries through cutting-edge technology.",
    website: "https://example.com",
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
  },
  {
    id: 4,
    name: "Initech",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    description: "Streamlining business processes for over two decades.",
    website: "https://example.com",
    color:
      "from-amber-500 to-orange-500 dark:from-amber-400 dark:to-orange-400",
  },
  {
    id: 5,
    name: "Umbrella Corp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    description:
      "Protecting businesses with next-generation security solutions.",
    website: "https://example.com",
    color: "from-rose-500 to-pink-500 dark:from-rose-400 dark:to-pink-400",
  },
];

const CardStackPartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    setIsDragging(false);

    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x > 0) {
        // Swiped right
        handlePrevious();
      } else {
        // Swiped left
        handleNext();
      }
    }
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + partners.length) % partners.length,
    );
  };

  // Calculate indices for cards in the stack
  const getCardIndices = () => {
    const indices = [];
    // Current card
    indices.push(currentIndex);

    // Next 2 cards
    for (let i = 1; i <= 2; i++) {
      indices.push((currentIndex + i) % partners.length);
    }

    return indices;
  };

  const cardIndices = getCardIndices();

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
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
              Partners
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Swipe through our network of industry-leading collaborators
          </p>
        </motion.div>

        <div className="mt-16 flex flex-col items-center">
          {/* 3D Card Stack */}
          <div className="relative h-96 w-full max-w-md">
            <AnimatePresence initial={false} mode="popLayout">
              {cardIndices.map((index, stackPosition) => (
                <motion.div
                  key={partners[index].id}
                  initial={{
                    scale:
                      stackPosition === 0 ? 0.9 : 0.8 - stackPosition * 0.05,
                    y: stackPosition === 0 ? 0 : 20 + stackPosition * 10,
                    opacity:
                      stackPosition === 0 ? 1 : 0.6 - stackPosition * 0.2,
                    zIndex: 10 - stackPosition,
                    x:
                      direction === "left"
                        ? -300
                        : direction === "right"
                          ? 300
                          : 0,
                  }}
                  animate={{
                    scale: stackPosition === 0 ? 1 : 0.9 - stackPosition * 0.05,
                    y: stackPosition === 0 ? 0 : 20 + stackPosition * 10,
                    opacity:
                      stackPosition === 0 ? 1 : 0.7 - stackPosition * 0.2,
                    zIndex: 10 - stackPosition,
                    x: 0,
                  }}
                  exit={{
                    x: direction === "left" ? 300 : -300,
                    opacity: 0,
                    transition: { duration: 0.3 },
                  }}
                  transition={{ duration: 0.3 }}
                  drag={stackPosition === 0 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  className="absolute left-0 right-0 top-0 origin-bottom"
                  style={{
                    pointerEvents: stackPosition === 0 ? "auto" : "none",
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <div
                    className={`h-80 w-full overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all duration-300 dark:bg-slate-800 ${
                      stackPosition === 0 && isDragging
                        ? "cursor-grabbing"
                        : stackPosition === 0
                          ? "cursor-grab"
                          : ""
                    }`}
                  >
                    {/* Card content */}
                    <div className="flex h-full flex-col">
                      {/* Partner logo */}
                      <div className="flex h-24 items-center justify-center">
                        <Image
                          src={partners[index].logo || "/default-image.png"}
                          alt={partners[index].name}
                          width={160}
                          height={60}
                          className="max-h-16 max-w-[160px] object-contain"
                        />
                      </div>

                      {/* Colored divider */}
                      <div
                        className="my-4 h-1 w-full rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${partners[index].color.split(" ").slice(1).join(" ")})`,
                        }}
                      />

                      {/* Partner details */}
                      <div className="flex-grow">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                          {partners[index].name}
                        </h3>

                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                          {partners[index].description}
                        </p>
                      </div>

                      {/* Website link */}
                      <a
                        href={partners[index].website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center rounded-md bg-gradient-to-r px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${partners[index].color.split(" ").slice(1).join(" ")})`,
                        }}
                        onClick={(e) => {
                          if (isDragging) {
                            e.preventDefault();
                          }
                        }}
                      >
                        Visit Website
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={handlePrevious}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
              aria-label="Previous partner"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex space-x-2">
              {partners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? "right" : "left");
                    setCurrentIndex(index);
                  }}
                  className={`h-2 w-2 rounded-full transition-all ${
                    currentIndex === index
                      ? "bg-blue-600 dark:bg-blue-400"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  aria-label={`Go to partner ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
              aria-label="Next partner"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Swipe instruction */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-4 text-sm text-gray-500 dark:text-gray-400"
          >
            Swipe cards or use arrows to navigate
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default CardStackPartners;
