"use client";

import { Button } from "@/components/ui/button";
import AnimatedLogos from "./animated-logos";
import Spotlight from "./spotlight";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-gray-900 dark:text-white">
      <AnimatedLogos />
      <Spotlight />

      <div className="relative z-20 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="mb-2 bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-3xl font-bold text-transparent sm:text-5xl lg:text-7xl">
            Build Faster, Scale Smarter
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        ></motion.div>
        <motion.p
          className="mx-auto mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:mt-5 sm:text-xl lg:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Launch your next SaaS, eCommerce store, or web project with ease.
          Access powerful UI components and ready-to-use blocks built for speed,
          efficiency, and scalability — designed with React, Next.js, Tailwind
          CSS, and shadcn/ui.
        </motion.p>
        <motion.div
          className="mt-8 flex justify-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button size="lg" className="rounded-full py-8 text-lg">
            <Link href="/search?q=">Explore Components</Link>
          </Button>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-4 left-4 right-4 text-center text-sm text-gray-500 dark:text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Built with React, Next.js, Tailwind CSS, shadcn/ui, and TypeScript
      </motion.div>
    </div>
  );
};

export default Hero;
