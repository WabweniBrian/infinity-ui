"use client";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  User,
  X,
} from "lucide-react";

type Notification = {
  id: string;
  userId: string | null;
  type: string;
  isRead: boolean | null;
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

interface NotificationDetailsModalProps {
  notification: Notification;
  onClose: () => void;
}

export const NotificationDetailsModal = ({
  notification,
  onClose,
}: NotificationDetailsModalProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "System":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "Order":
        return "bg-brand/10 text-brand border border-brand";
      case "Payment":
        return "bg-brand-yellow/10 text-brand-yellow border border-brand-yellow";
      case "Component":
        return "bg-brand-pink/10 text-brand-pink border border-brand-pink";
      case "User":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800"
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex items-center">
              <div className="mr-4 rounded-lg bg-brand p-2 text-white">
                <Bell className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Notification Details
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  ID: {notification.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={onClose}
                title="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                  <div className="mb-4 flex items-center">
                    <Bell className="mr-2 h-5 w-5 text-brand" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Notification Information
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Title
                      </p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        {notification.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Type
                      </p>
                      <Badge
                        className={`mt-1 ${getTypeColor(notification.type)}`}
                      >
                        {notification.type}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Status
                      </p>
                      <Badge
                        className={`mt-1 ${notification.isRead ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"}`}
                      >
                        {notification.isRead ? (
                          <>
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Read
                          </>
                        ) : (
                          <>
                            <AlertCircle className="mr-1 h-3 w-3" />
                            Unread
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                  <div className="mb-4 flex items-center">
                    <User className="mr-2 h-5 w-5 text-brand-pink" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      User Association
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Associated To
                      </p>
                      <p className="text-base font-medium text-gray-900 dark:text-white">
                        {notification.user
                          ? notification.user.name
                          : "All Users"}
                      </p>
                      {notification.user && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {notification.user.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Date Sent
                      </p>
                      <div className="mt-1 flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
                  Message
                </h3>
                <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
