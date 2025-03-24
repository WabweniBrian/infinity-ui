"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Calculator,
  Users,
  Database,
  Mail,
  Clock,
  CreditCard,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface Feature {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  basePrice: number;
  pricePerUnit: number;
  unit: string;
  max: number;
}

const features: Feature[] = [
  {
    id: "users",
    name: "Team Members",
    description: "Number of user seats",
    icon: <Users className="h-5 w-5" />,
    basePrice: 0,
    pricePerUnit: 10,
    unit: "users",
    max: 100,
  },
  {
    id: "storage",
    name: "Storage",
    description: "Cloud storage space",
    icon: <Database className="h-5 w-5" />,
    basePrice: 10,
    pricePerUnit: 0.5,
    unit: "GB",
    max: 1000,
  },
  {
    id: "emails",
    name: "Email Credits",
    description: "Monthly email sends",
    icon: <Mail className="h-5 w-5" />,
    basePrice: 20,
    pricePerUnit: 0.001,
    unit: "emails",
    max: 100000,
  },
  {
    id: "api",
    name: "API Calls",
    description: "Monthly API requests",
    icon: <Clock className="h-5 w-5" />,
    basePrice: 50,
    pricePerUnit: 0.0001,
    unit: "calls",
    max: 1000000,
  },
];

export default function CalculatorPricing() {
  const [values, setValues] = useState<Record<string, number>>({
    users: 5,
    storage: 100,
    emails: 10000,
    api: 100000,
  });
  const [isYearly, setIsYearly] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    features.forEach((feature) => {
      total += feature.basePrice + feature.pricePerUnit * values[feature.id];
    });
    if (isYearly) {
      total = total * 12 * 0.8; // 20% discount for yearly
    }
    setTotalPrice(total);
  }, [values, isYearly]);

  const formatValue = (value: number, unit: string) => {
    if (unit === "GB" && value >= 1000) {
      return `${(value / 1000).toFixed(1)}TB`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  return (
    <section className="w-full bg-white px-4 py-20 dark:bg-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-block rounded-full bg-violet-100 p-3 dark:bg-violet-900/30"
          >
            <Calculator className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-3xl font-bold md:text-4xl"
          >
            Calculate Your Perfect Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400"
          >
            Customize your plan based on your needs. Only pay for what you use.
          </motion.p>
        </div>

        <div className="grid gap-8">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${!isYearly ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
            >
              Monthly
            </span>
            <Switch checked={isYearly} onCheckedChange={setIsYearly} />
            <span
              className={`flex items-center gap-2 text-sm font-medium ${isYearly ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
            >
              Yearly
              <span className="inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
                Save 20%
              </span>
            </span>
          </div>

          {/* Feature Sliders */}
          <div className="space-y-8">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800/50"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-violet-100 p-2 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {formatValue(values[feature.id], feature.unit)}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {feature.unit}
                    </div>
                  </div>
                </div>

                <Slider
                  value={[values[feature.id]]}
                  min={0}
                  max={feature.max}
                  step={feature.max / 100}
                  onValueChange={(newValue) => {
                    setValues((prev) => ({
                      ...prev,
                      [feature.id]: newValue[0],
                    }));
                  }}
                  className="mt-4"
                />

                <div className="mt-2 flex justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>0</span>
                  <span>{formatValue(feature.max, feature.unit)}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total Price */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-8 rounded-xl border border-violet-200 bg-violet-50 p-6 dark:border-violet-800 dark:bg-violet-900/20"
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold">Estimated Total</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {isYearly ? "Billed annually" : "Billed monthly"}
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  ${totalPrice.toFixed(2)}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  per {isYearly ? "year" : "month"}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-3 font-medium text-white hover:bg-violet-500"
            >
              <CreditCard className="h-4 w-4" />
              Start Free Trial
            </motion.button>
          </motion.div>
        </div>

        <div className="mt-16 text-center text-sm text-slate-500 dark:text-slate-400">
          All plans include a 14-day free trial. No credit card required.
        </div>
      </div>
    </section>
  );
}
