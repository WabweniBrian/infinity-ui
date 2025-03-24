"use client";

import { Button } from "@/components/ui/button";
import { KeywordWithCount } from "@/lib/actions/home/keywords";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface KeywordListProps {
  initialKeywords: KeywordWithCount[];
}

const KeywordList = ({ initialKeywords }: KeywordListProps) => {
  const [keywords, setKeywords] = useState(initialKeywords);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const toggleKeyword = (keyword: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const activeKeyword = current.get("keyword");

    if (activeKeyword === keyword) {
      // Deselect the keyword if it's already active
      current.delete("keyword");
    } else {
      // Set the selected keyword
      current.set("keyword", keyword);
    }

    const search = current.toString();
    const query = search ? `${search}` : "";
    router.push(`${pathname}?${query}`);
  };

  return (
    <div className="max-h-[150px] overflow-y-auto">
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => {
          const isActive = searchParams.get("keyword") === keyword.keyword;
          return (
            <Button
              key={keyword.keyword}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => toggleKeyword(keyword.keyword)}
              className="rounded-full"
            >
              {keyword.keyword}
              <span className="ml-2 h-6 w-6 shrink-0 rounded-full border bg-accent/50 text-xs flex-center-center">
                {keyword.count}
              </span>
            </Button>
          );
        })}
      </div>
      {keywords.length === 0 && null}
    </div>
  );
};

export default KeywordList;
