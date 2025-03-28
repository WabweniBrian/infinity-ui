"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Mic,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type AudioTestimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  audioUrl: string; // In a real implementation, this would be a real audio URL
  duration: string;
  color: string;
};

const testimonials: AudioTestimonial[] = [
  {
    id: 1,
    name: "Michael Johnson",
    role: "CTO",
    company: "TechVision Inc.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The development team&pos;s technical expertise is outstanding. They transformed our legacy system into a modern, scalable platform that&pos;s positioned us for future growth.",
    audioUrl: "#audio-1", // Placeholder
    duration: "1:45",
    color: "blue",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Marketing Director",
    company: "Global Brands",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The digital marketing strategy they developed increased our conversion rates by 150% and reduced our customer acquisition cost by 40%. Truly exceptional results.",
    audioUrl: "#audio-2", // Placeholder
    duration: "2:10",
    color: "purple",
  },
  {
    id: 3,
    name: "David Chen",
    role: "CEO",
    company: "Startup Accelerate",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "As a startup, we needed a partner who could move quickly without sacrificing quality. They delivered our MVP in record time, helping us secure our next round of funding.",
    audioUrl: "#audio-3", // Placeholder
    duration: "1:30",
    color: "teal",
  },
];

const AudioWaveformTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const currentTestimonial = testimonials[activeIndex];

  // Handle audio controls
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Reset audio state when changing testimonials
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, [activeIndex]);

  // Draw waveform visualization
  const drawWaveform = useCallback(
    () =>
      (
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number,
        progress: number,
      ) => {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Generate random waveform data (in a real implementation, this would be actual audio data)
        const bars = 100;
        const barWidth = width / bars;
        const progressPosition = (progress / 100) * width;

        for (let i = 0; i < bars; i++) {
          // Random bar height with higher values in the middle for a natural look
          const barHeight =
            Math.sin((i / bars) * Math.PI) *
            (Math.random() * 0.5 + 0.5) *
            height *
            0.8;

          const x = i * barWidth;
          const y = (height - barHeight) / 2;

          // Color based on progress
          if (x < progressPosition) {
            ctx.fillStyle = getWaveformColor(currentTestimonial.color, 1);
          } else {
            ctx.fillStyle = getWaveformColor(currentTestimonial.color, 0.3);
          }

          // Draw bar with rounded corners
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth * 0.8, barHeight, 2);
          ctx.fill();
        }
      },
    [currentTestimonial.color],
  );

  // Update progress bar and animate waveform
  useEffect(() => {
    if (!audioRef.current || !canvasRef.current || !isPlaying) return;

    const audio = audioRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;

    // Update progress
    const updateProgress = () => {
      if (!audio) return;

      const currentProgress = (audio.currentTime / audio.duration) * 100 || 0;
      setProgress(currentProgress);

      // Draw waveform
      drawWaveform();

      animationRef.current = requestAnimationFrame(updateProgress);
    };

    animationRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [drawWaveform, isPlaying]);

  const getWaveformColor = (color: string, opacity: number) => {
    switch (color) {
      case "blue":
        return `rgba(59, 130, 246, ${opacity})`;
      case "purple":
        return `rgba(139, 92, 246, ${opacity})`;
      case "teal":
        return `rgba(20, 184, 166, ${opacity})`;
      default:
        return `rgba(59, 130, 246, ${opacity})`;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-100 to-white py-24 text-gray-900 dark:from-gray-900 dark:to-gray-800 dark:text-white"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.05] dark:opacity-[0.03]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-200/40 to-purple-200/40 blur-3xl dark:from-blue-900/20 dark:to-purple-900/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-teal-200/40 to-blue-200/40 blur-3xl dark:from-teal-900/20 dark:to-blue-900/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Sound wave circles */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-gray-300 dark:border-gray-700"
                style={{
                  width: `${(i + 1) * 200}px`,
                  height: `${(i + 1) * 200}px`,
                  top: `${-(i + 1) * 100}px`,
                  left: `${-(i + 1) * 100}px`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative mx-auto mb-6 h-20 w-20"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
              <Mic className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Audio Testimonials
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Listen to what our clients have to say about their experience
          </p>
        </motion.div>

        {/* Audio testimonial player */}
        <div className="mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/50 dark:shadow-none">
            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-8 md:flex-row"
                >
                  {/* Author info */}
                  <div className="flex-shrink-0">
                    <div className="relative mx-auto h-24 w-24 md:mx-0 md:h-32 md:w-32">
                      <div
                        className={`absolute -inset-1 rounded-full bg-gradient-to-br ${
                          currentTestimonial.color === "blue"
                            ? "from-blue-500 to-blue-600"
                            : currentTestimonial.color === "purple"
                              ? "from-purple-500 to-purple-600"
                              : "from-teal-500 to-teal-600"
                        } opacity-70 blur-sm`}
                      />
                      <div className="relative overflow-hidden rounded-full border-2 border-gray-200 dark:border-gray-700">
                        <Image
                          src={
                            currentTestimonial.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                          }
                          alt={currentTestimonial.name}
                          width={128}
                          height={128}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {currentTestimonial.role}, {currentTestimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Audio content */}
                  <div className="flex-grow">
                    <blockquote className="mb-6">
                      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                        &quot;{currentTestimonial.content}&quot;
                      </p>
                    </blockquote>

                    {/* Audio player */}
                    <div className="rounded-xl border border-gray-200 bg-gray-100 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                      {/* Waveform visualization */}
                      <div className="relative mb-4 h-16">
                        <canvas
                          ref={canvasRef}
                          className="absolute inset-0 h-full w-full"
                        />

                        {/* Progress overlay */}
                        <div
                          className="absolute bottom-0 left-0 top-0 bg-gradient-to-r from-transparent to-gray-100/20 dark:to-gray-900/20"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={togglePlay}
                            className={`rounded-full p-3 ${
                              isPlaying
                                ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                                : `bg-gradient-to-r ${
                                    currentTestimonial.color === "blue"
                                      ? "from-blue-600 to-blue-500"
                                      : currentTestimonial.color === "purple"
                                        ? "from-purple-600 to-purple-500"
                                        : "from-teal-600 to-teal-500"
                                  } hover:opacity-90`
                            } transition-colors`}
                            aria-label={
                              isPlaying ? "Pause audio" : "Play audio"
                            }
                          >
                            {isPlaying ? (
                              <Pause className="h-5 w-5 text-gray-700 dark:text-white" />
                            ) : (
                              <Play className="h-5 w-5 text-white" />
                            )}
                          </button>

                          <button
                            onClick={toggleMute}
                            className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                          >
                            {isMuted ? (
                              <VolumeX className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            ) : (
                              <Volume2 className="h-4 w-4 text-gray-700 dark:text-white" />
                            )}
                          </button>

                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {currentTestimonial.duration}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={handlePrev}
                            className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                            aria-label="Previous testimonial"
                          >
                            <ChevronLeft className="h-4 w-4 text-gray-700 dark:text-white" />
                          </button>

                          <button
                            onClick={handleNext}
                            className="rounded-full bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                            aria-label="Next testimonial"
                          >
                            <ChevronRight className="h-4 w-4 text-gray-700 dark:text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            className="hidden"
            src={currentTestimonial.audioUrl}
            preload="auto"
            muted={isMuted}
          />
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? `bg-${currentTestimonial.color}-500 scale-125`
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudioWaveformTestimonials;
