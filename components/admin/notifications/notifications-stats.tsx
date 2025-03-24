import { getNotificationStats } from "@/lib/actions/admin/notification-stats";
import { AlertCircle, Bell, CheckCircle, Clock } from "lucide-react";

export const NotificationsStats = async () => {
  const {
    totalNotifications,
    readNotifications,
    unreadNotifications,
    scheduledNotifications,
  } = await getNotificationStats();

  const stats = [
    {
      title: "Total Notifications",
      value: totalNotifications.toLocaleString(),
      change: "+18.2%",
      trend: "up",
      icon: <Bell className="h-5 w-5" />,
      color: "bg-brand",
    },
    {
      title: "Read Notifications",
      value: readNotifications.toLocaleString(),
      change: "+15.3%",
      trend: "up",
      icon: <CheckCircle className="h-5 w-5" />,
      color: "bg-brand-yellow",
    },
    {
      title: "Unread Notifications",
      value: unreadNotifications.toLocaleString(),
      change: "+5.7%",
      trend: "up",
      icon: <AlertCircle className="h-5 w-5" />,
      color: "bg-brand-pink",
    },
    {
      title: "Scheduled Notifications",
      value: scheduledNotifications.toLocaleString(),
      change: "+2",
      trend: "up",
      icon: <Clock className="h-5 w-5" />,
      color: "bg-gray-800 dark:bg-gray-700",
    },
  ];
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-950"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.title}
              </p>
              <h3 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </h3>

              <div className="mt-2 flex items-center">
                <span
                  className={`text-xs font-medium ${
                    stat.trend === "up"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                  from last month
                </span>
              </div>
            </div>

            <div className={`rounded-lg p-2 ${stat.color} text-white`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
