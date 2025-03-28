"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

// partner timeline data
const partnerTimeline = [
  {
    id: 1,
    year: 2023,
    partners: [
      {
        id: 101,
        name: "TechGiant",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Strategic partnership to develop next-generation cloud solutions.",
        website: "https://example.com",
      },
      {
        id: 102,
        name: "Globex",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Collaboration on international market expansion initiatives.",
        website: "https://example.com",
      },
    ],
  },
  {
    id: 2,
    year: 2022,
    partners: [
      {
        id: 201,
        name: "Acme Corporation",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Joint venture to create innovative solutions for enterprise customers.",
        website: "https://example.com",
      },
      {
        id: 202,
        name: "Stark Industries",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Research partnership focused on sustainable energy technologies.",
        website: "https://example.com",
      },
      {
        id: 203,
        name: "Wayne Enterprises",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Philanthropic initiative to support technology education.",
        website: "https://example.com",
      },
    ],
  },
  {
    id: 3,
    year: 2021,
    partners: [
      {
        id: 301,
        name: "Initech",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Technology integration partnership for enterprise solutions.",
        website: "https://example.com",
      },
      {
        id: 302,
        name: "Umbrella Corp",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Collaboration on security and data protection frameworks.",
        website: "https://example.com",
      },
    ],
  },
  {
    id: 4,
    year: 2020,
    partners: [
      {
        id: 401,
        name: "Cyberdyne Systems",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description:
          "Strategic alliance to develop AI and machine learning solutions.",
        website: "https://example.com",
      },
    ],
  },
  {
    id: 5,
    year: 2019,
    partners: [
      {
        id: 501,
        name: "Oscorp",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Research collaboration on biotechnology applications.",
        website: "https://example.com",
      },
      {
        id: 502,
        name: "LexCorp",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        description: "Manufacturing partnership for hardware components.",
        website: "https://example.com",
      },
    ],
  },
];

const TimelineYear = ({
  yearData,
  index,
}: {
  yearData: (typeof partnerTimeline)[0];
  index: number;
}) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Alternate layout for even/odd years
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-blue-200 dark:bg-blue-900/50" />

      {/* Year marker */}
      <div className="relative flex justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg dark:bg-blue-500"
        >
          <Calendar className="h-6 w-6" />
          <span className="absolute -bottom-8 font-bold text-blue-600 dark:text-blue-400">
            {yearData.year}
          </span>
        </motion.div>
      </div>

      {/* Partners for this year */}
      <div
        className={`mt-12 grid grid-cols-1 gap-6 md:grid-cols-${Math.min(yearData.partners.length, 3)}`}
      >
        {yearData.partners.map((partner, partnerIndex) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + partnerIndex * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:bg-slate-800"
          >
            {/* Partner logo */}
            <div className="flex h-16 items-center justify-center">
              <div className="relative h-12 w-[140px]">
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

            {/* Partner details */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {partner.name}
              </h3>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {partner.description}
              </p>

              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Learn more
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>

            {/* Decorative corner */}
            <div className="absolute -right-4 -top-4 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const TimelinePartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
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
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              Partnership Journey
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            A timeline of our strategic collaborations over the years
          </p>
        </motion.div>

        <div className="mt-20 space-y-24">
          {partnerTimeline.map((yearData, index) => (
            <TimelineYear key={yearData.id} yearData={yearData} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelinePartners;
