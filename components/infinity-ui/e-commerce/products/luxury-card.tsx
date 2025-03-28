"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";

interface LuxuryCardProps {
  product: Product;
}

const LuxuryCard = ({ product }: LuxuryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <motion.div
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Product image */}
      <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-slate-800">
        <Image
          src={
            isHovered && product.hoverImage ? product.hoverImage : product.image
          }
          alt={product.name}
          fill
          className="object-cover object-center transition-all duration-700"
          style={{
            transform: isHovered ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-black/40 opacity-0 transition-opacity"
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* View details button */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button className="rounded-none border border-white bg-transparent px-6 py-2 text-sm font-light uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black">
                View Details
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Limited edition badge */}
        {product.isLimitedEdition && (
          <div className="absolute left-0 top-4">
            <span className="bg-black px-4 py-1 text-xs font-light uppercase tracking-wider text-white dark:bg-white dark:text-black">
              Limited Edition
            </span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col">
        <h3 className="font-serif text-lg font-medium text-gray-900 dark:text-white">
          {product.name}
        </h3>

        <p className="mt-1 text-sm font-light text-gray-500 dark:text-gray-400">
          {product.category}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-light text-gray-900 dark:text-white">
            {formatPrice(product.price)}
          </span>

          <motion.div
            className="overflow-hidden"
            animate={{ width: isHovered ? "auto" : "20px" }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="flex items-center whitespace-nowrap text-sm font-light text-gray-900 dark:text-white"
              animate={{ x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.3 }}
            >
              Discover <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default LuxuryCard;
