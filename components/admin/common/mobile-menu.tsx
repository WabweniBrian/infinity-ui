"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Links from "./links";
import { useState } from "react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={() => setOpen(!open)}>
        <SheetTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            className="rounded-lg dark:bg-gray-900"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <Links isMobileMenu setOpen={setOpen} />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileMenu;
