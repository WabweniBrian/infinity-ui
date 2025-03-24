"use server";

import { prisma } from "@/lib/prisma";

export type StatData = {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  iconType: "package" | "star" | "eye" | "shopping-bag";
  color: string;
};

export type ViewedComponent = {
  id: string;
  name: string;
  views: number;
};

export type PurchaseCount = {
  componentId: string;
  _count: {
    componentId: number;
  };
};

// Helper function to calculate percentage change
function calculateChange(previous: number, current: number): string {
  if (!previous || previous === 0) return "+0%";

  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
}

export async function getComponentStats(): Promise<StatData[]> {
  try {
    // Get current date and last month date
    const now = new Date();
    const firstDayCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const firstDayLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );

    // 1. Total Components count
    const totalComponents = await prisma.component.count();
    const totalComponentsLastMonth = await prisma.component.count({
      where: {
        createdAt: {
          lt: firstDayCurrentMonth,
        },
      },
    });

    // 2. Featured Components count
    const featuredComponents = await prisma.component.count({
      where: {
        isFeatured: true,
      },
    });
    const featuredComponentsLastMonth = await prisma.component.count({
      where: {
        isFeatured: true,
        createdAt: {
          lt: firstDayCurrentMonth,
        },
      },
    });

    // 3. Most Viewed Component
    const mostViewedComponent = (await prisma.component.findFirst({
      orderBy: {
        views: "desc",
      },
      select: {
        id: true,
        name: true,
        views: true,
      },
    })) as ViewedComponent | null;

    // Most viewed last month
    const mostViewedComponentLastMonth = (await prisma.component.findFirst({
      where: {
        createdAt: {
          lt: firstDayCurrentMonth,
        },
      },
      orderBy: {
        views: "desc",
      },
      select: {
        id: true,
        name: true,
        views: true,
      },
    })) as ViewedComponent | null;

    // 4. Most Purchased Component
    // Get count of purchases for each component
    const purchaseCounts = await prisma.purchase.groupBy({
      by: ["componentId"],
      _count: {
        componentId: true,
      },
      where: {
        isComponent: true,
        componentId: {
          not: null,
        },
      },
    });

    // Sort by count and get the highest
    const mostPurchased =
      purchaseCounts.length > 0
        ? purchaseCounts.sort(
            (a, b) => b._count.componentId - a._count.componentId,
          )[0]
        : null;

    // Get component details if we found a most purchased component
    let mostPurchasedComponent = null;
    let mostPurchasedCount = 0;

    if (mostPurchased) {
      mostPurchasedComponent = await prisma.component.findUnique({
        where: {
          id: mostPurchased.componentId || undefined,
        },
        select: {
          id: true,
          name: true,
        },
      });
      mostPurchasedCount = mostPurchased._count.componentId;
    }
    // Most purchased last month
    const lastMonthPurchases = await prisma.purchase.groupBy({
      by: ["componentId"],
      _count: {
        componentId: true,
      },
      where: {
        isComponent: true,
        componentId: {
          not: null,
        },
        date: {
          gte: firstDayLastMonth,
          lt: firstDayCurrentMonth,
        },
      },
    });

    // Get the most purchased from last month
    const mostPurchasedLastMonth =
      lastMonthPurchases.length > 0
        ? lastMonthPurchases.sort(
            (a, b) => b._count.componentId - a._count.componentId,
          )[0]._count.componentId
        : 0;

    return [
      {
        title: "Total Components",
        value: totalComponents.toString(),
        change: calculateChange(totalComponentsLastMonth, totalComponents),
        trend: totalComponents >= totalComponentsLastMonth ? "up" : "down",
        iconType: "package",
        color: "bg-brand",
      },
      {
        title: "Featured Components",
        value: featuredComponents.toString(),
        change: calculateChange(
          featuredComponentsLastMonth,
          featuredComponents,
        ),
        trend:
          featuredComponents >= featuredComponentsLastMonth ? "up" : "down",
        iconType: "star",
        color: "bg-brand-yellow",
      },
      {
        title: "Most Viewed",
        value: mostViewedComponent?.name || "None",
        change: calculateChange(
          mostViewedComponentLastMonth?.views || 0,
          mostViewedComponent?.views || 0,
        ),
        trend:
          (mostViewedComponent?.views || 0) >=
          (mostViewedComponentLastMonth?.views || 0)
            ? "up"
            : "down",
        iconType: "eye",
        color: "bg-brand-pink",
      },
      {
        title: "Most Purchased",
        value: mostPurchasedComponent?.name || "None",
        change: calculateChange(mostPurchasedLastMonth, mostPurchasedCount),
        trend: mostPurchasedCount >= mostPurchasedLastMonth ? "up" : "down",
        iconType: "shopping-bag",
        color: "bg-gray-800 dark:bg-gray-700",
      },
    ];
  } catch (error) {
    console.error("Error fetching component stats:", error);
    // Return fallback data in case of error
    return [
      {
        title: "Total Components",
        value: "Error",
        change: "0%",
        trend: "up",
        iconType: "package",
        color: "bg-brand",
      },
      {
        title: "Featured Components",
        value: "Error",
        change: "0%",
        trend: "up",
        iconType: "star",
        color: "bg-brand-yellow",
      },
      {
        title: "Most Viewed",
        value: "Error",
        change: "0%",
        trend: "up",
        iconType: "eye",
        color: "bg-brand-pink",
      },
      {
        title: "Most Purchased",
        value: "Error",
        change: "0%",
        trend: "up",
        iconType: "shopping-bag",
        color: "bg-gray-800 dark:bg-gray-700",
      },
    ];
  }
}
