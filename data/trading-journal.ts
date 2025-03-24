export type TradeDirection = "long" | "short";
export type TradeStatus = "open" | "closed" | "cancelled";
export type TradeResult = "win" | "loss" | "breakeven";

export interface TradeEntry {
  id: string;
  symbol: string;
  direction: TradeDirection;
  entryPrice: number;
  exitPrice?: number;
  stopLoss: number;
  takeProfit: number;
  size: number;
  entryDate: Date;
  exitDate?: Date;
  status: TradeStatus;
  result?: TradeResult;
  pnl?: number;
  pnlPercent?: number;
  notes?: string;
  tags?: string[];
  screenshots?: string[];
}

export const trades: TradeEntry[] = [
  {
    id: "trade-001",
    symbol: "AAPL",
    direction: "long",
    entryPrice: 182.45,
    exitPrice: 191.2,
    stopLoss: 178.3,
    takeProfit: 195.0,
    size: 100,
    entryDate: new Date("2025-03-10T09:30:00"),
    exitDate: new Date("2025-03-12T14:15:00"),
    status: "closed",
    result: "win",
    pnl: 875.0,
    pnlPercent: 4.79,
    notes: "Entered on support bounce with increasing volume",
    tags: ["swing trade", "tech", "support"],
    screenshots: [
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    ],
  },
  {
    id: "trade-002",
    symbol: "TSLA",
    direction: "short",
    entryPrice: 210.75,
    exitPrice: 195.3,
    stopLoss: 218.0,
    takeProfit: 190.0,
    size: 50,
    entryDate: new Date("2025-03-08T10:15:00"),
    exitDate: new Date("2025-03-11T11:45:00"),
    status: "closed",
    result: "win",
    pnl: 772.5,
    pnlPercent: 7.33,
    notes: "Short at resistance with bearish divergence",
    tags: ["day trade", "tech", "resistance", "divergence"],
  },
  {
    id: "trade-003",
    symbol: "AMZN",
    direction: "long",
    entryPrice: 175.25,
    stopLoss: 170.5,
    takeProfit: 185.0,
    size: 75,
    entryDate: new Date("2025-03-12T13:20:00"),
    status: "open",
    tags: ["swing trade", "tech", "breakout"],
  },
  {
    id: "trade-004",
    symbol: "NVDA",
    direction: "long",
    entryPrice: 875.3,
    exitPrice: 862.15,
    stopLoss: 860.0,
    takeProfit: 900.0,
    size: 20,
    entryDate: new Date("2025-03-09T09:45:00"),
    exitDate: new Date("2025-03-09T15:30:00"),
    status: "closed",
    result: "loss",
    pnl: -263.0,
    pnlPercent: -1.5,
    notes: "Stopped out on market-wide tech selloff",
    tags: ["day trade", "tech", "momentum"],
  },
  {
    id: "trade-005",
    symbol: "SPY",
    direction: "short",
    entryPrice: 510.25,
    stopLoss: 515.0,
    takeProfit: 500.0,
    size: 100,
    entryDate: new Date("2025-03-13T10:00:00"),
    status: "open",
    notes: "Short at double top pattern",
    tags: ["swing trade", "index", "pattern", "double top"],
  },
  {
    id: "trade-006",
    symbol: "META",
    direction: "long",
    entryPrice: 472.8,
    exitPrice: 472.65,
    stopLoss: 465.0,
    takeProfit: 485.0,
    size: 30,
    entryDate: new Date("2025-03-07T11:20:00"),
    exitDate: new Date("2025-03-10T09:45:00"),
    status: "closed",
    result: "breakeven",
    pnl: -4.5,
    pnlPercent: -0.03,
    notes: "Exited at breakeven due to choppy market conditions",
    tags: ["swing trade", "tech", "breakout", "sideways"],
  },
  {
    id: "trade-007",
    symbol: "JPM",
    direction: "long",
    entryPrice: 192.45,
    stopLoss: 187.5,
    takeProfit: 205.0,
    size: 50,
    entryDate: new Date("2025-03-12T09:35:00"),
    status: "cancelled",
    notes: "Cancelled due to sudden change in sector sentiment",
    tags: ["financials", "gap up"],
  },
];
