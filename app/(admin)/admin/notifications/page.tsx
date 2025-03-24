import { NotificationsFilters } from "@/components/admin/notifications/notifications-filters";
import { NotificationsHeader } from "@/components/admin/notifications/notifications-header";
import { NotificationsStats } from "@/components/admin/notifications/notifications-stats";
import { NotificationsTable } from "@/components/admin/notifications/notifications-table";
import { getNotifications, getUsers } from "@/lib/actions/admin/notifications";

export const metadata = {
  title: "Notifications",
};

type SearchParams = {
  searchParams: {
    search?: string;
    type?: string;
    isRead?: string;
    isAdmin?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: string;
  };
};

const NotificationsPage = async ({ searchParams }: SearchParams) => {
  const limit = 10;
  const skip = (Number(searchParams.page || "1") - 1) * limit || 0;
  const users = await getUsers();

  const { notifications, notificationsCount, totalNotifications } =
    await getNotifications({
      search: searchParams.search,
      type: searchParams.type,
      isRead: searchParams.isRead,
      isAdmin: searchParams.isAdmin,
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
      limit,
      skip,
    });

  return (
    <div className="space-y-6">
      <NotificationsHeader users={users} />
      <NotificationsStats />
      <NotificationsFilters />
      <NotificationsTable
        notifications={notifications}
        notificationsCount={notificationsCount}
        totalNotifications={totalNotifications}
        totalPages={Math.ceil(notificationsCount / limit)}
        offset={skip}
      />
    </div>
  );
};

export default NotificationsPage;
