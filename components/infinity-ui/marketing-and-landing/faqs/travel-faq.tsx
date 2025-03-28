"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  MapPin,
  Plane,
  Compass,
  Globe,
  TreePalmIcon as PalmTree,
  Sunrise,
  Hotel,
  UmbrellaIcon,
  Mountain,
} from "lucide-react";

type Destination = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  questions: FAQItem[];
};

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

const destinations: Destination[] = [
  {
    id: "europe",
    name: "Europe",
    icon: <Globe className="h-6 w-6" />,
    color: "from-emerald-500 to-teal-500",
    questions: [
      {
        id: 1,
        question: "What's the best time to visit European destinations?",
        answer:
          "The ideal time to visit Europe is during the shoulder seasons (April-May or September-October) when the weather is pleasant, crowds are smaller, and prices are lower. Summer (June-August) offers the warmest weather but comes with larger crowds and higher prices. Winter (November-March) is perfect for Christmas markets, skiing in the Alps, and experiencing a different side of European culture with fewer tourists.",
      },
      {
        id: 2,
        question: "Do I need a visa to travel to Europe?",
        answer:
          "Visa requirements depend on your nationality. Citizens of the US, Canada, Australia, and many other countries can enter the Schengen Area (26 European countries) for up to 90 days within a 180-day period without a visa. Starting in 2025, these travelers will need to apply for ETIAS (European Travel Information and Authorization System) authorization before their trip. Always check the specific requirements for your nationality and the countries you plan to visit well before your departure date.",
      },
    ],
  },
  {
    id: "asia",
    name: "Asia",
    icon: <PalmTree className="h-6 w-6" />,
    color: "from-amber-500 to-orange-500",
    questions: [
      {
        id: 3,
        question: "What vaccinations do I need for traveling to Asia?",
        answer:
          "Recommended vaccinations for Asia vary by country but often include Hepatitis A and B, Typhoid, Tetanus, and Japanese Encephalitis. Some countries require proof of Yellow Fever vaccination if you&apos;re arriving from an endemic area. It's best to consult with a travel medicine specialist 4-8 weeks before your trip for personalized recommendations based on your specific itinerary, planned activities, and medical history.",
      },
      {
        id: 4,
        question: "How can I navigate language barriers in Asian countries?",
        answer:
          "To overcome language barriers, download translation apps like Google Translate (with offline language packs) before your trip. Learn basic phrases in the local language—even simple greetings and thank-yous are appreciated. Carry a pocket phrasebook or picture cards for common needs. In tourist areas, many people speak some English, especially younger generations. Consider hiring local guides for deeper cultural experiences, and don&apos;t underestimate the power of body language, smiles, and patience in cross-cultural communication.",
      },
    ],
  },
  {
    id: "americas",
    name: "Americas",
    icon: <Mountain className="h-6 w-6" />,
    color: "from-blue-500 to-indigo-500",
    questions: [
      {
        id: 5,
        question:
          "What's the best way to travel between countries in South America?",
        answer:
          "Flying is the most efficient way to cover long distances in South America due to challenging terrain and vast distances. LATAM, Avianca, and GOL offer good regional coverage. For neighboring countries, long-distance buses are comfortable and economical—companies like Cruz del Sur and Buquebus provide high-quality service. The continent has limited international train connections, though scenic routes exist in Peru, Ecuador, and Argentina. For flexible exploration of a single country, consider rental cars, but avoid crossing borders due to paperwork complications and fees.",
      },
      {
        id: 6,
        question: "Is it safe to drink tap water in North and South America?",
        answer:
          "Tap water safety varies significantly across the Americas. In the US, Canada, Chile, and parts of Argentina, tap water is generally safe to drink. However, in most of Latin America and the Caribbean, it's advisable to drink bottled or purified water. Even in areas with technically safe water, travelers with sensitive stomachs might want to stick to bottled water initially. Consider carrying a water purifier or filter bottle for environmental sustainability. When in doubt, ask locals or your accommodation provider about local water safety.",
      },
    ],
  },
  {
    id: "africa",
    name: "Africa",
    icon: <Sunrise className="h-6 w-6" />,
    color: "from-red-500 to-pink-500",
    questions: [
      {
        id: 7,
        question: "What should I pack for an African safari?",
        answer:
          "For an African safari, pack lightweight, breathable clothing in neutral colors (khaki, olive, beige) that won't attract insects or distract animals. Include long-sleeved shirts and pants for sun and insect protection, a wide-brimmed hat, sturdy closed-toe shoes, and a warm layer for cool mornings and evenings. Essential gear includes high-SPF sunscreen, insect repellent with DEET, binoculars, a good camera with zoom lens, a headlamp or flashlight, and any necessary medications. Check your specific destination's seasonal weather and luggage weight restrictions for small aircraft if applicable.",
      },
      {
        id: 8,
        question: "When is the best time to see the Great Migration in Africa?",
        answer:
          "The Great Migration is a year-round circular event across Tanzania's Serengeti and Kenya's Maasai Mara, but timing depends on what you want to see. For river crossings with dramatic crocodile encounters, visit Kenya's Maasai Mara from July to September. To witness the calving season when approximately 500,000 wildebeest calves are born, visit Tanzania's southern Serengeti from January to March. April-June offers good wildlife viewing with fewer crowds and lower rates as the herds move northwest. Each season offers different highlights of this spectacular natural phenomenon.",
      },
    ],
  },
  {
    id: "oceania",
    name: "Oceania",
    icon: <UmbrellaIcon className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-500",
    questions: [
      {
        id: 9,
        question: "What's the best way to explore Australia's vast landscapes?",
        answer:
          "Australia's vast size requires strategic planning. For comprehensive exploration, combine domestic flights between major regions with more localized transportation. A classic road trip is ideal for coastal routes like the Great Ocean Road or exploring a specific region like Tasmania. Campervan rentals offer flexibility and accommodation in one, perfect for outback adventures. The Indian Pacific and Ghan railways provide scenic cross-country journeys. Organized tours work well for remote areas like the Kimberley. Allow ample time—distances are deceptively large, and rushing through Australia's spectacular landscapes would be a missed opportunity.",
      },
      {
        id: 10,
        question: "What unique wildlife experiences can I have in New Zealand?",
        answer:
          "New Zealand offers exceptional wildlife encounters in pristine settings. Kaikoura is famous for whale watching and swimming with dolphins year-round. The Otago Peninsula near Dunedin is home to the world's rarest penguin (yellow-eyed) and the only mainland royal albatross colony. In Akaroa, you can swim with the world's smallest dolphin, the Hector's dolphin. The glowworm caves of Waitomo provide a magical underground experience. For bird enthusiasts, sanctuaries like Zealandia in Wellington and Tiritiri Matangi near Auckland offer chances to see kiwi, takahe, and other endemic species that evolved without mammalian predators.",
      },
    ],
  },
];

const TravelFAQ = () => {
  const [activeDestination, setActiveDestination] = useState("europe");
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const mapRef = useRef<HTMLDivElement>(null);

  const toggleQuestion = (id: number) => {
    setExpandedQuestions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDestinationClick = (id: string) => {
    setActiveDestination(id);
    setExpandedQuestions([]);
  };

  const currentDestination =
    destinations.find((d) => d.id === activeDestination) || destinations[0];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-sky-900 via-indigo-900 to-sky-900 py-24"
      ref={sectionRef}
    >
      {/* World map background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=800&width=1200')] bg-center bg-no-repeat opacity-20" />
      </div>

      {/* Animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[10%] top-20 text-sky-400/30"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <Plane size={80} />
        </motion.div>

        <motion.div
          className="absolute bottom-40 right-[15%] text-amber-400/30"
          animate={{
            y: [0, 30, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1,
          }}
        >
          <Compass size={100} />
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 opacity-70 blur-xl" />
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-500">
              <MapPin className="h-10 w-10 text-white" />
            </div>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Travel Destinations FAQ
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-sky-100">
            Explore our most frequently asked questions about popular travel
            destinations
          </p>
        </motion.div>

        {/* Interactive map */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          ref={mapRef}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {destinations.map((destination) => (
              <motion.button
                key={destination.id}
                onClick={() => handleDestinationClick(destination.id)}
                className={`group relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${destination.color} rounded-xl opacity-${activeDestination === destination.id ? "100" : "0"} transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div
                  className={`relative flex items-center gap-3 rounded-xl px-6 py-4 ${
                    activeDestination === destination.id
                      ? "text-white"
                      : "bg-white/10 text-sky-100 backdrop-blur-sm"
                  }`}
                >
                  <div className="flex-shrink-0">{destination.icon}</div>
                  <span className="text-lg font-medium">
                    {destination.name}
                  </span>

                  {activeDestination === destination.id && (
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-white"
                      layoutId="destinationIndicator"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* FAQ content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDestination}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md"
          >
            <div className="mb-8 flex items-center gap-4">
              <div
                className={`rounded-xl bg-gradient-to-r p-4 ${currentDestination.color}`}
              >
                {currentDestination.icon}
              </div>
              <h3 className="text-2xl font-bold text-white">
                {currentDestination.name} Travel Guide
              </h3>
            </div>

            <div className="space-y-4">
              {currentDestination.questions.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="relative">
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${currentDestination.color} rounded-xl opacity-0 blur-sm transition duration-300 group-hover:opacity-100`}
                    />
                    <div className="relative overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm">
                      <button
                        onClick={() => toggleQuestion(item.id)}
                        className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-white/5"
                        aria-expanded={expandedQuestions.includes(item.id)}
                      >
                        <h4 className="pr-8 text-lg font-medium text-white">
                          {item.question}
                        </h4>
                        <div
                          className={`flex-shrink-0 rounded-full p-2 transition-colors ${
                            expandedQuestions.includes(item.id)
                              ? `bg-gradient-to-r ${currentDestination.color} text-white`
                              : "bg-white/10 text-white"
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
                            className={`transition-transform duration-300 ${expandedQuestions.includes(item.id) ? "rotate-180" : ""}`}
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
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
                            <div className="border-t border-white/10 p-5 pt-2 text-sky-100">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="mb-6 text-sky-200">
            Need more specific travel information? Our travel experts are ready
            to help.
          </p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-8 py-4 font-medium text-white shadow-lg shadow-sky-500/30 transition-all"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(14, 165, 233, 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            Plan Your Journey
            <Plane className="ml-1 h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default TravelFAQ;
