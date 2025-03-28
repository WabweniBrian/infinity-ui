"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Heart,
  AlertTriangle,
  CheckCircle,
  MessageSquare,
  ShoppingCart,
  CreditCard,
  Package,
  HelpCircle,
  Star,
  Filter,
  Search,
  X,
  ArrowRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

type TouchpointType =
  | "awareness"
  | "consideration"
  | "purchase"
  | "onboarding"
  | "retention"
  | "advocacy";
type SentimentType = "positive" | "neutral" | "negative";

interface Touchpoint {
  id: string;
  type: TouchpointType;
  name: string;
  description: string;
  sentiment: SentimentType;
  painPoints: string[];
  opportunities: string[];
  metrics: {
    name: string;
    value: number;
    unit: string;
    trend: "up" | "down" | "stable";
  }[];
}

interface CustomerPersona {
  id: string;
  name: string;
  avatar: string;
  age: number;
  occupation: string;
  goals: string[];
  painPoints: string[];
}

const CustomerJourneyMap = () => {
  const [touchpoints, setTouchpoints] = useState<Touchpoint[]>([]);
  const [personas, setPersonas] = useState<CustomerPersona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTouchpoint, setSelectedTouchpoint] =
    useState<Touchpoint | null>(null);
  const [selectedPersona, setSelectedPersona] =
    useState<CustomerPersona | null>(null);
  const [typeFilter, setTypeFilter] = useState<TouchpointType | "all">("all");
  const [sentimentFilter, setSentimentFilter] = useState<SentimentType | "all">(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const mockTouchpoints: Touchpoint[] = [
          {
            id: "1",
            type: "awareness",
            name: "Social Media Discovery",
            description:
              "Customer discovers the product through social media ads or content",
            sentiment: "positive",
            painPoints: [
              "Ad fatigue from seeing too many similar ads",
              "Unclear value proposition in ad content",
            ],
            opportunities: [
              "Personalize ad content based on user interests",
              "Showcase real customer testimonials in ads",
            ],
            metrics: [
              {
                name: "Click-through rate",
                value: 3.2,
                unit: "%",
                trend: "up",
              },
              { name: "Cost per click", value: 1.45, unit: "$", trend: "down" },
            ],
          },
          {
            id: "2",
            type: "consideration",
            name: "Product Research",
            description:
              "Customer researches product features, pricing, and reviews",
            sentiment: "neutral",
            painPoints: [
              "Difficulty comparing features with competitors",
              "Insufficient product information",
            ],
            opportunities: [
              "Create comparison charts with competitors",
              "Add more detailed product specifications",
            ],
            metrics: [
              { name: "Time on page", value: 2.5, unit: "min", trend: "up" },
              { name: "Bounce rate", value: 45, unit: "%", trend: "down" },
            ],
          },
          {
            id: "3",
            type: "purchase",
            name: "Checkout Process",
            description: "Customer adds product to cart and completes purchase",
            sentiment: "negative",
            painPoints: [
              "Too many steps in checkout process",
              "Limited payment options",
              "Unexpected shipping costs",
            ],
            opportunities: [
              "Streamline checkout to fewer steps",
              "Add more payment methods",
              "Show shipping costs earlier",
            ],
            metrics: [
              { name: "Cart abandonment", value: 68, unit: "%", trend: "up" },
              { name: "Conversion rate", value: 2.1, unit: "%", trend: "down" },
            ],
          },
          {
            id: "4",
            type: "onboarding",
            name: "Product Setup",
            description:
              "Customer receives product and goes through initial setup",
            sentiment: "neutral",
            painPoints: [
              "Confusing setup instructions",
              "Difficulty activating certain features",
            ],
            opportunities: [
              "Create video tutorials for setup",
              "Implement interactive onboarding guide",
            ],
            metrics: [
              {
                name: "Setup completion",
                value: 78,
                unit: "%",
                trend: "stable",
              },
              { name: "Support tickets", value: 12, unit: "%", trend: "down" },
            ],
          },
          {
            id: "5",
            type: "retention",
            name: "Ongoing Usage",
            description:
              "Customer uses product regularly and engages with new features",
            sentiment: "positive",
            painPoints: [
              "Feature discovery is difficult",
              "Infrequent updates and improvements",
            ],
            opportunities: [
              "Implement feature spotlight notifications",
              "Create regular update schedule with user feedback",
            ],
            metrics: [
              {
                name: "Monthly active users",
                value: 82,
                unit: "%",
                trend: "up",
              },
              { name: "Feature adoption", value: 45, unit: "%", trend: "up" },
            ],
          },
          {
            id: "6",
            type: "advocacy",
            name: "Referrals & Reviews",
            description:
              "Customer recommends product to others and leaves positive reviews",
            sentiment: "positive",
            painPoints: [
              "No incentive for referrals",
              "Complicated review process",
            ],
            opportunities: [
              "Implement referral rewards program",
              "Simplify review submission process",
            ],
            metrics: [
              { name: "Net Promoter Score", value: 42, unit: "", trend: "up" },
              { name: "Referral rate", value: 8.5, unit: "%", trend: "stable" },
            ],
          },
        ];

        const mockPersonas: CustomerPersona[] = [
          {
            id: "1",
            name: "Sarah Johnson",
            avatar:
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            age: 32,
            occupation: "Marketing Manager",
            goals: [
              "Increase efficiency in daily tasks",
              "Find tools that integrate with existing systems",
              "Stay within department budget",
            ],
            painPoints: [
              "Limited time for research",
              "Needs approval from multiple stakeholders",
              "Previous bad experience with similar products",
            ],
          },
          {
            id: "2",
            name: "Michael Chen",
            avatar:
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            age: 45,
            occupation: "Small Business Owner",
            goals: [
              "Reduce operational costs",
              "Improve customer satisfaction",
              "Scale business efficiently",
            ],
            painPoints: [
              "Limited technical knowledge",
              "Budget constraints",
              "Needs quick implementation",
            ],
          },
          {
            id: "3",
            name: "Emily Rodriguez",
            avatar:
              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
            age: 28,
            occupation: "UX Designer",
            goals: [
              "Find intuitive tools for team collaboration",
              "Improve design workflow",
              "Track project progress effectively",
            ],
            painPoints: [
              "Frustrated by complex interfaces",
              "Needs seamless file sharing",
              "Requires mobile accessibility",
            ],
          },
        ];

        setTouchpoints(mockTouchpoints);
        setPersonas(mockPersonas);
        setSelectedTouchpoint(mockTouchpoints[0]);
        setSelectedPersona(mockPersonas[0]);
        setError(null);
      } catch (err) {
        setError(
          "Failed to load customer journey data. Please try again later.",
        );
        console.error("Error fetching journey data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getTypeIcon = (type: TouchpointType) => {
    switch (type) {
      case "awareness":
        return <Users className="h-5 w-5 text-blue-500" />;
      case "consideration":
        return <Search className="h-5 w-5 text-purple-500" />;
      case "purchase":
        return <ShoppingCart className="h-5 w-5 text-green-500" />;
      case "onboarding":
        return <CheckCircle className="h-5 w-5 text-teal-500" />;
      case "retention":
        return <Heart className="h-5 w-5 text-red-500" />;
      case "advocacy":
        return <Star className="h-5 w-5 text-amber-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: TouchpointType) => {
    switch (type) {
      case "awareness":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "consideration":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "purchase":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "onboarding":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300";
      case "retention":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "advocacy":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getSentimentIcon = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "positive":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "neutral":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "negative":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getSentimentColor = (sentiment: SentimentType) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "neutral":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getTrendIcon = (trend: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <ArrowRight className="h-3 w-3 rotate-45 text-green-500" />;
      case "down":
        return <ArrowRight className="rotate-135 h-3 w-3 text-red-500" />;
      case "stable":
        return <ArrowRight className="h-3 w-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const filteredTouchpoints = touchpoints.filter((touchpoint) => {
    if (typeFilter !== "all" && touchpoint.type !== typeFilter) return false;
    if (sentimentFilter !== "all" && touchpoint.sentiment !== sentimentFilter)
      return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        touchpoint.name.toLowerCase().includes(query) ||
        touchpoint.description.toLowerCase().includes(query) ||
        touchpoint.painPoints.some((point) =>
          point.toLowerCase().includes(query),
        ) ||
        touchpoint.opportunities.some((opp) =>
          opp.toLowerCase().includes(query),
        )
      );
    }
    return true;
  });

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
            <Users className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Customer Journey Map
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search touchpoints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 rounded-md border border-gray-300 bg-white pl-9 pr-3 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-rose-400 dark:focus:ring-rose-400"
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  <Filter className="mr-1 h-4 w-4" />
                  Stage: {typeFilter === "all" ? "All" : typeFilter}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                  All Stages
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("awareness")}>
                  Awareness
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTypeFilter("consideration")}
                >
                  Consideration
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("purchase")}>
                  Purchase
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("onboarding")}>
                  Onboarding
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("retention")}>
                  Retention
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTypeFilter("advocacy")}>
                  Advocacy
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
                  <Filter className="mr-1 h-4 w-4" />
                  Sentiment:{" "}
                  {sentimentFilter === "all" ? "All" : sentimentFilter}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSentimentFilter("all")}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSentimentFilter("positive")}
                >
                  Positive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSentimentFilter("neutral")}>
                  Neutral
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSentimentFilter("negative")}
                >
                  Negative
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Journey Stages */}
        <div className="border-b border-gray-200 p-4 dark:border-gray-800 md:border-b-0 md:border-r">
          <h4 className="mb-4 font-medium text-gray-900 dark:text-white">
            Journey Stages
          </h4>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
                  <div className="mt-2 h-8 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
              <p className="text-center text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
              <button
                className="mt-2 w-full rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : filteredTouchpoints.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Users className="mb-2 h-10 w-10 text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No touchpoints match your filters
              </p>
              <button
                className="mt-2 text-sm font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300"
                onClick={() => {
                  setSearchQuery("");
                  setTypeFilter("all");
                  setSentimentFilter("all");
                }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="max-h-[400px] space-y-3 overflow-y-auto pr-1">
              <AnimatePresence>
                {filteredTouchpoints.map((touchpoint) => (
                  <motion.div
                    key={touchpoint.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                      selectedTouchpoint?.id === touchpoint.id
                        ? "border-rose-500 bg-rose-50 dark:border-rose-400 dark:bg-rose-900/20"
                        : "border-gray-200 bg-white hover:border-rose-200 hover:bg-rose-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-rose-900 dark:hover:bg-rose-900/10"
                    }`}
                    onClick={() => setSelectedTouchpoint(touchpoint)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`rounded-full p-1.5 ${getTypeColor(touchpoint.type)}`}
                        >
                          {getTypeIcon(touchpoint.type)}
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white">
                            {touchpoint.name}
                          </h5>
                          <div className="flex items-center gap-1 text-xs">
                            <span className="capitalize text-gray-500 dark:text-gray-400">
                              {touchpoint.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getSentimentColor(touchpoint.sentiment)}`}
                      >
                        {getSentimentIcon(touchpoint.sentiment)}
                        <span className="ml-1 capitalize">
                          {touchpoint.sentiment}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Touchpoint Details */}
        <div className="col-span-2 p-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <motion.div
                className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-rose-500"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Loading journey data...
              </p>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
              <p className="text-center text-sm text-red-600 dark:text-red-400">
                {error}
              </p>
              <button
                className="mt-2 w-full rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          ) : selectedTouchpoint ? (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${getTypeColor(selectedTouchpoint.type)}`}
                  >
                    {getTypeIcon(selectedTouchpoint.type)}
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                      {selectedTouchpoint.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedTouchpoint.description}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${getSentimentColor(selectedTouchpoint.sentiment)}`}
                >
                  {getSentimentIcon(selectedTouchpoint.sentiment)}
                  <span className="ml-1 capitalize">
                    {selectedTouchpoint.sentiment} experience
                  </span>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <h5 className="mb-3 font-medium text-gray-900 dark:text-white">
                    Pain Points
                  </h5>
                  <ul className="space-y-2">
                    {selectedTouchpoint.painPoints.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <h5 className="mb-3 font-medium text-gray-900 dark:text-white">
                    Opportunities
                  </h5>
                  <ul className="space-y-2">
                    {selectedTouchpoint.opportunities.map(
                      (opportunity, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {opportunity}
                          </span>
                        </motion.li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h5 className="mb-3 font-medium text-gray-900 dark:text-white">
                  Key Metrics
                </h5>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {selectedTouchpoint.metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div className="flex items-center justify-between">
                        <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {metric.name}
                        </h6>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                        {metric.value}
                        {metric.unit}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="mb-3 font-medium text-gray-900 dark:text-white">
                  Customer Personas
                </h5>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {personas.map((persona, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`cursor-pointer rounded-lg border p-3 transition-colors ${
                        selectedPersona?.id === persona.id
                          ? "border-rose-500 bg-rose-50 dark:border-rose-400 dark:bg-rose-900/20"
                          : "border-gray-200 bg-white hover:border-rose-200 hover:bg-rose-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-rose-900 dark:hover:bg-rose-900/10"
                      }`}
                      onClick={() => setSelectedPersona(persona)}
                    >
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            persona.avatar ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          width={40}
                          height={40}
                          alt={persona.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <h6 className="font-medium text-gray-900 dark:text-white">
                            {persona.name}
                          </h6>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {persona.age} • {persona.occupation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="mb-2 h-12 w-12 text-gray-400" />
              <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                Select a Touchpoint
              </h5>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose a touchpoint from the journey stages to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerJourneyMap;
