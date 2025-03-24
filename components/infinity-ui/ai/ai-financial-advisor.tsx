"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Bell,
  ChevronDown,
  CircleDollarSign,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  EyeOff,
  FileText,
  HelpCircle,
  LineChart,
  Lock,
  LogOut,
  Menu,
  PieChart,
  Plus,
  Settings,
  Sparkles,
  Target,
  Trash,
  TrendingDown,
  TrendingUp,
  X,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Types
type User = {
  name: string;
  email: string;
  avatar: string;
  plan: "free" | "premium";
};

type Account = {
  id: string;
  name: string;
  type: "checking" | "savings" | "investment" | "credit";
  balance: number;
  currency: string;
  color: string;
  lastUpdated: Date;
};

type Transaction = {
  id: string;
  accountId: string;
  date: Date;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

type Investment = {
  id: string;
  name: string;
  ticker: string;
  allocation: number;
  value: number;
  change: number;
  changePercent: number;
  color: string;
};

type FinancialGoal = {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: "savings" | "investment" | "debt" | "purchase";
  color: string;
};

type BudgetCategory = {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
};

type AIRecommendation = {
  id: string;
  title: string;
  description: string;
  type: "investment" | "savings" | "budget" | "debt";
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
  | "portfolio"
  | "goals"
  | "budget"
  | "advisor"
  | "settings";

// Sample data
const user: User = {
  name: "Wabweni Brian",
  email: "wabweni@example.com",
  avatar: "/images/default-avatar.png",
  plan: "premium",
};

const accounts: Account[] = [
  {
    id: "1",
    name: "Main Checking",
    type: "checking",
    balance: 5280.42,
    currency: "USD",
    color: "#3b82f6",
    lastUpdated: new Date(),
  },
  {
    id: "2",
    name: "Savings",
    type: "savings",
    balance: 12750.83,
    currency: "USD",
    color: "#10b981",
    lastUpdated: new Date(),
  },
  {
    id: "3",
    name: "Investment Portfolio",
    type: "investment",
    balance: 32680.15,
    currency: "USD",
    color: "#8b5cf6",
    lastUpdated: new Date(),
  },
  {
    id: "4",
    name: "Credit Card",
    type: "credit",
    balance: -1250.67,
    currency: "USD",
    color: "#ef4444",
    lastUpdated: new Date(),
  },
];

const transactions: Transaction[] = [
  {
    id: "1",
    accountId: "1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    description: "Grocery Store",
    amount: -128.45,
    category: "Groceries",
    type: "expense",
  },
  {
    id: "2",
    accountId: "1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    description: "Salary Deposit",
    amount: 3200.0,
    category: "Income",
    type: "income",
  },
  {
    id: "3",
    accountId: "1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    description: "Electric Bill",
    amount: -95.4,
    category: "Utilities",
    type: "expense",
  },
  {
    id: "4",
    accountId: "2",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    description: "Automatic Transfer",
    amount: 500.0,
    category: "Savings",
    type: "income",
  },
  {
    id: "5",
    accountId: "3",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    description: "Stock Purchase",
    amount: -1000.0,
    category: "Investment",
    type: "expense",
  },
];

const investments: Investment[] = [
  {
    id: "1",
    name: "Tech Growth ETF",
    ticker: "TECH",
    allocation: 35,
    value: 11438.05,
    change: 342.15,
    changePercent: 3.08,
    color: "#3b82f6",
  },
  {
    id: "2",
    name: "S&P 500 Index Fund",
    ticker: "SPY",
    allocation: 25,
    value: 8170.04,
    change: 98.04,
    changePercent: 1.21,
    color: "#10b981",
  },
  {
    id: "3",
    name: "Emerging Markets",
    ticker: "EM",
    allocation: 15,
    value: 4902.02,
    change: -147.06,
    changePercent: -2.91,
    color: "#f59e0b",
  },
  {
    id: "4",
    name: "Bond Fund",
    ticker: "BOND",
    allocation: 15,
    value: 4902.02,
    change: 24.51,
    changePercent: 0.5,
    color: "#8b5cf6",
  },
  {
    id: "5",
    name: "Real Estate REIT",
    ticker: "REIT",
    allocation: 10,
    value: 3268.02,
    change: 65.36,
    changePercent: 2.04,
    color: "#ec4899",
  },
];

const financialGoals: FinancialGoal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 15000,
    currentAmount: 12750.83,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
    category: "savings",
    color: "#10b981",
  },
  {
    id: "2",
    name: "Down Payment",
    targetAmount: 50000,
    currentAmount: 18500,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
    category: "savings",
    color: "#3b82f6",
  },
  {
    id: "3",
    name: "Retirement",
    targetAmount: 1000000,
    currentAmount: 32680.15,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 25),
    category: "investment",
    color: "#8b5cf6",
  },
  {
    id: "4",
    name: "Pay Off Credit Card",
    targetAmount: 1250.67,
    currentAmount: 0,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    category: "debt",
    color: "#ef4444",
  },
];

const budgetCategories: BudgetCategory[] = [
  {
    id: "1",
    name: "Housing",
    allocated: 1500,
    spent: 1500,
    color: "#3b82f6",
  },
  {
    id: "2",
    name: "Food",
    allocated: 600,
    spent: 428.45,
    color: "#10b981",
  },
  {
    id: "3",
    name: "Transportation",
    allocated: 400,
    spent: 385.2,
    color: "#f59e0b",
  },
  {
    id: "4",
    name: "Utilities",
    allocated: 300,
    spent: 245.4,
    color: "#8b5cf6",
  },
  {
    id: "5",
    name: "Entertainment",
    allocated: 200,
    spent: 178.65,
    color: "#ec4899",
  },
  {
    id: "6",
    name: "Shopping",
    allocated: 200,
    spent: 312.8,
    color: "#ef4444",
  },
];

const aiRecommendations: AIRecommendation[] = [
  {
    id: "1",
    title: "Optimize Emergency Fund",
    description:
      "Your emergency fund is almost complete. Consider moving $5,000 to a high-yield savings account to earn 3.5% APY instead of your current 0.5%.",
    type: "savings",
    impact: "medium",
    actionable: true,
    implemented: false,
  },
  {
    id: "2",
    title: "Rebalance Investment Portfolio",
    description:
      "Your tech allocation is 5% higher than your target. Consider rebalancing to reduce risk and align with your long-term strategy.",
    type: "investment",
    impact: "medium",
    actionable: true,
    implemented: false,
  },
  {
    id: "3",
    title: "Reduce Credit Card Debt",
    description:
      "Prioritize paying off your credit card balance of $1,250.67 to avoid 18.99% APR interest charges.",
    type: "debt",
    impact: "high",
    actionable: true,
    implemented: false,
  },
  {
    id: "4",
    title: "Shopping Budget Alert",
    description:
      "You've exceeded your shopping budget by $112.80 this month. Review recent purchases and adjust next month's budget if needed.",
    type: "budget",
    impact: "low",
    actionable: true,
    implemented: false,
  },
];

const insightCards: InsightCard[] = [
  {
    id: "1",
    title: "Net Worth",
    description: "Your net worth increased by 2.3% this month",
    icon: <TrendingUp size={20} />,
    color: "#10b981",
  },
  {
    id: "2",
    title: "Spending",
    description: "You spent 12% less than last month",
    icon: <TrendingDown size={20} />,
    color: "#3b82f6",
  },
  {
    id: "3",
    title: "Savings Rate",
    description: "You're saving 22% of your income",
    icon: <PieChart size={20} />,
    color: "#8b5cf6",
  },
];

// Chart data
const netWorthData = [
  { month: "Jan", amount: 45000 },
  { month: "Feb", amount: 46200 },
  { month: "Mar", amount: 47100 },
  { month: "Apr", amount: 46800 },
  { month: "May", amount: 48200 },
  { month: "Jun", amount: 49500 },
  { month: "Jul", amount: 50700 },
  { month: "Aug", amount: 51800 },
  { month: "Sep", amount: 52900 },
  { month: "Oct", amount: 54200 },
  { month: "Nov", amount: 55800 },
  { month: "Dec", amount: 57600 },
];

const incomeVsExpenseData = [
  { month: "Jul", income: 4200, expenses: 3100 },
  { month: "Aug", income: 4200, expenses: 3300 },
  { month: "Sep", income: 4500, expenses: 3200 },
  { month: "Oct", income: 4200, expenses: 3400 },
  { month: "Nov", income: 4800, expenses: 3500 },
  { month: "Dec", income: 5200, expenses: 3800 },
];

const spendingCategoryData = [
  { name: "Housing", value: 1500 },
  { name: "Food", value: 428.45 },
  { name: "Transportation", value: 385.2 },
  { name: "Utilities", value: 245.4 },
  { name: "Entertainment", value: 178.65 },
  { name: "Shopping", value: 312.8 },
];

const investmentPerformanceData = [
  { month: "Jul", value: 28500 },
  { month: "Aug", value: 29200 },
  { month: "Sep", value: 28700 },
  { month: "Oct", value: 30100 },
  { month: "Nov", value: 31500 },
  { month: "Dec", value: 32680 },
];

// Custom hook for media queries
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};

const AIFinancialAdvisor = () => {
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [darkMode, setDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [hideBalances, setHideBalances] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);
  const [showAIAdviceModal, setShowAIAdviceModal] = useState(false);
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<AIRecommendation | null>(null);
  const [chartKey, setChartKey] = useState(0);

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

  const toggleHideBalances = () => {
    setHideBalances(!hideBalances);
  };

  const formatCurrency = (amount: number, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const calculateTotalBalance = () => {
    return accounts.reduce((total, account) => {
      // Only add positive balances (exclude credit card debt)
      return total + (account.balance > 0 ? account.balance : 0);
    }, 0);
  };

  const calculateTotalDebt = () => {
    return accounts.reduce((total, account) => {
      // Only add negative balances (credit card debt)
      return total + (account.balance < 0 ? Math.abs(account.balance) : 0);
    }, 0);
  };

  const calculateNetWorth = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  // Logo Component
  const Logo = () => (
    <div className="flex items-center">
      <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md">
        <CircleDollarSign size={20} />
      </div>
      <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-xl font-bold text-transparent dark:from-indigo-400 dark:to-violet-400">
        WealthPilot
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
                ? "fixed inset-y-0 left-0 z-40 w-72 bg-white/80 p-6 shadow-2xl backdrop-blur-xl dark:bg-gray-800/80"
                : "fixed left-0 top-0 h-screen w-72 overflow-y-auto border-r border-gray-100 bg-white/90 p-6 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-800/90"
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
              <div className="relative mr-3 h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-indigo-600 to-violet-600">
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
                  {user.plan === "premium" ? "Premium Plan" : "Free Plan"}
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
                id="portfolio"
                label="Portfolio"
                icon={<PieChart className="h-5 w-5" />}
              />
              <NavItem
                id="goals"
                label="Financial Goals"
                icon={<Target className="h-5 w-5" />}
              />
              <NavItem
                id="budget"
                label="Budget"
                icon={<CreditCard className="h-5 w-5" />}
              />
              <NavItem
                id="advisor"
                label="AI Advisor"
                icon={<Sparkles className="h-5 w-5" />}
              />
              <NavItem
                id="settings"
                label="Settings"
                icon={<Settings className="h-5 w-5" />}
              />
            </nav>

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
            ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
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
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
          </motion.button>
          <motion.button
            className="rounded-full bg-gray-100/80 p-2 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
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
            id="portfolio"
            label="Portfolio"
            icon={<PieChart className="h-6 w-6" />}
          />
          <NavButton
            id="goals"
            label="Goals"
            icon={<Target className="h-6 w-6" />}
          />
          <NavButton
            id="advisor"
            label="Advisor"
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
          className={`${isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          {icon}
        </div>
        <span
          className={`mt-1 text-xs ${isActive ? "font-medium text-indigo-600 dark:text-indigo-400" : "text-gray-600 dark:text-gray-400"}`}
        >
          {label}
        </span>
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
            initial={false}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        )}
      </motion.button>
    );
  };

  // Account Card Component
  const AccountCard = ({ account }: { account: Account }) => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
            style={{ backgroundColor: `${account.color}20` }}
          >
            {account.type === "checking" && (
              <DollarSign size={20} style={{ color: account.color }} />
            )}
            {account.type === "savings" && (
              <CircleDollarSign size={20} style={{ color: account.color }} />
            )}
            {account.type === "investment" && (
              <LineChart size={20} style={{ color: account.color }} />
            )}
            {account.type === "credit" && (
              <CreditCard size={20} style={{ color: account.color }} />
            )}
          </div>
          <div>
            <h3 className="font-medium dark:text-white">{account.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
            </p>
          </div>
        </div>
        <motion.button
          className="rounded-full bg-gray-100/80 p-1.5 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} />
        </motion.button>
      </div>
      <div className="mt-4">
        <div className="flex items-center">
          <h4 className="text-xl font-bold dark:text-white">
            {hideBalances
              ? "••••••"
              : formatCurrency(account.balance, account.currency)}
          </h4>
          <motion.button
            className="ml-2 rounded-full bg-gray-100/80 p-1 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            onClick={toggleHideBalances}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {hideBalances ? <EyeOff size={14} /> : <Eye size={14} />}
          </motion.button>
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Last updated: {account.lastUpdated.toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );

  // Transaction Item Component
  const TransactionItem = ({ transaction }: { transaction: Transaction }) => (
    <motion.div
      className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0 dark:border-gray-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center">
        <div
          className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full ${
            transaction.type === "income"
              ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {transaction.type === "income" ? (
            <TrendingUp size={18} />
          ) : (
            <TrendingDown size={18} />
          )}
        </div>
        <div>
          <p className="font-medium dark:text-white">
            {transaction.description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {transaction.category}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-medium ${
            transaction.type === "income"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {transaction.type === "income" ? "+" : "-"}
          {formatCurrency(Math.abs(transaction.amount))}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {transaction.date.toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );

  // Investment Item Component
  const InvestmentItem = ({ investment }: { investment: Investment }) => (
    <motion.div
      className="flex items-center justify-between border-b border-gray-100 py-3 last:border-0 dark:border-gray-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center">
        <div
          className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
          style={{ backgroundColor: `${investment.color}20` }}
        >
          <span
            className="text-sm font-bold"
            style={{ color: investment.color }}
          >
            {investment.ticker}
          </span>
        </div>
        <div>
          <p className="font-medium dark:text-white">{investment.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {investment.allocation}% allocation
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium dark:text-white">
          {formatCurrency(investment.value)}
        </p>
        <p
          className={`text-sm ${
            investment.changePercent > 0
              ? "text-green-600 dark:text-green-400"
              : investment.changePercent < 0
                ? "text-red-600 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {formatPercentage(investment.changePercent)}
        </p>
      </div>
    </motion.div>
  );

  // Goal Card Component
  const GoalCard = ({ goal }: { goal: FinancialGoal }) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const daysLeft = Math.ceil(
      (goal.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
    );

    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur-xl transition-all hover:shadow-xl dark:bg-gray-800/95"
        whileHover={{ y: -5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: `${goal.color}20` }}
            >
              {goal.category === "savings" && (
                <CircleDollarSign size={20} style={{ color: goal.color }} />
              )}
              {goal.category === "investment" && (
                <LineChart size={20} style={{ color: goal.color }} />
              )}
              {goal.category === "debt" && (
                <CreditCard size={20} style={{ color: goal.color }} />
              )}
              {goal.category === "purchase" && (
                <DollarSign size={20} style={{ color: goal.color }} />
              )}
            </div>
            <div>
              <h3 className="font-medium dark:text-white">{goal.name}</h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock size={12} className="mr-1" />
                {daysLeft > 0 ? `${daysLeft} days left` : "Due today"}
              </div>
            </div>
          </div>
          <motion.button
            className="rounded-full bg-gray-100/80 p-1.5 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={16} />
          </motion.button>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatCurrency(goal.currentAmount)} of{" "}
              {formatCurrency(goal.targetAmount)}
            </p>
            <p className="text-sm font-medium" style={{ color: goal.color }}>
              {progress.toFixed(0)}%
            </p>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
            <motion.div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: goal.color,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    );
  };

  // Budget Category Component
  const BudgetCategoryItem = ({ category }: { category: BudgetCategory }) => {
    const progress = (category.spent / category.allocated) * 100;
    const isOverBudget = category.spent > category.allocated;

    return (
      <motion.div
        className="border-b border-gray-100 py-3 last:border-0 dark:border-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className="mr-3 h-3 w-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <p className="font-medium dark:text-white">{category.name}</p>
          </div>
          <div className="text-right">
            <p className="font-medium dark:text-white">
              {formatCurrency(category.spent)} /{" "}
              {formatCurrency(category.allocated)}
            </p>
            <p
              className={`text-sm ${
                isOverBudget
                  ? "text-red-600 dark:text-red-400"
                  : progress > 80
                    ? "text-yellow-600 dark:text-yellow-400"
                    : "text-green-600 dark:text-green-400"
              }`}
            >
              {progress.toFixed(0)}%
            </p>
          </div>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          <motion.div
            className={`h-full rounded-full ${
              isOverBudget
                ? "bg-red-500"
                : progress > 80
                  ? "bg-yellow-500"
                  : "bg-green-500"
            }`}
            style={{ width: `${Math.min(progress, 100)}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    );
  };

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
            recommendation.type === "investment"
              ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
              : recommendation.type === "savings"
                ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                : recommendation.type === "debt"
                  ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
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
          className="flex items-center rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm"
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

  // Net Worth Chart Component
  const NetWorthChart = () => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        Net Worth Trend
      </h3>
      <ResponsiveContainer width="100%" height={300} key={chartKey}>
        <AreaChart
          data={netWorthData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <defs>
            <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
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
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(value) => [
              `$${Number(value).toLocaleString()}`,
              "Net Worth",
            ]}
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#8b5cf6"
            fillOpacity={1}
            fill="url(#netWorthGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );

  // Income vs Expense Chart Component
  const IncomeVsExpenseChart = () => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        Income vs Expenses
      </h3>
      <ResponsiveContainer width="100%" height={300} key={chartKey}>
        <RechartsBarChart
          data={incomeVsExpenseData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
          />
          <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
          <YAxis
            stroke={darkMode ? "#9ca3af" : "#6b7280"}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />
          <Legend />
          <Bar
            dataKey="income"
            name="Income"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </motion.div>
  );

  // Spending by Category Chart Component
  const SpendingByCategoryChart = () => {
    const COLORS = [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#8b5cf6",
      "#ec4899",
      "#ef4444",
    ];

    return (
      <motion.div
        className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Spending by Category
        </h3>
        <ResponsiveContainer width="100%" height={300} key={chartKey}>
          <RechartsPieChart>
            <Pie
              data={spendingCategoryData}
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
              {spendingCategoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]}
            />
            <Legend />
          </RechartsPieChart>
        </ResponsiveContainer>
      </motion.div>
    );
  };

  // Investment Performance Chart Component
  const InvestmentPerformanceChart = () => (
    <motion.div
      className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="mb-4 text-lg font-semibold dark:text-white">
        Investment Performance
      </h3>
      <ResponsiveContainer width="100%" height={300} key={chartKey}>
        <RechartsLineChart
          data={investmentPerformanceData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#e5e7eb"}
          />
          <XAxis dataKey="month" stroke={darkMode ? "#9ca3af" : "#6b7280"} />
          <YAxis
            stroke={darkMode ? "#9ca3af" : "#6b7280"}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(value) => [
              `$${Number(value).toLocaleString()}`,
              "Portfolio Value",
            ]}
            contentStyle={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? "#374151" : "#e5e7eb",
              color: darkMode ? "#ffffff" : "#000000",
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </motion.div>
  );

  // Add Goal Modal Component
  const AddGoalModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={() => setShowAddGoalModal(false)}
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
          onClick={() => setShowAddGoalModal(false)}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X size={20} />
        </motion.button>

        <h2 className="text-2xl font-bold dark:text-white">
          Add New Financial Goal
        </h2>

        <div className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="goal-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Goal Name
            </label>
            <input
              type="text"
              id="goal-name"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
              placeholder="e.g., Vacation Fund"
            />
          </div>

          <div>
            <label
              htmlFor="goal-amount"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Target Amount
            </label>
            <div className="relative mt-1 rounded-lg shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 dark:text-gray-400">$</span>
              </div>
              <input
                type="number"
                id="goal-amount"
                className="block w-full rounded-lg border border-gray-300 bg-white/90 py-2 pl-7 pr-12 backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="goal-deadline"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Target Date
            </label>
            <input
              type="date"
              id="goal-deadline"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="goal-category"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category
            </label>
            <select
              id="goal-category"
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-white"
            >
              <option value="savings">Savings</option>
              <option value="investment">Investment</option>
              <option value="debt">Debt Repayment</option>
              <option value="purchase">Major Purchase</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <motion.button
              type="button"
              className="rounded-xl border border-gray-300/80 px-4 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setShowAddGoalModal(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Goal
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
              className={`mr-3 flex h-12 w-12 items-center justify-center rounded-full ${
                selectedRecommendation.type === "investment"
                  ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                  : selectedRecommendation.type === "savings"
                    ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                    : selectedRecommendation.type === "debt"
                      ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400"
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

            <div className="mt-6 rounded-xl bg-indigo-50/50 p-4 dark:bg-indigo-900/20">
              <h3 className="font-medium text-indigo-800 dark:text-indigo-200">
                AI Analysis
              </h3>
              <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-300">
                {selectedRecommendation.type === "investment" &&
                  "Based on your risk profile and investment goals, this rebalancing will help optimize your returns while maintaining your desired risk level. Historical data suggests this adjustment could improve your risk-adjusted returns by approximately 0.4% annually."}
                {selectedRecommendation.type === "savings" &&
                  "Moving these funds to a high-yield account would generate approximately $150 more in interest annually. This optimization maintains the same liquidity while improving your returns with no additional risk."}
                {selectedRecommendation.type === "debt" &&
                  "Prioritizing this high-interest debt will save you approximately $237 in interest charges over the next year. This represents a guaranteed 18.99% return on your money, which exceeds the expected return of most investments."}
                {selectedRecommendation.type === "budget" &&
                  "Your spending pattern in this category has increased 32% compared to your 6-month average. Addressing this now will help you stay on track with your overall financial goals without significantly impacting your lifestyle."}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium dark:text-white">
                Steps to Implement
              </h3>
              <ol className="mt-2 list-inside list-decimal space-y-2 text-gray-600 dark:text-gray-300">
                {selectedRecommendation.type === "investment" && (
                  <>
                    <li>Review your current portfolio allocation</li>
                    <li>Sell approximately $1,600 of your tech holdings</li>
                    <li>
                      Distribute the proceeds to your other asset classes
                      according to your target allocation
                    </li>
                    <li>Schedule your next portfolio review in 3 months</li>
                  </>
                )}
                {selectedRecommendation.type === "savings" && (
                  <>
                    <li>
                      Research high-yield savings accounts (we&apos;ve provided
                      recommendations below)
                    </li>
                    <li>Open a new account at your chosen institution</li>
                    <li>Transfer $5,000 from your current savings account</li>
                    <li>Set up automatic transfers for future savings</li>
                  </>
                )}
                {selectedRecommendation.type === "debt" && (
                  <>
                    <li>
                      Allocate extra funds from your budget to credit card
                      payments
                    </li>
                    <li>Make a lump sum payment of at least $500 this month</li>
                    <li>Increase your monthly payment to at least $250</li>
                    <li>Track your progress in the Goals section</li>
                  </>
                )}
                {selectedRecommendation.type === "budget" && (
                  <>
                    <li>Review your recent shopping transactions</li>
                    <li>
                      Identify non-essential purchases that could be reduced
                    </li>
                    <li>
                      Adjust your shopping budget for next month if needed
                    </li>
                    <li>
                      Set up alerts when you reach 80% of your category budget
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
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:shadow-lg"
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

  // Dashboard View
  const renderDashboard = () => (
    <div className="space-y-6 p-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-1">
        <div className="rounded-xl bg-black/5 p-6 text-white backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
              <p className="mt-1 text-indigo-100">
                Here&apos;s your financial overview
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/20 backdrop-blur-lg">
              <CircleDollarSign size={24} />
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Total Assets</p>
              <p className="text-xl font-bold">
                {hideBalances
                  ? "••••••"
                  : formatCurrency(calculateTotalBalance())}
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Total Debt</p>
              <p className="text-xl font-bold">
                {hideBalances ? "••••••" : formatCurrency(calculateTotalDebt())}
              </p>
            </div>
            <div className="rounded-lg bg-white/10 p-3 text-center backdrop-blur-sm">
              <p className="text-sm">Net Worth</p>
              <p className="text-xl font-bold">
                {hideBalances ? "••••••" : formatCurrency(calculateNetWorth())}
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
              Your Accounts
            </h3>
            <motion.button
              className="flex items-center rounded-full bg-gray-100/80 p-1.5 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleHideBalances}
            >
              {hideBalances ? <EyeOff size={16} /> : <Eye size={16} />}
            </motion.button>
          </div>
          <div className="mt-4 space-y-4">
            {accounts.map((account) => (
              <div
                key={account.id}
                className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 dark:border-gray-700"
              >
                <div className="flex items-center">
                  <div
                    className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${account.color}20` }}
                  >
                    {account.type === "checking" && (
                      <DollarSign size={20} style={{ color: account.color }} />
                    )}
                    {account.type === "savings" && (
                      <CircleDollarSign
                        size={20}
                        style={{ color: account.color }}
                      />
                    )}
                    {account.type === "investment" && (
                      <LineChart size={20} style={{ color: account.color }} />
                    )}
                    {account.type === "credit" && (
                      <CreditCard size={20} style={{ color: account.color }} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium dark:text-white">
                      {account.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {account.type.charAt(0).toUpperCase() +
                        account.type.slice(1)}
                    </p>
                  </div>
                </div>
                <p
                  className={`font-medium ${account.balance < 0 ? "text-red-600 dark:text-red-400" : "dark:text-white"}`}
                >
                  {hideBalances
                    ? "••••••"
                    : formatCurrency(account.balance, account.currency)}
                </p>
              </div>
            ))}
          </div>
          <motion.button
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-gray-100/50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200/70 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={16} className="mr-1" />
            Add Account
          </motion.button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Recent Transactions
          </h3>
          <div className="space-y-1">
            {transactions.slice(0, 4).map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
          <motion.button
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-gray-100/50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200/70 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Transactions
          </motion.button>
        </div>
      </div>

      <NetWorthChart />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <IncomeVsExpenseChart />
        <SpendingByCategoryChart />
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold dark:text-white">
            AI Financial Insights
          </h3>
          <motion.button
            className="flex items-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveView("advisor")}
          >
            <Sparkles size={14} className="mr-1" />
            View All
          </motion.button>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {aiRecommendations.slice(0, 2).map((recommendation) => (
            <AIRecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Portfolio View
  const renderPortfolio = () => (
    <div className="space-y-6 p-6">
      <div className="flex items-center sm:justify-between">
        <h2 className="flex-1 truncate text-xl font-bold dark:text-white">
          Investment Portfolio
        </h2>
        <div className="flex items-center space-x-2">
          <motion.button
            className="flex items-center rounded-full bg-gray-100/80 p-1.5 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleHideBalances}
          >
            {hideBalances ? <EyeOff size={16} /> : <Eye size={16} />}
          </motion.button>
          <motion.button
            className="flex items-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={14} className="mr-1" />
            Add Investment
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-1 md:col-span-2">
          <InvestmentPerformanceChart />
        </div>
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Portfolio Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">Total Value</p>
              <p className="font-bold dark:text-white">
                {hideBalances
                  ? "••••••"
                  : formatCurrency(
                      accounts.find((a) => a.type === "investment")?.balance ||
                        0,
                    )}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">Daily Change</p>
              <p className="font-medium text-green-600 dark:text-green-400">
                +$382.45 (1.18%)
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">YTD Return</p>
              <p className="font-medium text-green-600 dark:text-green-400">
                +12.4%
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">Risk Level</p>
              <p className="font-medium dark:text-white">Moderate</p>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="font-medium dark:text-white">Asset Allocation</h4>
            <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              {investments.map((investment, index) => (
                <div
                  key={investment.id}
                  className="float-left h-full"
                  style={{
                    width: `${investment.allocation}%`,
                    backgroundColor: investment.color,
                  }}
                />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {investments.map((investment) => (
                <div key={investment.id} className="flex items-center">
                  <div
                    className="mr-1 h-3 w-3 rounded-full"
                    style={{ backgroundColor: investment.color }}
                  />
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {investment.ticker} ({investment.allocation}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Your Investments
        </h3>
        <div className="space-y-1">
          {investments.map((investment) => (
            <InvestmentItem key={investment.id} investment={investment} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Market News
          </h3>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3 dark:border-gray-700">
              <h4 className="font-medium dark:text-white">
                Fed Signals Potential Rate Cut
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                The Federal Reserve indicated it may consider rate cuts in the
                coming months as inflation shows signs of cooling.
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                2 hours ago
              </p>
            </div>
            <div className="border-b border-gray-100 pb-3 dark:border-gray-700">
              <h4 className="font-medium dark:text-white">
                Tech Stocks Rally on Earnings
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Major tech companies reported better-than-expected quarterly
                earnings, driving a sector-wide rally.
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                5 hours ago
              </p>
            </div>
            <div>
              <h4 className="font-medium dark:text-white">
                Housing Market Shows Signs of Cooling
              </h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                New home sales declined for the third consecutive month,
                suggesting a potential slowdown in the housing market.
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Yesterday
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            AI Investment Insights
          </h3>
          <div className="rounded-xl bg-indigo-50/50 p-4 dark:bg-indigo-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 shrink-0 rounded-full bg-indigo-100 p-1.5 dark:bg-indigo-900/50">
                <Sparkles
                  size={16}
                  className="text-indigo-600 dark:text-indigo-300"
                />
              </div>
              <div>
                <p className="font-medium text-indigo-800 dark:text-indigo-200">
                  Portfolio Rebalancing Opportunity
                </p>
                <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
                  Your tech allocation is 5% higher than your target. Consider
                  rebalancing to reduce risk and align with your long-term
                  strategy.
                </p>
                <motion.button
                  className="mt-3 flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  whileHover={{ x: 5 }}
                >
                  View Details
                  <ArrowRight size={12} className="ml-1" />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-green-50/50 p-4 dark:bg-green-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                <TrendingUp
                  size={16}
                  className="text-green-600 dark:text-green-300"
                />
              </div>
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Dividend Reinvestment
                </p>
                <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                  You have $320 in uninvested dividends. Reinvesting now would
                  maximize your compound growth potential.
                </p>
                <motion.button
                  className="mt-3 flex items-center text-xs font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  whileHover={{ x: 5 }}
                >
                  Reinvest Now
                  <ArrowRight size={12} className="ml-1" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Goals View
  const renderGoals = () => (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Financial Goals</h2>
        <motion.button
          className="flex items-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddGoalModal(true)}
        >
          <Plus size={14} className="mr-1" />
          Add Goal
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {financialGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Goal Progress
        </h3>
        <div className="space-y-6">
          {financialGoals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysLeft = Math.ceil(
              (goal.deadline.getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24),
            );

            return (
              <div
                key={goal.id}
                className="border-b border-gray-100 pb-4 last:border-0 dark:border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className="mr-3 h-3 w-3 rounded-full"
                      style={{ backgroundColor: goal.color }}
                    />
                    <p className="font-medium dark:text-white">{goal.name}</p>
                  </div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: goal.color }}
                  >
                    {progress.toFixed(0)}%
                  </p>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <p>
                    {formatCurrency(goal.currentAmount)} of{" "}
                    {formatCurrency(goal.targetAmount)}
                  </p>
                  <p>{daysLeft > 0 ? `${daysLeft} days left` : "Due today"}</p>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      backgroundColor: goal.color,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Goal Strategies
          </h3>
          <div className="space-y-4">
            <div className="rounded-xl bg-green-50/50 p-4 dark:bg-green-900/20">
              <div className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                  <Target
                    size={16}
                    className="text-green-600 dark:text-green-300"
                  />
                </div>
                <div>
                  <p className="font-medium text-green-800 dark:text-green-200">
                    Emergency Fund
                  </p>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                    You&apos;re 85% of the way to your emergency fund goal.
                    Increasing your monthly contribution by $75 would help you
                    reach your target 1 month earlier.
                  </p>
                  <motion.button
                    className="mt-3 flex items-center text-xs font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    whileHover={{ x: 5 }}
                  >
                    Adjust Contribution
                    <ArrowRight size={12} className="ml-1" />
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-blue-50/50 p-4 dark:bg-blue-900/20">
              <div className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-blue-100 p-1.5 dark:bg-blue-900/50">
                  <CircleDollarSign
                    size={16}
                    className="text-blue-600 dark:text-blue-300"
                  />
                </div>
                <div>
                  <p className="font-medium text-blue-800 dark:text-blue-200">
                    Down Payment
                  </p>
                  <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                    Consider setting up a dedicated high-yield savings account
                    for your down payment goal to maximize interest earnings.
                  </p>
                  <motion.button
                    className="mt-3 flex items-center text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    whileHover={{ x: 5 }}
                  >
                    View Options
                    <ArrowRight size={12} className="ml-1" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Goal Timeline
          </h3>
          <div className="space-y-6">
            {financialGoals
              .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
              .map((goal) => {
                const daysLeft = Math.ceil(
                  (goal.deadline.getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24),
                );
                const progress = (goal.currentAmount / goal.targetAmount) * 100;

                return (
                  <div key={goal.id} className="flex items-start">
                    <div
                      className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${goal.color}20` }}
                    >
                      <Clock size={20} style={{ color: goal.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium dark:text-white">
                          {goal.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {goal.deadline.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center justify-between text-sm">
                        <p className="text-gray-600 dark:text-gray-300">
                          {daysLeft > 0 ? `${daysLeft} days left` : "Due today"}
                        </p>
                        <p
                          className="font-medium"
                          style={{ color: goal.color }}
                        >
                          {progress.toFixed(0)}% complete
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );

  // Budget View
  const renderBudget = () => (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold dark:text-white">Budget Management</h2>
        <div className="flex items-center space-x-2">
          <motion.button
            className="flex items-center rounded-full bg-gray-100/80 p-1.5 text-gray-500 backdrop-blur-sm hover:bg-gray-200 dark:bg-gray-700/80 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleHideBalances}
          >
            {hideBalances ? <EyeOff size={16} /> : <Eye size={16} />}
          </motion.button>
          <motion.button
            className="flex items-center rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={14} className="mr-1" />
            Add Category
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Monthly Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">Income</p>
              <p className="font-bold text-green-600 dark:text-green-400">
                {hideBalances ? "••••••" : formatCurrency(4200)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">Expenses</p>
              <p className="font-bold text-red-600 dark:text-red-400">
                {hideBalances ? "••••••" : formatCurrency(3050.5)}
              </p>
            </div>
            <div className="border-t border-gray-100 pt-3 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-700 dark:text-gray-200">
                  Remaining
                </p>
                <p className="font-bold text-indigo-600 dark:text-indigo-400">
                  {hideBalances ? "••••••" : formatCurrency(1149.5)}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Budget Progress
            </p>
            <div className="mt-2 h-4 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <motion.div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: "72%" }}
                initial={{ width: 0 }}
                animate={{ width: "72%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="mt-1 text-right text-sm text-gray-500 dark:text-gray-400">
              72% of budget used
            </p>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <SpendingByCategoryChart />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Budget Categories
        </h3>
        <div className="space-y-1">
          {budgetCategories.map((category) => (
            <BudgetCategoryItem key={category.id} category={category} />
          ))}
        </div>
        <motion.button
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-gray-100/50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200/70 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={16} className="mr-1" />
          Add Category
        </motion.button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Recent Transactions
          </h3>
          <div className="space-y-1">
            {transactions.slice(0, 5).map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
          <motion.button
            className="mt-4 flex w-full items-center justify-center rounded-xl bg-gray-100/50 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200/70 dark:bg-gray-700/50 dark:text-gray-300 dark:hover:bg-gray-600/50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Transactions
          </motion.button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Budget Insights
          </h3>
          <div className="rounded-xl bg-yellow-50/50 p-4 dark:bg-yellow-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 shrink-0 rounded-full bg-yellow-100 p-1.5 dark:bg-yellow-900/50">
                <Sparkles
                  size={16}
                  className="text-yellow-600 dark:text-yellow-300"
                />
              </div>
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">
                  Shopping Budget Alert
                </p>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                  You&apos;ve exceeded your shopping budget by $112.80 this
                  month. Review recent purchases and adjust next month&apos;s
                  budget if needed.
                </p>
                <motion.button
                  className="mt-3 flex items-center text-xs font-medium text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300"
                  whileHover={{ x: 5 }}
                >
                  Review Transactions
                  <ArrowRight size={12} className="ml-1" />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-green-50/50 p-4 dark:bg-green-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                <TrendingDown
                  size={16}
                  className="text-green-600 dark:text-green-300"
                />
              </div>
              <div>
                <p className="font-medium text-green-800 dark:text-green-200">
                  Utilities Savings
                </p>
                <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                  Your utilities spending is 18% lower than last month. Keep up
                  the good work on energy conservation!
                </p>
                <motion.button
                  className="mt-3 flex items-center text-xs font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                  whileHover={{ x: 5 }}
                >
                  View Trends
                  <ArrowRight size={12} className="ml-1" />
                </motion.button>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-blue-50/50 p-4 dark:bg-blue-900/20">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-blue-100 p-1.5 dark:bg-blue-900/50">
                <CircleDollarSign
                  size={16}
                  className="text-blue-600 dark:text-blue-300"
                />
              </div>
              <div>
                <p className="font-medium text-blue-800 dark:text-blue-200">
                  Savings Opportunity
                </p>
                <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                  Based on your spending patterns, you could potentially save an
                  additional $250 per month by optimizing your food and
                  entertainment expenses.
                </p>
                <motion.button
                  className="mt-3 flex items-center text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  whileHover={{ x: 5 }}
                >
                  Get Recommendations
                  <ArrowRight size={12} className="ml-1" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // AI Advisor View
  const renderAIAdvisor = () => (
    <div className="space-y-6 p-6">
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 p-1">
        <div className="rounded-xl bg-black/5 p-6 text-white backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">AI Financial Advisor</h2>
              <p className="mt-1 text-indigo-100">
                Personalized insights and recommendations for your financial
                journey
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
          Financial Health Score
        </h3>
        <div className="flex justify-between sm:items-center">
          <div className="flex-1">
            <div className="flex items-center">
              <div className="mr-3 h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 p-1 sm:h-16 sm:w-16">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-base font-bold text-indigo-600 dark:bg-gray-800 dark:text-indigo-400 sm:text-xl">
                  78
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold dark:text-white">Good</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your financial health is on the right track
                </p>
              </div>
            </div>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600"
                style={{ width: "78%" }}
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
          <div className="ml-6 flex flex-col items-end">
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Poor (0-50)
              </p>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Fair (51-70)
              </p>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Good (71-90)
              </p>
            </div>
            <div className="flex items-center">
              <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Excellent (91-100)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Strengths
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                <TrendingUp
                  size={16}
                  className="text-green-600 dark:text-green-300"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">
                  Consistent Savings
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  You&apos;re consistently saving 22% of your income, which is
                  above the recommended 20%.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                <PieChart
                  size={16}
                  className="text-green-600 dark:text-green-300"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">
                  Diversified Investments
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Your investment portfolio is well-diversified across different
                  asset classes.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-green-100 p-1.5 dark:bg-green-900/50">
                <Target
                  size={16}
                  className="text-green-600 dark:text-green-300"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">
                  Clear Financial Goals
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  You have well-defined financial goals with specific timelines
                  and regular contributions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Areas to Improve
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-red-100 p-1.5 dark:bg-red-900/50">
                <CreditCard
                  size={16}
                  className="text-red-600 dark:text-red-300"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">Credit Card Debt</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Your credit card has a high-interest balance that should be
                  prioritized for repayment.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-red-100 p-1.5 dark:bg-red-900/50">
                <LineChart
                  size={16}
                  className="text-red-600 dark:text-red-300"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">
                  Portfolio Rebalancing
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  Your investment portfolio has drifted from your target
                  allocation and needs rebalancing.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="mr-3 mt-1 rounded-full bg-red-100 p-1.5 dark:bg-red-900/50">
                <DollarSign
                  size={16}
                  className="text-red-600 dark:text-red-300"
                />
              </div>
              <div>
                <p className="font-medium dark:text-white">Shopping Budget</p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  You consistently exceed your shopping budget, which affects
                  your overall financial plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white/95 p-6 shadow-lg backdrop-blur-xl dark:bg-gray-800/95">
        <h3 className="mb-4 text-lg font-semibold dark:text-white">
          Long-Term Projections
        </h3>
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300">
            Based on your current savings rate, investment strategy, and
            financial goals, here&apos;s how your financial future looks:
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-indigo-50/50 p-4 dark:bg-indigo-900/20">
            <h4 className="font-medium text-indigo-800 dark:text-indigo-200">
              Retirement
            </h4>
            <p className="mt-2 text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {formatCurrency(1250000)}
            </p>
            <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
              Projected at age 65
            </p>
            <p className="mt-3 text-sm text-indigo-700 dark:text-indigo-300">
              You&apos;re on track to reach 83% of your retirement goal.
            </p>
          </div>

          <div className="rounded-xl bg-green-50/50 p-4 dark:bg-green-900/20">
            <h4 className="font-medium text-green-800 dark:text-green-200">
              Home Purchase
            </h4>
            <p className="mt-2 text-2xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(50000)}
            </p>
            <p className="mt-1 text-sm text-green-700 dark:text-green-300">
              Projected in 14 months
            </p>
            <p className="mt-3 text-sm text-green-700 dark:text-green-300">
              You&apos;re on track to reach your down payment goal on schedule.
            </p>
          </div>

          <div className="rounded-xl bg-purple-50/50 p-4 dark:bg-purple-900/20">
            <h4 className="font-medium text-purple-800 dark:text-purple-200">
              Net Worth
            </h4>
            <p className="mt-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
              {formatCurrency(250000)}
            </p>
            <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">
              Projected in 5 years
            </p>
            <p className="mt-3 text-sm text-purple-700 dark:text-purple-300">
              Your net worth is projected to grow by 334% in the next 5 years.
            </p>
          </div>
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
              <div className="relative mr-3 h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-indigo-600 to-violet-600">
                <Image
                  src={user.avatar || "/placeholder.svg"}
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
                  ? "Premium Plan - $9.99/month"
                  : "Free Plan"}
              </p>
            </div>
            <motion.button
              className={`rounded-xl px-3 py-1.5 text-sm font-medium ${
                user.plan === "premium"
                  ? "border border-gray-300/80 text-gray-700 hover:bg-gray-50 dark:border-gray-600/80 dark:text-gray-300 dark:hover:bg-gray-700"
                  : "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm hover:shadow-md"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user.plan === "premium"
                ? "Manage Subscription"
                : "Upgrade to Premium"}
            </motion.button>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Password</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last changed 3 months ago
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

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium dark:text-white">
                Two-Factor Authentication
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add an extra layer of security
              </p>
            </div>
            <motion.button
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enable
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
                className="block h-6 w-11 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:bg-gray-600 dark:peer-focus:ring-indigo-800"
              ></label>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-gray-100 py-4 dark:border-gray-700">
            <div>
              <p className="font-medium dark:text-white">Hide Balances</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Hide sensitive financial information
              </p>
            </div>
            <div className="relative inline-block h-6 w-11 flex-shrink-0">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={hideBalances}
                onChange={toggleHideBalances}
                id="hide-balances"
              />
              <label
                htmlFor="hide-balances"
                className="block h-6 w-11 cursor-pointer rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:bg-gray-600 dark:peer-focus:ring-indigo-800"
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

          <div className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium dark:text-white">Currency</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Set your preferred currency
              </p>
            </div>
            <select className="rounded-lg border border-gray-300 bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-700 backdrop-blur-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700/90 dark:text-gray-300">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
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
                Download all your financial data
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
            {activeView === "portfolio" && renderPortfolio()}
            {activeView === "goals" && renderGoals()}
            {activeView === "budget" && renderBudget()}
            {activeView === "advisor" && renderAIAdvisor()}
            {activeView === "settings" && renderSettings()}
          </div>
        </main>
      </div>

      {isMobile && <MobileNavigation />}

      {/* ------------------------------------------------------ Modal --------------------------------------------------------------------- */}

      {/* Add Goal modal */}
      <AnimatePresence>{showAddGoalModal && <AddGoalModal />}</AnimatePresence>

      {/* AI advice modal */}
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
      `}</style>
    </div>
  );
};

export default AIFinancialAdvisor;
