"use client";

import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Heart, Leaf, Sun } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const WellnessHero = () => {
  const controls = useAnimation();
  const [activeFeature, setActiveFeature] = useState(0);

  // Features data
  const features = [
    {
      icon: Heart,
      title: "Personalized Health Plans",
      description:
        "Tailored wellness journeys designed around your unique health profile and goals.",
    },
    {
      icon: Leaf,
      title: "Holistic Approach",
      description:
        "Balance mind, body, and spirit with our comprehensive wellness programs.",
    },
    {
      icon: Sun,
      title: "Daily Wellness Rituals",
      description:
        "Simple, effective practices to incorporate into your everyday routine.",
    },
  ];

  // Auto-rotate through features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [features.length]);

  // Start animations when component mounts
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Breathing animation for the background shape
  const breathingAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      repeat: Number.POSITIVE_INFINITY,
      duration: 8,
      ease: "easeInOut",
    },
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-green-50 to-teal-50 py-20">
      {/* Animated background shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -right-[10%] -top-[10%] h-[600px] w-[600px] rounded-full bg-teal-100 opacity-60 blur-[120px]"
          animate={breathingAnimation}
        />
        <motion.div
          className="absolute -bottom-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-green-100 opacity-50 blur-[100px]"
          animate={{
            ...breathingAnimation,
            transition: {
              ...breathingAnimation.transition,
              delay: 2,
            },
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700"
            >
              Your journey to wellness begins here
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-4xl font-light tracking-tight text-gray-900 sm:text-5xl md:text-6xl"
            >
              Nurture your{" "}
              <span className="relative font-medium text-teal-700">
                mind & body
                <motion.svg
                  width="100%"
                  height="8"
                  viewBox="0 0 100 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -bottom-2 left-0 w-full"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M1 5.5C20 -0.5 50 9.5 99 4.5"
                    stroke="#14B8A6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 max-w-lg text-lg text-gray-600"
            >
              Discover a more balanced life with our holistic approach to
              wellness. Personalized programs designed to help you thrive in
              today&apos;s busy world.
            </motion.p>

            {/* Feature Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <div className="flex space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeFeature === index
                        ? "w-8 bg-teal-500"
                        : "w-2 bg-teal-200"
                    }`}
                    aria-label={`View feature ${index + 1}`}
                  />
                ))}
              </div>

              <div className="mt-6 h-[120px]">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{
                      opacity: activeFeature === index ? 1 : 0,
                      x: activeFeature === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`absolute ${activeFeature === index ? "pointer-events-auto" : "pointer-events-none"}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-teal-100 p-3 text-teal-600">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="mb-2 text-xl font-medium text-gray-900">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 font-medium text-white transition-all hover:bg-teal-700"
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full border border-teal-200 bg-white px-6 py-3 font-medium text-teal-700 transition-all hover:bg-teal-50"
              >
                Learn More
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Wellness Imagery */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto aspect-square max-w-md"
            >
              {/* Main circular image */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-8 border-white shadow-xl">
                <Image
                  src="/images/wellness-j.jpg"
                  alt="Wellness Journey"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />

                {/* Circular gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/20 to-transparent" />
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -left-8 top-1/4 rounded-2xl bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <Leaf className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Natural Ingredients
                    </div>
                    <div className="text-xs text-gray-500">100% Organic</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -bottom-4 right-8 rounded-2xl bg-white p-4 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                    <Heart className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Wellness Score
                    </div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4].map((_, i) => (
                        <div
                          key={i}
                          className="h-1.5 w-6 rounded-full bg-teal-500"
                        />
                      ))}
                      <div className="h-1.5 w-6 rounded-full bg-gray-200" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Decorative circles */}
              <motion.div
                className="absolute -right-4 top-10 h-16 w-16 rounded-full border-4 border-white bg-yellow-100"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5, type: "spring" }}
              />

              <motion.div
                className="absolute -bottom-2 -left-6 h-12 w-12 rounded-full border-4 border-white bg-teal-100"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative wave at bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0 120L48 105C96 90 192 60 288 55C384 50 480 70 576 75C672 80 768 70 864 65C960 60 1056 60 1152 65C1248 70 1344 80 1392 85L1440 90V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="#FFFFFF"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </svg>
      </div>
    </div>
  );
};

export default WellnessHero;
