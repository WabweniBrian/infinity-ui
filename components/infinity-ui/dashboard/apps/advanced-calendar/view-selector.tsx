"use client";

import { useViewStore } from "@/lib/view-store";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ViewSelector() {
  const { view, setView } = useViewStore();

  return (
    <div className="mb-6">
      {/* @ts-ignore */}
      <Tabs value={view} onValueChange={setView} className="w-full">
        <TabsList className="grid w-full max-w-xs grid-cols-3 rounded-full bg-slate-100 p-1 dark:bg-slate-800">
          <TabsTrigger
            value="day"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0093B8] data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700"
          >
            Day
          </TabsTrigger>
          <TabsTrigger
            value="week"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0093B8] data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700"
          >
            Week
          </TabsTrigger>
          <TabsTrigger
            value="month"
            className="rounded-full data-[state=active]:bg-white data-[state=active]:text-[#0093B8] data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700"
          >
            Month
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
