"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  popularPlan?: boolean;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  popularPlan,
}: PricingCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={cn(
        "relative h-full rounded-2xl border",
        popularPlan && "border-2 border-yellow-500",
      )}
    >
      {popularPlan && (
        <span className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-yellow-500 px-4 py-1 text-white">
          Popular
        </span>
      )}
      <div className="p-8">
        <h3 className={`mb-2 text-2xl font-bold`}>{title}</h3>
        <p className={`mb-4`}>{description}</p>
        <div className={`mb-6 text-4xl font-bold`}>{price}</div>
        <ul className="mb-8 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check
                className={`mr-2 h-5 w-5 ${popularPlan ? "text-yellow-500" : "text-green-500"}`}
              />
              <span className="text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>
        <Button
          className={`w-full ${
            popularPlan
              ? "bg-yellow-500 text-gray-900 hover:bg-yellow-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Choose Plan
        </Button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
