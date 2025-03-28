"use client";

import MainPagination from "@/components/common/main-pagination";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useState } from "react";
import UsersBulkActions from "./bulk-actions";
import UserActions from "./user-actions";
import { formatDate } from "@/lib/utils";
import { AuthMenthod, UserRole } from "@prisma/client";

type User = {
  role: UserRole;
  isActive: boolean;
  id: string;
  name: string;
  email: string;
  password: string | null;
  isEmailVerified: boolean | null;
  image: string | null;
  hasPurchased: boolean;
  method: AuthMenthod;
  createdAt: Date;
};

interface UsersTableProps {
  users: User[];
  usersCount: number;
  totalUsers: number;
  totalPages: number;
  offset: number;
}

export const UsersTable = ({
  users,
  usersCount,
  totalUsers,
  totalPages,
  offset,
}: UsersTableProps) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const allSelected = users.length > 0 && selectedUsers.length === users.length;

  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const getStatusColor = (status: boolean) => {
    return status
      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
  };

  const getRoleColor = (role: string) => {
    return role === "Admin"
      ? "bg-brand-pink/10 text-brand-pink border-brand-pink"
      : "bg-brand/10 text-brand border-brand";
  };

  const getPurchaseColor = (hasPurchased: boolean) => {
    return hasPurchased
      ? "bg-brand-yellow/10 text-brand-yellow border-brand-yellow"
      : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  };

  return (
    <>
      <div className="mb-4 flex justify-end text-xl font-bold md:text-2xl">
        {usersCount} user(s)
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
        {selectedUsers.length > 0 && (
          <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {selectedUsers.length} user
                {selectedUsers.length !== 1 ? "s" : ""} selected
              </span>
            </div>
            <UsersBulkActions
              ids={selectedUsers}
              setSelectedIds={setSelectedUsers}
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
                      aria-label="Select all users"
                    />
                    <label htmlFor="select-all" className="sr-only">
                      Select all
                    </label>
                    User
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Role
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Verification
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Auth Method
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Purchase Status
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Join Date
                </th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.length === 0 ? (
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
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="mr-3">
                          <Checkbox
                            id={`select-${user.id}`}
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => toggleSelectUser(user.id)}
                            aria-label={`Select ${user.name}`}
                          />
                        </div>
                        <div className="relative mr-3 h-10 w-10 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={
                              user.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                            }
                            alt={user.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </div>
                          <span
                            className={`rounded-full border px-2 py-1 text-xs ${user.isActive ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"}`}
                          >
                            {user.isActive ? "Active" : "Deactivated"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`rounded-full border px-2 py-1 text-xs ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${getStatusColor(user.isEmailVerified!)}`}
                      >
                        {user.isEmailVerified ? "Verified" : "Unverified"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="rounded-full border px-2 py-1 text-xs">
                        {user.method}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`rounded-full border px-2 py-1 text-xs ${getPurchaseColor(user.hasPurchased)}`}
                      >
                        {user.hasPurchased ? "Has Purchased" : "No Purchases"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <UserActions
                        id={user.id}
                        role={user.role}
                        isActive={user.isActive}
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
              {offset + 1} - {offset + users.length}
            </span>{" "}
            of <span className="font-medium">{totalUsers}</span> users
          </div>

          {/* Pagination */}
          <div>{totalPages > 1 && <MainPagination pages={totalPages} />}</div>
        </div>
      </div>
    </>
  );
};
