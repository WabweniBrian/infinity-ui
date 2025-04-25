"use server";

import { prisma } from "@/lib/prisma";

/**
 * Get unique customer IDs from a list of order IDs
 */
export async function getCustomersFromOrders(orderIds: string[]) {
  try {
    if (!orderIds.length) {
      return {
        success: false,
        message: "No order IDs provided",
        customerIds: [],
      };
    }

    // Get orders with their associated users
    const orders = await prisma.purchase.findMany({
      where: {
        id: {
          in: orderIds,
        },
      },
      select: {
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!orders.length) {
      return { success: false, message: "No orders found", customerIds: [] };
    }

    // Extract unique customer IDs and info
    const uniqueCustomers = Array.from(
      new Map(orders.map((order) => [order.userId, order.user])).values(),
    );

    const customerIds = uniqueCustomers.map((customer) => customer.id);
    const customerCount = customerIds.length;

    return {
      success: true,
      customerIds,
      customerCount,
      customers: uniqueCustomers,
    };
  } catch (error: any) {
    console.error("Error getting customers from orders:", error);
    return {
      success: false,
      message: error.message || "Failed to get customers",
      customerIds: [],
    };
  }
}
