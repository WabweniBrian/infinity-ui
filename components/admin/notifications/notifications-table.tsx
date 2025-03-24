"use client";

import MainPagination from "@/components/common/main-pagination";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import NotificationsBulkActions from "./bulk-actions";
import NotificationActions from "./notification-actions";

type Notification = {
  id: string;
  userId: string | null;
  type: string;
  isRead: boolean | null;
  isAdmin: boolean | null;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
};

interface NotificationTableProps {
  notifications: Notification[];
  notificationsCount: number;
  totalNotifications: number;
  totalPages: number;
  offset: number;
}

export const NotificationsTable = ({
  notifications,
  notificationsCount,
  totalNotifications,
  totalPages,
  offset,
}: NotificationTableProps) => {
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>(
    [],
  );

  const allSelected =
    notifications.length > 0 &&
    selectedNotifications.length === notifications.length;

  const toggleSelectNotification = (notificationId: string) => {
    if (selectedNotifications.includes(notificationId)) {
      setSelectedNotifications(
        selectedNotifications.filter((id) => id !== notificationId),
      );
    } else {
      setSelectedNotifications([...selectedNotifications, notificationId]);
    }
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(
        notifications.map((notification) => notification.id),
      );
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "system":
        return "!bg-gray-100 text-gray-800 dark:!bg-gray-700 dark:text-gray-300";
      case "purchase":
        return "!bg-brand/10 text-brand border border-brand";
      case "info":
        return "!bg-brand-yellow/10 text-brand-yellow border border-brand-yellow";
      case "user_registration":
        return "!bg-brand-pink/10 text-brand-pink border border-brand-pink";
      case "welcome":
        return "!bg-blue-100 text-blue-800 dark:!bg-blue-900/30 dark:text-blue-400";
      default:
        return "!bg-gray-100 text-gray-800 dark:!bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <>
      <div className="mb-4 flex justify-end text-xl font-bold md:text-2xl">
        {notificationsCount} notifications(s)
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
        {/* Bulk Actions Bar */}
        {selectedNotifications.length > 0 && (
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {selectedNotifications.length} notification
                {selectedNotifications.length !== 1 ? "s" : ""} selected
              </span>
            </div>
            <NotificationsBulkActions
              ids={selectedNotifications}
              setSelectedIds={setSelectedNotifications}
            />
          </div>
        )}

        <div className="scrollbar-hover overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left dark:bg-gray-800/50">
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="select-all"
                      checked={allSelected}
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all notifications"
                    />
                    <label htmlFor="select-all" className="sr-only">
                      Select all
                    </label>
                    Notification
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Type
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  User
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <Image
                        src="/no-results.png"
                        alt="No Results Image"
                        width={60}
                        height={60}
                        className="mx-auto"
                      />
                      <p className="text-gray-500 dark:text-gray-400">
                        No results.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                notifications.map((notification) => (
                  <tr
                    key={notification.id}
                    className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${!notification.isRead ? "bg-gray-50 dark:bg-gray-800/80" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Checkbox
                            id={`select-${notification.id}`}
                            checked={selectedNotifications.includes(
                              notification.id,
                            )}
                            onCheckedChange={() =>
                              toggleSelectNotification(notification.id)
                            }
                            aria-label={`Select notification ${notification.title}`}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center">
                            {!notification.isRead && (
                              <div
                                className="mr-2 h-2 w-2 rounded-full bg-brand"
                                aria-hidden="true"
                              ></div>
                            )}
                            <div className="truncate text-sm font-medium text-gray-900 dark:text-white">
                              {notification.title}
                            </div>
                          </div>
                          <div className="mt-1 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                            {notification.message}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge className={getTypeColor(notification.type)}>
                        {notification.type}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Badge
                        className={
                          notification.isRead
                            ? "!bg-green-100 text-green-800 dark:!bg-green-900/30 dark:text-green-400"
                            : "!bg-yellow-100 text-yellow-800 dark:!bg-yellow-900/30 dark:text-yellow-400"
                        }
                      >
                        {notification.isRead ? "Read" : "Unread"}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {notification.user ? notification.user.name : "All Users"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(notification.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <NotificationActions
                        id={notification.id}
                        isRead={notification.isRead!}
                        isAdmin={notification.isAdmin!}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800/50 sm:flex-row">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-medium">
              {offset + 1} - {offset + notifications.length}
            </span>{" "}
            of <span className="font-medium">{totalNotifications}</span>{" "}
            notifications
          </div>

          {/* Pagination */}
          <div>{totalPages > 1 && <MainPagination pages={totalPages} />}</div>
        </div>
      </div>
    </>
  );
};
