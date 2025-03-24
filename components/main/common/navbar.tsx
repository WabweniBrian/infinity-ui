"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobile-menu";
import NavbarSearch from "./navbar-search";
import { SessionUser } from "@/types";

interface NavbarProps {
  categories: { id: string; name: string; slug: string }[];
  user: SessionUser;
}

const Navbar = ({ categories, user }: NavbarProps) => {
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
                const href = `/categories/${link.slug}`;
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
          {user ? (
            <Button variant="secondary" asChild>
              <Link href={`${user.role === "Admin" ? "/admin" : "/dashboard"}`}>
                {user.role === "Admin" ? "Admin Panel" : "Dashboard"}
              </Link>
            </Button>
          ) : (
            <div className="gap-x-2 flex-align-center">
              <Button variant="secondary" asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Links */}
        <div className="md:hidden">
          <div className="gap-x-2 flex-align-center">
            <NavbarSearch />
            <MobileMenu categories={categories} user={user} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
