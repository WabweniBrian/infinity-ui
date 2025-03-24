"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Shield,
  Settings,
  RefreshCw,
  X,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { accountMetrics, COLORS, positionRisks } from "@/data/risk-management";

const RiskManagementDashboard = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [riskThreshold, setRiskThreshold] = useState(2); // Max risk per trade (%)
  const [dailyRiskThreshold, setDailyRiskThreshold] = useState(5); // Max daily risk (%)
  const [marginCallThreshold, setMarginCallThreshold] = useState(100); // Margin call level (%)

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);

    // Simulate refresh delay
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Calculate total risk
  const calculateTotalRisk = () => {
    return positionRisks.reduce((total, position) => total + position.risk, 0);
  };

  // Calculate total risk percent
  const calculateTotalRiskPercent = () => {
    return positionRisks.reduce(
      (total, position) => total + position.riskPercent,
      0,
    );
  };

  // Calculate total exposure
  const calculateTotalExposure = () => {
    return positionRisks.reduce(
      (total, position) => total + position.size * position.entryPrice,
      0,
    );
  };

  // Calculate total PnL
  const calculateTotalPnL = () => {
    return positionRisks.reduce((total, position) => total + position.pnl, 0);
  };

  // Calculate risk distribution by currency pair
  const calculateRiskDistribution = () => {
    const distribution = {};
    positionRisks.forEach((position) => {
      if (!distribution[position.symbol as keyof typeof distribution]) {
        (distribution as Record<string, number>)[position.symbol] = 0;
      }
      (distribution as Record<string, number>)[position.symbol] +=
        position.riskPercent;
    });

    return distribution;
  };

  // Prepare data for risk distribution pie chart
  const prepareRiskDistributionData = () => {
    const distribution = calculateRiskDistribution();
    return Object.keys(distribution).map((symbol) => ({
      name: symbol,
      value: (distribution as Record<string, number>)[symbol],
      percentage: (
        ((distribution as Record<string, number>)[symbol] /
          calculateTotalRiskPercent()) *
        100
      ).toFixed(1),
    }));
  };
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: accountMetrics.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Format percent
  const formatPercent = (value: number) => {
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  // Get risk level color
  const getRiskLevelColor = (riskPercent: number) => {
    if (riskPercent > riskThreshold * 1.5) return "text-red-400";
    if (riskPercent > riskThreshold) return "text-orange-400";
    if (riskPercent > riskThreshold * 0.5) return "text-yellow-400";
    return "text-green-400";
  };

  // Get margin level color
  const getMarginLevelColor = (marginLevel: number) => {
    if (marginLevel < marginCallThreshold * 1.2) return "text-red-400";
    if (marginLevel < marginCallThreshold * 1.5) return "text-orange-400";
    if (marginLevel < marginCallThreshold * 2) return "text-yellow-400";
    return "text-green-400";
  };

  // Calculate metrics
  const totalRisk = calculateTotalRisk();
  const totalRiskPercent = calculateTotalRiskPercent();
  const totalExposure = calculateTotalExposure();
  const totalPnL = calculateTotalPnL();
  const riskDistribution = calculateRiskDistribution();
  const riskDistributionData = prepareRiskDistributionData();

  // Check if any risk thresholds are exceeded
  const isPerTradeRiskExceeded = positionRisks.some(
    (position) => position.riskPercent > riskThreshold,
  );
  const isDailyRiskExceeded = totalRiskPercent > dailyRiskThreshold;
  const isMarginLevelLow =
    accountMetrics.marginLevel < marginCallThreshold * 1.5;

  // Custom tooltip for pie chart
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any[];
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded border border-slate-700 bg-slate-800/80 p-2 text-sm backdrop-blur-md">
          <p className="font-medium text-white">{payload[0].name}</p>
          <p className="text-slate-300">Risk: {payload[0].value.toFixed(2)}%</p>
          <p className="text-slate-300">
            {payload[0].payload.percentage}% of total risk
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <Shield className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">
            Risk Management Dashboard
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={16} />
          </button>

          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-b border-slate-800">
          <div className="p-4">
            <div className="flex items-start justify-between">
              <h3 className="mb-4 text-lg font-medium text-white">
                Risk Settings
              </h3>
              <button
                className="p-1 text-slate-400 hover:text-white"
                onClick={() => setShowSettings(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {/* Max Risk Per Trade */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Max Risk Per Trade (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0.5"
                    max="10"
                    step="0.5"
                    value={riskThreshold}
                    onChange={(e) =>
                      setRiskThreshold(Number.parseFloat(e.target.value))
                    }
                    className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-700"
                  />
                  <div className="w-16 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-center text-white">
                    {riskThreshold}%
                  </div>
                </div>
              </div>

              {/* Max Daily Risk */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Max Daily Risk (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={dailyRiskThreshold}
                    onChange={(e) =>
                      setDailyRiskThreshold(Number.parseFloat(e.target.value))
                    }
                    className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-700"
                  />
                  <div className="w-16 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-center text-white">
                    {dailyRiskThreshold}%
                  </div>
                </div>
              </div>

              {/* Margin Call Level */}
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Margin Call Alert Level (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="50"
                    max="200"
                    step="10"
                    value={marginCallThreshold}
                    onChange={(e) =>
                      setMarginCallThreshold(Number.parseFloat(e.target.value))
                    }
                    className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-700"
                  />
                  <div className="w-16 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-center text-white">
                    {marginCallThreshold}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts */}
      {(isPerTradeRiskExceeded || isDailyRiskExceeded || isMarginLevelLow) && (
        <div className="border-b border-slate-800">
          <div className="p-4">
            <div className="space-y-2">
              {isPerTradeRiskExceeded && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-900/20 p-3">
                  <AlertTriangle className="text-red-400" size={18} />
                  <span className="text-red-300">
                    One or more positions exceed the maximum risk per trade (
                    {riskThreshold}%)
                  </span>
                </div>
              )}

              {isDailyRiskExceeded && (
                <div className="flex items-center gap-2 rounded-lg border border-orange-500/30 bg-orange-900/20 p-3">
                  <AlertTriangle className="text-orange-400" size={18} />
                  <span className="text-orange-300">
                    Total risk exposure ({totalRiskPercent.toFixed(2)}%) exceeds
                    daily risk threshold ({dailyRiskThreshold}%)
                  </span>
                </div>
              )}

              {isMarginLevelLow && (
                <div className="flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-900/20 p-3">
                  <AlertTriangle className="text-yellow-400" size={18} />
                  <span className="text-yellow-300">
                    Margin level ({accountMetrics.marginLevel.toFixed(2)}%) is
                    approaching margin call threshold ({marginCallThreshold}%)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Account Metrics */}
      <div className="border-b border-slate-800 p-4">
        <h3 className="mb-4 text-lg font-medium text-white">Account Metrics</h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-slate-800/50 p-3">
            <div className="mb-1 text-xs text-slate-400">Balance</div>
            <div className="text-xl font-bold text-white">
              {formatCurrency(accountMetrics.balance)}
            </div>
            <div className="mt-1 text-xs text-slate-400">Available</div>
          </div>

          <div className="rounded-xl bg-slate-800/50 p-3">
            <div className="mb-1 text-xs text-slate-400">Equity</div>
            <div
              className={`text-xl font-bold ${accountMetrics.equity >= accountMetrics.balance ? "text-green-400" : "text-red-400"}`}
            >
              {formatCurrency(accountMetrics.equity)}
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {formatPercent(
                (accountMetrics.equity / accountMetrics.balance - 1) * 100,
              )}{" "}
              from balance
            </div>
          </div>

          <div className="rounded-xl bg-slate-800/50 p-3">
            <div className="mb-1 text-xs text-slate-400">Margin</div>
            <div className="text-xl font-bold text-white">
              {formatCurrency(accountMetrics.margin)}
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {((accountMetrics.margin / accountMetrics.balance) * 100).toFixed(
                2,
              )}
              % of balance
            </div>
          </div>

          <div className="rounded-xl bg-slate-800/50 p-3">
            <div className="mb-1 text-xs text-slate-400">Margin Level</div>
            <div
              className={`text-xl font-bold ${getMarginLevelColor(accountMetrics.marginLevel)}`}
            >
              {accountMetrics.marginLevel.toFixed(2)}%
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Leverage: {accountMetrics.leverage}x
            </div>
          </div>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="border-b border-slate-800 p-4">
        <h3 className="mb-4 text-lg font-medium text-white">Risk Overview</h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Risk Metrics */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-800/50 p-3">
                <div className="mb-1 text-xs text-slate-400">Total Risk</div>
                <div
                  className={`text-xl font-bold ${getRiskLevelColor(totalRiskPercent)}`}
                >
                  {formatCurrency(totalRisk)}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {totalRiskPercent.toFixed(2)}% of balance
                </div>
              </div>

              <div className="rounded-xl bg-slate-800/50 p-3">
                <div className="mb-1 text-xs text-slate-400">
                  Total Exposure
                </div>
                <div className="text-xl font-bold text-white">
                  {formatCurrency(totalExposure)}
                </div>
                <div className="mt-1 text-xs text-slate-400">
                  {((totalExposure / accountMetrics.balance) * 100).toFixed(2)}%
                  of balance
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-slate-800/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-sm font-medium text-white">
                  Risk Allocation
                </div>
                <div className="text-xs text-slate-400">% of Total Risk</div>
              </div>

              {Object.entries(riskDistribution).map(([symbol, riskPercent]) => (
                <div key={symbol} className="mb-2 last:mb-0">
                  <div className="mb-1 flex items-center justify-between">
                    <div className="text-sm text-slate-300">{symbol}</div>
                    <div className="text-xs font-medium text-white">
                      {(
                        ((riskPercent as number) / totalRiskPercent) *
                        100
                      ).toFixed(1)}
                      %
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className="h-full bg-blue-500"
                      style={{
                        width: `${((riskPercent as number) / totalRiskPercent) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Distribution Chart - Using Recharts */}
          <div className="flex items-center justify-center rounded-xl bg-slate-800/50 p-3">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  formatter={(value) => (
                    <span className="text-sm text-slate-300">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Position Risk Table */}
      <div className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">
            Position Risk Analysis
          </h3>
          <div className="text-sm text-slate-400">
            {positionRisks.length} active position
            {positionRisks.length !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-2 text-left text-sm font-medium text-slate-400">
                  Symbol
                </th>
                <th className="p-2 text-left text-sm font-medium text-slate-400">
                  Direction
                </th>
                <th className="p-2 text-right text-sm font-medium text-slate-400">
                  Size
                </th>
                <th className="p-2 text-right text-sm font-medium text-slate-400">
                  P&L
                </th>
                <th className="p-2 text-right text-sm font-medium text-slate-400">
                  Risk
                </th>
                <th className="p-2 text-right text-sm font-medium text-slate-400">
                  R:R
                </th>
              </tr>
            </thead>
            <tbody>
              {positionRisks.map((position) => (
                <tr
                  key={`${position.symbol}-${position.direction}-${position.entryPrice}`}
                  className="border-b border-slate-800/50 hover:bg-slate-800/30"
                >
                  <td className="p-2">
                    <div className="font-medium text-white">
                      {position.symbol}
                    </div>
                  </td>

                  <td className="p-2">
                    <div
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                        position.direction === "long"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {position.direction === "long" ? (
                        <ArrowUpRight size={12} className="mr-1" />
                      ) : (
                        <ArrowDownRight size={12} className="mr-1" />
                      )}
                      <span>
                        {position.direction === "long" ? "Long" : "Short"}
                      </span>
                    </div>
                  </td>

                  <td className="p-2 text-right">
                    <div className="text-white">{position.size.toFixed(2)}</div>
                    <div className="text-xs text-slate-400">
                      {formatCurrency(position.size * position.entryPrice)}
                    </div>
                  </td>

                  <td className="p-2 text-right">
                    <div
                      className={`font-medium ${position.pnl >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {formatCurrency(position.pnl)}
                    </div>
                    <div
                      className={`text-xs ${position.pnl >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {formatPercent(position.pnlPercent)}
                    </div>
                  </td>

                  <td className="p-2 text-right">
                    <div
                      className={`font-medium ${getRiskLevelColor(position.riskPercent)}`}
                    >
                      {formatCurrency(position.risk)}
                    </div>
                    <div
                      className={`text-xs ${getRiskLevelColor(position.riskPercent)}`}
                    >
                      {position.riskPercent.toFixed(2)}%
                    </div>
                  </td>

                  <td className="p-2 text-right">
                    {position.riskRewardRatio ? (
                      <div className="text-white">
                        1:{position.riskRewardRatio.toFixed(1)}
                      </div>
                    ) : (
                      <div className="text-slate-400">-</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiskManagementDashboard;
