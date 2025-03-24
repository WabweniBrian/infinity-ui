"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Clock,
  Globe,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";
import Image from "next/image";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const AboutBentoGrid = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const teamMembers = [
    {
      name: "Wabweni Brian",
      role: "Founder & CEO",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypomfLdI2Mcq2hSYiK0RjVdusB8bOIWnCQy9fpv",
      color: "from-violet-500 to-purple-500",
    },
    {
      name: "Sarah Chen",
      role: "Chief Design Officer",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoxC0nRZtFC1a2S06AJNu9MsdPXG8D5oerTblR",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoZPrIJnh2BRxjvs0lePWdUT3JIKoAfbgqLw8z",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Darkmode toggle */}
      <DarkModeToggle />
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 h-full w-full bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.3),transparent_40%)]"></div>

        {/* Animated Dots Pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-300/20 to-blue-300/20 blur-3xl dark:from-purple-900/10 dark:to-blue-900/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-300/20 to-emerald-300/20 blur-3xl dark:from-blue-900/10 dark:to-emerald-900/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center">
            <span className="h-1 w-12 rounded-full bg-blue-600 dark:bg-blue-500"></span>
            <span className="mx-2 font-medium text-blue-600 dark:text-blue-500">
              ABOUT US
            </span>
            <span className="h-1 w-12 rounded-full bg-blue-600 dark:bg-blue-500"></span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
            We&apos;re on a mission to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400">
              transform
            </span>{" "}
            the digital landscape
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Our team of passionate experts combines creativity with technical
            excellence to deliver exceptional results for our clients worldwide.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {/* Company Mission - Spans 2 columns */}
          <motion.div
            className="group relative col-span-1 row-span-1 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ y: y1 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 dark:border-gray-700/50 dark:bg-gray-800">
              <div className="absolute right-0 top-0 h-40 w-40 -translate-y-1/2 translate-x-1/2 transform rounded-full bg-gradient-to-br from-blue-500/10 to-violet-500/10 blur-3xl"></div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-4 flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-500">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">
                    Our Mission
                  </h3>
                </div>

                <p className="mb-6 flex-grow text-gray-600 dark:text-gray-300">
                  We believe in creating digital experiences that not only look
                  beautiful but drive real business results. Our approach
                  combines data-driven insights with creative excellence to
                  deliver solutions that stand out in today&apos;s crowded
                  digital landscape.
                </p>

                <div className="group flex cursor-pointer items-center font-medium text-blue-600 dark:text-blue-400">
                  Learn more about our values
                  <ArrowUpRight className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Global Presence - Spans 2 columns */}
          <motion.div
            className="group relative col-span-1 row-span-1 md:col-span-1 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ y: y2 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 dark:border-gray-700/50 dark:bg-gray-800">
              <div className="absolute bottom-0 left-0 h-40 w-40 -translate-x-1/2 translate-y-1/2 transform rounded-full bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 blur-3xl"></div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-4 flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">
                    Global Presence
                  </h3>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-700/50">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-3xl font-bold text-transparent">
                      12+
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Countries
                    </div>
                  </div>
                  <div className="rounded-xl bg-gray-50 p-4 text-center dark:bg-gray-700/50">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-3xl font-bold text-transparent">
                      24/7
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Team Members - Spans 2 rows */}
          <motion.div
            className="group relative col-span-1 row-span-2 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ y: y3 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-8 dark:border-gray-700/50 dark:bg-gray-800">
              <div className="absolute left-0 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-violet-500/10 to-purple-500/10 blur-3xl"></div>

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-6 flex items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-gray-900 dark:text-white">
                    Our Team
                  </h3>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      className="group/card relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    >
                      <div className="relative aspect-square overflow-hidden rounded-2xl">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-80 transition-opacity duration-300 group-hover/card:opacity-100`}
                        ></div>
                        <Image
                          src={member.image || "/images/default-avatar.png"}
                          alt={member.name}
                          fill
                          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="font-bold">{member.name}</h4>
                          <p className="text-sm text-white/80">{member.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center">
                  <button className="rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-2 font-medium text-white transition-colors hover:from-violet-600 hover:to-purple-600">
                    Meet the entire team
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Awards */}
          <motion.div
            className="group relative col-span-1 row-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-6 dark:border-gray-700/50 dark:bg-gray-800">
              <div className="absolute bottom-0 right-0 h-32 w-32 translate-x-1/2 translate-y-1/2 transform rounded-full bg-gradient-to-tr from-amber-500/10 to-orange-500/10 blur-3xl"></div>

              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  Award Winning
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Recognized with 15+ industry awards for excellence
                </p>
              </div>
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            className="group relative col-span-1 row-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-6 dark:border-gray-700/50 dark:bg-gray-800">
              <div className="absolute left-0 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-rose-500/10 to-pink-500/10 blur-3xl"></div>

              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  10+ Years
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Of industry experience and expertise
                </p>
              </div>
            </div>
          </motion.div>

          {/* Client Love */}
          <motion.div
            className="group relative col-span-1 row-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100"></div>
            <div className="relative h-full overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-6 dark:border-gray-700/50 dark:bg-gray-800">
              <div className="absolute bottom-0 right-0 h-32 w-32 translate-x-1/2 translate-y-1/2 transform rounded-full bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 blur-3xl"></div>

              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  98% Satisfaction
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  From our clients worldwide
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutBentoGrid;
