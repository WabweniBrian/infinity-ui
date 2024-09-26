import Link from "next/link";
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
