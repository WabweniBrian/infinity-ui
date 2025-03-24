"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle, Loader2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, formatRelativeTime } from "@/lib/utils";
import {
  markAllNotificationsRead,
  markNotificationRead,
} from "@/lib/actions/user-notifications";
import toast from "react-hot-toast";
import { SessionUser } from "@/types";

type UserNotification = {
  id: string;
  title: string;
  type: string;
  createdAt: Date;
  isRead: boolean | null;
  message: string;
};

interface UserNotificationsProps {
  userNotifications: UserNotification[];
  user: SessionUser;
  unreadNotificationsCount: number;
}

export const UserNotifications = ({
  userNotifications: notifications,
  user,
  unreadNotificationsCount,
}: UserNotificationsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isManyLoading, setIsManyLoading] = useState(false);

  const handleMarkNotificationRead = async (id: string) => {
    setIsLoading(true);
    try {
      const result = await markNotificationRead(id);
      if (result.success) {
        toast.success("Notification marked as read");
      } else {
        toast.error(result.message || "Failed to update notification");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkNotificationsRead = async () => {
    setIsManyLoading(true);
    try {
      const results = await markAllNotificationsRead(user?.id!);
      if (results.success) {
        toast.success("Notifications marked as read!");
      } else {
        toast.error(results.message || "Failed to mark as read");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsManyLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h2>
          {unreadNotificationsCount > 0 && (
            <Badge className="!bg-brand text-white">
              {unreadNotificationsCount} new
            </Badge>
          )}
        </div>

        <div className="flex gap-2">
          {unreadNotificationsCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkNotificationsRead}
              disabled={isManyLoading}
            >
              {isManyLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              {isManyLoading ? " Marking..." : " Mark all as read"}
            </Button>
          )}
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
          <Bell className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No notifications
          </h3>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            You don&apos;t have any notifications at the moment.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={cn(
                "rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800",
                {
                  "bg-gray-50 dark:bg-gray-800/80": !notification.isRead,
                },
              )}
            >
              <div className="flex gap-4">
                <div
                  className={cn(
                    "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full",
                    {
                      "bg-brand/10 text-brand": !notification.isRead,
                      "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400":
                        notification.isRead,
                    },
                  )}
                >
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="h-2 w-2 rounded-full bg-brand"></span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatRelativeTime(notification.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {notification.message}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge className="!bg-gray-100 text-gray-800 dark:!bg-gray-700 dark:text-gray-300">
                      {notification.type}
                    </Badge>
                    <div className="flex gap-2">
                      {!notification.isRead && (
                        <button
                          onClick={() =>
                            handleMarkNotificationRead(notification.id)
                          }
                          className="text-xs text-brand hover:underline disabled:opacity-60"
                          disabled={isLoading}
                        >
                          {isLoading ? " Marking..." : " Mark as read"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
