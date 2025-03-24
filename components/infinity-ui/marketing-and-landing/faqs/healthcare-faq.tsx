"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ChevronDown,
  Heart,
  Clock,
  Calendar,
  Users,
  Activity,
  Stethoscope,
} from "lucide-react";

const faqGroups = [
  {
    title: "General Questions",
    icon: <Heart className="h-5 w-5" />,
    items: [
      {
        id: 1,
        question: "What insurance plans do you accept?",
        answer:
          "We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Medicare, and Medicaid. Please contact our office with your specific insurance information to verify coverage before your appointment.",
      },
      {
        id: 2,
        question: "Do I need a referral to see a specialist?",
        answer:
          "Referral requirements depend on your insurance plan. Many HMO plans require a referral from your primary care physician before seeing a specialist. PPO plans typically don't require referrals. We recommend checking with your insurance provider about their specific referral policies.",
      },
    ],
  },
  {
    title: "Appointments",
    icon: <Calendar className="h-5 w-5" />,
    items: [
      {
        id: 3,
        question: "How do I schedule an appointment?",
        answer:
          "You can schedule an appointment through our patient portal, by calling our office directly at (555) 123-4567, or by using the appointment request form on our website. New patients should arrive 15 minutes early to complete necessary paperwork.",
      },
      {
        id: 4,
        question: "What should I bring to my first appointment?",
        answer:
          "Please bring your insurance card, photo ID, list of current medications (including dosages), medical records or test results relevant to your visit, and any referral forms if required by your insurance. Also, please arrive 15 minutes early to complete new patient forms.",
      },
    ],
  },
  {
    title: "Services & Treatments",
    icon: <Users className="h-5 w-5" />,
    items: [
      {
        id: 5,
        question: "What preventive services do you offer?",
        answer:
          "We offer a comprehensive range of preventive services including annual wellness exams, immunizations, health screenings (cholesterol, diabetes, cancer), nutritional counseling, smoking cessation programs, and personalized wellness plans tailored to your specific health needs and goals.",
      },
      {
        id: 6,
        question: "How long does a typical treatment plan last?",
        answer:
          "Treatment duration varies based on your specific condition, its severity, and how you respond to treatment. Some acute conditions may resolve with a single visit, while chronic conditions might require ongoing management. During your consultation, your provider will discuss the expected timeline for your personalized treatment plan.",
      },
    ],
  },
  {
    title: "Billing & Payments",
    icon: <Clock className="h-5 w-5" />,
    items: [
      {
        id: 7,
        question: "How does billing work?",
        answer:
          "We bill your insurance directly for services provided. After your visit, we submit a claim to your insurance company. Once processed, you'll receive an explanation of benefits (EOB) from your insurance, followed by our bill for any remaining patient responsibility (copays, deductibles, or non-covered services).",
      },
      {
        id: 8,
        question: "Do you offer payment plans?",
        answer:
          "Yes, we offer flexible payment plans for patients who need assistance managing their healthcare costs. Please speak with our billing department to discuss your situation and set up a payment arrangement that works for your budget. We're committed to making quality healthcare accessible to all our patients.",
      },
    ],
  },
];

const HealthcareFAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-teal-100/30 to-white py-24"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-teal-200/50 to-teal-100/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tr from-teal-200/50 to-teal-100/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute left-[15%] top-40 text-teal-400/40"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        >
          <Activity size={60} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-[10%] text-teal-400/40"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
            delay: 1,
          }}
        >
          <Stethoscope size={70} />
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="relative mx-auto mb-6 h-20 w-20"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-emerald-500">
              <Heart className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <span className="mb-4 inline-block rounded-full bg-teal-100 px-4 py-1.5 text-sm font-medium text-teal-700">
            Patient Resources
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Find answers to common questions about our services, appointments,
            and policies
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {faqGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              variants={itemVariants}
              className="group"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 opacity-0 blur-sm transition duration-300 group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm">
                  <div className="border-b border-teal-100 bg-gradient-to-r from-teal-50 to-emerald-50 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 p-3 text-white">
                        {group.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  <div className="divide-y divide-teal-100">
                    {group.items.map((item) => (
                      <div key={item.id} className="overflow-hidden">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-teal-50/50"
                          aria-expanded={openItems.includes(item.id)}
                        >
                          <h4 className="pr-8 text-base font-medium text-gray-900 md:text-lg">
                            {item.question}
                          </h4>
                          <motion.div
                            animate={{
                              rotate: openItems.includes(item.id) ? 180 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className={`flex-shrink-0 rounded-full p-2 ${
                              openItems.includes(item.id)
                                ? "bg-teal-500 text-white"
                                : "bg-teal-100 text-teal-500"
                            }`}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {openItems.includes(item.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-6 text-gray-600">
                                {item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="mb-6 text-gray-600">
            Still have questions? Our patient care team is here to help.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-8 py-4 font-medium text-white shadow-lg shadow-teal-200/50 transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(20, 184, 166, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Us
            </motion.a>
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-white px-8 py-4 font-medium text-gray-700 transition-all hover:bg-teal-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Patient Portal
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HealthcareFAQ;
