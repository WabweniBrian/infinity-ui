"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Clock, ShoppingCart, Star, Truck } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const LimitedTimeSaleCta = () => {
  const controls = useAnimation();
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 59,
    seconds: 59,
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({
          ...timeLeft,
          minutes: timeLeft.minutes - 1,
          seconds: 59,
        });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({
          ...timeLeft,
          hours: timeLeft.hours - 1,
          minutes: 59,
          seconds: 59,
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <div className="w-full bg-gradient-to-b from-red-50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content - Product Image */}
            <div className="relative bg-gradient-to-br from-red-600 to-red-700 p-8 text-white md:p-0">
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
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
                        style={{ stroke: "white", strokeWidth: 1 }}
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
                </svg>
              </div>

              {/* Sale badge */}
              <motion.div
                initial={{ rotate: -15, scale: 0.9 }}
                animate={{ rotate: [-15, 0, -15], scale: [0.9, 1.1, 0.9] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
                className="absolute right-8 top-8 z-10 rounded-full bg-yellow-400 px-4 py-4 text-center text-red-800 shadow-lg md:right-10 md:top-10"
              >
                <div className="text-sm font-bold">SAVE</div>
                <div className="text-2xl font-bold">50%</div>
              </motion.div>

              {/* Product image */}
              <div className="flex h-full items-center justify-center">
                <motion.div
                  variants={itemVariants}
                  className="relative h-[250px] w-[250px] md:h-[300px] md:w-[300px]"
                >
                  <Image
                    src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoUN8phfoA947ETyM0KGYhZL6VrnjqdJgelUkc"
                    alt="Product"
                    fill
                    className="object-contain"
                  />
                </motion.div>
              </div>
            </div>

            {/* Right Content - Sale Info */}
            <div className="p-8 md:p-10">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
              >
                <Clock className="h-3 w-3" />
                FLASH SALE
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl"
              >
                Premium Wireless Headphones
              </motion.h2>

              {/* Ratings */}
              <motion.div
                variants={itemVariants}
                className="mb-4 flex items-center gap-1"
              >
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="ml-1 text-sm text-gray-600">
                  4.9 (2,354 reviews)
                </span>
              </motion.div>

              <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                Experience crystal-clear sound with our most comfortable design
                yet. Perfect for work, travel, or immersing yourself in music.
              </motion.p>

              {/* Price */}
              <motion.div
                variants={itemVariants}
                className="mb-6 flex items-end gap-3"
              >
                <span className="text-3xl font-bold text-red-600">$99.99</span>
                <span className="text-xl text-gray-500 line-through">
                  $199.99
                </span>
                <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                  50% OFF
                </span>
              </motion.div>

              {/* Countdown timer */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Clock className="h-4 w-4 text-red-600" />
                  <span>Offer ends in:</span>
                </div>
                <div className="flex gap-3">
                  {[
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Minutes" },
                    { value: timeLeft.seconds, label: "Seconds" },
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-900 text-xl font-bold text-white">
                        {item.value.toString().padStart(2, "0")}
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Features */}
              <motion.div variants={itemVariants} className="mb-6 space-y-2">
                {[
                  "Active Noise Cancellation",
                  "40-hour Battery Life",
                  "Premium Sound Quality",
                  "Comfortable Design",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </motion.div>

              {/* Shipping info */}
              <motion.div
                variants={itemVariants}
                className="mb-6 flex items-center gap-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-600"
              >
                <Truck className="h-5 w-5 text-gray-400" />
                <span>Free shipping • 2-day delivery • 30-day returns</span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-all hover:bg-red-700"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50"
                >
                  Buy Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </motion.div>

              {/* Stock status */}
              <motion.div
                variants={itemVariants}
                className="mt-4 flex items-center gap-2 text-sm text-gray-600"
              >
                <div className="h-2 w-2 rounded-full bg-red-500"></div>
                <span>Only 12 items left in stock - order soon!</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LimitedTimeSaleCta;
