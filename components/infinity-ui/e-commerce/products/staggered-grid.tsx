"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";
import GlassCard from "./glass-card";

interface StaggeredGridProps {
  title?: string;
  subtitle?: string;
}

const StaggeredGrid = ({
  title = "Premium Collection",
  subtitle,
}: StaggeredGridProps) => {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 dark:from-slate-900 dark:to-slate-800">
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

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* First row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="col-span-1 sm:col-span-2 lg:col-span-1"
            >
              <GlassCard product={products[0]} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1"
            >
              <GlassCard product={products[1]} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="col-span-1"
            >
              <GlassCard product={products[2]} />
            </motion.div>

            {/* Second row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-1"
            >
              <GlassCard product={products[3]} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-1 sm:col-span-2 lg:col-span-2"
            >
              <GlassCard product={products[4]} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StaggeredGrid;
