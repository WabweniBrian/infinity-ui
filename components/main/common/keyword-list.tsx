"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface KeywordListProps {
  initialKeywords: string[];
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
    <div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => {
          const isActive = searchParams.get("keyword") === keyword;
          return (
            <Button
              key={keyword}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => toggleKeyword(keyword)}
              className="rounded-full"
            >
              {keyword}
            </Button>
          );
        })}
      </div>
      {keywords.length === 0 && null}
    </div>
  );
};

export default KeywordList;
