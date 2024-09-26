import { cn } from "@/lib/utils";
import Image from "next/image";

const NoResults = ({
  title,
  imageUrl = "/no-results.png",
  className,
}: {
  title: string;
  imageUrl?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn("h-full w-full text-center flex-center-center", className)}
    >
      <div>
        <div className="relative mx-auto h-36 w-36 dark:opacity-60">
          <Image
            src={imageUrl}
            alt="No results"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-xl font-bold text-muted-foreground">{title}</h1>
      </div>
    </div>
  );
};

export default NoResults;
