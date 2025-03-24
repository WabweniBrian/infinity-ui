"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import type { PaymentStatus } from "@prisma/client";

export type OrderSearchParams = {
  search?: string;
  status?: string;
  type?: string;
  minPrice?: string;
  maxPrice?: string;
  dateFrom?: string;
  dateTo?: string;
  userId?: string;
  limit?: number;
  skip?: number;
};

export async function getOrders({
  search,
  status,
  type,
  minPrice,
  maxPrice,
  dateFrom,
  dateTo,
  limit = 10,
  skip = 0,
}: OrderSearchParams) {
  try {
    // Build the where clause for filtering
    const where: any = {};

    // Text search
    if (search) {
      where.OR = [
        { orderNumber: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
      ];
    }

    // Status filter - modified to handle a single value instead of an array
    if (status) {
      where.status = status;
    }

    // Type filter - modified to handle a single value instead of an array
    if (type) {
      if (type === "Component") {
        where.isComponent = true;
      } else if (type === "Bundle") {
        where.isBundle = true;
      } else if (type === "Pack") {
        where.isPack = true;
      }
    }

    // Price range filter
    if (minPrice || maxPrice) {
      where.amount = {};

      if (minPrice) {
        where.amount.gte = Number.parseFloat(minPrice);
      }

      if (maxPrice) {
        where.amount.lte = Number.parseFloat(maxPrice);
      }
    }

    // Date range filter
    if (dateFrom || dateTo) {
      where.date = {};

      if (dateFrom) {
        where.date.gte = new Date(dateFrom);
      }

      if (dateTo) {
        // Add one day to include the end date fully
        const endDate = new Date(dateTo);
        endDate.setDate(endDate.getDate() + 1);
        where.date.lt = endDate;
      }
    }

    // Execute queries
    const [orders, ordersCount, totalOrders] = await Promise.all([
      prisma.purchase.findMany({
        where,
        orderBy: {
          date: "desc",
        },
        select: {
          id: true,
          userId: true,
          isBundle: true,
          isPack: true,
          isComponent: true,
          pack: true,
          amount: true,
          date: true,
          status: true,
          orderNumber: true,
          componentId: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          component: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
        skip,
        take: limit,
      }),
      prisma.purchase.count({
        where,
      }),
      prisma.purchase.count(),
    ]);

    return {
      orders,
      ordersCount,
      totalOrders,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      orders: [],
      ordersCount: 0,
      totalOrders: 0,
    };
  }
}

export async function getOrder(orderId: string) {
  try {
    const order = await prisma.purchase.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        orderNumber: true,
        amount: true,
        status: true,
        isComponent: true,
        isBundle: true,
        isPack: true,
        pack: true,
        userId: true,
        componentId: true,
      },
    });

    return order;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

interface UserData {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

interface ComponentData {
  id: string;
  name: string;
  slug: string;
}

interface UserOrderStats {
  totalOrders: number;
  totalSpent: number;
}

export interface OrderType {
  id: string;
  orderNumber: string;
  amount: number;
  date: Date;
  status: string;
  isComponent: boolean;
  isBundle: boolean;
  isPack: boolean;
  pack: string | null;
  componentId: string | null;
  user: UserData;
  component: ComponentData | null;
  userStats?: UserOrderStats;
}

export async function getOrderById(
  orderId: string,
  userId: string,
): Promise<OrderType | null> {
  try {
    const order = await prisma.purchase.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        orderNumber: true,
        amount: true,
        date: true,
        status: true,
        isComponent: true,
        isBundle: true,
        isPack: true,
        pack: true,
        componentId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        component: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!order) return null;

    if (
      !order.id ||
      !order.orderNumber ||
      order.amount === undefined ||
      !order.date ||
      !order.status ||
      order.isComponent === undefined ||
      order.isBundle === undefined ||
      order.isPack === undefined ||
      !order.user
    ) {
      throw new Error("Incomplete order data");
    }

    const userStats = await getUserOrderStats(userId);

    const result: OrderType = {
      id: order.id,
      orderNumber: order.orderNumber,
      amount: order.amount,
      date: order.date,
      status: order.status,
      isComponent: order.isComponent,
      isBundle: order.isBundle,
      isPack: order.isPack,
      pack: order.pack,
      componentId: order.componentId,
      user: order.user as UserData,
      component: order.component,
      userStats: userStats,
    };

    return result;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

async function getUserOrderStats(userId: string): Promise<UserOrderStats> {
  try {
    // Get count of all orders
    const totalOrders = await prisma.purchase.count({
      where: {
        user: {
          id: userId,
        },
      },
    });

    // Get sum of all spending
    const spendingAggregate = await prisma.purchase.aggregate({
      where: {
        user: {
          id: userId,
        },
      },
      _sum: {
        amount: true,
      },
    });

    return {
      totalOrders,
      totalSpent: spendingAggregate._sum.amount || 0,
    };
  } catch (error) {
    console.error("Error calculating user stats:", error);
    return {
      totalOrders: 0,
      totalSpent: 0,
    };
  }
}

//---------------------------------------------------------- GET USERS -------------------------------------------------
export const getUsers = async () => {
  return prisma.user.findMany({ select: { id: true, name: true } });
};

//---------------------------------------------------------- GET COMPONENTS -------------------------------------------------
export const getComponents = async () => {
  return prisma.component.findMany({ select: { id: true, name: true } });
};

export async function updateOrderStatus(
  orderId: string,
  status: PaymentStatus,
) {
  try {
    await prisma.purchase.update({
      where: { id: orderId },
      data: { status },
    });

    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// ----------------------------DELETE A ORDER----------------------------------------------------------------------------------
export const deleteOrder = async (orderId: string) => {
  try {
    await prisma.purchase.delete({ where: { id: orderId } });
    revalidatePath("/admin/purchases");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ----------------------------DELETE MULTIPLE ORDERS----------------------------------------------------------------------------------
export const deleteOrders = async (orderIds: string[]) => {
  try {
    await prisma.purchase.deleteMany({ where: { id: { in: orderIds } } });
    revalidatePath("/admin/purchases");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
