"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import FashionCard from "./fashion-card";

interface FashionGridProps {
  title?: string;
  subtitle?: string;
}

const FashionGrid = ({
  title = "Featured Collection",
  subtitle,
}: FashionGridProps) => {
  return (
    <section className="bg-gray-50 py-16 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {products.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <FashionCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FashionGrid;
