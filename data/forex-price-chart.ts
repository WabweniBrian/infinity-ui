export interface PriceCandle {
  timestamp: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TechnicalIndicator {
  id: string;
  name: string;
  color: string;
  values: { timestamp: Date; value: number }[];
  visible: boolean;
}

export const generateCandleData = (
  count: number,
  startPrice: number,
  volatility: number,
) => {
  const data = [];
  let currentPrice = startPrice;
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - (count - i) * 3600000); // Hourly candles

    // Generate random price movements
    const change = (Math.random() - 0.5) * volatility;
    const open = currentPrice;
    const close = open + change;
    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
    const low = Math.min(open, close) - Math.random() * volatility * 0.5;

    data.push({
      timestamp,
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });

    currentPrice = close;
  }

  return data;
};

// Sample data for technical indicators
export const generateIndicatorData = (
  candleData: any[],
  period: number,
  offset = 0,
) => {
  const values = [];

  // Simple moving average calculation
  for (let i = 0; i < candleData.length; i++) {
    if (i < period - 1) {
      values.push({ timestamp: candleData[i].timestamp, value: 0 });
      continue;
    }

    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += candleData[i - j].close;
    }

    values.push({
      timestamp: candleData[i].timestamp,
      value: sum / period + offset,
    });
  }

  return values;
};

export const candleData = generateCandleData(100, 1.085, 0.001);

export const indicators = [
  {
    id: "ma20",
    name: "MA (20)",
    color: "#3b82f6",
    values: generateIndicatorData(candleData, 20),
    visible: true,
  },
  {
    id: "ma50",
    name: "MA (50)",
    color: "#8b5cf6",
    values: generateIndicatorData(candleData, 50),
    visible: true,
  },
  {
    id: "ma100",
    name: "MA (100)",
    color: "#ef4444",
    values: generateIndicatorData(candleData, 100),
    visible: false,
  },
];
