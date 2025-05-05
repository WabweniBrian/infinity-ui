"use client";

import KoFiButton from "@/components/common/kofi-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsGithub } from "react-icons/bs";
import MobileMenu from "./mobile-menu";
import NavbarSearch from "./navbar-search";

interface NavbarProps {
  categories: { id: string; name: string; slug: string }[];
  user: SessionUser;
}

const Navbar = ({ categories, user }: NavbarProps) => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (dropdown: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay to prevent accidental closing
  };

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

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
        <div className="hidden items-center gap-x-6 md:flex">
          {/* Components Link */}
          <Link
            href="/components"
            className={cn(
              "font-semibold transition-all hover:text-brand",
              pathname === "/components" && "text-brand",
            )}
          >
            Components
          </Link>

          {/* Categories Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => handleMouseEnter("categories")}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 font-semibold transition-all hover:text-brand">
              Categories
              <motion.div
                animate={{ rotate: activeDropdown === "categories" ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            </button>

            <AnimatePresence>
              {activeDropdown === "categories" && (
                <motion.div
                  className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-md border bg-background p-2 shadow-md"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                >
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="block rounded-sm px-3 py-2 text-sm hover:bg-muted hover:text-brand"
                    >
                      {category.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* External Backgrounds Link */}
          <Link
            href="https://bgvault.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold transition-all hover:text-brand"
          >
            Backgrounds
          </Link>

          {/* FAQs Link */}
          {/* <Link
            href="/faqs"
            className={cn(
              "font-semibold transition-all hover:text-brand",
              pathname === "/faqs" && "text-brand",
            )}
          >
            FAQs
          </Link> */}

          {/* Support Link */}
          <Link
            href="/support"
            className={cn(
              "font-semibold transition-all hover:text-brand",
              pathname === "/support" && "text-brand",
            )}
          >
            Support
          </Link>

          <NavbarSearch />

          <div className="flex items-center gap-x-4">
            {/* GitHub Link */}
            <Link
              href="https://github.com/WabweniBrian/infinity-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:text-brand"
              aria-label="GitHub Repository"
            >
              <BsGithub className="h-5 w-5" />
            </Link>

            {/* Ko-fi Support Button */}
            <KoFiButton />

            {/* Admin Panel Button (if logged in) */}
            {user && user.role === "Admin" && (
              <Button variant="secondary" asChild>
                <Link href="/admin">Admin Panel</Link>
              </Button>
            )}
          </div>
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
