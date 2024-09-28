"use client";

import { Home2 } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsGrid } from "react-icons/bs";

interface BreadcrumbProps {
  separator: string | React.ReactNode;
}

const Breadcrumbs: React.FC<BreadcrumbProps> = ({ separator }) => {
  const pathname = usePathname();
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment !== "" && segment !== "admin");

  // Exclude UUIDs from the breadcrumb
  const excludePaths = (path: string) =>
    !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
      path,
    );
  const filteredPaths = pathSegments.filter(excludePaths);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="list-none flex-wrap flex-align-center">
        <li className="flex-align-center">
          <Link
            href="/admin"
            className="rounded px-2 py-[3px] text-brand flex-align-center hover:bg-gray-100 hover:underline dark:hover:bg-gray-900"
          >
            <Home2 size={20} variant="Bulk" className="text-muted-foreground" />
            <span className="ml-2">Dashboard</span>
          </Link>
          {filteredPaths.length > 0 && <span>{separator}</span>}
        </li>
        {filteredPaths.map((path, index) => {
          if (path !== "/") {
            return (
              <li key={index} className="flex-align-center">
                {index !== filteredPaths.length - 1 ? (
                  <>
                    <Link
                      href={`/admin/${filteredPaths
                        .slice(0, index + 1)
                        .join("/")}`}
                      className="rounded px-2 py-[3px] text-sm capitalize text-brand hover:bg-gray-100 hover:underline dark:hover:bg-gray-900"
                    >
                      {path.replace(/[-]+/g, " ")}
                    </Link>
                    <span>
                      {index < filteredPaths.length - 1 && (
                        <span>{separator}</span>
                      )}
                    </span>
                  </>
                ) : (
                  <div className="shrink-0 text-sm capitalize">
                    {path.replace(/[-]+/g, " ")}
                  </div>
                )}
              </li>
            );
          }
          return null;
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
