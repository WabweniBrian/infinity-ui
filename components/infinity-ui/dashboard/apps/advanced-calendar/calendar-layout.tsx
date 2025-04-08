"use client";

import { useEffect } from "react";
import { CalendarSidebar } from "./calendar-sidebar";
import { CalendarHeader } from "./calendar-header";
import { CalendarContent } from "./calendar-content";
import { EventModal } from "./event-modal";
import { useCalendarContext } from "@/lib/calendar-context";
import useMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export function CalendarLayout() {
  const { isSidebarOpen, setIsSidebarOpen } = useCalendarContext();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  // Auto-close sidebar on mobile, auto-open on desktop
  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop, setIsSidebarOpen]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <CalendarSidebar />

      <main
        className={cn(
          "flex h-full flex-1 flex-col transition-all duration-300 ease-in-out",
          isSidebarOpen && "lg:ml-[280px]",
        )}
      >
        <CalendarHeader />
        <CalendarContent />
      </main>

      <EventModal />
    </div>
  );
}
