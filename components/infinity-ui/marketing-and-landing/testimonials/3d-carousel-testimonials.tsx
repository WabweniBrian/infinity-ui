"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

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
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechVision Inc.",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The team delivered beyond our expectations. Our website traffic increased by 150% within three months of launch, and our conversion rate has doubled. Their strategic approach to design and user experience has transformed our digital presence.",
    rating: 5,
    color: "blue",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder & CEO",
    company: "Innovate Solutions",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Working with this agency has been a game-changer for our startup. They understood our vision perfectly and created a brand identity that resonates with our target audience. Their attention to detail and creative problem-solving is unmatched.",
    rating: 5,
    color: "purple",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "Elevate Digital",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "The redesign of our app resulted in a 70% increase in user engagement and a significant decrease in bounce rate. Their team's expertise in UX/UI design and development has helped us create an intuitive, seamless experience for our users.",
    rating: 4,
    color: "teal",
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Operations Director",
    company: "Global Retail Group",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their e-commerce solution has revolutionized our online sales. We&apos;ve seen a 200% increase in mobile conversions and a 45% reduction in cart abandonment. The intuitive admin dashboard makes managing our online store effortless.",
    rating: 5,
    color: "amber",
  },
  {
    id: 5,
    name: "Sophia Patel",
    role: "Creative Director",
    company: "Artisan Studios",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "As a design-focused company, we had high expectations, and they exceeded every one of them. Their collaborative approach ensured our brand's unique personality shines through while delivering a website that performs exceptionally well.",
    rating: 5,
    color: "rose",
  },
];

const Carousel3DTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: false,
    margin: "-100px 0px",
  });

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || !isInView) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, isInView]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  // Calculate position and rotation for each card
  const getCardStyles = (index: number) => {
    const diff =
      (index - activeIndex + testimonials.length) % testimonials.length;
    let normalizedDiff = diff;

    if (diff > testimonials.length / 2) {
      normalizedDiff = diff - testimonials.length;
    }

    // Calculate z-index, rotation, and position based on distance from active
    const zIndex = 10 - Math.abs(normalizedDiff);
    const opacity = 1 - Math.min(0.8, Math.abs(normalizedDiff) * 0.2);
    const scale = 1 - Math.min(0.4, Math.abs(normalizedDiff) * 0.1);

    let x = 0;
    let rotateY = 0;

    if (normalizedDiff !== 0) {
      const direction = normalizedDiff < 0 ? -1 : 1;
      x = direction * (Math.min(Math.abs(normalizedDiff), 2) * 200);
      rotateY = -direction * Math.min(Math.abs(normalizedDiff), 2) * 15;
    }

    return {
      zIndex,
      opacity,
      scale,
      x,
      rotateY,
    };
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-50 to-purple-50"
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
            What Our Clients Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Discover why leading companies choose our services to drive their
            success
          </p>
        </motion.div>

        {/* 3D Carousel */}
        <div className="perspective-1000 relative mb-12 h-[500px] md:h-[400px]">
          <div className="absolute inset-x-0 top-1/2 z-20 flex -translate-y-1/2 items-center justify-between px-4">
            <button
              onClick={handlePrev}
              className="rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button
              onClick={handleNext}
              className="rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            {testimonials.map((testimonial, index) => {
              const { zIndex, opacity, scale, x, rotateY } =
                getCardStyles(index);

              return (
                <motion.div
                  key={testimonial.id}
                  className="transform-style-3d absolute w-full max-w-2xl"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity,
                    x,
                    scale,
                    rotateY: `${rotateY}deg`,
                    zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="transform-style-3d relative overflow-hidden rounded-2xl bg-white shadow-xl">
                    {/* Colored accent border */}
                    <div
                      className={`absolute left-0 right-0 top-0 h-2 ${
                        testimonial.color === "blue"
                          ? "bg-blue-500"
                          : testimonial.color === "purple"
                            ? "bg-purple-500"
                            : testimonial.color === "teal"
                              ? "bg-teal-500"
                              : testimonial.color === "amber"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                      }`}
                    />

                    <div className="p-8 md:p-10">
                      {/* Quote icon */}
                      <div className="absolute right-8 top-8 opacity-10">
                        <Quote className="h-16 w-16 text-gray-400" />
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-6 md:flex-row md:gap-10">
                        <div className="flex-shrink-0">
                          <div className="relative h-20 w-20 overflow-hidden rounded-xl md:h-24 md:w-24">
                            <Image
                              src={
                                testimonial.image ||
                                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                              }
                              alt={testimonial.name}
                              fill
                              className="h-full w-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-grow">
                          <div className="mb-2 flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>

                          <blockquote className="mb-6">
                            <p className="text-lg leading-relaxed text-gray-700">
                              &quot;{testimonial.content}&quot;
                            </p>
                          </blockquote>

                          <div>
                            <h3 className="text-lg font-bold text-gray-900">
                              {testimonial.name}
                            </h3>
                            <p className="text-gray-600">
                              {testimonial.role}, {testimonial.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-8 bg-blue-500"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === activeIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel3DTestimonials;
