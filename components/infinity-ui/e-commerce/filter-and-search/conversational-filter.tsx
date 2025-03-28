"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Trash2, MessageSquare, User, Bot, X } from "lucide-react";

interface FilterOption {
  id: string;
  type: string;
  value: string | number | boolean;
  label: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  options?: FilterOption[];
}

interface ConversationalFilterProps {
  onFilterChange: (filters: FilterOption[]) => void;
  initialMessage?: string;
  suggestions?: string[];
  placeholderText?: string;
}

const ConversationalFilter = ({
  onFilterChange,
  initialMessage = "What are you looking for today?",
  suggestions = [
    "I want shoes under $100",
    "Show me red dresses in size M",
    "I need a waterproof jacket",
    "Looking for gifts under $50",
  ],
  placeholderText = "Describe what you&apos;re looking for...",
}: ConversationalFilterProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with bot welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          text: initialMessage,
          sender: "bot",
          timestamp: new Date(),
          options: [],
        },
      ]);
    }
  }, [initialMessage, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Notify parent component when filters change
  useEffect(() => {
    onFilterChange(selectedFilters);
  }, [selectedFilters, onFilterChange]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate processing and bot response
    setTimeout(() => {
      const botResponse = processUserInput(inputValue);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const processUserInput = (input: string): Message => {
    const lowercaseInput = input.toLowerCase();
    const newFilters: FilterOption[] = [];

    // Process price filters
    const priceMatch =
      lowercaseInput.match(/under \$(\d+)/) ||
      lowercaseInput.match(/less than \$(\d+)/);
    if (priceMatch && priceMatch[1]) {
      newFilters.push({
        id: `price-${Date.now()}`,
        type: "price",
        value: Number.parseInt(priceMatch[1]),
        label: `Under $${priceMatch[1]}`,
      });
    }

    // Process color filters
    const colors = [
      "red",
      "blue",
      "green",
      "black",
      "white",
      "yellow",
      "purple",
      "pink",
      "orange",
      "brown",
    ];
    colors.forEach((color) => {
      if (lowercaseInput.includes(color)) {
        newFilters.push({
          id: `color-${Date.now()}-${color}`,
          type: "color",
          value: color,
          label: `Color: ${color.charAt(0).toUpperCase() + color.slice(1)}`,
        });
      }
    });

    // Process size filters
    const sizes = [
      "xs",
      "small",
      "s",
      "medium",
      "m",
      "large",
      "l",
      "xl",
      "xxl",
      "2xl",
    ];
    sizes.forEach((size) => {
      const sizeRegex = new RegExp(`\\b${size}\\b`, "i");
      if (sizeRegex.test(lowercaseInput)) {
        const sizeLabel = size.toUpperCase();
        newFilters.push({
          id: `size-${Date.now()}-${size}`,
          type: "size",
          value: size,
          label: `Size: ${sizeLabel}`,
        });
      }
    });

    // Process category filters
    const categories = [
      "shoes",
      "sneakers",
      "boots",
      "sandals",
      "dresses",
      "shirts",
      "pants",
      "jeans",
      "jackets",
      "coats",
      "accessories",
      "watches",
      "jewelry",
      "bags",
      "backpacks",
      "electronics",
      "phones",
      "laptops",
      "cameras",
      "home",
      "furniture",
      "kitchen",
      "bedding",
      "beauty",
      "skincare",
      "makeup",
      "fragrance",
      "gifts",
      "toys",
      "books",
      "games",
    ];

    categories.forEach((category) => {
      const categoryRegex = new RegExp(`\\b${category}\\b`, "i");
      if (categoryRegex.test(lowercaseInput)) {
        newFilters.push({
          id: `category-${Date.now()}-${category}`,
          type: "category",
          value: category,
          label: `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`,
        });
      }
    });

    // Process features
    const features = [
      "waterproof",
      "wireless",
      "bluetooth",
      "leather",
      "cotton",
      "wool",
      "silk",
      "organic",
      "recycled",
      "vegan",
      "gluten-free",
      "sustainable",
      "handmade",
      "limited edition",
      "sale",
      "discount",
      "new arrival",
    ];

    features.forEach((feature) => {
      const featureRegex = new RegExp(`\\b${feature}\\b`, "i");
      if (featureRegex.test(lowercaseInput)) {
        newFilters.push({
          id: `feature-${Date.now()}-${feature}`,
          type: "feature",
          value: feature,
          label: `Feature: ${feature.charAt(0).toUpperCase() + feature.slice(1)}`,
        });
      }
    });

    // Update selected filters
    setSelectedFilters((prev) => [...prev, ...newFilters]);

    // Generate response text
    let responseText = "";
    if (newFilters.length > 0) {
      responseText = `I found ${newFilters.length} filter${newFilters.length > 1 ? "s" : ""} based on your request: ${newFilters.map((f) => f.label).join(", ")}. Here are some products that match.`;
    } else {
      responseText =
        "I couldn't identify specific filters from your request. Could you be more specific about what you&apos;re looking for? For example, try mentioning colors, sizes, price ranges, or product categories.";
    }

    return {
      id: `bot-${Date.now()}`,
      text: responseText,
      sender: "bot",
      timestamp: new Date(),
      options: newFilters,
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const removeFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.filter((filter) => filter.id !== filterId),
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters([]);
  };

  return (
    <div className="flex h-[500px] w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center">
          <MessageSquare size={20} className="mr-2 text-indigo-600" />
          <h3 className="font-medium text-gray-800">Filter Assistant</h3>
        </div>
        {selectedFilters.length > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center text-sm text-gray-600 hover:text-gray-800"
          >
            <Trash2 size={16} className="mr-1" />
            Clear filters
          </button>
        )}
      </div>

      {/* Selected filters */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 border-b border-gray-200 bg-gray-50 p-3">
          <AnimatePresence>
            {selectedFilters.map((filter) => (
              <motion.div
                key={filter.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-1 text-sm text-indigo-800"
              >
                {filter.label}
                <button
                  onClick={() => removeFilter(filter.id)}
                  className="ml-1.5 rounded-full p-0.5 transition-colors hover:bg-indigo-200"
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="mb-1 flex items-start">
                  <div
                    className={`mr-2 rounded-full p-1 ${message.sender === "user" ? "bg-indigo-500" : "bg-gray-300"}`}
                  >
                    {message.sender === "user" ? (
                      <User size={14} className="text-white" />
                    ) : (
                      <Bot size={14} className="text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
                <div className="mt-1 text-right text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg bg-gray-100 p-3">
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1,
                      delay: 0,
                    }}
                    className="h-2 w-2 rounded-full bg-gray-400"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1,
                      delay: 0.2,
                    }}
                    className="h-2 w-2 rounded-full bg-gray-400"
                  />
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 1,
                      delay: 0.4,
                    }}
                    className="h-2 w-2 rounded-full bg-gray-400"
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && messages.length < 3 && (
        <div className="border-t border-gray-200 bg-gray-50 p-3">
          <p className="mb-2 text-xs text-gray-500">Try asking for:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm transition-colors hover:bg-gray-50"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 p-3">
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholderText}
            className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="rounded-r-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationalFilter;
