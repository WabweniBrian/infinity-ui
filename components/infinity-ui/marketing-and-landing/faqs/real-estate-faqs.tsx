"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Home,
  Building,
  Key,
  DollarSign,
  FileText,
  Search,
  MapPin,
  Briefcase,
  ArrowRight,
} from "lucide-react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  category: string;
  featured?: boolean;
};

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What's the first step in the home buying process?",
    answer:
      "The first step is getting pre-approved for a mortgage. This involves meeting with a lender who will review your financial information (income, assets, debts, credit score) to determine how much you can afford to borrow. Pre-approval gives you a clear budget, strengthens your offer when you find a home, and identifies any credit issues to address. It's different from pre-qualification, which is less formal. We recommend getting pre-approved before you start seriously looking at properties to streamline your search and avoid disappointment.",
    category: "buying",
    featured: true,
  },
  {
    id: 2,
    question: "How much down payment do I need to buy a home?",
    answer:
      "Down payment requirements vary based on loan type and lender. Conventional loans typically require 5-20% down, with private mortgage insurance (PMI) required for down payments under 20%. FHA loans allow down payments as low as 3.5% with good credit. VA loans for veterans and active military may require no down payment. USDA loans for rural properties also offer zero-down options for qualified buyers. First-time homebuyer programs often feature lower down payment requirements. Remember that a larger down payment means a smaller loan amount, lower monthly payments, and potentially better interest rates.",
    category: "buying",
  },
  {
    id: 3,
    question: "How long does the home buying process take?",
    answer:
      "The home buying process typically takes 30-60 days from accepted offer to closing, though this timeline can vary. The search phase depends entirely on your needs and market conditions—some buyers find their home in days, others take months. Once your offer is accepted, the closing process includes inspections (1-2 weeks), appraisal (1-2 weeks), final mortgage approval (2-3 weeks), and closing preparation. Factors that can extend the timeline include inspection issues requiring negotiation, appraisal problems, mortgage approval delays, or title issues. Cash purchases can close more quickly, sometimes in as little as two weeks.",
    category: "buying",
  },
  {
    id: 4,
    question: "What's the best time to sell my house?",
    answer:
      "Traditionally, spring and early summer (March through June) are considered optimal selling seasons in most markets. Homes tend to show better with good weather and landscaping in bloom, and families prefer moving during summer break. However, this timing creates more competition among sellers. Winter can offer advantages like motivated buyers and less competition. Local market conditions often outweigh seasonal factors—a seller's market with low inventory favors sellers year-round. Consider your personal timeline and consult with a local real estate agent who understands your specific market dynamics before deciding when to list.",
    category: "selling",
    featured: true,
  },
  {
    id: 5,
    question: "What improvements should I make before selling my home?",
    answer:
      "Focus on high-ROI improvements that enhance first impressions. Start with deep cleaning, decluttering, and depersonalizing. Minor kitchen updates (painting cabinets, new hardware, modern fixtures) and bathroom refreshes offer good returns. Address obvious repairs like leaky faucets, broken tiles, and damaged flooring. Fresh neutral paint throughout makes spaces feel clean and move-in ready. Improve curb appeal with landscaping, power washing, and front door enhancements. Major renovations rarely recoup their full cost, so consult your agent before undertaking significant projects—they can advise which improvements will most appeal to buyers in your specific market.",
    category: "selling",
  },
  {
    id: 6,
    question: "How is the listing price determined?",
    answer:
      "Listing price is determined through a Comparative Market Analysis (CMA) that evaluates recently sold properties similar to yours in size, features, and location. Your agent will analyze active listings (your competition), pending sales, completed sales from the past 3-6 months, and expired listings. They'll adjust for differences in square footage, bedrooms/bathrooms, lot size, condition, upgrades, and location factors. Current market conditions (buyer's vs. seller's market) and trends also influence pricing strategy. While online valuation tools provide estimates, they lack the nuanced understanding of local market conditions that an experienced agent brings to pricing your specific property.",
    category: "selling",
  },
  {
    id: 7,
    question: "What are closing costs and who pays them?",
    answer:
      "Closing costs typically range from 2-5% of the loan amount and include lender fees (application, origination, credit report), third-party fees (appraisal, inspection, title search, title insurance), prepaid expenses (property taxes, homeowners insurance, interest), and recording fees. In most transactions, buyers pay the majority of closing costs, though this is negotiable. Sellers typically cover their agent's commission, transfer taxes, and sometimes a portion of buyer's closing costs as a concession. VA loans restrict certain closing costs for veterans. Your lender will provide a Loan Estimate outlining expected closing costs, and later a Closing Disclosure with final figures at least three days before closing.",
    category: "general",
    featured: true,
  },
  {
    id: 8,
    question: "How do property taxes work?",
    answer:
      "Property taxes fund local services like schools, infrastructure, and emergency services. They're calculated by multiplying your property's assessed value by the local tax rate (millage rate). Assessment methods and timing vary by location—some reassess annually, others upon sale or periodically. Many areas offer exemptions that reduce taxable value, such as homestead exemptions for primary residences or exemptions for seniors and veterans. Property taxes are typically paid through your mortgage escrow account, with your lender collecting monthly amounts and paying the bill when due. Tax rates can change annually based on local budget needs, and significant home improvements may trigger reassessment.",
    category: "general",
  },
  {
    id: 9,
    question:
      "What's the difference between a real estate agent, Realtor®, and broker?",
    answer:
      "All three are real estate professionals with different qualifications. A real estate agent has completed state-required education and licensing to represent buyers and sellers. A Realtor® is an agent who belongs to the National Association of Realtors® and adheres to its strict Code of Ethics. A real estate broker has additional education and licensing that allows them to work independently and hire agents to work under them. Associate brokers have broker's licenses but choose to work under another broker. The key difference is level of education and authority—agents must work under brokers, while brokers can operate independently. When choosing representation, consider experience and local expertise alongside these designations.",
    category: "general",
  },
];

const categories = [
  { id: "all", name: "All Questions", icon: <Search className="h-5 w-5" /> },
  { id: "buying", name: "Buying a Home", icon: <Key className="h-5 w-5" /> },
  { id: "selling", name: "Selling a Home", icon: <Home className="h-5 w-5" /> },
  {
    id: "general",
    name: "General Information",
    icon: <FileText className="h-5 w-5" />,
  },
];

const RealEstateFAQ = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const toggleItem = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const filteredFaqs = faqData.filter(
    (item) =>
      (activeCategory === "all" || item.category === activeCategory) &&
      (searchQuery === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const featuredFaqs = faqData.filter((item) => item.featured);

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-100 to-blue-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Blueprint pattern */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-[length:100px_100px] opacity-[0.03]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-600">
              <Building className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Real Estate FAQ
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Expert answers to your most common real estate questions
          </p>
        </motion.div>

        {/* Featured questions - property card style */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="mb-6 flex items-center text-2xl font-bold text-gray-900">
            <DollarSign className="mr-2 h-6 w-6 text-blue-600" />
            Featured Questions
          </h3>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                className="group relative"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 blur-sm transition duration-300 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md">
                  <div className="flex items-center border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-5">
                    <div className="mr-3 rounded-lg bg-blue-600 p-2 text-white">
                      {faq.category === "buying" ? (
                        <Key className="h-5 w-5" />
                      ) : faq.category === "selling" ? (
                        <Home className="h-5 w-5" />
                      ) : (
                        <FileText className="h-5 w-5" />
                      )}
                    </div>
                    <span className="text-sm font-medium capitalize text-blue-600">
                      {faq.category} FAQ
                    </span>
                  </div>

                  <div className="flex-grow p-5">
                    <h4 className="mb-2 text-lg font-semibold text-gray-900">
                      {faq.question}
                    </h4>
                    <p className="mb-4 line-clamp-3 text-gray-600">
                      {faq.answer.substring(0, 120)}...
                    </p>
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      Read Full Answer
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Search and filter */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="relative w-full max-w-2xl md:w-auto md:flex-grow">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 shadow-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex w-full flex-wrap gap-2 md:w-auto">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? "bg-blue-600 text-white shadow-md"
                      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {category.icon}
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ listing */}
        <motion.div
          className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50 p-6">
            <div className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">
                {activeCategory === "all"
                  ? "All Questions"
                  : categories.find((c) => c.id === activeCategory)?.name}
              </h3>
            </div>
            <div className="text-sm text-gray-500">
              {filteredFaqs.length}{" "}
              {filteredFaqs.length === 1 ? "question" : "questions"}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div key={faq.id} className="overflow-hidden">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-blue-50/50"
                    aria-expanded={expandedItems.includes(faq.id)}
                  >
                    <h4 className="pr-8 text-base font-medium text-gray-900 md:text-lg">
                      {faq.question}
                    </h4>
                    <motion.div
                      animate={{
                        rotate: expandedItems.includes(faq.id) ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`flex-shrink-0 rounded-full p-2 ${
                        expandedItems.includes(faq.id)
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expandedItems.includes(faq.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-gray-600">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <FileText className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                <h4 className="mb-2 text-lg font-medium text-gray-900">
                  No questions found
                </h4>
                <p className="text-gray-600">
                  Try adjusting your search or filter to find what you&apos;re
                  looking for.
                </p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="mb-6 text-gray-600">
            Have more questions about real estate? Our experts are ready to
            help.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 font-medium text-white shadow-lg shadow-blue-200/50 transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(37, 99, 235, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Briefcase className="h-5 w-5" />
              Contact an Agent
            </motion.a>
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-8 py-4 font-medium text-gray-700 transition-all hover:bg-blue-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin className="h-5 w-5 text-blue-600" />
              Find Local Offices
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RealEstateFAQ;
