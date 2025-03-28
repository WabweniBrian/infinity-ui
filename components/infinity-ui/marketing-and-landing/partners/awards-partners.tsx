"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Award, Star, ExternalLink } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

// partner awards data
const partnerAwards = [
  {
    id: 1,
    category: "Partner of the Year",
    icon: <Trophy className="h-6 w-6" />,
    color:
      "from-amber-500 to-yellow-500 dark:from-amber-400 dark:to-yellow-400",
    winner: {
      id: 101,
      name: "Acme Corporation",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description:
        "For outstanding contributions to our ecosystem and exceptional customer outcomes.",
      achievement:
        "Delivered 150% ROI for joint customers and expanded into 5 new markets.",
      website: "https://example.com",
    },
    finalists: [
      {
        id: 102,
        name: "TechGiant",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        website: "https://example.com",
      },
      {
        id: 103,
        name: "Globex",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        website: "https://example.com",
      },
    ],
  },
  {
    id: 2,
    category: "Innovation Excellence",
    icon: <Star className="h-6 w-6" />,
    color: "from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400",
    winner: {
      id: 201,
      name: "Wayne Enterprises",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description:
        "For pioneering breakthrough solutions that push the boundaries of what&apos;s possible.",
      achievement:
        "Developed 3 industry-first technologies that transformed customer experiences.",
      website: "https://example.com",
    },
    finalists: [
      {
        id: 202,
        name: "Stark Industries",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        website: "https://example.com",
      },
      {
        id: 203,
        name: "Cyberdyne Systems",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        website: "https://example.com",
      },
    ],
  },
  {
    id: 3,
    category: "Customer Success",
    icon: <Medal className="h-6 w-6" />,
    color:
      "from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400",
    winner: {
      id: 301,
      name: "Umbrella Corp",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description:
        "For exceptional dedication to customer satisfaction and measurable outcomes.",
      achievement:
        "Achieved 98% customer satisfaction rating and 95% renewal rate.",
      website: "https://example.com",
    },
    finalists: [
      {
        id: 302,
        name: "Oscorp",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        website: "https://example.com",
      },
      {
        id: 303,
        name: "Initech",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        website: "https://example.com",
      },
    ],
  },
  {
    id: 4,
    category: "Rising Star",
    icon: <Award className="h-6 w-6" />,
    color:
      "from-purple-500 to-violet-500 dark:from-purple-400 dark:to-violet-400",
    winner: {
      id: 401,
      name: "Daily Planet",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description:
        "For exceptional growth and impact as a new partner in our ecosystem.",
      achievement:
        "Grew partnership revenue by 300% and expanded to 12 new enterprise clients.",
      website: "https://example.com",
    },
    finalists: [
      {
        id: 402,
        name: "Massive Dynamic",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        website: "https://example.com",
      },
      {
        id: 403,
        name: "LexCorp",
        logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        website: "https://example.com",
      },
    ],
  },
];

const AwardsPartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [activeAward, setActiveAward] = useState(partnerAwards[0].id);

  // Get current award data
  const currentAward =
    partnerAwards.find((award) => award.id === activeAward) || partnerAwards[0];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-900"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(253,224,71,0.1),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(253,224,71,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.05),transparent_50%)]" />
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
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent dark:from-amber-400 dark:to-yellow-400">
              Awards
            </span>{" "}
            & Recognition
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Celebrating excellence in our partner ecosystem
          </p>
        </motion.div>

        {/* Award Categories Tabs */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {partnerAwards.map((award) => (
            <button
              key={award.id}
              onClick={() => setActiveAward(award.id)}
              className={`flex items-center rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeAward === award.id
                  ? "bg-gradient-to-r text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700"
              }`}
              style={
                activeAward === award.id
                  ? {
                      backgroundImage: `linear-gradient(to right, ${award.color.split(" ").slice(1).join(" ")})`,
                    }
                  : {}
              }
            >
              <span className="mr-2">{award.icon}</span>
              {award.category}
            </button>
          ))}
        </div>

        {/* Award Winner Showcase */}
        <div className="mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAward.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-4xl"
            >
              {/* Winner Card */}
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-800">
                {/* Award Badge */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rotate-12">
                  <div
                    className="absolute inset-0 rounded-full bg-gradient-to-br"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${currentAward.color.split(" ").slice(1).join(" ")})`,
                    }}
                  />
                </div>

                <div className="relative p-8">
                  <div className="flex flex-col items-center lg:flex-row lg:items-start">
                    {/* Award Icon */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, delay: 0.2 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br text-white lg:mr-6"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, ${currentAward.color.split(" ").slice(1).join(" ")})`,
                      }}
                    >
                      <div className="text-3xl">{currentAward.icon}</div>
                    </motion.div>

                    <div className="mt-6 text-center lg:mt-0 lg:text-left">
                      <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        {currentAward.category}
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {currentAward.winner.name}
                      </h3>

                      <div className="mt-4 flex justify-center lg:justify-start">
                        <Image
                          src={
                            currentAward.winner.logo ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={currentAward.winner.name}
                          width={180}
                          height={80}
                          className="max-h-16 max-w-[180px] object-contain"
                        />
                      </div>

                      <p className="mt-6 text-gray-600 dark:text-gray-300">
                        {currentAward.winner.description}
                      </p>

                      <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-slate-700">
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Key Achievement:
                        </div>
                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                          {currentAward.winner.achievement}
                        </p>
                      </div>

                      <div className="mt-6">
                        <a
                          href={currentAward.winner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md bg-gradient-to-r px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${currentAward.color.split(" ").slice(1).join(" ")})`,
                          }}
                        >
                          Visit Website
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Finalists */}
              <div className="mt-8">
                <h4 className="text-center text-lg font-semibold text-gray-900 dark:text-white">
                  Finalists
                </h4>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {currentAward.finalists.map((finalist, index) => (
                    <motion.div
                      key={finalist.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      className="flex items-center rounded-lg bg-white p-4 shadow-md dark:bg-slate-800"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700">
                        <Medal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>

                      <div className="ml-4 flex-grow">
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                          {finalist.name}
                        </h5>
                      </div>

                      <div className="flex h-10 w-24 items-center justify-center">
                        <Image
                          src={
                            finalist.logo ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={finalist.name}
                          width={80}
                          height={40}
                          className="max-h-8 max-w-[80px] object-contain"
                        />
                      </div>

                      <a
                        href={finalist.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AwardsPartners;
