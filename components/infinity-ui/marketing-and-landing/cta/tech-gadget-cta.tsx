"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Battery,
  Bluetooth,
  Check,
  ChevronRight,
  Cpu,
  Maximize2,
  Play,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const TechGadgetCta = () => {
  const controls = useAnimation();
  const [activeFeature, setActiveFeature] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Product colors
  const colors = [
    { name: "Cosmic Black", hex: "#1a1a1a" },
    { name: "Arctic Silver", hex: "#e0e0e0" },
    { name: "Nebula Blue", hex: "#0077b6" },
  ];

  // Product features
  const features = [
    {
      title: "Next-Gen Processor",
      description:
        "Powered by the latest A16 chip for lightning-fast performance",
      icon: Cpu,
    },
    {
      title: "All-Day Battery",
      description:
        "Up to 24 hours of battery life with fast charging capability",
      icon: Battery,
    },
    {
      title: "Seamless Connectivity",
      description:
        "Wi-Fi 6E and Bluetooth 5.2 for reliable, high-speed connections",
      icon: Wifi,
    },
    {
      title: "Immersive Display",
      description:
        "6.7-inch Super Retina XDR display with ProMotion technology",
      icon: Maximize2,
    },
  ];

  useEffect(() => {
    controls.start("visible");

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [controls, features.length]);

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
    <div className="w-full bg-gradient-to-b from-gray-900 to-black py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-gray-800 shadow-2xl"
        >
          <div className="grid md:grid-cols-2">
            {/* Left Content - Product Showcase */}
            <div className="relative flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-8 md:p-12">
              {/* Background grid pattern */}
              <div className="absolute inset-0 opacity-[0.03]">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Accent lights */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1.5 }}
                className="absolute -left-20 top-20 h-[200px] w-[200px] rounded-full bg-blue-500/20 blur-[100px]"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="absolute -bottom-20 right-20 h-[200px] w-[200px] rounded-full bg-purple-500/20 blur-[100px]"
              />

              {/* Product image */}
              <motion.div
                variants={itemVariants}
                className="relative h-[400px] w-[300px]"
                animate={{
                  rotateY: isHovering ? [0, 10, -10, 0] : 0,
                  y: isHovering ? [0, -10, 0] : 0,
                }}
                transition={{
                  duration: 5,
                  repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "reverse",
                }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <Image
                  src="/images/phone2.png"
                  alt="Next-Gen Smartphone"
                  fill
                  className="object-contain"
                />

                {/* Feature highlight */}
                {features.map(
                  (feature, index) =>
                    activeFeature === index && (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute"
                        style={{
                          left:
                            index === 0
                              ? "20%"
                              : index === 1
                                ? "70%"
                                : index === 2
                                  ? "30%"
                                  : "60%",
                          top:
                            index === 0
                              ? "30%"
                              : index === 1
                                ? "70%"
                                : index === 2
                                  ? "60%"
                                  : "20%",
                        }}
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                          <feature.icon className="h-4 w-4" />
                        </div>
                        <motion.div
                          className="absolute inset-0 rounded-full border border-blue-400"
                          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1.5,
                          }}
                        />
                      </motion.div>
                    ),
                )}
              </motion.div>

              {/* Pre-order badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -right-5 top-8 z-10 rounded-full bg-blue-500 px-4 py-4 text-center text-white shadow-lg"
              >
                <div className="text-sm font-semibold">PRE-ORDER</div>
                <div className="text-xs">SAVE 15%</div>
              </motion.div>
            </div>

            {/* Right Content - Product Info */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <motion.div
                variants={itemVariants}
                className="mb-2 inline-block w-fit rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-400"
              >
                NEW RELEASE
              </motion.div>

              <motion.h2
                variants={itemVariants}
                className="mb-4 text-3xl font-bold text-white"
              >
                UltraPhone X1 Pro
              </motion.h2>

              <motion.p variants={itemVariants} className="mb-6 text-gray-300">
                Experience the future of mobile technology with our most
                advanced smartphone yet. Featuring cutting-edge performance,
                stunning display, and all-day battery life.
              </motion.p>

              {/* Price */}
              <motion.div
                variants={itemVariants}
                className="mb-6 flex items-center gap-3"
              >
                <span className="text-3xl font-bold text-white">$999</span>
                <span className="text-lg text-gray-400 line-through">
                  $1,199
                </span>
                <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-semibold text-blue-400">
                  Pre-order Discount
                </span>
              </motion.div>

              {/* Feature tabs */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="mb-4 flex space-x-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`h-2 rounded-full transition-all ${
                        activeFeature === index
                          ? "w-8 bg-blue-500"
                          : "w-2 bg-gray-600"
                      }`}
                      aria-label={`View feature ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="relative h-[100px] rounded-xl border border-gray-700 bg-gray-800/50 p-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{
                        opacity: activeFeature === index ? 1 : 0,
                        x: activeFeature === index ? 0 : 20,
                      }}
                      transition={{ duration: 0.5 }}
                      className={`absolute inset-0 p-4 ${activeFeature === index ? "pointer-events-auto" : "pointer-events-none"}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                          <feature.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="mb-1 font-medium text-white">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Color selection */}
              <motion.div variants={itemVariants} className="mb-6">
                <div className="mb-2 text-sm font-medium text-gray-300">
                  Select Color
                </div>
                <div className="flex gap-3">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveColor(index)}
                      className={`relative h-8 w-8 rounded-full transition-all ${
                        activeColor === index
                          ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-800"
                          : ""
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={color.name}
                    >
                      {activeColor === index && (
                        <motion.div
                          layoutId="colorIndicator"
                          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white"
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
                <div className="mt-2 text-xs text-gray-400">
                  Selected: {colors[activeColor].name}
                </div>
              </motion.div>

              {/* Tech specs */}
              <motion.div
                variants={itemVariants}
                className="mb-6 rounded-xl border border-gray-700 bg-gray-800/50 p-4"
              >
                <div className="mb-2 text-sm font-medium text-white">
                  Key Specifications
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Cpu className="h-4 w-4 text-blue-400" />
                    <span>A16 Bionic Chip</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Maximize2 className="h-4 w-4 text-blue-400" />
                    <span>6.7&quot; Super Retina XDR</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg
                      className="h-4 w-4 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>48MP Triple Camera</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Battery className="h-4 w-4 text-blue-400" />
                    <span>24-hour Battery Life</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Wifi className="h-4 w-4 text-blue-400" />
                    <span>Wi-Fi 6E & 5G</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Bluetooth className="h-4 w-4 text-blue-400" />
                    <span>Bluetooth 5.2</span>
                  </div>
                </div>
              </motion.div>

              {/* Launch date */}
              <motion.div
                variants={itemVariants}
                className="mb-6 flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-800/50 p-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-white">
                    Official Launch Date
                  </div>
                  <div className="text-sm text-gray-400">
                    September 15, 2023 - Pre-order now to be first in line
                  </div>
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
                  className="group flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
                >
                  Pre-order Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                  className="flex items-center gap-3 rounded-lg border border-gray-600 bg-gray-700 px-6 py-3 font-medium text-white transition-all hover:bg-gray-600"
                >
                  <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white">
                    <Play className="h-3 w-3 fill-white" />

                    {/* Ripple Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-blue-400"
                      animate={
                        isHovering
                          ? {
                              scale: [1, 1.5],
                              opacity: [1, 0],
                            }
                          : {}
                      }
                      transition={{
                        repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
                        duration: 1.5,
                      }}
                    />
                  </div>
                  Watch Product Video
                </motion.button>
              </motion.div>

              {/* Additional info */}
              <motion.div
                variants={itemVariants}
                className="mt-6 flex items-center gap-2 text-sm text-gray-400"
              >
                <Check className="h-4 w-4 text-blue-400" />
                <span>Free shipping & 30-day returns</span>
              </motion.div>
            </div>
          </div>

          {/* Bottom section - Additional features */}
          <div className="border-t border-gray-700 bg-gray-800/50 p-6">
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Trade-in Program",
                  description:
                    "Get up to $400 off when you trade in your old device",
                  icon: (
                    <svg
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Extended Warranty",
                  description:
                    "Add AppleCare+ for 2 years of accidental damage protection",
                  icon: (
                    <svg
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  ),
                },
                {
                  title: "Financing Available",
                  description: "Pay as low as $41.62/mo for 24 months, 0% APR",
                  icon: (
                    <svg
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-700 text-blue-400">
                    {feature.icon}
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {feature.title}
                    </div>
                    <div className="text-sm text-gray-400">
                      {feature.description}
                    </div>
                    <button className="mt-2 flex items-center gap-1 text-sm font-medium text-blue-400 hover:text-blue-300">
                      Learn more
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TechGadgetCta;
