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
  disabled?: boolean;
}

const RowActions = ({ actions }: { actions: RowAction[] }) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="h-8 w-8 !border-0 bg-transparent"
          >
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.text}
              asChild
              disabled={action.disabled}
            >
              {action.link ? (
                <Link
                  href={action.url || ""}
                  className="gap-x-2 flex-align-center"
                >
                  {action.icon}
                  <span>{action.text}</span>
                </Link>
              ) : (
                <div
                  className={cn(
                    "gap-x-2 flex-align-center",
                    action.text === "Delete" && "!text-red-500",
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
