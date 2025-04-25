import { UserDashboardTabs } from "@/components/dashboard/user-dashboard-tabs";
import { UserProfileHeader } from "@/components/dashboard/user-profile-header";
import { getUnreadNotificationsCount } from "@/lib/actions/user-notifications";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const metadata = {
  title: "User Dashboard",
};

const UserDashboard = async () => {
  const user = await getCurrentUser();

  if (!user) redirect("/sign-in");

  const userDetails = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      isActive: true,
      createdAt: true,
    },
  });

  if (!userDetails || (userDetails && !userDetails.isActive)) notFound();

  const userPurchases = await prisma.purchase.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      amount: true,
      status: true,
      isComponent: true,
      isPack: true,
      isBundle: true,
      orderNumber: true,
      address: true,
      phone: true,
      zipCode: true,
      date: true,
      component: { select: { name: true } },
      paymentProvider: true,
    },
  });

  const userNotifications = await prisma.notification.findMany({
    where: { userId: user.id, isAdmin: false },
    select: {
      id: true,
      title: true,
      message: true,
      createdAt: true,
      type: true,
      isRead: true,
    },
  });

  const unreadNotificationsCount = await getUnreadNotificationsCount(user.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <UserProfileHeader user={userDetails} />
      <div className="my-4">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>
      <UserDashboardTabs
        userPurchases={userPurchases}
        userNotifications={userNotifications}
        unreadNotificationsCount={unreadNotificationsCount}
        user={user}
      />
    </div>
  );
};

export default UserDashboard;
