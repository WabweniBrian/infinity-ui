"use client";

import { adminLinks } from "@/data/admin-links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const Links = ({
  isMobileMenu = false,
  setOpen,
}: {
  isMobileMenu?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  return (
    <ul
      className={cn(
        "gap-x-4 flex-align-center",
        isMobileMenu && "flex-col !items-start gap-x-0",
      )}
    >
      {adminLinks.map((link) => {
        const isActive =
          pathname === link.url ||
          (pathname.startsWith(link.url) && link.url !== "/admin");

        return (
          <li className="shrink-0" key={link.linkText}>
            <Link
              href={link.url}
              className={cn(
                isActive && "text-brand",
                isMobileMenu && "block px-0 py-2",
              )}
              onClick={() => (setOpen ? setOpen(false) : {})}
            >
              {link.linkText}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Links;
