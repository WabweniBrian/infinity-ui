"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { Star } from "lucide-react";
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

// Base testimonials
const baseTestimonials: Testimonial[] = [
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
  {
    id: 6,
    name: "Alex Rivera",
    role: "CTO",
    company: "TechForward",
    image:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    content:
      "Their development team is exceptional. They delivered a complex application with perfect code quality, and their ongoing support has been invaluable.",
    rating: 5,
  },
];

// Generate more testimonials for the infinite scroll
const generateTestimonials = (): Testimonial[] => {
  return [...Array(3)].flatMap((_, i) =>
    baseTestimonials.map((testimonial) => ({
      ...testimonial,
      id: i * baseTestimonials.length + testimonial.id,
      name:
        i > 0
          ? `${testimonial.name.split(" ")[0]} ${String.fromCharCode(65 + i)}`
          : testimonial.name,
    })),
  );
};

const testimonials = generateTestimonials();

// Horizontal testimonial card
const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="dark:to-gray-850 w-80 flex-shrink-0 rounded-xl bg-gradient-to-br from-white to-gray-50 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:from-gray-800"
      style={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4 flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < testimonial.rating
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300 dark:text-gray-600"
            }`}
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
          <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-200 dark:border-gray-700">
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

      {/* Return hover state for parent to use */}
      {isHovered}
    </motion.div>
  );
};

const HorizontalInfiniteScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Animation controls
  const row1Controls = useAnimationControls();
  const row2Controls = useAnimationControls();

  // Hover states to pause animations
  const [row1Hovered, setRow1Hovered] = useState(false);
  const [row2Hovered, setRow2Hovered] = useState(false);

  // Infinite scroll effect
  useEffect(() => {
    if (!isInView) return;

    // Row 1 animation (left to right)
    const row1Animation = async () => {
      if (row1Hovered) return;
      await row1Controls.start({
        x: "-50%",
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
      });
    };

    // Row 2 animation (right to left)
    const row2Animation = async () => {
      if (row2Hovered) return;
      await row2Controls.start({
        x: "0%",
        transition: {
          duration: 35,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          from: "-50%",
        },
      });
    };

    row1Animation();
    row2Animation();

    return () => {
      row1Controls.stop();
      row2Controls.stop();
    };
  }, [isInView, row1Controls, row2Controls, row1Hovered, row2Hovered]);

  // Handle hover states
  useEffect(() => {
    if (row1Hovered) {
      row1Controls.stop();
    } else if (isInView) {
      row1Controls.start({
        x: "-50%",
        transition: {
          duration: 40,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
      });
    }
  }, [row1Hovered, row1Controls, isInView]);

  useEffect(() => {
    if (row2Hovered) {
      row2Controls.stop();
    } else if (isInView) {
      row2Controls.start({
        x: "0%",
        transition: {
          duration: 35,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          from: "-50%",
        },
      });
    }
  }, [row2Hovered, row2Controls, isInView]);

  return (
    <div ref={sectionRef} className="py-12">
      {/* Darkmode toggle */}
      <DarkModeToggle />

      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          What Our Clients Say
        </h2>

        {/* Horizontal infinite scroll - Row 1 */}
        <div className="relative mb-8 overflow-hidden">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-white to-transparent dark:from-gray-950" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-white to-transparent dark:from-gray-950" />

          <div className="overflow-hidden py-4">
            <motion.div
              className="flex w-max gap-6"
              animate={row1Controls}
              style={{ x: 0 }}
              onHoverStart={() => setRow1Hovered(true)}
              onHoverEnd={() => setRow1Hovered(false)}
            >
              {/* First set of testimonials */}
              {testimonials.slice(0, 10).map((testimonial) => (
                <TestimonialCard
                  key={`h1-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}

              {/* Duplicate set for seamless loop */}
              {testimonials.slice(0, 10).map((testimonial) => (
                <TestimonialCard
                  key={`h1-dup-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Horizontal infinite scroll - Row 2 (opposite direction) */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-white to-transparent dark:from-gray-950" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-white to-transparent dark:from-gray-950" />

          <div className="overflow-hidden py-4">
            <motion.div
              className="flex w-max gap-6"
              animate={row2Controls}
              style={{ x: "-50%" }}
              onHoverStart={() => setRow2Hovered(true)}
              onHoverEnd={() => setRow2Hovered(false)}
            >
              {/* Second set of testimonials */}
              {testimonials.slice(10, 20).map((testimonial) => (
                <TestimonialCard
                  key={`h2-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}

              {/* Duplicate set for seamless loop */}
              {testimonials.slice(10, 20).map((testimonial) => (
                <TestimonialCard
                  key={`h2-dup-${testimonial.id}`}
                  testimonial={testimonial}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalInfiniteScroll;
