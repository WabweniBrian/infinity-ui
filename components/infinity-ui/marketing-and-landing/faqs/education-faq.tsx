"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  School,
  Award,
  CheckCircle,
  XCircle,
  HelpCircle,
  BrainCircuit,
  Lightbulb,
  Rocket,
} from "lucide-react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  options?: string[];
  correctOption?: number;
};

type FAQCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: FAQItem[];
};

const faqCategories: FAQCategory[] = [
  {
    id: "programs",
    name: "Programs & Courses",
    icon: <BookOpen className="h-5 w-5" />,
    items: [
      {
        id: 1,
        question: "What degree programs do you offer?",
        answer:
          "We offer a comprehensive range of undergraduate and graduate programs across six colleges: Business, Engineering, Arts & Sciences, Education, Health Sciences, and Fine Arts. Our most popular majors include Computer Science, Business Administration, Psychology, Mechanical Engineering, and Nursing. We also offer online and hybrid options for many programs, as well as certificate programs and continuing education courses for professional development.",
        options: [
          "Only undergraduate programs in limited fields",
          "Only graduate programs for working professionals",
          "A comprehensive range of undergraduate and graduate programs across six colleges",
          "Exclusively online certificate programs",
        ],
        correctOption: 2,
      },
      {
        id: 2,
        question:
          "Can I take courses without being enrolled in a degree program?",
        answer:
          "Yes, we welcome non-degree seeking students! You can take individual courses for personal enrichment, professional development, or to explore areas of interest without committing to a full degree program. The credits you earn may be applied toward a degree later if you decide to enroll. Registration for non-degree courses is available through our Continuing Education department, and many courses are offered in evening, weekend, or online formats to accommodate working professionals.",
        options: [
          "No, all courses require full degree program enrollment",
          "Yes, through our Continuing Education department",
          "Only if you've previously completed a degree with us",
          "Only during summer sessions",
        ],
        correctOption: 1,
      },
    ],
  },
  {
    id: "admissions",
    name: "Admissions & Applications",
    icon: <School className="h-5 w-5" />,
    items: [
      {
        id: 3,
        question: "What are the admission requirements?",
        answer:
          "Admission requirements vary by program. For undergraduate programs, we typically require a high school diploma or equivalent, standardized test scores (SAT/ACT, though many programs are now test-optional), a personal statement, and letters of recommendation. Graduate programs generally require a bachelor's degree, GRE/GMAT scores (program-dependent), statement of purpose, letters of recommendation, and relevant experience. International students must also demonstrate English proficiency through TOEFL or IELTS scores. Please check the specific requirements for your program of interest on our Admissions website.",
        options: [
          "Only a high school diploma is required for all programs",
          "Requirements vary by program and include various combinations of test scores, recommendations, and previous education",
          "A minimum 4.0 GPA is required for all applicants",
          "Only transfer students from accredited institutions are accepted",
        ],
        correctOption: 1,
      },
      {
        id: 4,
        question: "When are the application deadlines?",
        answer:
          "Our application deadlines are: Fall Semester - Early Decision: November 1, Regular Decision: January 15; Spring Semester - October 1; Summer Sessions - March 1. Graduate program deadlines vary, with most falling between December and February for fall admission. Some programs offer rolling admissions, while others have strict deadlines. International students should apply at least 3-4 months before the term starts to allow time for visa processing. For the most current deadline information, please visit our Admissions Calendar page.",
        options: [
          "We have rolling admissions with no deadlines",
          "All applications are due on January 1 regardless of program or term",
          "Deadlines vary by semester, with Fall applications typically due in January",
          "Applications are only accepted once per year",
        ],
        correctOption: 2,
      },
    ],
  },
  {
    id: "financial",
    name: "Financial Aid & Scholarships",
    icon: <Award className="h-5 w-5" />,
    items: [
      {
        id: 5,
        question: "What types of financial aid are available?",
        answer:
          "We offer comprehensive financial aid options including: Merit-based scholarships recognizing academic achievement, leadership, and special talents; Need-based grants determined by your FAFSA results; Federal and private student loans; Work-study opportunities on campus; Graduate assistantships and fellowships; Military and veteran benefits; and External scholarships from community organizations. About 85% of our students receive some form of financial assistance, with the average aid package covering approximately 70% of total costs.",
        options: [
          "Only federal student loans",
          "Only merit-based scholarships for top students",
          "A comprehensive range including scholarships, grants, loans, and work opportunities",
          "Financial aid is not available to any students",
        ],
        correctOption: 2,
      },
      {
        id: 6,
        question: "How do I apply for scholarships?",
        answer:
          "Applying for scholarships is straightforward. When you submit your admission application, you're automatically considered for most merit-based institutional scholarships. For need-based aid, complete the FAFSA (Free Application for Federal Student Aid) as early as possible after October 1. Our separate scholarship application portal opens in November each year for specialized and departmental scholarships—this requires a general application and supplemental materials depending on the specific scholarships. International students should check our International Education Office website for scholarships specifically available to them.",
        options: [
          "You're automatically considered for most scholarships when you apply for admission",
          "All scholarships require separate applications submitted directly to each department",
          "Scholarships are only available to continuing students, not new applicants",
          "You must interview with the scholarship committee in person",
        ],
        correctOption: 0,
      },
    ],
  },
  {
    id: "campus",
    name: "Campus Life & Resources",
    icon: <GraduationCap className="h-5 w-5" />,
    items: [
      {
        id: 7,
        question: "What housing options are available for students?",
        answer:
          "We offer diverse housing options to meet different preferences and budgets. First-year students typically live in traditional residence halls with shared rooms and community bathrooms or suite-style accommodations with semi-private bathrooms. Upperclassmen can choose from apartments, townhouses, and special interest housing communities. All housing facilities include Wi-Fi, laundry facilities, common areas, and resident advisor support. Family housing is available for married students and those with children. While not guaranteed for all four years, priority is given to first-year and second-year students, with limited options for upperclassmen based on availability.",
        options: [
          "Only off-campus apartments are available",
          "All students must live in traditional dormitories",
          "Various options including residence halls, apartments, and special interest housing",
          "Housing is only available to scholarship recipients",
        ],
        correctOption: 2,
      },
      {
        id: 8,
        question: "What academic support services do you provide?",
        answer:
          "We offer comprehensive academic support through our Student Success Center, including: Free tutoring in most subjects; Writing and math labs staffed by specialists; Academic coaching and study skills workshops; Supplemental instruction for challenging courses; Disability support services providing accommodations and assistive technologies; Technology assistance centers; Research librarians specialized by discipline; and Career counseling and internship placement services. These resources are available to all enrolled students at no additional cost, with both in-person and virtual options to accommodate different schedules and learning preferences.",
        options: [
          "No academic support is provided; students are expected to succeed independently",
          "Only paid private tutoring is available",
          "Comprehensive support including free tutoring, labs, coaching, and disability services",
          "Support is only available to students on academic probation",
        ],
        correctOption: 2,
      },
    ],
  },
];

const EducationFAQ = () => {
  const [activeCategory, setActiveCategory] = useState("programs");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>(
    {},
  );
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const toggleItem = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const toggleShowAnswer = (questionId: number) => {
    setShowAnswers((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const currentCategory =
    faqCategories.find((c) => c.id === activeCategory) || faqCategories[0];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-amber-50 to-white py-24"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full bg-gradient-to-br from-amber-100 to-amber-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/3 translate-y-1/3 rounded-full bg-gradient-to-tr from-amber-100 to-amber-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute left-[15%] top-40 text-amber-300"
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
          <BrainCircuit size={60} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-[10%] text-amber-300"
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
          <Lightbulb size={70} />
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-yellow-500">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Education & Learning FAQ
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Test your knowledge while finding answers to common questions about
            our programs
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-12">
          <motion.div
            className="md:col-span-4 lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24 space-y-2">
              {faqCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all ${
                    activeCategory === category.id
                      ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-200"
                      : "text-gray-700 hover:bg-amber-50"
                  }`}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`rounded-lg p-3 ${
                      activeCategory === category.id
                        ? "bg-white/20"
                        : "bg-amber-100"
                    }`}
                  >
                    {category.icon}
                  </div>
                  <span className="font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="md:col-span-8 lg:col-span-9"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {currentCategory.items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 blur-sm transition duration-300 group-hover:opacity-100" />
                      <div className="relative overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm">
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-amber-50/50"
                          aria-expanded={expandedItems.includes(item.id)}
                        >
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.question}
                          </h3>
                          <div
                            className={`ml-4 flex-shrink-0 rounded-full p-2 transition-colors ${
                              expandedItems.includes(item.id)
                                ? "bg-amber-500 text-white"
                                : "bg-amber-100 text-amber-500"
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
                              className={`transition-transform duration-300 ${expandedItems.includes(item.id) ? "rotate-180" : ""}`}
                            >
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </div>
                        </button>

                        <AnimatePresence>
                          {expandedItems.includes(item.id) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="border-t border-amber-100 px-5 pb-5">
                                {/* Quiz-like interface */}
                                {item.options ? (
                                  <div className="pt-4">
                                    <p className="mb-4 text-gray-600">
                                      Test your knowledge:
                                    </p>
                                    <div className="mb-4 space-y-2">
                                      {item.options.map((option, index) => (
                                        <button
                                          key={index}
                                          onClick={() =>
                                            handleOptionSelect(item.id, index)
                                          }
                                          className={`w-full rounded-lg border p-3 text-left transition-colors ${
                                            quizAnswers[item.id] === index
                                              ? showAnswers[item.id]
                                                ? index === item.correctOption
                                                  ? "border-green-300 bg-green-100 text-green-800"
                                                  : "border-red-300 bg-red-100 text-red-800"
                                                : "border-amber-300 bg-amber-100 text-amber-800"
                                              : "border-gray-200 bg-gray-50 text-gray-700 hover:bg-amber-50"
                                          }`}
                                        >
                                          <div className="flex items-center">
                                            <div className="mr-3">
                                              {showAnswers[item.id] &&
                                              quizAnswers[item.id] === index ? (
                                                index === item.correctOption ? (
                                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                                ) : (
                                                  <XCircle className="h-5 w-5 text-red-500" />
                                                )
                                              ) : (
                                                <div
                                                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                                    quizAnswers[item.id] ===
                                                    index
                                                      ? "border-amber-500 bg-amber-500"
                                                      : "border-gray-300"
                                                  }`}
                                                >
                                                  {quizAnswers[item.id] ===
                                                    index && (
                                                    <div className="h-2 w-2 rounded-full bg-white" />
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                            <span>{option}</span>
                                          </div>
                                        </button>
                                      ))}
                                    </div>

                                    <div className="flex items-center justify-between">
                                      <button
                                        onClick={() =>
                                          toggleShowAnswer(item.id)
                                        }
                                        className="flex items-center gap-1 font-medium text-amber-600 hover:text-amber-700"
                                      >
                                        <HelpCircle className="h-4 w-4" />
                                        {showAnswers[item.id]
                                          ? "Hide Answer"
                                          : "Check Answer"}
                                      </button>

                                      {showAnswers[item.id] && (
                                        <div className="text-sm text-gray-500">
                                          {quizAnswers[item.id] ===
                                          item.correctOption ? (
                                            <span className="font-medium text-green-600">
                                              Correct!
                                            </span>
                                          ) : (
                                            <span className="font-medium text-red-600">
                                              Incorrect
                                            </span>
                                          )}
                                        </div>
                                      )}
                                    </div>

                                    {showAnswers[item.id] && (
                                      <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="mt-4 rounded-lg border border-amber-100 bg-amber-50 p-4"
                                      >
                                        <p className="text-gray-700">
                                          {item.answer}
                                        </p>
                                      </motion.div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="pt-4 text-gray-600">
                                    {item.answer}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-100 to-yellow-100 p-8 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div>
                <h4 className="mb-2 text-xl font-semibold text-gray-900">
                  Ready to start your educational journey?
                </h4>
                <p className="text-gray-600">
                  Our admissions team is here to guide you through the process
                </p>
              </div>
              <motion.a
                href="#"
                className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-8 py-4 font-medium text-white shadow-lg shadow-amber-200/50 transition-all"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(245, 158, 11, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Rocket className="h-5 w-5" />
                Apply Now
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EducationFAQ;
