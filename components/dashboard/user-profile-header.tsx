"use client";

import { formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import LogoutButton from "../auth/logout-button";

interface UserProfileHeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    isActive: boolean;
    createdAt: Date;
  };
}

export const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <div className="flex flex-col justify-center md:flex-row md:justify-between">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md">
            <Image
              src={user?.image || "/images/default-avatar.png"}
              alt={user?.name!}
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.name!}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">{user?.email!}</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Member since {formatDate(user.createdAt)}
            </p>
          </div>
        </div>
        <div className="mx-auto mt-1 w-fit md:mx-0 md:mt-0">
          <LogoutButton />
        </div>
      </div>
    </motion.div>
  );
};
