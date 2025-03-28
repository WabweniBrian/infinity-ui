"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ClipboardCheck,
  FolderKanban,
  PenLine,
  Laptop,
  Megaphone,
  ArrowUpRight,
} from "lucide-react";

const stepsData = [
  {
    id: 1,
    title: "Requirements Gathering",
    description:
      "We collect and analyze your business requirements to define project scope and objectives.",
    icon: <ClipboardCheck className="h-6 w-6" />,
    color: "blue",
  },
  {
    id: 2,
    title: "Project Scoping",
    description:
      "Our team creates a detailed project roadmap with timelines, milestones, and resource allocation.",
    icon: <FolderKanban className="h-6 w-6" />,
    color: "indigo",
  },
  {
    id: 3,
    title: "Design Phase",
    description:
      "We design intuitive user interfaces and experiences based on best practices and your brand guidelines.",
    icon: <PenLine className="h-6 w-6" />,
    color: "purple",
  },
  {
    id: 4,
    title: "Development",
    description:
      "Our developers build your solution using modern technologies and agile methodologies.",
    icon: <Laptop className="h-6 w-6" />,
    color: "teal",
  },
  {
    id: 5,
    title: "Deployment & Marketing",
    description:
      "We launch your product and implement effective marketing strategies to drive engagement.",
    icon: <Megaphone className="h-6 w-6" />,
    color: "rose",
  },
];

const GridSteps = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-teal-50 to-emerald-50"
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
            From Concept to Completion
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Our proven methodology delivers exceptional results at every stage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {stepsData.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: { delay: index * 0.1, duration: 0.5 },
                    }
                  : { opacity: 0, y: 30 }
              }
              className="group h-full"
            >
              <div className="relative h-full">
                <div
                  className={`absolute -inset-1 rounded-xl bg-gradient-to-r opacity-70 blur-sm ${
                    step.color === "blue"
                      ? "from-blue-400 to-sky-400"
                      : step.color === "indigo"
                        ? "from-indigo-400 to-blue-400"
                        : step.color === "purple"
                          ? "from-purple-400 to-violet-400"
                          : step.color === "teal"
                            ? "from-teal-400 to-emerald-400"
                            : "from-rose-400 to-pink-400"
                  } opacity-0 transition duration-300 group-hover:opacity-100`}
                />

                <div className="relative h-full rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-lg">
                  {/* Step number */}
                  <div className="absolute right-0 top-0 -mr-3 -mt-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full shadow-md ${
                        step.color === "blue"
                          ? "bg-blue-500"
                          : step.color === "indigo"
                            ? "bg-indigo-500"
                            : step.color === "purple"
                              ? "bg-purple-500"
                              : step.color === "teal"
                                ? "bg-teal-500"
                                : "bg-rose-500"
                      } text-sm font-bold text-white`}
                    >
                      {step.id}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex items-center justify-center rounded-lg p-3 transition-transform duration-300 group-hover:scale-110 ${
                      step.color === "blue"
                        ? "bg-blue-100 text-blue-500"
                        : step.color === "indigo"
                          ? "bg-indigo-100 text-indigo-500"
                          : step.color === "purple"
                            ? "bg-purple-100 text-purple-500"
                            : step.color === "teal"
                              ? "bg-teal-100 text-teal-500"
                              : "bg-rose-100 text-rose-500"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mb-5 text-gray-600">{step.description}</p>

                  {/* Learn more link */}
                  <div className="mt-auto">
                    <a
                      href="#"
                      className={`inline-flex items-center text-sm font-medium group-hover:underline ${
                        step.color === "blue"
                          ? "text-blue-600"
                          : step.color === "indigo"
                            ? "text-indigo-600"
                            : step.color === "purple"
                              ? "text-purple-600"
                              : step.color === "teal"
                                ? "text-teal-600"
                                : "text-rose-600"
                      }`}
                    >
                      <span>Learn more</span>
                      <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="mb-6 text-lg text-gray-600">
            Ready to start your project journey with us?
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-4 font-medium text-white shadow-lg shadow-blue-200/50 transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Start your project
            </motion.a>
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 font-medium text-gray-700 transition-all hover:bg-gray-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn about our process
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GridSteps;
