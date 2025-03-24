"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  FileText,
  BrainCircuit,
  School,
  Lightbulb,
} from "lucide-react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const faqGroups = [
  {
    title: "Admissions",
    icon: <School className="h-5 w-5" />,
    items: [
      {
        id: 1,
        question: "What are the admission requirements?",
        answer:
          "Our admission requirements include a completed application form, academic transcripts from previous institutions, standardized test scores (SAT/ACT for undergraduate; GRE/GMAT for graduate programs), letters of recommendation, a personal statement, and an application fee. Some programs may have additional requirements such as portfolios, interviews, or prerequisite coursework. International students must also provide proof of English proficiency (TOEFL/IELTS).",
      },
      {
        id: 2,
        question: "When are the application deadlines?",
        answer:
          "For fall semester admission, our priority deadline is January 15, with a final deadline of March 31. For spring semester, the deadline is October 15. Early decision applicants must apply by November 1. Graduate program deadlines vary by department, typically ranging from December to February for fall admission. We recommend applying early as some programs fill quickly, and scholarship consideration requires meeting the priority deadline.",
      },
    ],
  },
  {
    title: "Programs & Curriculum",
    icon: <BookOpen className="h-5 w-5" />,
    items: [
      {
        id: 3,
        question: "What programs do you offer?",
        answer:
          "We offer over 100 undergraduate majors and 80 graduate programs across our six colleges: Arts & Sciences, Business, Engineering, Education, Health Sciences, and Fine Arts. Our most popular undergraduate programs include Business Administration, Computer Science, Psychology, Biology, and Communications. At the graduate level, our MBA, Data Science, Public Health, and Education Leadership programs are highly ranked. We also offer certificate programs, continuing education courses, and online degree options.",
      },
      {
        id: 4,
        question: "Can I customize my degree program?",
        answer:
          "Yes, we offer several ways to customize your educational experience. You can pursue double majors, add minors (requiring 15-18 credits in a secondary field), or create an interdisciplinary major with faculty approval. Our Honors College provides enhanced learning opportunities through specialized seminars, research projects, and thesis development. Additionally, many departments offer concentrations within majors to help you specialize in your area of interest.",
      },
    ],
  },
  {
    title: "Financial Aid & Scholarships",
    icon: <FileText className="h-5 w-5" />,
    items: [
      {
        id: 5,
        question: "What financial aid options are available?",
        answer:
          "We offer comprehensive financial aid including merit-based scholarships, need-based grants, federal and private loans, and work-study opportunities. Merit scholarships range from $5,000 to full tuition based on academic achievement. Need-based aid requires completing the FAFSA (Free Application for Federal Student Aid). Additionally, we offer departmental scholarships, athletic scholarships, and special grants for first-generation students, veterans, and underrepresented groups.",
      },
      {
        id: 6,
        question: "How do I apply for scholarships?",
        answer:
          "All applicants are automatically considered for general merit scholarships based on their admission application. For specialized and departmental scholarships, you'll need to complete our scholarship application through the student portal after being admitted. This single application matches you with all scholarships for which you qualify. Some scholarships require additional materials such as essays or portfolios. The priority deadline for scholarship applications is February 1 for the following academic year.",
      },
    ],
  },
  {
    title: "Student Life & Resources",
    icon: <Users className="h-5 w-5" />,
    items: [
      {
        id: 7,
        question: "What student support services do you provide?",
        answer:
          "We offer comprehensive support services including academic advising, tutoring centers for math, writing, and science, career counseling, health and wellness services, disability support, and mental health counseling. Our student success center provides workshops on study skills, time management, and research methods. Additionally, we have dedicated offices for international students, veterans, LGBTQ+ students, and first-generation college students to ensure all students have the resources they need to thrive.",
      },
      {
        id: 8,
        question: "What extracurricular activities are available?",
        answer:
          "Our campus features over 200 student organizations including academic clubs, cultural groups, performing arts ensembles, student government, and volunteer organizations. We have 20 NCAA Division I athletic teams and extensive intramural and club sports. Greek life includes 30 fraternities and sororities. Our campus hosts regular events including concerts, lectures, film screenings, and cultural celebrations. Students can also participate in undergraduate research, study abroad programs, and internship opportunities.",
      },
    ],
  },
];

const EducationFAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-indigo-50 to-white py-24"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Book pattern background */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-[0.03]" />

        {/* Gradient circles */}
        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-purple-200/50 to-indigo-100/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tr from-indigo-200/50 to-purple-100/30"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute left-[15%] top-40 text-purple-400/40"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <GraduationCap size={60} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-[10%] text-indigo-400/40"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1,
          }}
        >
          <BrainCircuit size={70} />
        </motion.div>

        <motion.div
          className="absolute right-[25%] top-1/2 text-purple-400/30"
          animate={{
            y: [0, 10, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2,
          }}
        >
          <Lightbulb size={50} />
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <span className="mb-4 inline-block rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700">
            Student Resources
          </span>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Academic FAQs
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Find answers to common questions about admissions, programs, and
            student life
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {faqGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: { delay: groupIndex * 0.1, duration: 0.5 },
                    }
                  : { opacity: 0, y: 20 }
              }
              className="group"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 blur-sm transition duration-300 group-hover:opacity-100" />
                <div className="relative overflow-hidden rounded-2xl border border-purple-100 bg-white shadow-sm">
                  <div className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-indigo-50 p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 p-3 text-white">
                        {group.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  <div className="divide-y divide-purple-100">
                    {group.items.map((item) => (
                      <div key={item.id} className="overflow-hidden">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-purple-50/50"
                          aria-expanded={openItems.includes(item.id)}
                        >
                          <h4 className="pr-8 text-base font-medium text-gray-900 md:text-lg">
                            {item.question}
                          </h4>
                          <motion.div
                            animate={{
                              rotate: openItems.includes(item.id) ? 45 : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className={`flex-shrink-0 rounded-full p-2 ${
                              openItems.includes(item.id)
                                ? "bg-purple-600 text-white"
                                : "bg-purple-100 text-purple-600"
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
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
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="mb-6 text-gray-600">
            Still have questions? Our admissions team is here to help.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 font-medium text-white shadow-lg shadow-purple-200/50 transition-all"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 25px -5px rgba(147, 51, 234, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a Tour
            </motion.a>
            <motion.a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-purple-200 bg-white px-8 py-4 font-medium text-gray-700 transition-all hover:bg-purple-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Admissions
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationFAQ;
