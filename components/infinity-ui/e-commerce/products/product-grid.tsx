"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye, Check } from "lucide-react";
import { products } from "@/data/products";
import StarRating from "./star-rating";

interface ProductGridProps {
  title?: string;
  subtitle?: string;
}

const ProductGrid = ({
  title = "Featured Products",
  subtitle,
}: ProductGridProps) => {
  const [addedToCart, setAddedToCart] = useState<Record<string, boolean>>({});

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleAddToCart = (productId: string) => {
    setAddedToCart((prev) => ({
      ...prev,
      [productId]: true,
    }));

    // Reset the "Added" state after 2 seconds
    setTimeout(() => {
      setAddedToCart((prev) => ({
        ...prev,
        [productId]: false,
      }));
    }, 2000);
  };

  return (
    <section className="bg-white py-16 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5 }}
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 transition-all duration-300 group-hover:shadow-xl dark:bg-slate-800">
                {(product.isNew || product.isOnSale) && (
                  <div className="absolute left-4 top-4 z-10 flex flex-col gap-2">
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
                )}
                <Image
                  src={
                    product.image ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-10"></div>

                {/* Quick action buttons */}
                <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600">
                    <Heart className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                  </button>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-gray-100 dark:bg-slate-700 dark:hover:bg-slate-600">
                    <Eye className="h-5 w-5 text-gray-600 dark:text-gray-200" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating rating={product.rating} size="sm" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatPrice(product.price)}
                    </p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through dark:text-gray-400">
                        {formatPrice(product.originalPrice)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <motion.button
                className={`mt-4 flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-white transition-all ${
                  addedToCart[product.id]
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                }`}
                onClick={() => handleAddToCart(product.id)}
                whileTap={{ scale: 0.95 }}
              >
                {addedToCart[product.id] ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductGrid;
