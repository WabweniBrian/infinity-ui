export type CryptoCurrency = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  change7d: number;
  volume24h: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  allTimeHigh: number;
  allTimeHighDate: string;
  isFavorite: boolean;
  hasAlert: boolean;
  logo?: string;
};

export type PricePoint = {
  timestamp: number;
  price: number;
};

export type TimeFrame = "1h" | "24h" | "7d" | "30d" | "90d" | "1y" | "all";

export type MarketStat = {
  name: string;
  value: number;
  change: number;
};

export const defaultCryptocurrencies: CryptoCurrency[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    price: 42356.78,
    change24h: 2.34,
    change7d: -1.45,
    volume24h: 28765432100,
    marketCap: 824567890000,
    circulatingSupply: 19456789,
    totalSupply: 21000000,
    allTimeHigh: 69000,
    allTimeHighDate: "2021-11-10",
    isFavorite: true,
    hasAlert: true,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    price: 2245.67,
    change24h: 3.21,
    change7d: 5.67,
    volume24h: 15678901234,
    marketCap: 267890123456,
    circulatingSupply: 120345678,
    totalSupply: 0,
    allTimeHigh: 4865,
    allTimeHighDate: "2021-11-16",
    isFavorite: true,
    hasAlert: false,
  },
  {
    id: "binancecoin",
    name: "Binance Coin",
    symbol: "BNB",
    price: 312.45,
    change24h: -0.78,
    change7d: 2.34,
    volume24h: 1234567890,
    marketCap: 48765432100,
    circulatingSupply: 156789012,
    totalSupply: 165432109,
    allTimeHigh: 690.93,
    allTimeHighDate: "2021-05-10",
    isFavorite: false,
    hasAlert: false,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    price: 98.76,
    change24h: 5.67,
    change7d: 12.34,
    volume24h: 3456789012,
    marketCap: 39876543210,
    circulatingSupply: 403456789,
    totalSupply: 508765432,
    allTimeHigh: 259.96,
    allTimeHighDate: "2021-11-06",
    isFavorite: false,
    hasAlert: true,
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA",
    price: 0.45,
    change24h: -1.23,
    change7d: -3.45,
    volume24h: 987654321,
    marketCap: 15678901234,
    circulatingSupply: 34876543210,
    totalSupply: 45000000000,
    allTimeHigh: 3.1,
    allTimeHighDate: "2021-09-02",
    isFavorite: true,
    hasAlert: false,
  },
  {
    id: "ripple",
    name: "XRP",
    symbol: "XRP",
    price: 0.67,
    change24h: 1.45,
    change7d: 4.56,
    volume24h: 2345678901,
    marketCap: 34567890123,
    circulatingSupply: 51234567890,
    totalSupply: 100000000000,
    allTimeHigh: 3.4,
    allTimeHighDate: "2018-01-07",
    isFavorite: false,
    hasAlert: false,
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT",
    price: 7.89,
    change24h: 0.56,
    change7d: -2.34,
    volume24h: 876543210,
    marketCap: 9876543210,
    circulatingSupply: 1234567890,
    totalSupply: 1103303471,
    allTimeHigh: 55.0,
    allTimeHighDate: "2021-11-04",
    isFavorite: false,
    hasAlert: false,
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.089,
    change24h: 1.23,
    change7d: -0.45,
    volume24h: 1234567890,
    marketCap: 12345678901,
    circulatingSupply: 138765432100,
    totalSupply: 0,
    allTimeHigh: 0.73,
    allTimeHighDate: "2021-05-08",
    isFavorite: true,
    hasAlert: true,
  },
];

export const marketStats: MarketStat[] = [
  { name: "Market Cap", value: 1567890123456, change: 2.34 },
  { name: "Volume 24h", value: 78901234567, change: 5.67 },
  { name: "BTC Dominance", value: 52.34, change: -0.45 },
  { name: "ETH Dominance", value: 18.67, change: 0.23 },
];

// Generate sample price history
export const generatePriceHistory = (
  timeframe: TimeFrame,
  basePrice = 42000,
): PricePoint[] => {
  const now = Date.now();
  const points: PricePoint[] = [];

  let duration: number;
  let interval: number;
  let volatility: number;

  switch (timeframe) {
    case "1h":
      duration = 60 * 60 * 1000;
      interval = 60 * 1000;
      volatility = 0.001;
      break;
    case "24h":
      duration = 24 * 60 * 60 * 1000;
      interval = 15 * 60 * 1000;
      volatility = 0.003;
      break;
    case "7d":
      duration = 7 * 24 * 60 * 60 * 1000;
      interval = 60 * 60 * 1000;
      volatility = 0.007;
      break;
    case "30d":
      duration = 30 * 24 * 60 * 60 * 1000;
      interval = 4 * 60 * 60 * 1000;
      volatility = 0.01;
      break;
    case "90d":
      duration = 90 * 24 * 60 * 60 * 1000;
      interval = 12 * 60 * 60 * 1000;
      volatility = 0.02;
      break;
    case "1y":
      duration = 365 * 24 * 60 * 60 * 1000;
      interval = 24 * 60 * 60 * 1000;
      volatility = 0.03;
      break;
    case "all":
      duration = 3 * 365 * 24 * 60 * 60 * 1000;
      interval = 7 * 24 * 60 * 60 * 1000;
      volatility = 0.05;
      break;
  }

  let price = basePrice;
  for (let i = now - duration; i <= now; i += interval) {
    // Random walk with trend
    const change = price * (Math.random() * volatility * 2 - volatility);
    price += change;

    // Ensure price doesn't go negative
    if (price < 0) price = basePrice * 0.1;

    points.push({
      timestamp: i,
      price,
    });
  }

  return points;
};

export const formatCurrency = (value: number, maximumFractionDigits = 2) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(value);
};

export const formatLargeNumber = (value: number) => {
  if (value >= 1000000000000) {
    return `$${(value / 1000000000000).toFixed(2)}T`;
  } else if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(2)}K`;
  }
  return `$${value.toFixed(2)}`;
};

export const formatPercent = (value: number) => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const formatSupply = (value: number) => {
  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(2)}B`;
  } else if (value >= 1000000) {
    return `${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(2)}K`;
  }
  return value.toString();
};

export const getChangeColor = (value: number) => {
  if (value > 0) return "text-green-500";
  if (value < 0) return "text-red-500";
  return "text-gray-500";
};


// Calculate portfolio allocation (sample data)
export const portfolioAllocation = [
  { name: "BTC", value: 45 },
  { name: "ETH", value: 30 },
  { name: "SOL", value: 10 },
  { name: "ADA", value: 8 },
  { name: "DOGE", value: 7 },
];

// Sample portfolio value history
export const portfolioHistory = [
  { date: "2023-01-01", value: 10000 },
  { date: "2023-02-01", value: 12000 },
  { date: "2023-03-01", value: 11500 },
  { date: "2023-04-01", value: 13000 },
  { date: "2023-05-01", value: 14500 },
  { date: "2023-06-01", value: 13800 },
  { date: "2023-07-01", value: 15000 },
  { date: "2023-08-01", value: 16200 },
  { date: "2023-09-01", value: 15800 },
  { date: "2023-10-01", value: 17500 },
  { date: "2023-11-01", value: 19000 },
  { date: "2023-12-01", value: 21000 },
];

// Colors for charts
export const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
];
