"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

const ProductShowcaseHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    const createParticles = () => {
      const width = canvas.width;
      const height = canvas.height;

      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2 + 0.5,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles.length = 0;
      createParticles();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    createParticles();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 py-20 md:py-28">
      {/* Background Canvas for Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-block rounded-full bg-slate-900 px-4 py-1.5 text-sm font-medium text-white"
            >
              New Release
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
            >
              Elevate your design with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Infinity UI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 max-w-lg text-lg text-slate-600"
            >
              A premium collection of UI components designed to help you build
              stunning interfaces in less time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 grid gap-3 sm:grid-cols-2"
            >
              {[
                "Responsive components",
                "Modern animations",
                "Copy & paste ready",
                "Fully customizable",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100">
                    <Check className="h-3 w-3 text-blue-600" />
                  </div>
                  <span className="text-sm text-slate-700">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="group flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 font-medium text-white transition-all hover:bg-slate-800">
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-all hover:bg-slate-50">
                View Demo
              </button>
            </motion.div>
          </div>

          {/* Right Content - Product Image */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="relative mx-auto max-w-md shadow-2xl"
            >
              {/* Product Image */}
              <div className="overflow-hidden rounded-2xl bg-white">
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Image
                    src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo40O6jAdV8HBnj2sim5N7M41k9TADhtKvdpry"
                    alt="Infinity UI Components"
                    width={800}
                    height={600}
                    className="h-auto w-full"
                  />
                </motion.div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute left-4 top-4 z-20 rounded-full bg-white px-4 py-2 shadow-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-xs font-medium text-slate-800">
                    Premium Quality
                  </span>
                </div>
              </motion.div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-5 right-8 z-20 rounded-xl bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">250+</div>
                    <div className="text-xs text-slate-600">Components</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">100%</div>
                    <div className="text-xs text-slate-600">Responsive</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Background Decorative Elements */}
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-100 opacity-60 blur-3xl"></div>
            <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-cyan-100 opacity-60 blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcaseHero;
