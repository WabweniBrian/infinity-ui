export interface AccountMetrics {
  balance: number;
  equity: number;
  margin: number;
  freeMargin: number;
  marginLevel: number;
  leverage: number;
  currency: string;
}

export interface PositionRisk {
  symbol: string;
  direction: "long" | "short";
  size: number;
  entryPrice: number;
  currentPrice: number;
  stopLoss: number | null;
  takeProfit: number | null;
  pnl: number;
  pnlPercent: number;
  risk: number;
  riskPercent: number;
  reward?: number;
  rewardPercent?: number;
  riskRewardRatio?: number;
}

export const accountMetrics = {
  balance: 10000,
  equity: 10245,
  margin: 1200,
  freeMargin: 9045,
  marginLevel: 853.75,
  leverage: 30,
  currency: "USD",
};

export const positionRisks = [
  {
    symbol: "EUR/USD",
    direction: "long" as const,
    size: 0.5,
    entryPrice: 1.0876,
    currentPrice: 1.089,
    stopLoss: 1.084,
    takeProfit: 1.095,
    pnl: 70,
    pnlPercent: 0.28,
    risk: 180,
    riskPercent: 1.8,
    reward: 300,
    rewardPercent: 3.0,
    riskRewardRatio: 1.67,
  },
  {
    symbol: "USD/JPY",
    direction: "long" as const,
    size: 0.2,
    entryPrice: 149.67,
    currentPrice: 149.85,
    stopLoss: 149.2,
    takeProfit: 150.5,
    pnl: 36,
    pnlPercent: 0.12,
    risk: 94,
    riskPercent: 0.94,
    reward: 166,
    rewardPercent: 1.66,
    riskRewardRatio: 1.77,
  },
  {
    symbol: "AUD/USD",
    direction: "long" as const,
    size: 0.3,
    entryPrice: 0.6543,
    currentPrice: 0.6538,
    stopLoss: 0.652,
    takeProfit: 0.658,
    pnl: -15,
    pnlPercent: -0.05,
    risk: 69,
    riskPercent: 0.69,
    reward: 111,
    rewardPercent: 1.11,
    riskRewardRatio: 1.61,
  },
];

export const COLORS = [
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];
