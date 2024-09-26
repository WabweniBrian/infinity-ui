"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Moon, Sun } from "lucide-react";

const ThemeSwicher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Tabs defaultValue={theme}>
      <TabsList className="!h-fit flex-col gap-0 rounded-full border shadow-xl dark:bg-slate-900/80">
        <TabsTrigger
          value="light"
          onClick={() => setTheme("light")}
          className="rounded-full px-1.5 py-3 data-[state=active]:bg-brand data-[state=active]:text-white"
        >
          <Sun className="h-4 w-4" />
        </TabsTrigger>
        <TabsTrigger
          value="dark"
          onClick={() => setTheme("dark")}
          className="rounded-full px-1.5 py-3 data-[state=active]:bg-brand data-[state=active]:text-white"
        >
          <Moon className="h-4 w-4 rotate-90 transition-all dark:rotate-0" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwicher;
