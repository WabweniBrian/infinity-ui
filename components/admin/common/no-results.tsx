"use client";

import type React from "react";
import { SearchX, Filter, FileQuestion, RefreshCw } from "lucide-react";

interface NoResultsProps {
  title?: string;
  message?: string;
  suggestion?: string;
  type?: "search" | "filter" | "empty" | "custom";
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const NoResults = ({
  title,
  message,
  suggestion,
  type = "search",
  icon,
  action,
  className = "",
}: NoResultsProps) => {
  // Default content based on type
  const defaultContent = {
    search: {
      title: "No results found",
      message: "We couldn't find what you&apos;re looking for",
      suggestion: "Try using different keywords or check for typos",
      icon: <SearchX className="h-12 w-12 text-gray-400" />,
    },
    filter: {
      title: "No matching results",
      message: "No items match your current filters",
      suggestion: "Try adjusting or clearing your filters",
      icon: <Filter className="h-12 w-12 text-gray-400" />,
    },
    empty: {
      title: "Nothing here yet",
      message: "This section is currently empty",
      suggestion: "Check back later or add something new",
      icon: <FileQuestion className="h-12 w-12 text-gray-400" />,
    },
  };
  // Use provided content or defaults
  const content =
    defaultContent[type as keyof typeof defaultContent] ||
    defaultContent.search;
  const displayTitle = title || content.title;
  const displayMessage = message || content.message;
  const displaySuggestion = suggestion || content.suggestion;
  const displayIcon = icon || content.icon;

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <div className="mb-6 flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
        {displayIcon}
      </div>

      <h3 className="mb-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
        {displayTitle}
      </h3>

      <p className="mb-1 max-w-md text-gray-500 dark:text-gray-400">
        {displayMessage}
      </p>

      {displaySuggestion && (
        <p className="mb-6 max-w-md text-sm text-gray-400 dark:text-gray-500">
          {displaySuggestion}
        </p>
      )}

      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <RefreshCw className="h-4 w-4" />
          {action.label}
        </button>
      )}
    </div>
  );
};

export default NoResults;
