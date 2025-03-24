"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";

export const getUnreadNotificationsCount = async (userId: string) => {
  return await prisma.notification.count({
    where: { isRead: false, isAdmin: false, userId },
  });
};

// ----------------------------MARK NOTIFICATION AS READ----------------------------------------------------------------------------------
export const markNotificationRead = async (notificationId: string) => {
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const markAllNotificationsRead = async (userId: string) => {
  try {
    await prisma.notification.updateMany({
      where: { isAdmin: false, userId },
      data: { isRead: true },
    });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
