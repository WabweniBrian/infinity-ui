"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  TrendingUp,
  DollarSign,
  CreditCard,
  Plus,
  Trash2,
  Edit,
  ChevronDown,
  Filter,
  Download,
  RefreshCw,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Landmark,
  Briefcase,
  ShoppingBag,
  Coffee,
  Home,
  Car,
  Plane,
  Gift,
  Zap,
  Utensils,
  Wifi,
  Smartphone,
  Heart,
  Scissors,
  Film,
  Music,
  BookOpen,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  PieChart as RePieChart,
  Pie,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: "income" | "expense";
}

interface Budget {
  id: string;
  category: string;
  allocated: number;
  spent: number;
}

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  icon: string;
}

interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "investment" | "credit";
  balance: number;
  currency: string;
  color: string;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}

const categoryIcons: Record<string, any> = {
  "Food & Dining": Utensils,
  Shopping: ShoppingBag,
  Housing: Home,
  Transportation: Car,
  Entertainment: Film,
  Travel: Plane,
  Utilities: Zap,
  Healthcare: Heart,
  Education: BookOpen,
  Personal: Scissors,
  Gifts: Gift,
  Investments: TrendingUp,
  Income: DollarSign,
  Coffee: Coffee,
  Subscriptions: Wifi,
  Phone: Smartphone,
  Music: Music,
};

const categoryColors: Record<string, string> = {
  "Food & Dining": "#FF6B6B",
  Shopping: "#4ECDC4",
  Housing: "#45B7D1",
  Transportation: "#F9C74F",
  Entertainment: "#9D4EDD",
  Travel: "#43AA8B",
  Utilities: "#577590",
  Healthcare: "#F94144",
  Education: "#90BE6D",
  Personal: "#F8961E",
  Gifts: "#F3722C",
  Investments: "#277DA1",
  Income: "#4CAF50",
  Coffee: "#795548",
  Subscriptions: "#9C27B0",
  Phone: "#2196F3",
  Music: "#FF9800",
};

const PersonalFinanceDashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState<string | null>("overview");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    "7d" | "1m" | "3m" | "6m" | "1y" | "all"
  >("1m");
  const [selectedAccount, setSelectedAccount] = useState<string | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTransaction, setEditingTransaction] = useState<string | null>(
    null,
  );
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    date: new Date().toISOString().split("T")[0],
    amount: 0,
    category: "Food & Dining",
    description: "",
    type: "expense",
  });
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0);

  // Check if system prefers dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(isDark);

      if (isDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  // Initialize sample data
  useEffect(() => {
    // Sample accounts
    const sampleAccounts: Account[] = [
      {
        id: "acc-1",
        name: "Main Checking",
        type: "checking",
        balance: 3245.65,
        currency: "USD",
        color: "#4CAF50",
      },
      {
        id: "acc-2",
        name: "Savings",
        type: "savings",
        balance: 12750.42,
        currency: "USD",
        color: "#2196F3",
      },
      {
        id: "acc-3",
        name: "Investment Portfolio",
        type: "investment",
        balance: 28640.18,
        currency: "USD",
        color: "#9C27B0",
      },
      {
        id: "acc-4",
        name: "Credit Card",
        type: "credit",
        balance: -1240.87,
        currency: "USD",
        color: "#F44336",
      },
    ];
    setAccounts(sampleAccounts);

    // Calculate total balance
    const total = sampleAccounts.reduce(
      (sum, account) => sum + account.balance,
      0,
    );
    setTotalBalance(total);

    // Sample transactions
    const sampleTransactions: Transaction[] = [
      {
        id: "txn-1",
        date: "2023-06-15",
        amount: 2500,
        category: "Income",
        description: "Salary deposit",
        type: "income",
      },
      {
        id: "txn-2",
        date: "2023-06-14",
        amount: 42.75,
        category: "Food & Dining",
        description: "Grocery shopping",
        type: "expense",
      },
      {
        id: "txn-3",
        date: "2023-06-12",
        amount: 9.99,
        category: "Subscriptions",
        description: "Netflix subscription",
        type: "expense",
      },
      {
        id: "txn-4",
        date: "2023-06-10",
        amount: 35.5,
        category: "Transportation",
        description: "Uber ride",
        type: "expense",
      },
      {
        id: "txn-5",
        date: "2023-06-08",
        amount: 120.3,
        category: "Shopping",
        description: "New clothes",
        type: "expense",
      },
      {
        id: "txn-6",
        date: "2023-06-05",
        amount: 4.5,
        category: "Coffee",
        description: "Morning coffee",
        type: "expense",
      },
      {
        id: "txn-7",
        date: "2023-06-01",
        amount: 800,
        category: "Housing",
        description: "Rent payment",
        type: "expense",
      },
      {
        id: "txn-8",
        date: "2023-05-28",
        amount: 200,
        category: "Income",
        description: "Freelance work",
        type: "income",
      },
      {
        id: "txn-9",
        date: "2023-05-25",
        amount: 65.99,
        category: "Utilities",
        description: "Electricity bill",
        type: "expense",
      },
      {
        id: "txn-10",
        date: "2023-05-20",
        amount: 25.75,
        category: "Entertainment",
        description: "Movie tickets",
        type: "expense",
      },
    ];
    setTransactions(sampleTransactions);

    // Calculate income and expenses
    const income = sampleTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = sampleTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    setTotalIncome(income);
    setTotalExpenses(expenses);
    setSavingsRate(Math.round(((income - expenses) / income) * 100));

    // Sample budgets
    const sampleBudgets: Budget[] = [
      {
        id: "budget-1",
        category: "Food & Dining",
        allocated: 400,
        spent: 250.45,
      },
      {
        id: "budget-2",
        category: "Transportation",
        allocated: 200,
        spent: 135.5,
      },
      {
        id: "budget-3",
        category: "Entertainment",
        allocated: 150,
        spent: 75.75,
      },
      {
        id: "budget-4",
        category: "Shopping",
        allocated: 300,
        spent: 220.3,
      },
      {
        id: "budget-5",
        category: "Utilities",
        allocated: 250,
        spent: 215.99,
      },
    ];
    setBudgets(sampleBudgets);

    // Sample savings goals
    const sampleSavingsGoals: SavingsGoal[] = [
      {
        id: "goal-1",
        name: "Emergency Fund",
        targetAmount: 10000,
        currentAmount: 5750,
        targetDate: "2023-12-31",
        icon: "Landmark",
      },
      {
        id: "goal-2",
        name: "Vacation",
        targetAmount: 3000,
        currentAmount: 1200,
        targetDate: "2023-09-30",
        icon: "Plane",
      },
      {
        id: "goal-3",
        name: "New Laptop",
        targetAmount: 1500,
        currentAmount: 800,
        targetDate: "2023-08-15",
        icon: "Laptop",
      },
    ];
    setSavingsGoals(sampleSavingsGoals);

    // Sample monthly data for charts
    const sampleMonthlyData: MonthlyData[] = [
      { month: "Jan", income: 3200, expenses: 2700, savings: 500 },
      { month: "Feb", income: 3200, expenses: 2900, savings: 300 },
      { month: "Mar", income: 3500, expenses: 2800, savings: 700 },
      { month: "Apr", income: 3300, expenses: 3100, savings: 200 },
      { month: "May", income: 3700, expenses: 3000, savings: 700 },
      { month: "Jun", income: 3400, expenses: 2600, savings: 800 },
    ];
    setMonthlyData(sampleMonthlyData);

    // Sample category data for pie chart
    const sampleCategoryData: CategoryData[] = [
      {
        name: "Food & Dining",
        value: 250.45,
        color: categoryColors["Food & Dining"],
      },
      {
        name: "Transportation",
        value: 135.5,
        color: categoryColors["Transportation"],
      },
      {
        name: "Entertainment",
        value: 75.75,
        color: categoryColors["Entertainment"],
      },
      { name: "Shopping", value: 220.3, color: categoryColors["Shopping"] },
      { name: "Utilities", value: 215.99, color: categoryColors["Utilities"] },
      { name: "Housing", value: 800, color: categoryColors["Housing"] },
    ];
    setCategoryData(sampleCategoryData);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Toggle panel expansion
  const togglePanel = (panel: string) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Add new transaction
  const addTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount) return;

    const transaction: Transaction = {
      id: `txn-${Date.now()}`,
      date: newTransaction.date || new Date().toISOString().split("T")[0],
      amount: newTransaction.amount || 0,
      category: newTransaction.category || "Other",
      description: newTransaction.description || "",
      type: newTransaction.type || "expense",
    };

    setTransactions([transaction, ...transactions]);

    // Update totals
    if (transaction.type === "income") {
      setTotalIncome(totalIncome + transaction.amount);
    } else {
      setTotalExpenses(totalExpenses + transaction.amount);
    }

    // Reset form
    setNewTransaction({
      date: new Date().toISOString().split("T")[0],
      amount: 0,
      category: "Food & Dining",
      description: "",
      type: "expense",
    });
    setIsAddingTransaction(false);
  };

  // Delete transaction
  const deleteTransaction = (id: string) => {
    const transaction = transactions.find((t) => t.id === id);
    if (!transaction) return;

    // Update totals
    if (transaction.type === "income") {
      setTotalIncome(totalIncome - transaction.amount);
    } else {
      setTotalExpenses(totalExpenses - transaction.amount);
    }

    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Filter transactions based on search query and selected account
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Get category icon
  const getCategoryIcon = (category: string) => {
    const IconComponent = categoryIcons[category] || ShoppingBag;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div
      className={`${isFullscreen ? "fixed inset-0 z-50 h-screen overflow-y-auto overflow-x-hidden bg-white dark:bg-gray-900" : "min-h-screen bg-gradient-to-br from-white to-gray-50 px-4 py-10 dark:from-gray-950 dark:to-gray-900"}`}
    >
      <div
        className={`mx-auto overflow-hidden rounded-2xl border border-gray-200/50 bg-white shadow-xl backdrop-blur-sm transition-all duration-300 dark:border-gray-800/50 dark:bg-gray-800/90 dark:backdrop-blur-sm ${isFullscreen ? "h-full w-full rounded-none border-0" : "max-w-6xl"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6 dark:border-gray-700/50">
          <div className="flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <h1 className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">
                Personal Finance Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Track, analyze, and optimize your finances
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="rounded-full bg-gray-100 p-2 text-gray-600 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {isFullscreen ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
          {/* Overview Panel */}
          <div className="col-span-1 md:col-span-3">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("overview")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Financial Overview
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                    expandedPanel === "overview" ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {expandedPanel === "overview" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {/* Account Summary */}
                      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-4 text-white shadow-md">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-indigo-100">
                              Total Balance
                            </h3>
                            <DollarSign className="h-5 w-5 text-indigo-100" />
                          </div>
                          <p className="mb-1 text-2xl font-bold">
                            {formatCurrency(totalBalance)}
                          </p>
                          <p className="text-xs text-indigo-100">
                            Across all accounts
                          </p>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-4 text-white shadow-md">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-green-100">
                              Monthly Income
                            </h3>
                            <ArrowUpRight className="h-5 w-5 text-green-100" />
                          </div>
                          <p className="mb-1 text-2xl font-bold">
                            {formatCurrency(totalIncome)}
                          </p>
                          <p className="text-xs text-green-100">Last 30 days</p>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-red-500 to-pink-600 p-4 text-white shadow-md">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-red-100">
                              Monthly Expenses
                            </h3>
                            <ArrowDownRight className="h-5 w-5 text-red-100" />
                          </div>
                          <p className="mb-1 text-2xl font-bold">
                            {formatCurrency(totalExpenses)}
                          </p>
                          <p className="text-xs text-red-100">Last 30 days</p>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-4 text-white shadow-md">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-amber-100">
                              Savings Rate
                            </h3>
                            <Target className="h-5 w-5 text-amber-100" />
                          </div>
                          <p className="mb-1 text-2xl font-bold">
                            {savingsRate}%
                          </p>
                          <p className="text-xs text-amber-100">
                            Of monthly income
                          </p>
                        </div>
                      </div>

                      {/* Accounts List */}
                      <div className="mb-6">
                        <h3 className="mb-3 text-lg font-medium text-gray-800 dark:text-gray-200">
                          Your Accounts
                        </h3>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          {accounts.map((account) => (
                            <div
                              key={account.id}
                              className="flex items-center justify-between rounded-lg border border-gray-200 p-3 shadow-sm dark:border-gray-700"
                            >
                              <div className="flex items-center">
                                <div
                                  className="mr-3 flex h-10 w-10 items-center justify-center rounded-full"
                                  style={{
                                    backgroundColor: account.color + "20",
                                    color: account.color,
                                  }}
                                >
                                  {account.type === "checking" && (
                                    <Landmark className="h-5 w-5" />
                                  )}
                                  {account.type === "savings" && (
                                    <Wallet className="h-5 w-5" />
                                  )}
                                  {account.type === "investment" && (
                                    <TrendingUp className="h-5 w-5" />
                                  )}
                                  {account.type === "credit" && (
                                    <CreditCard className="h-5 w-5" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                    {account.name}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {account.type.charAt(0).toUpperCase() +
                                      account.type.slice(1)}
                                  </p>
                                </div>
                              </div>
                              <p
                                className={`font-medium ${
                                  account.balance >= 0
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-red-600 dark:text-red-400"
                                }`}
                              >
                                {formatCurrency(account.balance)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Charts */}
                      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {/* Income vs Expenses Chart */}
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                          <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-gray-200">
                            Income vs Expenses
                          </h3>
                          <div className="h-64">
                            <ChartContainer
                              config={{
                                income: {
                                  label: "Income",
                                  color: "hsl(var(--chart-1))",
                                },
                                expenses: {
                                  label: "Expenses",
                                  color: "hsl(var(--chart-2))",
                                },
                                savings: {
                                  label: "Savings",
                                  color: "hsl(var(--chart-3))",
                                },
                              }}
                              className="h-full"
                            >
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <ChartTooltip
                                    content={<ChartTooltipContent />}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="income"
                                    stroke="var(--color-income)"
                                    fill="var(--color-income)"
                                    fillOpacity={0.2}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="var(--color-expenses)"
                                    fill="var(--color-expenses)"
                                    fillOpacity={0.2}
                                  />
                                  <Area
                                    type="monotone"
                                    dataKey="savings"
                                    stroke="var(--color-savings)"
                                    fill="var(--color-savings)"
                                    fillOpacity={0.2}
                                  />
                                </AreaChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </div>
                        </div>

                        {/* Spending by Category Chart */}
                        <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                          <h3 className="mb-4 text-base font-medium text-gray-800 dark:text-gray-200">
                            Spending by Category
                          </h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <RePieChart>
                                <Pie
                                  data={categoryData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  {categoryData.map((entry, index) => (
                                    <Cell
                                      key={`cell-${index}`}
                                      fill={entry.color}
                                    />
                                  ))}
                                </Pie>
                                <Tooltip
                                  formatter={(value) => [
                                    formatCurrency(value as number),
                                    "Amount",
                                  ]}
                                  labelFormatter={(index) =>
                                    categoryData[index as number].name
                                  }
                                />
                                <Legend />
                              </RePieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Transactions Panel */}
          <div className="col-span-1 md:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("transactions")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Recent Transactions
                </h2>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddingTransaction(!isAddingTransaction);
                    }}
                    className="mr-2 flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40"
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add Transaction
                  </button>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                      expandedPanel === "transactions" ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              <AnimatePresence>
                {expandedPanel === "transactions" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {/* Search and Filter */}
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <select
                            value={selectedTimeframe}
                            onChange={(e) =>
                              setSelectedTimeframe(e.target.value as any)
                            }
                            className="rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                          >
                            <option value="7d">Last 7 days</option>
                            <option value="1m">Last month</option>
                            <option value="3m">Last 3 months</option>
                            <option value="6m">Last 6 months</option>
                            <option value="1y">Last year</option>
                            <option value="all">All time</option>
                          </select>
                          <button className="flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                            <Filter className="mr-1 h-4 w-4" />
                            Filter
                          </button>
                        </div>
                      </div>

                      {/* Add Transaction Form */}
                      <AnimatePresence>
                        {isAddingTransaction && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                          >
                            <h3 className="mb-3 text-base font-medium text-gray-800 dark:text-gray-200">
                              Add New Transaction
                            </h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Description
                                </label>
                                <input
                                  type="text"
                                  value={newTransaction.description || ""}
                                  onChange={(e) =>
                                    setNewTransaction({
                                      ...newTransaction,
                                      description: e.target.value,
                                    })
                                  }
                                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                                  placeholder="Coffee, Groceries, etc."
                                />
                              </div>
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Amount
                                </label>
                                <input
                                  type="number"
                                  value={newTransaction.amount || ""}
                                  onChange={(e) =>
                                    setNewTransaction({
                                      ...newTransaction,
                                      amount: Number.parseFloat(e.target.value),
                                    })
                                  }
                                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                                  placeholder="0.00"
                                  step="0.01"
                                />
                              </div>
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Category
                                </label>
                                <select
                                  value={
                                    newTransaction.category || "Food & Dining"
                                  }
                                  onChange={(e) =>
                                    setNewTransaction({
                                      ...newTransaction,
                                      category: e.target.value,
                                    })
                                  }
                                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                                >
                                  {Object.keys(categoryIcons).map(
                                    (category) => (
                                      <option key={category} value={category}>
                                        {category}
                                      </option>
                                    ),
                                  )}
                                </select>
                              </div>
                              <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Date
                                </label>
                                <input
                                  type="date"
                                  value={newTransaction.date || ""}
                                  onChange={(e) =>
                                    setNewTransaction({
                                      ...newTransaction,
                                      date: e.target.value,
                                    })
                                  }
                                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
                                />
                              </div>
                              <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="transactionType"
                                    value="expense"
                                    checked={newTransaction.type === "expense"}
                                    onChange={() =>
                                      setNewTransaction({
                                        ...newTransaction,
                                        type: "expense",
                                      })
                                    }
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 dark:text-indigo-400 dark:focus:ring-indigo-400"
                                  />
                                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    Expense
                                  </span>
                                </label>
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="transactionType"
                                    value="income"
                                    checked={newTransaction.type === "income"}
                                    onChange={() =>
                                      setNewTransaction({
                                        ...newTransaction,
                                        type: "income",
                                      })
                                    }
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 dark:text-indigo-400 dark:focus:ring-indigo-400"
                                  />
                                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    Income
                                  </span>
                                </label>
                              </div>
                              <div className="flex items-center justify-end space-x-2 sm:col-span-2">
                                <button
                                  onClick={() => setIsAddingTransaction(false)}
                                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={addTransaction}
                                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
                                >
                                  Add Transaction
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Transactions List */}
                      <div className="rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-400">
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Amount</th>
                                <th className="px-4 py-3 text-right">
                                  Actions
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                              {filteredTransactions.length === 0 ? (
                                <tr>
                                  <td
                                    colSpan={5}
                                    className="px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                                  >
                                    No transactions found
                                  </td>
                                </tr>
                              ) : (
                                filteredTransactions.map((transaction) => (
                                  <tr
                                    key={transaction.id}
                                    className="bg-white text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                                  >
                                    <td className="whitespace-nowrap px-4 py-3">
                                      {formatDate(transaction.date)}
                                    </td>
                                    <td className="px-4 py-3">
                                      {transaction.description}
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center">
                                        <span
                                          className="mr-2 flex h-6 w-6 items-center justify-center rounded-full"
                                          style={{
                                            backgroundColor:
                                              categoryColors[
                                                transaction.category
                                              ] + "20",
                                            color:
                                              categoryColors[
                                                transaction.category
                                              ],
                                          }}
                                        >
                                          {getCategoryIcon(
                                            transaction.category,
                                          )}
                                        </span>
                                        {transaction.category}
                                      </div>
                                    </td>
                                    <td
                                      className={`whitespace-nowrap px-4 py-3 font-medium ${
                                        transaction.type === "income"
                                          ? "text-green-600 dark:text-green-400"
                                          : "text-red-600 dark:text-red-400"
                                      }`}
                                    >
                                      {transaction.type === "income"
                                        ? "+"
                                        : "-"}
                                      {formatCurrency(transaction.amount)}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-3 text-right">
                                      <button
                                        onClick={() =>
                                          setEditingTransaction(transaction.id)
                                        }
                                        className="mr-2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                      >
                                        <Edit className="h-4 w-4" />
                                      </button>
                                      <button
                                        onClick={() =>
                                          deleteTransaction(transaction.id)
                                        }
                                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Budget & Goals Panel */}
          <div className="col-span-1">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div
                className="flex cursor-pointer items-center justify-between rounded-t-xl border-b border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50"
                onClick={() => togglePanel("budget")}
              >
                <h2 className="font-medium text-gray-800 dark:text-gray-200">
                  Budgets & Goals
                </h2>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform duration-200 dark:text-gray-400 ${
                    expandedPanel === "budget" ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {expandedPanel === "budget" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4">
                      {/* Budget Progress */}
                      <div className="mb-6">
                        <h3 className="mb-3 text-base font-medium text-gray-800 dark:text-gray-200">
                          Monthly Budget
                        </h3>
                        <div className="space-y-4">
                          {budgets.map((budget) => {
                            const percentage = Math.min(
                              Math.round(
                                (budget.spent / budget.allocated) * 100,
                              ),
                              100,
                            );
                            const isOverBudget =
                              budget.spent > budget.allocated;

                            return (
                              <div key={budget.id}>
                                <div className="mb-1 flex items-center justify-between">
                                  <div className="flex items-center">
                                    <span
                                      className="mr-2 flex h-6 w-6 items-center justify-center rounded-full"
                                      style={{
                                        backgroundColor:
                                          categoryColors[budget.category] +
                                          "20",
                                        color: categoryColors[budget.category],
                                      }}
                                    >
                                      {getCategoryIcon(budget.category)}
                                    </span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                      {budget.category}
                                    </span>
                                  </div>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {formatCurrency(budget.spent)} /{" "}
                                    {formatCurrency(budget.allocated)}
                                  </span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                  <div
                                    className={`h-full rounded-full ${
                                      isOverBudget
                                        ? "bg-red-500 dark:bg-red-600"
                                        : percentage > 80
                                          ? "bg-amber-500 dark:bg-amber-600"
                                          : "bg-green-500 dark:bg-green-600"
                                    }`}
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Savings Goals */}
                      <div>
                        <h3 className="mb-3 text-base font-medium text-gray-800 dark:text-gray-200">
                          Savings Goals
                        </h3>
                        <div className="space-y-4">
                          {savingsGoals.map((goal) => {
                            const percentage = Math.round(
                              (goal.currentAmount / goal.targetAmount) * 100,
                            );
                            const IconComponent =
                              goal.icon === "Landmark"
                                ? Landmark
                                : goal.icon === "Plane"
                                  ? Plane
                                  : Briefcase;

                            return (
                              <div
                                key={goal.id}
                                className="rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                              >
                                <div className="mb-2 flex items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                                      <IconComponent className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                        {goal.name}
                                      </h4>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Target: {formatDate(goal.targetDate)}
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    {percentage}%
                                  </span>
                                </div>
                                <div className="mb-1 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                  <div
                                    className="h-full rounded-full bg-indigo-500 dark:bg-indigo-600"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                                  <span>
                                    {formatCurrency(goal.currentAmount)}
                                  </span>
                                  <span>
                                    {formatCurrency(goal.targetAmount)}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 dark:border-gray-700/50">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40">
                <Download className="mr-1.5 h-4 w-4" />
                Export Data
              </button>
              <button className="flex items-center rounded-full bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:hover:bg-indigo-800/40">
                <RefreshCw className="mr-1.5 h-4 w-4" />
                Sync Accounts
              </button>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: Today at 2:30 PM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalFinanceDashboard;
