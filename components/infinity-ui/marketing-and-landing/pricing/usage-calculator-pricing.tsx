"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";
import { Check } from "lucide-react";

interface UsageEstimate {
  users: number;
  storage: number;
  apiCalls: number;
}

interface PricingTier {
  name: string;
  description: string;
  basePrice: number;
  userPrice: number;
  storagePrice: number;
  apiPrice: number;
  features: string[];
  cta: string;
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Startup",
    description: "Perfect for small teams just getting started",
    basePrice: 49,
    userPrice: 6,
    storagePrice: 0.3,
    apiPrice: 0.0005,
    features: [
      "Up to 10 team members",
      "100GB storage included",
      "100K API calls/month included",
      "Basic analytics",
      "Standard support (24h response)",
      "99.9% uptime SLA",
    ],
    cta: "Start free trial",
  },
  {
    name: "Growth",
    description: "For growing teams with increasing demands",
    basePrice: 99,
    userPrice: 8,
    storagePrice: 0.4,
    apiPrice: 0.0008,
    features: [
      "Up to 25 team members",
      "500GB storage included",
      "500K API calls/month included",
      "Advanced analytics",
      "Priority support (12h response)",
      "99.95% uptime SLA",
      "Single sign-on (SSO)",
    ],
    cta: "Start free trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    basePrice: 299,
    userPrice: 10,
    storagePrice: 0.5,
    apiPrice: 0.001,
    features: [
      "Unlimited team members",
      "2TB storage included",
      "2M API calls/month included",
      "Custom analytics",
      "Dedicated support (4h response)",
      "99.99% uptime SLA",
      "Advanced security features",
      "Custom integrations",
      "Dedicated account manager",
    ],
    cta: "Contact sales",
  },
];

const calculatePrice = (tier: PricingTier, usage: UsageEstimate): number => {
  const extraUsers = Math.max(
    0,
    usage.users -
      (tier.name === "Startup"
        ? 10
        : tier.name === "Growth"
          ? 25
          : usage.users),
  );
  const extraStorage = Math.max(
    0,
    usage.storage -
      (tier.name === "Startup" ? 100 : tier.name === "Growth" ? 500 : 2000),
  );
  const extraApiCalls = Math.max(
    0,
    usage.apiCalls -
      (tier.name === "Startup"
        ? 100000
        : tier.name === "Growth"
          ? 500000
          : 2000000),
  );

  return (
    tier.basePrice +
    extraUsers * tier.userPrice +
    extraStorage * tier.storagePrice +
    extraApiCalls * tier.apiPrice
  );
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Custom slider component
const CustomSlider = ({
  value,
  min,
  max,
  step,
  onChange,
  label,
  valueLabel,
}: {
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  label: string;
  valueLabel: string;
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between">
        <label className="text-sm font-medium">{label}</label>
        <span className="text-sm font-medium">{valueLabel}</span>
      </div>
      <div className="relative h-2 rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="absolute h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full border-2 border-violet-500 bg-white shadow-md"
          style={{ left: `${percentage}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
};

export default function UsageCalculatorPricing() {
  const [usage, setUsage] = useState<UsageEstimate>({
    users: 10,
    storage: 100,
    apiCalls: 100000,
  });

  const [prices, setPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const newPrices: Record<string, number> = {};
    pricingTiers.forEach((tier) => {
      newPrices[tier.name] = calculatePrice(tier, usage);
    });
    setPrices(newPrices);
  }, [usage]);

  return (
    <section className="overflow-hidden bg-white py-24 dark:bg-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Background elements */}
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-violet-300/20 to-indigo-300/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-violet-300/20 to-indigo-300/20 blur-3xl" />

        <div className="relative mb-16 text-center">
          <motion.h2
            className="mb-4 bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Pay Only For What You Use
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Transparent, usage-based pricing that scales with your business.
            Estimate your costs in real-time.
          </motion.p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              className={`relative overflow-hidden rounded-2xl bg-slate-50 shadow-lg dark:bg-slate-800/50 ${
                tier.popular
                  ? "border-2 border-violet-500 dark:border-violet-400"
                  : "border border-slate-200 dark:border-slate-700"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {tier.popular && (
                <div className="absolute right-0 top-0 rounded-bl-lg bg-violet-500 px-3 py-1 text-xs font-bold text-white">
                  MOST POPULAR
                </div>
              )}
              <div className="bg-white p-6 dark:bg-slate-800">
                <h3 className="mb-2 text-xl font-bold">{tier.name}</h3>
                <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">
                  {tier.description}
                </p>
                <div className="mb-6 flex items-end">
                  <span className="text-4xl font-bold">
                    ${prices[tier.name]?.toFixed(2) || tier.basePrice}
                  </span>
                  <span className="ml-2 text-slate-600 dark:text-slate-400">
                    /month
                  </span>
                </div>
                <div className="mb-6">
                  <div className="mb-2 text-sm text-slate-600 dark:text-slate-400">
                    Includes:
                  </div>
                  <div className="text-sm">
                    <div className="mb-1 flex items-center">
                      <span className="font-medium">Base price:</span>
                      <span className="ml-auto">${tier.basePrice}/mo</span>
                    </div>
                    <div className="mb-1 flex items-center">
                      <span className="font-medium">Per user:</span>
                      <span className="ml-auto">${tier.userPrice}/mo</span>
                    </div>
                    <div className="mb-1 flex items-center">
                      <span className="font-medium">Storage:</span>
                      <span className="ml-auto">
                        ${tier.storagePrice}/GB/mo
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">API calls:</span>
                      <span className="ml-auto">${tier.apiPrice}/call</span>
                    </div>
                  </div>
                </div>
                <button
                  className={`w-full rounded-lg px-4 py-3 font-medium transition-colors ${
                    tier.popular
                      ? "bg-violet-600 text-white hover:bg-violet-700"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="relative rounded-2xl p-8 shadow-2xl shadow-violet-500/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Card background with gradient border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20" />
          <div className="absolute inset-[1px] rounded-2xl bg-white/95 backdrop-blur-sm dark:bg-slate-800/95" />

          <div className="relative">
            <h3 className="mb-6 text-2xl font-bold">
              Estimate Your Monthly Cost
            </h3>

            <div className="space-y-8">
              <CustomSlider
                value={usage.users}
                min={1}
                max={100}
                step={1}
                onChange={(value) =>
                  setUsage((prev) => ({ ...prev, users: value }))
                }
                label="Team Members"
                valueLabel={`${usage.users} users`}
              />

              <CustomSlider
                value={usage.storage}
                min={10}
                max={5000}
                step={10}
                onChange={(value) =>
                  setUsage((prev) => ({ ...prev, storage: value }))
                }
                label="Storage"
                valueLabel={`${usage.storage} GB`}
              />

              <CustomSlider
                value={usage.apiCalls}
                min={100000}
                max={10000000}
                step={10000}
                onChange={(value) =>
                  setUsage((prev) => ({ ...prev, apiCalls: value }))
                }
                label="API Calls"
                valueLabel={`${formatNumber(usage.apiCalls)}`}
              />
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {pricingTiers.map((tier) => (
                <div
                  key={`estimate-${tier.name}`}
                  className={`group relative cursor-pointer rounded-xl p-4 transition-all duration-300 hover:scale-105 ${
                    tier.popular
                      ? "bg-gradient-to-br from-violet-500/10 to-indigo-500/10"
                      : "bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700/80"
                  }`}
                >
                  <div className="mb-1 font-medium">{tier.name}</div>
                  <div className="mb-2 text-2xl font-bold">
                    ${prices[tier.name]?.toFixed(2) || tier.basePrice}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Estimated monthly cost
                  </div>
                  <button className="mt-4 flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600">
                    See details
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
