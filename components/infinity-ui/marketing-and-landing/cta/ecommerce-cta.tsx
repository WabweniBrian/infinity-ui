"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const EcommerceCta = () => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);

  // Product colors
  const colors = [
    { name: "Midnight Black", hex: "#1a1a1a" },
    { name: "Ocean Blue", hex: "#0077b6" },
    { name: "Sage Green", hex: "#74c69d" },
  ];

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
    <div className="w-full bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Product Image Section */}
            <motion.div
              className="relative flex items-center justify-center bg-gray-100 p-8"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {/* Discount badge */}
              <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{
                  rotate: isHovered ? [0, -5, 0] : -10,
                  scale: isHovered ? 1.1 : 0.9,
                }}
                transition={{ duration: 0.5 }}
                className="absolute right-0 top-2 z-10 rounded-full bg-red-500 px-4 py-4 text-center text-white shadow-lg md:-right-5 md:top-8"
              >
                <div className="text-sm font-semibold">SAVE</div>
                <div className="text-2xl font-bold">30%</div>
              </motion.div>

              {/* Product image */}
              <motion.div
                variants={itemVariants}
                className="relative h-[300px] w-[300px]"
                animate={{
                  y: isHovered ? [0, -10, 0] : 0,
                  rotate: isHovered ? [0, -2, 2, 0] : 0,
                }}
                transition={{
                  duration: 3,
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "reverse",
                }}
              >
                <Image
                  src="/images/hp.png"
                  alt="Premium Wireless Headphones"
                  fill
                  className="object-contain"
                />
              </motion.div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-8 left-8 rounded-lg bg-white p-2 shadow-md"
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                  <span className="ml-1 text-xs font-medium text-gray-700">
                    (128 reviews)
                  </span>
                </div>
              </motion.div>
            </motion.div>

            {/* Product Info Section */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <motion.div
                variants={itemVariants}
                className="mb-2 text-sm font-semibold text-indigo-600"
              >
                LIMITED TIME OFFER
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-4 text-3xl font-bold text-gray-900"
              >
                Premium Wireless Headphones
              </motion.h2>

              <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                Experience crystal-clear sound with our most comfortable design
                yet. Perfect for work, travel, or immersing yourself in music.
              </motion.p>

              {/* Price */}
              <motion.div
                variants={itemVariants}
                className="mb-6 flex items-center gap-3"
              >
                <span className="text-3xl font-bold text-gray-900">
                  $129.99
                </span>
                <span className="text-lg text-gray-500 line-through">
                  $189.99
                </span>
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                  Save $60
                </span>
              </motion.div>

              {/* Color selection */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="mb-2 text-sm font-medium text-gray-700">
                  Select Color
                </div>
                <div className="flex gap-3">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`relative h-8 w-8 rounded-full transition-all ${
                        selectedColor === index
                          ? "ring-2 ring-indigo-500 ring-offset-2"
                          : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    >
                      {selectedColor === index && (
                        <motion.div
                          layoutId="colorIndicator"
                          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-white"
                          transition={{ type: "spring", duration: 0.5 }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                          >
                            <path
                              d="M1 4L3 6L7 2"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Selected: {colors[selectedColor].name}
                </div>
              </motion.div>

              {/* Shipping info */}
              <motion.div
                variants={itemVariants}
                className="mb-6 rounded-lg bg-gray-50 p-3 text-sm text-gray-600"
              >
                <div className="flex items-center gap-2">
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
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="mt-1 flex items-center gap-2">
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
                  <span>30-day money-back guarantee</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-700"
                >
                  <ShoppingBag className="h-5 w-5" />
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
                className="mt-4 flex items-center gap-2 text-sm text-gray-500"
              >
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>In stock - ships within 24 hours</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EcommerceCta;
