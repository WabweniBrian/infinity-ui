"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Pin,
  PinIcon as PushPin,
  ThumbsUp,
  Heart,
  Star,
  Smile,
} from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  color: "yellow" | "blue" | "green" | "pink" | "purple";
  icon: "pin" | "thumbsUp" | "heart" | "star" | "smile";
  rotation: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Marketing Director",
    company: "Brand Innovators",
    content:
      "The creative approach they brought to our marketing materials completely transformed our campaign. We saw engagement increase by 200% within the first month!",
    color: "yellow",
    icon: "star",
    rotation: -3,
  },
  {
    id: 2,
    name: "Jamie Wilson",
    role: "Startup Founder",
    company: "TechLaunch",
    content:
      "As a startup, we needed a partner who could move quickly without sacrificing quality. They delivered our MVP in record time, helping us secure our next round of funding.",
    color: "blue",
    icon: "thumbsUp",
    rotation: 2,
  },
  {
    id: 3,
    name: "Sophia Chen",
    role: "E-commerce Director",
    company: "Retail Innovations",
    content:
      "The e-commerce solution they built for us increased our conversion rate by 45% and average order value by 30%. The ROI has been incredible.",
    color: "green",
    icon: "heart",
    rotation: -2,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Creative Director",
    company: "Design Studio",
    content:
      "Working with this team was a breath of fresh air! They understood our vision immediately and delivered a website that perfectly captures our brand's personality.",
    color: "pink",
    icon: "smile",
    rotation: 3,
  },
  {
    id: 5,
    name: "Olivia Wilson",
    role: "Product Owner",
    company: "SaaS Platform",
    content:
      "Their attention to detail and user-focused design philosophy helped us simplify our complex product. Our users love the new interface!",
    color: "purple",
    icon: "pin",
    rotation: -1,
  },
];

const StickyNotesTestimonials = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const getColorClass = (color: string) => {
    const colors: Record<string, { bg: string; shadow: string }> = {
      yellow: { bg: "bg-yellow-200", shadow: "shadow-yellow-300" },
      blue: { bg: "bg-blue-200", shadow: "shadow-blue-300" },
      green: { bg: "bg-green-200", shadow: "shadow-green-300" },
      pink: { bg: "bg-pink-200", shadow: "shadow-pink-300" },
      purple: { bg: "bg-purple-200", shadow: "shadow-purple-300" },
    };

    return colors[color] || colors.yellow;
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case "pin":
        return <Pin className="h-5 w-5" />;
      case "thumbsUp":
        return <ThumbsUp className="h-5 w-5" />;
      case "heart":
        return <Heart className="h-5 w-5" />;
      case "star":
        return <Star className="h-5 w-5" />;
      case "smile":
        return <Smile className="h-5 w-5" />;
      default:
        return <Pin className="h-5 w-5" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gray-100 py-24"
    >
      {/* Cork board background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-800 to-amber-900">
        {/* Cork texture */}
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo')] bg-repeat opacity-30 mix-blend-multiply" />

        {/* Board frame */}
        <div className="absolute inset-x-0 top-0 h-4 bg-gray-800" />
        <div className="absolute inset-x-0 bottom-0 h-4 bg-gray-800" />
        <div className="absolute inset-y-0 left-0 w-4 bg-gray-800" />
        <div className="absolute inset-y-0 right-0 w-4 bg-gray-800" />

        {/* Corner screws */}
        <div className="absolute left-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-600">
          <div className="absolute h-px w-3 bg-gray-400" />
          <div className="absolute h-3 w-px bg-gray-400" />
        </div>
        <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-600">
          <div className="absolute h-px w-3 bg-gray-400" />
          <div className="absolute h-3 w-px bg-gray-400" />
        </div>
        <div className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-600">
          <div className="absolute h-px w-3 bg-gray-400" />
          <div className="absolute h-3 w-px bg-gray-400" />
        </div>
        <div className="absolute bottom-2 right-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-700 bg-gray-600">
          <div className="absolute h-px w-3 bg-gray-400" />
          <div className="absolute h-3 w-px bg-gray-400" />
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-handwritten mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Client Feedback Board
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-amber-100">
            Notes from our happy clients
          </p>
        </motion.div>

        {/* Sticky notes grid */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => {
            const colorClass = getColorClass(testimonial.color);
            const isHovered = hoveredId === testimonial.id;

            return (
              <motion.div
                key={testimonial.id}
                className="flex justify-center"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                        rotate: testimonial.rotation,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          delay: testimonial.id * 0.1,
                        },
                      }
                    : { opacity: 0, y: 50 }
                }
                whileHover={{
                  rotate: 0,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
                onHoverStart={() => setHoveredId(testimonial.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                {/* Sticky note */}
                <div
                  className={`relative aspect-square w-full max-w-xs ${colorClass.bg} p-6 ${colorClass.shadow} shadow-lg`}
                  style={{
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% 95%, 95% 100%, 0% 100%)",
                  }}
                >
                  {/* Pin */}
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 text-gray-700"
                    animate={{
                      y: isHovered ? -2 : 0,
                      scale: isHovered ? 1.1 : 1,
                    }}
                  >
                    <PushPin className="h-8 w-8" />
                  </motion.div>

                  {/* Content */}
                  <div className="font-handwritten pt-4">
                    <div className="mb-4 flex justify-center text-gray-700">
                      {getIcon(testimonial.icon)}
                    </div>

                    <p className="mb-4 line-clamp-6 text-lg leading-relaxed text-gray-800">
                      &quot;{testimonial.content}&quot;
                    </p>

                    <div className="mt-auto text-right">
                      <p className="font-bold text-gray-700">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Folded corner */}
                  <div
                    className="absolute bottom-0 right-0 h-6 w-6 bg-gradient-to-br from-transparent to-gray-300/50"
                    style={{
                      clipPath: "polygon(100% 0%, 100% 100%, 0% 100%)",
                    }}
                  />

                  {/* Texture overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=50&width=50')] bg-repeat opacity-[0.03]" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extra decorative pins */}
        <div className="absolute left-10 top-1/4 hidden text-gray-300 opacity-70 md:block">
          <PushPin className="h-6 w-6" />
        </div>
        <div className="absolute bottom-1/4 right-10 hidden text-gray-300 opacity-70 md:block">
          <PushPin className="h-6 w-6" />
        </div>

        {/* Extra decorative notes */}
        <motion.div
          className="absolute right-10 top-1/3 hidden h-16 w-16 rotate-12 bg-blue-100 md:block"
          animate={{
            rotate: [12, 15, 12],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-10 hidden h-16 w-16 -rotate-6 bg-green-100 md:block"
          animate={{
            rotate: [-6, -9, -6],
            y: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
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

export default StickyNotesTestimonials;
