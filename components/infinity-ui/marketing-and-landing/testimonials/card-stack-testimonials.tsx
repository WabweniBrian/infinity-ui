"use client";

import { useState, useRef } from "react";
import { motion, useInView, type PanInfo } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
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
  color: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Wilson",
    role: "CTO",
    company: "TechVision Inc.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The development team&pos;s technical expertise is outstanding. They transformed our legacy system into a modern, scalable platform that&pos;s positioned us for future growth.",
    rating: 5,
    color: "blue",
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Marketing Director",
    company: "Global Brands",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The digital marketing strategy they developed increased our conversion rates by 150% and reduced our customer acquisition cost by 40%. Truly exceptional results.",
    rating: 5,
    color: "purple",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Product Manager",
    company: "NextGen Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their user experience design transformed our product. User engagement is up 70% and customer satisfaction scores have never been higher.",
    rating: 5,
    color: "teal",
  },
  {
    id: 4,
    name: "Olivia Martinez",
    role: "Operations Director",
    company: "Logistics Plus",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The supply chain optimization project reduced our delivery times by 35% and improved inventory accuracy to 99.8%. The ROI has been exceptional.",
    rating: 4,
    color: "amber",
  },
  {
    id: 5,
    name: "David Thompson",
    role: "CEO",
    company: "Startup Accelerate",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "As a startup, we needed a partner who could move quickly without sacrificing quality. They delivered our MVP in record time, helping us secure our next round of funding.",
    rating: 5,
    color: "rose",
  },
];

const CardStackTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 100;

    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }

    setIsDragging(false);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < testimonials.length - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getCardColor = (color: string) => {
    const colors: Record<
      string,
      { bg: string; border: string; shadow: string }
    > = {
      blue: {
        bg: "bg-blue-50 dark:bg-blue-900",
        border: "border-blue-200 dark:border-blue-700",
        shadow: "shadow-blue-200/50 dark:shadow-blue-900/30",
      },
      purple: {
        bg: "bg-purple-50 dark:bg-purple-900",
        border: "border-purple-200 dark:border-purple-700",
        shadow: "shadow-purple-200/50 dark:shadow-purple-900/30",
      },
      teal: {
        bg: "bg-teal-50 dark:bg-teal-900",
        border: "border-teal-200 dark:border-teal-700",
        shadow: "shadow-teal-200/50 dark:shadow-teal-900/30",
      },
      amber: {
        bg: "bg-amber-50 dark:bg-amber-900",
        border: "border-amber-200 dark:border-amber-700",
        shadow: "shadow-amber-200/50 dark:shadow-amber-900/30",
      },
      rose: {
        bg: "bg-rose-50 dark:bg-rose-900",
        border: "border-rose-200 dark:border-rose-700",
        shadow: "shadow-rose-200/50 dark:shadow-rose-900/30",
      },
    };

    return colors[color] || colors.blue;
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

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Client Testimonials
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Swipe or use the arrows to navigate through our client success
            stories
          </p>
        </motion.div>

        {/* Card stack */}
        <div className="relative mx-auto h-[400px] max-w-4xl md:h-[300px]">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4 md:-mx-12 md:px-0">
            <motion.button
              onClick={handlePrev}
              className="rounded-full bg-white p-3 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentIndex === 0}
              aria-label="Previous testimonial"
            >
              <ArrowLeft
                className={`h-6 w-6 ${currentIndex === 0 ? "text-gray-300 dark:text-gray-600" : "text-gray-700 dark:text-gray-300"}`}
              />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="rounded-full bg-white p-3 shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800 dark:shadow-gray-900/30"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentIndex === testimonials.length - 1}
              aria-label="Next testimonial"
            >
              <ArrowRight
                className={`h-6 w-6 ${currentIndex === testimonials.length - 1 ? "text-gray-300 dark:text-gray-600" : "text-gray-700 dark:text-gray-300"}`}
              />
            </motion.button>
          </div>

          {/* Card stack */}
          <div className="perspective-1000 absolute inset-0 flex items-center justify-center">
            {testimonials.map((testimonial, index) => {
              // Only render cards that are visible in the stack (current and next few)
              if (index < currentIndex || index > currentIndex + 2) return null;

              const isActive = index === currentIndex;
              const cardColor = getCardColor(testimonial.color);
              const offset = index - currentIndex;

              return (
                <motion.div
                  key={testimonial.id}
                  className={`absolute w-full max-w-2xl ${cardColor.bg} overflow-hidden rounded-2xl border ${cardColor.border} shadow-xl ${cardColor.shadow} transform-style-3d`}
                  style={{
                    zIndex: testimonials.length - offset,
                  }}
                  initial={false}
                  animate={{
                    rotateY: isDragging ? direction * 5 : 0,
                    x: offset * 20,
                    y: offset * 20,
                    scale: 1 - offset * 0.05,
                    opacity: 1 - offset * 0.2,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={handleDragEnd}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                      {/* Author image */}
                      <div className="flex-shrink-0">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white dark:border-gray-700 md:h-24 md:w-24">
                          <Image
                            src={
                              testimonial.image ||
                              "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                            }
                            alt={testimonial.name}
                            width={96}
                            height={96}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow text-center md:text-left">
                        <div className="mb-3 flex justify-center md:justify-start">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
                            />
                          ))}
                        </div>

                        <div className="relative mb-4">
                          <div className="absolute -left-2 -top-2 text-gray-200 dark:text-gray-700">
                            <Quote className="h-8 w-8" />
                          </div>
                          <blockquote className="relative z-10">
                            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                              &quot;{testimonial.content}&quot;
                            </p>
                          </blockquote>
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
              );
            })}
          </div>
        </div>

        {/* Pagination dots */}
        <div className="mt-16 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-3 w-3 rounded-full transition-all ${
                index === currentIndex
                  ? "scale-125 bg-blue-500"
                  : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardStackTestimonials;
