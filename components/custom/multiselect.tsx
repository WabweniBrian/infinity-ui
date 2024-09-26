"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { BsChevronExpand, BsSearch, BsX } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import Tooltip from "../common/tooltip";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
  icon?: JSX.Element;
}

interface MultiSelectProps {
  checkbox?: boolean;
  text?: string;
  options: Option[];
  onSelect: (selectedValues: string[]) => void;
  selectedValues?: string[];
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  text = "Select an option",
  onSelect,
  checkbox = false,
  selectedValues,
  className,
  containerClassName,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    options.filter((option) => selectedValues?.includes(option.value)) || [],
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

  // Select or deselect an option
  const handleSelectOption = (option: Option) => {
    const isOptionSelected = selectedOptions.some(
      (selectedOption) => selectedOption.value === option.value,
    );

    if (isOptionSelected) {
      const updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption.value !== option.value,
      );
      setSelectedOptions(updatedOptions);
    } else {
      const updatedOptions = [...selectedOptions, option];
      setSelectedOptions(updatedOptions);
    }
  };

  const optionValues = options.map((option) => option.value);
  const selectedOptionValues = selectedOptions.map((option) => option.value);

  // Select/deselect all
  const handleSelectAll = () => {
    if (optionValues.every((option) => selectedOptionValues.includes(option))) {
      setSelectedOptions([]);
    } else {
      const allOptions = options.map((option) => ({
        value: option.value,
        label: option.label,
      }));
      setSelectedOptions(allOptions);
    }
  };

  // Remove a selected option
  const handleRemoveOption = (option: Option) => {
    const updatedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption.value !== option.value,
    );
    setSelectedOptions(updatedOptions);
  };

  // Handle input change for search functionality
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Filter options based on search value
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // Memoize the onSelect callback to avoid unnecessary re-renders
  const memoizedOnSelect = useCallback((selectedValues: string[]) => {
    onSelect(selectedValues);
  }, []);

  // Call the onSelect callback when selectedOptions change
  useEffect(() => {
    const selectedValues = selectedOptions.map((option) => option.value);
    memoizedOnSelect(selectedValues);
  }, [selectedOptions, memoizedOnSelect]);

  // Handle clicks outside the component to close the dropdown
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
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
    <div ref={selectRef} className="relative">
      <button
        type="button"
        className={cn(
          "relative z-10 flex w-full cursor-pointer items-center justify-between rounded-lg border border-slate-300 bg-transparent py-[10px] pl-3 pr-4 text-left shadow-sm focus:!border-transparent focus:outline-none focus:ring-2 focus:ring-brand disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700",
          className,
        )}
        onClick={handleToggle}
        disabled={disabled}
      >
        {selectedOptions.length ? (
          <div className="flex flex-wrap gap-2">
            {selectedOptions?.map((option) => (
              <div
                key={option.value}
                className="flex items-center justify-center rounded-full bg-slate-200 px-2 py-1 text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-200"
              >
                {option.label}
                <BsX
                  className="ml-1 cursor-pointer rounded-full hover:bg-slate-300 dark:hover:bg-slate-500"
                  onClick={() => handleRemoveOption(option)}
                />
              </div>
            ))}
          </div>
        ) : (
          <span className="mr-2 text-sm text-zinc-400 dark:text-zinc-200">
            {text}
          </span>
        )}
        <BsChevronExpand className="shrink-0 text-slate-400 dark:text-slate-200" />
      </button>
      {isOpen && (
        <motion.div
          className={cn(
            "absolute z-[999] w-full rounded-md border border-border bg-background shadow-sm",
            dropdownPosition === "above" ? "bottom-full mb-1" : "top-full mt-1",
          )}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={dropdownVariants}
        >
          <div className="relative">
            <BsSearch className="absolute left-2 top-1/2 mr-2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              className="w-full border-b border-border bg-transparent p-2 pl-10 pr-8 text-slate-400 focus:outline-none dark:text-slate-200"
              placeholder="Search options..."
              value={searchValue}
              onChange={handleInputChange}
              autoFocus
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Tooltip
                text={
                  optionValues.every((option) =>
                    selectedOptionValues.includes(option),
                  )
                    ? "Unselect all"
                    : "Select all"
                }
              >
                <input
                  type="checkbox"
                  checked={optionValues.every((option) =>
                    selectedOptionValues.includes(option),
                  )}
                  onChange={handleSelectAll}
                  className="cursor-pointer"
                />
              </Tooltip>
            </div>
          </div>
          <ul
            className={cn(
              "scrollbar max-h-[200px] overflow-y-auto py-2",
              containerClassName,
            )}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) =>
                checkbox ? (
                  <li
                    key={option.value}
                    className={`group cursor-pointer px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-800`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <div className="flex items-center gap-x-2">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={selectedOptions.some(
                          (selectedOption) =>
                            selectedOption.value === option.value,
                        )}
                        readOnly
                      />
                      {option.icon && (
                        <span className="mr-2">{option.icon}</span>
                      )}
                      <span className="text-slate-500 dark:text-slate-200">
                        {option.label}
                      </span>
                    </div>
                  </li>
                ) : (
                  <li
                    key={option.value}
                    className={`flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-800 ${
                      selectedOptions.some(
                        (selectedOption) =>
                          selectedOption.value === option.value,
                      )
                        ? "bg-slate-200 dark:bg-slate-800"
                        : ""
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    <div className="flex items-center gap-x-2">
                      {option.icon && (
                        <span className="mr-2">{option.icon}</span>
                      )}
                      <span className="text-slate-500 dark:text-slate-200">
                        {option.label}
                      </span>
                    </div>
                    {selectedOptions.some(
                      (selectedOption) => selectedOption.value === option.value,
                    ) && (
                      <FiCheck className="ml-2 text-slate-500 dark:text-slate-200" />
                    )}
                  </li>
                ),
              )
            ) : (
              <li className="px-3 py-2 text-slate-400 opacity-80 dark:text-slate-200">
                No options found.
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default MultiSelect;
