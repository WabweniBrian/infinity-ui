"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  Code,
  Building,
  Zap,
  AlertTriangle,
} from "lucide-react";

const licenseTypes = [
  {
    icon: <Lightbulb className="h-8 w-8 text-yellow-500" />,
    title: "Personal Projects",
    description:
      "Use Infinity UI in your personal projects, portfolios, and experiments.",
    allowed: true,
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500" />,
    title: "Team Collaboration",
    description:
      "Collaborate with your team members on projects using Infinity UI.",
    allowed: true,
  },
  {
    icon: <Code className="h-8 w-8 text-green-500" />,
    title: "Open Source",
    description: "Incorporate Infinity UI in your open source projects.",
    allowed: true,
  },
  {
    icon: <Building className="h-8 w-8 text-purple-500" />,
    title: "Commercial Use",
    description:
      "Build and deploy commercial projects and applications for clients.",
    allowed: true,
  },
  {
    icon: <Zap className="h-8 w-8 text-orange-500" />,
    title: "Unlimited Projects",
    description: "Create as many projects as you want with a single license.",
    allowed: true,
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
    title: "Redistribution",
    description:
      "Reselling or redistributing Infinity UI as a standalone product.",
    allowed: false,
  },
];

const LicenseCard = ({
  icon,
  title,
  description,
  allowed,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  allowed: boolean;
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`rounded-lg p-6 shadow-xl ${
      allowed ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
    }`}
  >
    <div className="mb-4 flex items-center">
      {icon}
      <h3 className="ml-4 text-xl font-bold">{title}</h3>
    </div>
    <p className="text-gray-700 dark:text-gray-300">{description}</p>
    <p className="mt-4 font-semibold">
      {allowed ? (
        <span className="text-green-600 dark:text-green-400">Allowed</span>
      ) : (
        <span className="text-red-600 dark:text-red-400">Not Allowed</span>
      )}
    </p>
  </motion.div>
);

const LegalSection = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 flex w-full items-center justify-between text-left text-lg font-semibold focus:outline-none"
      >
        <span>{title}</span>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-gray-700 dark:text-gray-300">{content}</p>
      </motion.div>
    </div>
  );
};

const License = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 pb-12 pt-36 dark:bg-background sm:px-6 lg:px-8">
      <div className="absolute left-1/2 top-36 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-brand/20 blur-[100px] md:h-[400px] md:w-[400px]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Infinity UI License
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500 dark:text-gray-300">
            Unleash your creativity with our flexible licensing terms.
            Here&apos;s what you need to know about using Infinity UI.
          </p>
        </motion.div>

        <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {licenseTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <LicenseCard {...type} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="rounded-xl border bg-white p-6 dark:bg-gray-900"
        >
          <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Legal Bits (The Fun Part!)
          </h2>

          <LegalSection
            title="1. The 'Don't Be Evil' Clause"
            content="We trust you to use Infinity UI for good. Create amazing projects, but please don't use our components to build anything illegal or harmful. We're all about spreading joy, not chaos!"
          />

          <LegalSection
            title="2. The 'Share the Love' Principle"
            content="While we love that you love Infinity UI, please don't share your license with others. Each developer needs their own license. Think of it as spreading the Infinity UI love!"
          />

          <LegalSection
            title="3. The 'Infinity and Beyond' Promise"
            content="Your license gives you access to updates and new components within your plan. We're constantly improving, so your projects can go to infinity and beyond!"
          />

          <LegalSection
            title="4. The 'Bragging Rights' Allowance"
            content="Feel free to tell the world you're using Infinity UI in your projects. In fact, we encourage it! Just don't claim you built Infinity UI yourself (although we're flattered if you want to)."
          />
          <LegalSection
            title="5. The 'Time Lord' Clause"
            content="Your license is valid for all of time and space. Use Infinity UI today, tomorrow, or in a distant future where computers are powered by cat memes."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400">
            By using Infinity UI, you agree to these terms. If you have any
            questions, feel free to reach out to our support team. We&apos;re
            here to help, not to engage in intergalactic legal battles.
          </p>
          <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
            Last updated: Stardate 2025.15 (or as Earthlings say, January 15,
            2025)
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default License;
