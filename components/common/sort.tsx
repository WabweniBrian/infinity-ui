"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Option = {
  label: string;
  value: string;
};

interface SortProps {
  options: Option[];
}

const Sort = ({ options }: SortProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (sort: string) => {
      const params = new URLSearchParams(searchParams);
      if (sort !== "none") {
        params.set("sort", sort);
      } else {
        params.delete("sort");
      }
      return params.toString();
    },
    [searchParams],
  );

  const handleSortChange = (value: string) => {
    const updatedQueryString = createQueryString(value);

    router.push(`${pathname}?${updatedQueryString}`, { scroll: false });
  };

  return (
    <div className="w-fit">
      <Select onValueChange={(value) => handleSortChange(value)}>
        <SelectTrigger className="rounded-full bg-accent/50 sm:w-[200px]">
          <SelectValue placeholder="Sort By:" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">None</SelectItem>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Sort;
