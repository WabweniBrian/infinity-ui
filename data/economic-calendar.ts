export type ImpactLevel = "low" | "medium" | "high";

export interface EconomicEvent {
  id: string;
  title: string;
  country: string;
  countryCode: string;
  date: Date;
  impact: ImpactLevel;
  previous?: string;
  forecast?: string;
  actual?: string;
  unit?: string;
  currency?: string;
  isReleased: boolean;
  description?: string;
  hasAlert?: boolean;
}

export const events = [
  {
    id: "1",
    title: "Non-Farm Payrolls",
    country: "United States",
    countryCode: "US",
    date: new Date(new Date().setHours(8, 30, 0, 0)),
    impact: "high" as const,
    previous: "175K",
    forecast: "180K",
    actual: "190K",
    isReleased: true,
    description:
      "Change in the number of employed people during the previous month, excluding the farming industry.",
    hasAlert: true,
  },
  {
    id: "2",
    title: "Interest Rate Decision",
    country: "European Union",
    countryCode: "EU",
    date: new Date(new Date().setHours(7, 45, 0, 0)),
    impact: "high" as const,
    previous: "4.50%",
    forecast: "4.50%",
    actual: "4.50%",
    isReleased: true,
    description:
      "ECB interest rate decision and statement regarding monetary policy.",
    hasAlert: false,
  },
  {
    id: "3",
    title: "CPI m/m",
    country: "United Kingdom",
    countryCode: "GB",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    impact: "medium" as const,
    previous: "0.3%",
    forecast: "0.2%",
    isReleased: false,
    description:
      "Change in the price of goods and services purchased by consumers.",
    hasAlert: true,
  },
  {
    id: "4",
    title: "GDP q/q",
    country: "Japan",
    countryCode: "JP",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    impact: "high" as const,
    previous: "0.4%",
    forecast: "0.3%",
    isReleased: false,
    description:
      "Change in the inflation-adjusted value of all goods and services produced by the economy.",
    hasAlert: false,
  },
  {
    id: "5",
    title: "Retail Sales m/m",
    country: "Australia",
    countryCode: "AU",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    impact: "medium" as const,
    previous: "0.2%",
    forecast: "0.3%",
    isReleased: false,
    description: "Change in the total value of sales at the retail level.",
    hasAlert: false,
  },
  {
    id: "6",
    title: "Unemployment Rate",
    country: "Canada",
    countryCode: "CA",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    impact: "medium" as const,
    previous: "5.7%",
    forecast: "5.8%",
    isReleased: false,
    description:
      "Percentage of the total workforce that is unemployed and actively seeking employment.",
    hasAlert: false,
  },
  {
    id: "7",
    title: "Trade Balance",
    country: "New Zealand",
    countryCode: "NZ",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
    impact: "low" as const,
    previous: "-0.8B",
    forecast: "-0.7B",
    isReleased: false,
    description:
      "Difference in value between imported and exported goods and services.",
    hasAlert: false,
  },
  {
    id: "8",
    title: "Manufacturing PMI",
    country: "China",
    countryCode: "CN",
    date: new Date(new Date().setDate(new Date().getDate() + 4)),
    impact: "medium" as const,
    previous: "50.2",
    forecast: "50.5",
    isReleased: false,
    description:
      "Level of a diffusion index based on surveyed purchasing managers in the manufacturing industry.",
    hasAlert: false,
  },
];
