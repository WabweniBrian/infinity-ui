"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

const SearchInput = ({
  className,
  inputClassName,
  placeholder = "Search...hit enter after",
}: {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const search = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(search);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      if (!value) params.delete(name);
      params.delete("page");
      return params.toString();
    },
    [searchParams],
  );

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`${pathname}?${createQueryString("search", searchTerm)}`);
  };

  return (
    <form onSubmit={onSubmit} className={cn("w-full sm:w-fit", className)}>
      <div className="relative">
        <div className="absolute left-2 top-1/2 z-10 -translate-y-1/2">
          <BiSearchAlt />
        </div>
        <Input
          placeholder={placeholder}
          className={cn("pl-8", inputClassName)}
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchInput;
