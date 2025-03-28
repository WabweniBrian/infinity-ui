"use client";

import type React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
  color: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "CTO",
    company: "TechVision",
    content:
      "This platform has completely transformed our development workflow. The intuitive interface and powerful features have increased our team's productivity by 50%. The support team is also incredibly responsive.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Marketing Director",
    company: "GrowthLabs",
    content:
      "We&apos;ve tried many marketing tools, but this one stands out for its comprehensive analytics and ease of use. It's helped us identify opportunities we would have otherwise missed and optimize our campaigns effectively.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "InnovateCorp",
    content:
      "The level of customization available is impressive. We&apos;ve been able to tailor the platform to our specific needs, which has been crucial for our unique product development process. Highly recommended!",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 4,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    name: "Olivia Martinez",
    role: "CEO",
    company: "StartupX",
    content:
      "As a fast-growing startup, we needed a solution that could scale with us. This platform has been the perfect fit, adapting to our changing needs while maintaining performance and reliability.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    color: "from-emerald-500 to-green-500",
  },
  {
    id: 5,
    name: "David Kim",
    role: "UX Director",
    company: "DesignForward",
    content:
      "The attention to detail in this product is impressive. It's clear that the team understands the challenges designers face and has created features specifically to address them. It's been a game-changer for our design team.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    color: "from-red-500 to-rose-500",
  },
  {
    id: 6,
    name: "Emma Wilson",
    role: "Operations Manager",
    company: "GlobalSystems",
    content:
      "The automation capabilities have saved us countless hours of manual work. What used to take days now takes minutes, allowing our team to focus on more strategic initiatives. The ROI has been tremendous.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    color: "from-indigo-500 to-violet-500",
  },
];

const TestimonialRotatingCube = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse interaction for cube rotation
  const mouseX = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const cubeRotateY = useTransform(mouseXSpring, [-1, 1], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const mouseXNormalized = (e.clientX - centerX) / (rect.width / 2);
    mouseX.set(mouseXNormalized);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
  };

  // Navigation functions
  const nextTestimonial = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Auto-rotate functionality
  useEffect(() => {
    if (autoRotate) {
      autoRotateRef.current = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, [autoRotate, currentIndex, isAnimating, nextTestimonial]);

  // Pause auto-rotation on hover
  const handleMouseEnter = () => setAutoRotate(false);
  const handleMouseLeaveContainer = () => setAutoRotate(true);

  // Calculate indices for visible cube faces
  const getIndices = () => {
    const indices = [];
    for (let i = 0; i < 4; i++) {
      indices.push((currentIndex + i) % testimonials.length);
    }
    return indices;
  };

  const visibleIndices = getIndices();

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeaveContainer}
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Glowing orbs */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iLjUiLz48cGF0aCBkPSJNMCAzMGgzMHYzMEgweiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PHBhdGggZD0iTTMwIDBIMHYzMGgzMHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIuNSIvPjxwYXRoIGQ9Ik0zMCAwaDMwdjMwSDMweiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-20" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
          >
            What Our Clients Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-300"
          >
            Join thousands of satisfied customers who trust our platform
          </motion.p>
        </div>

        {/* 3D Cube Testimonial Display */}
        <div
          className="perspective-1000 relative mx-auto h-[500px] max-w-4xl md:h-[400px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="transform-style-3d relative h-full w-full"
            style={{
              rotateY: cubeRotateY,
              rotateX: useTransform(mouseXSpring, [-1, 1], [-5, 5]),
            }}
          >
            {/* Front face */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`front-${visibleIndices[0]}`}
                custom={direction}
                initial={{
                  rotateY: direction === 1 ? 90 : -90,
                  opacity: 0,
                }}
                animate={{
                  rotateY: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  },
                }}
                exit={{
                  rotateY: direction === 1 ? -90 : 90,
                  opacity: 0,
                  transition: { duration: 0.3 },
                }}
                className="transform-style-3d absolute inset-0"
              >
                <TestimonialCard
                  testimonial={testimonials[visibleIndices[0]]}
                />
              </motion.div>
            </AnimatePresence>

            {/* Right face (peeking) */}
            <div
              className="transform-style-3d absolute inset-0"
              style={{
                transform:
                  "rotateY(90deg) translateZ(20px) translateX(20px) scale(0.9)",
                opacity: 0.6,
              }}
            >
              <TestimonialCard testimonial={testimonials[visibleIndices[1]]} />
            </div>

            {/* Left face (peeking) */}
            <div
              className="transform-style-3d absolute inset-0"
              style={{
                transform:
                  "rotateY(-90deg) translateZ(20px) translateX(-20px) scale(0.9)",
                opacity: 0.6,
              }}
            >
              <TestimonialCard testimonial={testimonials[visibleIndices[3]]} />
            </div>
          </motion.div>

          {/* Navigation controls */}
          <div className="pointer-events-none absolute left-4 right-4 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between">
            <button
              onClick={prevTestimonial}
              className="pointer-events-auto rounded-full bg-white/10 p-3 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Previous testimonial"
              disabled={isAnimating}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="pointer-events-auto rounded-full bg-white/10 p-3 text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Next testimonial"
              disabled={isAnimating}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex justify-center space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isAnimating) return;
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-md">
      <div className="grid h-full md:grid-cols-5">
        {/* Image column */}
        <div className="relative md:col-span-2">
          <div className="relative h-64 md:h-full">
            <Image
              src={
                testimonial.image ||
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
              }
              alt={testimonial.name}
              fill
              className="object-cover"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-30 mix-blend-overlay`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 md:bg-gradient-to-l md:from-black/50 md:via-transparent md:to-transparent" />
          </div>
        </div>

        {/* Content column */}
        <div className="flex flex-col justify-between p-8 md:col-span-3">
          <div>
            <div className="mb-4 flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${i < testimonial.rating ? "fill-yellow-500 text-yellow-500" : "text-gray-600"}`}
                />
              ))}
            </div>

            <div className="relative">
              <Quote className="absolute -left-2 -top-2 h-8 w-8 text-white/20" />
              <p className="relative z-10 mb-6 text-lg italic text-white">
                {testimonial.content}
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-1 text-xl font-bold text-white">
              {testimonial.name}
            </h3>
            <p className="text-slate-300">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialRotatingCube;
