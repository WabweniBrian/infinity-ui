"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const FreeComponentToggle = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isfree, setIsFree] = useState(searchParams.get("isfree") === "true");

  useEffect(() => {
    setIsFree(searchParams.get("isfree") === "true");
  }, [searchParams]);

  const toggleFree = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (isfree) {
      current.delete("isfree");
    } else {
      current.set("isfree", "true");
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}?${query}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="free-component-toggle"
        checked={isfree}
        onCheckedChange={toggleFree}
      />
      <Label htmlFor="free-component-toggle">Show only free components</Label>
    </div>
  );
};

export default FreeComponentToggle;
