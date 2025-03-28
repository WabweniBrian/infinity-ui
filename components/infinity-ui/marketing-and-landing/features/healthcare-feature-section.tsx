"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Heart, Clock, Users, FileText, ArrowRight } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

const HealthcareFeatureSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Access healthcare services anytime, anywhere with our round-the-clock virtual care platform.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-cyan-500 to-teal-500",
    },
    {
      icon: Users,
      title: "Specialist Network",
      description:
        "Connect with over 5,000 specialists across 40+ medical fields for comprehensive care.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: FileText,
      title: "Digital Records",
      description:
        "Securely store and access your medical history, prescriptions, and test results in one place.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Heart,
      title: "Preventive Care",
      description:
        "Personalized wellness plans and reminders to help you stay ahead of health concerns.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-teal-50 to-cyan-50 py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
        <svg
          className="absolute right-0 top-0 h-auto w-1/3 text-teal-500/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M37.9,-65.5C46.1,-55.2,48.4,-39.5,55.3,-26.3C62.2,-13.1,73.8,-2.4,74.9,9.2C76,20.8,66.6,33.3,55.9,42.9C45.2,52.5,33.1,59.2,19.7,64.7C6.3,70.2,-8.4,74.5,-22.1,72.3C-35.8,70.1,-48.5,61.4,-57.3,49.7C-66.1,38,-71,23.3,-72.4,8.3C-73.8,-6.7,-71.7,-22,-64.3,-34.1C-56.9,-46.2,-44.2,-55.1,-31.1,-62.9C-18,-70.7,-4.5,-77.4,7.3,-76.9C19.1,-76.4,29.7,-75.8,37.9,-65.5Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="absolute bottom-0 left-0 h-auto w-1/3 text-cyan-500/5"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M45.3,-77.8C58.3,-71.1,68.5,-58.1,76.2,-44.1C83.9,-30,89.1,-15,88.9,-0.1C88.7,14.8,83.2,29.5,74.6,42.1C66,54.7,54.3,65.1,41.3,70.9C28.3,76.7,14.1,77.9,-0.2,78.2C-14.5,78.5,-29,78,-40.9,72.1C-52.8,66.2,-62.1,54.9,-69.7,42.3C-77.3,29.7,-83.2,14.8,-83.4,-0.1C-83.6,-15,-78.1,-30,-69.7,-42.8C-61.3,-55.5,-49.9,-66,-37.1,-72.3C-24.2,-78.6,-12.1,-80.8,1.7,-83.7C15.5,-86.6,31,-84.4,45.3,-77.8Z"
            transform="translate(100 100)"
          />
        </svg>

        {/* Pulse Animation */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 opacity-75 blur"></div>
            <div className="relative h-3 w-3 rounded-full bg-white"></div>
            <div className="animate-ping-slow absolute inset-0 rounded-full bg-teal-400 opacity-75"></div>
            <div className="animate-ping-slow animation-delay-1000 absolute inset-0 rounded-full bg-cyan-400 opacity-75"></div>
            <div className="animate-ping-slow animation-delay-2000 absolute inset-0 rounded-full bg-blue-400 opacity-75"></div>
          </div>
        </div>

        {/* Floating Elements */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-teal-400/20 to-cyan-400/20 backdrop-blur-md"
            style={{
              width: 20 + Math.random() * 40,
              height: 20 + Math.random() * 40,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-teal-400/20 to-cyan-400/20 backdrop-blur-sm">
            <Heart className="h-8 w-8 text-teal-500 dark:text-teal-400" />
          </div>
          <h2 className="mt-2 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
            Healthcare{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              reimagined
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Modern solutions for a healthier tomorrow, putting patients at the
            center of everything we do.
          </p>
        </motion.div>

        <div className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 -rotate-3 scale-105 transform rounded-3xl bg-gradient-to-r from-teal-400/30 to-cyan-400/30 blur-xl"></div>
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5"></div>

              <div className="relative p-8">
                <div className="flex flex-col space-y-4">
                  {features.map((feature, index) => (
                    <motion.button
                      key={index}
                      className={`flex items-center rounded-xl p-4 text-left transition-all duration-300 ${
                        activeFeature === index
                          ? "bg-gradient-to-r from-teal-500/10 to-cyan-500/10 shadow-sm"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700/50"
                      }`}
                      onClick={() => setActiveFeature(index)}
                      whileHover={{ x: 5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <div
                        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${
                          activeFeature === index
                            ? feature.color
                            : "from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"
                        }`}
                      >
                        <feature.icon
                          className={`h-6 w-6 ${
                            activeFeature === index
                              ? "text-white"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3
                          className={`font-bold ${
                            activeFeature === index
                              ? "text-teal-600 dark:text-teal-400"
                              : "text-gray-900 dark:text-white"
                          }`}
                        >
                          {feature.title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                      <ArrowRight
                        className={`h-5 w-5 transform transition-transform duration-300 ${
                          activeFeature === index
                            ? "translate-x-0 text-teal-500"
                            : "-translate-x-2 text-gray-400 opacity-0"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 rotate-3 scale-105 transform rounded-3xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl"></div>
            <div className="relative h-full overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <div className="relative h-64 md:h-80">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/80 to-cyan-500/80 mix-blend-multiply"></div>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${features[activeFeature].image})`,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="mb-2 text-2xl font-bold">
                        {features[activeFeature].title}
                      </h3>
                      <p className="text-white/90">
                        {features[activeFeature].description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                        <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          Patient Satisfaction
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          98%
                        </div>
                        <div className="mt-1 text-xs text-teal-600 dark:text-teal-400">
                          ↑ 12% from last year
                        </div>
                      </div>
                      <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700/50">
                        <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          Response Time
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          &lt; 10min
                        </div>
                        <div className="mt-1 text-xs text-teal-600 dark:text-teal-400">
                          ↓ 40% faster response
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <button className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-3 font-medium text-white shadow-lg shadow-teal-500/20 transition-all hover:from-teal-600 hover:to-cyan-600">
                        <span>
                          Learn more about {features[activeFeature].title}
                        </span>
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl"></div>
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="p-8 md:p-12 lg:col-span-2">
                <h3 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                  Experience healthcare that revolves around{" "}
                  <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                    you
                  </span>
                </h3>
                <p className="mb-8 text-gray-600 dark:text-gray-300">
                  Our patient-centered approach means you&apos;re always in
                  control of your health journey. Schedule appointments, access
                  records, and connect with specialists—all from one secure
                  platform.
                </p>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50">
                      <svg
                        className="h-5 w-5 text-teal-600 dark:text-teal-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Personalized Care Plans
                      </h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        Tailored to your unique health needs and goals
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50">
                      <svg
                        className="h-5 w-5 text-teal-600 dark:text-teal-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Transparent Pricing
                      </h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        No surprise bills or hidden fees
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50">
                      <svg
                        className="h-5 w-5 text-teal-600 dark:text-teal-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Virtual Consultations
                      </h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        Connect with doctors from the comfort of home
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900/50">
                      <svg
                        className="h-5 w-5 text-teal-600 dark:text-teal-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Continuous Support
                      </h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                        Ongoing care and follow-ups when you need them
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <button className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3 font-medium text-white shadow-lg shadow-teal-500/20 transition-colors hover:from-teal-600 hover:to-cyan-600">
                    Get started
                  </button>
                  <button className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                    Learn more
                  </button>
                </div>
              </div>

              <div className="relative lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-500"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=600&width=400')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="relative flex h-full items-center justify-center p-8">
                  <div className="max-w-xs rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
                    <div className="mb-4 flex items-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-white">Patient Portal</h4>
                        <p className="text-sm text-white/80">
                          Access your health data
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center rounded-lg bg-white/10 p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20">
                          <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-white">
                            Upcoming Appointment
                          </p>
                          <p className="text-xs text-white/70">
                            Mar 15, 2:30 PM
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center rounded-lg bg-white/10 p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500/20">
                          <svg
                            className="h-4 w-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-white">
                            Lab Results
                          </p>
                          <p className="text-xs text-white/70">Available Now</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HealthcareFeatureSection;
