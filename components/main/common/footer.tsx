import Link from "next/link";
import {
  Facebook,
  Twitter,
  GitlabIcon as GitHub,
  Linkedin,
} from "lucide-react";
import Image from "next/image";
import { generateSlug } from "@/lib/utils";

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "License", href: "/license" },
];

const resourceLinks = [
  { name: "Pricing", href: "/pricing" },
  { name: "Faqs", href: "/faqs" },
  { name: "Support", href: "/support" },
];

interface FooterProps {
  categories: { id: string; name: string }[];
}

const Footer = ({ categories }: FooterProps) => {
  return (
    <footer className="bg-gray-200 text-gray-600 dark:bg-gray-900 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-wrap gap-8">
          <div className="flex-1 basis-[12rem]">
            <Image
              width={60}
              height={60}
              className="h-10 object-contain"
              src="/logo.png"
              alt="Infinity UI"
            />
            <p className="dark: my-2 text-base text-gray-500">
              Empowering developers to build beautiful, responsive, and
              accessible user interfaces with ease.
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <GitHub className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="flex-1 basis-[12rem]">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Components
            </h3>
            <ul className="mt-4 space-y-4">
              {categories.map((category) => {
                const href = `/categories/${generateSlug(category.name)}`;
                return (
                  <li key={category.name}>
                    <Link
                      href={href}
                      className="text-base hover:text-gray-900 dark:hover:text-gray-100"
                    >
                      {category.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex-1 basis-[12rem]">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 basis-[12rem]">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
          <p className="text-base xl:text-center">
            &copy; {new Date().getFullYear()} Infinity UI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
