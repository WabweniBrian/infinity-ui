"use server";

import { prisma } from "@/lib/prisma";
import { subDays, startOfMonth, endOfMonth, startOfToday } from "date-fns";

// Utility function to calculate change and trend
function calculateTrend(current: number, previous: number) {
  if (previous === 0) return { change: "100%", trend: "up" }; // Avoid division by zero
  const percentageChange = ((current - previous) / previous) * 100;
  return {
    change: `${percentageChange.toFixed(1)}%`,
    trend: current > previous ? "up" : current < previous ? "down" : "neutral",
  };
}

export async function getUserStats() {
  try {
    // Dates for current and previous months
    const now = new Date();
    const firstDayCurrentMonth = startOfMonth(now); // Start of current month
    const lastDayPreviousMonth = endOfMonth(subDays(now, 30)); // End of previous month

    const [
      totalUsers,
      previousTotalUsers,
      activeUsers,
      previousActiveUsers,
      newUsers,
      previousNewUsers,
    ] = await Promise.all([
      prisma.user.count(), // Total users
      prisma.user.count({ where: { createdAt: { lt: firstDayCurrentMonth } } }), // Previous total users
      prisma.user.count({ where: { lastLogin: { gte: subDays(now, 30) } } }), // Active users in last 30 days
      prisma.user.count({
        where: {
          lastLogin: {
            gte: subDays(lastDayPreviousMonth, 30),
            lt: firstDayCurrentMonth,
          },
        },
      }), // Previous active users in last 30 days
      prisma.user.count({
        where: { createdAt: { gte: subDays(now, 7) } }, // New users in last 7 days
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: subDays(lastDayPreviousMonth, 7),
            lt: firstDayCurrentMonth,
          },
        },
      }), // Previous new users in last 7 days
    ]);

    // Calculate trends
    const totalUsersTrend = calculateTrend(totalUsers, previousTotalUsers);
    const activeUsersTrend = calculateTrend(activeUsers, previousActiveUsers);
    const inactiveUsers = totalUsers - activeUsers;
    const previousInactiveUsers = previousTotalUsers - previousActiveUsers;
    const inactiveUsersTrend = calculateTrend(
      inactiveUsers,
      previousInactiveUsers,
    );
    const newUsersTrend = calculateTrend(newUsers, previousNewUsers);

    // Return Data
    return [
      {
        title: "Total Users",
        value: totalUsers.toString(),
        change: totalUsersTrend.change,
        trend: totalUsersTrend.trend,
        iconType: "users",
        color: "bg-blue-500",
      },
      {
        title: "Active Users",
        value: activeUsers.toString(),
        change: activeUsersTrend.change,
        trend: activeUsersTrend.trend,
        iconType: "user-check",
        color: "bg-green-500",
      },
      {
        title: "Inactive Users",
        value: inactiveUsers.toString(),
        change: inactiveUsersTrend.change,
        trend: inactiveUsersTrend.trend,
        iconType: "user-x",
        color: "bg-red-500",
      },
      {
        title: "New Users",
        value: newUsers.toString(),
        change: newUsersTrend.change,
        trend: newUsersTrend.trend,
        iconType: "user-plus",
        color: "bg-yellow-500",
      },
    ];
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return [];
  }
}
