"use client";

import { Package } from "lucide-react";
import { motion } from "framer-motion";
import { PopularComponentData } from "@/lib/actions/admin/dashboard-stats";

interface PopularComponentsProps {
  components: PopularComponentData[];
}

export const PopularComponents = ({ components }: PopularComponentsProps) => {
  const formatRevenue = (revenue: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(revenue);
  };

  const getBadges = (component: PopularComponentData) => {
    return (
      <div className="flex gap-1">
        {component.isFeatured && (
          <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-medium text-white">
            Featured
          </span>
        )}
        {component.isNew && (
          <span className="rounded-full bg-brand-yellow px-2 py-0.5 text-[10px] font-medium text-white">
            New
          </span>
        )}
        {component.isAI && (
          <span className="rounded-full bg-brand-pink px-2 py-0.5 text-[10px] font-medium text-white">
            AI
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {components.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No components found
        </p>
      ) : (
        components.map((component, index) => (
          <motion.div
            key={component.id}
            className="items-center rounded-lg border p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 sm:flex"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="gap-2 flex-align-center">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-700">
                <Package
                  size={20}
                  className="text-gray-600 dark:text-gray-300"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{component.name}</p>
                  {getBadges(component)}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {component.category}
                </p>
              </div>
            </div>
            <div className="mt-3 sm:ml-auto sm:mt-0 sm:text-right">
              <p className="text-sm font-medium">
                {formatRevenue(component.revenue)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {component.sales} sales
              </p>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};
