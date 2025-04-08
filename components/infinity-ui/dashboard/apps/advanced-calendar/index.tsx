"use client";

import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { CalendarProvider } from "@/lib/calendar-context";
import { CalendarLayout } from "./calendar-layout";

const AdvancedCalendar = () => {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CalendarProvider>
      <CalendarLayout />
      <Toaster />
    </CalendarProvider>
  );
};

export default AdvancedCalendar;
