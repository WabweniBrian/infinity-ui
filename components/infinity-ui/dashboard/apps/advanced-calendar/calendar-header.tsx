"use client";

import type React from "react";

import { useState } from "react";
import {
  format,
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCalendarContext } from "@/lib/calendar-context";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "./theme-toggle";

export function CalendarHeader() {
  const {
    selectedDate,
    setSelectedDate,
    view,
    setView,
    isSidebarOpen,
    setIsSidebarOpen,
    searchEvents,
  } = useCalendarContext();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePrevious = () => {
    if (view === "day") {
      setSelectedDate(subDays(selectedDate, 1));
    } else if (view === "week") {
      setSelectedDate(subWeeks(selectedDate, 1));
    } else if (view === "month") {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  };

  const handleNext = () => {
    if (view === "day") {
      setSelectedDate(addDays(selectedDate, 1));
    } else if (view === "week") {
      setSelectedDate(addWeeks(selectedDate, 1));
    } else if (view === "month") {
      setSelectedDate(addMonths(selectedDate, 1));
    }
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchEvents(searchQuery);
  };

  const getHeaderTitle = () => {
    if (view === "day") {
      return format(selectedDate, "EEEE, MMMM d, yyyy");
    } else if (view === "week") {
      const startOfWeek = selectedDate;
      const endOfWeek = addDays(startOfWeek, 6);

      if (format(startOfWeek, "MMM") === format(endOfWeek, "MMM")) {
        return `${format(startOfWeek, "MMM d")} - ${format(endOfWeek, "d, yyyy")}`;
      } else if (format(startOfWeek, "yyyy") === format(endOfWeek, "yyyy")) {
        return `${format(startOfWeek, "MMM d")} - ${format(endOfWeek, "MMM d, yyyy")}`;
      } else {
        return `${format(startOfWeek, "MMM d, yyyy")} - ${format(endOfWeek, "MMM d, yyyy")}`;
      }
    } else {
      return format(selectedDate, "MMMM yyyy");
    }
  };

  return (
    <header className="border-b border-border">
      <div className="flex items-center justify-between p-2 md:p-4">
        <div className="flex items-center gap-2">
          {!isSidebarOpen && (
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={() => setIsSidebarOpen(true)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}

          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={handleToday}
            >
              Today
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <h1 className="truncate text-lg font-semibold md:text-xl">
            {getHeaderTitle()}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <form
              onSubmit={handleSearch}
              className="relative w-full max-w-[200px] md:max-w-xs"
            >
              <Input
                placeholder="Search events or tasks..."
                className="rounded-full pr-8"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => {
                  if (!searchQuery) {
                    setIsSearchOpen(false);
                  }
                }}
              />
              <button type="submit" className="absolute right-2.5 top-2.5">
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <div className="hidden md:block">
            <Tabs
              value={view}
              onValueChange={(v) => setView(v as any)}
              className="w-full"
            >
              <TabsList className="grid w-[240px] grid-cols-3 rounded-full bg-muted p-1">
                <TabsTrigger
                  value="day"
                  className="rounded-full data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Day
                </TabsTrigger>
                <TabsTrigger
                  value="week"
                  className="rounded-full data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Week
                </TabsTrigger>
                <TabsTrigger
                  value="month"
                  className="rounded-full data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Month
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ThemeToggle />

          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleToday}>Today</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView("day")}>
                  Day View {view === "day" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView("week")}>
                  Week View {view === "week" && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setView("month")}>
                  Month View {view === "month" && "✓"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
