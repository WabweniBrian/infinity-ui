"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle,
  Lightbulb,
  Users,
  FileText,
  PresentationIcon as PresentationChart,
  Award,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Initial Consultation",
    description:
      "We start with a detailed discussion to understand your business goals, target audience, and project requirements.",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    id: 2,
    title: "Research & Strategy",
    description:
      "Our team conducts market research and develops a comprehensive strategy tailored to your specific needs.",
    icon: <FileText className="h-6 w-6" />,
  },
  {
    id: 3,
    title: "Collaborative Planning",
    description:
      "We work closely with you to refine the approach, establish timelines, and set clear expectations.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    id: 4,
    title: "Implementation",
    description:
      "Our experts execute the strategy with regular check-ins to ensure alignment with your vision.",
    icon: <PresentationChart className="h-6 w-6" />,
  },
  {
    id: 5,
    title: "Results & Refinement",
    description:
      "We measure outcomes against KPIs, gather feedback, and make data-driven refinements to maximize success.",
    icon: <Award className="h-6 w-6" />,
  },
];

const VerticalNumberedSteps = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-gradient-to-b from-emerald-50 to-white py-24"
    >
      <div className="container mx-auto max-w-5xl px-4">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-600">
            Our Methodology
          </span>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            A Proven Path to Success
          </h2>
          <p className="text-xl text-gray-600">
            Our structured approach ensures consistent results and exceptional
            outcomes for every project.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute bottom-0 left-[39px] top-0 ml-px hidden w-0.5 bg-emerald-200 sm:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-start sm:items-center"
                >
                  {/* Step number */}
                  <motion.div
                    className="z-10 flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2 + index * 0.1,
                    }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-3 rounded-full bg-emerald-500 opacity-20 blur-md" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-emerald-500 to-teal-600 text-2xl font-bold text-white shadow-lg sm:h-20 sm:w-20">
                        {step.id}
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    className={`ml-4 flex-grow rounded-xl border border-gray-100 bg-white p-4 shadow-md sm:ml-12 md:ml-0 md:w-[calc(50%-60px)] md:p-6 ${
                      index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={
                      isInView
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }
                    }
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <div className="mb-3 flex items-center">
                      <div className="mr-3 rounded-lg bg-emerald-100 p-2 text-emerald-600">
                        {step.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-gray-600">{step.description}</p>

                    {/* Checkmark for completed steps (for visual effect) */}
                    {index < 2 && (
                      <div className="absolute right-0 top-0 mr-2 mt-2 text-emerald-500 sm:mr-4 sm:mt-4">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="mb-6 text-gray-600">
            Ready to experience our streamlined process?
          </p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 font-medium text-white shadow-lg shadow-emerald-200 transition-all hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Schedule a Consultation</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default VerticalNumberedSteps;
