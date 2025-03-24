"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ClipboardCheck, FolderKanban, PenLine, Laptop, Megaphone, ArrowUpRight } from "lucide-react"

const stepsData = [
  {
    id: 1,
    title: "Requirements Gathering",
    description: "We collect and analyze your business requirements to define project scope and objectives.",
    icon: <ClipboardCheck className="h-6 w-6" />,
    color: "blue",
  },
  {
    id: 2,
    title: "Project Scoping",
    description: "Our team creates a detailed project roadmap with timelines, milestones, and resource allocation.",
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
    description: "Our developers build your solution using modern technologies and agile methodologies.",
    icon: <Laptop className="h-6 w-6" />,
    color: "teal",
  },
  {
    id: 5,
    title: "Deployment & Marketing",
    description: "We launch your product and implement effective marketing strategies to drive engagement.",
    icon: <Megaphone className="h-6 w-6" />,
    color: "rose",
  },
]

const GridSteps = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" })

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-[0.02]" />

        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 -translate-y-1/3 translate-x-1/3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-teal-50 to-emerald-50 translate-y-1/3 -translate-x-1/4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            From Concept to Completion
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our proven methodology delivers exceptional results at every stage
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  className={`absolute -inset-1 opacity-70 blur-sm rounded-xl bg-gradient-to-r ${
                    step.color === "blue"
                      ? "from-blue-400 to-sky-400"
                      : step.color === "indigo"
                        ? "from-indigo-400 to-blue-400"
                        : step.color === "purple"
                          ? "from-purple-400 to-violet-400"
                          : step.color === "teal"
                            ? "from-teal-400 to-emerald-400"
                            : "from-rose-400 to-pink-400"
                  } opacity-0 group-hover:opacity-100 transition duration-300`}
                />

                <div className="relative h-full bg-white rounded-xl border border-gray-100 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  {/* Step number */}
                  <div className="absolute top-0 right-0 -mt-3 -mr-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md ${
                        step.color === "blue"
                          ? "bg-blue-500"
                          : step.color === "indigo"
                            ? "bg-indigo-500"
                            : step.color === "purple"
                              ? "bg-purple-500"
                              : step.color === "teal"
                                ? "bg-teal-500"
                                : "bg-rose-500"
                      } text-white font-bold text-sm`}
                    >
                      {step.id}
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex items-center justify-center p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 ${
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>

                  <p className="text-gray-600 mb-5">{step.description}</p>

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
                      <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
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
          <p className="text-gray-600 mb-6 text-lg">Ready to start your project journey with us?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl shadow-lg shadow-blue-200/50 transition-all"
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn about our process
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default GridSteps

