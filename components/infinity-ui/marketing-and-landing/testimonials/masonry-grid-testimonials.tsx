"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, CheckCircle } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  featured?: boolean;
  tags?: string[];
  color: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "CTO",
    company: "FutureTech Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The development team&pos;s technical expertise is outstanding. They transformed our legacy system into a modern, scalable platform that&pos;s positioned us for future growth.",
    rating: 5,
    featured: true,
    tags: ["Web Development", "System Architecture"],
    color: "blue",
  },
  {
    id: 2,
    name: "Jessica Wu",
    role: "E-commerce Manager",
    company: "Urban Style",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Our online sales have increased by 200% since launching the new e-commerce platform. The mobile-first approach and streamlined checkout process have made a huge difference.",
    rating: 5,
    tags: ["E-commerce", "UX Design"],
    color: "purple",
  },
  {
    id: 3,
    name: "Robert Hayes",
    role: "Marketing VP",
    company: "Quantum Brands",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The rebrand exceeded our expectations. Our new visual identity perfectly captures our company values while feeling modern and distinctive.",
    rating: 4,
    tags: ["Branding", "Design"],
    color: "pink",
  },
  {
    id: 4,
    name: "Olivia Martinez",
    role: "Product Owner",
    company: "HealthTech Innovations",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Working with their team was seamless. They quickly understood our complex requirements and delivered an intuitive interface that our users love.",
    rating: 5,
    tags: ["Healthcare", "UI Design"],
    color: "teal",
  },
  {
    id: 5,
    name: "James Wilson",
    role: "Founder",
    company: "Startup Accelerate",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "As a startup, we needed a partner who could move quickly without sacrificing quality. They delivered our MVP in record time, helping us secure our next round of funding.",
    rating: 5,
    featured: true,
    tags: ["Startup", "MVP Development"],
    color: "amber",
  },
  {
    id: 6,
    name: "Sophia Lee",
    role: "UX Director",
    company: "Creative Minds Agency",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their user research and testing methodology is impressive. The insights gathered transformed our product roadmap and helped us prioritize features that truly matter to our users.",
    rating: 5,
    tags: ["User Research", "Product Strategy"],
    color: "indigo",
  },
];

const MasonryGridTestimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 py-24 text-white dark:from-black dark:to-gray-900"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.03]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-900/20 to-purple-900/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-amber-900/20 to-pink-900/20 blur-3xl"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
            Client Success Stories
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            See what our clients have to say about their experience working with
            our team
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`${testimonial.featured ? "md:col-span-2" : ""}`}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: index * 0.1,
                      },
                    }
                  : { opacity: 0, y: 50 }
              }
            >
              <div
                className={`group relative h-full overflow-hidden rounded-2xl ${
                  testimonial.featured
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black"
                    : "bg-gray-800 dark:bg-gray-900"
                } border border-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-gray-600`}
              >
                {/* Accent color */}
                <div
                  className={`absolute left-0 top-0 h-1 w-full ${
                    testimonial.color === "blue"
                      ? "bg-blue-500"
                      : testimonial.color === "purple"
                        ? "bg-purple-500"
                        : testimonial.color === "pink"
                          ? "bg-pink-500"
                          : testimonial.color === "teal"
                            ? "bg-teal-500"
                            : testimonial.color === "amber"
                              ? "bg-amber-500"
                              : "bg-indigo-500"
                  }`}
                />

                <div className="p-6 md:p-8">
                  {/* Quote icon */}
                  <div
                    className={`absolute right-6 top-6 transform opacity-10 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125 ${
                      testimonial.color === "blue"
                        ? "text-blue-400"
                        : testimonial.color === "purple"
                          ? "text-purple-400"
                          : testimonial.color === "pink"
                            ? "text-pink-400"
                            : testimonial.color === "teal"
                              ? "text-teal-400"
                              : testimonial.color === "amber"
                                ? "text-amber-400"
                                : "text-indigo-400"
                    }`}
                  >
                    <Quote className="h-12 w-12" />
                  </div>

                  {/* Rating */}
                  <div className="mb-4 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-600"}`}
                      />
                    ))}
                  </div>

                  {/* Content */}
                  <blockquote className="mb-6">
                    <p className="text-lg leading-relaxed text-gray-300">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </blockquote>

                  {/* Tags */}
                  {testimonial.tags && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {testimonial.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-gray-700 px-2.5 py-0.5 text-xs font-medium text-gray-300 dark:bg-gray-800"
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="mr-4 flex-shrink-0">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-gray-700 dark:border-gray-800">
                        <Image
                          src={
                            testimonial.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="mb-6 text-gray-300">
            Ready to join our success stories?
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-base font-medium text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 md:px-10 md:py-4 md:text-lg"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MasonryGridTestimonials;
