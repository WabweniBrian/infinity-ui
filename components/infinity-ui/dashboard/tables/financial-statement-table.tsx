"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  Info,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const FinancialStatementTable = () => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    revenue: true,
    expenses: true,
    otherIncome: true,
    taxes: true,
  });

  const [period, setPeriod] = useState("Q1 2023");
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Financial data with row and column spanning
  const financialData = {
    companyName: "Wabtech Corps",
    periods: ["Q1 2023", "Q4 2022", "Q3 2022", "Q2 2022"],
    sections: [
      {
        id: "revenue",
        title: "Revenue",
        items: [
          {
            name: "Product Sales",
            values: [1250000, 1150000, 980000, 920000],
            tooltip: "Revenue generated from direct product sales",
          },
          {
            name: "Service Revenue",
            values: [850000, 820000, 790000, 700000],
            tooltip: "Revenue generated from services and subscriptions",
          },
          {
            name: "Licensing",
            values: [320000, 300000, 280000, 250000],
            tooltip: "Revenue from intellectual property licensing",
          },
        ],
      },
      {
        id: "expenses",
        title: "Expenses",
        items: [
          {
            name: "Cost of Goods Sold",
            values: [620000, 580000, 510000, 480000],
            tooltip:
              "Direct costs attributable to the production of goods sold",
          },
          {
            name: "Research & Development",
            values: [350000, 340000, 320000, 310000],
            tooltip: "Costs related to research and product development",
          },
          {
            name: "Sales & Marketing",
            values: [280000, 270000, 250000, 240000],
            tooltip: "Costs of promoting products and services",
          },
          {
            name: "General & Administrative",
            values: [190000, 185000, 180000, 170000],
            tooltip: "Overhead costs not directly tied to production",
          },
          {
            name: "Depreciation & Amortization",
            values: [120000, 115000, 110000, 105000],
            tooltip: "Allocation of costs for tangible and intangible assets",
          },
        ],
      },
      {
        id: "otherIncome",
        title: "Other Income",
        items: [
          {
            name: "Interest Income",
            values: [45000, 42000, 40000, 38000],
            tooltip: "Income earned from investments and deposits",
          },
          {
            name: "Foreign Exchange Gain/(Loss)",
            values: [-15000, 25000, -10000, 15000],
            tooltip: "Gains or losses from foreign currency transactions",
          },
        ],
      },
      {
        id: "taxes",
        title: "Taxes",
        items: [
          {
            name: "Income Tax Expense",
            values: [220000, 210000, 180000, 170000],
            tooltip: "Taxes paid on corporate income",
          },
        ],
      },
    ],
  };

  // Calculate totals
  const calculateSectionTotal = (sectionId: string, periodIndex: number) => {
    const section = financialData.sections.find((s) => s.id === sectionId);
    if (!section) return 0;

    return section.items.reduce(
      (total, item) => total + item.values[periodIndex],
      0,
    );
  };

  const calculateGrossProfit = (periodIndex: number) => {
    const revenue = calculateSectionTotal("revenue", periodIndex);
    const cogs =
      financialData.sections
        .find((s) => s.id === "expenses")
        ?.items.find((i) => i.name === "Cost of Goods Sold")?.values[
        periodIndex
      ] || 0;

    return revenue - cogs;
  };

  const calculateOperatingIncome = (periodIndex: number) => {
    const revenue = calculateSectionTotal("revenue", periodIndex);
    const expenses = calculateSectionTotal("expenses", periodIndex);

    return revenue - expenses;
  };

  const calculateNetIncome = (periodIndex: number) => {
    const revenue = calculateSectionTotal("revenue", periodIndex);
    const expenses = calculateSectionTotal("expenses", periodIndex);
    const otherIncome = calculateSectionTotal("otherIncome", periodIndex);
    const taxes = calculateSectionTotal("taxes", periodIndex);

    return revenue - expenses + otherIncome - taxes;
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getPercentChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / Math.abs(previous)) * 100;
  };

  const selectedPeriodIndex = financialData.periods.indexOf(period);

  return (
    <div className="min-h-screen overflow-hidden bg-white px-4 py-10 dark:bg-gray-950">
      {/* DarkMode Toggle */}
      <DarkModeToggle />
      <div className="mx-auto max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex flex-col items-center justify-center border-b border-gray-200 p-6 text-center dark:border-gray-700 sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Income Statement
            </h2>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              {financialData.companyName}
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-3 sm:mt-0">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {financialData.periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <button className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Printer className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
            <button className="rounded-full p-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Download className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Item
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {period}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  vs Previous
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  % of Revenue
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
              {financialData.sections.map((section) => (
                <React.Fragment key={section.id}>
                  {/* Section Header */}
                  <tr className="bg-gray-100 dark:bg-gray-700">
                    <td
                      colSpan={4}
                      className="cursor-pointer px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-center">
                        {expandedSections[section.id] ? (
                          <ChevronDown className="mr-2 h-4 w-4" />
                        ) : (
                          <ChevronUp className="mr-2 h-4 w-4" />
                        )}
                        {section.title}
                      </div>
                    </td>
                  </tr>

                  {/* Section Items */}
                  {expandedSections[section.id] &&
                    section.items.map((item, itemIndex) => {
                      const currentValue = item.values[selectedPeriodIndex];
                      const previousValue =
                        item.values[selectedPeriodIndex + 1] || 0;
                      const percentChange = getPercentChange(
                        currentValue,
                        previousValue,
                      );
                      const percentOfRevenue =
                        (currentValue /
                          calculateSectionTotal(
                            "revenue",
                            selectedPeriodIndex,
                          )) *
                        100;

                      return (
                        <tr
                          key={`${section.id}-${itemIndex}`}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                              <span>{item.name}</span>
                              <div className="relative">
                                <button
                                  className="ml-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                  onMouseEnter={() =>
                                    setShowTooltip(`${section.id}-${itemIndex}`)
                                  }
                                  onMouseLeave={() => setShowTooltip(null)}
                                >
                                  <Info className="h-4 w-4" />
                                </button>
                                {showTooltip ===
                                  `${section.id}-${itemIndex}` && (
                                  <div className="absolute left-8 top-0 z-10 w-64 rounded-lg bg-gray-900 p-3 text-sm text-white shadow-lg dark:bg-gray-800">
                                    <div className="whitespace-normal break-words">
                                      {item.tooltip}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                            {formatCurrency(currentValue)}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                            <div className="flex items-center justify-end">
                              {percentChange > 0 ? (
                                <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                              ) : percentChange < 0 ? (
                                <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                              ) : (
                                <span className="mr-1 h-4 w-4">—</span>
                              )}
                              <span
                                className={
                                  percentChange > 0
                                    ? "text-green-600 dark:text-green-400"
                                    : percentChange < 0
                                      ? "text-red-600 dark:text-red-400"
                                      : "text-gray-500 dark:text-gray-400"
                                }
                              >
                                {percentChange !== 0
                                  ? `${Math.abs(percentChange).toFixed(1)}%`
                                  : "—"}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500 dark:text-gray-400">
                            {percentOfRevenue.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}

                  {/* Section Total */}
                  {expandedSections[section.id] && (
                    <tr className="bg-gray-50 font-medium dark:bg-gray-700">
                      <td className="whitespace-nowrap px-6 py-3 text-sm text-gray-700 dark:text-gray-300">
                        Total {section.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-right text-sm text-gray-700 dark:text-gray-300">
                        {formatCurrency(
                          calculateSectionTotal(
                            section.id,
                            selectedPeriodIndex,
                          ),
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-right text-sm text-gray-700 dark:text-gray-300">
                        {selectedPeriodIndex <
                          financialData.periods.length - 1 && (
                          <div className="flex items-center justify-end">
                            {calculateSectionTotal(
                              section.id,
                              selectedPeriodIndex,
                            ) >
                            calculateSectionTotal(
                              section.id,
                              selectedPeriodIndex + 1,
                            ) ? (
                              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                            ) : (
                              <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                            )}
                            <span
                              className={
                                calculateSectionTotal(
                                  section.id,
                                  selectedPeriodIndex,
                                ) >
                                calculateSectionTotal(
                                  section.id,
                                  selectedPeriodIndex + 1,
                                )
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }
                            >
                              {Math.abs(
                                getPercentChange(
                                  calculateSectionTotal(
                                    section.id,
                                    selectedPeriodIndex,
                                  ),
                                  calculateSectionTotal(
                                    section.id,
                                    selectedPeriodIndex + 1,
                                  ),
                                ),
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-3 text-right text-sm text-gray-700 dark:text-gray-300">
                        {section.id === "revenue"
                          ? "100.0%"
                          : `${((calculateSectionTotal(section.id, selectedPeriodIndex) / calculateSectionTotal("revenue", selectedPeriodIndex)) * 100).toFixed(1)}%`}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

              {/* Summary Calculations */}
              <tr className="border-t-2 border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700">
                <td className="whitespace-nowrap px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                  Gross Profit
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(calculateGrossProfit(selectedPeriodIndex))}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold">
                  <div className="flex items-center justify-end">
                    {calculateGrossProfit(selectedPeriodIndex) >
                    calculateGrossProfit(selectedPeriodIndex + 1) ? (
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        calculateGrossProfit(selectedPeriodIndex) >
                        calculateGrossProfit(selectedPeriodIndex + 1)
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {Math.abs(
                        getPercentChange(
                          calculateGrossProfit(selectedPeriodIndex),
                          calculateGrossProfit(selectedPeriodIndex + 1),
                        ),
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  {(
                    (calculateGrossProfit(selectedPeriodIndex) /
                      calculateSectionTotal("revenue", selectedPeriodIndex)) *
                    100
                  ).toFixed(1)}
                  %
                </td>
              </tr>

              <tr className="bg-gray-100 dark:bg-gray-700">
                <td className="whitespace-nowrap px-6 py-3 text-sm font-semibold text-gray-900 dark:text-white">
                  Operating Income
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(
                    calculateOperatingIncome(selectedPeriodIndex),
                  )}
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold">
                  <div className="flex items-center justify-end">
                    {calculateOperatingIncome(selectedPeriodIndex) >
                    calculateOperatingIncome(selectedPeriodIndex + 1) ? (
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        calculateOperatingIncome(selectedPeriodIndex) >
                        calculateOperatingIncome(selectedPeriodIndex + 1)
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {Math.abs(
                        getPercentChange(
                          calculateOperatingIncome(selectedPeriodIndex),
                          calculateOperatingIncome(selectedPeriodIndex + 1),
                        ),
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">
                  {(
                    (calculateOperatingIncome(selectedPeriodIndex) /
                      calculateSectionTotal("revenue", selectedPeriodIndex)) *
                    100
                  ).toFixed(1)}
                  %
                </td>
              </tr>

              <tr className="border-t-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
                <td className="whitespace-nowrap px-6 py-4 text-base font-bold text-blue-900 dark:text-blue-100">
                  Net Income
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-base font-bold text-blue-900 dark:text-blue-100">
                  {formatCurrency(calculateNetIncome(selectedPeriodIndex))}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-base font-bold">
                  <div className="flex items-center justify-end">
                    {calculateNetIncome(selectedPeriodIndex) >
                    calculateNetIncome(selectedPeriodIndex + 1) ? (
                      <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        calculateNetIncome(selectedPeriodIndex) >
                        calculateNetIncome(selectedPeriodIndex + 1)
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }
                    >
                      {Math.abs(
                        getPercentChange(
                          calculateNetIncome(selectedPeriodIndex),
                          calculateNetIncome(selectedPeriodIndex + 1),
                        ),
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-base font-bold text-blue-900 dark:text-blue-100">
                  {(
                    (calculateNetIncome(selectedPeriodIndex) /
                      calculateSectionTotal("revenue", selectedPeriodIndex)) *
                    100
                  ).toFixed(1)}
                  %
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            All figures in USD
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-green-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Earnings Per Share:{" "}
              {formatCurrency(
                calculateNetIncome(selectedPeriodIndex) / 10000000,
              ).replace("$", "")}
            </span>
          </div>
        </div>
      </div>
      <style jsx>{`
        ::-webkit-scrollbar {
          height: 0.5rem;
          width: 0.5rem;
          background-color: transparent;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 1rem;
          background-color: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default FinancialStatementTable;
