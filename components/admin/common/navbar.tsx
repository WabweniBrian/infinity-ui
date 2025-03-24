import { SessionUser } from "@/types";
import { Menu } from "lucide-react";
import DarkModeToggle from "./dark-mode-toggle";
import NotificationsDropdown from "./notifications-dropdown";
import ProfileDropdown from "./profile-dropdown";

type Notification = {
  id: string;
  isRead: boolean | null;
  title: string;
  message: string;
  createdAt: Date;
};

interface NavbarProps {
  toggleSidebar: () => void;
  user: SessionUser;
  unreadNotifications: number;
  notifications: Notification[];
}

export const Navbar = ({
  toggleSidebar,
  user,
  notifications,
  unreadNotifications,
}: NavbarProps) => {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <h1 className="hidden text-lg font-semibold lg:block">Dashboard</h1>
        <button
          className="rounded-xl p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <NotificationsDropdown
            notifications={notifications}
            unreadNotifications={unreadNotifications}
          />
          <ProfileDropdown user={user} />
        </div>
      </div>
    </header>
  );
};
