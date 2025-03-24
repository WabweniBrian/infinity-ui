"use client";

import Avatar from "@/components/common/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/use-auth";
import { SessionUser } from "@/types";
import { Globe, LogOut, UserCircle } from "lucide-react";
import Link from "next/link";

interface ProfileDropdownProps {
  user: SessionUser;
}

const ProfileDropdown = ({ user }: ProfileDropdownProps) => {
  const { logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="!outline-none" asChild>
        <button
          className="flex items-center gap-2 rounded-xl p-1 text-left hover:bg-gray-100 dark:hover:bg-gray-900"
          aria-label="User menu"
        >
          {user?.image ? (
            <Avatar size="small" src={user?.image} />
          ) : (
            <Avatar size="small" />
          )}
          <div className="hidden md:block">
            <div className="text-sm font-medium">{user?.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email}
            </div>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="rounded-2xl dark:border-gray-700 dark:bg-accent"
      >
        <DropdownMenuItem>
          <Link
            href={`/admin/profile`}
            className="cursor-pointer gap-x-2 flex-align-center"
          >
            {user?.image ? <Avatar src={user?.image} /> : <Avatar />}
            <div>
              <h1 className="text-xl">{user?.name}</h1>
              <span className="opacity-80">{user?.email}</span>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        <DropdownMenuItem asChild className="dark:hover:bg-gray-900/50">
          <Link
            href={`/admin/profile`}
            className="mt-1 cursor-pointer gap-x-2 flex-align-center"
          >
            <UserCircle className="h-5 w-5 text-muted-foreground" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="dark:hover:bg-gray-900/50">
          <Link
            href={`/`}
            className="mt-1 cursor-pointer gap-x-2 flex-align-center"
          >
            <Globe className="h-5 w-5 text-muted-foreground" />
            <span>Home</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        <DropdownMenuItem
          asChild
          className="dark:hover:bg-gray-900/50"
          onClick={() => logout()}
        >
          <div className="cursor-pointer gap-x-2 flex-align-center">
            <LogOut className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span>logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
