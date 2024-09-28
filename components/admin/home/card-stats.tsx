import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CardProps {
  icon: JSX.Element;
  title: string;
  value: number;
  url: string;
}

const CardStats = ({ icon, title, value, url }: CardProps) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white/70 dark:bg-accent/20">
      <div className="p-4">
        <div className="flex gap-2">
          <div>{icon}</div>
          <div>
            <span className="text-sm uppercase text-muted-foreground">
              {title}
            </span>
            <h1 className="text-2xl font-semibold md:text-3xl">
              {title === "revenue" && "$ "}
              {Number(value).toLocaleString()}
            </h1>
          </div>
        </div>
      </div>
      <Link
        href={url}
        className="group border-t bg-accent py-2 flex-center-center"
      >
        <span className="group-hover:text-brand">View</span>
        <span>
          <ArrowRight className="ml-1 h-4 w-4 transition-a group-hover:translate-x-1 group-hover:text-brand" />
        </span>
      </Link>
    </div>
  );
};

export default CardStats;
