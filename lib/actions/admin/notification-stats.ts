"use server";

import { prisma } from "@/lib/prisma";

export const getNotificationStats = async () => {
  try {
    const [totalNotifications, readNotifications] = await Promise.all([
      prisma.notification.count(),
      prisma.notification.count({ where: { isRead: true } }),
    ]);

    const unreadNotifications = totalNotifications - readNotifications;
    const scheduledNotifications = 12;

    return {
      totalNotifications,
      readNotifications,
      unreadNotifications,
      scheduledNotifications,
    };
  } catch (error) {
    console.error("Error fetching notification stats:", error);
    return {
      totalNotifications: 0,
      readNotifications: 0,
      unreadNotifications: 0,
      scheduledNotifications: 12,
    };
  }
};
