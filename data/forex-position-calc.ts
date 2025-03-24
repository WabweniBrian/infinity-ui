export interface CurrencyPair {
  symbol: string;
  baseCurrency: string;
  quoteCurrency: string;
  price: number;
  pipDecimal: number;
}

export const currencyPairs: CurrencyPair[] = [
  {
    symbol: "EUR/USD",
    baseCurrency: "EUR",
    quoteCurrency: "USD",
    price: 1.0876,
    pipDecimal: 4,
  },
  {
    symbol: "GBP/USD",
    baseCurrency: "GBP",
    quoteCurrency: "USD",
    price: 1.2654,
    pipDecimal: 4,
  },
  {
    symbol: "USD/JPY",
    baseCurrency: "USD",
    quoteCurrency: "JPY",
    price: 149.67,
    pipDecimal: 2,
  },
  {
    symbol: "USD/CHF",
    baseCurrency: "USD",
    quoteCurrency: "CHF",
    price: 0.8976,
    pipDecimal: 4,
  },
  {
    symbol: "AUD/USD",
    baseCurrency: "AUD",
    quoteCurrency: "USD",
    price: 0.6543,
    pipDecimal: 4,
  },
  {
    symbol: "NZD/USD",
    baseCurrency: "NZD",
    quoteCurrency: "USD",
    price: 0.6123,
    pipDecimal: 4,
  },
  {
    symbol: "USD/CAD",
    baseCurrency: "USD",
    quoteCurrency: "CAD",
    price: 1.3654,
    pipDecimal: 4,
  },
  {
    symbol: "EUR/GBP",
    baseCurrency: "EUR",
    quoteCurrency: "GBP",
    price: 0.8576,
    pipDecimal: 4,
  },
  {
    symbol: "EUR/JPY",
    baseCurrency: "EUR",
    quoteCurrency: "JPY",
    price: 162.76,
    pipDecimal: 2,
  },
  {
    symbol: "GBP/JPY",
    baseCurrency: "GBP",
    quoteCurrency: "JPY",
    price: 189.43,
    pipDecimal: 2,
  },
];
