"use client";

import type React from "react";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Award, Medal, Trophy } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Partner = {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
};

//  partner data with tiers
const partners = {
  platinum: [
    {
      id: 1,
      name: "Acme Corporation",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description:
        "Global leader in innovative solutions for businesses of all sizes.",
      website: "https://example.com",
    },
    {
      id: 2,
      name: "TechGiant",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description: "Pioneering technology solutions for the modern enterprise.",
      website: "https://example.com",
    },
  ],
  gold: [
    {
      id: 3,
      name: "Globex",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description: "Transforming industries through cutting-edge technology.",
      website: "https://example.com",
    },
    {
      id: 4,
      name: "Initech",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description: "Streamlining business processes for over two decades.",
      website: "https://example.com",
    },
    {
      id: 5,
      name: "Umbrella Corp",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description:
        "Protecting businesses with next-generation security solutions.",
      website: "https://example.com",
    },
  ],
  silver: [
    {
      id: 6,
      name: "Stark Industries",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description: "Powering the future with sustainable energy solutions.",
      website: "https://example.com",
    },
    {
      id: 7,
      name: "Wayne Enterprises",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description:
        "Building a better tomorrow through philanthropic initiatives.",
      website: "https://example.com",
    },
    {
      id: 8,
      name: "Cyberdyne Systems",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description: "Advancing AI and robotics for a connected world.",
      website: "https://example.com",
    },
    {
      id: 9,
      name: "Oscorp",
      logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      description: "Developing breakthrough solutions in biotechnology.",
      website: "https://example.com",
    },
  ],
};

interface PartnerCardProps {
  partner: {
    id: number;
    name: string;
    logo: string;
    description: string;
    website: string;
  };
  tier: "platinum" | "gold" | "silver";
  index: number;
}

const PartnerCard = ({ partner, tier, index }: PartnerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const tierConfig = {
    platinum: {
      icon: <Trophy className="h-6 w-6" />,
      color:
        "from-slate-300 to-slate-400 dark:from-slate-400 dark:to-slate-500",
      textColor: "text-slate-700 dark:text-slate-300",
      size: "lg:col-span-2",
    },
    gold: {
      icon: <Medal className="h-6 w-6" />,
      color:
        "from-amber-300 to-amber-400 dark:from-amber-400 dark:to-amber-500",
      textColor: "text-amber-700 dark:text-amber-300",
      size: "",
    },
    silver: {
      icon: <Award className="h-6 w-6" />,
      color: "from-gray-300 to-gray-400 dark:from-gray-400 dark:to-gray-500",
      textColor: "text-gray-700 dark:text-gray-300",
      size: "",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 dark:bg-slate-800 ${tierConfig[tier].size}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Tier badge */}
      <div
        className="absolute right-4 top-4 z-10 flex items-center space-x-1 rounded-full bg-gradient-to-r px-3 py-1 text-xs font-medium text-white"
        style={{
          backgroundImage: `linear-gradient(to right, ${tierConfig[tier].color.split(" ").slice(1).join(" ")})`,
        }}
      >
        {tierConfig[tier].icon}
        <span className="capitalize">{tier}</span>
      </div>

      <div className="flex h-full flex-col p-6">
        <div className="flex items-center justify-center py-6">
          <Image
            src={
              partner.logo ||
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
            }
            alt={partner.name}
            width={160}
            height={70}
            className="max-h-16 max-w-[160px] transition-all duration-300 group-hover:scale-105"
          />
        </div>

        <div className="mt-4 flex-grow">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {partner.name}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {partner.description}
          </p>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-gradient-to-r px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:opacity-90"
                style={{
                  backgroundImage: `linear-gradient(to right, ${tierConfig[tier].color.split(" ").slice(1).join(" ")})`,
                }}
              >
                Visit Website
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r"
        style={{
          backgroundImage: `linear-gradient(to right, ${tierConfig[tier].color.split(" ").slice(1).join(" ")})`,
        }}
      />
    </motion.div>
  );
};

const TierSection = ({
  title,
  icon,
  partners,
  tier,
}: {
  title: string;
  icon: React.ReactNode;
  partners: Partner[];
  tier: "platinum" | "gold" | "silver";
}) => {
  return (
    <div className="mt-16">
      <div className="flex items-center">
        <div
          className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r text-white"
          style={{
            backgroundImage:
              tier === "platinum"
                ? "linear-gradient(to right, rgb(203, 213, 225), rgb(148, 163, 184))"
                : tier === "gold"
                  ? "linear-gradient(to right, rgb(252, 211, 77), rgb(251, 191, 36))"
                  : "linear-gradient(to right, rgb(209, 213, 219), rgb(156, 163, 175))",
          }}
        >
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>

      <div
        className={`mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 ${tier === "platinum" ? "lg:grid-cols-2" : "lg:grid-cols-4"}`}
      >
        {partners.map((partner, index) => (
          <PartnerCard
            key={partner.id}
            partner={partner}
            tier={tier}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const FeaturedPartners = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gray-50 py-24 dark:bg-slate-900"
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
          <div className="inline-flex items-center justify-center rounded-full bg-blue-100 px-4 py-1 dark:bg-blue-900/30">
            <Star className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Our Sponsors
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Partnering with{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-indigo-400">
              Industry Leaders
            </span>
          </h2>

          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We&apos;re grateful for the support of these amazing organizations
          </p>
        </motion.div>

        <TierSection
          title="Platinum Sponsors"
          icon={<Trophy className="h-6 w-6" />}
          partners={partners.platinum}
          tier="platinum"
        />

        <TierSection
          title="Gold Sponsors"
          icon={<Medal className="h-6 w-6" />}
          partners={partners.gold}
          tier="gold"
        />

        <TierSection
          title="Silver Sponsors"
          icon={<Award className="h-6 w-6" />}
          partners={partners.silver}
          tier="silver"
        />
      </div>
    </section>
  );
};

export default FeaturedPartners;
