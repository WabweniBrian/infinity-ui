"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Users, Globe, Search, Star } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const TravelExplorerSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeDestination, setActiveDestination] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);

  const destinations = [
    {
      id: 1,
      name: "Santorini, Greece",
      description:
        "Experience the breathtaking views of white-washed buildings against the deep blue Aegean Sea. Explore ancient ruins, indulge in Mediterranean cuisine, and witness the most spectacular sunsets.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypodhAMl3C1mGvCoVSZFp2YyKNeTHljBX90gxEh",
      rating: 4.9,
      reviews: 1243,
      price: "$1,899",
      duration: "7 days",
      activities: [
        "Island Hopping",
        "Wine Tasting",
        "Volcano Tour",
        "Beach Relaxation",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      description:
        "Immerse yourself in Japanese culture as you visit ancient temples, traditional tea houses, and stunning bamboo forests. Experience the beauty of cherry blossoms or the vibrant colors of autumn leaves.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoQ2pKKiG1kacO0NKLwDbdX3BsVMlQynx9U58R",
      rating: 4.8,
      reviews: 987,
      price: "$2,299",
      duration: "10 days",
      activities: [
        "Temple Tours",
        "Tea Ceremony",
        "Bamboo Forest",
        "Geisha District",
      ],
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 3,
      name: "Machu Picchu, Peru",
      description:
        "Trek through the Andes to discover the ancient Incan citadel set against a backdrop of stunning mountain scenery. Learn about the fascinating history and engineering marvels of this UNESCO World Heritage site.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoQjfyrRG1kacO0NKLwDbdX3BsVMlQynx9U58R",
      rating: 4.9,
      reviews: 1567,
      price: "$2,499",
      duration: "9 days",
      activities: [
        "Inca Trail",
        "Archaeological Tours",
        "Mountain Hiking",
        "Cultural Experiences",
      ],
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const popularSearches = [
    "Beach Getaways",
    "European Cities",
    "Adventure Tours",
    "Cultural Experiences",
    "Luxury Retreats",
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-white py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-blue-400/30 to-cyan-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-indigo-400/30 to-purple-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Travel Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="travel-pattern"
                x="0"
                y="0"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M50,0 L100,50 L50,100 L0,50 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
                <circle cx="50" cy="50" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#travel-pattern)" />
          </svg>
        </div>

        {/* Floating Travel Icons */}
        {["✈️", "🏝️", "🗺️", "🏔️", "🏰", "🌋", "🌴", "🧳"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25],
              x: [0, Math.random() * 50 - 25],
              rotate: [0, Math.random() * 40 - 20],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            {icon}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-blue-500"></span>
            <span className="mx-2 font-medium text-blue-500">
              EXPLORE THE WORLD
            </span>
            <span className="h-1 w-12 rounded-full bg-blue-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Discover your next
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              adventure
            </span>
          </h2>

          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Explore handpicked destinations around the globe. From pristine
            beaches to ancient ruins, find your perfect getaway.
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto mb-8 max-w-3xl"
          >
            <div
              className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500/50 to-cyan-500/50 blur-md transition-opacity duration-300 ${searchFocused ? "opacity-100" : "opacity-0"}`}
            ></div>
            <div className="relative overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-1 items-center border-b border-gray-200 p-4 dark:border-gray-700 md:border-b-0 md:border-r">
                  <Search className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where do you want to go?"
                    className="w-full border-none bg-transparent text-gray-900 focus:outline-none dark:text-white"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
                <div className="flex flex-1 items-center border-b border-gray-200 p-4 dark:border-gray-700 md:border-b-0 md:border-r">
                  <Calendar className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <input
                    type="text"
                    placeholder="When are you going?"
                    className="w-full border-none bg-transparent text-gray-900 focus:outline-none dark:text-white"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
                <div className="flex flex-1 items-center border-b border-gray-200 p-4 dark:border-gray-700 md:border-b-0 md:border-r">
                  <Users className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Number of travelers"
                    className="w-full border-none bg-transparent text-gray-900 focus:outline-none dark:text-white"
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                  />
                </div>
                <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 p-4 font-medium text-white transition-colors hover:from-blue-600 hover:to-cyan-600 md:px-8">
                  Search
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Popular Searches */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Popular:
              </span>
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  className="text-sm text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {search}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Featured Destinations */}
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Destinations
            </h3>
            <button className="inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => setActiveDestination(index)}
              >
                <div
                  className={`absolute -inset-2 bg-gradient-to-r ${destination.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
                ></div>
                <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-lg dark:border-gray-700/50 dark:bg-gray-800">
                  {/* Destination Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={
                        destination.image ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={destination.name}
                      fill
                      className="h-full w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-white">
                          {destination.name}
                        </h4>
                        <div className="flex items-center rounded-full bg-white/20 px-2 py-1 backdrop-blur-sm">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="ml-1 text-xs text-white">
                            {destination.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Destination Details */}
                  <div className="p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="mr-1 h-4 w-4" />
                        {destination.duration}
                      </div>
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {destination.price}
                      </div>
                    </div>

                    <p className="mb-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                      {destination.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {destination.activities.slice(0, 2).map((activity, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {activity}
                        </span>
                      ))}
                      {destination.activities.length > 2 && (
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          +{destination.activities.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected Destination Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDestination}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl"></div>
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Destination Image */}
                <div className="relative h-64 lg:h-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-600"></div>
                  <Image
                    src={
                      destinations[activeDestination].image ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={destinations[activeDestination].name}
                    fill
                    className="absolute inset-0 h-full w-full object-cover mix-blend-overlay"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-2 flex items-center">
                      <Globe className="mr-2 h-5 w-5 text-white" />
                      <h3 className="text-2xl font-bold text-white">
                        {destinations[activeDestination].name}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i <
                              Math.floor(destinations[activeDestination].rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-white/90">
                        {destinations[activeDestination].rating} (
                        {destinations[activeDestination].reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Destination Details */}
                <div className="p-6 md:p-8">
                  <h4 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                    About this destination
                  </h4>
                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    {destinations[activeDestination].description}
                  </p>

                  <div className="mb-6 grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                      <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        Duration
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {destinations[activeDestination].duration}
                      </div>
                    </div>
                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                      <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        Price
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {destinations[activeDestination].price}
                      </div>
                    </div>
                  </div>

                  <h4 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                    Activities
                  </h4>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {destinations[activeDestination].activities.map(
                      (activity, i) => (
                        <span
                          key={i}
                          className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {activity}
                        </span>
                      ),
                    )}
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <button className="inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-cyan-600 hover:shadow-lg">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TravelExplorerSection;
