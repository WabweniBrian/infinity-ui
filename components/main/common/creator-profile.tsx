"use client";

import {
  Facebook,
  Github,
  Linkedin,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import KofiButton from "@/components/common/kofi-button";

export default function CreatorProfile() {
  return (
    <div className="mx-auto max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 md:text-5xl">
          Made with 💖 by:
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative overflow-hidden rounded-xl bg-white shadow-md dark:bg-zinc-900"
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative p-8">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="mb-6"
            >
              <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-gray-100 dark:border-zinc-800">
                <Image
                  src="/brian.png"
                  alt="Wabweni Brian"
                  width={112}
                  height={112}
                  className="object-cover object-top"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-center"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Wabweni Brian
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                I&apos;m Wabweni Brian, I guess I&apos;m just addicted to
                building nice stuff and i love it. ✨💻🚀
              </p>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <a
                  href="mailto:wabwenib66@gmail.com"
                  className="flex items-center justify-center gap-2 transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
                >
                  <Mail className="h-4 w-4" />
                  <span>wabwenib66@gmail.com</span>
                </a>
                <div className="flex flex-col items-center justify-center gap-3">
                  <a
                    href="https://wa.me/256758548836"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>+256758548836 (WhatsApp)</span>
                  </a>
                  <a
                    href="tel:+256775894639"
                    className="flex items-center gap-2 transition-colors hover:text-cyan-600 dark:hover:text-cyan-400"
                  >
                    <Phone className="h-4 w-4" />
                    <span>+256775894639 (Call)</span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-6 flex justify-center space-x-4"
              >
                <SocialLink
                  href="https://github.com/WabweniBrian"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </SocialLink>
                <SocialLink
                  href="https://www.linkedin.com/in/wabweni-brian-631079247/"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </SocialLink>
                <SocialLink
                  href="https://www.facebook.com/brian.wabweni/"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </SocialLink>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="mt-8 flex flex-wrap justify-center gap-3"
              >
                <ActionButton href="mailto:wabwenib66@gmail.com" primary>
                  <Mail className="mr-2 h-4 w-4" />
                  Hire Me
                </ActionButton>
                <KofiButton />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function SocialLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full bg-gray-100 p-2 text-gray-700 transition-all duration-300 hover:bg-gray-200 hover:text-gray-900 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700 dark:hover:text-white"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}

function ActionButton({
  href,
  children,
  primary = false,
  ...props
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
  [key: string]: any;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("mailto:") ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className={`flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium ${
        primary
          ? "hover:[#f45d22 text-white] bg-[#d44f1a] text-white"
          : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700"
      } transition-all duration-300`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
