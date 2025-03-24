"use client";

import { motion } from "framer-motion";
import AddNotification from "./add-notification";

interface NotificationsHeaderProps {
  users: { id: string; name: string }[];
}

export const NotificationsHeader = ({ users }: NotificationsHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage and send notifications to your users
          </p>
        </div>
        <AddNotification users={users} />
      </div>
    </motion.div>
  );
};
