"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Clock, MapPin, Utensils } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const RestaurantShowcaseSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeMenu, setActiveMenu] = useState(0);

  const menuCategories = [
    { name: "Appetizers", icon: "🍤" },
    { name: "Main Course", icon: "🍲" },
    { name: "Desserts", icon: "🍰" },
    { name: "Drinks", icon: "🍹" },
  ];

  const menuItems = [
    // Appetizers
    [
      {
        name: "Truffle Arancini",
        description: "Crispy risotto balls with black truffle and mozzarella",
        price: "$12",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Vegetarian", "Chef's Choice"],
        rating: 4.8,
      },
      {
        name: "Tuna Tartare",
        description: "Fresh tuna with avocado, sesame oil, and wonton crisps",
        price: "$16",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Gluten-Free", "Spicy"],
        rating: 4.9,
      },
      {
        name: "Burrata Salad",
        description: "Creamy burrata with heirloom tomatoes and basil oil",
        price: "$14",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Vegetarian", "Seasonal"],
        rating: 4.7,
      },
    ],
    // Main Course
    [
      {
        name: "Wagyu Ribeye",
        description:
          "A5 Japanese Wagyu with truffle butter and roasted vegetables",
        price: "$65",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Signature Dish", "Gluten-Free"],
        rating: 5.0,
      },
      {
        name: "Lobster Risotto",
        description: "Creamy saffron risotto with Maine lobster and herbs",
        price: "$42",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Gluten-Free", "Seafood"],
        rating: 4.9,
      },
      {
        name: "Wild Mushroom Pasta",
        description:
          "House-made pappardelle with seasonal wild mushrooms and truffle cream",
        price: "$28",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Vegetarian", "Seasonal"],
        rating: 4.8,
      },
    ],
    // Desserts
    [
      {
        name: "Chocolate Soufflé",
        description: "Warm chocolate soufflé with vanilla bean ice cream",
        price: "$14",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Vegetarian", "15-min Preparation"],
        rating: 4.9,
      },
      {
        name: "Crème Brûlée",
        description: "Classic vanilla bean crème brûlée with caramelized sugar",
        price: "$12",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Gluten-Free", "Vegetarian"],
        rating: 4.8,
      },
      {
        name: "Seasonal Fruit Tart",
        description: "Buttery pastry with seasonal fruits and crème pâtissière",
        price: "$10",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Vegetarian", "Seasonal"],
        rating: 4.7,
      },
    ],
    // Drinks
    [
      {
        name: "Signature Martini",
        description: "House-infused gin with vermouth and olive tapenade",
        price: "$16",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Alcoholic", "Signature"],
        rating: 4.9,
      },
      {
        name: "Barrel-Aged Manhattan",
        description: "Bourbon aged in-house with sweet vermouth and bitters",
        price: "$18",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Alcoholic", "Strong"],
        rating: 4.8,
      },
      {
        name: "Berry Kombucha Mocktail",
        description: "House-made kombucha with seasonal berries and herbs",
        price: "$10",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
        tags: ["Non-Alcoholic", "Probiotic"],
        rating: 4.7,
      },
    ],
  ];

  const restaurantInfo = {
    name: "Bistro Infinity",
    rating: 4.8,
    reviews: 342,
    address: "123 Gourmet Avenue, Culinary District",
    hours: "Tue-Sun: 5:30 PM - 11:00 PM",
    phone: "+1 (555) 123-4567",
    website: "www.bistroinfinity.com",
    description:
      "An elegant dining experience featuring seasonal ingredients and innovative culinary techniques. Our chef combines traditional flavors with modern presentation to create unforgettable meals.",
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-amber-400/30 to-orange-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-red-400/30 to-rose-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Food Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]">
          <svg width="100%" height="100%">
            <pattern
              id="food-pattern"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30,50 C30,30 50,30 50,50 C50,70 70,70 70,50"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#food-pattern)" />
          </svg>
        </div>

        {/* Floating Food Icons */}
        {["🍷", "🍽️", "🥂", "🍴", "🥗", "🍝", "🥩", "🍰"].map((icon, i) => (
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
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2">
          {/* Restaurant Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative">
              <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 blur-xl"></div>
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
                {/* Restaurant Image */}
                <div className="relative h-64">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-orange-600"></div>
                  <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-cover bg-center opacity-70 mix-blend-overlay"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="mb-1 text-3xl font-bold text-white">
                          {restaurantInfo.name}
                        </h1>
                        <div className="flex items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(restaurantInfo.rating)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-white/90">
                            {restaurantInfo.rating} ({restaurantInfo.reviews}{" "}
                            reviews)
                          </span>
                        </div>
                      </div>
                      <div className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                        Fine Dining
                      </div>
                    </div>
                  </div>
                </div>

                {/* Restaurant Details */}
                <div className="p-6">
                  <p className="mb-6 text-gray-600 dark:text-gray-300">
                    {restaurantInfo.description}
                  </p>

                  <div className="mb-6 space-y-4">
                    <div className="flex items-start">
                      <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500 dark:text-amber-400" />
                      <span className="ml-3 text-gray-600 dark:text-gray-300">
                        {restaurantInfo.address}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500 dark:text-amber-400" />
                      <span className="ml-3 text-gray-600 dark:text-gray-300">
                        {restaurantInfo.hours}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <Utensils className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500 dark:text-amber-400" />
                      <div className="ml-3">
                        <div className="text-gray-600 dark:text-gray-300">
                          Cuisine
                        </div>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {["Contemporary", "French", "Italian", "Fusion"].map(
                            (cuisine, index) => (
                              <span
                                key={index}
                                className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              >
                                {cuisine}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <button className="inline-flex transform items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg">
                      Reserve a Table
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                    <button className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                      View Full Menu
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Menu Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-8">
              <div className="mb-4 inline-flex items-center justify-center">
                <span className="h-1 w-12 rounded-full bg-amber-500"></span>
                <span className="mx-2 font-medium text-amber-500">
                  OUR MENU
                </span>
                <span className="h-1 w-12 rounded-full bg-amber-500"></span>
              </div>

              <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                Explore our
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  {" "}
                  seasonal offerings
                </span>
              </h2>

              <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                Our menu changes with the seasons to bring you the freshest
                ingredients at their peak. Here&apos;s a selection of our
                current favorites.
              </p>
            </div>

            {/* Menu Categories */}
            <div className="mb-8 flex space-x-4 overflow-x-auto pb-4">
              {menuCategories.map((category, index) => (
                <button
                  key={index}
                  className={`flex items-center whitespace-nowrap rounded-xl px-6 py-3 transition-all ${
                    activeMenu === index
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => setActiveMenu(index)}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {menuItems[activeMenu].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="group relative"
                  >
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative overflow-hidden rounded-2xl border border-gray-200/50 bg-white p-6 shadow-lg dark:border-gray-700/50 dark:bg-gray-800">
                      <div className="flex flex-col gap-6 md:flex-row">
                        <div className="relative aspect-square w-full flex-shrink-0 overflow-hidden rounded-xl bg-amber-100 dark:bg-amber-900/30 md:w-1/3">
                          <Image
                            src={
                              item.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                            }
                            alt={item.name}
                            fill
                            className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        <div className="flex-1">
                          <div className="mb-2 flex items-start justify-between">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {item.name}
                            </h3>
                            <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                              {item.price}
                            </span>
                          </div>

                          <p className="mb-4 text-gray-600 dark:text-gray-300">
                            {item.description}
                          </p>

                          <div className="mb-4 flex flex-wrap gap-2">
                            {item.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                              <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
                                {item.rating}
                              </span>
                            </div>

                            <button className="inline-flex transform items-center rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:from-amber-600 hover:to-orange-600">
                              Order Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          height: 0.5rem;
          width: 0.5rem;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: #6b7280;
        }
      `}</style>
    </section>
  );
};

export default RestaurantShowcaseSection;
