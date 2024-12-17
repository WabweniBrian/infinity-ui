"use client";

import { navbarLinks } from "@/data/navbar-links";
import { cn, generateSlug } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobile-menu";
import { Button } from "@/components/ui/button";
import NavbarSearch from "./navbar-search";

interface NavbarProps {
  categories: { id: string; name: string }[];
}

const Navbar = ({ categories }: NavbarProps) => {
  const pathname = usePathname();
  return (
    <header className="fixed left-0 top-0 z-50 w-full px-2">
      <nav className="mx-auto mt-4 flex max-w-7xl items-center justify-between rounded-xl border bg-background/70 px-3 py-2 backdrop-blur-lg">
        {/* Logo */}
        <div>
          <Link
            className="flex items-center gap-2 font-semibold text-brand md:text-base"
            href="/"
          >
            <Image
              src="/logo.png"
              width={80}
              height={80}
              alt="Infinity UI Logo"
              className="w-16 object-contain"
            />
            <span className="hidden text-2xl sm:block">Infinity UI</span>
          </Link>
        </div>

        {/* Links */}
        {/* Desktop Links */}
        <div className="hidden gap-x-10 md:flex-align-center">
          <div className="gap-x-3 flex-align-center">
            <ul className="nav-links flex space-x-6">
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
            <NavbarSearch />
          </div>
          <div className="gap-x-2 flex-align-center">
            <Button variant="secondary" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Links */}
        <div className="md:hidden">
          <div className="gap-x-2 flex-align-center">
            <NavbarSearch />
            <MobileMenu categories={categories} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
