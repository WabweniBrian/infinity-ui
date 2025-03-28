"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Shield, Zap, Smartphone, Globe, Layers, Lock } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Feature = {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  image: string;
};

const features: Feature[] = [
  {
    id: 1,
    title: "Mobile Optimization",
    description:
      "Fully responsive design that works seamlessly across all devices and screen sizes.",
    icon: Smartphone,
    color: "bg-blue-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=600&width=600",
  },
  {
    id: 2,
    title: "Global CDN",
    description:
      "Lightning-fast content delivery with our global CDN network for optimal performance.",
    icon: Globe,
    color: "bg-purple-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=600&width=600",
  },
  {
    id: 3,
    title: "Modular Architecture",
    description:
      "Flexible, modular architecture that scales with your business needs and growth.",
    icon: Layers,
    color: "bg-emerald-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=600&width=600",
  },
  {
    id: 4,
    title: "Enterprise Security",
    description:
      "Bank-grade security with end-to-end encryption and compliance certifications.",
    icon: Lock,
    color: "bg-amber-500",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=600&width=600",
  },
];

const SplitLayoutFeatures = () => {
  const [activeFeature, setActiveFeature] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-white py-24 dark:bg-gray-900"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,theme(colors.gray.100),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,theme(colors.gray.800/30%),transparent_70%)]"></div>

        {/* Decorative shapes */}
        <svg
          className="absolute left-0 top-0 h-full w-full opacity-20 dark:opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#9333EA" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grad1)" />
          <path
            d="M0,50 Q25,30 50,50 T100,50 L100,100 L0,100 Z"
            fill="url(#grad1)"
          />
        </svg>
      </div>

      <div className="container relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="mb-2 inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
              Core Technology
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              Built for the modern web
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Our platform is built with the latest technologies to ensure
              performance, security, and scalability.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          {/* Left side: Feature list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  className={`group cursor-pointer rounded-xl p-6 transition-all duration-300 ${
                    activeFeature === feature.id
                      ? "bg-white shadow-xl dark:bg-gray-800"
                      : "hover:bg-white/50 hover:shadow-lg dark:hover:bg-gray-800/50"
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex gap-4">
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${feature.color} text-white shadow-lg`}
                    >
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side: Feature visualization */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[500px] w-full max-w-lg">
              {/* Device frame */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gray-800 p-2 shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gray-200">
                  {/* Notch */}
                  <div className="absolute left-1/2 top-0 z-10 h-6 w-32 -translate-x-1/2 rounded-b-xl bg-gray-800"></div>

                  {/* Screen content */}
                  <div className="h-full w-full overflow-hidden">
                    {features.map((feature) => (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: activeFeature === feature.id ? 1 : 0,
                          transition: { duration: 0.5 },
                        }}
                        className="absolute inset-0 h-full w-full"
                      >
                        <Image
                          src={
                            feature.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={feature.title}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                style={{ y: y1, rotate }}
                className="absolute -right-16 -top-16 h-32 w-32 rounded-xl bg-white p-4 shadow-xl dark:bg-gray-800"
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Zap className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                  <div className="mt-2 text-center text-sm font-medium text-blue-800 dark:text-blue-300">
                    Lightning Fast
                  </div>
                </div>
              </motion.div>

              <motion.div
                style={{ y: y2 }}
                className="absolute -bottom-16 -left-16 h-32 w-32 rounded-xl bg-white p-4 shadow-xl dark:bg-gray-800"
              >
                <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <Shield className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                  <div className="mt-2 text-center text-sm font-medium text-purple-800 dark:text-purple-300">
                    Secure
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-indigo-600/20 transition-colors hover:bg-indigo-700 dark:shadow-indigo-900/20"
          >
            Explore Our Technology
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default SplitLayoutFeatures;
