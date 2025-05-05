import Image from "next/image";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-600 dark:bg-gray-900 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            width={60}
            height={60}
            className="h-10 object-contain"
            src="/logo.png"
            alt="Infinity UI"
          />

          <div className="mt-4 flex items-center justify-center">
            <p className="text-base">Made with 💖 by Wabweni Brian -</p>
            <Link
              href="https://github.com/WabweniBrian"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center text-brand underline transition-colors hover:no-underline"
            >
              <BsGithub className="mr-1 h-5 w-5" />
              <span>GitHub</span>
            </Link>
          </div>

          <div className="mt-6 w-full border-t border-gray-200 pt-6 dark:border-gray-700">
            <p className="text-center text-base">
              &copy; {new Date().getFullYear()} Infinity UI. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
