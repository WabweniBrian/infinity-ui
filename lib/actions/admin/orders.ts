"use server";

import { prisma } from "@/lib/prisma";
import { sendInvoiceEmail } from "@/lib/send-invoice-email";
import { generateOrderNumber } from "@/lib/utils";
import { CreatePurchaseSchemaType, UpdatePurchaseSchemaType } from "@/types";
import type { Pack, PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
        { paymentProvider: { contains: search, mode: "insensitive" } },
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
          paymentProvider: true,
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

//------------------------------------------------------ GET FORM EDIT PURCHASE--------------------------------------------------
export async function getFormEditPurchase(orderId: string) {
  try {
    const order = await prisma.purchase.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        userId: true,
        componentId: true,
        isBundle: true,
        isPack: true,
        isComponent: true,
        pack: true,
        amount: true,
        status: true,
        orderNumber: true,
        address: true,
        phone: true,
        zipCode: true,
        paymentProvider: true,
      },
    });

    if (!order) return null;

    return {
      id: order.id,
      isBundle: order.isBundle,
      isPack: order.isPack,
      isComponent: order.isComponent,
      pack: order.pack,
      amount: order.amount,
      status: order.status,
      orderNumber: order.orderNumber,
      userId: order.userId,
      componentId: order.componentId,
      address: order.address || null,
      phone: order.phone || null,
      zipCode: order.zipCode || null,
      paymentProvider: order.paymentProvider || null,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

// ----------------------------------------------------------- GET FORM USERS ----------------------------------------------------
export async function getFormUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

// ----------------------------------------------------------- GET FORM COMPONENTS ----------------------------------------------------
export async function getFormComponents() {
  return await prisma.component.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

// -------------------------------------------------- RECORD A NEW ORDER --------------------------------------------------
export async function recordPurchase(data: CreatePurchaseSchemaType) {
  try {
    // Generate a unique order number
    const orderNumber = generateOrderNumber();

    // Create the purchase record
    const purchase = await prisma.purchase.create({
      data: {
        userId: data.userId,
        componentId: data.componentId,
        isBundle: data.isBundle ?? false,
        isPack: data.isPack ?? false,
        isComponent: data.isComponent ?? true,
        pack: data.pack,
        amount: data.amount,
        date: new Date(),
        address: data.address,
        phone: data.phone,
        status: data.status || "PENDING",
        zipCode: data.zipCode,
        orderNumber,
        paymentProvider: data.paymentProvider,
      },
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
        userId: true,
        address: true,
        phone: true,
        zipCode: true,
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
    });

    // Update userHasPurchased
    await prisma.user.update({
      where: { id: data.userId },
      data: {
        hasPurchased: true,
      },
    });

    // Send confirmation email to the user
    await sendInvoiceEmail(
      {
        id: purchase.id,
        orderNumber: purchase.orderNumber,
        amount: purchase.amount,
        date: purchase.date,
        status: purchase.status,
        isComponent: purchase.isComponent,
        isBundle: purchase.isBundle,
        isPack: purchase.isPack,
        address: purchase.address,
        phone: purchase.phone,
        zipCode: purchase.zipCode,
        component: {
          name: purchase.component?.name || "",
        },
      },
      {
        name: purchase.user?.name || "User",
        email: purchase.user?.email || "",
      },
    );

    // Create a notification for the user
    await prisma.notification.create({
      data: {
        title: "New Order",
        userId: data.userId,
        type: "purchase",
        message: `Your order ${orderNumber} has been recorded successfully and an invoice has been sent to your email. Please check your inbox at ${purchase.user?.email}.`,
        isAdmin: false,
      },
    });

    revalidatePath("/admin/purchases");
    return { success: true, purchase };
  } catch (error: any) {
    console.error("Error recording purchase:", error);
    return { success: false, message: error.message };
  }
}

// ----------------------------UPDATE A ORDER----------------------------------------------------------------------------------
export async function updatePurchase(
  purchaseId: string,
  data: UpdatePurchaseSchemaType,
) {
  try {
    const purchase = await prisma.purchase.update({
      where: { id: purchaseId },
      data: {
        userId: data.userId,
        componentId: data.componentId,
        isBundle: data.isBundle,
        isPack: data.isPack,
        isComponent: data.isComponent,
        pack: data.pack,
        amount: data.amount,
        address: data.address,
        phone: data.phone,
        status: data.status,
        zipCode: data.zipCode,
        paymentProvider: data.paymentProvider,
      },
    });

    revalidatePath("/admin/purchases");
    return { success: true, purchase };
  } catch (error: any) {
    console.error("Error updating purchase:", error);
    return { success: false, message: error.message };
  }
}

// ----------------------------UPDATE A ORDER STATUS----------------------------------------------------------------------------------
export async function updatePurchaseStatus(
  purchaseId: string,
  status: PaymentStatus,
) {
  try {
    const purchase = await prisma.purchase.update({
      where: { id: purchaseId },
      data: { status },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
        component: {
          select: {
            name: true,
          },
        },
      },
    });

    // Send notification
    await prisma.notification.create({
      data: {
        title: "Order Status Update",
        userId: purchase.userId,
        type: "purchase",
        message: `Your order ${purchase.orderNumber} status has been updated to ${status}.`,
        isAdmin: false,
      },
    });

    revalidatePath("/admin/purchases");
    return { success: true, purchase };
  } catch (error: any) {
    console.error("Error updating purchase status:", error);
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
