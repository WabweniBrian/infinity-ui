"use client";

import { motion } from "framer-motion";
import AddComponentForm from "./add-component";

interface ComponentsHeaderProps {
  categories: { value: string; label: string }[];
}

export const ComponentsHeader = ({ categories }: ComponentsHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Components
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your UI components, pricing, and visibility
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <AddComponentForm categories={categories} />
        </div>
      </div>
    </motion.div>
  );
};
