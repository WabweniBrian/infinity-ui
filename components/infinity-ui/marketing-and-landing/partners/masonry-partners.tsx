"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

//  partner data
const partners = [
  {
    id: 1,
    name: "Acme Corporation",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    size: "large",
    website: "https://example.com",
  },
  {
    id: 2,
    name: "TechGiant",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    size: "medium",
    website: "https://example.com",
  },
  {
    id: 3,
    name: "Globex",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    size: "small",
    website: "https://example.com",
  },
  {
    id: 4,
    name: "Initech",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    size: "medium",
    website: "https://example.com",
  },
  {
    id: 5,
    name: "Umbrella Corp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    size: "large",
    website: "https://example.com",
  },
  {
    id: 6,
    name: "Stark Industries",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    size: "small",
    website: "https://example.com",
  },
  {
    id: 7,
    name: "Wayne Enterprises",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    size: "medium",
    website: "https://example.com",
  },
  {
    id: 8,
    name: "Cyberdyne Systems",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    size: "small",
    website: "https://example.com",
  },
  {
    id: 9,
    name: "Oscorp",
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    size: "large",
    website: "https://example.com",
  },
];

// Organize partners into columns for masonry layout
const organizeIntoColumns = (items: typeof partners, columnCount: number) => {
  const columns: (typeof partners)[] = Array.from(
    { length: columnCount },
    () => [],
  );

  items.forEach((item, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push(item);
  });

  return columns;
};

const PartnerCard = ({
  partner,
  index,
}: {
  partner: (typeof partners)[0];
  index: number;
}) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Different parallax effect based on index for varied movement
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [50, -50 * ((index % 3) + 1)],
  );

  // Size classes based on partner importance
  const sizeClasses = {
    small: "h-40",
    medium: "h-48",
    large: "h-56",
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative mb-6 overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-800 ${sizeClasses[partner.size as keyof typeof sizeClasses]}`}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex flex-grow items-center justify-center">
          <div className="relative h-16 w-[160px]">
            <Image
              src={
                partner.logo ||
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
              }
              alt={partner.name}
              fill
              className="object-contain transition-all duration-300 group-hover:scale-110"
            />
          </div>
        </div>

        <div className="mt-auto w-full overflow-hidden">
          <h3 className="truncate text-center text-lg font-medium text-gray-900 dark:text-white">
            {partner.name}
          </h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="mt-2 flex justify-center"
          >
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Visit
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30" />
      <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30" />
    </motion.div>
  );
};

const MasonryPartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Organize partners into 3 columns for desktop, 2 for tablet
  const desktopColumns = organizeIntoColumns(partners, 3);
  const tabletColumns = organizeIntoColumns(partners, 2);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-100 py-24 dark:bg-slate-950"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          width="100%"
          height="100%"
          className="absolute opacity-5 dark:opacity-10"
        >
          <pattern
            id="diagonalHatch"
            width="10"
            height="10"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="10"
              stroke="currentColor"
              strokeWidth="1"
              className="text-gray-700 dark:text-gray-300"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
        </svg>
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
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
              Valued Partners
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Collaborating with industry leaders to drive innovation
          </p>
        </motion.div>

        {/* Desktop Masonry (3 columns) */}
        <div className="mt-16 hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {desktopColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col">
              {column.map((partner, partnerIndex) => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  index={columnIndex * (partners.length / 3) + partnerIndex}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tablet Masonry (2 columns) */}
        <div className="mt-16 hidden sm:grid sm:grid-cols-2 sm:gap-6 lg:hidden">
          {tabletColumns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col">
              {column.map((partner, partnerIndex) => (
                <PartnerCard
                  key={partner.id}
                  partner={partner}
                  index={columnIndex * (partners.length / 2) + partnerIndex}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile (single column) */}
        <div className="mt-16 flex flex-col space-y-6 sm:hidden">
          {partners.map((partner, index) => (
            <PartnerCard key={partner.id} partner={partner} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasonryPartners;
