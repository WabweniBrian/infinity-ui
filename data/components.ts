export const componentsData = [
  {
    id: "1",
    name: "Navbar",
    slug: "navbar",
    category: "navbars",
    componentPath: "infinity-ui/navbars/navbar",
    codeSnippets: [
      {
        id: "1",
        fileName: "navbar.tsx",
        extension: "tsx",
        language: "jsx",
        code: `"use client";

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
        className={\`md:hidden \${
          isMenuOpen ? "block" : "hidden"
        } transition-all duration-300 ease-in-out\`}
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
`,
      },
      {
        id: "2",
        fileName: "global.css",
        extension: "css",
        language: "css",
        code: `input[type="checkbox"],
input[type="radio"] {
  @apply !h-5 !w-5 cursor-pointer !rounded !border !border-border bg-white !shadow-sm disabled:cursor-not-allowed disabled:opacity-50 dark:bg-transparent;
}

input[type="checkbox"] {
  @apply form-checkbox;
}

input[type="radio"] {
  @apply form-radio;
}

input[type="radio"] {
  @apply !rounded-full;
}

input[type="checkbox"]:checked,
input[type="radio"]:checked {
  @apply !border-brand !bg-brand text-brand !shadow-md !shadow-brand/30 !ring-brand !ring-offset-background hover:bg-brand focus:!ring-offset-background active:!bg-brand;
}

.form-checkbox:focus,
.form-radio:focus {
  @apply !ring-brand focus:!ring-offset-background;
}`,
      },
    ],
  },
  {
    id: "2",
    name: "Footer",
    slug: "footer",
    category: "footers",
    componentPath: "infinity-ui/footers/footer",
    codeSnippets: [
      {
        id: "1",
        fileName: "footer.tsx",
        extension: "tsx",
        language: "jsx",
        code: `import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-3">
        <div className="grid grid-cols-1 gap-8 py-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
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
              <span className="ml-2 text-xl font-bold text-foreground">
                Brand
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Solutions
            </h3>
            <ul className="space-y-2">
              {["Marketing", "Analytics", "Commerce", "Insights"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Support
            </h3>
            <ul className="space-y-2">
              {["Pricing", "Documentation", "Guides", "API Status"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Subscribe to our newsletter
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-foreground/10 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Company, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

`,
      },
    ],
  },
  {
    id: "3",
    name: "Hero",
    slug: "hero",
    category: "heros",
    componentPath: "infinity-ui/heros/hero",
    codeSnippets: [
      {
        id: "1",
        fileName: "hero.tsx",
        extension: "tsx",
        language: "jsx",
        code: `import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-background">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />

      {/* Hero Content */}
      <div className="relative mx-auto max-w-7xl px-3 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Text Content */}
          <div className="space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Revolutionize Your Workflow
            </h1>
            <p className="max-w-2xl text-xl text-muted-foreground">
              Streamline your processes, boost productivity, and take your
              business to new heights with our cutting-edge SaaS platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-4 pt-8">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <Image
                    key={i}
                    src={\`/images/1.png\`}
                    alt={\`User \${i + 1}\`}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-background"
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">2,000+</span>{" "}
                happy customers
              </p>
            </div>
          </div>

          {/* Image/Illustration */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-background" />
            <Image
              src="/images/bg.jpg"
              alt="SaaS Platform Illustration"
              width={600}
              height={600}
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="absolute h-[50rem] w-[90rem] -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}

`,
      },
    ],
  },
];

export type Component = (typeof componentsData)[number];
