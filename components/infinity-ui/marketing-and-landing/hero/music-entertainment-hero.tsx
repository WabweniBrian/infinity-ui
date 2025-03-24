"use client";

import { motion, useAnimation } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Headphones,
  MapPin,
  Mic,
  Music,
  Pause,
  Play,
  Share2,
  Ticket,
  Volume2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const MusicEntertainmentHero = () => {
  const controls = useAnimation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeEvent, setActiveEvent] = useState(0);

  // Upcoming events data
  const events = [
    {
      name: "Summer Vibes Festival",
      date: "July 15, 2023",
      location: "Central Park, New York",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoT54ahAxINGL43Bmkhwazp7exFWUt06ZryRuJ",
    },
    {
      name: "Neon Nights Tour",
      date: "August 5, 2023",
      location: "The Anthem, Washington DC",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoTpk6bvxINGL43Bmkhwazp7exFWUt06ZryRuJ",
    },
    {
      name: "Acoustic Sessions",
      date: "September 12, 2023",
      location: "The Fillmore, San Francisco",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoLQb5bb92btexfpgAjKLEUq3onTiJ8cDy1dHG",
    },
  ];

  // Featured tracks
  const tracks = [
    { name: "Midnight Dreams", duration: "3:45", plays: "1.2M" },
    { name: "Electric Sunset", duration: "4:12", plays: "856K" },
    { name: "Neon Lights", duration: "3:28", plays: "2.4M" },
  ];

  // Start animations when component mounts
  useEffect(() => {
    controls.start("visible");

    // Auto-rotate events
    const interval = setInterval(() => {
      setActiveEvent((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [controls, events.length]);

  // Set up canvas for visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2); // For retina displays
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle audio time update for visualization
  useEffect(() => {
    const audio = audioRef.current;
    const canvas = canvasRef.current;
    if (!audio || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = 128; // Simulated buffer length

    const renderFrame = () => {
      if (!canvas || !ctx || !audio) return;

      animationRef.current = requestAnimationFrame(renderFrame);

      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

      const barWidth = canvas.width / 2 / bufferLength;
      let x = 0;

      // Create simulated audio data based on current time
      for (let i = 0; i < bufferLength; i++) {
        // Generate visualization data algorithmically
        let barHeight = 2; // Default height when not playing

        if (isPlaying) {
          // Create a dynamic visualization based on audio currentTime
          const frequency = i / bufferLength; // Normalized frequency
          const time = audio.currentTime;

          // Generate a dynamic waveform
          const amplitude = Math.sin(frequency * 10 + time * 2) * 0.5 + 0.5;
          const variation = Math.sin(time * 4 + i * 0.2) * 0.3 + 0.7;

          barHeight = amplitude * variation * (canvas.height / 4);

          // Add some randomness for more realistic visualization
          barHeight += Math.random() * 0.2 * (canvas.height / 16);
        }

        // Create gradient for bars
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
        gradient.addColorStop(0, "#f43f5e"); // rose-500
        gradient.addColorStop(1, "#ec4899"); // pink-500

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height / 4 - barHeight, barWidth - 1, barHeight);

        x += barWidth;
      }
    };

    if (isPlaying) {
      renderFrame();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);

      // Draw flat lines when paused
      ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
      const barWidth = canvas.width / 2 / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = 2;

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height / 2);
        gradient.addColorStop(0, "#f43f5e");
        gradient.addColorStop(1, "#ec4899");

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height / 4 - barHeight, barWidth - 1, barHeight);

        x += barWidth;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  // Toggle audio playback
  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.error("Error playing audio:", err);
        // Handle autoplay policy issues
        setIsPlaying(false);
      });
    }

    setIsPlaying(!isPlaying);
  };

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
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black py-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-gray-900/70 to-black/90" />

        {/* Background image */}
        <Image
          src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoHpOEBe4LPQRizs519hDeHlYBAUcyNFxWk2M6"
          alt="Music background"
          fill
          className="object-cover opacity-50"
        />

        {/* Accent colors */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5 }}
          className="absolute -left-20 top-20 h-[300px] w-[300px] rounded-full bg-rose-500 blur-[100px]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-20 right-20 h-[250px] w-[250px] rounded-full bg-purple-500 blur-[100px]"
        />
      </div>

      {/* Audio element (hidden) */}
      <audio
        ref={audioRef}
        src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoAnZ17om4zc2AfJ7r0YvHaCFP5ERWkxZIX1gU"
        loop
        onEnded={() => setIsPlaying(false)}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Left Content */}
          <div>
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-500"></span>
              New Album Out Now
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Experience the{" "}
              <span className="relative bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                rhythm
                <motion.div
                  className="absolute -bottom-2 left-0 h-2 w-full bg-rose-500/30"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-lg text-lg text-gray-300"
            >
              Immerse yourself in the electrifying world of sound and rhythm.
              Our latest album takes you on a journey through innovative beats
              and soul-stirring melodies.
            </motion.p>

            {/* Audio player */}
            <motion.div
              variants={itemVariants}
              className="mb-8 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={togglePlayback}
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      isPlaying ? "bg-rose-500" : "bg-white"
                    }`}
                  >
                    {isPlaying ? (
                      <Pause className="h-5 w-5 fill-white text-white" />
                    ) : (
                      <Play className="h-5 w-5 fill-gray-900 text-gray-900" />
                    )}
                  </motion.button>

                  <div>
                    <div className="font-medium text-white">Neon Dreams</div>
                    <div className="text-xs text-gray-400">
                      Latest Album • 2023
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                  >
                    <Share2 className="h-4 w-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
                  >
                    <Headphones className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Audio visualization */}
              <div className="h-16 w-full">
                <canvas ref={canvasRef} className="h-full w-full" />
              </div>

              {/* Track list */}
              <div className="mt-4 space-y-2">
                {tracks.map((track, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-lg p-2 ${index === 0 ? "bg-white/10" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full ${
                          index === 0
                            ? "bg-rose-500 text-white"
                            : "bg-white/10 text-white"
                        }`}
                      >
                        {index === 0 && isPlaying ? (
                          <Volume2 className="h-4 w-4" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">
                          {track.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {track.duration}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Music className="h-3 w-3" />
                      {track.plays}
                    </div>
                  </div>
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
                className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 font-medium text-white transition-all hover:from-rose-600 hover:to-pink-600"
              >
                Stream Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <Ticket className="h-4 w-4" />
                Tour Dates
              </motion.button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-rose-500" />
                <span className="text-sm text-gray-300">
                  <span className="font-semibold text-white">10M+</span> Monthly
                  Listeners
                </span>
              </div>

              <div className="h-8 w-[1px] bg-white/20" />

              <div className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-rose-500" />
                <span className="text-sm text-gray-300">
                  <span className="font-semibold text-white">3</span> Grammy
                  Awards
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Event Showcase */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto max-w-md"
            >
              {/* Event showcase */}
              <div className="relative h-[400px]">
                {events.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, x: 50 }}
                    animate={{
                      opacity: activeEvent === index ? 1 : 0,
                      scale: activeEvent === index ? 1 : 0.9,
                      x: activeEvent === index ? 0 : 50,
                      zIndex: activeEvent === index ? 30 : 10,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`absolute inset-0 ${activeEvent === index ? "pointer-events-auto" : "pointer-events-none"}`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                      <div className="relative h-48 w-full">
                        <Image
                          src={event.image || "/default-image.jpg"}
                          alt={event.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                        <div className="absolute bottom-4 left-4 rounded-full bg-rose-500 px-3 py-1 text-xs font-medium text-white">
                          Upcoming Event
                        </div>
                      </div>

                      <div className="p-4">
                        <h3 className="mb-2 text-xl font-bold text-white">
                          {event.name}
                        </h3>

                        <div className="mb-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Calendar className="h-4 w-4 text-rose-500" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <MapPin className="h-4 w-4 text-rose-500" />
                            {event.location}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm font-medium text-white">
                            Tickets from{" "}
                            <span className="text-rose-500">$49.99</span>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/20"
                          >
                            Get Tickets
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Event navigation */}
              <div className="mt-4 flex justify-center gap-2">
                {events.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveEvent(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeEvent === index
                        ? "w-8 bg-rose-500"
                        : "w-2 bg-white/30"
                    }`}
                    aria-label={`View event ${index + 1}`}
                  />
                ))}
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6, type: "spring" }}
                className="absolute -left-16 top-10 z-30 rounded-lg bg-white/10 p-3 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/30 text-rose-400">
                    <Music className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-white">
                    <div className="font-medium">New Single</div>
                    <div className="text-white/70">Out This Friday</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, type: "spring" }}
                className="absolute -right-10 top-36 z-30 rounded-lg bg-white/10 p-3 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/30 text-purple-400">
                    <Headphones className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-white">
                    <div className="font-medium">Fan Club</div>
                    <div className="text-white/70">Join for Exclusives</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MusicEntertainmentHero;
