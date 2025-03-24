"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Camera, Heart } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rotation: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "Brand Innovators",
    image: "/placeholder.svg?height=400&width=400",
    content:
      "The creative approach they brought to our marketing materials completely transformed our campaign. We saw engagement increase by 200% within the first month!",
    rotation: -3,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    company: "TechLaunch",
    image: "/placeholder.svg?height=400&width=400",
    content:
      "As a startup, we needed a partner who could move quickly without sacrificing quality. They delivered our MVP in record time, helping us secure our next round of funding.",
    rotation: 2,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "E-commerce Director",
    company: "Retail Innovations",
    image: "/placeholder.svg?height=400&width=400",
    content:
      "The e-commerce solution they built for us increased our conversion rate by 45% and average order value by 30%. The ROI has been incredible.",
    rotation: -2,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Creative Director",
    company: "Design Studio",
    image: "/placeholder.svg?height=400&width=400",
    content:
      "Working with this team was a breath of fresh air! They understood our vision immediately and delivered a website that perfectly captures our brand's personality.",
    rotation: 3,
  },
  {
    id: 5,
    name: "Olivia Wilson",
    role: "Product Owner",
    company: "SaaS Platform",
    image: "/placeholder.svg?height=400&width=400",
    content:
      "Their attention to detail and user-focused design philosophy helped us simplify our complex product. Our users love the new interface!",
    rotation: -1,
  },
];

const PolaroidStackTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

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

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white py-24"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-[0.02]" />

        {/* Vintage camera */}
        <motion.div
          className="absolute right-20 top-20 text-amber-300 opacity-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 0.8 }}
        >
          <Camera className="h-24 w-24" />
        </motion.div>

        {/* Film strip */}
        <div className="absolute bottom-10 left-10 right-10 flex h-12 justify-between opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="h-full w-8 rounded-sm border-2 border-gray-400"
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-vintage mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Client Memories
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Snapshots of success stories from our valued clients
          </p>
        </motion.div>

        {/* Polaroid stack */}
        <div className="relative mx-auto h-[600px] max-w-4xl md:h-[700px]">
          {/* Navigation buttons */}
          <div className="absolute left-0 right-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-4 md:-mx-12 md:px-0">
            <motion.button
              onClick={handlePrev}
              className="rounded-full bg-white p-3 shadow-md transition-shadow hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </motion.button>

            <motion.button
              onClick={handleNext}
              className="rounded-full bg-white p-3 shadow-md transition-shadow hover:shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </motion.button>
          </div>

          {/* Polaroid stack */}
          <div className="perspective-1000 absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) => {
                // Only render the active polaroid and a few behind it
                if (
                  index !== activeIndex &&
                  index !== (activeIndex + 1) % testimonials.length &&
                  index !== (activeIndex + 2) % testimonials.length
                )
                  return null;

                const isActive = index === activeIndex;
                const stackPosition =
                  (index - activeIndex + testimonials.length) %
                  testimonials.length;

                return (
                  <motion.div
                    key={testimonial.id}
                    className="absolute w-full max-w-md"
                    initial={false}
                    animate={{
                      rotateZ: isActive
                        ? testimonial.rotation
                        : testimonial.rotation / 2,
                      scale: 1 - stackPosition * 0.05,
                      y: stackPosition * 10,
                      zIndex: testimonials.length - stackPosition,
                      opacity: 1 - stackPosition * 0.2,
                    }}
                    exit={{
                      rotateZ: testimonial.rotation,
                      y: -100,
                      opacity: 0,
                      transition: { duration: 0.3 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    {/* Polaroid frame */}
                    <div className="transform-style-3d rounded-sm bg-white p-4 shadow-xl">
                      {/* Image */}
                      <div className="relative mb-4 aspect-square overflow-hidden bg-gray-100">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="h-full w-full object-cover"
                        />

                        {/* Vintage filter overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-amber-50/20 mix-blend-multiply" />

                        {/* Date stamp */}
                        <div className="absolute bottom-2 right-2 bg-white/80 px-2 py-1 font-mono text-xs text-gray-700">
                          {new Date().toLocaleDateString("en-US", {
                            month: "2-digit",
                            day: "2-digit",
                            year: "2-digit",
                          })}
                        </div>
                      </div>

                      {/* Caption */}
                      <div className="text-center">
                        <p className="font-vintage mb-3 text-lg leading-relaxed text-gray-700">
                          &quot;
                          {testimonial.content.length > 100
                            ? testimonial.content.substring(0, 100) + "..."
                            : testimonial.content}
                          &quot;
                        </p>

                        <div className="font-vintage flex items-center justify-center gap-1 text-gray-600">
                          <span>{testimonial.name}</span>
                          <Heart className="h-3 w-3 fill-red-400 text-red-400" />
                          <span>{testimonial.company}</span>
                        </div>
                      </div>

                      {/* Tape pieces */}
                      <div className="absolute -top-2 left-1/2 h-6 w-16 -translate-x-1/2 rotate-3 bg-gray-100/80 shadow-sm" />
                      <div className="absolute -bottom-2 left-6 h-6 w-12 -rotate-6 bg-gray-100/80 shadow-sm" />
                    </div>

                    {/* Full testimonial on hover for active polaroid */}
                    {isActive && (
                      <motion.div
                        className="absolute left-full top-1/2 ml-6 hidden w-full max-w-xs -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg md:block"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: 0.2 }}
                      >
                        <blockquote className="mb-4">
                          <p className="text-gray-700">
                            &quot;{testimonial.content}&quot;
                          </p>
                        </blockquote>

                        <div>
                          <h3 className="font-bold text-gray-900">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
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
                  ? "scale-125 bg-amber-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>

      {/* Add custom font for vintage look */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");

        .font-vintage {
          font-family: "Playfair Display", serif;
        }
      `}</style>
    </section>
  );
};

export default PolaroidStackTestimonials;
