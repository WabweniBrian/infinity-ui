"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { markAllNotificationsRead } from "@/lib/actions/admin/notifications";
import { formatRelativeTime } from "@/lib/utils";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import NoResults from "./no-results";

type Notification = {
  id: string;
  isRead: boolean | null;
  title: string;
  message: string;
  createdAt: Date;
};

interface NotificationsDropdownProps {
  unreadNotifications: number;
  notifications: Notification[];
}

const NotificationsDropdown = ({
  notifications,
  unreadNotifications,
}: NotificationsDropdownProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMarkNotificationsRead = async () => {
    setIsLoading(true);
    try {
      const results = await markAllNotificationsRead();
      if (results.success) {
        toast.success("Notifications marked as read!");
      } else {
        toast.error(results.message || "Failed to mark as read");
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!outline-none" asChild>
        <button
          className="relative rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {unreadNotifications !== 0 && (
            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-medium text-white">
              {unreadNotifications}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="max-w-sm rounded-2xl dark:border-gray-700 dark:bg-accent"
      >
        {notifications.length === 0 ? (
          <NoResults
            title="No Notifications"
            message="There are no notifications at this time."
            suggestion="Wait until you get some notifications"
          />
        ) : (
          <>
            <div className="flex items-center justify-between border-b p-3 dark:border-gray-600">
              <h3 className="font-medium">Notifications</h3>
              <button
                className="text-xs text-brand hover:text-brand-pink"
                onClick={handleMarkNotificationsRead}
                disabled={isLoading}
              >
                {isLoading ? "Marking..." : "Mark all as read"}
              </button>
            </div>
            <div className="max-h-[320px] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border-b p-3 dark:border-gray-600 ${
                    !notification.isRead ? "bg-gray-50 dark:bg-gray-700" : ""
                  }`}
                >
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium">
                      {notification.title}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatRelativeTime(notification.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {notification.message}
                  </p>
                </div>
              ))}
            </div>
            <Link href="/admin/notifications" className="flex-center-center">
              <button className="p-2 text-center text-xs text-brand hover:text-brand-pink">
                View all notifications
              </button>
            </Link>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
