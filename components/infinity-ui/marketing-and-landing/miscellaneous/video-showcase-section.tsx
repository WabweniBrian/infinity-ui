"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  ChevronRight,
  Quote,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const VideoShowcaseSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const testimonials = [
    {
      quote:
        "Infinity UI transformed our design workflow. The components are beautifully crafted and incredibly flexible.",
      author: "Wabweni Brian",
      position: "Design Director at TechCorp",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoBr65FLq9k2zJh4F5OKicHTlarv3YGQjpDZbw",
      color: "from-violet-500 to-purple-500",
    },
    {
      quote:
        "The attention to detail in these components is remarkable. Our development time has been cut in half.",
      author: "Michael Chen",
      position: "Lead Developer at InnovateLabs",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoNYxkxxevQcXsCAeDKuhTdZ6t5Ln07OGN1iEa",
      color: "from-blue-500 to-indigo-500",
    },
    {
      quote:
        "Implementing Infinity UI was the best decision we made for our product. The user experience is unmatched.",
      author: "Emily Rodriguez",
      position: "Product Manager at NextWave",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoxC0nRZtFC1a2S06AJNu9MsdPXG8D5oerTblR",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-violet-400/30 to-purple-400/30 opacity-50 blur-[120px] dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-400/30 to-indigo-400/30 opacity-50 blur-[100px] dark:opacity-20"></div>

        {/* Animated Patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]">
          <svg width="100%" height="100%">
            <defs>
              <pattern
                id="video-pattern"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x="0"
                  y="0"
                  width="10"
                  height="10"
                  fill="currentColor"
                  opacity="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#video-pattern)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-violet-500"></span>
            <span className="mx-2 font-medium text-violet-500">
              VIDEO SHOWCASE
            </span>
            <span className="h-1 w-12 rounded-full bg-violet-500"></span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            See Infinity UI in
            <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              action
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Watch how our components and templates can transform your digital
            products and enhance user experience.
          </p>
        </motion.div>

        <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:col-span-3"
          >
            <div className="absolute -inset-4 rotate-1 transform rounded-3xl bg-gradient-to-r from-violet-500/20 to-purple-500/20 blur-xl"></div>
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 shadow-2xl">
              <div className="relative aspect-video">
                {/* Video Placeholder - Replace with actual video */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900 to-indigo-900">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-purple-500">
                      <Play className="ml-1 h-10 w-10 text-white" />
                    </div>
                  </div>
                </div>

                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover opacity-0"
                  poster="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoQxzTjtG1kacO0NKLwDbdX3BsVMlQynx9U58R"
                  muted
                  playsInline
                >
                  <source src="/video-placeholder.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-6">
                  <button
                    onClick={togglePlay}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
                  >
                    {isPlaying ? (
                      <Pause className="h-6 w-6 text-white" />
                    ) : (
                      <Play className="ml-0.5 h-6 w-6 text-white" />
                    )}
                  </button>

                  <div className="flex items-center space-x-4">
                    <button
                      onClick={toggleMute}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5 text-white" />
                      ) : (
                        <Volume2 className="h-5 w-5 text-white" />
                      )}
                    </button>

                    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/30">
                      <Maximize className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              <div className="bg-white p-6 dark:bg-gray-800">
                <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  Infinity UI Component Library
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Explore our comprehensive library of beautifully designed,
                  fully responsive UI components that will elevate your next
                  project.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative lg:col-span-2"
          >
            <div className="absolute -inset-4 -rotate-1 transform rounded-3xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
              <div className="p-8">
                <div className="mb-6 flex items-center">
                  <Quote className="h-10 w-10 text-violet-500 dark:text-violet-400" />
                  <h3 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                    What our users say
                  </h3>
                </div>

                <div className="relative h-[300px]">
                  <AnimatePresence mode="wait">
                    {testimonials.map(
                      (testimonial, index) =>
                        activeTestimonial === index && (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0"
                          >
                            <div className="mb-6">
                              <p className="text-xl italic text-gray-600 dark:text-gray-300">
                                &quot;{testimonial.quote}&quot;
                              </p>
                            </div>

                            <div className="flex items-center">
                              <div className="relative mr-4 h-16 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                <Image
                                  src={
                                    testimonial.image ||
                                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp" ||
                                    "/placeholder.svg"
                                  }
                                  alt={testimonial.author}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                  {testimonial.author}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                  {testimonial.position}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ),
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-auto border-t border-gray-200 p-6 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveTestimonial(index)}
                        className={`h-3 w-3 rounded-full transition-colors ${
                          activeTestimonial === index
                            ? "bg-violet-500"
                            : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
                        }`}
                        aria-label={`View testimonial ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setActiveTestimonial(
                        (activeTestimonial + 1) % testimonials.length,
                      )
                    }
                    className="flex items-center font-medium text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
                  >
                    Next
                    <ChevronRight className="ml-1 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Video Features */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: "Responsive Design",
              description:
                "All components are fully responsive and work seamlessly across all devices and screen sizes.",
              icon: "📱",
              color: "from-violet-500 to-purple-500",
            },
            {
              title: "Customizable Themes",
              description:
                "Easily customize colors, typography, and other design elements to match your brand identity.",
              icon: "🎨",
              color: "from-blue-500 to-indigo-500",
            },
            {
              title: "Performance Optimized",
              description:
                "Built with performance in mind, ensuring fast load times and smooth interactions.",
              icon: "⚡",
              color: "from-emerald-500 to-teal-500",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
              ></div>

              <div className="relative rounded-3xl border border-gray-200/50 bg-white p-6 shadow-lg transition-colors duration-300 group-hover:border-transparent dark:border-gray-700/50 dark:bg-gray-800">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl dark:bg-gray-700">
                  {feature.icon}
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseSection;
