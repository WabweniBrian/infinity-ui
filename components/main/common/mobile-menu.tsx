"use client";

import KoFiButton from "@/components/common/kofi-button";
import { Button } from "@/components/ui/button";
import { cn, generateSlug } from "@/lib/utils";
import type { SessionUser } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsGithub } from "react-icons/bs";

interface MobileMenuProps {
  categories: { id: string; name: string }[];
  user: SessionUser;
}

const MobileMenu = ({ categories, user }: MobileMenuProps) => {
  const mobileWrapperRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    mobileWrapperRef.current!.style.height = isMobileMenuOpen ? "70vh" : "0px";
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

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Animation variants for dropdown content
  const dropdownVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.1 },
      },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
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
        <div ref={mobileNavRef} className="p-4">
          <ul className="nav-links space-y-4 pb-4">
            {/* Components Link */}
            <li>
              <Link
                href="/components"
                className={cn(
                  "font-semibold transition-all hover:text-brand",
                  pathname === "/components" && "text-brand",
                )}
                onClick={closeMobileMenu}
              >
                Components
              </Link>
            </li>

            {/* Categories Dropdown */}
            <li>
              <button
                onClick={() => toggleSection("categories")}
                className="flex w-full items-center justify-between font-semibold transition-all hover:text-brand"
              >
                Categories
                <motion.div
                  animate={{
                    rotate: expandedSection === "categories" ? 180 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedSection === "categories" && (
                  <motion.ul
                    className="ml-4 mt-2 space-y-2 overflow-hidden"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                  >
                    {categories.map((category) => (
                      <li key={category.id}>
                        <Link
                          href={`/categories/${generateSlug(category.name)}`}
                          className="text-sm hover:text-brand"
                          onClick={closeMobileMenu}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Backgrounds Link */}
            <li>
              <Link
                href="https://bgvault.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold transition-all hover:text-brand"
                onClick={closeMobileMenu}
              >
                Backgrounds
              </Link>
            </li>

            {/* FAQs Link */}
            {/* <li>
              <Link
                href="/faqs"
                className={cn(
                  "font-semibold transition-all hover:text-brand",
                  pathname === "/faqs" && "text-brand",
                )}
                onClick={closeMobileMenu}
              >
                FAQs
              </Link>
            </li> */}

            {/* Support Link */}
            <li>
              <Link
                href="/support"
                className={cn(
                  "font-semibold transition-all hover:text-brand",
                  pathname === "/support" && "text-brand",
                )}
                onClick={closeMobileMenu}
              >
                Support
              </Link>
            </li>
          </ul>

          {/* External Links */}
          <div className="flex items-center gap-4 border-t pb-4 pt-4">
            {/* GitHub Link */}
            <Link
              href="https://github.com/WabweniBrian/infinity-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:text-brand"
              aria-label="GitHub Repository"
              onClick={closeMobileMenu}
            >
              <BsGithub className="h-5 w-5" />
            </Link>

            {/* Ko-fi Support Button */}
            <KoFiButton />
          </div>

          {/* Admin Panel Button (if logged in as Admin) */}
          {user && user.role === "Admin" && (
            <div className="border-t pt-4">
              <Button variant="secondary" asChild className="w-full">
                <Link href="/admin" onClick={closeMobileMenu}>
                  Admin Panel
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
