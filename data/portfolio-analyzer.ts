export type Asset = {
  id: string;
  name: string;
  ticker: string;
  type: "stock" | "etf" | "crypto" | "forex" | "bond" | "commodity";
  value: number;
  costBasis: number;
  quantity: number;
  currency: string;
  allocation: number;
  performance: {
    day: number;
    week: number;
    month: number;
    year: number;
    total: number;
  };
  risk: "low" | "medium" | "high";
  dividendYield?: number;
  sector?: string;
  country?: string;
};

type HistoricalData = {
  date: string;
  value: number;
  change: number;
};

export const assets: Asset[] = [
  {
    id: "1",
    name: "Apple Inc.",
    ticker: "AAPL",
    type: "stock",
    value: 15420.5,
    costBasis: 12500.0,
    quantity: 85,
    currency: "USD",
    allocation: 15.42,
    performance: {
      day: 0.75,
      week: 2.3,
      month: 5.8,
      year: 23.4,
      total: 23.36,
    },
    risk: "medium",
    dividendYield: 0.5,
    sector: "Technology",
    country: "US",
  },
  {
    id: "2",
    name: "Microsoft Corporation",
    ticker: "MSFT",
    type: "stock",
    value: 18750.25,
    costBasis: 14200.0,
    quantity: 50,
    currency: "USD",
    allocation: 18.75,
    performance: {
      day: -0.3,
      week: 1.5,
      month: 4.2,
      year: 32.0,
      total: 32.04,
    },
    risk: "medium",
    dividendYield: 0.8,
    sector: "Technology",
    country: "US",
  },
  {
    id: "3",
    name: "S&P 500 ETF",
    ticker: "SPY",
    type: "etf",
    value: 25000.0,
    costBasis: 22000.0,
    quantity: 60,
    currency: "USD",
    allocation: 25.0,
    performance: {
      day: 0.2,
      week: 1.1,
      month: 2.5,
      year: 13.6,
      total: 13.64,
    },
    risk: "medium",
    dividendYield: 1.5,
    sector: "Diversified",
    country: "US",
  },
  {
    id: "4",
    name: "Bitcoin",
    ticker: "BTC",
    type: "crypto",
    value: 12500.75,
    costBasis: 8000.0,
    quantity: 0.25,
    currency: "USD",
    allocation: 12.5,
    performance: {
      day: 2.5,
      week: -3.2,
      month: 15.6,
      year: 56.3,
      total: 56.26,
    },
    risk: "high",
    sector: "Cryptocurrency",
    country: "Global",
  },
  {
    id: "5",
    name: "EUR/USD",
    ticker: "EUR/USD",
    type: "forex",
    value: 5000.0,
    costBasis: 4800.0,
    quantity: 50000,
    currency: "USD",
    allocation: 5.0,
    performance: {
      day: 0.1,
      week: 0.5,
      month: 1.2,
      year: 4.2,
      total: 4.17,
    },
    risk: "medium",
    country: "Europe/US",
  },
  {
    id: "6",
    name: "US Treasury Bond",
    ticker: "GOVT",
    type: "bond",
    value: 8000.0,
    costBasis: 7900.0,
    quantity: 80,
    currency: "USD",
    allocation: 8.0,
    performance: {
      day: -0.1,
      week: 0.2,
      month: 0.5,
      year: 1.3,
      total: 1.27,
    },
    risk: "low",
    dividendYield: 2.3,
    sector: "Government",
    country: "US",
  },
  {
    id: "7",
    name: "Gold",
    ticker: "GLD",
    type: "commodity",
    value: 7500.0,
    costBasis: 6800.0,
    quantity: 40,
    currency: "USD",
    allocation: 7.5,
    performance: {
      day: 0.5,
      week: 1.8,
      month: 3.2,
      year: 10.3,
      total: 10.29,
    },
    risk: "medium",
    sector: "Precious Metals",
    country: "Global",
  },
  {
    id: "8",
    name: "Emerging Markets ETF",
    ticker: "EEM",
    type: "etf",
    value: 7830.0,
    costBasis: 8500.0,
    quantity: 150,
    currency: "USD",
    allocation: 7.83,
    performance: {
      day: 1.2,
      week: -0.8,
      month: -2.5,
      year: -7.9,
      total: -7.88,
    },
    risk: "high",
    dividendYield: 2.1,
    sector: "Diversified",
    country: "Emerging Markets",
  },
];

export const historicalData: HistoricalData[] = [
  { date: "2023-01-01", value: 85000, change: 0 },
  { date: "2023-02-01", value: 87500, change: 2.94 },
  { date: "2023-03-01", value: 86200, change: -1.49 },
  { date: "2023-04-01", value: 88700, change: 2.9 },
  { date: "2023-05-01", value: 90500, change: 2.03 },
  { date: "2023-06-01", value: 92300, change: 1.99 },
  { date: "2023-07-01", value: 94800, change: 2.71 },
  { date: "2023-08-01", value: 93200, change: -1.69 },
  { date: "2023-09-01", value: 95600, change: 2.58 },
  { date: "2023-10-01", value: 97300, change: 1.78 },
  { date: "2023-11-01", value: 99100, change: 1.85 },
  { date: "2023-12-01", value: 100001.5, change: 0.91 },
];

// Helper functions
export const formatCurrency = (value: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercent = (value: number) => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const getPerformanceColor = (value: number) => {
  if (value > 0) return "text-green-500";
  if (value < 0) return "text-red-500";
  return "text-gray-500";
};

export const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
  "#FFC658",
  "#8DD1E1",
];
