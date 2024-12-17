/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  ChromeIcon as Google,
  CreditCard,
  UserCircle,
  Image,
  RefreshCw,
  Shield,
} from "lucide-react";

const PolicySection = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="mb-4 cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-900"
      initial={false}
      animate={{ height: isOpen ? "auto" : "80px" }}
      transition={{ duration: 0.3 }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <button className="flex w-full items-center p-4 text-left focus:outline-none">
        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
          {icon}
        </div>
        <h3 className="flex-grow text-xl font-semibold">{title}</h3>
        <span className="text-2xl">{isOpen ? "−" : "+"}</span>
      </button>
      <motion.div
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="px-4 pb-4"
      >
        {content}
      </motion.div>
    </motion.div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-12 pt-36 dark:bg-background sm:px-6 lg:px-8">
      <div className="absolute left-1/2 top-36 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-brand/20 blur-[100px] md:h-[400px] md:w-[400px]" />
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 text-xl text-gray-500 dark:text-gray-300">
            Your data is like your favorite component library - precious and
            well-protected.
          </p>
        </motion.div>

        <PolicySection
          icon={<Mail className="h-6 w-6 text-blue-500" />}
          title="Email Sign-In"
          content={
            <div>
              <p>
                We use your email like a good variable name - unique and
                essential. We&apos;ll never spam you or sell your email.
                Promise!
              </p>
              <p className="mt-2">Your email is used for:</p>
              <ul className="mt-2 list-inside list-disc">
                <li>
                  Account identification (because &quot;Hey you!&quot;
                  isn&apos;t very specific)
                </li>
                <li>
                  Password resets (for when you&apos;ve had too much coffee and
                  can&apos;t remember your password)
                </li>
              </ul>
            </div>
          }
        />

        <PolicySection
          icon={<Lock className="h-6 w-6 text-blue-500" />}
          title="Password Security"
          content={
            <div>
              <p>
                We treat your password like it&apos;s the secret sauce to our
                success - with utmost care and security.
              </p>
              <p className="mt-2">Here&apos;s how we keep it safe:</p>
              <ul className="mt-2 list-inside list-disc">
                <li>
                  We use state-of-the-art hashing algorithms (it&apos;s like a
                  cryptographic smoothie maker for your password)
                </li>
                <li>
                  Even we can&apos;t see your password (so don&apos;t ask us
                  what it is if you forget!)
                </li>
              </ul>
            </div>
          }
        />

        <PolicySection
          icon={<Google className="h-6 w-6 text-blue-500" />}
          title="Google Sign-In"
          content={
            <div>
              <p>
                We&apos;ve partnered with Google to make signing in as easy as
                finding a div in your HTML.
              </p>
              <p className="mt-2">When you use Google Sign-In:</p>
              <ul className="mt-2 list-inside list-disc">
                <li>
                  We only receive information you&apos;ve allowed Google to
                  share
                </li>
                <li>
                  We use this info to create or link your Infinity UI account
                </li>
                <li>
                  We don&apos;t post anything to your Google account (we&apos;re
                  not that clingy)
                </li>
              </ul>
            </div>
          }
        />

        <PolicySection
          icon={<CreditCard className="h-6 w-6 text-blue-500" />}
          title="Payment Information"
          content={
            <div>
              <p>
                We use PayPal for all our payment processing needs. Why? Because
                we&apos;re great at making UI components, not at being a bank.
              </p>
              <p className="mt-2">Here&apos;s the deal with payments:</p>
              <ul className="mt-2 list-inside list-disc">
                <li>We never see or store your credit card details</li>
                <li>
                  PayPal handles all the money stuff (they&apos;re the experts,
                  after all)
                </li>
                <li>
                  We only keep records of your purchases (so we can remember to
                  thank you)
                </li>
              </ul>
            </div>
          }
        />

        <PolicySection
          icon={<UserCircle className="h-6 w-6 text-blue-500" />}
          title="Profile Information"
          content={
            <div>
              <p>
                Your profile is like your digital business card in the Infinity
                UI world. Here&apos;s what you can update:
              </p>
              <ul className="mt-2 list-inside list-disc">
                <li>
                  Your name (in case you&apos;ve decided to go by &ldquo;Lord of
                  the Components&rdquo;)
                </li>
                <li>
                  Profile picture (selfies with your favorite UI component are
                  encouraged)
                </li>
              </ul>
              <p className="mt-2">
                We keep this info secure and only use it to personalize your
                experience.
              </p>
            </div>
          }
        />

        <PolicySection
          icon={<Image className="h-6 w-6 text-blue-500" />}
          title="Profile Images"
          content={
            <div>
              <p>
                Your profile image is hosted on our secure servers. We promise
                not to doodle on it or use it for our own social media profiles.
              </p>
              <p className="mt-2">A few things to note:</p>
              <ul className="mt-2 list-inside list-disc">
                <li>
                  Keep it family-friendly (this isn&apos;t that kind of website)
                </li>
                <li>
                  We may compress your image (to save space, not to make you)
                </li>
                <li>You can change it anytime (bad hair day? No problem!)</li>
              </ul>
            </div>
          }
        />

        <PolicySection
          icon={<RefreshCw className="h-6 w-6 text-blue-500" />}
          title="Refunds and Cancellations"
          content={
            <div>
              <p>
                Not happy? We&apos;re sad to hear that. Here&apos;s our refund
                policy:
              </p>
              <ul className="mt-2 list-inside list-disc">
                <li>You can request a refund within 7 days of purchase</li>
                <li>
                  We&apos;ll ask for feedback (so we can improve, not to make
                  you feel guilty)
                </li>
                <li>
                  Refunds are processed through PayPal (usually faster than a
                  React component update)
                </li>
              </ul>
              <p className="mt-2">
                To request a refund, contact our support team at
                refunds@infinityui.dev
              </p>
            </div>
          }
        />

        <PolicySection
          icon={<Shield className="h-6 w-6 text-blue-500" />}
          title="Data Protection"
          content={
            <div>
              <p>
                We protect your data like it&apos;s the last slice of pizza at a
                developer meetup.
              </p>
              <p className="mt-2">Our data protection measures include:</p>
              <ul className="mt-2 list-inside list-disc">
                <li>
                  End-to-end encryption (so secure, even our CEO can&apos;t
                  peek)
                </li>
                <li>Regular security audits (we&apos;re always on guard)</li>
                <li>Limited data retention (we&apos;re not data hoarders)</li>
                <li>
                  Strict access controls (tighter than your deadline for that
                  big project)
                </li>
              </ul>
              <p className="mt-2">
                If you have any concerns about your data, please contact us at
                privacy@infinityui.dev
              </p>
            </div>
          }
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400">
            By using Infinity UI, you agree to this privacy policy. We reserve
            the right to update this policy faster than you can say &quot;state
            management&quot;.
          </p>
          <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
            Last updated: When the last Git commit was pushed (or May 15, 2025,
            if you prefer actual dates)
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
