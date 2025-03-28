"use client";

import {
  Agent,
  agents,
  AIInsight,
  aiInsights,
  AutomationRule,
  automationRules,
  insightData,
  knowledgeBase,
  Ticket,
  tickets,
} from "@/data/ai-cutomer-support";
import useMediaQuery from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  BookOpen,
  Clock,
  Calendar,
  Copy,
  Download,
  Edit,
  ExternalLink,
  Eye,
  Filter,
  Gauge,
  Inbox,
  LifeBuoy,
  Lightbulb,
  MessageSquare,
  Moon,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Settings,
  Sparkles,
  Sun,
  ThumbsUp,
  TrendingUp,
  User,
  Users,
  X,
  Zap,
  Check,
  ChevronDown,
  List,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AICustomerSupport() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketFilter, setTicketFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(tickets);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [draftResponse, setDraftResponse] = useState("");
  const [showAIPanel, setShowAIPanel] = useState(false);
  const [showKnowledgePanel, setShowKnowledgePanel] = useState(false);
  const [showCustomerPanel, setShowCustomerPanel] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showAgentDetails, setShowAgentDetails] = useState(false);
  const [showInsightDetails, setShowInsightDetails] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<AIInsight | null>(
    null,
  );
  const [showAutomationDetails, setShowAutomationDetails] = useState(false);
  const [selectedAutomation, setSelectedAutomation] =
    useState<AutomationRule | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const ticketContainerRef = useRef<HTMLDivElement>(null);
  const [expandedRule, setExpandedRule] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Effects
  useEffect(() => {
    // Check system preference for dark mode
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (ticketContainerRef.current && selectedTicket) {
      ticketContainerRef.current.scrollTop = 0;
    }
  }, [selectedTicket]);

  useEffect(() => {
    let filtered = [...tickets];

    // Apply status filter
    if (ticketFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === ticketFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          ticket.subject.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query) ||
          ticket.customer.name.toLowerCase().includes(query) ||
          ticket.customer.email.toLowerCase().includes(query) ||
          ticket.id.toLowerCase().includes(query) ||
          ticket.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    setFilteredTickets(filtered);
  }, [searchQuery, ticketFilter]);

  // Handlers
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    if (isMobile) {
      setShowMobileMenu(false);
    }
  };

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowAgentDetails(true);
  };

  const handleInsightClick = (insight: AIInsight) => {
    setSelectedInsight(insight);
    setShowInsightDetails(true);
  };

  const handleAutomationClick = (automation: AutomationRule) => {
    setSelectedAutomation(automation);
    setShowAutomationDetails(true);
  };

  const generateAIResponse = () => {
    if (selectedTicket) {
      setIsGeneratingResponse(true);

      // Find AI suggestion for this ticket
      const suggestion = selectedTicket.aiSuggestions?.find(
        (sugg) => sugg.type === "response" && !sugg.used,
      );

      // Simulate typing effect
      const response = suggestion
        ? suggestion.content
        : "Thank you for contacting our support team. I understand your concern and will help you resolve this issue promptly. Could you please provide more details about what you&apos;re experiencing?";
      let displayedResponse = "";

      const typingInterval = setInterval(() => {
        if (displayedResponse.length < response.length) {
          displayedResponse += response[displayedResponse.length];
          setDraftResponse(displayedResponse);
        } else {
          clearInterval(typingInterval);
          setIsGeneratingResponse(false);
        }
      }, 10);
    }
  };

  const sendResponse = () => {
    // Implementation goes here
    setDraftResponse("");
    setShowAIPanel(false);
  };

  const filterByStatus = (status: string) => {
    setTicketFilter(status);

    let filtered = [...tickets];
    if (status !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === status);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          ticket.subject.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query) ||
          ticket.customer.name.toLowerCase().includes(query) ||
          ticket.id.toLowerCase().includes(query),
      );
    }

    setFilteredTickets(filtered);
  };

  // Navigation items
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Gauge size={20} />,
    },
    { id: "tickets", label: "Tickets", icon: <MessageSquare size={20} /> },
    { id: "agents", label: "Agents", icon: <Users size={20} /> },
    { id: "insights", label: "Insights", icon: <TrendingUp size={20} /> },
    { id: "knowledge", label: "Knowledge Base", icon: <BookOpen size={20} /> },
    { id: "automations", label: "Automations", icon: <Zap size={20} /> },
  ];

  // Helper functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    }
  };

  const getFieldDisplayName = (field: string) => {
    const parts = field.split(".");
    return parts
      .map(
        (part) =>
          part.charAt(0).toUpperCase() + part.slice(1).replace(/_/g, " "),
      )
      .join(" ");
  };

  const getOperatorDisplayName = (operator: string) => {
    switch (operator) {
      case "equals":
        return "is";
      case "not_equals":
        return "is not";
      case "contains":
        return "contains";
      case "not_contains":
        return "does not contain";
      case "greater_than":
        return "is greater than";
      case "less_than":
        return "is less than";
      case "older_than":
        return "is older than";
      case "newer_than":
        return "is newer than";
      default:
        return operator.replace(/_/g, " ");
    }
  };

  const getActionDisplayName = (type: string) => {
    switch (type) {
      case "set_priority":
        return "Set priority to";
      case "assign_department":
        return "Assign to department";
      case "add_tag":
        return "Add tag";
      case "remove_tag":
        return "Remove tag";
      case "change_status":
        return "Change status to";
      case "send_email":
        return "Send email template";
      case "notify_manager":
        return "Notify manager";
      default:
        return type.replace(/_/g, " ");
    }
  };

  const toggleRuleExpansion = (ruleId: string) => {
    setExpandedRule(expandedRule === ruleId ? null : ruleId);
  };

  const toggleRuleActive = (ruleId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // In a real app, this would update the rule's active status
    console.log(`Toggle rule ${ruleId} active status`);
  };

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Chart rendering functions
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const renderTicketVolumeChart = () => {
    return (
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={insightData.ticketVolume}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="date"
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                color: darkMode ? "#e5e7eb" : "#4b5563",
              }}
              formatter={(value) => [`${value} tickets`, "Volume"]}
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorTickets)"
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderResponseTimeChart = () => {
    return (
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={insightData.responseTime}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="date"
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              label={{
                value: "Minutes",
                angle: -90,
                position: "insideLeft",
                style: { fill: darkMode ? "#e5e7eb" : "#4b5563" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                color: darkMode ? "#e5e7eb" : "#4b5563",
              }}
              formatter={(value) => [`${value} min`, "Response Time"]}
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <Line
              type="monotone"
              dataKey="time"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderCategoryDistributionChart = () => {
    const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

    return (
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={insightData.categoryDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              animationDuration={1500}
            >
              {insightData.categoryDistribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} tickets`, "Count"]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderSatisfactionChart = () => {
    return (
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={insightData.satisfaction}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis
              dataKey="date"
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              domain={[80, 100]}
              label={{
                value: "Score (%)",
                angle: -90,
                position: "insideLeft",
                style: { fill: darkMode ? "#e5e7eb" : "#4b5563" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                color: darkMode ? "#e5e7eb" : "#4b5563",
              }}
              formatter={(value) => [`${value}%`, "Satisfaction"]}
              labelFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <Bar
              dataKey="score"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const renderAgentPerformanceChart = () => {
    return (
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={insightData.agentPerformance}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout="vertical"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.1}
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
            />
            <YAxis
              dataKey="agent"
              type="category"
              tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                borderColor: darkMode ? "#374151" : "#e5e7eb",
                color: darkMode ? "#e5e7eb" : "#4b5563",
              }}
            />
            <Legend />
            <Bar
              dataKey="satisfaction"
              name="Satisfaction (%)"
              fill="#10b981"
              radius={[0, 4, 4, 0]}
              animationDuration={1500}
            />
            <Bar
              dataKey="responseTime"
              name="Avg. Response Time (min)"
              fill="#6366f1"
              radius={[0, 4, 4, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Render functions for tabs
  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // Render Dashboard --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const renderDashboard = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white shadow-lg dark:from-indigo-800 dark:to-blue-900"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome back, Support Team!</h2>
            <p className="mt-1 text-indigo-100">
              Here&apos;s your support overview for today
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-white/20 p-3 backdrop-blur-sm"
          >
            <LifeBuoy size={24} />
          </motion.div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-indigo-100">Open Tickets</p>
            <p className="text-xl font-bold">24</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-indigo-100">Avg. Response Time</p>
            <p className="text-xl font-bold">14 min</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-indigo-100">Satisfaction</p>
            <p className="text-xl font-bold">94%</p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="rounded-lg bg-white/10 p-3 backdrop-blur-sm"
          >
            <p className="text-sm text-indigo-100">Resolved Today</p>
            <p className="text-xl font-bold">18</p>
          </motion.div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Ticket Volume
            </h3>
            <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
              Last 7 days
            </span>
          </div>
          {renderTicketVolumeChart()}
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Total tickets this week:{" "}
            {insightData.ticketVolume.reduce((sum, day) => sum + day.count, 0)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Response Time
            </h3>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
              Improving
            </span>
          </div>
          {renderResponseTimeChart()}
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Average response time:{" "}
            {Math.round(
              insightData.responseTime.reduce((sum, day) => sum + day.time, 0) /
                insightData.responseTime.length,
            )}{" "}
            minutes
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Category Distribution
            </h3>
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
              This month
            </span>
          </div>
          {renderCategoryDistributionChart()}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Customer Satisfaction
            </h3>
            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
              Last 7 days
            </span>
          </div>
          {renderSatisfactionChart()}
          <div className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Average satisfaction:{" "}
            {Math.round(
              insightData.satisfaction.reduce(
                (sum, day) => sum + day.score,
                0,
              ) / insightData.satisfaction.length,
            )}
            %
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-white">
            AI-Generated Insights
          </h3>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
            Updated 2 hours ago
          </span>
        </div>
        <div className="space-y-4">
          {aiInsights.slice(0, 3).map((insight) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + aiInsights.indexOf(insight) * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
                insight.impact === "positive"
                  ? "border-green-100 bg-green-50 dark:border-green-900/30 dark:bg-green-900/10"
                  : insight.impact === "negative"
                    ? "border-red-100 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10"
                    : "border-blue-100 bg-blue-50 dark:border-blue-900/30 dark:bg-blue-900/10"
              }`}
              onClick={() => handleInsightClick(insight)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`mr-3 rounded-full p-2 ${
                      insight.type === "trend"
                        ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                        : insight.type === "anomaly"
                          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          : insight.type === "suggestion"
                            ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {insight.type === "trend" && <TrendingUp size={18} />}
                    {insight.type === "anomaly" && <AlertCircle size={18} />}
                    {insight.type === "suggestion" && <Lightbulb size={18} />}
                    {insight.type === "prediction" && <Gauge size={18} />}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        insight.impact === "positive"
                          ? "text-green-800 dark:text-green-300"
                          : insight.impact === "negative"
                            ? "text-red-800 dark:text-red-300"
                            : "text-blue-800 dark:text-blue-300"
                      }`}
                    >
                      {insight.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {insight.type.charAt(0).toUpperCase() +
                        insight.type.slice(1)}{" "}
                      • {new Date(insight.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-white/50 px-2 py-1 text-xs font-medium backdrop-blur-sm dark:bg-gray-800/50">
                  {Math.round(insight.confidence * 100)}% confidence
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
                {insight.description}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 flex w-full items-center justify-center rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          View All Insights
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
      >
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Agent Performance
        </h3>
        {renderAgentPerformanceChart()}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {agents.slice(0, 4).map((agent) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + agents.indexOf(agent) * 0.1 }}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="cursor-pointer rounded-lg border border-gray-100 p-4 transition-all hover:shadow-md dark:border-gray-700"
              onClick={() => handleAgentClick(agent)}
            >
              <div className="flex items-center">
                <div className="relative mr-3">
                  <Image
                    src={
                      agent.avatar ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={agent.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${
                      agent.status === "available"
                        ? "bg-green-500"
                        : agent.status === "busy"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    } dark:border-gray-800`}
                  ></div>
                </div>
                <div>
                  <p className="font-medium dark:text-white">{agent.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {agent.department}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-md bg-gray-50 p-2 dark:bg-gray-700/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Response
                  </p>
                  <p className="font-medium dark:text-white">
                    {agent.performance.responseTime} min
                  </p>
                </div>
                <div className="rounded-md bg-gray-50 p-2 dark:bg-gray-700/50">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Satisfaction
                  </p>
                  <p className="font-medium dark:text-white">
                    {agent.performance.satisfaction}%
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  //Render Tickets ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  const renderTickets = () => (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold dark:text-white">Support Tickets</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            <Filter size={16} className="mr-1" />
            Filters
          </motion.button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => filterByStatus("all")}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            ticketFilter === "all"
              ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:hover:bg-indigo-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => filterByStatus("new")}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            ticketFilter === "new"
              ? "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          New
        </button>
        <button
          onClick={() => filterByStatus("open")}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            ticketFilter === "open"
              ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-200 dark:hover:bg-green-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Open
        </button>
        <button
          onClick={() => filterByStatus("pending")}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            ticketFilter === "pending"
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:hover:bg-yellow-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => filterByStatus("resolved")}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            ticketFilter === "resolved"
              ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Resolved
        </button>
        <button
          onClick={() => filterByStatus("closed")}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            ticketFilter === "closed"
              ? "bg-gray-300 text-gray-800 hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Closed
        </button>
      </div>

      <AnimatePresence>
        {showFilterPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Priority
                </label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="priority-urgent"
                      className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                    />
                    <label
                      htmlFor="priority-urgent"
                      className="ml-2 text-sm dark:text-white"
                    >
                      Urgent
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="priority-high"
                      className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                    />
                    <label
                      htmlFor="priority-high"
                      className="ml-2 text-sm dark:text-white"
                    >
                      High
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="priority-medium"
                      className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                    />
                    <label
                      htmlFor="priority-medium"
                      className="ml-2 text-sm dark:text-white"
                    >
                      Medium
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="priority-low"
                      className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                    />
                    <label
                      htmlFor="priority-low"
                      className="ml-2 text-sm dark:text-white"
                    >
                      Low
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select className="mt-2 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white">
                  <option value="">All Categories</option>
                  <option value="account-access">Account Access</option>
                  <option value="billing">Billing</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="feature-request">Feature Request</option>
                  <option value="how-to">How-to</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date Range
                </label>
                <select className="mt-2 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white">
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="last-7-days">Last 7 days</option>
                  <option value="last-30-days">Last 30 days</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowFilterPanel(false)}
              >
                Reset
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                onClick={() => setShowFilterPanel(false)}
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-hidden rounded-xl bg-white/80 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <div className="grid h-full grid-cols-1 md:grid-cols-[350px_1fr]">
          <div className="border-r border-gray-200 dark:border-gray-700">
            <div className="max-h-[95vh] overflow-y-auto p-4">
              {filteredTickets.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-700">
                    <Inbox size={32} className="text-gray-400" />
                  </div>
                  <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
                    No tickets match your filters
                  </p>
                  <button
                    className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                    onClick={() => {
                      setTicketFilter("all");
                      setSearchQuery("");
                      setFilteredTickets([]);
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTickets.map((ticket) => (
                    <motion.div
                      key={ticket.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: filteredTickets.indexOf(ticket) * 0.05,
                      }}
                      whileHover={{
                        y: -2,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      className={`cursor-pointer rounded-lg border p-3 transition-all ${
                        selectedTicket?.id === ticket.id
                          ? "border-indigo-300 bg-indigo-50 dark:border-indigo-700 dark:bg-indigo-900/30"
                          : "border-gray-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-800 dark:hover:bg-indigo-900/20"
                      }`}
                      onClick={() => handleTicketClick(ticket)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {ticket.id}
                        </span>
                        <div className="flex items-center space-x-1">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                              ticket.priority === "urgent"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                                : ticket.priority === "high"
                                  ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                                  : ticket.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                    : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                            }`}
                          >
                            {ticket.priority.charAt(0).toUpperCase() +
                              ticket.priority.slice(1)}
                          </span>
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                              ticket.status === "new"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                                : ticket.status === "open"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                  : ticket.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                    : ticket.status === "resolved"
                                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {ticket.status.charAt(0).toUpperCase() +
                              ticket.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <h3 className="mt-1 line-clamp-1 font-medium dark:text-white">
                        {ticket.subject}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                        {ticket.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative mr-2 h-6 w-6 flex-shrink-0">
                            <Image
                              src={
                                ticket.customer.avatar ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                              }
                              fill
                              alt={ticket.customer.name}
                              className="h-full w-full rounded-full object-cover"
                            />
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-white ${
                                ticket.customer.sentiment === "positive"
                                  ? "bg-green-500"
                                  : ticket.customer.sentiment === "neutral"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              } dark:border-gray-800`}
                            ></div>
                          </div>
                          <span className="line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                            {ticket.customer.name}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {ticket.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                        {ticket.tags.length > 3 && (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            +{ticket.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex h-full flex-col">
            {selectedTicket ? (
              <div className="flex h-full flex-col">
                <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                    <div>
                      <div className="items-center sm:flex">
                        <h3 className="text-lg font-semibold dark:text-white">
                          {selectedTicket.subject}
                        </h3>
                        <span className="mt-2 text-sm text-gray-500 dark:text-gray-400 sm:ml-2 sm:mt-0">
                          {selectedTicket.id}
                        </span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            selectedTicket.status === "new"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                              : selectedTicket.status === "open"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                                : selectedTicket.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                  : selectedTicket.status === "resolved"
                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {selectedTicket.status.charAt(0).toUpperCase() +
                            selectedTicket.status.slice(1)}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            selectedTicket.priority === "urgent"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                              : selectedTicket.priority === "high"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200"
                                : selectedTicket.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                          }`}
                        >
                          {selectedTicket.priority.charAt(0).toUpperCase() +
                            selectedTicket.priority.slice(1)}{" "}
                          Priority
                        </span>
                        <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
                          {selectedTicket.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Created:{" "}
                          {new Date(selectedTicket.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 sm:items-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        onClick={() => setShowCustomerPanel(!showCustomerPanel)}
                      >
                        <User size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        onClick={() =>
                          setShowKnowledgePanel(!showKnowledgePanel)
                        }
                      >
                        <BookOpen size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        onClick={() => setShowAIPanel(!showAIPanel)}
                      >
                        <Sparkles size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <MoreHorizontal size={18} />
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div
                  ref={ticketContainerRef}
                  className="max-h-[60vh] flex-1 overflow-y-auto p-4"
                >
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                      <div>
                        <div className="flex gap-2">
                          <div className="relative mr-3 h-8 w-8 flex-shrink-0">
                            <Image
                              src={
                                selectedTicket.customer.avatar ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                              }
                              fill
                              alt={selectedTicket.customer.name}
                              className="h-full w-full rounded-full object-cover"
                            />
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-white ${
                                selectedTicket.customer.sentiment === "positive"
                                  ? "bg-green-500"
                                  : selectedTicket.customer.sentiment ===
                                      "neutral"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                              } dark:border-gray-800`}
                            ></div>
                          </div>
                          <div>
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="font-medium dark:text-white">
                                  {selectedTicket.customer.name}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(
                                    selectedTicket.createdAt,
                                  ).toLocaleString()}
                                </span>
                              </div>
                              <div className="items-center sm:flex">
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {selectedTicket.customer.email}
                                </span>

                                <div className="mt-1 flex items-center sm:mt-0">
                                  {selectedTicket.customer.company && (
                                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-300 sm:ml-2">
                                      {selectedTicket.customer.company}
                                    </span>
                                  )}
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium sm:ml-2 ${
                                      selectedTicket.customer.tier ===
                                      "enterprise"
                                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
                                        : selectedTicket.customer.tier ===
                                            "premium"
                                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                    }`}
                                  >
                                    {selectedTicket.customer.tier
                                      .charAt(0)
                                      .toUpperCase() +
                                      selectedTicket.customer.tier.slice(1)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="mt-1 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                              {selectedTicket.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedTicket.messages &&
                      selectedTicket.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`rounded-lg p-4 ${
                            message.sender === "customer"
                              ? "bg-gray-50 dark:bg-gray-700/50"
                              : message.sender === "agent"
                                ? "bg-indigo-50 dark:bg-indigo-900/20"
                                : message.sender === "ai"
                                  ? "bg-purple-50 dark:bg-purple-900/20"
                                  : "bg-gray-100 dark:bg-gray-700/30"
                          } ${message.isInternal ? "border border-dashed border-gray-300 dark:border-gray-600" : ""}`}
                        >
                          <div className="flex items-start">
                            {message.sender !== "system" && (
                              <div className="relative mr-3 h-8 w-8 flex-shrink-0">
                                {message.sender === "customer" ? (
                                  <Image
                                    src={
                                      selectedTicket.customer.avatar ||
                                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                                    }
                                    fill
                                    alt={selectedTicket.customer.name}
                                    className="h-full w-full rounded-full object-cover"
                                  />
                                ) : message.sender === "agent" &&
                                  selectedTicket.assignee ? (
                                  <Image
                                    src={
                                      selectedTicket.assignee.avatar ||
                                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                                    }
                                    fill
                                    alt={selectedTicket.assignee.name}
                                    className="h-full w-full rounded-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300">
                                    <Sparkles size={16} />
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  {message.sender === "customer" ? (
                                    <span className="font-medium dark:text-white">
                                      {selectedTicket.customer.name}
                                    </span>
                                  ) : message.sender === "agent" &&
                                    selectedTicket.assignee ? (
                                    <span className="font-medium dark:text-white">
                                      {selectedTicket.assignee.name}
                                    </span>
                                  ) : message.sender === "ai" ? (
                                    <span className="font-medium text-purple-700 dark:text-purple-300">
                                      AI Assistant
                                    </span>
                                  ) : (
                                    <span className="font-medium text-gray-500 dark:text-gray-400">
                                      System
                                    </span>
                                  )}
                                  {message.isInternal && (
                                    <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-300">
                                      Internal Note
                                    </span>
                                  )}
                                  {message.aiGenerated && (
                                    <span className="ml-2 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                                      AI Generated
                                    </span>
                                  )}
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(message.timestamp).toLocaleString()}
                                </span>
                              </div>
                              <p className="mt-1 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                                {message.content}
                              </p>
                              {message.attachments &&
                                message.attachments.length > 0 && (
                                  <div className="mt-2 space-y-2">
                                    {message.attachments.map(
                                      (attachment, i) => (
                                        <div
                                          key={i}
                                          className="flex items-center rounded-lg border border-gray-200 bg-white p-2 dark:border-gray-700 dark:bg-gray-800"
                                        >
                                          <Paperclip
                                            size={14}
                                            className="mr-2 text-gray-500"
                                          />
                                          <span className="flex-1 text-sm">
                                            {attachment.name}
                                          </span>
                                          <span className="text-xs text-gray-500">
                                            {(attachment.size / 1024).toFixed(
                                              1,
                                            )}{" "}
                                            KB
                                          </span>
                                          <button className="ml-2 rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <Download size={14} />
                                          </button>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="disable:opacity-60 rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 disabled:cursor-not-allowed dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        disabled={isGeneratingResponse}
                        onClick={generateAIResponse}
                      >
                        {!isGeneratingResponse && <Sparkles size={18} />}
                        {isGeneratingResponse && (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <Paperclip size={18} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        <MessageSquare size={18} />
                      </motion.button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select className="rounded-lg border border-gray-300 bg-white/80 px-3 py-2 text-sm shadow-sm backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white">
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="resolved">Resolved</option>
                        <option value="closed">Closed</option>
                      </select>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                      >
                        Update
                      </motion.button>
                    </div>
                  </div>
                  <div className="mt-3">
                    <textarea
                      ref={messageInputRef}
                      placeholder="Type your reply..."
                      rows={3}
                      className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
                      value={draftResponse}
                      onChange={(e) => setDraftResponse(e.target.value)}
                    ></textarea>
                    <div className="mt-2 items-center justify-between sm:flex">
                      <div className="flex items-center space-x-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Internal note
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                          />
                          <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            Send email notification
                          </span>
                        </label>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-indigo-700 dark:hover:bg-indigo-800 sm:mt-0 sm:w-fit"
                        disabled={!draftResponse.trim()}
                        onClick={sendResponse}
                      >
                        <Send size={16} className="mr-1" />
                        Send Reply
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-4">
                <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-700">
                  <MessageSquare size={32} className="text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium dark:text-white">
                  No ticket selected
                </h3>
                <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
                  Select a ticket from the list to view details and respond
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAIPanel && selectedTicket && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-80 border-l border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90"
          >
            <div className="flex h-full flex-col">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Sparkles
                      size={18}
                      className="mr-2 text-indigo-600 dark:text-indigo-400"
                    />
                    <h3 className="text-lg font-semibold dark:text-white">
                      AI Assistant
                    </h3>
                  </div>
                  <button
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    onClick={() => setShowAIPanel(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 text-indigo-600 dark:text-indigo-400">
                        <Zap size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-indigo-800 dark:text-indigo-300">
                          Ticket Analysis
                        </p>
                        <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-200">
                          This appears to be a{" "}
                          {selectedTicket.category?.toLowerCase()} issue with{" "}
                          {selectedTicket.priority} priority. The
                          customer&apos;s sentiment is{" "}
                          {selectedTicket.customer.sentiment}.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium dark:text-white">
                      Suggested Responses
                    </h4>
                    <div className="space-y-2">
                      {selectedTicket.aiSuggestions
                        ?.filter((sugg) => sugg.type === "response")
                        .map((suggestion) => (
                          <div
                            key={suggestion.id}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20"
                            onClick={() => setDraftResponse(suggestion.content)}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                {Math.round(suggestion.confidence * 100)}%
                                confidence
                              </span>
                              {suggestion.used && (
                                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                  Used
                                </span>
                              )}
                            </div>
                            <p className="mt-1 line-clamp-3 text-sm text-gray-700 dark:text-gray-300">
                              {suggestion.content}
                            </p>
                            <div className="mt-2 flex items-center justify-end space-x-2">
                              <button className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                                <Edit size={14} />
                              </button>
                              <button className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                                <Copy size={14} />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 font-medium dark:text-white">
                      Knowledge Base Suggestions
                    </h4>
                    <div className="space-y-2">
                      {selectedTicket.aiSuggestions
                        ?.filter((sugg) => sugg.type === "knowledge")
                        .map((suggestion) => (
                          <div
                            key={suggestion.id}
                            className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20"
                          >
                            <div className="flex items-center">
                              <BookOpen
                                size={14}
                                className="mr-2 text-indigo-600 dark:text-indigo-400"
                              />
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                {suggestion.content.split(": ")[1]}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {Math.round(suggestion.confidence * 100)}%
                                relevant
                              </span>
                              <button className="flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                                <ExternalLink size={12} className="mr-1" />
                                View Article
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 text-yellow-600 dark:text-yellow-400">
                        <AlertCircle size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-yellow-800 dark:text-yellow-300">
                          Similar Issues
                        </p>
                        <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-200">
                          3 similar tickets were resolved in the past week.
                          Common resolution involved checking account
                          synchronization status and manually resetting
                          authentication tokens.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="disable:opacity-60 flex w-full items-center justify-center rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed dark:bg-indigo-700 dark:hover:bg-indigo-800"
                  disabled={isGeneratingResponse}
                  onClick={generateAIResponse}
                >
                  {isGeneratingResponse ? (
                    <Loader2 size={16} className="mr-1 animate-spin" />
                  ) : (
                    <Sparkles size={16} className="mr-1" />
                  )}
                  Generate Response
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showKnowledgePanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-80 border-l border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90"
          >
            <div className="flex h-full flex-col">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen
                      size={18}
                      className="mr-2 text-indigo-600 dark:text-indigo-400"
                    />
                    <h3 className="text-lg font-semibold dark:text-white">
                      Knowledge Base
                    </h3>
                  </div>
                  <button
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    onClick={() => setShowKnowledgePanel(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="relative mt-3">
                  <input
                    type="text"
                    placeholder="Search knowledge base..."
                    className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <Search size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 text-indigo-600 dark:text-indigo-400">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-indigo-800 dark:text-indigo-300">
                          Suggested Articles
                        </p>
                        <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-200">
                          Based on the ticket content, these articles may help
                          resolve the issue.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* This would be populated with actual knowledge base articles */}
                    <motion.div
                      whileHover={{
                        y: -2,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 transition-all hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium dark:text-white">
                          Password Reset Guide
                        </h4>
                        <span className="shrink-0 rounded-full bg-indigo-100 px-1 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
                          Account Access
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
                        Step-by-step guide to reset your password and regain
                        access to your account.
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Eye size={12} className="mr-1" />
                          1,245 views
                          <span className="mx-1">•</span>
                          <ThumbsUp size={12} className="mr-1" />
                          98 helpful
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                            <Copy size={14} />
                          </button>
                          <button className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
                            <ExternalLink size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full items-center justify-center rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                >
                  <Plus size={16} className="mr-1" />
                  Create New Article
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCustomerPanel && selectedTicket && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-80 border-l border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/90"
          >
            <div className="flex h-full flex-col">
              <div className="border-b border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <User
                      size={18}
                      className="mr-2 text-indigo-600 dark:text-indigo-400"
                    />
                    <h3 className="text-lg font-semibold dark:text-white">
                      Customer Profile
                    </h3>
                  </div>
                  <button
                    className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                    onClick={() => setShowCustomerPanel(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      <Image
                        src={
                          selectedTicket.customer.avatar ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                        }
                        width={64}
                        height={64}
                        alt={selectedTicket.customer.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                          selectedTicket.customer.sentiment === "positive"
                            ? "bg-green-500"
                            : selectedTicket.customer.sentiment === "neutral"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        } dark:border-gray-800`}
                      ></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold dark:text-white">
                        {selectedTicket.customer.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedTicket.customer.email}
                      </p>
                      {selectedTicket.customer.company && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {selectedTicket.customer.company}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Customer Tier
                      </p>
                      <p className="font-medium dark:text-white">
                        {selectedTicket.customer.tier?.charAt(0).toUpperCase() +
                          selectedTicket.customer.tier?.slice(1)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Total Tickets
                      </p>
                      <p className="font-medium dark:text-white">
                        {selectedTicket.customer.totalTickets}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Timezone
                      </p>
                      <p className="line-clamp-1 font-medium dark:text-white">
                        {selectedTicket.customer.timezone}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Language
                      </p>
                      <p className="font-medium dark:text-white">
                        {selectedTicket.customer.language}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Current Sentiment
                    </p>
                    <div className="mt-1 flex items-center">
                      <div
                        className={`mr-2 h-3 w-3 rounded-full ${
                          selectedTicket.customer.sentiment === "positive"
                            ? "bg-green-500"
                            : selectedTicket.customer.sentiment === "neutral"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                      ></div>
                      <p className="font-medium dark:text-white">
                        {selectedTicket.customer.sentiment
                          ?.charAt(0)
                          .toUpperCase() +
                          selectedTicket.customer.sentiment?.slice(1)}
                      </p>
                    </div>
                  </div>

                  {selectedTicket.customer.lifetimeValue && (
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Lifetime Value
                      </p>
                      <p className="font-medium dark:text-white">
                        $
                        {selectedTicket.customer.lifetimeValue?.toLocaleString()}
                      </p>
                    </div>
                  )}

                  <div>
                    <h4 className="mb-2 font-medium dark:text-white">
                      Recent Activity
                    </h4>
                    <div className="space-y-3">
                      <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MessageSquare
                              size={14}
                              className="mr-2 text-indigo-600 dark:text-indigo-400"
                            />
                            <p className="text-sm font-medium dark:text-white">
                              Support Ticket
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            2 days ago
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                          &quot;Feature request: Dark mode for mobile app&quot;
                        </p>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Activity
                              size={14}
                              className="mr-2 text-green-600 dark:text-green-400"
                            />
                            <p className="text-sm font-medium dark:text-white">
                              Product Usage
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            5 days ago
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                          Used data export feature 3 times
                        </p>
                      </div>

                      <div className="rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MessageSquare
                              size={14}
                              className="mr-2 text-indigo-600 dark:text-indigo-400"
                            />
                            <p className="text-sm font-medium dark:text-white">
                              Support Ticket
                            </p>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            2 weeks ago
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-sm text-gray-500 dark:text-gray-400">
                          &quot;Cannot access my account after password
                          reset&quot;
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 text-indigo-600 dark:text-indigo-400">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-indigo-800 dark:text-indigo-300">
                          AI Customer Insights
                        </p>
                        <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-200">
                          This customer frequently reports technical issues but
                          is generally satisfied with resolutions. They are a
                          long-term user (2+ years) and have referred 3 other
                          customers.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 p-4 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex w-full items-center justify-center rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                >
                  <Users size={16} className="mr-1" />
                  View Full Profile
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Render Agents------------------------------------------------------------------------------------------------------------------------------------------------------------
  const renderAgents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Support Agents</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
        >
          <Plus size={16} className="mr-1" />
          Add New Agent
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="overflow-hidden rounded-xl bg-white/80 shadow-md backdrop-blur-sm transition-all dark:bg-gray-800/80"
            onClick={() => handleAgentClick(agent)}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <Image
                    src={
                      agent.avatar ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                    }
                    alt={agent.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-white ${
                      agent.status === "available"
                        ? "bg-green-500"
                        : agent.status === "busy"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    } dark:border-gray-800`}
                  ></div>
                </div>
                <div>
                  <h3 className="font-semibold dark:text-white">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {agent.email}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
                  {agent.role.charAt(0).toUpperCase() + agent.role.slice(1)}
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                  {agent.department}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    agent.status === "available"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                      : agent.status === "busy"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  }`}
                >
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </span>
              </div>

              <div className="mt-4">
                <p className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Expertise:
                </p>
                <div className="flex flex-wrap gap-1">
                  {agent.expertise.slice(0, 3).map((skill, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {agent.expertise.length > 3 && (
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      +{agent.expertise.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Response Time
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {agent.performance.responseTime} min
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{
                        width: `${100 - (agent.performance.responseTime / 30) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Satisfaction
                    </span>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {agent.performance.satisfaction}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{ width: `${agent.performance.satisfaction}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {agent.performance.ticketsResolved} tickets resolved
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  <MoreHorizontal size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render Insigts -----------------------------------------------------------------------------------------------------------------------------------------------------------
  const renderInsights = () => {
    return (
      <div className="space-y-6">
        <div className="items-center justify-between sm:flex">
          <h2 className="text-xl font-bold dark:text-white">AI Insights</h2>
          <div className="mt-4 flex items-center space-x-2 sm:mt-0">
            <select className="rounded-lg border border-gray-300 bg-white/80 px-3 py-2 text-sm shadow-sm backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white">
              <option value="all">All Insights</option>
              <option value="trend">Trends</option>
              <option value="anomaly">Anomalies</option>
              <option value="suggestion">Suggestions</option>
              <option value="prediction">Predictions</option>
            </select>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
            >
              <Sparkles size={16} className="shrink0 mr-1" />
              Generate New Insights
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Ticket Volume Trends
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={insightData.ticketVolume}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorTickets"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#6366f1"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
                  />
                  <YAxis
                    tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
                    label={{
                      value: "Tickets",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: darkMode ? "#e5e7eb" : "#4b5563" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                      color: darkMode ? "#e5e7eb" : "#4b5563",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#6366f1"
                    fillOpacity={1}
                    fill="url(#colorTickets)"
                    activeDot={{ r: 8 }}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Ticket volume has increased by 15% over the last 30 days
            </p>
          </div>

          <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Category Distribution
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={insightData.categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    animationDuration={1500}
                  >
                    {insightData.categoryDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          [
                            "#6366f1",
                            "#8b5cf6",
                            "#ec4899",
                            "#14b8a6",
                            "#f59e0b",
                          ][index % 5]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Distribution"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Technical Support and Account Access are the most common ticket
              categories
            </p>
          </div>

          <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Response & Resolution Time
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={insightData.responseResolutionTime}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
                  />
                  <YAxis
                    tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
                    label={{
                      value: "Minutes",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: darkMode ? "#e5e7eb" : "#4b5563" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                      color: darkMode ? "#e5e7eb" : "#4b5563",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="responseTime"
                    name="Response Time"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                  <Line
                    type="monotone"
                    dataKey="resolutionTime"
                    name="Resolution Time"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Average response time has decreased by 22% this month
            </p>
          </div>

          <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
            <h3 className="mb-4 text-lg font-semibold dark:text-white">
              Agent Performance
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={insightData.agentPerformance}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis
                    dataKey="agent"
                    tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
                  />
                  <YAxis
                    tick={{ fill: darkMode ? "#e5e7eb" : "#4b5563" }}
                    label={{
                      value: "Tickets Resolved",
                      angle: -90,
                      position: "insideLeft",
                      style: { fill: darkMode ? "#e5e7eb" : "#4b5563" },
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                      color: darkMode ? "#e5e7eb" : "#4b5563",
                    }}
                  />
                  <Bar
                    dataKey="ticketsResolved"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
              Sarah Johnson has the highest resolution rate this month
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Key AI Insights
            </h3>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
              Updated 2 hours ago
            </span>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20">
              <div className="flex items-start">
                <div className="mr-3 rounded-full bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                  <TrendingUp size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium dark:text-white">
                      Increasing Account Access Issues
                    </h4>
                    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                      Neutral Impact
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Account access tickets have increased by 27% following the
                    recent password policy update. Most users are reporting
                    confusion with the new requirements.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Detected 3 days ago
                    </span>
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20">
              <div className="flex items-start">
                <div className="mr-3 rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <AlertCircle size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium dark:text-white">
                      Anomaly: High Ticket Abandonment
                    </h4>
                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-200">
                      Negative Impact
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    32% of tickets in the billing category are being abandoned
                    after initial response. This is significantly higher than
                    the 8% average across other categories.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Detected 1 day ago
                    </span>
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20">
              <div className="flex items-start">
                <div className="mr-3 rounded-full bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  <Lightbulb size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium dark:text-white">
                      Knowledge Base Improvement Opportunity
                    </h4>
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
                      Positive Impact
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Creating articles about the new data export feature could
                    reduce tickets by ~15%. 43 tickets this month were about
                    this feature with no relevant KB articles.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Detected 5 days ago
                    </span>
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-4 hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20">
              <div className="flex items-start">
                <div className="mr-3 rounded-full bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <Gauge size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium dark:text-white">
                      Predicted Ticket Volume Increase
                    </h4>
                    <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                      Neutral Impact
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Based on historical patterns, ticket volume is predicted to
                    increase by 30-40% during the upcoming product release (May
                    15-20). Consider scheduling additional agent coverage.
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Predicted 2 days ago
                    </span>
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Knowledge-----------------------------------------------------------------------------------------------------------------------------------------------------------------
  const renderKnowledge = () => (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold dark:text-white">Knowledge Base</h2>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search knowledge base..."
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
          >
            <Plus size={16} className="mr-1" />
            Create Article
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 text-indigo-600 dark:text-indigo-400">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="font-medium text-indigo-800 dark:text-indigo-300">
                AI Recommendations
              </p>
              <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-200">
                Based on recent tickets, consider creating articles about:
                <br />- Two-factor authentication setup
                <br />- New data export feature
                <br />- Mobile app synchronization issues
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 text-green-600 dark:text-green-400">
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="font-medium text-green-800 dark:text-green-300">
                Most Helpful Articles
              </p>
              <p className="mt-1 text-sm text-green-700 dark:text-green-200">
                These articles have the highest helpfulness ratings:
                <br />- Password Reset Guide (98%)
                <br />- Billing FAQ (95%)
                <br />- Account Security Best Practices (92%)
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
          <div className="flex items-start">
            <div className="mr-3 mt-0.5 text-yellow-600 dark:text-yellow-400">
              <AlertCircle size={18} />
            </div>
            <div>
              <p className="font-medium text-yellow-800 dark:text-yellow-300">
                Articles Needing Updates
              </p>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-200">
                These articles haven&apos;t been updated in 6+ months:
                <br />- API Documentation (8 months ago)
                <br />- Integration Guide (7 months ago)
                <br />- Mobile App Features (6 months ago)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {knowledgeBase.map((article, index) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
            className="overflow-hidden rounded-xl bg-white/80 shadow-md backdrop-blur-sm transition-all dark:bg-gray-800/80"
          >
            <div className="p-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
                  {article.category}
                </span>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Eye size={12} className="mr-1" />
                  {article.views} views
                </div>
              </div>
              <h3 className="mt-2 text-lg font-semibold dark:text-white">
                {article.title}
              </h3>
              <p className="mt-1 line-clamp-3 text-sm text-gray-500 dark:text-gray-400">
                {article.content}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {article.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>Updated {article.lastUpdated}</span>
                  <span className="mx-1">•</span>
                  <ThumbsUp size={12} className="mr-1" />
                  {article.helpful} helpful
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <Edit size={14} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  >
                    <ExternalLink size={14} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  // Render Automations -----------------------------------------------------------------------------------------------------------------------------------------
  const renderAutomations = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Automations</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={16} className="mr-1" />
          Create Automation
        </motion.button>
      </div>

      <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-white">
            Active Rules
          </h3>
          <div className="flex items-center space-x-2">
            <select className="rounded-lg border border-gray-300 bg-white/80 px-3 py-2 text-sm shadow-sm backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white">
              <option value="all">All Rules</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
              <option value="recently-triggered">Recently Triggered</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {automationRules.map((rule) => (
            <motion.div
              key={rule.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/20"
            >
              <div
                className="flex cursor-pointer items-center justify-between p-4"
                onClick={() => toggleRuleExpansion(rule.id)}
              >
                <div className="flex items-center">
                  <div className="mr-3 rounded-full bg-indigo-100 p-2 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                    <Zap size={18} />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">{rule.name}</h4>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {rule.conditions.length} condition
                      {rule.conditions.length !== 1 ? "s" : ""},{" "}
                      {rule.actions.length} action
                      {rule.actions.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span
                    className={`mr-3 rounded-full px-2 py-0.5 text-xs font-medium ${
                      rule.active
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                    }`}
                  >
                    {rule.active ? "Active" : "Inactive"}
                  </span>
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      rule.active
                        ? "bg-indigo-600 dark:bg-indigo-700"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                    onClick={(e) => toggleRuleActive(rule.id, e)}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        rule.active ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </div>
                  <motion.div
                    initial={false}
                    animate={{ rotate: expandedRule === rule.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-3"
                  >
                    <ChevronDown
                      size={18}
                      className="text-gray-500 dark:text-gray-400"
                    />
                  </motion.div>
                </div>
              </div>

              <AnimatePresence>
                {expandedRule === rule.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border-t border-gray-100 px-4 py-3 dark:border-gray-700">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            Conditions
                          </p>
                          <ul className="mt-2 space-y-2">
                            {rule.conditions.map((condition, index) => (
                              <li
                                key={index}
                                className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                              >
                                <span className="mr-1 rounded-full bg-indigo-100 p-1 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                  <Check size={12} />
                                </span>
                                <span className="ml-1">
                                  {getFieldDisplayName(condition.field)}{" "}
                                  {getOperatorDisplayName(condition.operator)}{" "}
                                  <strong>&quot;{condition.value}&quot;</strong>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            Actions
                          </p>
                          <ul className="mt-2 space-y-2">
                            {rule.actions.map((action, index) => (
                              <li
                                key={index}
                                className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                              >
                                <span className="mr-1 rounded-full bg-indigo-100 p-1 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                  <Zap size={12} />
                                </span>
                                <span className="ml-1">
                                  {getActionDisplayName(action.type)}{" "}
                                  <strong>&quot;{action.value}&quot;</strong>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center">
                            <Calendar size={12} className="mr-1" />
                            <span>Created {formatDate(rule.createdAt)}</span>
                          </div>

                          {rule.lastTriggered && (
                            <div className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              <span>
                                Last triggered{" "}
                                {formatTimeAgo(rule.lastTriggered)}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center">
                            <Zap size={12} className="mr-1" />
                            <span>Triggered {rule.triggerCount} times</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                          >
                            <Edit size={14} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                          >
                            <MoreHorizontal size={14} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80">
        <div className="mb-4 flex items-center">
          <h3 className="flex-1 truncate text-lg font-semibold dark:text-white">
            AI Automation Suggestions
          </h3>
          <span className="shrink-0 rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
            Updated today
          </span>
        </div>

        <div className="space-y-4">
          <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 text-indigo-600 dark:text-indigo-400">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="font-medium text-indigo-800 dark:text-indigo-300">
                  Auto-Categorize Feature Requests
                </p>
                <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-200">
                  AI detected that 32% of tickets containing phrases like
                  &quot;would be nice if&quot;, &quot;feature request&quot;, or
                  &quot;please add&quot; are manually tagged as feature
                  requests. Creating an automation could save agents
                  approximately 1.5 minutes per ticket.
                </p>
                <div className="mt-2">
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                    Create Automation →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5 text-indigo-600 dark:text-indigo-400">
                <Sparkles size={18} />
              </div>
              <div>
                <p className="font-medium text-indigo-800 dark:text-indigo-300">
                  Optimize &quot;Auto-close Resolved Tickets&quot; Rule
                </p>
                <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-200">
                  Analysis shows that 15% of auto-closed tickets are reopened
                  within 24 hours. Consider extending the waiting period from 7
                  days to 10 days to reduce reopening rate by an estimated 40%.
                </p>
                <div className="mt-2">
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                    Optimize Automation →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Automation Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={20} />
              </button>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                  <Zap size={24} />
                </div>
                <h2 className="text-2xl font-bold dark:text-white">
                  Create Automation Rule
                </h2>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Rule Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter a descriptive name for this rule"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Conditions
                    </label>
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      + Add Condition
                    </button>
                  </div>
                  <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50">
                    <div className="flex items-center">
                      <AlertCircle size={16} className="mr-2 text-gray-400" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add conditions that will trigger this automation rule
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Actions
                    </label>
                    <button className="text-xs font-medium text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">
                      + Add Action
                    </button>
                  </div>
                  <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50">
                    <div className="flex items-center">
                      <AlertCircle size={16} className="mr-2 text-gray-400" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Add actions that will be performed when conditions are
                        met
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="active-rule"
                    className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:focus:ring-indigo-400"
                    defaultChecked
                  />
                  <label
                    htmlFor="active-rule"
                    className="ml-2 text-sm dark:text-white"
                  >
                    Activate this rule immediately
                  </label>
                </div>

                <div className="pt-2">
                  <div className="flex justify-end space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                      onClick={() => setShowCreateModal(false)}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                    >
                      Create Automation
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 transition-colors dark:from-gray-900 dark:to-gray-800 ${isMobile ? "pb-16" : ""}`}
    >
      <div className="container mx-auto p-4">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            {isMobile && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mr-3 rounded-full bg-white/80 p-2 text-gray-600 shadow backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <List size={20} />
              </motion.button>
            )}
            <div className="flex items-center">
              <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-md">
                <LifeBuoy size={20} />
              </div>
              <h1 className="hidden text-xl font-bold dark:text-white sm:block">
                EchoForce
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              className="rounded-full bg-white/80 p-2 text-gray-600 shadow backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full bg-white/80 p-2 text-gray-600 shadow backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-300"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings size={20} />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md"
            >
              <User size={16} />
            </motion.div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <AnimatePresence>
            {(!isMobile || showMobileMenu) && (
              <motion.div
                initial={isMobile ? { x: -240 } : { opacity: 0 }}
                animate={isMobile ? { x: 0 } : { opacity: 1 }}
                exit={isMobile ? { x: -240 } : { opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`${
                  isMobile
                    ? "fixed inset-y-0 left-0 z-40 w-64 bg-white/80 p-5 shadow-lg backdrop-blur-sm dark:bg-gray-800/80"
                    : "rounded-xl bg-white/80 p-5 shadow-md backdrop-blur-sm dark:bg-gray-800/80"
                }`}
              >
                <div className="mb-6 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md">
                    <LifeBuoy size={24} />
                  </div>
                  <h1 className="ml-2 text-xl font-bold dark:text-white">
                    EchoForce
                  </h1>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <motion.button
                      key={item.id}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setActiveTab(item.id);
                        if (isMobile) setShowMobileMenu(false);
                      }}
                      className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                        activeTab === item.id
                          ? "bg-gradient-to-r from-indigo-500/20 to-blue-500/20 text-indigo-700 dark:from-indigo-500/30 dark:to-blue-500/30 dark:text-indigo-300"
                          : "text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <div
                        className={`mr-3 ${activeTab === item.id ? "text-indigo-600 dark:text-indigo-400" : ""}`}
                      >
                        {item.icon}
                      </div>
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 p-4 dark:from-indigo-500/20 dark:to-blue-500/20">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">
                          AI Assistant
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          Ready to help!
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex w-full items-center justify-center rounded-lg bg-indigo-600 py-2 text-xs font-medium text-white shadow hover:bg-indigo-700"
                      >
                        Generate Insights
                      </motion.button>
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-indigo-500/10 to-blue-500/10 p-4 dark:from-indigo-500/20 dark:to-blue-500/20">
                    <h3 className="font-medium dark:text-white">
                      Ticket Summary
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-white/50 p-2 dark:bg-gray-700/50">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          New
                        </p>
                        <p className="font-medium dark:text-white">12</p>
                      </div>
                      <div className="rounded-lg bg-white/50 p-2 dark:bg-gray-700/50">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Open
                        </p>
                        <p className="font-medium dark:text-white">24</p>
                      </div>
                      <div className="rounded-lg bg-white/50 p-2 dark:bg-gray-700/50">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Pending
                        </p>
                        <p className="font-medium dark:text-white">8</p>
                      </div>
                      <div className="rounded-lg bg-white/50 p-2 dark:bg-gray-700/50">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Urgent
                        </p>
                        <p className="font-medium dark:text-white">5</p>
                      </div>
                    </div>
                  </div>
                </div>

                {isMobile && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    <X size={20} />
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <motion.main
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[80vh]"
          >
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "tickets" && renderTickets()}
            {activeTab === "agents" && renderAgents()}
            {activeTab === "insights" && renderInsights()}
            {activeTab === "knowledge" && renderKnowledge()}
            {activeTab === "automations" && renderAutomations()}
          </motion.main>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-gray-200/50 bg-white/80 py-2 backdrop-blur-md dark:border-gray-700/50 dark:bg-gray-800/80"
        >
          {navItems.slice(0, 5).map((item) => (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center p-2 ${
                activeTab === item.id
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {item.icon}
              <span className="mt-1 text-xs">{item.label}</span>
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="mt-1 h-1 w-4 rounded-full bg-indigo-600 dark:bg-indigo-400"
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowSettings(false)}
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-bold dark:text-white">Settings</h2>

              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium dark:text-white">Dark Mode</span>
                  <button
                    onClick={toggleDarkMode}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      darkMode
                        ? "bg-indigo-600"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        darkMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="block font-medium dark:text-white">
                    AI Assistant Mode
                  </label>
                  <select
                    defaultValue="balanced"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/80 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white"
                  >
                    <option value="proactive">Proactive</option>
                    <option value="balanced">Balanced</option>
                    <option value="minimal">Minimal</option>
                    <option value="off">Off</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium dark:text-white">
                    Notification Preferences
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notif-urgent"
                        defaultChecked
                        className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                      />
                      <label
                        htmlFor="notif-urgent"
                        className="ml-2 text-sm dark:text-white"
                      >
                        Urgent tickets
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notif-assigned"
                        defaultChecked
                        className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                      />
                      <label
                        htmlFor="notif-assigned"
                        className="ml-2 text-sm dark:text-white"
                      >
                        Assigned tickets
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="notif-insights"
                        defaultChecked
                        className="form-checkbox h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-indigo-400"
                      />
                      <label
                        htmlFor="notif-insights"
                        className="ml-2 text-sm dark:text-white"
                      >
                        AI insights
                      </label>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
                  <div className="flex items-start">
                    <div className="mr-3 mt-0.5 text-indigo-600 dark:text-indigo-400">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-indigo-800 dark:text-indigo-300">
                        AI Settings Recommendation
                      </p>
                      <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-200">
                        Based on your usage patterns, enabling desktop
                        notifications for urgent tickets could improve response
                        times by up to 35%.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 py-2 text-sm font-medium text-white shadow hover:shadow-md"
                    onClick={() => setShowSettings(false)}
                  >
                    Save Settings
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------------------------------------------------------------------Modals------------------------------------------------------------------------- */}
      {/* Agent Details */}
      <AnimatePresence>
        {showAgentDetails && selectedAgent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowAgentDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowAgentDetails(false)}
              >
                <X size={20} />
              </button>

              <div className="flex items-center">
                <div className="relative mr-4">
                  <Image
                    src={
                      selectedAgent.avatar ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                    }
                    width={64}
                    height={64}
                    alt={selectedAgent.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${
                      selectedAgent.status === "available"
                        ? "bg-green-500"
                        : selectedAgent.status === "busy"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    } dark:border-gray-800`}
                  ></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold dark:text-white">
                    {selectedAgent.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedAgent.email}
                  </p>
                  <div className="mt-1 flex items-center">
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">
                      {selectedAgent.role?.charAt(0).toUpperCase() +
                        selectedAgent.role?.slice(1)}
                    </span>
                    <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
                      {selectedAgent.department}
                    </span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                        selectedAgent.status === "available"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                          : selectedAgent.status === "busy"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {selectedAgent.status?.charAt(0).toUpperCase() +
                        selectedAgent.status?.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-lg font-semibold dark:text-white">
                    Performance Metrics
                  </h3>
                  <div className="space-y-3">
                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Average Response Time
                        </p>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          {selectedAgent.performance?.responseTime} min
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                        <div
                          className="h-full rounded-full bg-indigo-600"
                          style={{
                            width: `${100 - (selectedAgent.performance?.responseTime / 30) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Average Resolution Time
                        </p>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          {selectedAgent.performance?.resolutionTime} min
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                        <div
                          className="h-full rounded-full bg-indigo-600"
                          style={{
                            width: `${100 - (selectedAgent.performance?.resolutionTime / 500) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Customer Satisfaction
                        </p>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          {selectedAgent.performance?.satisfaction}%
                        </span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                        <div
                          className="h-full rounded-full bg-indigo-600"
                          style={{
                            width: `${selectedAgent.performance?.satisfaction}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Tickets Resolved
                        </p>
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          {selectedAgent.performance?.ticketsResolved}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-lg font-semibold dark:text-white">
                    Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.expertise?.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <h3 className="mb-3 mt-6 text-lg font-semibold dark:text-white">
                    Current Workload
                  </h3>
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Active Tickets
                      </p>
                      <span className="font-medium text-indigo-600 dark:text-indigo-400">
                        8
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-4 gap-2">
                      <div className="rounded bg-green-100 p-2 text-center text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-200">
                        3 Open
                      </div>
                      <div className="rounded bg-yellow-100 p-2 text-center text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">
                        2 Pending
                      </div>
                      <div className="rounded bg-red-100 p-2 text-center text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-200">
                        1 Urgent
                      </div>
                      <div className="rounded bg-purple-100 p-2 text-center text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
                        2 New
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5 text-indigo-600 dark:text-indigo-400">
                        <Sparkles size={18} />
                      </div>
                      <div>
                        <p className="font-medium text-indigo-800 dark:text-indigo-300">
                          AI Performance Insights
                        </p>
                        <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-200">
                          {selectedAgent.name} excels at resolving complex
                          technical issues with a 96% satisfaction rate.
                          Consider assigning more Salesforce integration tickets
                          to leverage their expertise in this area.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowAgentDetails(false)}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                >
                  View Full Profile
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Insights */}
      <AnimatePresence>
        {showInsightDetails && selectedInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowInsightDetails(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur-sm dark:bg-gray-800/90"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 text-gray-500 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => setShowInsightDetails(false)}
              >
                <X size={20} />
              </button>

              <div className="flex items-center">
                <div
                  className={`mr-4 rounded-full p-3 ${
                    selectedInsight.type === "trend"
                      ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                      : selectedInsight.type === "anomaly"
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        : selectedInsight.type === "suggestion"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {selectedInsight.type === "trend" && <TrendingUp size={24} />}
                  {selectedInsight.type === "anomaly" && (
                    <AlertCircle size={24} />
                  )}
                  {selectedInsight.type === "suggestion" && (
                    <Lightbulb size={24} />
                  )}
                  {selectedInsight.type === "prediction" && <Gauge size={24} />}
                </div>
                <div>
                  <div className="flex items-center">
                    <h2 className="text-2xl font-bold dark:text-white">
                      {selectedInsight.title}
                    </h2>
                    <span
                      className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        selectedInsight.impact === "positive"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200"
                          : selectedInsight.impact === "negative"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                      }`}
                    >
                      {selectedInsight.impact?.charAt(0).toUpperCase() +
                        selectedInsight.impact?.slice(1)}{" "}
                      Impact
                    </span>
                  </div>
                  <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="capitalize">{selectedInsight.type}</span>
                    <span className="mx-1.5">•</span>
                    <span>{selectedInsight.category}</span>
                    <span className="mx-1.5">•</span>
                    <span>
                      {new Date(selectedInsight.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedInsight.description}
                  </p>
                </div>

                {selectedInsight.relatedData && (
                  <div className="mt-4">
                    <h3 className="mb-3 text-lg font-semibold dark:text-white">
                      Related Data
                    </h3>
                    <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                      {/* This would be populated with charts or data visualizations */}
                      <p className="text-gray-700 dark:text-gray-300">
                        Data visualization would be displayed here based on the
                        insight type.
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <h3 className="mb-3 text-lg font-semibold dark:text-white">
                    Recommended Actions
                  </h3>
                  <div className="space-y-2">
                    <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5 text-indigo-600 dark:text-indigo-400">
                          <Lightbulb size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-indigo-800 dark:text-indigo-300">
                            Update knowledge base articles
                          </p>
                          <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-200">
                            Create or update articles related to this issue to
                            help customers self-serve.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-900/20">
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5 text-indigo-600 dark:text-indigo-400">
                          <Zap size={18} />
                        </div>
                        <div>
                          <p className="font-medium text-indigo-800 dark:text-indigo-300">
                            Create automation rule
                          </p>
                          <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-200">
                            Set up an automation to handle similar issues more
                            efficiently in the future.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowInsightDetails(false)}
                >
                  Dismiss
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
                >
                  Take Action
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
}
