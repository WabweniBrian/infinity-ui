"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Image from "next/image";

type VideoTestimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  thumbnail: string;
  videoUrl: string; // In a real implementation, this would be a real video URL
  quote: string;
  color: string;
};

const testimonials: VideoTestimonial[] = [
  {
    id: 1,
    name: "Jennifer Adams",
    role: "Chief Marketing Officer",
    company: "Nexus Innovations",
    thumbnail:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    videoUrl: "#video-1", // Placeholder
    quote:
      "The digital transformation strategy they implemented helped us achieve a 200% increase in online engagement.",
    color: "blue",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Founder",
    company: "EcoTech Solutions",
    thumbnail:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    videoUrl: "#video-2", // Placeholder
    quote:
      "Their team's expertise in sustainable technology solutions was exactly what we needed to bring our vision to life.",
    color: "green",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Head of Product",
    company: "FinanceFlow",
    thumbnail:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    videoUrl: "#video-3", // Placeholder
    quote:
      "The user-centered approach to redesigning our app resulted in a 45% increase in user retention.",
    color: "purple",
  },
  {
    id: 4,
    name: "Thomas Wilson",
    role: "E-commerce Director",
    company: "Global Retail Group",
    thumbnail:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    videoUrl: "#video-4", // Placeholder
    quote:
      "Our conversion rate increased by 80% within three months of implementing their optimized checkout process.",
    color: "amber",
  },
  {
    id: 5,
    name: "Sophia Chen",
    role: "CEO",
    company: "MediTech Innovations",
    thumbnail:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    videoUrl: "#video-5", // Placeholder
    quote:
      "Their healthcare software solution has streamlined our operations and improved patient care significantly.",
    color: "teal",
  },
];

const VideoBubbleTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Handle video controls
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Reset video state when changing testimonials
  useEffect(() => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-24"
    >
      {/* Floating bubbles background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Generate random bubbles */}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 100 + 50;
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const delay = Math.random() * 5;
          const duration = Math.random() * 15 + 15;
          const color =
            i % 5 === 0
              ? "bg-blue-500/10"
              : i % 5 === 1
                ? "bg-purple-500/10"
                : i % 5 === 2
                  ? "bg-green-500/10"
                  : i % 5 === 3
                    ? "bg-amber-500/10"
                    : "bg-teal-500/10";

          return (
            <motion.div
              key={i}
              className={`absolute rounded-full ${color}`}
              style={{
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? {
                      opacity: 0.8,
                      scale: 1,
                      y: [0, -100],
                      x: [0, Math.random() * 50 - 25],
                    }
                  : { opacity: 0, scale: 0 }
              }
              transition={{
                duration,
                delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          );
        })}
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Hear From Our Clients
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Real stories from real clients about their experience working with
            us
          </p>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-2">
          {/* Video player */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <div className="aspect-w-16 aspect-h-9 group relative bg-gray-900">
              {/* Video element (using image as placeholder) */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentTestimonial.thumbnail || "/placeholder.svg"}
                    alt={`${currentTestimonial.name} video thumbnail`}
                    fill
                    className="h-full w-full object-cover"
                  />

                  {/* Actual video would be here */}
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover opacity-0"
                    poster={currentTestimonial.thumbnail}
                    muted={isMuted}
                  >
                    <source
                      src={currentTestimonial.videoUrl}
                      type="video/mp4"
                    />
                  </video>
                </motion.div>
              </AnimatePresence>

              {/* Play/pause overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="transform rounded-full bg-white/20 p-4 backdrop-blur-sm transition-colors duration-300 hover:bg-white/30 group-hover:scale-110"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-white" />
                  ) : (
                    <Play className="h-8 w-8 text-white" />
                  )}
                </button>
              </div>

              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="rounded-full bg-white/20 p-1.5 transition-colors hover:bg-white/30"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 text-white" />
                      ) : (
                        <Play className="h-4 w-4 text-white" />
                      )}
                    </button>

                    <button
                      onClick={toggleMute}
                      className="rounded-full bg-white/20 p-1.5 transition-colors hover:bg-white/30"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4 text-white" />
                      ) : (
                        <Volume2 className="h-4 w-4 text-white" />
                      )}
                    </button>
                  </div>

                  <div className="text-sm font-medium text-white">
                    {currentTestimonial.name}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className={`mb-6 h-1 w-16 ${
                    currentTestimonial.color === "blue"
                      ? "bg-blue-500"
                      : currentTestimonial.color === "green"
                        ? "bg-green-500"
                        : currentTestimonial.color === "purple"
                          ? "bg-purple-500"
                          : currentTestimonial.color === "amber"
                            ? "bg-amber-500"
                            : "bg-teal-500"
                  }`}
                />

                <blockquote className="mb-8">
                  <p className="text-2xl font-medium leading-relaxed text-gray-900 md:text-3xl">
                    &quot;{currentTestimonial.quote}&quot;
                  </p>
                </blockquote>

                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900">
                    {currentTestimonial.name}
                  </h3>
                  <p className="text-gray-600">
                    {currentTestimonial.role}, {currentTestimonial.company}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={handlePrev}
                    className="rounded-full border border-gray-300 p-2 transition-colors hover:bg-gray-100"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>

                  <button
                    onClick={handleNext}
                    className={`rounded-full p-2 text-white ${
                      currentTestimonial.color === "blue"
                        ? "bg-blue-500 hover:bg-blue-600"
                        : currentTestimonial.color === "green"
                          ? "bg-green-500 hover:bg-green-600"
                          : currentTestimonial.color === "purple"
                            ? "bg-purple-500 hover:bg-purple-600"
                            : currentTestimonial.color === "amber"
                              ? "bg-amber-500 hover:bg-amber-600"
                              : "bg-teal-500 hover:bg-teal-600"
                    } transition-colors`}
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoBubbleTestimonials;
