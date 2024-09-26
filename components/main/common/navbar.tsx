"use client";

import { navbarLinks } from "@/data/navbar-links";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="fixed left-0 top-0 z-[999] w-full py-2 backdrop-blur-lg border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3">
        {/* Logo */}
        <div>
          <Link
            className="flex items-center gap-2 font-semibold text-brand md:text-base"
            href="/"
          >
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="Infinity UI Logo"
              className="object-contain"
            />
            <span className="hidden text-xl sm:block">Infinity UI</span>
          </Link>
        </div>

        {/* Links */}
        {/* Desktop Links */}
        <ul className="nav-links hidden space-x-10 md:flex">
          {navbarLinks.map((link) => {
            const isActive =
              pathname === link.url ||
              (pathname.startsWith(link.url) && link.url !== "/");
            return (
              <li key={link.linkText}>
                <Link
                  href={link.url}
                  className={cn(
                    "transition-all hover:text-brand",
                    isActive && "text-brand",
                  )}
                >
                  {link.linkText}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Links */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
