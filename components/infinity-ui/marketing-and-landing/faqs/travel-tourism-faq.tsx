"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Plane,
  Map,
  Globe,
  Compass,
  TreePalmIcon as PalmTree,
  Sunrise,
  Hotel,
  UmbrellaIcon,
} from "lucide-react";

type FAQCategory = {
  id: string;
  name: string;
  icon: React.ReactNode;
  questions: {
    id: number;
    question: string;
    answer: string;
  }[];
};

const faqCategories: FAQCategory[] = [
  {
    id: "booking",
    name: "Booking & Reservations",
    icon: <Hotel className="h-5 w-5" />,
    questions: [
      {
        id: 1,
        question: "How far in advance should I book my trip?",
        answer:
          "For peak season travel (summer months, holidays), we recommend booking 3-6 months in advance to secure the best rates and availability. For off-peak travel, 1-3 months is typically sufficient. Last-minute deals are occasionally available, but selection may be limited.",
      },
      {
        id: 2,
        question: "What is your cancellation policy?",
        answer:
          "Our standard cancellation policy allows for a full refund if cancelled 30+ days before departure, a 50% refund if cancelled 15-29 days before departure, and no refund for cancellations less than 15 days before departure. However, policies may vary by package and destination. We also offer travel insurance options that provide coverage for unexpected cancellations.",
      },
    ],
  },
  {
    id: "destinations",
    name: "Destinations & Experiences",
    icon: <PalmTree className="h-5 w-5" />,
    questions: [
      {
        id: 3,
        question:
          "Which destinations are best for families with young children?",
        answer:
          "For families with young children, we recommend destinations with family-friendly accommodations, minimal travel time, and plenty of kid-oriented activities. Popular options include Orlando (theme parks), Hawaii (beaches and nature), Costa Rica (wildlife and adventure), and Mediterranean cruises (multiple destinations with minimal unpacking). Our family travel specialists can help customize an itinerary based on your children's ages and interests.",
      },
      {
        id: 4,
        question: "Do you offer customized itineraries?",
        answer:
          "Yes, we specialize in creating customized itineraries tailored to your interests, budget, and travel style. Our travel consultants will work with you to design a personalized experience, whether you're interested in culinary tours, adventure activities, cultural immersion, or relaxation. We can also accommodate special requests such as anniversary celebrations, family reunions, or accessibility requirements.",
      },
    ],
  },
  {
    id: "travel",
    name: "Travel Requirements",
    icon: <Compass className="h-5 w-5" />,
    questions: [
      {
        id: 5,
        question: "What travel documents do I need?",
        answer:
          "Required travel documents vary by destination. For international travel, you'll typically need a passport valid for at least six months beyond your return date. Some countries also require visas, which we can help you obtain. For certain destinations, proof of vaccinations may be necessary. We provide detailed document requirements during the booking process and recommend checking official government websites for the most current information.",
      },
      {
        id: 6,
        question: "Do I need travel insurance?",
        answer:
          "While not mandatory, we strongly recommend travel insurance for all trips. A comprehensive policy typically covers trip cancellation/interruption, medical emergencies, evacuation, lost luggage, and travel delays. The cost is usually 5-10% of your total trip price, which is a small price for peace of mind. We offer several insurance options and can help you select the best coverage for your specific journey.",
      },
    ],
  },
  {
    id: "accommodations",
    name: "Accommodations & Amenities",
    icon: <UmbrellaIcon className="h-5 w-5" />,
    questions: [
      {
        id: 7,
        question: "What types of accommodations do you offer?",
        answer:
          "We offer a wide range of accommodations to suit every preference and budget, from luxury resorts and boutique hotels to vacation rentals, eco-lodges, and all-inclusive properties. All our accommodations are personally vetted for quality, cleanliness, service, and location. We can also arrange specialty lodging such as overwater bungalows, historic castles, safari tents, or private villas.",
      },
      {
        id: 8,
        question: "Are meals included in my package?",
        answer:
          "Meal inclusions vary by package and property. All-inclusive resorts typically cover all meals and beverages, while other packages might include breakfast only or no meals. Your itinerary will clearly indicate which meals are included. For packages without meals, our destination guides provide restaurant recommendations for all budgets, and we're happy to make reservations for special dining experiences.",
      },
    ],
  },
];

const TravelTourismFAQ = () => {
  const [activeCategory, setActiveCategory] = useState("booking");
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const toggleQuestion = (id: number) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-sky-50 to-white py-24"
      ref={sectionRef}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* World map background */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-center bg-no-repeat opacity-[0.03]" />

        {/* Gradient circles */}
        <motion.div
          className="absolute right-0 top-0 h-[800px] w-[800px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gradient-to-br from-sky-100 to-blue-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/4 translate-y-1/3 rounded-full bg-gradient-to-tr from-sky-100 to-blue-50"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Floating icons */}
        <motion.div
          className="absolute left-[10%] top-40 text-sky-300"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <Plane size={40} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-[15%] text-amber-300"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1,
          }}
        >
          <Sunrise size={50} />
        </motion.div>

        <motion.div
          className="absolute right-[20%] top-1/2 text-blue-300"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 2,
          }}
        >
          <Globe size={35} />
        </motion.div>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-blue-500 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-500">
              <Map className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Travel FAQs
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Everything you need to know about planning your perfect getaway
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-12">
          {/* Category sidebar */}
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
                      ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg shadow-sky-200"
                      : "text-gray-700 hover:bg-sky-50"
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
                        : "bg-sky-100"
                    }`}
                  >
                    {category.icon}
                  </div>
                  <span className="font-medium">{category.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Questions and answers */}
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
                className="space-y-4"
              >
                {faqCategories
                  .find((cat) => cat.id === activeCategory)
                  ?.questions.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="group"
                    >
                      <div className="relative">
                        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-sky-400 to-blue-400 opacity-0 blur-sm transition duration-300 group-hover:opacity-100" />
                        <div className="relative overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm">
                          <button
                            onClick={() => toggleQuestion(item.id)}
                            className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-sky-50/50"
                            aria-expanded={expandedQuestions.includes(item.id)}
                          >
                            <h3 className="text-lg font-medium text-gray-900">
                              {item.question}
                            </h3>
                            <div className="ml-4 flex-shrink-0">
                              <div
                                className={`rounded-full p-2 transition-colors ${
                                  expandedQuestions.includes(item.id)
                                    ? "bg-sky-500 text-white"
                                    : "bg-sky-100 text-sky-500"
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
                                  className={`transition-transform duration-300 ${
                                    expandedQuestions.includes(item.id)
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                >
                                  <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                              </div>
                            </div>
                          </button>

                          <AnimatePresence>
                            {expandedQuestions.includes(item.id) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="border-t border-sky-100 p-5 pt-2 text-gray-600">
                                  {item.answer}
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

            {/* Call to action */}
            <motion.div
              className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-sky-200 bg-gradient-to-r from-sky-100 to-blue-100 p-8 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div>
                <h4 className="mb-2 text-xl font-semibold text-gray-900">
                  Ready to plan your dream vacation?
                </h4>
                <p className="text-gray-600">
                  Our travel experts are here to help create your perfect
                  itinerary
                </p>
              </div>
              <motion.a
                href="#"
                className="flex items-center gap-2 whitespace-nowrap rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 px-8 py-4 font-medium text-white shadow-lg shadow-sky-200/50 transition-all"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(14, 165, 233, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start Planning</span>
                <Plane className="h-4 w-4" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TravelTourismFAQ;
