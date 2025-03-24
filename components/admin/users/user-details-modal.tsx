"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { AuthMenthod, PaymentStatus, UserRole } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  Calendar,
  Check,
  Mail,
  Shield,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Purchase = {
  id: string;
  amount: number;
  date: Date;
  status: PaymentStatus;
  component: {
    name: string;
  } | null;
};

type Notification = {
  id: string;
  createdAt: Date;
  isRead: boolean | null;
  title: string;
  message: string;
};

type UserType = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  isEmailVerified: boolean | null;
  image: string | null;
  hasPurchased: boolean;
  method: AuthMenthod;
  createdAt: Date;
  updatedAt: Date;
  purchases: Purchase[];
  notifications: Notification[];
};

interface UserDetailsModalProps {
  user: UserType;
  onClose: () => void;
  onEmailUser: () => Promise<void>;
}

export const UserDetailsModal = ({
  user,
  onClose,
  onEmailUser,
}: UserDetailsModalProps) => {
  const [activeTab, setActiveTab] = useState("profile");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "FAILED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
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
          className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-800"
        >
          <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
            <div className="flex items-center">
              <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={user.image || "/images/default-avatar.png"}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  User ID: {user.id}
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

          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "profile"
                  ? "border-b-2 border-brand text-brand"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 inline-block h-4 w-4" />
              Profile
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "purchases"
                  ? "border-b-2 border-brand text-brand"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("purchases")}
            >
              <ShoppingBag className="mr-2 inline-block h-4 w-4" />
              Purchases
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === "notifications"
                  ? "border-b-2 border-brand text-brand"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              <Bell className="mr-2 inline-block h-4 w-4" />
              Notifications
            </button>
          </div>

          <div className="max-h-[calc(90vh-8rem)] overflow-y-auto">
            {activeTab === "profile" && (
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                    <div className="mb-4 flex items-center">
                      <User className="mr-2 h-5 w-5 text-brand" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        User Information
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Name
                        </p>
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Email
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            {user.email}
                          </p>
                          {user.isEmailVerified ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                              <Check className="mr-1 h-3 w-3" />
                              Verified
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Unverified
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Authentication Method
                        </p>
                        <p className="text-base font-medium capitalize text-gray-900 dark:text-white">
                          {user.method.replace("_", " ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
                    <div className="mb-4 flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-brand-pink" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Account Details
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Role
                        </p>
                        <Badge
                          className={`mt-1 ${
                            user.role === "Admin"
                              ? "border-brand-pink bg-brand-pink/10 text-brand-pink"
                              : "border-brand bg-brand/10 text-brand"
                          } border`}
                        >
                          {user.role}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Member Since
                        </p>
                        <div className="mt-1 flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            {formatDate(user.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Purchase Status
                        </p>
                        <Badge
                          className={`mt-1 ${
                            user.hasPurchased
                              ? "border-brand-yellow bg-brand-yellow/10 text-brand-yellow"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                          } border`}
                        >
                          {user.hasPurchased ? "Has Purchased" : "No Purchases"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50 md:col-span-2">
                    <div className="mb-4 flex items-center">
                      <Mail className="mr-2 h-5 w-5 text-brand-yellow" />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Contact User
                      </h3>
                    </div>
                    <Button
                      className="bg-brand hover:bg-brand/90"
                      onClick={onEmailUser}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "purchases" && (
              <div className="p-6">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  Purchase History
                </h3>
                {user.hasPurchased && user.purchases.length > 0 ? (
                  <div className="space-y-4">
                    {user.purchases.map((purchase) => (
                      <div
                        key={purchase.id}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h4 className="text-base font-medium text-gray-900 dark:text-white">
                              {purchase?.component?.name || "Component bundle"}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {formatDate(purchase.date)}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              ${purchase.amount.toFixed(2)}
                            </p>
                            <Badge className={getStatusColor(purchase.status)}>
                              {purchase.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-700/50">
                    <ShoppingBag className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                      No Purchases
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      This user hasn&apos;t made any purchases yet.
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="p-6">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  Notifications
                </h3>
                {user.notifications.length > 0 ? (
                  <div className="space-y-4">
                    {user.notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`rounded-lg border border-gray-200 p-4 dark:border-gray-700 ${
                          !notification.isRead
                            ? "bg-gray-50 dark:bg-gray-700/50"
                            : ""
                        }`}
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <h4 className="text-base font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </h4>
                          <Badge
                            className={
                              notification.isRead
                                ? "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                                : "bg-brand/10 text-brand"
                            }
                          >
                            {notification.isRead ? "Read" : "Unread"}
                          </Badge>
                        </div>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-700/50">
                    <Bell className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <h3 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
                      No Notifications
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      This user hasn&apos;t received any notifications yet.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
