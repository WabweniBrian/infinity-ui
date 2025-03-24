import AdminLayout from "@/components/admin/common/layout";
import { getUnreadNotificationsCount } from "@/lib/actions/admin/notifications";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import React from "react";

const AdminMainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  const notifications = await prisma.notification.findMany({
    select: {
      id: true,
      title: true,
      message: true,
      createdAt: true,
      isRead: true,
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const unreadNotifications = await getUnreadNotificationsCount();

  return (
    <AdminLayout
      user={user}
      notifications={notifications}
      unreadNotifications={unreadNotifications}
    >
      {children}
    </AdminLayout>
  );
};

export default AdminMainLayout;
