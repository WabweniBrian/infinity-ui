import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t pb-8 pt-14">
      <div className="mx-auto max-w-7xl px-3">
        <Link
          className="flex flex-col items-center gap-2 font-semibold text-brand md:text-base"
          href="/"
        >
          <Image
            src="/logo.png"
            width={80}
            height={80}
            alt="Infinity UI Logo"
            className="object-contain"
          />
          <span className="hidden text-2xl sm:block">Infinity UI</span>
        </Link>

        <div className="mt-4 text-center">
          <p>
            &copy;{new Date().getFullYear()}{" "}
            <a href="#" className="text-brand">
              Infinity UI
            </a>{" "}
            . All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
