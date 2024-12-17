"use client";

import { Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce";
import { getAutocompleteSuggestions } from "@/lib/actions/search";

const NavbarSearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { plain: string; highlighted: string }[]
  >([]);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();

  useEffect(() => {
    if (debouncedQuery) {
      getAutocompleteSuggestions(debouncedQuery).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedQuery]);

  const handleSelect = (item: string) => {
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(item)}`);
  };

  const handleSearch = () => {
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-9 px-0 md:w-60 md:justify-start md:px-3"
        >
          <Search className="h-4 w-4 md:mr-2" />
          <span className="hidden md:inline-flex">Search components...</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <div className="flex flex-col">
          <Input
            placeholder="Search components..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0"
          />
          {suggestions.length > 0 ? (
            <ul className="max-h-96 overflow-auto py-2">
              {suggestions.map((item, index) => (
                <li
                  key={`${item.plain}-${index}`}
                  className="cursor-pointer px-4 py-2 lowercase hover:bg-accent"
                  onClick={() => handleSelect(item.plain)}
                >
                  <Search className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
                  {/* Render highlighted suggestion */}
                  <span
                    dangerouslySetInnerHTML={{ __html: item.highlighted }}
                  />
                </li>
              ))}
            </ul>
          ) : query ? (
            <p
              className="cursor-pointer px-4 py-2 hover:bg-accent"
              onClick={handleSearch}
            >
              <Search className="mr-2 inline-block h-4 w-4 text-muted-foreground" />
              Search for &quot;{query}&quot;
            </p>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NavbarSearch;
