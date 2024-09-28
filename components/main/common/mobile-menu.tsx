"use client";

import { navbarLinks } from "@/data/navbar-links";
import { cn } from "@/lib/utils";
import { HambergerMenu, TagCross } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const MobileMenu = () => {
  const mobileWrapperRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    mobileWrapperRef.current!.style.height = isMobileMenuOpen ? "100vh" : "0px";
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div ref={mobileMenuRef}>
      <button
        className="cursor-default rounded-lg bg-gray-800 p-2 hover:bg-gray-900 sm:cursor-pointer md:hidden"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? <TagCross /> : <HambergerMenu />}
      </button>

      <div
        ref={mobileWrapperRef}
        className="absolute left-0 top-full h-0 w-full overflow-hidden bg-gray-800 transition-all duration-300"
      >
        <div ref={mobileNavRef} className="p-4" onClick={closeMobileMenu}>
          <ul className="nav-links space-y-4">
            {navbarLinks.map((link) => {
              const isActive =
                pathname === link.url ||
                (pathname.startsWith(link.url) && link.url !== "/");
              return (
                <li key={link.linkText}>
                  <Link
                    href={link.url}
                    className={cn(
                      "font-semibold transition-all hover:text-brand",
                      isActive && "text-brand",
                    )}
                  >
                    {link.linkText}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
