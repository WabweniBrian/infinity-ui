"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Clock,
  MapPin,
  Search,
  Star,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const FoodDeliveryHero = () => {
  const controls = useAnimation();
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeDish, setActiveDish] = useState(0);

  // Categories data
  const categories = [
    { name: "All", icon: Utensils },
    { name: "Pizza", icon: Utensils },
    { name: "Burgers", icon: Utensils },
    { name: "Sushi", icon: Utensils },
    { name: "Desserts", icon: Utensils },
  ];

  // Featured dishes data
  const dishes = [
    {
      name: "Margherita Pizza",
      restaurant: "Bella Italia",
      price: "$14.99",
      rating: 4.8,
      time: "25-35 min",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9yposdWz83PqynLtKbkXomjxFR9Z4NvPu2gCVl81",
    },
    {
      name: "Double Cheeseburger",
      restaurant: "Burger House",
      price: "$12.99",
      rating: 4.7,
      time: "15-25 min",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoZVkHFdh2BRxjvs0lePWdUT3JIKoAfbgqLw8z",
    },
    {
      name: "California Roll",
      restaurant: "Sushi Master",
      price: "$16.99",
      rating: 4.9,
      time: "30-40 min",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoTG5LrKxINGL43Bmkhwazp7exFWUt06ZryRuJ",
    },
  ];

  // Start animations when component mounts
  useEffect(() => {
    controls.start("visible");

    // Auto-rotate dishes
    const interval = setInterval(() => {
      setActiveDish((prev) => (prev + 1) % dishes.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [controls, dishes.length]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-orange-50 to-white py-20">
      {/* Decorative food illustrations */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-orange-100 opacity-50 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-40 -left-20 h-[300px] w-[300px] rounded-full bg-red-100 opacity-50 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Left Content */}
          <div>
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1.5 text-sm font-medium text-orange-600"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-orange-500"></span>
              #1 Food Delivery App
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              Delicious food,{" "}
              <span className="relative text-orange-500">
                delivered
                <motion.div
                  className="absolute -bottom-2 left-0 h-3 w-full bg-orange-100"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>{" "}
              fast
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-lg text-lg text-gray-600"
            >
              Order from your favorite restaurants and track your food in
              real-time. From local favorites to national chains, we&apos;ve got
              you covered.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              variants={itemVariants}
              className="mb-8 overflow-hidden rounded-full border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex items-center">
                <div className="flex flex-1 items-center gap-2 px-4 py-3">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <input
                    type="text"
                    placeholder="Enter your delivery address"
                    className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                  />
                </div>
                <div className="px-1">
                  <button className="rounded-full bg-orange-500 px-6 py-2 font-medium text-white transition-all hover:bg-orange-600">
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="mb-2 text-sm font-medium text-gray-700">
                Popular Categories
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      activeCategory === index
                        ? "border-orange-200 bg-orange-50 text-orange-600"
                        : "border-gray-200 bg-white text-gray-700 hover:border-orange-100 hover:bg-orange-50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <category.icon
                      className={`h-4 w-4 ${activeCategory === index ? "text-orange-500" : "text-gray-500"}`}
                    />
                    {category.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-medium text-white transition-all hover:bg-orange-600"
              >
                Order Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
              >
                <Utensils className="h-4 w-4" />
                View Restaurants
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-8 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 overflow-hidden rounded-full border-2 border-white"
                    >
                      <Image
                        src={`/images/1.png`}
                        alt={`User ${i + 1}`}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <span className="font-semibold">2M+</span> happy customers
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-1 font-medium">4.8/5</span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Food Showcase */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto h-[500px] max-w-md"
            >
              {/* Phone frame */}
              <div className="absolute left-1/2 top-0 h-[500px] w-[280px] -translate-x-1/2 rounded-[40px] border-[10px] border-gray-900 bg-white shadow-xl">
                {/* Phone notch */}
                <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-xl bg-gray-900"></div>

                {/* App content */}
                <div className="h-full w-full overflow-hidden rounded-[30px] bg-gray-100 p-2">
                  {/* App header */}
                  <div className="rounded-xl bg-white p-3">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-gray-500">Delivery to</div>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          123 Main St, Apt 4B
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                      <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
                        <Image
                          src="/images/1.png"
                          alt="User"
                          width={32}
                          height={32}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <div className="text-sm text-gray-400">
                        Search for food or restaurants
                      </div>
                    </div>
                  </div>

                  {/* Food cards */}
                  <div className="mt-3 p-2">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="text-sm font-bold">Popular Near You</div>
                      <div className="text-xs font-medium text-orange-500">
                        View All
                      </div>
                    </div>

                    <div className="relative h-[300px]">
                      {dishes.map((dish, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{
                            opacity: activeDish === index ? 1 : 0.5,
                            scale: activeDish === index ? 1 : 0.9,
                            y: activeDish === index ? 0 : 20,
                            zIndex: activeDish === index ? 30 : 10,
                          }}
                          transition={{ duration: 0.5 }}
                          onClick={() => setActiveDish(index)}
                          className={`absolute left-0 top-0 w-full cursor-pointer rounded-xl bg-white p-3 shadow-md transition-all ${
                            activeDish === index ? "z-30" : "z-10"
                          }`}
                        >
                          <div className="relative mb-3 h-[150px] w-full overflow-hidden rounded-lg">
                            <Image
                              src={dish.image || "/default-image.jpg"}
                              alt={dish.name}
                              fill
                              className="object-cover transition-all duration-700 hover:scale-110"
                            />
                            <div className="absolute bottom-2 right-2 rounded-full bg-white px-2 py-1 text-xs font-bold text-orange-500">
                              {dish.price}
                            </div>
                          </div>

                          <h3 className="mb-1 text-sm font-bold">
                            {dish.name}
                          </h3>
                          <div className="mb-2 flex items-center gap-1 text-xs text-gray-500">
                            <Utensils className="h-3 w-3" />
                            {dish.restaurant}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {dish.rating}
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs">
                              <Clock className="h-3 w-3 text-gray-500" />
                              {dish.time}
                            </div>
                            <button className="rounded-full bg-orange-100 p-1.5 text-orange-500 transition-all hover:bg-orange-200">
                              <ArrowRight className="h-3 w-3" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Navigation dots */}
                    <div className="mt-4 flex justify-center gap-2">
                      {dishes.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveDish(index)}
                          className={`h-2 rounded-full transition-all ${
                            activeDish === index
                              ? "w-6 bg-orange-500"
                              : "w-2 bg-orange-200"
                          }`}
                          aria-label={`View dish ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -left-20 top-1/4 rounded-xl bg-white p-3 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 2,
                      }}
                    >
                      <Clock className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-900">
                      Delivery Status
                    </div>
                    <div className="text-xs text-green-600">
                      On the way (10 min)
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -right-16 bottom-1/3 rounded-xl bg-white p-3 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 overflow-hidden rounded-full">
                    <Image
                      src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoTG5LrKxINGL43Bmkhwazp7exFWUt06ZryRuJ"
                      alt="Restaurant"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">
                      Order Confirmed
                    </div>
                    <div className="flex items-center gap-1 text-orange-500">
                      <Star className="h-3 w-3 fill-orange-500" />
                      <span>Top Rated</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FoodDeliveryHero;
