"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const FreeComponentToggle = ({ className = "" }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isfree, setIsFree] = useState(searchParams.get("isfree") === "true");

  useEffect(() => {
    setIsFree(searchParams.get("isfree") === "true");
  }, [searchParams]);

  const toggleFree = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (isfree) params.delete("isfree");
    else params.set("isfree", "true");

    const query = params.toString();
    router.push(`${pathname}?${query}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="free-component-toggle"
        checked={isfree}
        onCheckedChange={toggleFree}
      />
      <Label
        htmlFor="free-component-toggle"
        className={cn("cursor-pointer", className)}
      >
        Free
      </Label>
    </div>
  );
};

export default FreeComponentToggle;
