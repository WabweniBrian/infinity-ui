"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import { Navbar } from "./navbar";
import { SessionUser } from "@/types";
import useSidebar from "@/hooks/use-sidebar";

type Notification = {
  id: string;
  isRead: boolean | null;
  title: string;
  message: string;
  createdAt: Date;
};

interface AdminLayoutProps {
  user: SessionUser;
  notifications: Notification[];
  unreadNotifications: number;
  children?: React.ReactNode;
}

const AdminLayout = ({
  children,
  user,
  notifications,
  unreadNotifications,
}: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isCollapsed } = useSidebar();
  const [isMounted, setIsMounted] = useState(false);

  // Handle sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set mounted to true
    setIsMounted(true);

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex h-screen bg-main dark:bg-gray-950">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-x-hidden transition-all duration-300">
        <Navbar
          toggleSidebar={toggleSidebar}
          user={user}
          notifications={notifications}
          unreadNotifications={unreadNotifications}
        />

        {/* Page Content */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-10 pt-8 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
