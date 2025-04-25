"use client";

import NFTPriceHistoryChart from "./nft-price-history-chart";

interface PriceDataPoint {
  date: Date;
  price: number;
  volume?: number;
  event?: "sale" | "offer" | "listing" | "mint";
}

const priceHistoryData: PriceDataPoint[] = [
  { date: new Date("2023-01-01"), price: 1.2 },
  { date: new Date("2023-01-15"), price: 1.5, event: "sale" },
  { date: new Date("2023-02-01"), price: 1.3 },
  { date: new Date("2023-02-15"), price: 1.8, event: "sale" },
  { date: new Date("2023-03-01"), price: 1.7 },
  { date: new Date("2023-03-15"), price: 2.0, event: "sale" },
  { date: new Date("2023-04-01"), price: 2.2 },
  { date: new Date("2023-04-15"), price: 2.5, event: "sale" },
  { date: new Date("2023-05-01"), price: 2.3 },
  { date: new Date("2023-05-15"), price: 2.7, event: "sale" },
  { date: new Date("2023-06-01"), price: 2.9 },
  { date: new Date("2023-06-15"), price: 3.2, event: "sale" },
];

const floorPriceHistoryData = [
  { date: new Date("2023-01-01"), price: 0.8 },
  { date: new Date("2023-01-15"), price: 0.9 },
  { date: new Date("2023-02-01"), price: 1.0 },
  { date: new Date("2023-02-15"), price: 1.1 },
  { date: new Date("2023-03-01"), price: 1.2 },
  { date: new Date("2023-03-15"), price: 1.3 },
  { date: new Date("2023-04-01"), price: 1.4 },
  { date: new Date("2023-04-15"), price: 1.5 },
  { date: new Date("2023-05-01"), price: 1.6 },
  { date: new Date("2023-05-15"), price: 1.7 },
  { date: new Date("2023-06-01"), price: 1.8 },
  { date: new Date("2023-06-15"), price: 1.9 },
];

const PriceHistoryChart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="mx-auto max-w-5xl px-4 py-12">
        <div>
          <h2 className="mb-6 text-2xl font-bold">Price History Chart</h2>
          <NFTPriceHistoryChart
            nftName="Cosmic Voyager #042"
            collectionName="Cosmic Series"
            currentPrice={3.2}
            currency="ETH"
            priceHistory={priceHistoryData}
            floorPriceHistory={floorPriceHistoryData}
            highestSale={3.2}
            lowestSale={1.2}
            averagePrice={2.1}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceHistoryChart;
