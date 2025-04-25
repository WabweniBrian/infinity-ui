"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimationControls,
} from "framer-motion";
import { Star, Quote } from "lucide-react";
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
};

// Generate a large number of testimonials for infinite scroll
const generateTestimonials = (): Testimonial[] => {
  const baseTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO",
      company: "Innovate Tech",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
      content:
        "Working with this team transformed our business. Their strategic approach and technical expertise helped us launch our platform months ahead of schedule.",
      rating: 5,
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
      rating: 5,
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
      rating: 4,
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
      rating: 5,
    },
  ];

  // Duplicate and modify to create more testimonials
  return [...Array(4)].flatMap((_, i) =>
    baseTestimonials.map((testimonial, j) => ({
      ...testimonial,
      id: i * baseTestimonials.length + j + 1,
      name:
        i > 0
          ? `${testimonial.name.split(" ")[0]} ${String.fromCharCode(65 + i)}`
          : testimonial.name,
    })),
  );
};

const testimonials = generateTestimonials();

const InfiniteScrollTestimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const verticalScrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const horizontalControls = useAnimationControls();
  const verticalControls = useAnimationControls();

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Infinite scroll effect
  useEffect(() => {
    if (!isInView) return;

    // Horizontal scroll animation
    const horizontalAnimation = async () => {
      await horizontalControls.start({
        x: "-50%",
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
      });
    };

    // Vertical scroll animation
    const verticalAnimation = async () => {
      await verticalControls.start({
        y: "-50%",
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
      });
    };

    horizontalAnimation();
    verticalAnimation();

    return () => {
      horizontalControls.stop();
      verticalControls.stop();
    };
  }, [isInView, horizontalControls, verticalControls]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-purple-50 to-pink-50 py-24 dark:from-gray-950 dark:via-purple-950 dark:to-gray-900"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-indigo-100/50 to-purple-100/50 dark:from-indigo-800/30 dark:to-purple-800/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-purple-100/50 to-pink-100/50 dark:from-purple-800/30 dark:to-pink-800/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
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
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Join hundreds of satisfied customers who have transformed their
            business with our solutions
          </p>
        </motion.div>

        {/* Horizontal infinite scroll */}
        <div className="relative mb-16 overflow-hidden">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-indigo-50 to-transparent dark:from-indigo-950" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-indigo-50 to-transparent dark:from-indigo-950" />

          <div className="overflow-hidden">
            <motion.div
              ref={horizontalScrollRef}
              className="flex w-max gap-6 py-4"
              animate={horizontalControls}
              style={{ x: 0 }}
            >
              {/* First set of testimonials */}
              {testimonials.slice(0, 10).map((testimonial) => (
                <motion.div
                  key={`h-${testimonial.id}`}
                  className="w-80 flex-shrink-0 rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  style={{ y: y1 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
                      />
                    ))}
                  </div>

                  <blockquote className="mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </blockquote>

                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={
                            testimonial.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                          }
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Duplicate set for seamless loop */}
              {testimonials.slice(0, 10).map((testimonial) => (
                <motion.div
                  key={`h-dup-${testimonial.id}`}
                  className="w-80 flex-shrink-0 rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                  style={{ y: y1 }}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <div className="mb-4 flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
                      />
                    ))}
                  </div>

                  <blockquote className="mb-6">
                    <p className="text-gray-700 dark:text-gray-300">
                      &quot;{testimonial.content}&quot;
                    </p>
                  </blockquote>

                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <Image
                          src={
                            testimonial.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                          }
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Vertical infinite scroll */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Left column */}
          <div className="relative h-[600px] overflow-hidden">
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-20 bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-950" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-indigo-50 to-transparent dark:from-indigo-950" />

            <div className="h-full overflow-hidden">
              <motion.div
                className="flex w-full flex-col gap-6"
                animate={verticalControls}
                style={{ y: 0 }}
              >
                {/* First set of testimonials */}
                {testimonials.slice(10, 15).map((testimonial) => (
                  <motion.div
                    key={`v1-${testimonial.id}`}
                    className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    style={{ x: y2 }}
                    whileHover={{ x: -10, transition: { duration: 0.2 } }}
                  >
                    <div className="mb-4 text-indigo-400 dark:text-indigo-300">
                      <Quote className="h-6 w-6" />
                    </div>

                    <blockquote className="mb-6">
                      <p className="text-gray-700 dark:text-gray-300">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </blockquote>

                    <div className="flex items-center">
                      <div className="mr-3 flex-shrink-0">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={
                              testimonial.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                            }
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Duplicate set for seamless loop */}
                {testimonials.slice(10, 15).map((testimonial) => (
                  <motion.div
                    key={`v1-dup-${testimonial.id}`}
                    className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    style={{ x: y2 }}
                    whileHover={{ x: -10, transition: { duration: 0.2 } }}
                  >
                    <div className="mb-4 text-indigo-400 dark:text-indigo-300">
                      <Quote className="h-6 w-6" />
                    </div>

                    <blockquote className="mb-6">
                      <p className="text-gray-700 dark:text-gray-300">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </blockquote>

                    <div className="flex items-center">
                      <div className="mr-3 flex-shrink-0">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={
                              testimonial.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                            }
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Middle column */}
          <div className="relative h-[600px] overflow-hidden">
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-20 bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-950" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-indigo-50 to-transparent dark:from-indigo-950" />

            <div className="h-full overflow-hidden">
              <motion.div
                className="flex w-full flex-col gap-6"
                animate={verticalControls}
                style={{ y: "25%" }} // Start offset for visual variety
              >
                {/* Second set of testimonials */}
                {testimonials.slice(15, 20).map((testimonial) => (
                  <motion.div
                    key={`v2-${testimonial.id}`}
                    className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
                        />
                      ))}
                    </div>

                    <blockquote className="mb-6">
                      <p className="text-gray-700 dark:text-gray-300">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </blockquote>

                    <div className="flex items-center">
                      <div className="mr-3 flex-shrink-0">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={
                              testimonial.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                            }
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Duplicate set for seamless loop */}
                {testimonials.slice(15, 20).map((testimonial) => (
                  <motion.div
                    key={`v2-dup-${testimonial.id}`}
                    className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  >
                    <div className="mb-4 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
                        />
                      ))}
                    </div>

                    <blockquote className="mb-6">
                      <p className="text-gray-700 dark:text-gray-300">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </blockquote>

                    <div className="flex items-center">
                      <div className="mr-3 flex-shrink-0">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={
                              testimonial.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                            }
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right column */}
          <div className="relative h-[600px] overflow-hidden">
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-20 bg-gradient-to-b from-indigo-50 to-transparent dark:from-indigo-950" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-indigo-50 to-transparent dark:from-indigo-950" />

            <div className="h-full overflow-hidden">
              <motion.div
                className="flex w-full flex-col gap-6"
                animate={verticalControls}
                style={{ y: "-25%" }} // Start offset for visual variety
              >
                {/* Third set of testimonials */}
                {testimonials.slice(0, 5).map((testimonial) => (
                  <motion.div
                    key={`v3-${testimonial.id}`}
                    className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    style={{ x: y1 }}
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  >
                    <div className="mb-4 text-purple-400 dark:text-purple-300">
                      <Quote className="h-6 w-6" />
                    </div>

                    <blockquote className="mb-6">
                      <p className="text-gray-700 dark:text-gray-300">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </blockquote>

                    <div className="flex items-center">
                      <div className="mr-3 flex-shrink-0">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={
                              testimonial.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                            }
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Duplicate set for seamless loop */}
                {testimonials.slice(0, 5).map((testimonial) => (
                  <motion.div
                    key={`v3-dup-${testimonial.id}`}
                    className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    style={{ x: y1 }}
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  >
                    <div className="mb-4 text-purple-400 dark:text-purple-300">
                      <Quote className="h-6 w-6" />
                    </div>

                    <blockquote className="mb-6">
                      <p className="text-gray-700 dark:text-gray-300">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </blockquote>

                    <div className="flex items-center">
                      <div className="mr-3 flex-shrink-0">
                        <div className="h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={
                              testimonial.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                            }
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteScrollTestimonials;
