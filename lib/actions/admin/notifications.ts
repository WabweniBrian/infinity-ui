"use server";

import { prisma } from "@/lib/prisma";
import { NotificationSchemaType } from "@/types";
import { revalidatePath } from "next/cache";

type NotificationSearchParams = {
  search?: string;
  type?: string;
  isRead?: string;
  isAdmin?: string;
  userId?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  skip?: number;
};

// ----------------------------GET UNREAD NOTIFICATIONS COUNT ----------------------------------------------------------------------------------
export const getUnreadNotificationsCount = async () => {
  return await prisma.notification.count({
    where: { isRead: false, isAdmin: true },
  });
};

// ----------------------------GET NOTIFICATIONS ----------------------------------------------------------------------------------
export const getNotifications = async ({
  search,
  type,
  isRead,
  isAdmin,
  dateFrom,
  dateTo,
  limit = 10,
  skip = 0,
}: NotificationSearchParams) => {
  // Build the where clause for filtering
  const where: any = {};

  // Text search
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { message: { contains: search, mode: "insensitive" } },
    ];
  }

  // Type filter
  if (type && type !== "all") {
    where.type = type;
  }

  // Read status filter
  if (isRead === "true") {
    where.isRead = true;
  } else if (isRead === "false") {
    where.isRead = false;
  }

  // Admin filter
  if (isAdmin === "true") {
    where.isAdmin = true;
  } else if (isAdmin === "false") {
    where.isAdmin = false;
  }

  // Date range filter
  if (dateFrom || dateTo) {
    where.createdAt = {};

    if (dateFrom) {
      where.createdAt.gte = new Date(dateFrom);
    }

    if (dateTo) {
      where.createdAt.lte = new Date(dateTo);
    }
  }

  const [notifications, notificationsCount, totalNotifications] =
    await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          userId: true,
          type: true,
          isRead: true,
          isAdmin: true,
          title: true,
          message: true,
          createdAt: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        skip: skip,
        take: limit,
      }),

      prisma.notification.count({
        where,
      }),

      prisma.notification.count(),
    ]);

  return {
    notifications,
    notificationsCount,
    totalNotifications,
  };
};

// ----------------------------GET SINGLE NOTIFICATION FOR EDITING----------------------------------------------------------------------------------
export const getNotification = async (notificationId: string) => {
  return await prisma.notification.findUnique({
    where: { id: notificationId },
    select: {
      id: true,
      title: true,
      message: true,
      type: true,
      userId: true,
      isAdmin: true,
    },
  });
};

// ----------------------------GET NOTIFICATION BY ID WITH DETAILS----------------------------------------------------------------------------------
export const getNotificationById = async (notificationId: string) => {
  return await prisma.notification.findUnique({
    where: { id: notificationId },
    select: {
      id: true,
      userId: true,
      type: true,
      isRead: true,
      title: true,
      message: true,
      createdAt: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
};

//---------------------------------------------------------- GET USERS -------------------------------------------------
export const getUsers = async () => {
  return prisma.user.findMany({ select: { id: true, name: true } });
};

// ----------------------------ADD A NOTIFICATION----------------------------------------------------------------------------------
export const addNotification = async (data: NotificationSchemaType) => {
  try {
    await prisma.notification.create({
      data: {
        title: data.title,
        message: data.message,
        type: data.type,
        userId: data.userId,
        isAdmin: data.isAdmin,
      },
    });
    revalidatePath("/admin/notifications");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ----------------------------EDIT A NOTIFICATION----------------------------------------------------------------------------------
export const updateNotification = async (
  notificationId: string,
  data: NotificationSchemaType,
) => {
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: {
        title: data.title,
        message: data.message,
        type: data.type,
        userId: data.userId,
        isAdmin: data.isAdmin,
      },
    });
    revalidatePath("/admin/notifications");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ----------------------------DELETE A NOTIFICATION----------------------------------------------------------------------------------
export const deleteNotification = async (notificationId: string) => {
  try {
    await prisma.notification.delete({ where: { id: notificationId } });
    revalidatePath("/admin/notifications");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ----------------------------DELETE MULTIPLE NOTIFICATIONS----------------------------------------------------------------------------------
export const deleteNotifications = async (notificationIds: string[]) => {
  try {
    await prisma.notification.deleteMany({
      where: { id: { in: notificationIds } },
    });
    revalidatePath("/admin/notifications");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ----------------------------MARK NOTIFICATION AS READ----------------------------------------------------------------------------------
export const markNotificationRead = async (notificationId: string) => {
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    revalidatePath("/admin/notifications");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

// ----------------------------MARK MULTIPLE NOTIFICATIONS AS READ----------------------------------------------------------------------------------
export const markNotificationsRead = async (notificationIds: string[]) => {
  try {
    await prisma.notification.updateMany({
      where: { id: { in: notificationIds }, isAdmin: true },
      data: { isRead: true },
    });

    revalidatePath("/admin/notifications");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const markAllNotificationsRead = async () => {
  try {
    await prisma.notification.updateMany({
      where: { isAdmin: true },
      data: { isRead: true },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
