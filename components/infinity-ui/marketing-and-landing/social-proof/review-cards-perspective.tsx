"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Star, ThumbsUp, MessageSquare, Calendar } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Review = {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  comments: number;
  verified: boolean;
  productImage?: string;
  productName?: string;
};

const reviews: Review[] = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    date: "2 weeks ago",
    rating: 5,
    title: "Exceeded all my expectations!",
    content:
      "This product has completely transformed my workflow. The interface is intuitive, and the features are exactly what I needed. Customer support was also exceptional when I had questions.",
    helpful: 42,
    comments: 5,
    verified: true,
    productImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    productName: "Premium Plan",
  },
  {
    id: 2,
    name: "Samantha Lee",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    date: "1 month ago",
    rating: 4,
    title: "Great product with minor issues",
    content:
      "I've been using this for about a month now and I'm mostly impressed. There are a few small bugs that need to be fixed, but overall it's been a great addition to my toolkit.",
    helpful: 28,
    comments: 3,
    verified: true,
    productImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    productName: "Standard Plan",
  },
  {
    id: 3,
    name: "Michael Chen",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    date: "3 months ago",
    rating: 5,
    title: "Best purchase I've made this year",
    content:
      "After trying several competitors, this is by far the best solution on the market. The attention to detail and quality is evident in every aspect. I've already recommended it to several colleagues.",
    helpful: 36,
    comments: 7,
    verified: true,
    productImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    productName: "Premium Plan",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    date: "2 months ago",
    rating: 5,
    title: "Incredible value for the price",
    content:
      "I was skeptical at first, but this product has proven to be an incredible value. The features are comprehensive, and the regular updates keep improving the experience. Highly recommended!",
    helpful: 19,
    comments: 2,
    verified: true,
    productImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    productName: "Standard Plan",
  },
  {
    id: 5,
    name: "David Kim",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    date: "1 week ago",
    rating: 4,
    title: "Almost perfect",
    content:
      "This product does almost everything I need it to do. There are a few features I wish it had, but the development team seems to be actively working on improvements. Looking forward to future updates!",
    helpful: 12,
    comments: 1,
    verified: true,
    productImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    productName: "Basic Plan",
  },
];

const ReviewCardsPerspective = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Update mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      containerRef.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };

    // Calculate mouse position relative to container (0-1)
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({ x, y });
  };

  // Update motion values when mouse position changes
  useEffect(() => {
    const unsubscribeX = smoothMouseX.on("change", () => {});
    const unsubscribeY = smoothMouseY.on("change", () => {});

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [smoothMouseX, smoothMouseY]);

  // Helper function to calculate card transform values
  const getCardTransform = (index: number) => {
    const x = mousePosition.x;
    const y = mousePosition.y;

    // X offset based on mouse position and card index
    const offsetX = (x - 0.5) * -30 * (index % 3 === 0 ? -1 : 1);

    // Y offset based on mouse position and card index
    const offsetY = (y - 0.5) * -30 * (index < 3 ? -1 : 1);

    // Rotation based on mouse position
    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;

    return { offsetX, offsetY, rotateX, rotateY };
  };

  // Helper function to calculate background element transform
  const getBackgroundTransform = (index: number) => {
    const x = mousePosition.x;
    const y = mousePosition.y;

    const xOffset = (x - 0.5) * 40 * (index % 2 === 0 ? -1 : 1);
    const yOffset = (y - 0.5) * 40 * (index % 2 === 0 ? -1 : 1);

    return { xOffset, yOffset };
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 dark:from-slate-900 dark:to-slate-800"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Geometric background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.07]">
          {/* Circles */}
          {Array.from({ length: 20 }).map((_, i) => {
            const size = Math.random() * 100 + 50;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const { xOffset, yOffset } = getBackgroundTransform(i);

            return (
              <motion.div
                key={`circle-${i}`}
                className="absolute rounded-full border border-indigo-500/30 dark:border-indigo-500/20"
                animate={{
                  x: xOffset,
                  y: yOffset,
                }}
                transition={{ type: "spring", damping: 25, stiffness: 100 }}
                style={{
                  width: size,
                  height: size,
                  top: `${top}%`,
                  left: `${left}%`,
                }}
              />
            );
          })}

          {/* Triangles */}
          {Array.from({ length: 15 }).map((_, i) => {
            const size = Math.random() * 80 + 40;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const rotation = Math.random() * 360;
            const { xOffset, yOffset } = getBackgroundTransform(i);

            return (
              <motion.div
                key={`triangle-${i}`}
                className="absolute border-b border-l border-r border-indigo-500/30 dark:border-indigo-500/20"
                animate={{
                  x: xOffset,
                  y: yOffset,
                }}
                transition={{ type: "spring", damping: 25, stiffness: 100 }}
                style={{
                  width: 0,
                  height: 0,
                  borderLeftWidth: `${size / 2}px`,
                  borderRightWidth: `${size / 2}px`,
                  borderBottomWidth: `${size}px`,
                  borderLeftColor: "transparent",
                  borderRightColor: "transparent",
                  top: `${top}%`,
                  left: `${left}%`,
                  rotate: `${rotation}deg`,
                }}
              />
            );
          })}

          {/* Squares */}
          {Array.from({ length: 10 }).map((_, i) => {
            const size = Math.random() * 60 + 30;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const rotation = Math.random() * 45;
            const { xOffset, yOffset } = getBackgroundTransform(i);

            return (
              <motion.div
                key={`square-${i}`}
                className="absolute border border-indigo-500/30 dark:border-indigo-500/20"
                animate={{
                  x: xOffset,
                  y: yOffset,
                }}
                transition={{ type: "spring", damping: 25, stiffness: 100 }}
                style={{
                  width: size,
                  height: size,
                  top: `${top}%`,
                  left: `${left}%`,
                  rotate: `${rotation}deg`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl"
          >
            Customer Reviews
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            See what our customers are saying about their experience
          </motion.p>

          {/* Overall rating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center"
          >
            <div className="mb-2 flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={28}
                  className="mr-1 fill-yellow-500 text-yellow-500"
                />
              ))}
            </div>
            <p className="mb-1 text-3xl font-bold text-slate-800 dark:text-white">
              4.8 / 5
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Based on 512 reviews
            </p>
          </motion.div>
        </div>

        {/* Review cards with 3D perspective */}
        <div className="perspective-1000 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => {
            const { offsetX, offsetY, rotateX, rotateY } =
              getCardTransform(index);

            return (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                animate={{
                  x: offsetX,
                  y: offsetY,
                  rotateX: rotateX,
                  rotateY: rotateY,
                  z: hoveredId === review.id ? 50 : 0,
                }}
                whileHover={{ z: 50, scale: 1.02 }}
                onMouseEnter={() => setHoveredId(review.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="transform-style-3d overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800"
              >
                {/* Review header */}
                <div className="border-b border-slate-100 p-6 dark:border-slate-700">
                  <div className="flex items-start">
                    <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={
                          review.avatar ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                        }
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-1 flex items-center text-lg font-semibold text-slate-800 dark:text-white">
                        {review.name}
                        {review.verified && (
                          <span className="ml-2 inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                            Verified
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center">
                        <div className="mr-2 flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className={`${
                                i < review.rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-gray-300 dark:text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                          <Calendar size={14} className="mr-1" />
                          {review.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Review content */}
                <div className="p-6">
                  {review.productImage && (
                    <div className="mb-4 flex items-center rounded-lg bg-slate-50 p-3 dark:bg-slate-700/30">
                      <div className="relative mr-3 h-12 w-12">
                        <Image
                          src={
                            review.productImage ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={review.productName || ""}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {review.productName}
                      </div>
                    </div>
                  )}

                  <h4 className="mb-2 text-lg font-semibold text-slate-800 dark:text-white">
                    {review.title}
                  </h4>
                  <p className="mb-4 text-slate-600 dark:text-slate-300">
                    {review.content}
                  </p>

                  {/* Review footer */}
                  <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center">
                      <button className="flex items-center transition-colors hover:text-indigo-600 dark:hover:text-indigo-400">
                        <ThumbsUp size={14} className="mr-1" />
                        Helpful ({review.helpful})
                      </button>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare size={14} className="mr-1" />
                      {review.comments}{" "}
                      {review.comments === 1 ? "comment" : "comments"}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-block rounded-full bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Write a Review
          </a>
        </motion.div>
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

export default ReviewCardsPerspective;
