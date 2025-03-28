"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
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
  {
    id: 6,
    name: "Stark Industries",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    description: "Powering the future with sustainable energy solutions.",
    website: "https://example.com",
    color: "from-red-500 to-rose-500 dark:from-red-400 dark:to-rose-400",
  },
];

const RotatingCard = ({
  partner,
  index,
}: {
  partner: (typeof partners)[0];
  index: number;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="perspective-1000 relative h-64 w-full"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
    >
      <div
        className="relative h-full w-full transform-gpu transition-all duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front of Card */}
        <div
          className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          {/* Decorative corner */}
          <div
            className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br opacity-10"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${partner.color.split(" ").slice(1).join(" ")})`,
            }}
          />

          <div className="flex h-24 w-full items-center justify-center">
            <div className="relative h-16 w-[160px]">
              <Image
                src={
                  partner.logo ||
                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                }
                alt={partner.name}
                fill
                className="object-contain transition-all duration-300"
              />
            </div>
          </div>

          <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
            {partner.name}
          </h3>

          <div className="mt-4 flex items-center text-sm font-medium text-gray-600 dark:text-gray-300">
            <span>View details</span>
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>

          {/* Bottom accent bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${partner.color.split(" ").slice(1).join(" ")})`,
            }}
          />
        </div>

        {/* Back of Card */}
        <div
          className="backface-hidden absolute inset-0 flex flex-col rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {partner.name}
          </h3>

          <p className="mt-4 flex-grow text-sm text-gray-600 dark:text-gray-300">
            {partner.description}
          </p>

          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center rounded-md bg-gradient-to-r px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
            style={{
              backgroundImage: `linear-gradient(to right, ${partner.color.split(" ").slice(1).join(" ")})`,
            }}
          >
            Visit Website
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>

          {/* Bottom accent bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${partner.color.split(" ").slice(1).join(" ")})`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const RotatingPartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate through featured partners
  const autoRotate = true;

  // Set up auto-rotation
  useRef(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % partners.length);
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-900"
    >
      {/* 3D Grid Background */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #d1d5db 1px, transparent 1px), linear-gradient(to bottom, #d1d5db 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform:
              "perspective(500px) rotateX(60deg) translateY(-100px) scale(2)",
            transformOrigin: "center top",
          }}
        />
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
            Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
              Strategic Partners
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Hover over each card to learn more about our amazing partners
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((partner, index) => (
            <RotatingCard key={partner.id} partner={partner} index={index} />
          ))}
        </div>

        {/* Featured Partner Spotlight (Mobile) */}
        <div className="mt-16 block lg:hidden">
          <h3 className="text-center text-xl font-semibold text-gray-900 dark:text-white">
            Featured Partner
          </h3>

          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800"
              >
                <div className="flex flex-col items-center">
                  <div className="flex h-24 w-full items-center justify-center">
                    <div className="relative h-16 w-[160px]">
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

                  <h4 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {partners[activeIndex].name}
                  </h4>

                  <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                    {partners[activeIndex].description}
                  </p>

                  <a
                    href={partners[activeIndex].website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center rounded-md bg-gradient-to-r px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${partners[activeIndex].color.split(" ").slice(1).join(" ")})`,
                    }}
                  >
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="mt-6 flex justify-center space-x-2">
              {partners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    activeIndex === index
                      ? "bg-blue-600 dark:bg-blue-400"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  aria-label={`View partner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RotatingPartners;
