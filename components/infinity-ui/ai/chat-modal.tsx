"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      text: "Hello! I'm your AI farming assistant. How can I help you today?",
      isUser: false,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages((prev) => [...prev, { text: chatInput, isUser: true }]);

    // Simulate AI response
    setTimeout(() => {
      let response =
        "I'm analyzing your question about farming practices. Let me provide some insights based on your farm data.";

      if (chatInput.toLowerCase().includes("pest")) {
        response =
          "Based on your crop data, I recommend an integrated pest management approach. For your corn showing signs of leaf blight, consider applying a fungicide like propiconazole. Would you like specific application rates?";
      } else if (chatInput.toLowerCase().includes("weather")) {
        response =
          "The forecast shows rain in 2 days. I suggest completing any fertilizer application before then to prevent runoff. The rainfall should be beneficial for your recently planted crops.";
      } else if (chatInput.toLowerCase().includes("soil")) {
        response =
          "Your soil analysis indicates slightly low nitrogen levels. Consider applying 40-50 lbs/acre of nitrogen to optimize corn growth in the North Field.";
      }

      setChatMessages((prev) => [...prev, { text: response, isUser: false }]);
      setChatInput("");
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          className="relative max-h-[80vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white/95 shadow-xl backdrop-blur-xl dark:bg-gray-800/95"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600 text-white">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-semibold dark:text-white">
                  AI Farming Assistant
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ask me anything about farming
                </p>
              </div>
            </div>
            <motion.button
              className="rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
          </div>

          <div className="h-[50vh] overflow-y-auto p-4">
            <div className="space-y-4">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isUser
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 dark:text-white"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          <div className="border-t border-gray-200 p-4 dark:border-gray-700">
            <form
              onSubmit={handleChatSubmit}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 rounded-xl border border-gray-300 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
                placeholder="Ask about crops, pests, weather, etc."
              />
              <motion.button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-2 text-white shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!chatInput.trim()}
              >
                <ArrowRight size={20} />
              </motion.button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatModal;
