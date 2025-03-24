export type OptionContract = {
  strike: number;
  callSymbol: string;
  putSymbol: string;
  call: {
    bid: number;
    ask: number;
    last: number;
    change: number;
    changePercent: number;
    volume: number;
    openInterest: number;
    impliedVolatility: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    inTheMoney: boolean;
  };
  put: {
    bid: number;
    ask: number;
    last: number;
    change: number;
    changePercent: number;
    volume: number;
    openInterest: number;
    impliedVolatility: number;
    delta: number;
    gamma: number;
    theta: number;
    vega: number;
    inTheMoney: boolean;
  };
};

export type ExpirationDate = {
  date: string;
  label: string;
  daysToExpiration: number;
};

export type OptionsChainViewerProps = {
  symbol?: string;
  stockPrice?: number;
  expirationDates?: ExpirationDate[];
  optionsChain?: OptionContract[];
  onRefresh?: () => void;
  onExpirationChange?: (date: string) => void;
  onSymbolChange?: (symbol: string) => void;
};

// Sample data
export const expirationDates: ExpirationDate[] = [
  { date: "2023-12-15", label: "Dec 15, 2023", daysToExpiration: 5 },
  { date: "2023-12-22", label: "Dec 22, 2023", daysToExpiration: 12 },
  { date: "2023-12-29", label: "Dec 29, 2023", daysToExpiration: 19 },
  { date: "2024-01-19", label: "Jan 19, 2024", daysToExpiration: 40 },
  { date: "2024-02-16", label: "Feb 16, 2024", daysToExpiration: 68 },
  { date: "2024-03-15", label: "Mar 15, 2024", daysToExpiration: 96 },
  { date: "2024-06-21", label: "Jun 21, 2024", daysToExpiration: 194 },
  { date: "2024-09-20", label: "Sep 20, 2024", daysToExpiration: 285 },
  { date: "2025-01-17", label: "Jan 17, 2025", daysToExpiration: 404 },
];

// Generate sample options chain
export const generateOptionsChain = (stockPrice: number): OptionContract[] => {
  const strikes = [];
  const baseStrike = Math.round(stockPrice / 5) * 5;

  for (let i = -10; i <= 10; i++) {
    strikes.push(baseStrike + i * 5);
  }

  return strikes.map((strike) => {
    const callInTheMoney = strike < stockPrice;
    const putInTheMoney = strike > stockPrice;

    // Calculate option prices based on distance from strike
    const strikeDiff = Math.abs(stockPrice - strike);
    const callPrice = callInTheMoney
      ? Math.max(0.05, stockPrice - strike + Math.random() * 2).toFixed(2)
      : Math.max(0.05, Math.random() * 3 * Math.exp(-strikeDiff / 20)).toFixed(
          2,
        );
    const putPrice = putInTheMoney
      ? Math.max(0.05, strike - stockPrice + Math.random() * 2).toFixed(2)
      : Math.max(0.05, Math.random() * 3 * Math.exp(-strikeDiff / 20)).toFixed(
          2,
        );

    return {
      strike,
      callSymbol: `${strike}C`,
      putSymbol: `${strike}P`,
      call: {
        bid: Number.parseFloat(
          (Number.parseFloat(callPrice) - 0.05).toFixed(2),
        ),
        ask: Number.parseFloat(
          (Number.parseFloat(callPrice) + 0.05).toFixed(2),
        ),
        last: Number.parseFloat(callPrice),
        change: Number.parseFloat((Math.random() * 2 - 1).toFixed(2)),
        changePercent: Number.parseFloat((Math.random() * 10 - 5).toFixed(2)),
        volume: Math.floor(Math.random() * 1000),
        openInterest: Math.floor(Math.random() * 5000),
        impliedVolatility: Number.parseFloat(
          (0.2 + Math.random() * 0.6).toFixed(2),
        ),
        delta: callInTheMoney
          ? Number.parseFloat((0.5 + Math.random() * 0.5).toFixed(2))
          : Number.parseFloat((Math.random() * 0.5).toFixed(2)),
        gamma: Number.parseFloat((Math.random() * 0.05).toFixed(3)),
        theta: Number.parseFloat((-Math.random() * 0.2).toFixed(3)),
        vega: Number.parseFloat((Math.random() * 0.2).toFixed(3)),
        inTheMoney: callInTheMoney,
      },
      put: {
        bid: Number.parseFloat((Number.parseFloat(putPrice) - 0.05).toFixed(2)),
        ask: Number.parseFloat((Number.parseFloat(putPrice) + 0.05).toFixed(2)),
        last: Number.parseFloat(putPrice),
        change: Number.parseFloat((Math.random() * 2 - 1).toFixed(2)),
        changePercent: Number.parseFloat((Math.random() * 10 - 5).toFixed(2)),
        volume: Math.floor(Math.random() * 1000),
        openInterest: Math.floor(Math.random() * 5000),
        impliedVolatility: Number.parseFloat(
          (0.2 + Math.random() * 0.6).toFixed(2),
        ),
        delta: putInTheMoney
          ? Number.parseFloat((-0.5 - Math.random() * 0.5).toFixed(2))
          : Number.parseFloat((-Math.random() * 0.5).toFixed(2)),
        gamma: Number.parseFloat((Math.random() * 0.05).toFixed(3)),
        theta: Number.parseFloat((-Math.random() * 0.2).toFixed(3)),
        vega: Number.parseFloat((Math.random() * 0.2).toFixed(3)),
        inTheMoney: putInTheMoney,
      },
    };
  });
};

// Helper functions
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercent = (value: number) => {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

export const formatNumber = (value: number, decimals = 2) => {
  return value.toFixed(decimals);
};

export const formatLargeNumber = (value: number) => {
  if (value >= 1000000) {
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
