"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Calendar, Star, Quote } from "lucide-react";
import Image from "next/image";

type TimelineTestimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  date: string;
  rating: number;
  color: string;
};

const testimonials: TimelineTestimonial[] = [
  {
    id: 1,
    name: "Daniel Kim",
    role: "CTO",
    company: "NexGen Technologies",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The migration to cloud infrastructure was seamless. Our systems now scale automatically with demand, and we've seen a 40% reduction in operational costs.",
    date: "January 2023",
    rating: 5,
    color: "blue",
  },
  {
    id: 2,
    name: "Rachel Torres",
    role: "Creative Director",
    company: "Visionary Design Studio",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The rebrand exceeded our expectations. Our new visual identity perfectly captures our company values while feeling modern and distinctive in our competitive market.",
    date: "March 2023",
    rating: 5,
    color: "purple",
  },
  {
    id: 3,
    name: "Jonathan Lee",
    role: "E-commerce Director",
    company: "Global Retail Group",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Since implementing the new e-commerce platform, our mobile conversion rate has increased by 75% and cart abandonment has decreased by 30%. The ROI has been exceptional.",
    date: "June 2023",
    rating: 5,
    color: "teal",
  },
  {
    id: 4,
    name: "Sophia Martinez",
    role: "Marketing VP",
    company: "Innovate Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The digital marketing strategy transformed our lead generation. We've seen a 200% increase in qualified leads and a 45% reduction in cost per acquisition.",
    date: "August 2023",
    rating: 4,
    color: "amber",
  },
  {
    id: 5,
    name: "Michael Johnson",
    role: "CEO",
    company: "Startup Accelerate",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their team's expertise helped us secure our Series A funding. The product roadmap and technical architecture they developed gave investors confidence in our vision.",
    date: "October 2023",
    rating: 5,
    color: "rose",
  },
];

const TimelineTestimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.4, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-amber-50 to-rose-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Our Success Timeline
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            A journey of transformation and growth with our valued clients
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div ref={containerRef} className="relative" style={{ opacity }}>
          {/* Center line */}
          <div className="absolute bottom-0 left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-200 via-purple-200 to-rose-200" />

          {testimonials.map((testimonial, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={testimonial.id}
                className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} mb-20 items-center gap-8 last:mb-0 md:gap-0`}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.6,
                          delay: index * 0.2,
                        },
                      }
                    : { opacity: 0, y: 50 }
                }
              >
                {/* Date marker (center for desktop) */}
                <div className="z-10 order-1 md:absolute md:left-1/2 md:order-none md:-translate-x-1/2">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 bg-white shadow-xl ${
                      testimonial.color === "blue"
                        ? "border-blue-400"
                        : testimonial.color === "purple"
                          ? "border-purple-400"
                          : testimonial.color === "teal"
                            ? "border-teal-400"
                            : testimonial.color === "amber"
                              ? "border-amber-400"
                              : "border-rose-400"
                    }`}
                  >
                    <Calendar
                      className={`h-6 w-6 ${
                        testimonial.color === "blue"
                          ? "text-blue-500"
                          : testimonial.color === "purple"
                            ? "text-purple-500"
                            : testimonial.color === "teal"
                              ? "text-teal-500"
                              : testimonial.color === "amber"
                                ? "text-amber-500"
                                : "text-rose-500"
                      }`}
                    />
                  </motion.div>

                  <div
                    className={`mt-2 text-sm font-medium ${
                      testimonial.color === "blue"
                        ? "text-blue-600"
                        : testimonial.color === "purple"
                          ? "text-purple-600"
                          : testimonial.color === "teal"
                            ? "text-teal-600"
                            : testimonial.color === "amber"
                              ? "text-amber-600"
                              : "text-rose-600"
                    }`}
                  >
                    {testimonial.date}
                  </div>
                </div>

                {/* Content card */}
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    rotateY: isEven ? -5 : 5,
                    z: 20,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`group w-full md:w-5/12 ${isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}
                >
                  <div className="relative">
                    <div
                      className={`absolute -inset-px bg-gradient-to-r ${
                        testimonial.color === "blue"
                          ? "from-blue-400 to-blue-500"
                          : testimonial.color === "purple"
                            ? "from-purple-400 to-purple-500"
                            : testimonial.color === "teal"
                              ? "from-teal-400 to-teal-500"
                              : testimonial.color === "amber"
                                ? "from-amber-400 to-amber-500"
                                : "from-rose-400 to-rose-500"
                      } rounded-xl opacity-0 blur-sm transition duration-300 group-hover:opacity-100`}
                    />

                    <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
                          testimonial.color === "blue"
                            ? "from-blue-400 to-blue-500"
                            : testimonial.color === "purple"
                              ? "from-purple-400 to-purple-500"
                              : testimonial.color === "teal"
                                ? "from-teal-400 to-teal-500"
                                : testimonial.color === "amber"
                                  ? "from-amber-400 to-amber-500"
                                  : "from-rose-400 to-rose-500"
                        }`}
                      />

                      {/* Quote icon */}
                      <div
                        className={`absolute top-4 ${isEven ? "left-4" : "right-4"} opacity-10`}
                      >
                        <Quote
                          className={`h-10 w-10 ${
                            testimonial.color === "blue"
                              ? "text-blue-300"
                              : testimonial.color === "purple"
                                ? "text-purple-300"
                                : testimonial.color === "teal"
                                  ? "text-teal-300"
                                  : testimonial.color === "amber"
                                    ? "text-amber-300"
                                    : "text-rose-300"
                          }`}
                        />
                      </div>

                      {/* Rating */}
                      <div
                        className={`flex ${isEven ? "justify-end" : "justify-start"} mb-4`}
                      >
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <blockquote className="mb-6">
                        <p className="text-lg leading-relaxed text-gray-700">
                          &quot;{testimonial.content}&quot;
                        </p>
                      </blockquote>

                      {/* Author */}
                      <div
                        className={`flex items-center ${isEven ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`${isEven ? "order-2 ml-4" : "order-1 mr-4"}`}
                        >
                          <div className="relative h-12 w-12 overflow-hidden rounded-full">
                            <Image
                              src={testimonial.image || "/placeholder.svg"}
                              alt={testimonial.name}
                              fill
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>
                        <div
                          className={`${isEven ? "order-1 text-right" : "order-2 text-left"}`}
                        >
                          <h3 className="font-bold text-gray-900">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Empty space for alternate layout */}
                <div className="hidden w-5/12 md:block" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineTestimonials;
