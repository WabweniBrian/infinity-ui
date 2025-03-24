"use client";

import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, Plane, Search, Users } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TravelCta = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1, 0.6]);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 36,
    seconds: 52,
  });

  // Form state
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [travelers, setTravelers] = useState("");

  // Update countdown timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({
          ...timeLeft,
          minutes: timeLeft.minutes - 1,
          seconds: 59,
        });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({
          ...timeLeft,
          hours: timeLeft.hours - 1,
          minutes: 59,
          seconds: 59,
        });
      } else if (timeLeft.days > 0) {
        setTimeLeft({
          ...timeLeft,
          days: timeLeft.days - 1,
          hours: 23,
          minutes: 59,
          seconds: 59,
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-16">
      {/* Background image with parallax effect */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <Image
          src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoZLO51Yh2BRxjvs0lePWdUT3JIKoAfbgqLw8z"
          alt="Tropical beach destination"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid gap-8 md:grid-cols-2"
        >
          {/* Left Content - Offer Details */}
          <div className="text-white">
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-yellow-400"></span>
              Limited Time Offer
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="mb-4 text-4xl font-bold leading-tight md:text-5xl"
            >
              Escape to Paradise with 30% Off Tropical Getaways
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mb-6 max-w-lg text-lg text-white/90"
            >
              White sandy beaches, crystal-clear waters, and unforgettable
              sunsets await. Book your dream vacation now and save big on your
              next adventure.
            </motion.p>

            {/* Countdown timer */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="mb-2 text-sm font-medium text-white/80">
                Offer Ends In:
              </div>
              <div className="flex gap-4">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Minutes" },
                  { value: timeLeft.seconds, label: "Seconds" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 text-2xl font-bold backdrop-blur-sm">
                      {item.value.toString().padStart(2, "0")}
                    </div>
                    <div className="mt-1 text-xs text-white/70">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Featured destinations */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="mb-3 text-sm font-medium text-white/80">
                Popular Destinations:
              </div>
              <div className="flex flex-wrap gap-2">
                {["Bali", "Maldives", "Cancun", "Phuket", "Hawaii"].map(
                  (destination, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm"
                    >
                      <MapPin className="h-3 w-3" />
                      {destination}
                    </motion.div>
                  ),
                )}
              </div>
            </motion.div>

            {/* Testimonial */}
            <motion.div
              variants={itemVariants}
              className="rounded-lg bg-white/10 p-4 backdrop-blur-sm"
            >
              <div className="mb-2 text-sm italic text-white/90">
                &quot;The most amazing vacation of our lives! The beaches were
                pristine and the service was impeccable.&quot;
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 overflow-hidden rounded-full bg-white/20">
                  <Image
                    src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypomfLdI2Mcq2hSYiK0RjVdusB8bOIWnCQy9fpv"
                    alt="Customer"
                    width={32}
                    height={32}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm font-medium">Jessica & Brian</div>
                  <div className="flex items-center gap-1 text-xs text-white/70">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                      <svg
                        key={i}
                        className="h-3 w-3 fill-yellow-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Booking Form */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-white p-6 shadow-xl md:p-8"
          >
            <div className="mb-6 text-center">
              <h3 className="mb-2 text-2xl font-bold text-gray-900">
                Book Your Escape Now
              </h3>
              <p className="text-gray-600">
                Secure your spot today and enjoy exclusive savings
              </p>
            </div>

            <div className="space-y-4">
              {/* Destination */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Where do you want to go?
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search destinations"
                    className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              {/* Dates */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  When are you traveling?
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Select dates"
                    className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                  />
                </div>
              </div>

              {/* Travelers */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  How many travelers?
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Add guests"
                    className="w-full bg-transparent text-gray-800 outline-none placeholder:text-gray-400"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                  />
                </div>
              </div>

              {/* Promo code */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Promo code (optional)
                </label>
                <input
                  type="text"
                  placeholder="Enter code"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>

              {/* Special offer */}
              <div className="rounded-lg bg-yellow-50 p-3 text-sm text-yellow-800">
                <div className="flex items-center gap-2 font-medium">
                  <svg
                    className="h-5 w-5 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Special Offer
                </div>
                <div className="mt-1 pl-7">
                  Book now and get a free airport transfer + welcome dinner!
                </div>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-all hover:bg-blue-700"
              >
                <Search className="h-5 w-5" />
                Search Availability
              </motion.button>

              {/* Additional info */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Plane className="h-4 w-4" />
                <span>Free cancellation up to 48 hours before arrival</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelCta;
