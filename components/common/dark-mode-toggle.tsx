"use client";

import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DarkModeToggle = ({ className }: { className?: string }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={cn("fixed right-3 top-3 z-40", className)}>
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="h-8 w-8 rounded-full border bg-white text-gray-600 drop-shadow-md transition-colors duration-200 flex-center-center hover:bg-gray-100 hover:text-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
};

export default DarkModeToggle;
