import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const spinnerVariants = cva(
  "rounded-full border-brand !border-l-transparent dark:!border-l-transparent animate-spin",
  {
    variants: {
      size: {
        sm: "w-6 h-6 border",
        md: "w-12 h-12 border-2",
        lg: "h-16 w-16 border-2",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const Spinner = ({
  size,
  className,
}: {
  size: "sm" | "md" | "lg";
  className?: string;
}) => {
  return <div className={cn(spinnerVariants({ size, className }))} />;
};

export { Spinner, spinnerVariants };
