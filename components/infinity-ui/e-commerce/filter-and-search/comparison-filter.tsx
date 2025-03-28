"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, X, ChevronDown, ChevronUp } from "lucide-react";

interface ComparisonOption {
  id: string;
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}

interface ComparisonGroup {
  id: string;
  label: string;
  options: ComparisonOption[];
}

interface ComparisonFilterProps {
  leftGroups: ComparisonGroup[];
  rightGroups: ComparisonGroup[];
  onChange: (comparisons: Array<{ left: string; right: string }>) => void;
  initialComparisons?: Array<{ left: string; right: string }>;
  title?: string;
  subtitle?: string;
  maxComparisons?: number;
}

const ComparisonFilter = ({
  leftGroups,
  rightGroups,
  onChange,
  initialComparisons = [],
  title = "Compare Options",
  subtitle,
  maxComparisons = 3,
}: ComparisonFilterProps) => {
  const [comparisons, setComparisons] =
    useState<Array<{ left: string; right: string }>>(initialComparisons);
  const [leftExpanded, setLeftExpanded] = useState<string | null>(
    leftGroups.length > 0 ? leftGroups[0].id : null,
  );
  const [rightExpanded, setRightExpanded] = useState<string | null>(
    rightGroups.length > 0 ? rightGroups[0].id : null,
  );
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [rightSelected, setRightSelected] = useState<string | null>(null);

  useEffect(() => {
    onChange(comparisons);
  }, [comparisons, onChange]);

  const toggleLeftGroup = (groupId: string) => {
    setLeftExpanded((prev) => (prev === groupId ? null : groupId));
  };

  const toggleRightGroup = (groupId: string) => {
    setRightExpanded((prev) => (prev === groupId ? null : groupId));
  };

  const selectLeftOption = (optionId: string) => {
    setLeftSelected(optionId);

    // If right is already selected, create a comparison
    if (rightSelected) {
      addComparison(optionId, rightSelected);
      setLeftSelected(null);
      setRightSelected(null);
    }
  };

  const selectRightOption = (optionId: string) => {
    setRightSelected(optionId);

    // If left is already selected, create a comparison
    if (leftSelected) {
      addComparison(leftSelected, optionId);
      setLeftSelected(null);
      setRightSelected(null);
    }
  };

  const addComparison = (leftId: string, rightId: string) => {
    // Check if we've reached the maximum number of comparisons
    if (comparisons.length >= maxComparisons) {
      return;
    }

    // Check if this comparison already exists
    const exists = comparisons.some(
      (comp) => comp.left === leftId && comp.right === rightId,
    );

    if (!exists) {
      setComparisons((prev) => [...prev, { left: leftId, right: rightId }]);
    }
  };

  const removeComparison = (index: number) => {
    setComparisons((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllComparisons = () => {
    setComparisons([]);
  };

  const findOption = (optionId: string) => {
    for (const group of [...leftGroups, ...rightGroups]) {
      const option = group.options.find((opt) => opt.id === optionId);
      if (option) return option;
    }
    return null;
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
            )}
          </div>
          {comparisons.length > 0 && (
            <button
              onClick={clearAllComparisons}
              className="flex items-center text-sm text-indigo-600 transition-colors hover:text-indigo-800"
            >
              <X size={16} className="mr-1" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Comparisons */}
      {comparisons.length > 0 && (
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <h4 className="mb-3 text-sm font-medium text-gray-700">
            Your Comparisons:
          </h4>
          <div className="space-y-2">
            <AnimatePresence>
              {comparisons.map((comparison, index) => {
                const leftOption = findOption(comparison.left);
                const rightOption = findOption(comparison.right);

                if (!leftOption || !rightOption) return null;

                return (
                  <motion.div
                    key={`${comparison.left}-${comparison.right}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center rounded-lg border border-gray-200 bg-white p-3"
                  >
                    <div className="flex flex-1 items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        {leftOption.icon || leftOption.label.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">
                        {leftOption.label}
                      </span>
                    </div>

                    <ArrowRight size={20} className="mx-4 text-gray-400" />

                    <div className="flex flex-1 items-center">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                        {rightOption.icon || rightOption.label.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">
                        {rightOption.label}
                      </span>
                    </div>

                    <button
                      onClick={() => removeComparison(index)}
                      className="ml-2 rounded-full p-1 hover:bg-gray-100"
                    >
                      <X size={16} className="text-gray-500" />
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Selection area */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Left column */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50 p-3">
              <h4 className="text-sm font-medium text-gray-700">
                Select First Option
              </h4>
              {leftSelected && (
                <div className="mt-2 text-xs text-indigo-600">
                  {findOption(leftSelected)?.label} selected
                </div>
              )}
            </div>
            <div className="divide-y divide-gray-200">
              {leftGroups.map((group) => (
                <div key={group.id} className="overflow-hidden">
                  <button
                    onClick={() => toggleLeftGroup(group.id)}
                    className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-800">
                      {group.label}
                    </span>
                    {leftExpanded === group.id ? (
                      <ChevronUp size={16} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {leftExpanded === group.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 bg-gray-50 p-3">
                          {group.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => selectLeftOption(option.id)}
                              className={`flex w-full items-center rounded-md p-2 ${
                                leftSelected === option.id
                                  ? "bg-indigo-100 text-indigo-800"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {option.icon && (
                                <span className="mr-2">{option.icon}</span>
                              )}
                              <span>{option.label}</span>
                              {leftSelected === option.id && (
                                <Check
                                  size={16}
                                  className="ml-auto text-indigo-600"
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50 p-3">
              <h4 className="text-sm font-medium text-gray-700">
                Select Second Option
              </h4>
              {rightSelected && (
                <div className="mt-2 text-xs text-indigo-600">
                  {findOption(rightSelected)?.label} selected
                </div>
              )}
            </div>
            <div className="divide-y divide-gray-200">
              {rightGroups.map((group) => (
                <div key={group.id} className="overflow-hidden">
                  <button
                    onClick={() => toggleRightGroup(group.id)}
                    className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-800">
                      {group.label}
                    </span>
                    {rightExpanded === group.id ? (
                      <ChevronUp size={16} className="text-gray-500" />
                    ) : (
                      <ChevronDown size={16} className="text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {rightExpanded === group.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-2 bg-gray-50 p-3">
                          {group.options.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => selectRightOption(option.id)}
                              className={`flex w-full items-center rounded-md p-2 ${
                                rightSelected === option.id
                                  ? "bg-indigo-100 text-indigo-800"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {option.icon && (
                                <span className="mr-2">{option.icon}</span>
                              )}
                              <span>{option.label}</span>
                              {rightSelected === option.id && (
                                <Check
                                  size={16}
                                  className="ml-auto text-indigo-600"
                                />
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>

        {comparisons.length < maxComparisons ? (
          <p className="mt-4 text-sm text-gray-500">
            Select one option from each column to create a comparison. You can
            add up to {maxComparisons} comparisons.
          </p>
        ) : (
          <p className="mt-4 text-sm text-red-500">
            You&apos;ve reached the maximum of {maxComparisons} comparisons.
            Remove one to add another.
          </p>
        )}
      </div>
    </div>
  );
};

export default ComparisonFilter;
