"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  bgImage: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alexandra Chen",
    role: "Creative Director",
    company: "Artisan Studios",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The rebrand exceeded our expectations. The new visual identity perfectly captures our company&pos;s essence while feeling fresh and contemporary. The attention to detail in every aspect of the design is remarkable.",
    rating: 5,
    bgImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "CEO",
    company: "TechVision Inc.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their strategic approach to our digital transformation has revolutionized our business. We&pos;ve seen a 200% increase in online engagement and a significant boost in conversion rates since implementing their solutions.",
    rating: 5,
    bgImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 3,
    name: "Sophia Rodriguez",
    role: "Marketing VP",
    company: "Global Retail Group",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The marketing campaign they developed for our product launch exceeded all KPIs. Their data-driven approach combined with creative excellence delivered exceptional results in a highly competitive market.",
    rating: 5,
    bgImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Product Manager",
    company: "Innovate Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The user experience design for our app has transformed how our customers interact with our product. User engagement is up 70% and we&pos;ve received overwhelmingly positive feedback about the intuitive interface.",
    rating: 5,
    bgImage:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  },
];

const ParallaxSliderTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [isInView, activeIndex]);

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-900 py-24 text-white dark:bg-black"
    >
      {/* Background with parallax effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background image with overlay */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTestimonial.id}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentTestimonial.bgImage})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900/90 dark:from-black/90 dark:via-black/80 dark:to-black/90" />

        {/* Parallax floating elements */}
        <div ref={containerRef} className="absolute inset-0">
          {/* Circles */}
          {[...Array(20)].map((_, i) => {
            const size = Math.random() * 100 + 50;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const opacity = Math.random() * 0.15 + 0.05;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: size,
                  height: size,
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity,
                  y: i % 3 === 0 ? y1 : i % 3 === 1 ? y2 : y3,
                }}
              />
            );
          })}

          {/* Quote marks */}
          <motion.div
            className="absolute left-[5%] top-[10%] text-white/10"
            style={{ y: y2 }}
          >
            <Quote className="h-32 w-32" />
          </motion.div>

          <motion.div
            className="absolute bottom-[10%] right-[5%] rotate-180 text-white/10"
            style={{ y: y3 }}
          >
            <Quote className="h-32 w-32" />
          </motion.div>
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Client Testimonials
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Hear what our clients have to say about their experience working
            with us
          </p>
        </motion.div>

        {/* Testimonial slider */}
        <div className="relative mx-auto max-w-4xl">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4 md:-mx-12 md:px-0">
            <motion.button
              onClick={handlePrev}
              className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="rounded-full bg-white/10 p-3 backdrop-blur-sm transition-colors hover:bg-white/20"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>
          </div>

          {/* Testimonial content */}
          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md md:p-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-center gap-8 md:flex-row"
              >
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-70 blur-sm" />
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-white/20 md:h-32 md:w-32">
                      <Image
                        src={
                          currentTestimonial.image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                        }
                        alt={currentTestimonial.name}
                        width={128}
                        height={128}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-grow text-center md:text-left">
                  <div className="mb-4 flex justify-center md:justify-start">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < currentTestimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`}
                      />
                    ))}
                  </div>

                  <blockquote className="mb-6">
                    <p className="text-lg leading-relaxed text-white md:text-xl">
                      &quot;{currentTestimonial.content}&quot;
                    </p>
                  </blockquote>

                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-gray-300">
                      {currentTestimonial.role}, {currentTestimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`h-3 w-3 rounded-full transition-all ${
                  index === activeIndex
                    ? "scale-125 bg-white"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === activeIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSliderTestimonials;
