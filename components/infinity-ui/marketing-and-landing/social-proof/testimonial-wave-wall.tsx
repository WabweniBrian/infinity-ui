"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronDown, ChevronUp } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
  category: "product" | "service" | "support";
  featured?: boolean;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emma Thompson",
    role: "Marketing Director",
    company: "GlobalTech",
    content:
      "This platform has revolutionized how we approach digital marketing. The analytics tools provide insights we never had access to before, and the automation features have saved our team countless hours.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    category: "product",
    featured: true,
  },
  {
    id: 2,
    name: "James Wilson",
    role: "CTO",
    company: "Innovate Inc",
    content:
      "The API integration was seamless, and the documentation is some of the best I've seen. Our developers were able to implement everything in record time with minimal issues.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    category: "product",
  },
  {
    id: 3,
    name: "Sophia Chen",
    role: "Customer Success Manager",
    company: "Retail Solutions",
    content:
      "The customer support team deserves special recognition. They've been responsive, knowledgeable, and genuinely invested in our success. It's rare to find this level of service.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    category: "support",
    featured: true,
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    role: "Operations Manager",
    company: "Logistics Pro",
    content:
      "We&apos;ve seen a 40% increase in efficiency since implementing this solution. The onboarding process was smooth, and the ongoing support has been exceptional.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 4,
    category: "service",
  },
  {
    id: 5,
    name: "Olivia Johnson",
    role: "E-commerce Director",
    company: "Shop Trends",
    content:
      "The platform's flexibility has allowed us to customize it to our specific needs. It's scaled perfectly as our business has grown, and new features are regularly added that seem to anticipate our needs.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    category: "product",
  },
  {
    id: 6,
    name: "Daniel Kim",
    role: "IT Manager",
    company: "Tech Solutions",
    content:
      "Security was our top concern, and this platform has exceeded our expectations. The regular updates and transparent communication about security features give us peace of mind.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    category: "product",
  },
  {
    id: 7,
    name: "Ava Martinez",
    role: "Customer Experience Lead",
    company: "Service First",
    content:
      "The onboarding team went above and beyond to ensure our success. They provided customized training for our team and were always available to answer questions during the transition.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    category: "service",
    featured: true,
  },
  {
    id: 8,
    name: "Noah Taylor",
    role: "Sales Director",
    company: "Growth Inc",
    content:
      "This tool has become essential for our sales team. The CRM integration works flawlessly, and the reporting features help us identify opportunities we would have otherwise missed.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 4,
    category: "product",
  },
  {
    id: 9,
    name: "Isabella Brown",
    role: "Support Team Lead",
    company: "Help Desk Pro",
    content:
      "As someone who manages support tickets daily, I can confidently say this platform has the best ticketing system I've used. It's intuitive, customizable, and has powerful automation capabilities.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    rating: 5,
    category: "support",
  },
];

const TestimonialWaveWall = () => {
  const [filter, setFilter] = useState<
    "all" | "product" | "service" | "support"
  >("all");
  const [expanded, setExpanded] = useState<number[]>([]);

  const filteredTestimonials =
    filter === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === filter);

  const featuredTestimonials = testimonials.filter((t) => t.featured);

  const toggleExpanded = (id: number) => {
    if (expanded.includes(id)) {
      setExpanded(expanded.filter((itemId) => itemId !== id));
    } else {
      setExpanded([...expanded, id]);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-50 to-white py-20 dark:from-indigo-950 dark:to-slate-900">
      {/* Darkmode toggle */}
      <DarkModeToggle />

      {/* Dynamic wave/blob background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30 dark:opacity-20">
          <svg
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute h-full w-full"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="url(#wave-gradient-1)"
              animate={{
                d: [
                  "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,256L48,240C96,224,192,192,288,176C384,160,480,160,576,176C672,192,768,224,864,213.3C960,203,1056,149,1152,138.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,186.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,218.7C672,213,768,235,864,245.3C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              fill="url(#wave-gradient-2)"
              animate={{
                d: [
                  "M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,218.7C672,213,768,235,864,245.3C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,288L48,277.3C96,267,192,245,288,240C384,235,480,245,576,234.7C672,224,768,192,864,197.3C960,203,1056,245,1152,261.3C1248,277,1344,267,1392,261.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                  "M0,256L48,261.3C96,267,192,277,288,266.7C384,256,480,224,576,218.7C672,213,768,235,864,245.3C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                ],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <defs>
              <linearGradient
                id="wave-gradient-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient
                id="wave-gradient-2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating blobs */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-indigo-200/30 to-purple-200/30 blur-3xl dark:from-indigo-900/20 dark:to-purple-900/20"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-purple-200/30 to-pink-200/30 blur-3xl dark:from-purple-900/20 dark:to-pink-900/20"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Don&apos;t just take our word for it — hear from the people who use
            our product every day
          </motion.p>
        </div>

        {/* Featured testimonials */}
        <div className="mb-16">
          <h3 className="mb-8 text-center text-2xl font-bold text-slate-800 dark:text-white">
            Featured Testimonials
          </h3>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg dark:bg-slate-800"
              >
                {/* Testimonial header */}
                <div className="border-b border-slate-100 p-6 pb-4 dark:border-slate-700">
                  <div className="flex items-center">
                    <div className="relative mr-4 h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        src={
                          testimonial.image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                        }
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < testimonial.rating
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Testimonial content */}
                <div className="flex-grow p-6">
                  <div className="relative">
                    <Quote className="absolute -left-2 -top-2 h-8 w-8 text-indigo-200 dark:text-indigo-800" />
                    <p className="relative z-10 text-slate-700 dark:text-slate-300">
                      {testimonial.content}
                    </p>
                  </div>
                </div>

                {/* Category badge */}
                <div className="px-6 pb-6">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      testimonial.category === "product"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : testimonial.category === "service"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    }`}
                  >
                    {testimonial.category === "product"
                      ? "Product"
                      : testimonial.category === "service"
                        ? "Service"
                        : "Support"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("product")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === "product"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              Product
            </button>
            <button
              onClick={() => setFilter("service")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === "service"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              Service
            </button>
            <button
              onClick={() => setFilter("support")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                filter === "support"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              Support
            </button>
          </div>
        </div>

        {/* Testimonial wall */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AnimatePresence>
            {filteredTestimonials.map((testimonial, index) => {
              const isExpanded = expanded.includes(testimonial.id);
              const isLongContent = testimonial.content.length > 150;

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-lg bg-white p-6 shadow-md dark:bg-slate-800"
                >
                  <div className="mb-4 flex items-start">
                    <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={
                          testimonial.image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-slate-800 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < testimonial.rating
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <Quote className="absolute -left-1 -top-1 h-5 w-5 text-indigo-200 dark:text-indigo-800" />
                    <div className="pl-4">
                      {isLongContent ? (
                        <>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {isExpanded
                              ? testimonial.content
                              : `${testimonial.content.substring(0, 150)}...`}
                          </p>
                          <button
                            onClick={() => toggleExpanded(testimonial.id)}
                            className="mt-2 flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400"
                          >
                            {isExpanded ? (
                              <>
                                Show less{" "}
                                <ChevronUp size={14} className="ml-1" />
                              </>
                            ) : (
                              <>
                                Read more{" "}
                                <ChevronDown size={14} className="ml-1" />
                              </>
                            )}
                          </button>
                        </>
                      ) : (
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {testimonial.content}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-700">
                    <span
                      className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                        testimonial.category === "product"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : testimonial.category === "service"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                      }`}
                    >
                      {testimonial.category === "product"
                        ? "Product"
                        : testimonial.category === "service"
                          ? "Service"
                          : "Support"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="mb-4 text-slate-600 dark:text-slate-400">
            Ready to join our satisfied customers?
          </p>
          <a
            href="#"
            className="inline-block rounded-full bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Start Your Free Trial
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialWaveWall;
