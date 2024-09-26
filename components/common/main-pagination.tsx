"use client";

import Pagination from "@/components/custom/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const MainPagination = ({ pages }: { pages: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      if (Number(value) === 1) params.delete(name);
      return params.toString();
    },
    [searchParams],
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`${pathname}?${createQueryString("page", page.toString())}`, {
      scroll: false,
    });
  };

  return (
    <div className="mt-3">
      <Pagination
        currentPage={currentPage}
        totalPages={pages}
        onPageChange={handlePageChange}
        icons
        rounded
      />
    </div>
  );
};

export default MainPagination;
