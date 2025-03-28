"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import FloatingCard from "./floating-card";

interface FeaturedGridProps {
  title?: string;
  subtitle?: string;
}

const FeaturedGrid = ({
  title = "Editor's Choice",
  subtitle,
}: FeaturedGridProps) => {
  // Get featured product
  const featuredProduct = products.find((p) => p.isFeatured) || products[0];
  // Get other products excluding the featured one
  const otherProducts = products
    .filter((p) => p.id !== featuredProduct.id)
    .slice(0, 3);

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

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Featured product */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:row-span-2"
          >
            <FloatingCard product={featuredProduct} />
          </motion.div>

          {/* Other products */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {otherProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              >
                <FloatingCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGrid;
