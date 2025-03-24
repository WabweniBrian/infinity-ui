import {
  Activity,
  BarChartIcon,
  Twitter,
  Users,
  Newspaper,
} from "lucide-react";

export type SentimentSource =
  | "social"
  | "news"
  | "analyst"
  | "technical"
  | "overall";
export type SentimentType = "bullish" | "bearish" | "neutral";
export type TimeFrame = "1d" | "7d" | "30d" | "90d";

export type SentimentData = {
  source: SentimentSource;
  bullish: number;
  bearish: number;
  neutral: number;
  score: number; // -100 to 100
  change: number;
};

export type SentimentHistoryPoint = {
  date: string;
  score: number;
};

export type KeywordData = {
  keyword: string;
  count: number;
  sentiment: number; // -100 to 100
};

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  url: string;
  timestamp: number;
  sentiment: SentimentType;
  score: number; // -100 to 100
  keywords: string[];
};

// Sample data
export const sentimentData: SentimentData[] = [
  {
    source: "social",
    bullish: 65,
    bearish: 20,
    neutral: 15,
    score: 45,
    change: 5,
  },
  {
    source: "news",
    bullish: 55,
    bearish: 30,
    neutral: 15,
    score: 25,
    change: -3,
  },
  {
    source: "analyst",
    bullish: 70,
    bearish: 15,
    neutral: 15,
    score: 55,
    change: 10,
  },
  {
    source: "technical",
    bullish: 60,
    bearish: 25,
    neutral: 15,
    score: 35,
    change: 0,
  },
  {
    source: "overall",
    bullish: 62,
    bearish: 23,
    neutral: 15,
    score: 39,
    change: 3,
  },
];

// Generate sample sentiment history
export const generateSentimentHistory = (
  timeframe: TimeFrame,
): SentimentHistoryPoint[] => {
  const history: SentimentHistoryPoint[] = [];
  let days: number;

  switch (timeframe) {
    case "1d":
      days = 1;
      break;
    case "7d":
      days = 7;
      break;
    case "30d":
      days = 30;
      break;
    case "90d":
      days = 90;
      break;
    default:
      days = 30;
  }

  const now = new Date();
  let score = 39; // Start with current score

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Random walk with mean reversion
    const change = Math.random() * 10 - 5 + (0 - score) * 0.05;
    score += change;

    // Clamp between -100 and 100
    score = Math.max(-100, Math.min(100, score));

    history.push({
      date: date.toISOString().split("T")[0],
      score,
    });
  }

  return history;
};

// Sample keywords data
export const keywords: KeywordData[] = [
  { keyword: "earnings", count: 245, sentiment: 65 },
  { keyword: "growth", count: 189, sentiment: 80 },
  { keyword: "revenue", count: 156, sentiment: 45 },
  { keyword: "competition", count: 132, sentiment: -20 },
  { keyword: "innovation", count: 124, sentiment: 75 },
  { keyword: "regulation", count: 112, sentiment: -40 },
  { keyword: "expansion", count: 98, sentiment: 60 },
  { keyword: "dividend", count: 87, sentiment: 50 },
  { keyword: "lawsuit", count: 76, sentiment: -65 },
  { keyword: "partnership", count: 72, sentiment: 70 },
  { keyword: "acquisition", count: 68, sentiment: 30 },
  { keyword: "layoffs", count: 54, sentiment: -75 },
  { keyword: "CEO", count: 48, sentiment: 10 },
  { keyword: "debt", count: 42, sentiment: -50 },
  { keyword: "profit", count: 38, sentiment: 55 },
];

// Sample news data
export const news: NewsItem[] = [
  {
    id: "1",
    title: "Apple Reports Record Q4 Earnings, Beats Analyst Expectations",
    source: "Financial Times",
    url: "#",
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    sentiment: "bullish",
    score: 78,
    keywords: ["earnings", "growth", "revenue"],
  },
  {
    id: "2",
    title: "Microsoft Announces New AI Partnership with OpenAI",
    source: "TechCrunch",
    url: "#",
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    sentiment: "bullish",
    score: 85,
    keywords: ["partnership", "innovation", "AI"],
  },
  {
    id: "3",
    title: "Tesla Faces Production Challenges in Berlin Factory",
    source: "Reuters",
    url: "#",
    timestamp: Date.now() - 8 * 60 * 60 * 1000,
    sentiment: "bearish",
    score: -45,
    keywords: ["production", "challenges", "supply chain"],
  },
  {
    id: "4",
    title: "Amazon Web Services Expands Data Center Footprint in Asia",
    source: "Bloomberg",
    url: "#",
    timestamp: Date.now() - 12 * 60 * 60 * 1000,
    sentiment: "bullish",
    score: 62,
    keywords: ["expansion", "growth", "cloud"],
  },
  {
    id: "5",
    title: "Google Faces New Antitrust Lawsuit from Department of Justice",
    source: "Wall Street Journal",
    url: "#",
    timestamp: Date.now() - 18 * 60 * 60 * 1000,
    sentiment: "bearish",
    score: -58,
    keywords: ["lawsuit", "regulation", "antitrust"],
  },
  {
    id: "6",
    title: "Netflix Subscriber Growth Slows in Q3, Stock Drops 8%",
    source: "CNBC",
    url: "#",
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    sentiment: "bearish",
    score: -65,
    keywords: ["subscribers", "growth", "streaming"],
  },
  {
    id: "7",
    title: "Meta Platforms Announces New VR Headset, Shares Rise",
    source: "The Verge",
    url: "#",
    timestamp: Date.now() - 36 * 60 * 60 * 1000,
    sentiment: "bullish",
    score: 52,
    keywords: ["VR", "innovation", "metaverse"],
  },
];

// Helper functions
export const formatPercent = (value: number) => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const getChangeColor = (value: number) => {
  if (value > 0) return "text-green-500";
  if (value < 0) return "text-red-500";
  return "text-gray-500";
};

export const getSentimentColor = (sentiment: SentimentType | number) => {
  if (
    sentiment === "bullish" ||
    (typeof sentiment === "number" && sentiment > 0)
  ) {
    return "text-green-500";
  }
  if (
    sentiment === "bearish" ||
    (typeof sentiment === "number" && sentiment < 0)
  ) {
    return "text-red-500";
  }
  return "text-gray-500";
};

export const getSentimentBgColor = (sentiment: SentimentType | number) => {
  if (
    sentiment === "bullish" ||
    (typeof sentiment === "number" && sentiment > 0)
  ) {
    return "bg-green-500";
  }
  if (
    sentiment === "bearish" ||
    (typeof sentiment === "number" && sentiment < 0)
  ) {
    return "bg-red-500";
  }
  return "bg-gray-500";
};

export const getSentimentGradient = (score: number) => {
  if (score > 50) return "from-green-500 to-green-700";
  if (score > 0) return "from-green-400 to-green-600";
  if (score > -50) return "from-red-400 to-red-600";
  return "from-red-500 to-red-700";
};

export const formatTimeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export const getSourceIcon = (source: SentimentSource) => {
  switch (source) {
    case "social":
      return <Twitter className="h-5 w-5 text-blue-400" />;
    case "news":
      return <Newspaper className="h-5 w-5 text-amber-400" />;
    case "analyst":
      return <Users className="h-5 w-5 text-purple-400" />;
    case "technical":
      return <BarChartIcon className="h-5 w-5 text-green-400" />;
    case "overall":
      return <Activity className="h-5 w-5 text-white" />;
  }
};

export const getSourceName = (source: SentimentSource) => {
  switch (source) {
    case "social":
      return "Social Media";
    case "news":
      return "News Articles";
    case "analyst":
      return "Analyst Ratings";
    case "technical":
      return "Technical Indicators";
    case "overall":
      return "Overall Sentiment";
  }
};
