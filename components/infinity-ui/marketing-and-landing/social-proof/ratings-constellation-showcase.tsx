"use client";

import type React from "react";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Star,
  Award,
  TrendingUp,
  Users,
  CheckCircle,
  BarChart,
} from "lucide-react";

type Rating = {
  id: number;
  platform: string;
  score: number;
  maxScore: number;
  reviewCount: number;
  logo: string;
};

type Stat = {
  id: number;
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
};

const ratings: Rating[] = [
  {
    id: 1,
    platform: "G2",
    score: 4.8,
    maxScore: 5,
    reviewCount: 487,
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 2,
    platform: "Capterra",
    score: 4.9,
    maxScore: 5,
    reviewCount: 326,
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 3,
    platform: "TrustPilot",
    score: 4.7,
    maxScore: 5,
    reviewCount: 512,
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 4,
    platform: "Software Advice",
    score: 9.2,
    maxScore: 10,
    reviewCount: 203,
    logo: "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
];

const stats: Stat[] = [
  {
    id: 1,
    label: "Customer Satisfaction",
    value: "98%",
    icon: <CheckCircle className="h-6 w-6" />,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 2,
    label: "Year-over-Year Growth",
    value: "127%",
    icon: <TrendingUp className="h-6 w-6" />,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 3,
    label: "Active Users",
    value: "50K+",
    icon: <Users className="h-6 w-6" />,
    color: "from-purple-500 to-violet-500",
  },
  {
    id: 4,
    label: "Industry Awards",
    value: "12",
    icon: <Award className="h-6 w-6" />,
    color: "from-amber-500 to-yellow-500",
  },
  {
    id: 5,
    label: "Uptime Reliability",
    value: "99.99%",
    icon: <BarChart className="h-6 w-6" />,
    color: "from-rose-500 to-pink-500",
  },
];

// Particle system for constellation background
const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * (canvas?.width ?? 0);
        this.y = Math.random() * (canvas?.height ?? 0);
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > (canvas?.width ?? 0)) {
          this.speedX = -this.speedX;
        }

        if (this.y < 0 || this.y > (canvas?.height ?? 0)) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw connections between particles
    const drawConnections = () => {
      if (!ctx) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      drawConnections();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

const RatingsConstellationShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.3, 1, 1, 0.3],
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 py-20"
    >
      {/* Constellation background */}
      <div className="absolute inset-0 opacity-70">
        <ConstellationBackground />
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 to-purple-600/10"
        style={{ opacity }}
      />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
          >
            Recognized for <span className="text-indigo-400">Excellence</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-indigo-200"
          >
            See why thousands of customers rate us as the industry leader
          </motion.p>
        </div>

        {/* Rating cards */}
        <motion.div
          style={{ y: y1 }}
          className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {ratings.map((rating, index) => (
            <motion.div
              key={rating.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="relative h-8 w-24">
                  <div
                    className="absolute inset-0 bg-contain bg-left bg-no-repeat"
                    style={{ backgroundImage: `url(${rating.logo})` }}
                  />
                </div>
                <div className="flex">
                  {rating.maxScore === 5 ? (
                    // 5-star rating
                    [...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(rating.score)
                            ? "fill-yellow-500 text-yellow-500"
                            : i < rating.score
                              ? "fill-yellow-500 text-yellow-500 opacity-50"
                              : "text-gray-400"
                        }`}
                      />
                    ))
                  ) : (
                    // 10-point rating
                    <div className="text-lg font-bold text-yellow-500">
                      {rating.score.toFixed(1)}/10
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                <div className="mb-1 text-3xl font-bold text-white">
                  {rating.score.toFixed(1)}
                  <span className="text-lg font-normal text-indigo-300">
                    /{rating.maxScore}
                  </span>
                </div>
                <div className="text-sm text-indigo-300">
                  Based on {rating.reviewCount} reviews
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          style={{ y: y2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-5"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <div
                className={`h-12 w-12 rounded-full bg-gradient-to-br ${stat.color} mb-4 flex items-center justify-center`}
              >
                {stat.icon}
              </div>
              <div className="mb-2 text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-sm text-indigo-200">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Awards section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <h3 className="mb-8 text-2xl font-bold text-white">
            Award-Winning Excellence
          </h3>

          <div className="flex flex-wrap justify-center gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <div className="relative h-16 w-16">
                  <div
                    className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-block rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 font-medium text-white transition-colors hover:from-indigo-700 hover:to-purple-700"
          >
            See All Reviews
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default RatingsConstellationShowcase;
