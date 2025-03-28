"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronRight,
  CreditCard,
  Lock,
  PiggyBank,
  Landmark,
  Search,
  ArrowRight,
  DollarSign,
  BarChart4,
} from "lucide-react";

const faqData = {
  accounts: [
    {
      id: 1,
      question: "How do I open a new account?",
      answer:
        "Opening a new account is simple. You can apply online through our secure website, visit any of our branch locations, or call our customer service at (555) 123-4567. You&apos;ll need to provide a government-issued ID, your Social Security number, and an initial deposit (minimum amounts vary by account type).",
    },
    {
      id: 2,
      question: "What types of accounts do you offer?",
      answer:
        "We offer a variety of accounts to meet your financial needs: Checking accounts (Basic, Premium, Interest-Bearing), Savings accounts (Regular Savings, High-Yield Savings), Money Market accounts, Certificates of Deposit (CDs) with various terms, and specialized accounts for students and seniors.",
    },
    {
      id: 3,
      question: "Are my deposits insured?",
      answer:
        "Yes, deposits at our institution are insured by the Federal Deposit Insurance Corporation (FDIC) up to $250,000 per depositor, per ownership category. This means your money is protected up to these limits in the unlikely event of bank failure.",
    },
  ],
  cards: [
    {
      id: 4,
      question: "How do I apply for a credit card?",
      answer:
        "You can apply for a credit card online through our secure website, at any branch location, or by calling our application line at (555) 234-5678. The application process typically takes about 15 minutes, and you&apos;ll receive a decision within 1-3 business days in most cases.",
    },
    {
      id: 5,
      question: "What should I do if my card is lost or stolen?",
      answer:
        "If your card is lost or stolen, contact us immediately at our 24/7 hotline: (800) 555-9876. We&apos;ll deactivate your card to prevent unauthorized transactions and issue a replacement card. For added security, you can also freeze your card temporarily through our mobile app or online banking.",
    },
    {
      id: 6,
      question: "How does your rewards program work?",
      answer:
        "Our rewards program allows you to earn points on eligible purchases made with your credit card. You earn 1 point per $1 spent on regular purchases, 2 points per $1 on dining and travel, and 3 points per $1 on our quarterly bonus categories. Points can be redeemed for cash back, travel, gift cards, or merchandise through our rewards portal.",
    },
  ],
  loans: [
    {
      id: 7,
      question: "What types of loans do you offer?",
      answer:
        "We offer a comprehensive range of loan products including: Mortgage loans (fixed-rate, adjustable-rate, jumbo), Home equity loans and lines of credit, Auto loans for new and used vehicles, Personal loans (secured and unsecured), Student loans, and Business loans (SBA, term loans, lines of credit).",
    },
    {
      id: 8,
      question: "How do I check my loan application status?",
      answer:
        "You can check your loan application status by logging into your online banking account and navigating to the 'Applications' section. Alternatively, you can contact our loan department directly at (555) 345-6789 or visit any branch location. For most applications, you&apos;ll receive updates via email or text message if you&apos;ve opted in for notifications.",
    },
    {
      id: 9,
      question: "What factors affect my loan approval and interest rate?",
      answer:
        "Several factors influence loan approval and interest rates, including: Your credit score and history, Income and employment stability, Debt-to-income ratio, Loan amount and term length, Collateral value (for secured loans), Relationship with our bank (existing customers may qualify for relationship discounts). We consider your complete financial picture rather than any single factor.",
    },
  ],
  security: [
    {
      id: 10,
      question: "How do you protect my personal and financial information?",
      answer:
        "We employ multiple layers of security to protect your information: 256-bit encryption for all online and mobile banking sessions, Multi-factor authentication for account access, 24/7 fraud monitoring systems, Secure data centers with physical and electronic safeguards, Regular security audits and compliance with all banking regulations. We never sell your personal information to third parties.",
    },
    {
      id: 11,
      question: "What should I do if I suspect fraudulent activity?",
      answer:
        "If you suspect fraudulent activity, contact us immediately at our 24/7 fraud hotline: (800) 555-1234. You should also change your online banking password, review your recent transactions, and monitor your accounts closely. We may also recommend placing a fraud alert with the major credit bureaus.",
    },
    {
      id: 12,
      question: "How can I protect myself from phishing and scams?",
      answer:
        "To protect yourself from phishing and scams: Never share your password, PIN, or security codes with anyone, Be suspicious of unsolicited emails or calls requesting personal information, Verify that you&apos;re on our official website before entering credentials (check for https:// and our correct domain name), Use our mobile app instead of clicking links in emails, Enable account alerts to monitor for unusual activity. Remember, we will never call or email asking for your full account number, password, or security codes.",
    },
  ],
};

const categories = [
  {
    id: "accounts",
    name: "Accounts & Banking",
    icon: <Landmark className="h-5 w-5" />,
  },
  {
    id: "cards",
    name: "Cards & Payments",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    id: "loans",
    name: "Loans & Mortgages",
    icon: <PiggyBank className="h-5 w-5" />,
  },
  {
    id: "security",
    name: "Security & Privacy",
    icon: <Lock className="h-5 w-5" />,
  },
];

const FinanceFAQ = () => {
  const [activeCategory, setActiveCategory] = useState("accounts");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const toggleItem = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredFaqs = searchQuery
    ? Object.values(faqData)
        .flat()
        .filter(
          (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
        )
    : faqData[activeCategory as keyof typeof faqData];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 py-24"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=20&width=20')] bg-[length:30px_30px] opacity-[0.03]" />

        <motion.div
          className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-blue-500/5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/4 translate-y-1/3 rounded-full bg-blue-500/5"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute left-[10%] top-40 text-blue-400/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        >
          <DollarSign size={60} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-[15%] text-blue-400/20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 1,
          }}
        >
          <BarChart4 size={70} />
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative mx-auto mb-6 h-20 w-20"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500">
              <DollarSign className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-300">
            Find answers to common questions about our banking services and
            financial products
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-slate-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 py-4 pl-12 pr-4 text-white shadow-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </motion.div>

        {!searchQuery && (
          <motion.div
            className="mb-10 flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 rounded-lg px-5 py-3 font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-800"
                }`}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={
                    activeCategory === category.id
                      ? "text-white"
                      : "text-blue-400"
                  }
                >
                  {category.icon}
                </span>
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        )}

        <motion.div
          className="overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-800/50 shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="divide-y divide-slate-700/50">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item) => (
                <motion.div
                  key={item.id}
                  className="group overflow-hidden"
                  whileHover={{
                    backgroundColor: "rgba(30, 41, 59, 0.5)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors"
                    aria-expanded={expandedItems.includes(item.id)}
                  >
                    <h3 className="pr-8 text-lg font-medium text-white">
                      {item.question}
                    </h3>
                    <motion.div
                      animate={{
                        rotate: expandedItems.includes(item.id) ? 90 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className={`flex-shrink-0 rounded-full p-2 ${
                        expandedItems.includes(item.id)
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-blue-400 group-hover:bg-slate-600"
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedItems.includes(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="border-t border-slate-700/50 px-6 pb-6 pt-2 text-slate-300">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-slate-300">
                  No results found for &quot;{searchQuery}&quot;
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 font-medium text-blue-400 hover:text-blue-300"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mt-12 rounded-2xl border border-blue-800/30 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-8 text-white shadow-lg backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="mb-2 text-xl font-semibold">
                Still have questions?
              </h3>
              <p className="text-blue-200">
                Our financial experts are available 24/7 to assist you
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <motion.a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-6 py-3 font-medium text-white transition-all hover:bg-slate-700"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Support
              </motion.a>
              <motion.a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-3 font-medium text-white transition-all hover:from-blue-700 hover:to-cyan-700"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule Consultation
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinanceFAQ;
