"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  UtensilsCrossed,
  Coffee,
  Beef,
  Salad,
  ChefHat,
  Clock,
  DollarSign,
  Users,
  Leaf,
  Fish,
} from "lucide-react";

type FAQItem = {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
};

type MenuSection = {
  id: string;
  title: string;
  icon: React.ReactNode;
  items: FAQItem[];
};

const menuSections: MenuSection[] = [
  {
    id: "general",
    title: "About Our Restaurant",
    icon: <UtensilsCrossed className="h-6 w-6" />,
    items: [
      {
        id: 1,
        question: "What type of cuisine do you serve?",
        answer:
          "We specialize in contemporary fusion cuisine that blends Mediterranean, Asian, and Latin American influences. Our executive chef creates seasonal menus using locally-sourced ingredients whenever possible. While our menu changes quarterly to showcase the freshest seasonal produce, we maintain several signature dishes year-round that have become customer favorites. We pride ourselves on offering creative flavor combinations that surprise and delight our guests.",
        icon: <ChefHat className="h-5 w-5" />,
      },
      {
        id: 2,
        question: "What are your hours of operation?",
        answer:
          "We're open Tuesday through Sunday. Lunch is served from 11:30 AM to 2:30 PM, and dinner from 5:30 PM to 10:00 PM (11:00 PM on Friday and Saturday). Our bar remains open until midnight on weekends. We're closed on Mondays for staff rest and restaurant maintenance. During major holidays, we often offer special hours and prix fixe menus, which are announced on our website and social media channels.",
        icon: <Clock className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "reservations",
    title: "Reservations & Seating",
    icon: <Users className="h-6 w-6" />,
    items: [
      {
        id: 3,
        question: "Do I need a reservation?",
        answer:
          "While we do accept walk-ins, reservations are highly recommended, especially for dinner service and weekends when we're typically at full capacity. You can make reservations up to 60 days in advance through our website, by phone, or using OpenTable. For parties of 8 or more, we require a reservation with a credit card to hold your table. We hold reserved tables for 15 minutes past the reservation time before releasing them to waiting guests.",
        icon: <Clock className="h-5 w-5" />,
      },
      {
        id: 4,
        question: "Do you have outdoor seating?",
        answer:
          "Yes, we offer a beautiful outdoor patio that seats up to 40 guests. The patio is open seasonally from May through October, weather permitting, and features heaters for cooler evenings. Patio seating is available on a first-come, first-served basis and cannot be specifically reserved. However, you can request outdoor seating when you arrive, and we'll accommodate your preference if possible. The patio is partially covered to provide shade during lunch service.",
        icon: <Users className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "menu",
    title: "Menu & Dietary Needs",
    icon: <Beef className="h-6 w-6" />,
    items: [
      {
        id: 5,
        question: "Can you accommodate dietary restrictions?",
        answer:
          "We pride ourselves on accommodating various dietary needs. Our menu clearly marks items that are vegetarian, vegan, gluten-free, and dairy-free. For more specific allergies or restrictions, please inform your server when ordering, and our chef will modify dishes whenever possible. We maintain separate preparation areas for allergen-sensitive dishes to prevent cross-contamination. With advance notice (24+ hours), we can prepare special meals for guests with complex dietary requirements.",
        icon: <Leaf className="h-5 w-5" />,
      },
      {
        id: 6,
        question: "Do you have a children's menu?",
        answer:
          "Yes, we offer a thoughtfully crafted children's menu that goes beyond typical kids' fare. While we do include crowd-pleasers like house-made chicken tenders and pasta, we also offer smaller portions of select main menu items at reduced prices. All children's meals come with a choice of sides including fresh fruit, vegetable sticks, or house-made potato chips. We provide coloring activities and have high chairs and booster seats available for our younger guests.",
        icon: <UtensilsCrossed className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "special",
    title: "Special Events & Offerings",
    icon: <Salad className="h-6 w-6" />,
    items: [
      {
        id: 7,
        question: "Do you offer private dining or catering?",
        answer:
          "Yes to both! We have a private dining room that accommodates up to 30 guests for seated events or 45 for standing receptions. This space can be reserved for business meetings, family celebrations, or other special occasions with customizable prix fixe menus. Our catering service offers both drop-off and full-service options for events of all sizes. We require at least two weeks' notice for private dining and catering requests. Please contact our events coordinator for availability and pricing details.",
        icon: <Users className="h-5 w-5" />,
      },
      {
        id: 8,
        question: "Do you offer cooking classes or special events?",
        answer:
          "Yes! We host monthly cooking classes where our executive chef teaches participants how to prepare some of our signature dishes. These hands-on classes include a meal with wine pairings and a recipe booklet to take home. We also offer seasonal events like wine dinners, guest chef collaborations, and holiday specials. Our quarterly tasting menu with wine pairings is particularly popular. Sign up for our newsletter or follow us on social media to stay informed about upcoming events.",
        icon: <ChefHat className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "payment",
    title: "Payment & Policies",
    icon: <DollarSign className="h-6 w-6" />,
    items: [
      {
        id: 9,
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express, Discover), mobile payments (Apple Pay, Google Pay), and cash. We do not accept personal checks. For large parties (8 or more), we may add an automatic 20% gratuity to the bill. If you'd like to split the check, please inform your server at the beginning of your meal. We can split checks up to 4 ways for larger parties. Gift cards are available for purchase in-person or through our website.",
        icon: <DollarSign className="h-5 w-5" />,
      },
      {
        id: 10,
        question: "What is your cancellation policy?",
        answer:
          "For standard reservations, we appreciate at least 24 hours' notice for cancellations, though no penalty is charged. For large parties (8+) and special events, we require 48 hours' notice for cancellations to avoid a $25 per person cancellation fee. Private dining reservations require 7 days' notice for cancellation to avoid a charge of 50% of the minimum food and beverage spend. No-shows for any reservation type may affect future reservation privileges. We understand emergencies happen, so please call us as soon as possible if your plans change.",
        icon: <Clock className="h-5 w-5" />,
      },
    ],
  },
];

const FoodFAQ = () => {
  const [activeSection, setActiveSection] = useState("general");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  const toggleItem = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const currentSection =
    menuSections.find((s) => s.id === activeSection) || menuSections[0];

  return (
    <section
      className="relative overflow-hidden bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-fixed bg-center py-24"
      ref={sectionRef}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/90 via-amber-900/90 to-amber-950/90"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[15%] top-40 text-amber-500/20"
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
          <Coffee size={80} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-[10%] text-amber-500/20"
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
          <Fish size={100} />
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-red-500 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-red-500">
              <UtensilsCrossed className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-amber-100 md:text-5xl">
            Restaurant FAQ
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-amber-200">
            Everything you need to know about dining with us
          </p>
        </motion.div>

        {/* Menu-inspired navigation */}
        <motion.div
          className="mb-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {menuSections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`group relative overflow-hidden`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`absolute inset-0 ${
                  activeSection === section.id
                    ? "bg-gradient-to-r from-amber-600 to-red-600"
                    : "bg-amber-800/50 group-hover:bg-amber-700/50"
                } rounded-xl transition-colors duration-300`}
              />
              <div className="relative flex items-center gap-3 rounded-xl px-6 py-4 text-amber-100">
                <div className="flex-shrink-0">{section.icon}</div>
                <span className="text-lg font-medium">{section.title}</span>

                {activeSection === section.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-amber-300"
                    layoutId="sectionIndicator"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Menu-inspired content */}
        <motion.div
          className="rounded-2xl border border-amber-800/50 bg-amber-950/80 p-8 shadow-xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="mb-8 flex items-center gap-4 border-b border-amber-800/50 pb-4">
            <div className="rounded-xl bg-gradient-to-r from-amber-600 to-red-600 p-4 text-white">
              {currentSection.icon}
            </div>
            <h3 className="text-2xl font-bold text-amber-100">
              {currentSection.title}
            </h3>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {currentSection.items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-600 to-red-600 opacity-0 blur-sm transition duration-300 group-hover:opacity-100" />
                    <div className="relative overflow-hidden rounded-xl border border-amber-800/50 bg-amber-900/50 backdrop-blur-sm">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-amber-800/30"
                        aria-expanded={expandedItems.includes(item.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`rounded-lg p-3 ${
                              expandedItems.includes(item.id)
                                ? "bg-gradient-to-r from-amber-600 to-red-600"
                                : "bg-amber-800/50"
                            } text-amber-100`}
                          >
                            {item.icon}
                          </div>
                          <h4 className="text-lg font-medium text-amber-100">
                            {item.question}
                          </h4>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={`text-amber-400 transition-transform duration-300 ${expandedItems.includes(item.id) ? "rotate-180" : ""}`}
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
                            <div className="border-t border-amber-800/50 p-5 pt-2 text-amber-200">
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
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="mb-6 text-amber-200">
            Have more questions? We&apos;d love to hear from you.
          </p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-red-600 px-8 py-4 font-medium text-white shadow-lg shadow-amber-900/50 transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(245, 158, 11, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Make a Reservation
            <UtensilsCrossed className="ml-1 h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FoodFAQ;
