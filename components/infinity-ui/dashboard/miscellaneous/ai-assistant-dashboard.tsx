"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  User,
  Send,
  Sparkles,
  Lightbulb,
  BarChart,
  PieChart,
  LineChart,
  Zap,
  X,
  Loader2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface Insight {
  id: string;
  title: string;
  description: string;
  type: "tip" | "alert" | "prediction";
  icon: React.ReactNode;
}

const AIAssistantDashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "insights">("chat");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockMessages: Message[] = [
          {
            id: "1",
            role: "assistant",
            content: "Hello! I'm your AI assistant. How can I help you today?",
            timestamp: new Date(
              new Date().setMinutes(new Date().getMinutes() - 30),
            ),
          },
          {
            id: "2",
            role: "user",
            content: "Can you show me the latest sales trends?",
            timestamp: new Date(
              new Date().setMinutes(new Date().getMinutes() - 29),
            ),
          },
          {
            id: "3",
            role: "assistant",
            content:
              "Based on the latest data, sales have increased by 15% compared to last month. The top-performing product category is Electronics, followed by Home & Kitchen.",
            timestamp: new Date(
              new Date().setMinutes(new Date().getMinutes() - 28),
            ),
          },
          {
            id: "4",
            role: "user",
            content: "What about customer satisfaction?",
            timestamp: new Date(
              new Date().setMinutes(new Date().getMinutes() - 15),
            ),
          },
          {
            id: "5",
            role: "assistant",
            content:
              "Customer satisfaction is currently at 92%, which is 3% higher than last quarter. The most positive feedback is about our new delivery service.",
            timestamp: new Date(
              new Date().setMinutes(new Date().getMinutes() - 14),
            ),
          },
        ];

        const mockInsights: Insight[] = [
          {
            id: "1",
            title: "Sales Opportunity",
            description:
              "Based on current trends, consider increasing inventory for Electronics by 20% for the upcoming holiday season.",
            type: "tip",
            icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
          },
          {
            id: "2",
            title: "Customer Behavior",
            description:
              "Users who purchase from the Home & Kitchen category are 45% more likely to return within 30 days.",
            type: "prediction",
            icon: <BarChart className="h-5 w-5 text-blue-500" />,
          },
          {
            id: "3",
            title: "Inventory Alert",
            description:
              "Smart watches are projected to run out of stock in the next 7 days based on current sales velocity.",
            type: "alert",
            icon: <Zap className="h-5 w-5 text-red-500" />,
          },
          {
            id: "4",
            title: "Marketing Suggestion",
            description:
              "Email campaigns sent on Tuesday mornings have shown a 23% higher open rate in the last 3 months.",
            type: "tip",
            icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
          },
        ];

        setMessages(mockMessages);
        setInsights(mockInsights);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on my analysis, your sales have increased by 18% this month compared to last month.",
        "I've detected a potential opportunity in your customer retention strategy. Would you like me to elaborate?",
        "Looking at the data, I can see that your website traffic has increased by 25% since implementing the new SEO strategy.",
        "I've analyzed your inventory levels and noticed that some products might run out of stock soon. Should I prepare a detailed report?",
        "Your customer satisfaction score is currently at 92%, which is above industry average. Great job!",
      ];

      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const dismissInsight = (id: string) => {
    setInsights((prev) => prev.filter((insight) => insight.id !== id));
  };

  return (
    <motion.div
      className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
              <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              AI Assistant
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              className={`rounded-md px-3 py-1 text-sm font-medium ${
                activeTab === "chat"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("chat")}
            >
              Chat
            </button>
            <button
              className={`rounded-md px-3 py-1 text-sm font-medium ${
                activeTab === "insights"
                  ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("insights")}
            >
              Insights {insights.length > 0 && `(${insights.length})`}
            </button>
          </div>
        </div>
      </div>

      <div className="h-[400px] overflow-hidden">
        {loading ? (
          <div className="flex h-full flex-col items-center justify-center">
            <motion.div
              className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-purple-500"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Loading your assistant...
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === "chat" ? (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex h-full flex-col"
              >
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.role === "user"
                              ? "bg-purple-600 text-white dark:bg-purple-700"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                                message.role === "user"
                                  ? "bg-purple-500 text-white"
                                  : "bg-white text-purple-600 dark:bg-gray-700 dark:text-purple-400"
                              }`}
                            >
                              {message.role === "user" ? (
                                <User className="h-3.5 w-3.5" />
                              ) : (
                                <Bot className="h-3.5 w-3.5" />
                              )}
                            </div>
                            <span className="text-xs font-medium">
                              {message.role === "user" ? "You" : "Assistant"}
                            </span>
                            <span className="text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm">{message.content}</p>
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="max-w-[80%] rounded-lg bg-gray-100 px-4 py-2 dark:bg-gray-800">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-purple-600 dark:bg-gray-700 dark:text-purple-400">
                              <Bot className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                              Assistant
                            </span>
                            <span className="text-xs text-gray-800 opacity-70 dark:text-gray-200">
                              {formatTime(new Date())}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center gap-1 text-gray-800 dark:text-gray-200">
                            <motion.div
                              className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 1,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            />
                            <motion.div
                              className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 1,
                                delay: 0.3,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            />
                            <motion.div
                              className="h-2 w-2 rounded-full bg-purple-600 dark:bg-purple-400"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 1,
                                delay: 0.6,
                                repeat: Number.POSITIVE_INFINITY,
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4 dark:border-gray-800">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything..."
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-purple-400 dark:focus:ring-purple-400"
                      disabled={isTyping}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 dark:bg-purple-700 dark:hover:bg-purple-600 dark:focus:ring-offset-gray-900"
                      type="submit"
                      disabled={!input.trim() || isTyping}
                    >
                      {isTyping ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </motion.button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="insights"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full overflow-y-auto p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    AI-Generated Insights
                  </h4>
                  <div className="flex h-6 items-center justify-center rounded-full bg-purple-100 px-2 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Updated today
                  </div>
                </div>

                {insights.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Lightbulb className="mb-2 h-12 w-12 text-gray-400" />
                    <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                      No insights yet
                    </h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Insights will appear here as your AI assistant analyzes
                      your data
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {insights.map((insight, index) => (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                      >
                        <button
                          className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                          onClick={() => dismissInsight(insight.id)}
                        >
                          <X className="h-4 w-4" />
                        </button>

                        <div className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                            {insight.icon}
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 dark:text-white">
                              {insight.title}
                            </h5>
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                              {insight.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex justify-end">
                          <button className="text-xs font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
                            Learn more
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

export default AIAssistantDashboard;
