"use client";

import type React from "react";

import { useState, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Star, Award, TrendingUp, ThumbsUp, Heart, Zap } from "lucide-react";

type Category = {
  id: string;
  name: string;
  rating: number;
  description: string;
  icon: React.ReactNode;
  color: string;
};

type Review = {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  category: string;
};

const categories: Category[] = [
  {
    id: "usability",
    name: "Usability",
    rating: 4.9,
    description: "Intuitive interface that makes complex tasks simple",
    icon: <ThumbsUp className="h-6 w-6" />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "performance",
    name: "Performance",
    rating: 4.8,
    description: "Lightning-fast response times and efficient resource usage",
    icon: <Zap className="h-6 w-6" />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: "features",
    name: "Features",
    rating: 4.7,
    description: "Comprehensive toolset that meets all your needs",
    icon: <Award className="h-6 w-6" />,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "support",
    name: "Support",
    rating: 4.9,
    description: "Responsive and helpful customer service team",
    icon: <Heart className="h-6 w-6" />,
    color: "from-rose-500 to-pink-500",
  },
  {
    id: "value",
    name: "Value",
    rating: 4.6,
    description: "Excellent return on investment for businesses of all sizes",
    icon: <TrendingUp className="h-6 w-6" />,
    color: "from-emerald-500 to-green-500",
  },
];

const reviews: Review[] = [
  {
    id: 1,
    name: "Alex Johnson",
    date: "2 weeks ago",
    rating: 5,
    comment:
      "The interface is so intuitive that our entire team was up and running in minutes. No lengthy training required!",
    category: "usability",
  },
  {
    id: 2,
    name: "Sophia Chen",
    date: "1 month ago",
    rating: 5,
    comment:
      "I've never seen a platform respond so quickly, even with our large datasets. Impressive performance!",
    category: "performance",
  },
  {
    id: 3,
    name: "Marcus Williams",
    date: "3 weeks ago",
    rating: 4,
    comment:
      "Almost every feature we need is available out of the box. Only missing a few specialized tools for our industry.",
    category: "features",
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    date: "2 months ago",
    rating: 5,
    comment:
      "Customer support responded within minutes and solved our issue immediately. Best support team I've ever worked with!",
    category: "support",
  },
  {
    id: 5,
    name: "David Kim",
    date: "1 week ago",
    rating: 5,
    comment:
      "Considering all the features and the time it saves us, this platform is worth every penny. Great ROI!",
    category: "value",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    date: "3 days ago",
    rating: 5,
    comment:
      "The drag-and-drop interface makes complex workflows simple to set up. Absolutely love how user-friendly it is!",
    category: "usability",
  },
  {
    id: 7,
    name: "James Wilson",
    date: "2 weeks ago",
    rating: 5,
    comment:
      "We&apos;ve reduced our processing time by 70% since implementing this solution. The performance is outstanding.",
    category: "performance",
  },
  {
    id: 8,
    name: "Ava Thompson",
    date: "1 month ago",
    rating: 4,
    comment:
      "The feature set is comprehensive and they keep adding new capabilities with every update. Very impressed!",
    category: "features",
  },
  {
    id: 9,
    name: "Noah Garcia",
    date: "2 weeks ago",
    rating: 5,
    comment:
      "When we had an urgent issue on a weekend, the support team was still there to help us. Exceptional service!",
    category: "support",
  },
  {
    id: 10,
    name: "Isabella Brown",
    date: "1 month ago",
    rating: 4,
    comment:
      "The pricing is very reasonable for the value we&apos;re getting. It's paid for itself many times over already.",
    category: "value",
  },
];

const InteractiveRatingShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Filter reviews by active category
  const filteredReviews = activeCategory
    ? reviews.filter((review) => review.category === activeCategory)
    : reviews.slice(0, 3); // Show first 3 reviews if no category is selected

  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setActiveCategory(categoryId === activeCategory ? null : categoryId);

    // Animate the container
    controls
      .start({
        scale: [1, 0.98, 1],
        transition: { duration: 0.3 },
      })
      .then(() => {
        setIsAnimating(false);
      });
  };

  // Create a star rating component
  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={20}
            className={`${star <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300 dark:text-gray-600"}`}
          />
        ))}
      </div>
    );
  };

  // Interactive star rating for the hero section
  const InteractiveStarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.div
            key={star}
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(null)}
            whileHover={{ scale: 1.2 }}
            className="cursor-pointer"
          >
            <Star
              size={40}
              className={`${
                star <= (hoveredStar || rating)
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-gray-300 dark:text-gray-600"
              } transition-colors duration-200`}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 py-20">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.15),transparent_70%)]" />

        {/* Star particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 3 + 1;
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;

            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  width: size,
                  height: size,
                  top: `${top}%`,
                  left: `${left}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration,
                  repeat: Number.POSITIVE_INFINITY,
                  delay,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        {/* Hero section */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-4xl font-bold text-white md:text-5xl"
          >
            Our Customers <span className="text-indigo-400">Love</span> Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-lg text-indigo-200"
          >
            See why thousands of businesses rate us 4.8 out of 5 stars
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <InteractiveStarRating rating={4.8} />
            <p className="mt-4 text-3xl font-bold text-white">4.8/5</p>
            <p className="mt-2 text-indigo-300">Based on 1,200+ reviews</p>
          </motion.div>
        </div>

        {/* Category cards */}
        <motion.div
          ref={containerRef}
          animate={controls}
          className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: categories.findIndex((c) => c.id === category.id) * 0.1,
              }}
              whileHover={{ y: -5 }}
              className={`cursor-pointer rounded-xl border-2 bg-white/10 p-5 backdrop-blur-sm transition-colors duration-300 ${
                activeCategory === category.id
                  ? "border-indigo-500"
                  : "border-transparent hover:border-indigo-500/50"
              }`}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="mb-3 flex items-center">
                <div
                  className={`h-10 w-10 rounded-full bg-gradient-to-br ${category.color} mr-3 flex items-center justify-center`}
                >
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {category.name}
                  </h3>
                  <div className="flex items-center">
                    <span className="mr-1 font-bold text-yellow-500">
                      {category.rating.toFixed(1)}
                    </span>
                    <Star
                      size={14}
                      className="fill-yellow-500 text-yellow-500"
                    />
                  </div>
                </div>
              </div>

              <p className="text-sm text-indigo-200">{category.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Reviews */}
        <div className="mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory || "default"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              {filteredReviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay:
                      filteredReviews.findIndex((r) => r.id === review.id) *
                      0.1,
                  }}
                  className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white">{review.name}</h4>
                      <p className="text-xs text-indigo-300">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>

                  <p className="text-sm text-indigo-100">
                    &quot;{review.comment}&quot;
                  </p>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <span className="text-xs font-medium text-indigo-300">
                      {categories.find((c) => c.id === review.category)?.name}{" "}
                      Review
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* View more button */}
          {activeCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-8 text-center"
            >
              <button className="rounded-full bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700">
                View All {categories.find((c) => c.id === activeCategory)?.name}{" "}
                Reviews
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InteractiveRatingShowcase;
