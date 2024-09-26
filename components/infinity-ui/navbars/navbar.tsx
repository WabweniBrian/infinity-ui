"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background shadow-md">
      <div className="mx-auto max-w-7xl px-3">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold">Brand</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                About
              </Link>
              <Link
                href="/services"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button>Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link
            href="/"
            className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/services"
            className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary"
          >
            Contact
          </Link>
        </div>
        <div className="border-t border-gray-200 pb-3 pt-4 dark:border-gray-700">
          <Button className="w-full">Get Started</Button>
        </div>
      </div>
    </nav>
  );
}
