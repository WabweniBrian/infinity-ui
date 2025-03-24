"use client";

import type React from "react";

import useMediaQuery from "@/hooks/use-media-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Calendar,
  Clock,
  Edit,
  FacebookIcon,
  FileText,
  Heart,
  HelpCircle,
  ImagePlus,
  Instagram,
  Layout,
  LineChart,
  Link,
  Linkedin,
  Lock,
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  MoreHorizontal,
  PenTool,
  PlusCircle,
  Search,
  Settings,
  Share2,
  Sparkles,
  Sun,
  Target,
  ThumbsUp,
  Trash,
  TrendingUp,
  Twitter,
  Upload,
  Users,
  Video,
  X,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ContentCalendar from "./content-calendar";
import ChatModal from "./social-media-chat-modal";

// Types
type User = {
  name: string;
  email: string;
  avatar: string;
  businessName: string;
  plan: "free" | "premium" | "enterprise";
};

type SocialPlatform =
  | "instagram"
  | "twitter"
  | "linkedin"
  | "tiktok"
  | "youtube"
  | "facebook";

type SocialAccount = {
  id: string;
  platform: SocialPlatform;
  handle: string;
  followers: number;
  engagement: number;
  profileUrl: string;
  connected: boolean;
  avatar?: string;
};

type ContentType =
  | "image"
  | "video"
  | "carousel"
  | "text"
  | "story"
  | "reel"
  | "tweet";

type ContentStatus = "draft" | "scheduled" | "published" | "failed";

type ContentPost = {
  id: string;
  title: string;
  description: string;
  contentType: ContentType;
  platforms: SocialPlatform[];
  mediaUrls: string[];
  status: ContentStatus;
  scheduledDate?: Date;
  publishedDate?: Date;
  performance?: {
    likes: number;
    comments: number;
    shares: number;
    impressions: number;
    clicks?: number;
    engagement?: number;
    reach?: number;
  };
  tags: string[];
  color: string;
  author?: string;
  approvalStatus?: "pending" | "approved" | "rejected";
  notes?: string;
};

type ContentIdea = {
  id: string;
  title: string;
  description: string;
  suggestedContentType: ContentType;
  suggestedPlatforms: SocialPlatform[];
  relevanceScore: number;
  category: string;
  tags: string[];
};

type AudienceData = {
  ageGroups: {
    range: string;
    percentage: number;
  }[];
  genderDistribution: {
    gender: string;
    percentage: number;
  }[];
  topLocations: {
    location: string;
    percentage: number;
  }[];
  activeHours: {
    hour: number;
    activity: number;
  }[];
};

type AudienceInsight = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  data: {
    percentage: number;
    label: string;
  };
};

type AIRecommendation = {
  id: string;
  title: string;
  description: string;
  type: "content" | "timing" | "audience" | "hashtag" | "trend";
  impact: "high" | "medium" | "low";
  actionable: boolean;
  implemented: boolean;
};

type InsightCard = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
};

type View =
  | "dashboard"
  | "content"
  | "calendar"
  | "analytics"
  | "audience"
  | "assistant"
  | "settings";

// Sample data
const user: User = {
  name: "Wabweni Brian",
  email: "brian@digitalcreative.com",
  avatar: "/images/default-avatar.png",
  businessName: "Digital Creative Co.",
  plan: "premium",
};

const socialAccounts: SocialAccount[] = [
  {
    id: "1",
    platform: "instagram",
    handle: "@digitalcreativeco",
    followers: 12500,
    engagement: 3.8,
    profileUrl: "https://instagram.com/digitalcreativeco",
    connected: true,
    avatar: "/images/default-avatar.png",
  },
  {
    id: "2",
    platform: "twitter",
    handle: "@digitalcreative",
    followers: 8200,
    engagement: 2.1,
    profileUrl: "https://twitter.com/digitalcreative",
    connected: true,
    avatar: "/images/default-avatar.png",
  },
  {
    id: "3",
    platform: "linkedin",
    handle: "Digital Creative Co.",
    followers: 5600,
    engagement: 1.7,
    profileUrl: "https://linkedin.com/company/digitalcreativeco",
    connected: true,
    avatar: "/images/default-avatar.png",
  },
  {
    id: "4",
    platform: "tiktok",
    handle: "@digitalcreativeco",
    followers: 15800,
    engagement: 5.2,
    profileUrl: "https://tiktok.com/@digitalcreativeco",
    connected: true,
    avatar: "/images/default-avatar.png",
  },
];

const contentPosts: ContentPost[] = [
  {
    id: "1",
    title: "Summer Product Launch",
    description:
      "Introducing our new summer collection with vibrant colors and innovative designs.",
    contentType: "carousel",
    platforms: ["instagram", "facebook"],
    mediaUrls: ["/default-image.jpg"],
    status: "published",
    publishedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    performance: {
      likes: 842,
      comments: 56,
      shares: 24,
      impressions: 3500,
      engagement: 2.7,
      reach: 5200,
    },
    tags: ["product", "launch", "summer"],
    color: "#8b5cf6",
    author: "Marketing Team",
    notes:
      "This post performed exceptionally well with our target demographic.",
  },
  {
    id: "2",
    title: "Design Tips & Tricks",
    description:
      "5 essential design principles every creative should know. Swipe through for tips!",
    contentType: "carousel",
    platforms: ["instagram", "linkedin"],
    mediaUrls: ["/default-image.jpg"],
    status: "scheduled",
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1), // 1 day in future
    tags: ["design", "tips", "creative"],
    color: "#ec4899",
    author: "Design Team",
    approvalStatus: "approved",
    notes: "Final approval received from brand director.",
  },
  {
    id: "3",
    title: "Client Success Story",
    description:
      "How we helped @techstartup increase their engagement by 200% in just 3 months.",
    contentType: "video",
    platforms: ["linkedin", "twitter"],
    mediaUrls: ["/default-image.jpg"],
    status: "draft",
    tags: ["success", "case study", "results"],
    color: "#3b82f6",
    author: "Client Relations",
    approvalStatus: "pending",
    notes: "Waiting for client approval before scheduling.",
  },
  {
    id: "4",
    title: "Behind the Scenes",
    description: "Take a peek into our creative process and studio space!",
    contentType: "reel",
    platforms: ["instagram", "tiktok"],
    mediaUrls: ["/default-image.jpg"],
    status: "published",
    publishedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    performance: {
      likes: 1253,
      comments: 87,
      shares: 45,
      impressions: 7800,
      engagement: 3.2,
      reach: 9400,
    },
    tags: ["studio", "creative", "behindthescenes"],
    color: "#f97316",
    author: "Creative Team",
    notes: "Consider creating a series based on positive engagement.",
  },
  {
    id: "5",
    title: "Industry Trends 2023",
    description:
      "Our analysis of the top 10 trends shaping the industry this year.",
    contentType: "carousel",
    platforms: ["linkedin", "twitter", "facebook"],
    mediaUrls: ["/default-image.jpg"],
    status: "scheduled",
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days in future
    tags: ["trends", "industry", "analysis"],
    color: "#06b6d4",
    author: "Research Team",
    approvalStatus: "approved",
    notes: "Coordinate with sales team for follow-up content.",
  },
  {
    id: "6",
    title: "Customer Testimonial",
    description:
      "Hear what our customers are saying about our latest product release.",
    contentType: "video",
    platforms: ["youtube", "facebook", "linkedin"],
    mediaUrls: ["/default-image.jpg"],
    status: "published",
    publishedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    performance: {
      likes: 567,
      comments: 42,
      shares: 31,
      impressions: 4200,
      engagement: 2.9,
      reach: 6100,
    },
    tags: ["testimonial", "customer", "feedback"],
    color: "#10b981",
    author: "Customer Success",
    notes:
      "Follow up with featured customers for additional content opportunities.",
  },
  {
    id: "7",
    title: "Product Tutorial",
    description: "Step-by-step guide on how to use our new feature set.",
    contentType: "video",
    platforms: ["youtube", "instagram"],
    mediaUrls: ["/default-image.jpg"],
    status: "draft",
    tags: ["tutorial", "howto", "product"],
    color: "#f59e0b",
    author: "Product Team",
    approvalStatus: "pending",
    notes: "Script needs final review from product manager.",
  },
  {
    id: "8",
    title: "Team Spotlight",
    description: "Meet the talented individuals behind our latest innovation.",
    contentType: "carousel",
    platforms: ["instagram", "linkedin"],
    mediaUrls: ["/default-image.jpg"],
    status: "scheduled",
    scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days in future
    tags: ["team", "spotlight", "people"],
    color: "#ef4444",
    author: "HR Team",
    approvalStatus: "approved",
    notes:
      "Coordinate with featured team members for sharing on personal accounts.",
  },
];

const contentIdeas: ContentIdea[] = [
  {
    id: "1",
    title: "Industry Trends 2023",
    description:
      "Create a carousel post highlighting the top 5 design trends for 2023.",
    suggestedContentType: "carousel",
    suggestedPlatforms: ["instagram", "linkedin"],
    relevanceScore: 92,
    category: "Educational",
    tags: ["trends", "design", "2023"],
  },
  {
    id: "2",
    title: "Day in the Life",
    description:
      "Film a day in the life of a designer at your studio. Show your process, tools, and workspace.",
    suggestedContentType: "reel",
    suggestedPlatforms: ["instagram", "tiktok"],
    relevanceScore: 88,
    category: "Behind the Scenes",
    tags: ["dayinthelife", "designer", "process"],
  },
  {
    id: "3",
    title: "Client Testimonial",
    description:
      "Interview your recent client about their experience working with your team.",
    suggestedContentType: "video",
    suggestedPlatforms: ["linkedin", "youtube"],
    relevanceScore: 85,
    category: "Testimonial",
    tags: ["client", "testimonial", "success"],
  },
  {
    id: "4",
    title: "Design Quiz",
    description:
      "Create an interactive quiz about design principles using Instagram Stories.",
    suggestedContentType: "story",
    suggestedPlatforms: ["instagram"],
    relevanceScore: 79,
    category: "Interactive",
    tags: ["quiz", "interactive", "design"],
  },
];

const audienceInsights: AudienceInsight[] = [
  {
    id: "1",
    title: "Age Demographics",
    description: "25-34 year olds make up your largest audience segment",
    icon: <Users size={20} />,
    color: "#8b5cf6",
    data: {
      percentage: 42,
      label: "25-34 years old",
    },
  },
  {
    id: "2",
    title: "Engagement Rate",
    description: "Your engagement rate is above industry average",
    icon: <Heart size={20} />,
    color: "#ec4899",
    data: {
      percentage: 3.8,
      label: "Avg. engagement rate",
    },
  },
  {
    id: "3",
    title: "Growth Trend",
    description: "Your follower growth increased by 12% this month",
    icon: <TrendingUp size={20} />,
    color: "#10b981",
    data: {
      percentage: 12,
      label: "Monthly growth rate",
    },
  },
];

const audienceData: AudienceData = {
  ageGroups: [
    { range: "18-24", percentage: 22 },
    { range: "25-34", percentage: 38 },
    { range: "35-44", percentage: 25 },
    { range: "45-54", percentage: 10 },
    { range: "55+", percentage: 5 },
  ],
  genderDistribution: [
    { gender: "Female", percentage: 58 },
    { gender: "Male", percentage: 40 },
    { gender: "Other", percentage: 2 },
  ],
  topLocations: [
    { location: "United States", percentage: 45 },
    { location: "United Kingdom", percentage: 15 },
    { location: "Canada", percentage: 12 },
    { location: "Australia", percentage: 8 },
    { location: "Germany", percentage: 5 },
  ],
  activeHours: Array.from({ length: 24 }).map((_, hour) => {
    // Create a pattern where activity peaks in morning and evening
    let activity = 30;
    if (hour >= 7 && hour <= 10) {
      activity = 60 + Math.floor(Math.random() * 20);
    } else if (hour >= 17 && hour <= 22) {
      activity = 70 + Math.floor(Math.random() * 30);
    } else if (hour >= 0 && hour <= 5) {
      activity = 10 + Math.floor(Math.random() * 10);
    }
    return { hour, activity };
  }),
};

const aiRecommendations: AIRecommendation[] = [
  {
    id: "1",
    title: "Optimal Posting Time",
    description:
      "Based on your audience activity, schedule Instagram posts between 7-9 PM for maximum engagement.",
    type: "timing",
    impact: "high",
    actionable: true,
    implemented: false,
  },
  {
    id: "2",
    title: "Content Gap",
    description:
      "Your audience engages most with educational content, but only 15% of your recent posts are educational. Consider creating more tutorials and how-to content.",
    type: "content",
    impact: "medium",
    actionable: true,
    implemented: false,
  },
  {
    id: "3",
    title: "Trending Hashtags",
    description:
      "The hashtags #DesignInspiration and #CreativeTips are trending in your niche. Consider incorporating them in your next posts.",
    type: "hashtag",
    impact: "medium",
    actionable: true,
    implemented: false,
  },
  {
    id: "4",
    title: "Audience Insight",
    description:
      "Your audience has grown 18% in the 25-34 age demographic. Consider creating more content targeted to young professionals.",
    type: "audience",
    impact: "high",
    actionable: true,
    implemented: false,
  },
];

const insightCards: InsightCard[] = [
  {
    id: "1",
    title: "Engagement Growth",
    description: "Your engagement rate is up 12% compared to last month",
    icon: <ThumbsUp size={20} />,
    color: "#8b5cf6",
  },
  {
    id: "2",
    title: "Top Performing Content",
    description: "Video content is outperforming images by 35%",
    icon: <Video size={20} />,
    color: "#ec4899",
  },
  {
    id: "3",
    title: "Audience Growth",
    description: "You've gained 1,450 new followers this month",
    icon: <Users size={20} />,
    color: "#3b82f6",
  },
];

// Chart data
const followerGrowthData = [
  { month: "Jan", instagram: 10200, twitter: 7100, linkedin: 4200 },
  { month: "Feb", instagram: 10600, twitter: 7300, linkedin: 4400 },
  { month: "Mar", instagram: 11100, twitter: 7500, linkedin: 4700 },
  { month: "Apr", instagram: 11400, twitter: 7700, linkedin: 4900 },
  { month: "May", instagram: 11800, twitter: 7900, linkedin: 5100 },
  { month: "Jun", instagram: 12200, twitter: 8100, linkedin: 5400 },
  { month: "Jul", instagram: 12500, twitter: 8200, linkedin: 5600 },
];

const engagementRateData = [
  { month: "Jan", rate: 3.1 },
  { month: "Feb", rate: 3.3 },
  { month: "Mar", rate: 3.0 },
  { month: "Apr", rate: 3.5 },
  { month: "May", rate: 3.2 },
  { month: "Jun", rate: 3.6 },
  { month: "Jul", rate: 3.8 },
];

const contentTypePerformanceData = [
  { type: "Image", engagement: 2.8 },
  { type: "Video", engagement: 4.2 },
  { type: "Carousel", engagement: 3.9 },
  { type: "Story", engagement: 2.1 },
  { type: "Reel", engagement: 5.3 },
];

const platformDistributionData = [
  { name: "Instagram", value: 45 },
  { name: "Twitter", value: 25 },
  { name: "LinkedIn", value: 20 },
  { name: "TikTok", value: 10 },
];

const AISocialMediaAssistant = () => {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [showAIAdviceModal, setShowAIAdviceModal] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<AIRecommendation | null>(null);
  const [showContentIdeaModal, setShowContentIdeaModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chartKey, setChartKey] = useState(0);
  const [activePlatformFilter, setActivePlatformFilter] = useState<
    SocialPlatform | "all"
  >("all");
  const [selectedContentIdea, setSelectedContentIdea] =
    useState<ContentIdea | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Regenerate chart key when view changes to prevent flickering
  useEffect(() => {
    setChartKey((prev) => prev + 1);
  }, [activeView]);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getPlatformIcon = (platform: SocialPlatform, size = 20) => {
    switch (platform) {
      case "instagram":
        return <Instagram size={size} />;
      case "twitter":
        return <Twitter size={size} />;
      case "linkedin":
        return <Link size={size} />;
      case "tiktok":
        return <Video size={size} />;
      case "youtube":
        return <Youtube size={size} />;
      case "facebook":
        return <Facebook size={size} />;
      default:
        return <Link size={size} />;
    }
  };

  // Custom Facebook icon since it's not in lucide-react
  const Facebook = ({ size = 24 }: { size?: number }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );

  const getContentTypeIcon = (contentType: ContentType, size = 20) => {
    switch (contentType) {
      case "image":
        return <ImagePlus size={size} />;
      case "video":
        return <Video size={size} />;
      case "carousel":
        return <Layout size={size} />;
      case "text":
        return <FileText size={size} />;
      case "story":
        return <Clock size={size} />;
      case "reel":
        return <Video size={size} />;
      case "tweet":
        return <Twitter size={size} />;
      default:
        return <FileText size={size} />;
    }
  };

  // Post CRUB functions
  const handleAddContent = () => {
    setShowAddContentModal(true);
  };

  const handleEditPost = (post: ContentPost) => {
    alert(`Editing post ${post.id}.....`);
  };

  const handleDeletePost = (postId: string) => {
    alert(`deleting post ${postId}....`);
  };

  // Logo Component
  const Logo = () => (
    <div className="flex items-center">
      <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md">
        <Sparkles size={20} />
      </div>
      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent dark:from-purple-400 dark:to-pink-400">
        AuraAI
      </span>
    </div>
  );

  // Sidebar Component
  const Sidebar = () => {
    return (
      <AnimatePresence>
        {(!isMobile || showMobileMenu) && (
          <motion.div
            initial={isMobile ? { x: -280 } : undefined}
            animate={isMobile ? { x: 0 } : undefined}
            exit={isMobile ? { x: -280 } : undefined}
            className={`${
              isMobile
                ? "fixed inset-y-0 left-0 z-40 h-screen w-72 overflow-y-auto bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:bg-gray-800/80"
                : "scrollbar-hover fixed left-0 top-0 h-screen w-72 overflow-y-auto border-r border-gray-100 bg-white/90 p-6 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-800/90"
            }`}
          >
            <div className="mb-8 flex items-center justify-between">
              <Logo />
              {isMobile && (
                <motion.button
                  className="rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => setShowMobileMenu(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={18} />
                </motion.button>
              )}
            </div>

            <div className="mb-6 flex items-center">
              <div className="relative mr-3 h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-purple-600 to-pink-600">
                <Image
                  src={user.avatar || "/images/default-avatar.png"}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold dark:text-white">{user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.businessName}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              <NavItem
                id="dashboard"
                label="Dashboard"
                icon={<BarChart3 className="h-5 w-5" />}
              />
              <NavItem
                id="content"
                label="Content Library"
                icon={<FileText className="h-5 w-5" />}
              />
              <NavItem
                id="calendar"
                label="Content Calendar"
                icon={<Calendar className="h-5 w-5" />}
              />
              <NavItem
                id="analytics"
                label="Analytics"
                icon={<LineChart className="h-5 w-5" />}
              />
              <NavItem
                id="audience"
                label="Audience Insights"
                icon={<Users className="h-5 w-5" />}
              />
              <NavItem
                id="assistant"
                label="AI Assistant"
                icon={<Sparkles className="h-5 w-5" />}
              />
              <NavItem
                id="settings"
                label="Settings"
                icon={<Settings className="h-5 w-5" />}
              />
            </nav>

            <div className="mt-6 space-y-2">
              <motion.button
                className="flex w-full items-center rounded-xl bg-purple-100 px-4 py-3 text-left text-sm font-medium text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-800/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowContentIdeaModal(true)}
              >
                <PenTool className="mr-3 h-5 w-5" />
                Generate Content Ideas
              </motion.button>

              <motion.button
                className="flex w-full items-center rounded-xl bg-pink-100 px-4 py-3 text-left text-sm font-medium text-pink-800 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:hover:bg-pink-800/40"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowChatModal(true)}
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                AI Content Assistant
              </motion.button>
            </div>

            <div className="mt-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 p-4 dark:from-purple-900/20 dark:to-pink-900/20">
              <h3 className="font-medium text-gray-800 dark:text-white">
                Connected Accounts
              </h3>
              <div className="mt-3 space-y-2">
                {socialAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="mr-2 text-gray-600 dark:text-gray-300">
                        {getPlatformIcon(account.platform, 16)}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {account.handle}
                      </span>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                ))}
              </div>
              <motion.button
                className="mt-3 flex w-full items-center justify-center rounded-lg bg-white/80 py-1.5 text-xs font-medium text-gray-700 shadow-sm backdrop-blur-sm hover:bg-white dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PlusCircle size={12} className="mr-1" />
                Add Account
              </motion.button>
            </div>

            <div className="mt-auto pt-6">
              <motion.button
                className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:bg-gray-700/70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                Help & Support
              </motion.button>
              <motion.button
                className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:bg-gray-700/70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Nav Item Component
  const NavItem = ({
    id,
    label,
    icon,
  }: {
    id: View;
    label: string;
    icon: React.ReactNode;
  }) => {
    return (
      <motion.button
        onClick={() => {
          setActiveView(id);
          if (isMobile) setShowMobileMenu(false);
        }}
        className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
          activeView === id
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            : "text-gray-700 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:bg-gray-700/70"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </motion.button>
    );
  };

  // Mobile Header Component
  const MobileHeader = () => {
    return (
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200/30 bg-white/95 px-4 py-3 backdrop-blur-xl dark:border-gray-700/30 dark:bg-gray-800/95">
        <div className="flex items-center">
          <motion.button
            className="mr-3 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={() => setShowMobileMenu(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={18} />
          </motion.button>
          <Logo />
        </div>
        <div className="flex items-center space-x-2">
          <motion.button
            className="relative rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={() => setShowNotifications(!showNotifications)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Bell size={18} />
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-pink-500"></span>
          </motion.button>
          <motion.button
            className="rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
        </div>
      </div>
    );
  };

  // Mobile Navigation Component
  const MobileNavigation = () => {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200/30 bg-white/80 py-2 backdrop-blur-xl dark:border-gray-700/30 dark:bg-gray-800/80">
        <div className="container mx-auto flex items-center justify-around">
          <NavButton
            id="dashboard"
            label="Home"
            icon={<BarChart3 className="h-6 w-6" />}
          />
          <NavButton
            id="content"
            label="Content"
            icon={<FileText className="h-6 w-6" />}
          />
          <NavButton
            id="analytics"
            label="Analytics"
            icon={<LineChart className="h-6 w-6" />}
          />
          <NavButton
            id="assistant"
            label="Assistant"
            icon={<Sparkles className="h-6 w-6" />}
          />
        </div>
      </div>
    );
  };

  // Nav Button Component
  const NavButton = ({
    id,
    label,
    icon,
  }: {
    id: View;
    label: string;
    icon: React.ReactNode;
  }) => {
    const isActive = activeView === id;

    return (
      <motion.button
        onClick={() => setActiveView(id)}
        className="flex flex-col items-center p-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div
          className={`${isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          {icon}
        </div>
        <span
          className={`mt-1 text-xs ${isActive ? "font-medium text-purple-600 dark:text-purple-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.button>
    );
  };

  // Content Card Component
  const ContentCard = ({ post }: { post: ContentPost }) => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: `${post.color}20` }}
          >
            {getContentTypeIcon(post.contentType)}
          </div>
          <div>
            <h3 className="font-medium dark:text-white">{post.title}</h3>
            <div className="flex flex-wrap gap-1">
              {post.platforms.map((platform) => (
                <div
                  key={platform}
                  className="flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  {getPlatformIcon(platform, 10)}
                  <span className="ml-1">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            post.status === "published"
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
              : post.status === "scheduled"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : post.status === "draft"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
        </div>
      </div>

      {post.mediaUrls.length > 0 && (
        <div className="mt-3 overflow-hidden rounded-lg">
          <Image
            src={post.mediaUrls[0] || "/default-image.jpg"}
            alt={post.title}
            width={400}
            height={300}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {post.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
          >
            #{tag}
          </span>
        ))}
      </div>

      {post.status === "published" && post.performance && (
        <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-gray-50 p-2 dark:bg-gray-700/50">
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Likes</p>
            <p className="font-medium dark:text-white">
              {formatNumber(post.performance.likes)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Comments</p>
            <p className="font-medium dark:text-white">
              {formatNumber(post.performance.comments)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Shares</p>
            <p className="font-medium dark:text-white">
              {formatNumber(post.performance.shares)}
            </p>
          </div>
        </div>
      )}

      {post.status === "scheduled" && post.scheduledDate && (
        <div className="mt-3 flex items-center justify-center rounded-lg bg-blue-50 p-2 dark:bg-blue-900/20">
          <Clock size={14} className="mr-2 text-blue-600 dark:text-blue-400" />
          <p className="text-xs text-blue-600 dark:text-blue-400">
            Scheduled for {formatDate(post.scheduledDate)}
          </p>
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        <motion.button
          className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Edit size={14} />
        </motion.button>
        <motion.button
          className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Share2 size={14} />
        </motion.button>
        <motion.button
          className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MoreHorizontal size={14} />
        </motion.button>
      </div>
    </motion.div>
  );

  // Content Idea Card Component
  const ContentIdeaCard = ({ idea }: { idea: ContentIdea }) => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
      whileHover={{ y: -5 }}
      onClick={() => {
        setSelectedContentIdea(idea);
        setShowContentIdeaModal(true);
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            {getContentTypeIcon(idea.suggestedContentType)}
          </div>
          <div>
            <h3 className="font-medium dark:text-white">{idea.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {idea.category}
            </p>
          </div>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
          <span className="text-xs font-bold">{idea.relevanceScore}</span>
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {idea.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1">
        {idea.suggestedPlatforms.map((platform) => (
          <div
            key={platform}
            className="flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          >
            {getPlatformIcon(platform, 10)}
            <span className="ml-1">
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {idea.tags.map((tag, index) => (
          <span
            key={index}
            className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <motion.button
          className="flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PenTool size={12} className="mr-1" />
          Create Content
        </motion.button>
      </div>
    </motion.div>
  );

  // AI Recommendation Card Component
  const AIRecommendationCard = ({
    recommendation,
  }: {
    recommendation: AIRecommendation;
  }) => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
      whileHover={{ y: -5 }}
      onClick={() => {
        setSelectedRecommendation(recommendation);
        setShowAIAdviceModal(true);
      }}
    >
      <div className="flex items-center">
        <div
          className={`mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
            recommendation.type === "content"
              ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
              : recommendation.type === "timing"
                ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                : recommendation.type === "audience"
                  ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                  : recommendation.type === "hashtag"
                    ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
          }`}
        >
          <Sparkles size={18} />
        </div>
        <div>
          <h3 className="font-medium dark:text-white">
            {recommendation.title}
          </h3>
          <div className="flex items-center">
            <span
              className={`mr-2 inline-block h-2 w-2 rounded-full ${
                recommendation.impact === "high"
                  ? "bg-red-500"
                  : recommendation.impact === "medium"
                    ? "bg-yellow-500"
                    : "bg-green-500"
              }`}
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {recommendation.impact.charAt(0).toUpperCase() +
                recommendation.impact.slice(1)}{" "}
              impact
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {recommendation.description}
      </p>
      <div className="mt-4 flex justify-end">
        <motion.button
          className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowRight size={12} className="mr-1" />
          Take Action
        </motion.button>
      </div>
    </motion.div>
  );

  // Insight Card Component
  const InsightCardComponent = ({ insight }: { insight: InsightCard }) => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center">
        <div
          className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: `${insight.color}20` }}
        >
          <span style={{ color: insight.color }}>{insight.icon}</span>
        </div>
        <div>
          <h3 className="font-medium dark:text-white">{insight.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {insight.description}
          </p>
        </div>
      </div>
    </motion.div>
  );

  // Audience Insight card
  const AudienceInsightCard = ({ insight }: { insight: AudienceInsight }) => {
    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
        whileHover={{ y: -5 }}
      >
        <div className="flex items-center">
          <div
            className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: `${insight.color}20` }}
          >
            <span style={{ color: insight.color }}>{insight.icon}</span>
          </div>
          <div>
            <h3 className="font-medium dark:text-white">{insight.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {insight.description}
            </p>
          </div>
        </div>
        {insight.data && (
          <div className="mt-3">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${insight.data.percentage}%`,
                  backgroundColor: insight.color,
                }}
                initial={{ width: 0 }}
                animate={{ width: `${insight.data.percentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>{insight.data.label}</span>
              <span>{insight.data.percentage}%</span>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  // Follower Growth Chart Component
  const FollowerGrowthChart = () => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        Follower Growth
      </h3>
      <ResponsiveContainer width="100%" height={300} key={chartKey}>
        <RechartsLineChart
          data={followerGrowthData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
          />
          <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
          <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="instagram"
            stroke="#8b5cf6"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="twitter"
            stroke="#3b82f6"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="linkedin"
            stroke="#10b981"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </motion.div>
  );

  // Engagement Rate Chart Component
  const EngagementRateChart = () => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        Engagement Rate Trend
      </h3>
      <ResponsiveContainer width="100%" height={300} key={chartKey}>
        <AreaChart
          data={engagementRateData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
          />
          <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
          <YAxis
            stroke={darkMode ? "#9ca3af" : "#6b7280"}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            formatter={(value) => [
              `${Number(value).toFixed(1)}%`,
              "Engagement Rate",
            ]}
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />
          <Area
            type="monotone"
            dataKey="rate"
            stroke="#8b5cf6"
            fillOpacity={1}
            fill="url(#engagementGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );

  // Content Type Performance Chart Component
  const ContentTypePerformanceChart = () => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        Content Type Performance
      </h3>
      <ResponsiveContainer width="100%" height={300} key={chartKey}>
        <RechartsBarChart
          data={contentTypePerformanceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
          />
          <XAxis dataKey="type" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
          <YAxis
            stroke={darkMode ? "#9ca3af" : "#6b7280"}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            formatter={(value) => [
              `${Number(value).toFixed(1)}%`,
              "Engagement Rate",
            ]}
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />
          <Bar
            dataKey="engagement"
            fill="#8b5cf6"
            radius={[4, 4, 0, 0]}
            barSize={40}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );

  // Platform Distribution Chart Component
  const PlatformDistributionChart = () => {
    const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f97316"];

    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Audience Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300} key={chartKey}>
          <RechartsPieChart>
            <Pie
              data={platformDistributionData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {platformDistributionData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${Number(value).toFixed(1)}%`, ""]}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  // Add Content Modal Component
  const AddContentModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setShowAddContentModal(false)}
    >
      <motion.div
        className="relative max-h-[80vh] w-full max-w-md overflow-auto rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:bg-gray-800/95"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          className="absolute right-4 top-4 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
          onClick={() => setShowAddContentModal(false)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        <h2 className="text-2xl font-bold dark:text-white">
          Create New Content
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="content-title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Content Title
            </label>
            <input
              type="text"
              id="content-title"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="e.g., Summer Collection Launch"
            />
          </div>

          <div>
            <label
              htmlFor="content-description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="content-description"
              rows={3}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="Describe your content..."
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="content-type"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Content Type
            </label>
            <select
              id="content-type"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
              <option value="carousel">Carousel</option>
              <option value="text">Text</option>
              <option value="story">Story</option>
              <option value="reel">Reel</option>
              <option value="tweet">Tweet</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Platforms
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {["instagram", "twitter", "linkedin", "tiktok", "facebook"].map(
                (platform) => (
                  <div key={platform} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`platform-${platform}`}
                      className="form-checkbox h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor={`platform-${platform}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </label>
                  </div>
                ),
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Media
            </label>
            <div className="mt-1 flex justify-center">
              <motion.div
                className="relative flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700/50 dark:hover:bg-gray-700"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Upload className="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500" />
                <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Drag and drop your media here
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, MP4, or GIF up to 10MB
                </p>
                <input
                  type="file"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  accept="image/*,video/*"
                />
              </motion.div>
            </div>
          </div>

          <div>
            <label
              htmlFor="content-tags"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="content-tags"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="e.g., summer, launch, product"
            />
          </div>

          <div>
            <label
              htmlFor="content-schedule"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Schedule Date (optional)
            </label>
            <input
              type="datetime-local"
              id="content-schedule"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <motion.button
              type="button"
              className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setShowAddContentModal(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Content
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // AI Advice Modal Component
  const AIAdviceModal = () => {
    if (!selectedRecommendation) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={() => setShowAIAdviceModal(false)}
      >
        <motion.div
          className="relative max-h-[80vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:bg-gray-800/95"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          <motion.button
            className="absolute right-4 top-4 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={() => setShowAIAdviceModal(false)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>

          <div className="flex items-center">
            <div
              className={`mr-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                selectedRecommendation.type === "content"
                  ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                  : selectedRecommendation.type === "timing"
                    ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : selectedRecommendation.type === "audience"
                      ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      : selectedRecommendation.type === "hashtag"
                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                        : "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
              }`}
            >
              <Sparkles size={24} />
            </div>
            <h2 className="text-base font-bold dark:text-white sm:text-2xl">
              {selectedRecommendation.title}
            </h2>
          </div>

          <div className="mt-6">
            <div className="flex items-center">
              <span
                className={`mr-2 inline-block h-3 w-3 rounded-full ${
                  selectedRecommendation.impact === "high"
                    ? "bg-red-500"
                    : selectedRecommendation.impact === "medium"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
              />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {selectedRecommendation.impact.charAt(0).toUpperCase() +
                  selectedRecommendation.impact.slice(1)}{" "}
                Impact
              </p>
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {selectedRecommendation.description}
            </p>

            <div className="mt-6 rounded-xl bg-purple-50/50 p-4 dark:bg-purple-900/20">
              <h3 className="font-medium text-purple-800 dark:text-purple-200">
                AI Analysis
              </h3>
              <p className="mt-2 text-sm text-purple-700 dark:text-purple-300">
                {selectedRecommendation.type === "content" &&
                  "Our analysis of your content performance shows that educational content receives 2.3x more engagement than promotional content. Creating more tutorials, how-to guides, and informative carousels will likely increase your overall engagement rate and follower growth."}
                {selectedRecommendation.type === "timing" &&
                  "We've analyzed your audience's activity patterns and found that posts published between 7-9 PM receive 35% higher engagement than posts at other times. This is when your specific audience is most active and likely to interact with your content."}
                {selectedRecommendation.type === "audience" &&
                  "Your audience demographics have shifted over the past 3 months, with a significant increase in the 25-34 age group. This demographic typically engages more with professional development content, career advice, and industry insights."}
                {selectedRecommendation.type === "hashtag" &&
                  "These trending hashtags are currently gaining momentum in your industry and have high engagement rates. Using them strategically can increase your content discoverability by up to 40% and help you reach new potential followers."}
                {selectedRecommendation.type === "trend" &&
                  "This emerging trend aligns well with your brand and content strategy. Early adoption of relevant trends can position your brand as an industry leader and typically results in 25-30% higher engagement rates compared to standard content."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium dark:text-white">
                Implementation Steps
              </h3>
              <ol className="mt-2 list-inside list-decimal space-y-2 text-gray-600 dark:text-gray-300">
                {selectedRecommendation.type === "content" && (
                  <>
                    <li>Review your content calendar for the next two weeks</li>
                    <li>Identify opportunities to add educational content</li>
                    <li>
                      Create at least 2-3 educational posts (tutorials, tips, or
                      how-to guides)
                    </li>
                    <li>
                      Use the &quot;Create Content&quot; feature to draft these
                      posts
                    </li>
                    <li>Schedule them for optimal posting times</li>
                  </>
                )}
                {selectedRecommendation.type === "timing" && (
                  <>
                    <li>Review your current content schedule</li>
                    <li>
                      Adjust posting times to the 7-9 PM window when possible
                    </li>
                    <li>
                      Use the &quot;Schedule&quot; feature to set up optimal
                      posting times
                    </li>
                    <li>Consider time zones if you have a global audience</li>
                    <li>
                      Monitor engagement rates after implementing this change
                    </li>
                  </>
                )}
                {selectedRecommendation.type === "audience" && (
                  <>
                    <li>
                      Review your content strategy to align with the 25-34
                      demographic
                    </li>
                    <li>
                      Create content that addresses professional development
                      needs
                    </li>
                    <li>
                      Consider industry insights and career advice content
                      formats
                    </li>
                    <li>
                      Use appropriate tone and language for this demographic
                    </li>
                    <li>
                      Monitor engagement from this age group after
                      implementation
                    </li>
                  </>
                )}
                {selectedRecommendation.type === "hashtag" && (
                  <>
                    <li>
                      Research the trending hashtags to understand their context
                    </li>
                    <li>
                      Select hashtags that are most relevant to your brand
                    </li>
                    <li>Incorporate these hashtags in your upcoming content</li>
                    <li>
                      Mix trending hashtags with your established brand hashtags
                    </li>
                    <li>
                      Monitor performance to identify which hashtags drive the
                      most engagement
                    </li>
                  </>
                )}
              </ol>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <motion.button
              className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setShowAIAdviceModal(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Dismiss
            </motion.button>
            <motion.button
              className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Implement Now
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Content Idea Modal Component
  const ContentIdeaModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setShowContentIdeaModal(false)}
    >
      <motion.div
        className="relative max-h-[80vh] w-full max-w-md overflow-auto rounded-2xl bg-white/95 p-6 shadow-xl backdrop-blur-xl dark:bg-gray-800/95"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.button
          className="absolute right-4 top-4 rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
          onClick={() => setShowContentIdeaModal(false)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        <h2 className="text-2xl font-bold dark:text-white">
          {selectedContentIdea
            ? "Content Idea Details"
            : "Generate Content Ideas"}
        </h2>

        {selectedContentIdea ? (
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
                {getContentTypeIcon(selectedContentIdea.suggestedContentType)}
              </div>
              <div>
                <h3 className="font-medium dark:text-white">
                  {selectedContentIdea.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedContentIdea.category} • Relevance Score:{" "}
                  {selectedContentIdea.relevanceScore}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </h4>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {selectedContentIdea.description}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Suggested Platforms
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedContentIdea.suggestedPlatforms.map((platform) => (
                  <div
                    key={platform}
                    className="flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  >
                    {getPlatformIcon(platform, 12)}
                    <span className="ml-1">
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Suggested Tags
              </h4>
              <div className="mt-2 flex flex-wrap gap-1">
                {selectedContentIdea.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-purple-50/50 p-4 dark:bg-purple-900/20">
              <h4 className="font-medium text-purple-800 dark:text-purple-200">
                AI Insights
              </h4>
              <p className="mt-2 text-sm text-purple-700 dark:text-purple-300">
                This content idea aligns with your audience&apos;s interests and
                current engagement patterns. Similar content has performed 35%
                better than your average posts in the last 30 days.
              </p>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <motion.button
                className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => setShowContentIdeaModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
              <motion.button
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowContentIdeaModal(false);
                  setShowAddContentModal(true);
                }}
              >
                Create Content
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="content-goal"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Content Goal
              </label>
              <select
                id="content-goal"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              >
                <option value="engagement">Increase Engagement</option>
                <option value="awareness">Brand Awareness</option>
                <option value="conversion">Drive Conversions</option>
                <option value="education">Educate Audience</option>
                <option value="community">Build Community</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="content-type-preference"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Content Type Preference
              </label>
              <select
                id="content-type-preference"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              >
                <option value="any">Any Type</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="carousel">Carousel</option>
                <option value="story">Story</option>
                <option value="reel">Reel</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="target-platforms"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Target Platforms
              </label>
              <div className="mt-2 flex flex-wrap gap-2">
                {["instagram", "twitter", "linkedin", "tiktok", "facebook"].map(
                  (platform) => (
                    <div key={platform} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`idea-platform-${platform}`}
                        className="form-checkbox h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700"
                        defaultChecked={platform === "instagram"}
                      />
                      <label
                        htmlFor={`idea-platform-${platform}`}
                        className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </label>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="topic-keywords"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Topic Keywords (optional)
              </label>
              <input
                type="text"
                id="topic-keywords"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
                placeholder="e.g., design, tips, tutorial"
              />
            </div>

            <div>
              <label
                htmlFor="idea-count"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Number of Ideas
              </label>
              <select
                id="idea-count"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              >
                <option value="3">3 Ideas</option>
                <option value="5">5 Ideas</option>
                <option value="10">10 Ideas</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <motion.button
                type="button"
                className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
                onClick={() => setShowContentIdeaModal(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Generate Ideas
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  // Dashboard View
  const renderDashboard = () => (
    <div className="space-y-6 p-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 p-1">
        <div className="rounded-xl bg-black/5 p-6 text-white backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Welcome back, {user.name.split(" ")[0]}!
              </h2>
              <p className="mt-1 text-purple-100">
                Here&apos;s your social media overview
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg">
              <Sparkles size={24} />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Total Followers</p>
              <p className="text-xl font-bold">
                {formatNumber(
                  socialAccounts.reduce(
                    (total, account) => total + account.followers,
                    0,
                  ),
                )}
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Avg. Engagement</p>
              <p className="text-xl font-bold">
                {(
                  socialAccounts.reduce(
                    (total, account) => total + account.engagement,
                    0,
                  ) / socialAccounts.length
                ).toFixed(1)}
                %
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Posts This Month</p>
              <p className="text-xl font-bold">
                {
                  contentPosts.filter((post) => post.status === "published")
                    .length
                }
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Scheduled Posts</p>
              <p className="text-xl font-bold">
                {
                  contentPosts.filter((post) => post.status === "scheduled")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {insightCards.map((insight) => (
          <InsightCardComponent key={insight.id} insight={insight} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Recent Content
            </h3>
            <motion.button
              className="flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView("content")}
            >
              View All
            </motion.button>
          </div>
          <div className="mt-4 space-y-4">
            {contentPosts
              .filter((post) => post.status === "published")
              .slice(0, 3)
              .map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div
                      className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${post.color}20` }}
                    >
                      {getContentTypeIcon(post.contentType)}
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        {post.title}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="mr-2">
                          {post.platforms.map((platform) =>
                            getPlatformIcon(platform, 12),
                          )}
                        </span>
                        <span>
                          {formatDate(post.publishedDate || new Date())}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      <ThumbsUp size={10} className="mr-1" />
                      <span>{formatNumber(post.performance?.likes || 0)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Upcoming Posts
            </h3>
            <motion.button
              className="flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddContentModal(true)}
            >
              <PlusCircle size={14} className="mr-1" />
              Add Content
            </motion.button>
          </div>
          <div className="mt-4 space-y-4">
            {contentPosts
              .filter((post) => post.status === "scheduled")
              .sort(
                (a, b) =>
                  (a.scheduledDate?.getTime() || 0) -
                  (b.scheduledDate?.getTime() || 0),
              )
              .slice(0, 3)
              .map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
                >
                  <div className="flex items-center">
                    <div
                      className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${post.color}20` }}
                    >
                      {getContentTypeIcon(post.contentType)}
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">
                        {post.title}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="mr-2">
                          {post.platforms.map((platform) =>
                            getPlatformIcon(platform, 12),
                          )}
                        </span>
                        <span>
                          {post.scheduledDate
                            ? formatDate(post.scheduledDate)
                            : "Not scheduled"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    className="rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit size={14} />
                  </motion.button>
                </div>
              ))}
          </div>
          <motion.button
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-gray-100/50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200/70 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveView("calendar")}
          >
            View Content Calendar
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              Connected Accounts
            </h3>
            <motion.button
              className="flex items-center rounded-xl bg-gray-100/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusCircle size={14} className="mr-1" />
              Add Account
            </motion.button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {socialAccounts.slice(0, 4).map((account) => (
              <div
                key={account.id}
                className="rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50"
              >
                <div className="flex items-center">
                  <div className="mr-2 text-gray-600 dark:text-gray-300">
                    {getPlatformIcon(account.platform, 16)}
                  </div>
                  <p className="font-medium dark:text-white">
                    {account.platform.charAt(0).toUpperCase() +
                      account.platform.slice(1)}
                  </p>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {account.handle}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatNumber(account.followers)} followers
                  </span>
                  <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Connected
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold dark:text-white">
              AI Recommendations
            </h3>
            <motion.button
              className="flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView("assistant")}
            >
              <Sparkles size={14} className="mr-1" />
              View All
            </motion.button>
          </div>
          <div className="mt-4 space-y-4">
            {aiRecommendations.slice(0, 2).map((recommendation) => (
              <div
                key={recommendation.id}
                className="flex items-start rounded-lg border border-gray-100 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700/50"
                onClick={() => {
                  setSelectedRecommendation(recommendation);
                  setShowAIAdviceModal(true);
                }}
              >
                <div
                  className={`mr-3 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    recommendation.type === "content"
                      ? "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                      : recommendation.type === "timing"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                        : recommendation.type === "audience"
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                          : recommendation.type === "hashtag"
                            ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
                  }`}
                >
                  <Sparkles size={14} />
                </div>
                <div>
                  <p className="font-medium dark:text-white">
                    {recommendation.title}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {recommendation.description.length > 100
                      ? recommendation.description.substring(0, 100) + "..."
                      : recommendation.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FollowerGrowthChart />

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-white">
            Content Ideas
          </h3>
          <motion.button
            className="flex items-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowContentIdeaModal(true)}
          >
            <PenTool size={14} className="mr-1" />
            Generate Ideas
          </motion.button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {contentIdeas.slice(0, 2).map((idea) => (
            <ContentIdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      </div>
    </div>
  );

  // Content Library View
  const renderContent = () => (
    <div className="space-y-6 p-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-xl font-bold dark:text-white">Content Library</h2>
        <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <div className="relative flex-grow sm:flex-grow-0">
            <input
              type="text"
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white/80 px-4 py-2 pr-10 backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white dark:placeholder-gray-400"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Search size={16} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
            onClick={() => setShowAddContentModal(true)}
          >
            <PlusCircle size={16} className="mr-1" />
            Create Content
          </motion.button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActivePlatformFilter("all")}
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            activePlatformFilter === "all"
              ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          All Platforms
        </button>
        {(
          ["instagram", "twitter", "linkedin", "tiktok"] as SocialPlatform[]
        ).map((platform) => (
          <button
            key={platform}
            onClick={() => setActivePlatformFilter(platform)}
            className={`flex items-center rounded-full px-3 py-1 text-sm font-medium ${
              activePlatformFilter === platform
                ? "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:hover:bg-purple-900/50"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {getPlatformIcon(platform, 14)}
            <span className="ml-1">
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contentPosts
          .filter(
            (post) =>
              activePlatformFilter === "all" ||
              post.platforms.includes(activePlatformFilter),
          )
          .map((post) => (
            <ContentCard key={post.id} post={post} />
          ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-6 dark:border-gray-700"
          onClick={() => setShowAddContentModal(true)}
        >
          <div className="mb-4 rounded-full bg-purple-100 p-4 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <PlusCircle size={24} />
          </div>
          <h3 className="text-lg font-semibold dark:text-white">
            Create New Content
          </h3>
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Create and schedule content for your social media platforms
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:shadow-md"
          >
            <PenTool size={16} className="mr-1" />
            Create Content
          </motion.button>
        </motion.div>
      </div>
    </div>
  );

  // Analytics View
  const renderAnalytics = () => (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Analytics</h2>
        <div className="flex items-center space-x-2">
          <select className="rounded-lg border border-gray-300 bg-white/80 px-3 py-1.5 text-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white">
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="custom">Custom Range</option>
          </select>
          <motion.button
            className="flex items-center rounded-xl bg-gray-100/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText size={14} className="mr-1" />
            Export
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Followers
            </h3>
            <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              +5.2%
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold dark:text-white">
            {formatNumber(
              socialAccounts.reduce(
                (total, account) => total + account.followers,
                0,
              ),
            )}
          </p>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <TrendingUp size={14} className="mr-1 text-green-500" />
            <span>Gained 1,245 new followers this month</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Engagement Rate
            </h3>
            <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              +0.8%
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold dark:text-white">
            {(
              socialAccounts.reduce(
                (total, account) => total + account.engagement,
                0,
              ) / socialAccounts.length
            ).toFixed(1)}
            %
          </p>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <TrendingUp size={14} className="mr-1 text-green-500" />
            <span>Up from 3.0% last month</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Impressions
            </h3>
            <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              +12.4%
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold dark:text-white">
            {formatNumber(45600)}
          </p>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <TrendingUp size={14} className="mr-1 text-green-500" />
            <span>Up from 40.5K last month</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Link Clicks
            </h3>
            <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
              +8.7%
            </div>
          </div>
          <p className="mt-2 text-3xl font-bold dark:text-white">
            {formatNumber(2340)}
          </p>
          <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <TrendingUp size={14} className="mr-1 text-green-500" />
            <span>Up from 2.15K last month</span>
          </div>
        </div>
      </div>

      <FollowerGrowthChart />
      <EngagementRateChart />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ContentTypePerformanceChart />
        <PlatformDistributionChart />
      </div>

      <div className="grid w-full grid-cols-1 overflow-hidden rounded-2xl bg-white/95 p-4 shadow-lg backdrop-blur-xl dark:bg-gray-800/95 sm:p-6">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Top Performing Content
        </h3>
        <div className="w-full overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Content
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Platform
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Likes
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Comments
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Shares
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Engagement
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {contentPosts
                .filter(
                  (post) => post.status === "published" && post.performance,
                )
                .sort(
                  (a, b) =>
                    (b.performance?.likes || 0) - (a.performance?.likes || 0),
                )
                .slice(0, 5)
                .map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center">
                        <div
                          className="mr-3 flex h-8 w-8 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${post.color}20` }}
                        >
                          {getContentTypeIcon(post.contentType, 16)}
                        </div>
                        <span className="font-medium dark:text-white">
                          {post.title}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex">
                        {post.platforms.map((platform) => (
                          <span key={platform} className="mr-1">
                            {getPlatformIcon(platform, 16)}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {post.publishedDate
                        ? formatDate(post.publishedDate)
                        : "-"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium dark:text-white">
                      {formatNumber(post.performance?.likes || 0)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium dark:text-white">
                      {formatNumber(post.performance?.comments || 0)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium dark:text-white">
                      {formatNumber(post.performance?.shares || 0)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center">
                        <div className="mr-2 h-2 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                            style={{
                              width: `${Math.min(
                                (((post.performance?.likes || 0) +
                                  (post.performance?.comments || 0) * 2 +
                                  (post.performance?.shares || 0) * 3) /
                                  (post.performance?.impressions || 1)) *
                                  100,
                                100,
                              )}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium dark:text-white">
                          {(
                            (((post.performance?.likes || 0) +
                              (post.performance?.comments || 0) * 2 +
                              (post.performance?.shares || 0) * 3) /
                              (post.performance?.impressions || 1)) *
                            100
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Audience Insights View
  const renderAudience = () => (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Audience Insights</h2>
        <div className="flex items-center space-x-2">
          <select className="rounded-lg border border-gray-300 bg-white/80 px-3 py-1.5 text-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/80 dark:text-white">
            <option value="all">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="tiktok">TikTok</option>
          </select>
          <motion.button
            className="flex items-center rounded-xl bg-gray-100/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText size={14} className="mr-1" />
            Export
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Age Distribution
          </h3>
          <div className="space-y-4">
            {audienceData.ageGroups.map((group) => (
              <div key={group.range}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium dark:text-white">
                    {group.range}
                  </span>
                  <span className="text-sm font-medium dark:text-white">
                    {group.percentage}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                    style={{ width: `${group.percentage}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${group.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Gender Distribution
          </h3>
          <div className="flex h-[250px] items-center justify-center">
            <ResponsiveContainer width="100%" height="100%" key={chartKey}>
              <RechartsPieChart>
                <Pie
                  data={audienceData.genderDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  nameKey="gender"
                  label={({ gender, percentage }) =>
                    `${gender}: ${percentage}%`
                  }
                >
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#3b82f6" />
                  <Cell fill="#10b981" />
                </Pie>
                <Tooltip formatter={(value) => [`${Number(value)}%`, ""]} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Top Locations
          </h3>
          <div className="space-y-4">
            {audienceData.topLocations.map((location) => (
              <div key={location.location}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium dark:text-white">
                    {location.location}
                  </span>
                  <span className="text-sm font-medium dark:text-white">
                    {location.percentage}%
                  </span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                    style={{ width: `${location.percentage}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${location.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Active Hours
          </h3>
          <ResponsiveContainer width="100%" height={250} key={chartKey}>
            <RechartsBarChart
              data={audienceData.activeHours}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkMode ? "#374151" : "#e5e7eb"}
              />
              <XAxis
                dataKey="hour"
                stroke={darkMode ? "#9ca3af" : "#6b7280"}
                tickFormatter={(hour) => `${hour}:00`}
              />
              <YAxis stroke={darkMode ? "#9ca3af" : "#6b7280"} />
              <Tooltip
                formatter={(value) => [`${Number(value)} users`, "Activity"]}
                contentStyle={{
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                  borderColor: darkMode ? "#374151" : "#e5e7eb",
                  color: darkMode ? "#ffffff" : "#000000",
                }}
              />
              <Bar
                dataKey="activity"
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
                barSize={8}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Audience Interests
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {[
            { interest: "Design", percentage: 68 },
            { interest: "Technology", percentage: 54 },
            { interest: "Marketing", percentage: 47 },
            { interest: "Business", percentage: 42 },
            { interest: "Photography", percentage: 38 },
            { interest: "Art", percentage: 35 },
            { interest: "Travel", percentage: 32 },
            { interest: "Fashion", percentage: 28 },
            { interest: "Food", percentage: 25 },
            { interest: "Fitness", percentage: 22 },
          ].map((item) => (
            <div
              key={item.interest}
              className="rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
            >
              <p className="font-medium dark:text-white">{item.interest}</p>
              <div className="mt-2 flex items-center">
                <div className="mr-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                    style={{ width: `${item.percentage}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <span className="text-xs font-medium dark:text-white">
                  {item.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-white">
            Audience Growth Trends
          </h3>
          <div className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-200">
            Last 30 Days
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-purple-50/50 p-4 dark:bg-purple-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-purple-100 p-1.5 dark:bg-purple-900/50">
                <TrendingUp
                  size={16}
                  className="text-purple-600 dark:text-purple-300"
                />
              </div>
              <div>
                <p className="font-medium text-purple-800 dark:text-purple-200">
                  Fastest Growing Segment
                </p>
                <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">
                  The 25-34 age group has grown by 18% this month, primarily
                  from the United States and United Kingdom.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-pink-50/50 p-4 dark:bg-pink-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-pink-100 p-1.5 dark:bg-pink-900/50">
                <Users size={16} className="text-pink-600 dark:text-pink-300" />
              </div>
              <div>
                <p className="font-medium text-pink-800 dark:text-pink-200">
                  Audience Retention
                </p>
                <p className="mt-1 text-sm text-pink-700 dark:text-pink-300">
                  Your follower retention rate is 94%, which is 12% higher than
                  industry average for your niche.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50/50 p-4 dark:bg-blue-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-blue-100 p-1.5 dark:bg-blue-900/50">
                <MessageSquare
                  size={16}
                  className="text-blue-600 dark:text-blue-300"
                />
              </div>
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200">
                  Engagement Patterns
                </p>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                  Comments have increased by 32% on educational content,
                  suggesting your audience values informative posts.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-green-50/50 p-4 dark:bg-green-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                <ThumbsUp
                  size={16}
                  className="text-green-600 dark:text-green-300"
                />
              </div>
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Content Preferences
                </p>
                <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                  Video content receives 2.3x more engagement than static images
                  across all platforms and demographics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // AI Assistant View
  const renderAIAssistant = () => (
    <div className="space-y-6 p-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 p-1">
        <div className="rounded-xl bg-black/5 p-6 text-white backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">AI Social Media Assistant</h2>
              <p className="mt-1 text-purple-100">
                Personalized insights and recommendations for your social media
                strategy
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg">
              <Sparkles size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {aiRecommendations.map((recommendation) => (
          <AIRecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
          />
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Content Ideas
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {contentIdeas.map((idea) => (
            <ContentIdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
        <motion.button
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-2 text-sm font-medium text-white shadow-sm hover:shadow-md"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowContentIdeaModal(true)}
        >
          <PenTool size={16} className="mr-1" />
          Generate More Ideas
        </motion.button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Content Performance Analysis
        </h3>
        <div className="space-y-4">
          <div className="rounded-xl bg-purple-50/50 p-4 dark:bg-purple-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-purple-100 p-1.5 dark:bg-purple-900/50">
                <Video
                  size={16}
                  className="text-purple-600 dark:text-purple-300"
                />
              </div>
              <div>
                <p className="font-medium text-purple-800 dark:text-purple-200">
                  Video Content Outperforms
                </p>
                <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">
                  Your video content receives 35% higher engagement than images.
                  Consider creating more video content, especially tutorials and
                  behind-the-scenes footage.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-blue-50/50 p-4 dark:bg-blue-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-blue-100 p-1.5 dark:bg-blue-900/50">
                <Clock size={16} className="text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200">
                  Optimal Posting Times
                </p>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                  Posts published between 7-9 PM on weekdays receive 28% more
                  engagement. Adjust your posting schedule to these peak hours.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-pink-50/50 p-4 dark:bg-pink-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-pink-100 p-1.5 dark:bg-pink-900/50">
                <Target
                  size={16}
                  className="text-pink-600 dark:text-pink-300"
                />
              </div>
              <div>
                <p className="font-medium text-pink-800 dark:text-pink-200">
                  Hashtag Performance
                </p>
                <p className="mt-1 text-sm text-pink-700 dark:text-pink-300">
                  Posts using industry-specific hashtags are reaching 40% more
                  non-followers. Continue using targeted hashtags to expand your
                  reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Audience Insights
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {audienceInsights.map((insight) => (
            <AudienceInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );

  // Settings View
  const renderSettings = () => (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-bold dark:text-white">Settings</h2>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Account Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
            <div className="flex items-center">
              <div className="relative mr-3 h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-green-600 to-emerald-600">
                <Image
                  src={user.avatar || "/images/default-avatar.png"}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">{user.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Edit Profile
            </motion.button>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Subscription Plan</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.plan === "premium"
                  ? "Premium Plan - $19.99/month"
                  : "Free Plan"}
              </p>
            </div>
            <motion.button
              className={`rounded-xl px-3 py-1.5 text-sm font-medium ${
                user.plan === "premium"
                  ? "border border-gray-300/80 text-gray-700 hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
                  : "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-sm hover:shadow-md"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user.plan === "premium"
                ? "Manage Subscription"
                : "Upgrade to Premium"}
            </motion.button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium dark:text-white">Password</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last changed 2 months ago
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Change Password
            </motion.button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle between light and dark theme
              </p>
            </div>
            <div className="relative inline-block h-6 w-11 flex-shrink-0">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={darkMode}
                onChange={toggleDarkMode}
                id="dark-mode"
              />
              <label
                htmlFor="dark-mode"
                className="block h-6 w-11 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:bg-gray-600 dark:peer-focus:ring-green-800"
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">AI Recommendations</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Enable AI-powered recommendations for your social media strategy
              </p>
            </div>
            <div className="relative inline-block h-6 w-11 flex-shrink-0">
              <input
                type="checkbox"
                className="peer sr-only"
                defaultChecked={true}
                id="ai-recommendations"
              />
              <label
                htmlFor="hide-data"
                className="block h-6 w-11 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:bg-gray-600 dark:peer-focus:ring-green-800"
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">
                Content Ideas Generation
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Allow AI to generate content ideas based on your audience and
                performance
              </p>
            </div>
            <div className="relative inline-block h-6 w-11 flex-shrink-0">
              <input
                type="checkbox"
                className="peer sr-only"
                defaultChecked={true}
                id="ai-content-gen"
              />
              <label
                htmlFor="hide-data"
                className="block h-6 w-11 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:bg-gray-600 dark:peer-focus:ring-green-800"
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Notifications</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your notification preferences
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Configure
            </motion.button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Connected Platforms
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <Instagram size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium dark:text-white">Instagram</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Connected as @wabwenibrian
                </p>
              </div>
            </div>
            <motion.button
              className="rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Disconnect
            </motion.button>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-500">
                <FacebookIcon size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium dark:text-white">Facebook</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Connected as @wabwenibrian
                </p>
              </div>
            </div>
            <motion.button
              className="rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Disconnect
            </motion.button>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                <Twitter size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium dark:text-white">Twitter</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Connected as @wabwenibrian
                </p>
              </div>
            </div>
            <motion.button
              className="rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Disconnect
            </motion.button>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-700">
            <div className="flex items-center">
              <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-700 to-blue-800">
                <Linkedin size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-medium dark:text-white">LinkedIn</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Not connected
                </p>
              </div>
            </div>
            <motion.button
              className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect
            </motion.button>
          </div>
        </div>

        <motion.button
          className="mt-6 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle size={16} className="mr-2" />
          Connect New Platform
        </motion.button>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Content Preferences
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Default Content Type
            </label>
            <select className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white">
              <option value="all">All Types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="carousel">Carousels</option>
              <option value="text">Text Posts</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content Tone
            </label>
            <select className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white">
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="humorous">Humorous</option>
              <option value="inspirational">Inspirational</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Industry Focus
            </label>
            <select className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white">
              <option value="technology">Technology</option>
              <option value="fashion">Fashion</option>
              <option value="food">Food & Beverage</option>
              <option value="health">Health & Wellness</option>
              <option value="finance">Finance</option>
              <option value="education">Education</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Data & Privacy
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Data Export</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Download all your social analytics data
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FileText size={14} className="mr-1 inline-block" />
              Export
            </motion.button>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Privacy Settings</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage how your data is used
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-gray-300/80 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Lock size={14} className="mr-1 inline-block" />
              Manage
            </motion.button>
          </div>

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-red-600 dark:text-red-400">
                Delete Account
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Permanently delete your account and data
              </p>
            </div>
            <motion.button
              className="rounded-xl border border-red-300/80 px-3 py-1.5 text-sm font-medium text-red-600 backdrop-blur-sm hover:bg-red-50 dark:border-red-900/80 dark:text-red-400 dark:hover:bg-red-900/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash size={14} className="mr-1 inline-block" />
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Render
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}
    >
      {isMobile && <MobileHeader />}
      <div className="flex">
        {(!isMobile || showMobileMenu) && <Sidebar />}

        <main className={`flex-1 md:ml-72 ${isMobile ? "pb-20" : ""}`}>
          <div className="mx-auto max-w-7xl">
            {activeView === "dashboard" && renderDashboard()}
            {activeView === "content" && renderContent()}
            {activeView === "calendar" && (
              <ContentCalendar
                contentPosts={contentPosts}
                onAddContent={handleAddContent}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
              />
            )}
            {activeView === "analytics" && renderAnalytics()}
            {activeView === "audience" && renderAudience()}
            {activeView === "assistant" && renderAIAssistant()}
            {activeView === "settings" && renderSettings()}
          </div>
        </main>
      </div>
      {isMobile && <MobileNavigation />}

      {/* ------------------------------------------------------ Modal --------------------------------------------------------------------- */}
      {/* Add content modal */}
      <AnimatePresence>
        {showAddContentModal && <AddContentModal />}
      </AnimatePresence>
      {/* content idea modal */}
      <AnimatePresence>
        {showContentIdeaModal && <ContentIdeaModal />}
      </AnimatePresence>
      {/* Chat modal */}
      {showChatModal && (
        <ChatModal
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
        />
      )}
      {/* AI advise modal */}
      <AnimatePresence>
        {showAIAdviceModal && selectedRecommendation && <AIAdviceModal />}
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
        .scrollbar-hover::-webkit-scrollbar-thumb {
          background-color: transparent;
        }
        .scrollbar-hover:hover::-webkit-scrollbar-thumb {
          background-color: #c7c7c7;
        }
      `}</style>
    </div>
  );
};

export default AISocialMediaAssistant;
