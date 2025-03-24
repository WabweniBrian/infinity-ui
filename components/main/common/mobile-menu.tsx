"use client";

import { Button } from "@/components/ui/button";
import { cn, generateSlug } from "@/lib/utils";
import { SessionUser } from "@/types";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface MobileMenuProps {
  categories: { id: string; name: string }[];
  user: SessionUser;
}

const MobileMenu = ({ categories, user }: MobileMenuProps) => {
  const mobileWrapperRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    mobileWrapperRef.current!.style.height = isMobileMenuOpen ? "60vh" : "0px";
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
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500 dark:hover:bg-gray-900"
      >
        {isMobileMenuOpen ? (
          <X className="block h-5 w-5" />
        ) : (
          <Menu className="block h-5 w-5" />
        )}
      </button>

      <div
        ref={mobileWrapperRef}
        className={cn(
          "absolute left-0 top-full mt-2 h-0 w-full overflow-hidden rounded-xl bg-white transition-all duration-300 dark:bg-gray-950",
          isMobileMenuOpen && "border",
        )}
      >
        <div ref={mobileNavRef} className="p-4" onClick={closeMobileMenu}>
          <ul className="nav-links space-y-4 pb-4">
            {categories.map((link) => {
              const href = `/categories/${generateSlug(link.name)}`;
              const isActive =
                pathname === href ||
                (pathname.startsWith(href) && href !== "/");
              return (
                <li key={link.id}>
                  <Link
                    href={href}
                    className={cn(
                      "font-semibold transition-all hover:text-brand",
                      isActive && "text-brand",
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {user ? (
            <div className="border-t pt-6">
              <Button variant="secondary" asChild className="w-full">
                <Link
                  href={`${user.role === "Admin" ? "/admin" : "/dashboard"}`}
                >
                  {user.role === "Admin" ? "Admin Panel" : "Dashboard"}
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col space-y-2 border-t pt-6">
              <Button variant="secondary" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
