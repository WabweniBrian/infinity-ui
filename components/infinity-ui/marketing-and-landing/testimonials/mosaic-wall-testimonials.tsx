"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Star, Search, X, Filter, Check } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Industry =
  | "All"
  | "Technology"
  | "Healthcare"
  | "Finance"
  | "Retail"
  | "Education";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  industry: Industry;
  featured?: boolean;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Wilson",
    role: "CTO",
    company: "TechNova Systems",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The development team&pos;s technical expertise is outstanding. They transformed our legacy system into a modern, scalable platform that&pos;s positioned us for future growth.",
    rating: 5,
    industry: "Technology",
    featured: true,
  },
  {
    id: 2,
    name: "Emma Thompson",
    role: "Director of Operations",
    company: "MediCare Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their healthcare software has improved patient care and reduced administrative overhead by 40%. The ROI has exceeded our expectations.",
    rating: 5,
    industry: "Healthcare",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "CFO",
    company: "Global Financial Group",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The financial dashboard they developed gives us real-time insights that have improved our decision-making process significantly.",
    rating: 4,
    industry: "Finance",
  },
  {
    id: 4,
    name: "Sophia Rodriguez",
    role: "E-commerce Director",
    company: "Urban Style",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Our online sales have increased by 200% since launching the new e-commerce platform. The mobile-first approach and streamlined checkout process have made a huge difference.",
    rating: 5,
    industry: "Retail",
    featured: true,
  },
  {
    id: 5,
    name: "David Johnson",
    role: "IT Director",
    company: "National University",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The learning management system has transformed how we deliver education. Student engagement is up and administrative tasks are streamlined.",
    rating: 5,
    industry: "Education",
  },
  {
    id: 6,
    name: "Olivia Parker",
    role: "Product Manager",
    company: "InnoTech Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Working with their team was seamless. They quickly understood our complex requirements and delivered an intuitive interface that our users love.",
    rating: 5,
    industry: "Technology",
  },
  {
    id: 7,
    name: "Robert Hayes",
    role: "Chief Medical Officer",
    company: "HealthPlus",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The patient management system has streamlined our workflows and improved patient satisfaction scores by 35%.",
    rating: 4,
    industry: "Healthcare",
  },
  {
    id: 8,
    name: "Jennifer Wu",
    role: "Investment Director",
    company: "Apex Capital",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The investment analytics platform provides insights that have helped us optimize our portfolio performance and better serve our clients.",
    rating: 5,
    industry: "Finance",
    featured: true,
  },
  {
    id: 9,
    name: "Thomas Clark",
    role: "Marketing Director",
    company: "Fashion Forward",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The digital marketing strategy they implemented has reduced our customer acquisition cost by 45% while increasing lifetime value.",
    rating: 5,
    industry: "Retail",
  },
  {
    id: 10,
    name: "Sarah Miller",
    role: "Dean of Digital Learning",
    company: "Westside College",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The virtual classroom solution has enabled us to deliver high-quality education remotely, with engagement metrics exceeding our in-person classes.",
    rating: 4,
    industry: "Education",
  },
];

const industries: Industry[] = [
  "All",
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Education",
];

const MosaicWallTestimonials = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Filter testimonials based on industry and search query
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesIndustry =
      selectedIndustry === "All" || testimonial.industry === selectedIndustry;
    const matchesSearch =
      searchQuery === "" ||
      testimonial.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      testimonial.company.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesIndustry && matchesSearch;
  });

  const toggleExpanded = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getRandomColor = (id: number) => {
    const colors = [
      "from-blue-500 to-indigo-600",
      "from-purple-500 to-pink-600",
      "from-teal-500 to-green-600",
      "from-amber-500 to-orange-600",
      "from-rose-500 to-red-600",
    ];
    return colors[id % colors.length];
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-amber-50 to-rose-50 dark:from-amber-900/20 dark:to-rose-900/20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Client Success Stories
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Discover how we&pos;ve helped organizations across industries
            achieve their goals
          </p>
        </motion.div>

        {/* Search and filter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Search input */}
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search testimonials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-12 pr-4 shadow-sm transition-all focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Filter button (mobile) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span>Filter: {selectedIndustry}</span>
              </button>
            </div>

            {/* Industry filter (desktop) */}
            <div className="hidden flex-wrap items-center gap-2 md:flex">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => setSelectedIndustry(industry)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    selectedIndustry === industry
                      ? "bg-blue-500 text-white shadow-md shadow-blue-200 dark:shadow-blue-900/20"
                      : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile filter dropdown */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-2 overflow-hidden md:hidden"
              >
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <div className="grid grid-cols-2 gap-2">
                    {industries.map((industry) => (
                      <button
                        key={industry}
                        onClick={() => {
                          setSelectedIndustry(industry);
                          setIsFilterOpen(false);
                        }}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                          selectedIndustry === industry
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                      >
                        {selectedIndustry === industry && (
                          <Check className="h-4 w-4 text-blue-500" />
                        )}
                        <span>{industry}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Testimonial mosaic grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.length > 0 ? (
            filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`${testimonial.featured ? "md:col-span-2 md:row-span-2" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: index * 0.1,
                        },
                      }
                    : { opacity: 0, y: 20 }
                }
              >
                <div
                  className={`group relative h-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 ${
                    expandedId === testimonial.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="p-6">
                    {/* Industry tag */}
                    <div className="mb-4 flex items-start justify-between">
                      <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        {testimonial.industry}
                      </span>

                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-200 dark:text-gray-600"}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <div
                        className={`relative ${
                          expandedId !== testimonial.id &&
                          !testimonial.featured &&
                          testimonial.content.length > 150
                            ? "max-h-24 overflow-hidden"
                            : ""
                        }`}
                      >
                        <blockquote className="text-gray-700 dark:text-gray-300">
                          <p className="text-lg leading-relaxed">
                            &quot;{testimonial.content}&quot;
                          </p>
                        </blockquote>

                        {/* Gradient overlay for truncated content */}
                        {expandedId !== testimonial.id &&
                          !testimonial.featured &&
                          testimonial.content.length > 150 && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent dark:from-gray-800" />
                          )}
                      </div>

                      {/* Read more button */}
                      {!testimonial.featured &&
                        testimonial.content.length > 150 && (
                          <button
                            onClick={() => toggleExpanded(testimonial.id)}
                            className="mt-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            {expandedId === testimonial.id
                              ? "Read less"
                              : "Read more"}
                          </button>
                        )}
                    </div>

                    {/* Author */}
                    <div className="flex items-center">
                      <div className="mr-4 flex-shrink-0">
                        <div className="relative">
                          <div
                            className={`absolute -inset-1 rounded-full bg-gradient-to-r ${getRandomColor(testimonial.id)} opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100`}
                          />
                          <div className="relative h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={
                                testimonial.image ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                              }
                              alt={testimonial.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No testimonials found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedIndustry("All");
                  setSearchQuery("");
                }}
                className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MosaicWallTestimonials;
