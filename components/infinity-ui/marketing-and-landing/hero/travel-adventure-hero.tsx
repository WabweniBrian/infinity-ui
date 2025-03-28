"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Calendar, Globe, Map, MapPin, Star } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const TravelAdventureHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  // Featured destinations
  const [activeDestination, setActiveDestination] = useState(0);
  const destinations = [
    {
      name: "Santorini",
      country: "Greece",
      rating: 4.9,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoGN72GXUOFxW0BEUNidYtMQ9Sya4s1cmfhDkw",
    },
    {
      name: "Kyoto",
      country: "Japan",
      rating: 4.8,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoDP5AHm2OeWJqXBEQTpvwrsimgD836Ro5tMP4",
    },
    {
      name: "Bali",
      country: "Indonesia",
      rating: 4.7,
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoJz95ne6b1LpRdOliukBZ9PyAEtqcV2GD7hTC",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative h-[140vh] w-full overflow-hidden bg-blue-900"
    >
      {/* Background image with parallax effect */}
      <motion.div
        className="absolute inset-0 h-screen w-full"
        style={{ opacity, y: y1 }}
      >
        <Image
          src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoGN72GXUOFxW0BEUNidYtMQ9Sya4s1cmfhDkw"
          alt="Travel destination background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-blue-900/90" />
      </motion.div>

      {/* Content container */}
      <div className="sticky top-0 h-screen w-full">
        <div className="relative z-10 mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid h-full items-center gap-8 pt-16 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div style={{ y: y2 }} className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md"
              >
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-yellow-400"></span>
                Discover the world with us
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              >
                Adventure Awaits{" "}
                <span className="relative">
                  Beyond
                  <motion.div
                    className="absolute -bottom-2 left-0 h-2 w-full bg-yellow-400"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  />
                </span>{" "}
                the Horizon
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8 max-w-lg text-lg text-white/80"
              >
                Embark on unforgettable journeys to the world&apos;s most
                breathtaking destinations. Curated experiences that turn your
                travel dreams into reality.
              </motion.p>

              {/* Search Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8 overflow-hidden rounded-full bg-white shadow-lg"
              >
                <div className="flex flex-wrap items-center">
                  <div className="flex flex-1 items-center gap-2 border-r border-gray-200 px-4 py-3">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <input
                      type="text"
                      placeholder="Where to?"
                      className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex flex-1 items-center gap-2 border-r border-gray-200 px-4 py-3 sm:flex-initial">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <input
                      type="text"
                      placeholder="When?"
                      className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                    />
                  </div>
                  <div className="w-full p-1 sm:w-auto">
                    <button className="w-full rounded-full bg-blue-600 px-6 py-2 font-medium text-white transition-all hover:bg-blue-700 sm:w-auto">
                      Search
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-8"
              >
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="h-10 w-10 overflow-hidden rounded-full border-2 border-white"
                      >
                        <Image
                          src={`/images/1.png`}
                          alt={`Traveler ${i + 1}`}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold">2,500+</span> happy
                    travelers
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">4.9/5</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Destination Cards */}
            <div className="relative hidden h-[500px] lg:block">
              {destinations.map((destination, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{
                    opacity: index === activeDestination ? 1 : 0.7,
                    x: 0,
                    scale: index === activeDestination ? 1 : 0.9,
                    rotate: (index - activeDestination) * 5,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                  }}
                  onClick={() => setActiveDestination(index)}
                  className={cn(
                    "absolute left-0 top-0 w-[300px] cursor-pointer rounded-2xl bg-white p-3 shadow-xl transition-all",
                    {
                      "left-0 top-0 z-30": index === 0,
                      "left-[15%] top-[15%] z-20": index === 1,
                      "left-[30%] top-[30%] z-10": index !== 0 && index !== 1,
                      "z-40": index === activeDestination,
                    },
                  )}
                  style={{
                    transformOrigin: "center center",
                  }}
                >
                  <div className="relative mb-3 h-[200px] w-full overflow-hidden rounded-xl">
                    <Image
                      src={
                        destination.image ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={destination.name}
                      fill
                      className="object-cover transition-all duration-700 hover:scale-110"
                    />
                    <div className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-blue-900 backdrop-blur-sm">
                      Popular Destination
                    </div>
                  </div>

                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {destination.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        {destination.country}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700">
                      <Star className="h-3 w-3 fill-blue-700" />
                      {destination.rating}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="text-lg font-bold text-blue-600">
                        $1,299
                      </span>{" "}
                      / person
                    </div>
                    <button className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-all hover:bg-blue-700">
                      View
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Map element */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-0 right-0 z-40 rounded-2xl bg-white p-3 shadow-xl"
              >
                <div className="relative h-[150px] w-[200px] overflow-hidden rounded-xl">
                  <Map className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-blue-200" />
                  <div className="absolute inset-0 bg-blue-50/50" />

                  {/* Animated location pin */}
                  <motion.div
                    className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.5, 1] }}
                    transition={{ delay: 1.5, duration: 1 }}
                  >
                    <div className="h-full w-full rounded-full bg-red-500" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-red-500"
                      animate={{ scale: [1, 2], opacity: [1, 0] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1.5,
                        repeatDelay: 0.5,
                      }}
                    />
                  </motion.div>
                </div>
                <div className="mt-2 text-center text-sm font-medium text-gray-900">
                  Explore Destinations
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Floating action buttons */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-3">
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: "spring" }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg transition-all hover:bg-blue-50"
          >
            <Globe className="h-5 w-5" />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, type: "spring" }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-blue-600 shadow-lg transition-all hover:bg-blue-50"
          >
            <Map className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TravelAdventureHero;
