"use client";

import { useEffect, useRef, useState } from "react";
import { BsChevronExpand, BsSearch } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  icon?: JSX.Element;
}

interface SelectProps {
  options: Option[];
  icon?: JSX.Element;
  text?: string;
  invalid?: boolean;
  onSelect: (selectedValue: string) => void;
  defaultValue?: string;
  className?: string;
  containerClassName?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  icon,
  text = "Select an option",
  invalid = false,
  onSelect,
  defaultValue,
  className,
  containerClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    options.find((option) => option.value === defaultValue) || null,
  );
  const [searchValue, setSearchValue] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);

  // Calculate dropdown position based on available space
  const calculateDropdownPosition = () => {
    if (!selectRef.current) return "below";

    const buttonRect = selectRef.current.getBoundingClientRect();
    const dropdownHeight = 320; // Max height for the dropdown

    const spaceBelow = window.innerHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;

    if (spaceBelow >= dropdownHeight || spaceBelow > spaceAbove) {
      return "below"; // Enough space below or more than above, position below
    } else {
      return "above"; // Not enough space below, position above
    }
  };

  const [dropdownPosition, setDropdownPosition] = useState<"above" | "below">(
    "below",
  );

  // Update dropdown position when isOpen changes
  useEffect(() => {
    setDropdownPosition(calculateDropdownPosition());
  }, [isOpen]);

  // Toggle the dropdown's visibility
  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setSearchValue("");
  };

  // Select an option and close the dropdown
  const handleSelectOption = (option: Option) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  // Handle input change for search functionality
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Filter options based on search value
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // Handle clicks outside the component to close the dropdown
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchValue("");
      }
    };

    // Handle Escape key press to close the dropdown
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    // Add event listeners
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    // Clean up event listeners
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div ref={selectRef} className="!font-questrial relative">
      <button
        type="button"
        className={cn(
          "relative z-10 flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-slate-300 bg-transparent py-[10px] pl-3 pr-4 text-left shadow-sm focus:!border-transparent focus:outline-none focus:ring-2 focus:ring-brand dark:border-slate-700",
          icon && "pl-8",
          invalid ? "!border-transparent !ring-2 !ring-red-600" : "",
          className,
        )}
        onClick={handleToggle}
      >
        {icon && (
          <div
            className={`absolute left-2 top-1/2 -translate-y-1/2 ${
              invalid ? "text-red-600 !opacity-100" : ""
            }`}
          >
            {icon}
          </div>
        )}
        <span className="mr-2">
          {selectedOption ? (
            selectedOption.label
          ) : (
            <span
              className={`mr-2 text-sm text-zinc-400 dark:text-zinc-200 ${
                invalid ? "!text-red-600 !opacity-100" : ""
              }`}
            >
              {text}
            </span>
          )}
        </span>
        <BsChevronExpand />
      </button>
      {isOpen && (
        <motion.div
          className={`absolute right-0 z-[999] w-full min-w-[200px] rounded-lg border bg-background shadow-sm ${
            dropdownPosition === "above" ? "bottom-full mb-1" : "top-full mt-1"
          }`}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={dropdownVariants}
        >
          <div className="relative">
            <BsSearch className="absolute left-2 top-1/2 mr-2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              className="w-full border-b border-zinc-300 bg-transparent p-2 pl-10 text-slate-500 focus:outline-none dark:border-zinc-600 dark:text-slate-200"
              placeholder="Search options..."
              value={searchValue}
              onChange={handleInputChange}
              autoFocus
            />
          </div>
          <ul
            className={cn(
              "scrollbar max-h-[200px] overflow-y-auto py-2",
              containerClassName,
            )}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 ${
                    selectedOption?.value === option.value
                      ? "bg-brand hover:!bg-brand"
                      : ""
                  }`}
                  onClick={() => handleSelectOption(option)}
                >
                  <div className="flex items-center gap-x-2">
                    {option.icon && (
                      <span className="mr-2 shrink-0">{option.icon}</span>
                    )}
                    <span
                      className={`shrink-0 text-slate-500 dark:text-slate-200 ${
                        selectedOption?.value === option.value
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {option.label}
                    </span>
                  </div>
                  {selectedOption?.value === option.value && (
                    <FiCheck className="ml-2 text-white" />
                  )}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-slate-500 opacity-80 dark:text-slate-200">
                No options found.
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Select;
