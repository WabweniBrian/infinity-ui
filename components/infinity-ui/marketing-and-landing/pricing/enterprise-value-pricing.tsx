"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

interface EnterpriseFeature {
  title: string;
  description: string;
}

const enterpriseFeatures: EnterpriseFeature[] = [
  {
    title: "Dedicated Account Management",
    description: "A personal point of contact for all your needs",
  },
  {
    title: "Custom Integrations",
    description: "Connect with your existing tools and workflows",
  },
  {
    title: "Advanced Security & Compliance",
    description: "Enterprise-grade security with custom compliance options",
  },
  {
    title: "SLA Guarantees",
    description: "99.99% uptime with financial guarantees",
  },
  {
    title: "Priority Support",
    description: "24/7 support with 1-hour response time",
  },
  {
    title: "Custom Training",
    description: "Personalized onboarding and training for your team",
  },
  {
    title: "Unlimited Resources",
    description: "No limits on usage, storage, or API calls",
  },
  {
    title: "Advanced Analytics",
    description: "Custom reports and dashboards for your business",
  },
];

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

// Custom tabs component
const CustomTabs = ({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (id: string) => void;
}) => {
  return (
    <div className="mb-6 flex border-b border-slate-200 dark:border-slate-700">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`relative px-4 py-2 text-sm font-medium ${
            activeTab === tab.id
              ? "text-violet-600 dark:text-violet-400"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-500 to-indigo-500"
              layoutId="activeTab"
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default function EnterpriseValuePricing() {
  const [employees, setEmployees] = useState<number>(100);
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(5);
  const [hourlyRate, setHourlyRate] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<string>("calculator");

  // Calculate ROI
  const calculateAnnualSavings = () => {
    return employees * hoursPerWeek * hourlyRate * 52;
  };

  const calculateROI = () => {
    const annualCost = 50000; // Example enterprise plan cost
    const annualSavings = calculateAnnualSavings();
    return ((annualSavings - annualCost) / annualCost) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="overflow-hidden bg-slate-50 py-24 dark:bg-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Background elements */}
        <div className="absolute right-0 top-0 h-1/3 w-1/3 rounded-full bg-gradient-to-br from-violet-300/10 to-indigo-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-gradient-to-tr from-violet-300/10 to-indigo-300/10 blur-3xl" />

        <div className="relative mb-16 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Enterprise Solutions
          </motion.h2>
          <motion.p
            className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Tailored solutions for organizations with complex needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl shadow-2xl shadow-violet-500/5">
              {/* Card background with gradient border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/30 to-indigo-500/30" />
              <div className="absolute inset-[1px] rounded-xl bg-white dark:bg-slate-800" />

              <div className="relative p-8">
                <h3 className="mb-6 text-2xl font-bold">Enterprise Plan</h3>
                <p className="mb-8 text-slate-600 dark:text-slate-400">
                  Customized solutions for large organizations with advanced
                  needs and dedicated support.
                </p>

                <div className="mb-8">
                  <div className="mb-2 text-4xl font-bold">Custom Pricing</div>
                  <p className="text-slate-600 dark:text-slate-400">
                    Tailored to your specific requirements
                  </p>
                </div>

                <button className="mb-8 w-full rounded-lg bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:from-slate-900 hover:to-black hover:shadow-xl dark:bg-slate-700 dark:hover:bg-slate-600">
                  Contact Sales
                </button>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {enterpriseFeatures.map((feature, index) => (
                    <div key={index} className="flex">
                      <div className="mt-1 flex-shrink-0">
                        <span className="h-5 w-5 text-green-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        </span>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">{feature.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative bg-slate-50 p-6 dark:bg-slate-700/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 rounded-lg bg-violet-100 p-2 dark:bg-violet-900/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-violet-600 dark:text-violet-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Implementation Time</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        2-4 weeks
                      </p>
                    </div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-slate-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl shadow-2xl shadow-violet-500/5">
              {/* Card background with gradient border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/30 to-indigo-500/30" />
              <div className="absolute inset-[1px] rounded-xl bg-white dark:bg-slate-800" />

              <div className="relative p-8">
                <h3 className="mb-6 text-2xl font-bold">ROI Calculator</h3>
                <p className="mb-8 text-slate-600 dark:text-slate-400">
                  See how much your organization can save by implementing our
                  enterprise solution.
                </p>

                <CustomTabs
                  tabs={[
                    { id: "calculator", label: "Calculator" },
                    { id: "results", label: "Results" },
                  ]}
                  activeTab={activeTab}
                  onChange={setActiveTab}
                />

                {activeTab === "calculator" ? (
                  <div className="space-y-6">
                    <CustomSlider
                      value={employees}
                      min={10}
                      max={1000}
                      step={10}
                      onChange={setEmployees}
                      label="Number of Employees"
                      valueLabel={`${employees}`}
                    />

                    <CustomSlider
                      value={hoursPerWeek}
                      min={1}
                      max={20}
                      step={1}
                      onChange={setHoursPerWeek}
                      label="Hours Saved Per Employee (Weekly)"
                      valueLabel={`${hoursPerWeek} hours`}
                    />

                    <div>
                      <label
                        htmlFor="hourlyRate"
                        className="mb-2 block text-sm font-medium"
                      >
                        Average Hourly Rate
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-500">
                          $
                        </div>
                        <input
                          id="hourlyRate"
                          type="number"
                          value={hourlyRate}
                          onChange={(e) =>
                            setHourlyRate(Number(e.target.value))
                          }
                          className="w-full rounded-lg border border-slate-300 bg-white py-2 pl-9 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-violet-400"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="rounded-lg bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-4">
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="2"
                            y="3"
                            width="20"
                            height="14"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="8" y1="21" x2="16" y2="21"></line>
                          <line x1="12" y1="17" x2="12" y2="21"></line>
                        </svg>
                        <h4 className="font-medium">Annual Savings</h4>
                      </div>
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {formatCurrency(calculateAnnualSavings())}
                      </div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Based on {employees} employees saving {hoursPerWeek}{" "}
                        hours per week
                      </p>
                    </div>

                    <div className="rounded-lg bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-4">
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          <polyline points="17 6 23 6 23 12"></polyline>
                        </svg>
                        <h4 className="font-medium">ROI</h4>
                      </div>
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {calculateROI().toFixed(0)}%
                      </div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Return on investment in the first year
                      </p>
                    </div>

                    <div className="rounded-lg bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-4">
                      <div className="mb-2 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2 h-5 w-5 text-violet-600 dark:text-violet-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <h4 className="font-medium">Payback Period</h4>
                      </div>
                      <div className="text-3xl font-bold">
                        {Math.ceil(50000 / (calculateAnnualSavings() / 12))}{" "}
                        months
                      </div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        Time to recoup your investment
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="mb-1 font-medium">
                      Ready to see how much you can save?
                    </h4>
                    <p className="text-sm text-violet-100">
                      Schedule a personalized demo with our team
                    </p>
                  </div>
                  <button className="rounded-lg bg-white px-4 py-2 font-medium text-violet-600 transition-colors hover:bg-violet-50">
                    Book Demo
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
