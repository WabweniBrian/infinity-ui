"use server";

import { prisma } from "@/lib/prisma";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";
import type { PaymentStatus } from "@prisma/client";

export type OrderStatData = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: "shopping-cart" | "dollar-sign" | "trending-up" | "clock";
  color: string;
};

// Helper function to calculate percentage change
function calculateChange(current: number, previous: number): string {
  if (previous === 0) return "N/A"; // Avoid division by zero
  const change = ((current - previous) / previous) * 100;
  return `${change.toFixed(1)}%`;
}

// Helper to format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export async function getOrderStats(): Promise<OrderStatData[]> {
  try {
    const now = new Date();
    const lastMonth = subMonths(now, 1);

    const lastStart = startOfMonth(lastMonth);
    const lastEnd = endOfMonth(lastMonth);

    const [
      totalOrders,
      totalOrdersLastMonth,
      revenueResult,
      revenueLastMonthResult,
      successfulOrders,
      successfulOrdersLastMonth,
      pendingOrders,
      pendingOrdersLastMonth,
    ] = await Promise.all([
      prisma.purchase.count(),
      prisma.purchase.count({
        where: { date: { gte: lastStart, lte: lastEnd } },
      }),
      prisma.purchase.aggregate({
        _sum: { amount: true },
        where: { status: "SUCCESS" as PaymentStatus },
      }),
      prisma.purchase.aggregate({
        _sum: { amount: true },
        where: {
          status: "SUCCESS" as PaymentStatus,
          date: { gte: lastStart, lte: lastEnd },
        },
      }),
      prisma.purchase.count({
        where: { status: "SUCCESS" as PaymentStatus },
      }),
      prisma.purchase.count({
        where: {
          status: "SUCCESS" as PaymentStatus,
          date: { gte: lastStart, lte: lastEnd },
        },
      }),
      prisma.purchase.count({
        where: { status: "PENDING" as PaymentStatus },
      }),
      prisma.purchase.count({
        where: {
          status: "PENDING" as PaymentStatus,
          date: { gte: lastStart, lte: lastEnd },
        },
      }),
    ]);

    const totalRevenue = revenueResult._sum.amount || 0;
    const totalRevenueLastMonth = revenueLastMonthResult._sum.amount || 0;

    const averageOrderValue =
      successfulOrders > 0 ? totalRevenue / successfulOrders : 0;
    const averageOrderValueLastMonth =
      successfulOrdersLastMonth > 0
        ? totalRevenueLastMonth / successfulOrdersLastMonth
        : 0;

    return [
      {
        title: "Total Orders",
        value: totalOrders.toString(),
        change: calculateChange(totalOrders, totalOrdersLastMonth),
        trend: totalOrders >= totalOrdersLastMonth ? "up" : "down",
        icon: "shopping-cart",
        color: "bg-brand",
      },
      {
        title: "Total Revenue",
        value: formatCurrency(totalRevenue),
        change: calculateChange(totalRevenue, totalRevenueLastMonth),
        trend: totalRevenue >= totalRevenueLastMonth ? "up" : "down",
        icon: "dollar-sign",
        color: "bg-brand-yellow",
      },
      {
        title: "Average Order Value",
        value: formatCurrency(averageOrderValue),
        change: calculateChange(averageOrderValue, averageOrderValueLastMonth),
        trend: averageOrderValue >= averageOrderValueLastMonth ? "up" : "down",
        icon: "trending-up",
        color: "bg-brand-pink",
      },
      {
        title: "Pending Orders",
        value: pendingOrders.toString(),
        change: calculateChange(pendingOrders, pendingOrdersLastMonth),
        trend: pendingOrders <= pendingOrdersLastMonth ? "up" : "down",
        icon: "clock",
        color: "bg-gray-800 dark:bg-gray-700",
      },
    ];
  } catch (error) {
    console.error("Error fetching order stats:", error);
    return [];
  }
}
