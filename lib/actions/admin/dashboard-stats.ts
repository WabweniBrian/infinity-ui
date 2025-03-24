import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import { subMonths, startOfMonth, endOfMonth } from "date-fns";

export type SalesData = {
  name: string;
  revenue: number;
  transactions: number;
};

export type UserGrowthData = {
  name: string;
  users: number;
  newUsers: number;
};

export type RecentSaleData = {
  id: string;
  customer: {
    name: string;
    email: string;
    image: string | null;
  };
  amount: number;
  component: string | null;
  date: Date;
  status: PaymentStatus;
};

export type PopularComponentData = {
  id: string;
  name: string;
  category: string;
  sales: number;
  revenue: number;
  isFeatured: boolean;
  isNew: boolean;
  isAI: boolean;
};

// Function to calculate percentage change
function calculateChange(current: number, previous: number) {
  if (previous === 0) return "N/A"; // Avoid division by zero
  const change = ((current - previous) / previous) * 100;
  return change.toFixed(1) + "%";
}

export async function getDashboardStats() {
  const now = new Date();
  const lastMonth = subMonths(now, 1);

  // Current and Last Month Ranges
  const currentStart = startOfMonth(now);
  const currentEnd = endOfMonth(now);
  const lastStart = startOfMonth(lastMonth);
  const lastEnd = endOfMonth(lastMonth);

  // Fetching stats for current and last month
  const [
    allTimeRevenue,
    currentRevenue,
    previousRevenue,
    allTimeSales,
    currentSales,
    previousSales,
    activeUsers,
    prevActiveUsers,
  ] = await Promise.all([
    prisma.purchase.aggregate({
      where: { status: "SUCCESS" },
      _sum: { amount: true },
    }), // All-time revenue
    prisma.purchase.aggregate({
      _sum: { amount: true },
      where: {
        status: "SUCCESS",
        date: { gte: currentStart, lte: currentEnd },
      },
    }),
    prisma.purchase.aggregate({
      _sum: { amount: true },
      where: { status: "SUCCESS", date: { gte: lastStart, lte: lastEnd } },
    }),
    prisma.purchase.count({
      where: {
        status: "SUCCESS",
      },
    }), // All-time sales
    prisma.purchase.count({
      where: {
        status: "SUCCESS",
        date: { gte: currentStart, lte: currentEnd },
      },
    }),

    prisma.purchase.count({
      where: { status: "SUCCESS", date: { gte: lastStart, lte: lastEnd } },
    }),
    prisma.user.count({
      where: { lastLogin: { gte: currentStart, lte: currentEnd } },
    }), // Active users this month
    prisma.user.count({
      where: { lastLogin: { gte: lastStart, lte: lastEnd } },
    }), // Active users last month
  ]);

  // Calculate percentage changes
  const revenueChange = calculateChange(
    currentRevenue._sum.amount || 0,
    previousRevenue._sum.amount || 0,
  );

  const salesChange = calculateChange(currentSales, previousSales);
  const activeUsersChange = calculateChange(activeUsers, prevActiveUsers);

  return [
    {
      title: "Total Revenue",
      value: `$${(allTimeRevenue._sum.amount || 0).toFixed(2)}`, // All-time revenue
      change: revenueChange,
      trend: revenueChange.startsWith("-") ? "down" : "up",
      icon: "dollar-sign",
      color: "bg-brand text-white",
    },
    {
      title: "Total Components",
      value: (await prisma.component.count()).toString(),
      change: "+12.5%",
      trend: "up",
      icon: "package",
      color: "bg-brand-yellow text-white",
    },
    {
      title: "Sales",
      value: allTimeSales.toString(),
      change: salesChange,
      trend: salesChange.startsWith("-") ? "down" : "up",
      icon: "shopping-cart",
      color: "bg-brand-pink text-white",
    },
    {
      title: "Users",
      value: activeUsers.toString(),
      change: activeUsersChange,
      trend: activeUsersChange.startsWith("-") ? "down" : "up",
      icon: "users",
      color: "bg-gray-800 text-white dark:bg-gray-700",
    },
  ];
}

export async function getSalesDataByYear(year: number): Promise<SalesData[]> {
  // Get the start and end date for the specified year
  const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

  // Query the database for purchases within the date range
  const purchases = await prisma.purchase.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
      status: "SUCCESS",
    },
    select: {
      amount: true,
      date: true,
    },
  });

  // Create a map to store monthly data
  const monthlyData = new Map<
    number,
    { revenue: number; transactions: number }
  >();

  // Initialize the map with all months
  for (let i = 0; i < 12; i++) {
    monthlyData.set(i, { revenue: 0, transactions: 0 });
  }

  // Aggregate the data by month
  purchases.forEach((purchase) => {
    const month = purchase.date.getMonth();
    const currentData = monthlyData.get(month)!;

    monthlyData.set(month, {
      revenue: currentData.revenue + purchase.amount,
      transactions: currentData.transactions + 1,
    });
  });

  // Convert the map to an array of objects
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const salesData: SalesData[] = Array.from(monthlyData.entries()).map(
    ([month, data]) => ({
      name: monthNames[month],
      revenue: Math.round(data.revenue * 100) / 100, // Round to 2 decimal places
      transactions: data.transactions,
    }),
  );

  return salesData;
}

export async function getUserGrowthByYear(
  year: number,
): Promise<UserGrowthData[]> {
  // Get the start and end date for the specified year
  const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
  const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

  // Query all users created within the year range
  const users = await prisma.user.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: {
      id: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Create a map to store monthly data
  const monthlyData = new Map<number, { users: number; newUsers: number }>();

  // Initialize the map with all months
  for (let i = 0; i < 12; i++) {
    monthlyData.set(i, { users: 0, newUsers: 0 });
  }

  // Process users month by month
  for (let month = 0; month < 12; month++) {
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0, 23, 59, 59, 999);

    // Count total users up to this month (cumulative)
    const totalUsersUpToMonth = await prisma.user.count({
      where: {
        createdAt: {
          lte: monthEnd,
        },
      },
    });

    // For each day in the month, calculate new users in the last 7 days
    let newUsersInMonth = 0;

    // Get users created in this month
    const usersInMonth = users.filter(
      (user) => user.createdAt >= monthStart && user.createdAt <= monthEnd,
    );

    // For each user in this month, check if they were created in the last 7 days of the month
    const lastDayOfMonth = monthEnd.getDate();
    const last7DaysStart = new Date(year, month, lastDayOfMonth - 6);

    newUsersInMonth = usersInMonth.filter(
      (user) => user.createdAt >= last7DaysStart && user.createdAt <= monthEnd,
    ).length;

    // Update the monthly data
    monthlyData.set(month, {
      users: totalUsersUpToMonth,
      newUsers: newUsersInMonth,
    });
  }

  // Convert the map to an array of objects
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const userGrowthData: UserGrowthData[] = Array.from(
    monthlyData.entries(),
  ).map(([month, data]) => ({
    name: monthNames[month],
    users: data.users,
    newUsers: data.newUsers,
  }));

  return userGrowthData;
}

export async function getRecentSales(limit = 5): Promise<RecentSaleData[]> {
  const recentSales = await prisma.purchase.findMany({
    where: {
      componentId: {
        not: null,
      },
      amount: {
        gt: 0,
      },
    },
    select: {
      id: true,
      amount: true,
      date: true,
      status: true,
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      component: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    take: limit,
  });

  return recentSales.map((sale) => ({
    id: sale.id,
    customer: {
      name: sale.user.name,
      email: sale.user.email,
      image: sale.user.image,
    },
    amount: sale.amount,
    component: sale.component?.name || null,
    date: sale.date,
    status: sale.status,
  }));
}

export async function getPopularComponents(
  limit = 5,
): Promise<PopularComponentData[]> {
  // Get all components
  const components = await prisma.component.findMany({
    select: {
      id: true,
      name: true,
      category: true,
      isFeatured: true,
      createdAt: true,
      isAI: true,
    },
  });

  // For each component, get the sales data
  const componentData = await Promise.all(
    components.map(async (component) => {
      const purchases = await prisma.purchase.findMany({
        where: {
          componentId: component.id,
          amount: {
            gt: 0,
          },
          status: "SUCCESS", // Only count successful purchases
        },
        select: {
          amount: true,
        },
      });

      // Calculate total sales and revenue
      const sales = purchases.length;
      const revenue = purchases.reduce(
        (total, purchase) => total + purchase.amount,
        0,
      );

      // Check if component is new (created in the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const isNew = component.createdAt > thirtyDaysAgo;

      return {
        id: component.id,
        name: component.name,
        category: component.category.name || "Uncategorized",
        sales,
        revenue,
        isFeatured: component.isFeatured || false,
        isNew,
        isAI: component.isAI || false,
      };
    }),
  );

  // Sort by sales (descending) and take the top N
  return componentData.sort((a, b) => b.sales - a.sales).slice(0, limit);
}
