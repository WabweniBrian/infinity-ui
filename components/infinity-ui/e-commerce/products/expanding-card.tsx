"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Star, ChevronDown, Tag } from "lucide-react";
import { Product } from "@/data/products";

interface ExpandingCardProps {
  product: Product;
}

const ExpandingCard = ({ product }: ExpandingCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-2xl bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-slate-800"
      layout
    >
      {/* Product image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={
            product.image ||
            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
          }
          alt={product.name}
          fill
          className="object-cover object-center transition-transform duration-500 ease-out"
          style={{
            transform: isExpanded ? "scale(1.05)" : "scale(1)",
          }}
        />

        {/* Badges */}
        <div className="absolute left-4 top-4 flex flex-col gap-2">
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
      </div>

      {/* Basic product info */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {product.name}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              {product.rating}
            </span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between">
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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white transition-colors hover:bg-purple-700"
            whileTap={{ scale: 0.9 }}
          >
            <ShoppingCart className="h-5 w-5" />
          </motion.button>
        </div>

        {/* Expand/collapse button */}
        <motion.button
          className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700/50"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isExpanded ? "Show less" : "Show more"}
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
        </motion.button>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-200 dark:border-gray-700"
          >
            <div className="p-4">
              <h4 className="font-medium text-gray-900 dark:text-white">
                Description
              </h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {product.description}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Category
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {product.category}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    In Stock
                  </h4>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {product.stock} units
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Tags
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExpandingCard;
