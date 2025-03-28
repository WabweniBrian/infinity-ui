"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TestimonialType = "quote" | "video" | "stats" | "rating" | "featured";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating?: number;
  type: TestimonialType;
  stats?: {
    label: string;
    value: string;
  }[];
  videoThumbnail?: string;
  accent: string;
  size?: "sm" | "md" | "lg";
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "Innovate Tech",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Working with this team transformed our business. Their strategic approach and technical expertise helped us launch our platform months ahead of schedule.",
    type: "featured",
    accent: "blue",
    size: "lg",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    company: "Global Brands",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The digital marketing strategy they developed increased our conversion rates by 150% and reduced our customer acquisition cost by 40%.",
    rating: 5,
    type: "rating",
    accent: "purple",
    size: "md",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "NextGen Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their user experience design transformed our product. User engagement is up 70% and customer satisfaction scores have never been higher.",
    type: "quote",
    accent: "teal",
    size: "sm",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Operations Director",
    company: "Logistics Plus",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The supply chain optimization project reduced our delivery times by 35% and improved inventory accuracy to 99.8%.",
    type: "video",
    videoThumbnail:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    accent: "amber",
    size: "md",
  },
  {
    id: 5,
    name: "Jessica Lee",
    role: "E-commerce Manager",
    company: "Retail Innovations",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Since implementing their e-commerce solution, our mobile conversion rate has increased by 65% and average order value is up by 30%.",
    type: "stats",
    stats: [
      { label: "Conversion Rate", value: "+65%" },
      { label: "Order Value", value: "+30%" },
      { label: "Mobile Sales", value: "+120%" },
    ],
    accent: "rose",
    size: "md",
  },
  {
    id: 6,
    name: "Robert Wilson",
    role: "CTO",
    company: "TechVision Inc.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The development team&pos;s technical expertise is outstanding. They transformed our legacy system into a modern, scalable platform.",
    type: "quote",
    accent: "indigo",
    size: "sm",
  },
  {
    id: 7,
    name: "Sophia Martinez",
    role: "CEO",
    company: "HealthPlus",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their healthcare software has improved patient care and reduced administrative overhead by 40%. The ROI has exceeded our expectations.",
    rating: 5,
    type: "rating",
    accent: "green",
    size: "sm",
  },
];

const BentoGridTestimonials = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const getAccentColor = (accent: string, opacity = 1) => {
    const colors: Record<string, string> = {
      blue: `rgba(59, 130, 246, ${opacity})`,
      purple: `rgba(139, 92, 246, ${opacity})`,
      teal: `rgba(20, 184, 166, ${opacity})`,
      amber: `rgba(245, 158, 11, ${opacity})`,
      rose: `rgba(244, 63, 94, ${opacity})`,
      indigo: `rgba(99, 102, 241, ${opacity})`,
      green: `rgba(34, 197, 94, ${opacity})`,
    };

    return colors[accent] || colors.blue;
  };

  const getGridSpan = (size?: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm":
        return "col-span-1 row-span-1";
      case "md":
        return "col-span-1 md:col-span-2 row-span-1";
      case "lg":
        return "col-span-1 md:col-span-2 row-span-2";
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-900 dark:to-gray-800 dark:text-white"
    >
      {/* Darkmode toggle */}
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
          className="mb-16 text-center"
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

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`${getGridSpan(testimonial.size)} group`}
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
                className={`relative h-full overflow-hidden rounded-2xl ${
                  testimonial.type === "featured"
                    ? "border border-gray-100 bg-gradient-to-br from-gray-900 to-gray-800 text-white dark:border dark:border-gray-700"
                    : "border border-gray-100 bg-white shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                } p-6 transition-all duration-300`}
              >
                {/* Accent line */}
                <div
                  className="absolute left-0 right-0 top-0 h-1"
                  style={{
                    backgroundColor: getAccentColor(testimonial.accent),
                  }}
                />

                {/* Content based on type */}
                {testimonial.type === "featured" && (
                  <div className="flex h-full flex-col">
                    <div className="relative mb-6">
                      <div className="absolute -left-2 -top-2 text-white/10">
                        <Quote className="h-16 w-16" />
                      </div>
                      <blockquote className="relative z-10">
                        <p className="text-xl font-medium leading-relaxed text-white md:text-2xl">
                          &quot;{testimonial.content}&quot;
                        </p>
                      </blockquote>
                    </div>

                    <div className="mt-auto flex items-center">
                      <div className="mr-4 flex-shrink-0">
                        <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-gray-700">
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
                      <div>
                        <h3 className="font-bold text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-300">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>

                    <div className="absolute bottom-6 right-6">
                      <motion.div
                        className="rounded-full bg-white/10 p-2"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <ArrowUpRight className="h-5 w-5 text-white" />
                      </motion.div>
                    </div>
                  </div>
                )}

                {testimonial.type === "quote" && (
                  <div className="flex h-full flex-col">
                    <div className="mb-4 text-gray-400">
                      <Quote className="h-6 w-6" />
                    </div>

                    <blockquote className="mb-4 flex-grow">
                      <p className="text-gray-700 dark:text-gray-300">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </blockquote>

                    <div className="flex items-center">
                      <div className="mr-3 flex-shrink-0">
                        <div className="h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={
                              testimonial.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                            }
                            alt={testimonial.name}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {testimonial.type === "rating" && (
                  <div className="flex h-full flex-col">
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < (testimonial.rating || 5) ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
                        />
                      ))}
                    </div>

                    <blockquote className="mb-4 flex-grow">
                      <p className="text-gray-700 dark:text-gray-300">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </blockquote>

                    <div className="flex items-center">
                      <div className="mr-3 flex-shrink-0">
                        <div className="h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={
                              testimonial.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                            }
                            alt={testimonial.name}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {testimonial.type === "video" && (
                  <div className="flex h-full flex-col">
                    <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={
                          testimonial.videoThumbnail ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt="Video thumbnail"
                        width={600}
                        height={400}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.button
                          className="rounded-full bg-white/90 p-3 shadow-lg"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Play className="h-6 w-6 text-gray-900" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="mr-3 flex-shrink-0">
                        <div className="h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={
                              testimonial.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                            }
                            alt={testimonial.name}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200">
                          {testimonial.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {testimonial.type === "stats" && testimonial.stats && (
                  <div className="flex h-full flex-col">
                    <h3 className="mb-4 font-medium text-gray-900 dark:text-gray-200">
                      {testimonial.name}, {testimonial.role}
                    </h3>

                    <blockquote className="mb-6 flex-grow">
                      <p className="text-gray-700 dark:text-gray-300">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </blockquote>

                    <div className="grid grid-cols-3 gap-2">
                      {testimonial.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="rounded-lg bg-gray-50 p-2 text-center dark:bg-gray-700"
                        >
                          <p
                            className="text-xl font-bold"
                            style={{
                              color: getAccentColor(testimonial.accent),
                            }}
                          >
                            {stat.value}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hover effect */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at var(--x, 50%) var(--y, 50%), ${getAccentColor(testimonial.accent, 0.1)} 0%, transparent 100%)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mouse follow effect script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const cards = document.querySelectorAll('.group');
            
            cards.forEach(card => {
              card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                card.querySelector('.group-hover\\:opacity-100').style.setProperty('--x', x + '%');
                card.querySelector('.group-hover\\:opacity-100').style.setProperty('--y', y + '%');
              });
            });
          });
        `,
        }}
      />
    </section>
  );
};

export default BentoGridTestimonials;
