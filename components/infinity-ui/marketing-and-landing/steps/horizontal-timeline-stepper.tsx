"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Rocket,
  Code,
  Palette,
  Zap,
  BarChart,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Project Discovery",
    description:
      "We analyze your requirements and define the scope of your project to ensure we understand your vision completely.",
    icon: <Rocket className="h-6 w-6" />,
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Design & Prototyping",
    description:
      "Our designers create wireframes and interactive prototypes to visualize the user experience before development begins.",
    icon: <Palette className="h-6 w-6" />,
    color: "from-indigo-500 to-purple-600",
  },
  {
    id: 3,
    title: "Development",
    description:
      "Our engineers build your solution using cutting-edge technologies and following industry best practices.",
    icon: <Code className="h-6 w-6" />,
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    title: "Testing & QA",
    description:
      "Rigorous testing ensures your product is bug-free, secure, and performs optimally across all devices.",
    icon: <Zap className="h-6 w-6" />,
    color: "from-pink-500 to-rose-600",
  },
  {
    id: 5,
    title: "Launch & Growth",
    description:
      "We deploy your solution and provide ongoing support to help you scale and adapt to changing needs.",
    icon: <BarChart className="h-6 w-6" />,
    color: "from-rose-500 to-orange-600",
  },
];

const HorizontalTimelineSteps = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
            Our Process
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            How We Bring Your Vision to Life
          </h2>
          <p className="text-xl text-gray-600">
            We follow a proven step-by-step approach to transform your ideas
            into successful digital products.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-1/2 hidden h-0.5 w-full -translate-y-1/2 bg-gray-200 md:block" />

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step number for mobile */}
                <div className="mb-4 flex items-center md:hidden">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r ${step.color} text-sm font-bold text-white`}
                  >
                    {step.id}
                  </div>
                  <div className="ml-4 h-px flex-1 bg-gray-200"></div>
                </div>

                {/* Timeline node */}
                <div className="absolute -top-4 left-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex">
                  <motion.div
                    className={`h-16 w-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white shadow-lg`}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1 + index * 0.1,
                    }}
                  >
                    {step.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <div
                  className={`rounded-xl border border-gray-100 bg-white p-6 shadow-md ${index % 2 === 0 ? "md:mt-24" : "md:mb-24"}`}
                >
                  <div className="mb-4 flex items-center justify-center md:hidden">
                    <div
                      className={`h-12 w-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white`}
                    >
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Connector arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-1/2 md:block">
                    <motion.div
                      initial={{ scale: 0, rotate: 0 }}
                      animate={
                        isInView
                          ? { scale: 1, rotate: index % 2 === 0 ? 90 : -90 }
                          : { scale: 0 }
                      }
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <ArrowRight className="text-gray-400" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-medium text-white shadow-lg shadow-blue-200 transition-all hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Start Your Project</span>
            <ArrowRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalTimelineSteps;
