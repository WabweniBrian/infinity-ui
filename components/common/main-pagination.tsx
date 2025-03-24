"use client";

import Pagination from "@/components/custom/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";

const MainPagination = ({ pages }: { pages: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  // Store previous params as a stringified object for comparison
  const previousParamsRef = useRef("");

  const handlePageChange = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams);
      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", page.toString());
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const page = searchParams.get("page");
    const newPage = page ? Number(page) : 1;

    // Create a copy of current params without the page parameter
    const currentParamsWithoutPage = new URLSearchParams(searchParams);
    currentParamsWithoutPage.delete("page");
    const currentParamsString = currentParamsWithoutPage.toString();

    // If any filter params changed (excluding page), reset to page 1
    if (currentParamsString !== previousParamsRef.current) {
      previousParamsRef.current = currentParamsString;
      if (newPage !== 1) {
        handlePageChange(1);
        return;
      }
    }

    setCurrentPage(newPage);
  }, [searchParams, handlePageChange]);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={pages}
      onPageChange={handlePageChange}
      icons
    />
  );
};

export default MainPagination;
