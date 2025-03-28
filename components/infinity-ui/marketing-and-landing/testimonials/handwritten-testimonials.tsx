"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, PenTool } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  signature: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emma Thompson",
    role: "Creative Director",
    company: "Design Studio",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their creative approach transformed our brand identity. The thoughtful design system they created has given us a cohesive visual language that resonates with our audience.",
    signature: "Emma Thompson",
    rating: 5,
  },
  {
    id: 2,
    name: "Robert Chen",
    role: "Founder & CEO",
    company: "Startup Ventures",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "As a startup founder, I needed a partner who understood my vision and could bring it to life quickly. They delivered beyond my expectations, helping us secure our first round of funding.",
    signature: "Robert Chen",
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia Martinez",
    role: "Marketing Director",
    company: "Global Brands",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The digital marketing strategy they developed has transformed our customer acquisition. We&apos;ve seen a 200% increase in qualified leads and a 45% reduction in cost per acquisition.",
    signature: "Sophia Martinez",
    rating: 5,
  },
];

const HandwrittenTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isWriting, setIsWriting] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const handlePrev = () => {
    if (isWriting) return;
    setDirection(-1);
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    if (isWriting) return;
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Trigger writing animation when testimonial changes
  useEffect(() => {
    setIsWriting(true);
    const timer = setTimeout(() => {
      setIsWriting(false);
    }, 2000); // Duration of writing animation

    return () => clearTimeout(timer);
  }, [activeIndex]);

  const currentTestimonial = testimonials[activeIndex];

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.01,
      },
    }),
  };

  // Split text into characters for animation
  const splitText = (text: string) => {
    return text.split("").map((char, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="inline-block"
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white py-24"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo')] bg-repeat opacity-[0.02]" />

        {/* Notebook lines */}
        <div className="absolute inset-0 flex flex-col">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex-grow border-b border-amber-200/30" />
          ))}
        </div>

        {/* Paper texture */}
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp')] bg-repeat opacity-[0.03]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-amber-100/50 to-orange-100/50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-amber-100/50 to-yellow-100/50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4">
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500">
              <PenTool className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <h2 className="font-handwriting mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Client Testimonials
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Read what our clients have to say about their experience working
            with us
          </p>
        </motion.div>

        {/* Testimonial card */}
        <div className="relative mx-auto max-w-4xl">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4 md:-mx-12 md:px-0">
            <motion.button
              onClick={handlePrev}
              className="rounded-full bg-white p-3 shadow-md transition-shadow hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={isWriting}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="rounded-full bg-white p-3 shadow-md transition-shadow hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={isWriting}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </motion.button>
          </div>

          {/* Paper card */}
          <motion.div
            className="transform-style-3d rounded-2xl border border-amber-100 bg-white p-8 shadow-xl md:p-12"
            initial={{ rotateX: 10 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Rating */}
                <div className="mb-6 flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${i < currentTestimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                {/* Content with handwriting animation */}
                <blockquote className="mb-8">
                  <p className="font-handwriting text-xl leading-relaxed text-gray-700 md:text-2xl">
                    {isWriting
                      ? splitText(currentTestimonial.content)
                      : currentTestimonial.content}
                  </p>
                </blockquote>

                {/* Signature and author */}
                <div className="flex flex-col items-center">
                  <motion.div
                    className="font-signature mb-4 text-2xl text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isWriting ? 1.5 : 0, duration: 0.5 }}
                  >
                    {currentTestimonial.signature}
                  </motion.div>

                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="realtive h-16 w-16 overflow-hidden rounded-full border-2 border-amber-200">
                        <Image
                          src={
                            currentTestimonial.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          alt={currentTestimonial.name}
                          fill
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-gray-600">
                        {currentTestimonial.role}, {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Paper shadow */}
          <div className="absolute -bottom-2 left-2 right-2 -z-10 h-[calc(100%-10px)] rounded-2xl bg-amber-100/50" />
          <div className="absolute -bottom-4 left-4 right-4 -z-20 h-[calc(100%-20px)] rounded-2xl bg-amber-50/50" />
        </div>

        {/* Pagination dots */}
        <div className="mt-12 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isWriting) return;
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={`h-3 w-3 rounded-full transition-all ${
                index === activeIndex
                  ? "scale-125 bg-amber-500"
                  : "bg-amber-200 hover:bg-amber-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex ? "true" : "false"}
              disabled={isWriting}
            />
          ))}
        </div>
      </div>

      {/* Custom font styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Dancing+Script&display=swap");

        .font-handwriting {
          font-family: "Caveat", cursive;
        }

        .font-signature {
          font-family: "Dancing Script", cursive;
        }
      `}</style>
    </section>
  );
};

export default HandwrittenTestimonials;
