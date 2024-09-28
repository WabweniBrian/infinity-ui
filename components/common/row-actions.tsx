import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface RowAction {
  icon: JSX.Element;
  text: string;
  link?: boolean;
  url?: string;
  onclick?: () => void;
}

const RowActions = ({ actions }: { actions: RowAction[] }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="w-8 h-8  bg-transparent !border-0"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action) => (
            <DropdownMenuItem key={action.text} asChild>
              {action.link ? (
                <Link
                  href={action.url || ""}
                  className="flex-align-center gap-x-2"
                >
                  {action.icon}
                  <span>{action.text}</span>
                </Link>
              ) : (
                <div
                  className={cn(
                    "flex-align-center gap-x-2",
                    action.text === "Delete" && "!text-red-500"
                  )}
                  onClick={action.onclick}
                >
                  {action.icon}
                  <span>{action.text}</span>
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default RowActions;
