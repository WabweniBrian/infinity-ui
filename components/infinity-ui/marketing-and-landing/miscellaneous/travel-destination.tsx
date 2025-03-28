"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Calendar,
  Users,
  Star,
  Plane,
  Globe,
  Sun,
  Umbrella,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const TravelDestinationSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeDestination, setActiveDestination] = useState(0);

  const destinations = [
    {
      name: "Santorini, Greece",
      tagline: "Breathtaking views and iconic white architecture",
      description:
        "Experience the magic of Santorini with its stunning sunsets, crystal-clear waters, and charming villages perched on volcanic cliffs. Explore ancient ruins, sample local wines, and relax on unique black sand beaches.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      rating: 4.9,
      reviews: 1248,
      price: "$1,899",
      duration: "7 days",
      activities: [
        "Island Hopping",
        "Wine Tasting",
        "Volcano Tour",
        "Sunset Cruise",
      ],
      weather: "Sunny, 75°F",
      color: "from-blue-500 to-indigo-500",
    },
    {
      name: "Kyoto, Japan",
      tagline: "Ancient temples and serene gardens",
      description:
        "Immerse yourself in Japanese culture and history in Kyoto, home to over 1,600 Buddhist temples and 400 Shinto shrines. Wander through bamboo forests, participate in a traditional tea ceremony, and witness the breathtaking cherry blossoms in spring.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      rating: 4.8,
      reviews: 986,
      price: "$2,299",
      duration: "10 days",
      activities: [
        "Temple Tours",
        "Tea Ceremony",
        "Bamboo Forest",
        "Geisha District",
      ],
      weather: "Mild, 68°F",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Machu Picchu, Peru",
      tagline: "The lost city of the Incas",
      description:
        "Trek through the Andes to discover the mystical ruins of Machu Picchu, an ancient Incan citadel set against a backdrop of stunning mountain scenery. Learn about the fascinating history and engineering marvels of this UNESCO World Heritage site.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      rating: 4.9,
      reviews: 1542,
      price: "$2,499",
      duration: "9 days",
      activities: [
        "Inca Trail",
        "Sacred Valley",
        "Cusco Exploration",
        "Local Cuisine",
      ],
      weather: "Cool, 60°F",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Serengeti, Tanzania",
      tagline: "Witness the great migration",
      description:
        "Embark on the safari adventure of a lifetime in the vast plains of the Serengeti. Witness the spectacular great migration, spot the Big Five, and experience breathtaking sunsets over the African savanna from luxury tented camps.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      rating: 4.9,
      reviews: 876,
      price: "$3,299",
      duration: "8 days",
      activities: [
        "Game Drives",
        "Hot Air Balloon",
        "Maasai Village",
        "Ngorongoro Crater",
      ],
      weather: "Warm, 80°F",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const travelCategories = [
    { name: "Beach Getaways", icon: Sun },
    { name: "Cultural Experiences", icon: Globe },
    { name: "Adventure Travel", icon: Umbrella },
    { name: "Luxury Escapes", icon: Plane },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-50 via-white to-white dark:from-sky-950/30 dark:via-gray-950 dark:to-gray-950"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="travel-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M0,20 Q10,0 20,20 Q30,40 40,20 M0,20 Q10,40 20,20 Q30,0 40,20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#travel-pattern)" />
          </svg>
        </div>

        {/* Floating Elements - Travel Icons */}
        {["✈️", "🏝️", "🗺️", "🏔️", "🧳", "🚢"].map((icon, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.2,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
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
            <span className="h-1 w-12 rounded-full bg-sky-500"></span>
            <span className="mx-2 font-medium text-sky-500">
              DREAM DESTINATIONS
            </span>
            <span className="h-1 w-12 rounded-full bg-sky-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Discover the world&apos;s most
            <span className="bg-gradient-to-r from-sky-500 to-blue-500 bg-clip-text text-transparent">
              {" "}
              breathtaking places
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Curated travel experiences to the most stunning destinations around
            the globe. Let us take you on a journey of discovery and adventure.
          </p>
        </motion.div>

        {/* Travel Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-4"
        >
          {travelCategories.map((category, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-sky-500/10 to-blue-500/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative rounded-xl border border-gray-200/50 bg-white p-6 text-center shadow-sm transition-shadow duration-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30">
                  <category.icon className="h-8 w-8 text-sky-600 dark:text-sky-400" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
                <button className="mt-2 inline-flex items-center text-sm font-medium text-sky-600 dark:text-sky-400">
                  Explore
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Featured Destinations */}
        <div className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Featured Destinations
            </h3>
            <button className="inline-flex items-center font-medium text-sky-600 dark:text-sky-400">
              View All Destinations
              <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {destinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`relative cursor-pointer overflow-hidden rounded-xl ${activeDestination === index ? "ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-gray-900" : ""}`}
                onClick={() => setActiveDestination(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      destination.image ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="font-bold text-white">{destination.name}</h4>
                  <div className="flex items-center text-sm text-white/90">
                    <Star className="mr-1 h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{destination.rating}</span>
                    <span className="ml-1 text-white/70">
                      ({destination.reviews})
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
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
              <div
                className={`absolute -inset-4 bg-gradient-to-r ${destinations[activeDestination].color} rounded-3xl opacity-20 blur-xl`}
              ></div>
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto">
                    <div className="relative h-full w-full">
                      <Image
                        src={
                          destinations[activeDestination].image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp" ||
                          "/placeholder.svg"
                        }
                        alt={destinations[activeDestination].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute right-4 top-4 rounded-lg bg-white/90 px-3 py-1 font-bold text-gray-900 backdrop-blur-sm dark:bg-gray-800/90 dark:text-white">
                      {destinations[activeDestination].price}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="mb-2 flex items-center">
                      <MapPin className="mr-2 h-5 w-5 text-sky-500" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {destinations[activeDestination].name}
                      </h3>
                    </div>
                    <p className="mb-4 font-medium text-sky-600 dark:text-sky-400">
                      {destinations[activeDestination].tagline}
                    </p>
                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                      {destinations[activeDestination].description}
                    </p>

                    <div className="mb-6 grid grid-cols-2 gap-4">
                      <div className="flex items-center rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                        <Calendar className="mr-3 h-5 w-5 text-sky-500" />
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Duration
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {destinations[activeDestination].duration}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                        <Users className="mr-3 h-5 w-5 text-sky-500" />
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Group Size
                          </div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            Max 12 people
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Included Activities:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {destinations[activeDestination].activities.map(
                          (activity, activityIndex) => (
                            <span
                              key={activityIndex}
                              className="inline-block rounded-full bg-sky-100 px-3 py-1 text-sm text-sky-800 dark:bg-sky-900/30 dark:text-sky-300"
                            >
                              {activity}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    <button className="inline-flex w-full transform items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 px-4 py-3 font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:from-sky-600 hover:to-blue-600 hover:shadow-lg">
                      Book This Trip
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-sky-500/20 to-blue-500/20 blur-xl"></div>
          <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800">
            <div className="flex flex-col items-center md:flex-row">
              <div className="relative mb-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-full md:mb-0 md:mr-6">
                <Image
                  src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  alt="Customer"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="mb-2 flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mb-4 italic text-gray-600 dark:text-gray-300">
                  &quot;Our trip to Santorini was absolutely magical. The
                  accommodations were perfect, the guided tours were informative
                  and fun, and the entire experience exceeded our expectations.
                  We can&apos;t wait to book our next adventure!&quot;
                </p>
                <div className="font-bold text-gray-900 dark:text-white">
                  Sarah & Michael Johnson
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Traveled to Greece, June 2023
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelDestinationSection;
