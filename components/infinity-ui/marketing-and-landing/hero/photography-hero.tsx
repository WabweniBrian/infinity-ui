"use client";

import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Camera,
  Download,
  Eye,
  Heart,
  Instagram,
  MessageCircle,
  Share2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const PhotographyHero = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const [activeImage, setActiveImage] = useState(0);

  // Transform values for parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);

  // Portfolio images
  const portfolioImages = [
    {
      src: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoo4xw9GVLSQVjXshg7KPt3AIzyxE815TGrRlo",
      alt: "Portrait Photography",
      category: "Portrait",
      likes: 243,
      comments: 18,
    },
    {
      src: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoHPRN5I4LPQRizs519hDeHlYBAUcyNFxWk2M6",
      alt: "Landscape Photography",
      category: "Landscape",
      likes: 187,
      comments: 12,
    },
    {
      src: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypohVopYgAGWuifCYvhNSK74eVO9blJ8s135Irj",
      alt: "Street Photography",
      category: "Street",
      likes: 156,
      comments: 9,
    },
    {
      src: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo4prS1RdV8HBnj2sim5N7M41k9TADhtKvdpry",
      alt: "Wildlife Photography",
      category: "Wildlife",
      likes: 298,
      comments: 24,
    },
  ];

  // Start animations when component mounts
  useEffect(() => {
    controls.start("visible");

    // Auto-rotate images
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % portfolioImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [controls, portfolioImages.length]);

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
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden bg-black pb-20 md:h-[140vh] md:pb-0"
    >
      {/* Fixed content that stays in view while scrolling */}
      <div className="h-full w-full md:sticky md:top-0 md:h-screen">
        {/* Background with parallax effect */}
        <motion.div
          className="absolute inset-0 h-screen w-full"
          style={{ opacity, y: y1 }}
        >
          <Image
            src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypox4vINEPtFC1a2S06AJNu9MsdPXG8D5oerTbl"
            alt="Photography background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        {/* Content container */}
        <div className="relative z-10 mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid h-full items-center gap-8 pt-16 lg:grid-cols-2">
            {/* Left Content */}
            <motion.div style={{ y: y2 }} className="text-white">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={controls}
              >
                <motion.div
                  variants={itemVariants}
                  className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md"
                >
                  <span className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-500"></span>
                  Capturing Moments, Creating Art
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
                >
                  Through the{" "}
                  <span className="relative text-rose-400">
                    lens
                    <motion.div
                      className="absolute -bottom-2 left-0 h-2 w-full bg-rose-500/30"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.6 }}
                    />
                  </span>{" "}
                  of creativity
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mb-8 max-w-lg text-lg text-gray-300"
                >
                  Professional photography services that tell your story through
                  stunning visuals. From portraits to landscapes, we capture the
                  essence of every moment.
                </motion.p>

                {/* Photography categories */}
                <motion.div variants={itemVariants} className="mb-8">
                  <div className="flex flex-wrap gap-3">
                    {[
                      "Portrait",
                      "Landscape",
                      "Street",
                      "Wildlife",
                      "Wedding",
                    ].map((category, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ y: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition-all ${
                          activeImage === index
                            ? "bg-rose-500 text-white"
                            : "bg-white/5 text-white hover:bg-white/10"
                        }`}
                        onClick={() =>
                          setActiveImage(index % portfolioImages.length)
                        }
                      >
                        {category}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 font-medium text-white transition-all hover:bg-rose-600"
                  >
                    View Portfolio
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
                  >
                    <Camera className="h-4 w-4" />
                    Book a Session
                  </motion.button>
                </motion.div>

                {/* Social proof */}
                <motion.div
                  variants={itemVariants}
                  className="mt-8 flex flex-wrap items-center gap-8"
                >
                  <div className="flex items-center gap-6">
                    {[Instagram, Camera, Download].map((Icon, i) => (
                      <motion.a
                        key={i}
                        href="#"
                        whileHover={{ y: -5, scale: 1.2 }}
                        className="text-white/70 transition-colors hover:text-rose-400"
                      >
                        <Icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </div>

                  <div className="h-8 w-[1px] bg-white/20" />

                  <div className="text-sm">
                    <span className="font-semibold text-white">10+ years</span>
                    <span className="text-gray-400">
                      {" "}
                      of professional experience
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Content - Photo Gallery */}
            <div className="relative h-[500px]">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="relative h-full"
              >
                {/* Main image display */}
                <div className="relative h-full">
                  {portfolioImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
                      animate={{
                        opacity: activeImage === index ? 1 : 0,
                        scale: activeImage === index ? 1 : 0.9,
                        rotateY: activeImage === index ? 0 : 10,
                        zIndex: activeImage === index ? 30 : 10,
                      }}
                      transition={{
                        duration: 0.7,
                        type: "spring",
                        stiffness: 100,
                      }}
                      className={`absolute inset-0 ${
                        activeImage === index
                          ? "pointer-events-auto"
                          : "pointer-events-none"
                      }`}
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: "1000px",
                      }}
                    >
                      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
                        <Image
                          src={image.src || "/default-image.jpg"}
                          alt={image.alt}
                          fill
                          className="object-cover transition-all duration-700 hover:scale-105"
                        />

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Image info */}
                        <div className="absolute bottom-0 left-0 w-full p-6">
                          <div className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                            {image.category}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-white">
                                <Heart className="h-4 w-4 text-rose-500" />
                                <span className="text-xs">{image.likes}</span>
                              </button>
                              <button className="flex items-center gap-1 text-white">
                                <MessageCircle className="h-4 w-4 text-white/70" />
                                <span className="text-xs">
                                  {image.comments}
                                </span>
                              </button>
                            </div>

                            <button className="rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20">
                              <Share2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Image navigation dots */}
                <div className="absolute -bottom-12 left-1/2 flex -translate-x-1/2 gap-2">
                  {portfolioImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`h-2 rounded-full transition-all ${
                        activeImage === index
                          ? "w-8 bg-rose-500"
                          : "w-2 bg-white/30"
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Floating elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, type: "spring" }}
                  className="absolute -left-16 top-10 z-30 rounded-lg bg-white/10 p-3 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/30 text-rose-400">
                      <Camera className="h-4 w-4" />
                    </div>
                    <div className="text-xs text-white">
                      <div className="font-medium">Shot on</div>
                      <div className="text-white/70">Sony Alpha A7 IV</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, type: "spring" }}
                  className="absolute -bottom-8 -right-10 z-30 rounded-lg bg-white/10 p-3 backdrop-blur-md"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/30 text-blue-400">
                      <Eye className="h-4 w-4" />
                    </div>
                    <div className="text-xs text-white">
                      <div className="font-medium">Featured In</div>
                      <div className="text-white/70">National Geographic</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center text-sm text-white/50"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              <div>Scroll to explore</div>
              <ArrowRight className="mx-auto mt-2 h-4 w-4 rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PhotographyHero;
