"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
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

// Vertical testimonial card
const TestimonialCard = ({
  testimonial,
  variant = "default",
}: {
  testimonial: Testimonial;
  variant?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isQuoteVariant = variant === "quote";

  return (
    <motion.div
      className={`w-full rounded-xl bg-gradient-to-br p-6 shadow-md transition-all duration-300 hover:shadow-lg ${
        variant === "quote"
          ? "from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-blue-900/20"
          : variant === "alt"
            ? "from-purple-50 to-pink-50 dark:from-gray-800 dark:to-purple-900/20"
            : "dark:to-gray-850 from-white to-gray-50 dark:from-gray-800"
      } `}
      style={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
    >
      {isQuoteVariant ? (
        <div className="mb-4 text-indigo-500 dark:text-indigo-400">
          <Quote className="h-6 w-6" />
        </div>
      ) : (
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
      )}

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

// Vertical column component
const VerticalColumn = ({
  testimonials,
  variant,
  direction = "up",
}: {
  testimonials: Testimonial[];
  variant?: string;
  direction?: "up" | "down";
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimationControls();
  const columnRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(columnRef, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const animate = async () => {
      if (isHovered) return;

      await controls.start({
        y: direction === "up" ? "-50%" : "0%",
        transition: {
          duration: direction === "up" ? 30 : 25,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          from: direction === "up" ? "0%" : "-50%",
        },
      });
    };

    animate();

    return () => {
      controls.stop();
    };
  }, [isInView, controls, direction, isHovered]);

  useEffect(() => {
    if (isHovered) {
      controls.stop();
    } else if (isInView) {
      controls.start({
        y: direction === "up" ? "-50%" : "0%",
        transition: {
          duration: direction === "up" ? 30 : 25,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          from: direction === "up" ? "0%" : "-50%",
        },
      });
    }
  }, [isHovered, controls, isInView, direction]);

  return (
    <div
      ref={columnRef}
      className="relative h-[600px] overflow-hidden rounded-xl bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:bg-gray-800/50"
    >
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-20 bg-gradient-to-b from-white to-transparent dark:from-gray-950" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-20 bg-gradient-to-t from-white to-transparent dark:from-gray-950" />

      <div className="h-full overflow-hidden">
        <motion.div
          className="flex w-full flex-col gap-6"
          animate={controls}
          style={{ y: direction === "up" ? "0%" : "-50%" }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* First set of testimonials */}
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={`v-${testimonial.id}`}
              testimonial={testimonial}
              variant={variant}
            />
          ))}

          {/* Duplicate set for seamless loop */}
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={`v-dup-${testimonial.id}`}
              testimonial={testimonial}
              variant={variant}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const VerticalInfiniteScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  // Split testimonials for columns
  const column1Testimonials = testimonials.slice(0, 8);
  const column2Testimonials = testimonials.slice(8, 16);
  const column3Testimonials = testimonials.slice(16, 24);

  // For mobile view, combine all testimonials
  const mobileTestimonials = [
    ...testimonials.slice(0, 4),
    ...testimonials.slice(8, 12),
    ...testimonials.slice(16, 20),
  ];

  return (
    <div ref={sectionRef} className="py-12">
      {/* Darkmode toggle */}
      <DarkModeToggle />

      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Client Testimonials
        </h2>

        {/* Mobile view (1 column) */}
        <div className="block sm:hidden">
          <VerticalColumn testimonials={mobileTestimonials} direction="up" />
        </div>

        {/* Tablet view (2 columns) */}
        <div className="hidden grid-cols-2 gap-6 sm:grid md:hidden">
          <VerticalColumn testimonials={column1Testimonials} direction="up" />
          <VerticalColumn
            testimonials={column2Testimonials}
            variant="quote"
            direction="down"
          />
        </div>

        {/* Desktop view (3 columns) */}
        <div className="hidden grid-cols-3 gap-6 md:grid">
          <VerticalColumn testimonials={column1Testimonials} direction="up" />
          <VerticalColumn
            testimonials={column2Testimonials}
            variant="quote"
            direction="down"
          />
          <VerticalColumn
            testimonials={column3Testimonials}
            variant="alt"
            direction="up"
          />
        </div>
      </div>
    </div>
  );
};

export default VerticalInfiniteScroll;
