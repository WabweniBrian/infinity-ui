"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Mail, Stamp } from "lucide-react";
import Image from "next/image";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  location: string;
  date: string;
  content: string;
  stampColor: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Wabweni  rian",
    role: "Marketing Director",
    company: "Brand Innovators",
    location: "New York, NY",
    date: "June 12, 2023",
    content:
      "Your team's creative approach completely transformed our campaign. We saw engagement increase by 200% within the first month! Can't wait to work together again.",
    stampColor: "red",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    company: "TechLaunch",
    location: "San Francisco, CA",
    date: "August 3, 2023",
    content:
      "As a startup, we needed a partner who could move quickly without sacrificing quality. You delivered our MVP in record time, helping us secure our next round of funding!",
    stampColor: "blue",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "E-commerce Director",
    company: "Retail Innovations",
    location: "Miami, FL",
    date: "September 18, 2023",
    content:
      "The e-commerce solution you built increased our conversion rate by 45% and average order value by 30%. The ROI has been incredible. Sending our thanks!",
    stampColor: "green",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Creative Director",
    company: "Design Studio",
    location: "Portland, OR",
    date: "October 5, 2023",
    content:
      "Working with your team was a breath of fresh air! You understood our vision immediately and delivered a website that perfectly captures our brand's personality.",
    stampColor: "purple",
  },
  {
    id: 5,
    name: "Olivia Wilson",
    role: "Product Owner",
    company: "SaaS Platform",
    location: "Austin, TX",
    date: "November 22, 2023",
    content:
      "Your attention to detail and user-focused design philosophy helped us simplify our complex product. Our users love the new interface! Greetings from Austin!",
    stampColor: "amber",
  },
];

const VintagePostcardTestimonials = () => {
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

  const getStampColor = (color: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      red: { bg: "bg-red-100", text: "text-red-700" },
      blue: { bg: "bg-blue-100", text: "text-blue-700" },
      green: { bg: "bg-green-100", text: "text-green-700" },
      purple: { bg: "bg-purple-100", text: "text-purple-700" },
      amber: { bg: "bg-amber-100", text: "text-amber-700" },
    };

    return colors[color] || colors.red;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-amber-50 py-24"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-[0.03]" />

      {/* Decorative elements */}
      <div className="absolute right-10 top-10 opacity-20">
        <Mail className="h-16 w-16 text-amber-800" />
      </div>

      <div className="absolute bottom-10 left-10 opacity-20">
        <MapPin className="h-16 w-16 text-amber-800" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-handwritten mb-4 text-4xl font-bold tracking-tight text-amber-900 md:text-5xl">
            Postcards from Our Clients
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-amber-800">
            Heartfelt messages from around the world
          </p>
        </motion.div>

        {/* Navigation buttons */}
        <div className="mb-8 flex justify-center gap-4">
          <motion.button
            onClick={handlePrev}
            className="rounded-full border border-amber-200 bg-amber-100 p-3 transition-colors hover:bg-amber-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-amber-800" />
          </motion.button>

          <motion.button
            onClick={handleNext}
            className="rounded-full border border-amber-200 bg-amber-100 p-3 transition-colors hover:bg-amber-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-amber-800" />
          </motion.button>
        </div>

        {/* Postcard slider */}
        <div className="perspective-1000 relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait" custom={direction}>
            {testimonials.map((testimonial, index) => {
              if (index !== activeIndex) return null;

              const stampColor = getStampColor(testimonial.stampColor);

              return (
                <motion.div
                  key={testimonial.id}
                  custom={direction}
                  initial={{
                    rotateY: direction * 90,
                    opacity: 0,
                  }}
                  animate={{
                    rotateY: 0,
                    opacity: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    },
                  }}
                  exit={{
                    rotateY: direction * -90,
                    opacity: 0,
                    transition: {
                      duration: 0.3,
                    },
                  }}
                  className="transform-style-3d w-full"
                >
                  {/* Postcard */}
                  <div className="transform-style-3d overflow-hidden rounded-lg border border-amber-200 bg-amber-100 shadow-xl">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Front side (image and greeting) */}
                      <div className="relative border-r border-amber-200 bg-white p-6">
                        {/* Vintage texture overlay */}
                        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-[0.05]" />

                        {/* Location image placeholder */}
                        <div className="relative mb-4 h-40 overflow-hidden rounded border border-amber-200">
                          <Image
                            src="/images/default-image.jpg"
                            alt={`Greetings from ${testimonial.location}`}
                            className="h-full w-full object-cover"
                          />

                          {/* Vintage filter overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-amber-50/30 mix-blend-multiply" />

                          {/* Location text */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="font-handwritten text-2xl font-bold tracking-wide text-white shadow-sm">
                              Greetings from
                              <br />
                              {testimonial.location}
                            </h3>
                          </div>
                        </div>

                        {/* Company info */}
                        <div className="font-handwritten text-center">
                          <p className="text-lg text-amber-800">
                            {testimonial.company}
                          </p>
                          <p className="text-sm text-amber-700">
                            {testimonial.role}
                          </p>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute bottom-2 right-2 opacity-30">
                          <MapPin className="h-6 w-6 text-amber-800" />
                        </div>
                      </div>

                      {/* Back side (message) */}
                      <div className="relative bg-amber-50 p-6">
                        {/* Postcard lines */}
                        <div className="pointer-events-none absolute inset-0 flex flex-col justify-start">
                          {[...Array(12)].map((_, i) => (
                            <div
                              key={i}
                              className="mt-8 h-px w-full bg-amber-200"
                              style={{ marginTop: `${i * 2 + 3}rem` }}
                            />
                          ))}
                        </div>

                        {/* Stamp */}
                        <div className="absolute right-4 top-4">
                          <div
                            className={`relative h-20 w-16 ${stampColor.bg} flex items-center justify-center overflow-hidden rounded-sm border border-dashed border-amber-300`}
                          >
                            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=50&width=50')] bg-repeat opacity-[0.05]" />
                            <div className={`text-center ${stampColor.text}`}>
                              <Stamp className="mx-auto mb-1 h-8 w-8" />
                              <p className="font-handwritten text-xs">
                                THANK YOU
                              </p>
                            </div>

                            {/* Perforated edges */}
                            <div className="absolute inset-x-0 top-0 flex h-px bg-amber-300">
                              {[...Array(8)].map((_, i) => (
                                <div
                                  key={i}
                                  className="mx-px h-1 w-px bg-amber-50"
                                />
                              ))}
                            </div>
                            <div className="absolute inset-x-0 bottom-0 flex h-px bg-amber-300">
                              {[...Array(8)].map((_, i) => (
                                <div
                                  key={i}
                                  className="mx-px h-1 w-px bg-amber-50"
                                />
                              ))}
                            </div>
                            <div className="absolute inset-y-0 left-0 flex w-px flex-col bg-amber-300">
                              {[...Array(10)].map((_, i) => (
                                <div
                                  key={i}
                                  className="my-px h-px w-1 bg-amber-50"
                                />
                              ))}
                            </div>
                            <div className="absolute inset-y-0 right-0 flex w-px flex-col bg-amber-300">
                              {[...Array(10)].map((_, i) => (
                                <div
                                  key={i}
                                  className="my-px h-px w-1 bg-amber-50"
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Postmark */}
                        <div className="absolute right-24 top-6 rotate-12 opacity-70">
                          <div className="font-mono text-xs text-amber-700">
                            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border border-amber-300">
                              <p className="text-[8px]">POSTMARKED</p>
                              <p className="text-[10px] font-bold">
                                {testimonial.date.split(" ")[0]}
                              </p>
                              <p className="text-[8px]">
                                {testimonial.date.split(" ")[1]}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Message content */}
                        <div className="font-handwritten pt-10">
                          <p className="mb-6 text-lg leading-relaxed text-amber-900">
                            {testimonial.content}
                          </p>

                          <p className="mt-4 text-right text-amber-800">
                            Best regards,
                            <br />
                            <span className="text-xl font-bold">
                              {testimonial.name}
                            </span>
                          </p>
                        </div>

                        {/* Date */}
                        <div className="font-handwritten absolute bottom-4 left-6 text-sm text-amber-700">
                          {testimonial.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((testimonial, index) => {
            const stampColor = getStampColor(testimonial.stampColor);
            return (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={`h-3 w-3 rounded-full transition-all ${
                  index === activeIndex
                    ? `${stampColor.bg} scale-125 border border-amber-300`
                    : "bg-amber-200 hover:bg-amber-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === activeIndex ? "true" : "false"}
              />
            );
          })}
        </div>
      </div>

      {/* Add custom font for handwritten look */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap");

        .font-handwritten {
          font-family: "Caveat", cursive;
        }
      `}</style>
    </section>
  );
};

export default VintagePostcardTestimonials;
