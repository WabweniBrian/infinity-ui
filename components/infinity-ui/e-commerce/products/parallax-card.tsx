"use client";

import type React from "react";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/data/products";

interface ParallaxCardProps {
  product: Product;
}

const ParallaxCard = ({ product }: ParallaxCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Motion values for parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the card tilt
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), {
    stiffness: 300,
    damping: 30,
  });

  // Parallax effect for the image and content
  const imageX = useTransform(x, [-100, 100], [15, -15]);
  const imageY = useTransform(y, [-100, 100], [15, -15]);
  const contentX = useTransform(x, [-100, 100], [10, -10]);
  const contentY = useTransform(y, [-100, 100], [10, -10]);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[400px] w-full cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow hover:shadow-xl dark:bg-slate-800"
      style={{ rotateX, rotateY, z: 100 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      {/* Shine effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0"
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800" />

      {/* Product image with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: imageX, y: imageY }}
      >
        <Image
          src={
            product.image ||
            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
          }
          alt={product.name}
          fill
          className="object-cover object-center"
        />
      </motion.div>

      {/* Badges */}
      <div className="absolute left-4 top-4 z-20 flex flex-col gap-2">
        {product.isNew && (
          <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
            New
          </span>
        )}
        {product.isOnSale && (
          <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-medium text-white">
            Sale
          </span>
        )}
      </div>

      {/* Favorite button */}
      <button className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-600 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500 dark:bg-slate-800/80 dark:text-gray-200">
        <Heart className="h-5 w-5" />
      </button>

      {/* Product info with parallax effect */}
      <motion.div
        className="absolute bottom-0 z-20 w-full bg-white/80 p-6 backdrop-blur-md dark:bg-slate-800/80"
        style={{ x: contentX, y: contentY }}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <motion.button
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 text-sm font-medium text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ParallaxCard;
