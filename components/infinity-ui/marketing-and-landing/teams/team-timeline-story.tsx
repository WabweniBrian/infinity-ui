"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  Calendar,
  GraduationCap,
  Briefcase,
  Heart,
  Star,
} from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  joinedYear: number;
  story: {
    title: string;
    description: string;
    year: number;
    icon: "education" | "work" | "award" | "personal";
  }[];
  imageUrl: string;
  color: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Lead Designer",
    joinedYear: 2018,
    story: [
      {
        title: "Graduated from Design School",
        description: "Received BFA in Graphic Design with honors",
        year: 2015,
        icon: "education",
      },
      {
        title: "Started at Agency X",
        description: "Worked on branding for major tech clients",
        year: 2016,
        icon: "work",
      },
      {
        title: "Joined Our Team",
        description: "Came aboard as a Senior Designer",
        year: 2018,
        icon: "work",
      },
      {
        title: "Design Award Winner",
        description: "Recognized for innovative UI system",
        year: 2020,
        icon: "award",
      },
      {
        title: "Promoted to Lead Designer",
        description: "Now leading our design team and strategy",
        year: 2021,
        icon: "work",
      },
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Developer",
    joinedYear: 2019,
    story: [
      {
        title: "Computer Science Degree",
        description: "MS in Computer Science from Tech University",
        year: 2016,
        icon: "education",
      },
      {
        title: "First Startup Experience",
        description: "Built MVP for a fintech startup",
        year: 2017,
        icon: "work",
      },
      {
        title: "Open Source Contributor",
        description: "Became a core contributor to React library",
        year: 2018,
        icon: "personal",
      },
      {
        title: "Joined Our Team",
        description: "Came aboard as a Frontend Developer",
        year: 2019,
        icon: "work",
      },
      {
        title: "Led Platform Redesign",
        description: "Architected our new platform from scratch",
        year: 2021,
        icon: "work",
      },
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Product Manager",
    joinedYear: 2017,
    story: [
      {
        title: "MBA Graduate",
        description: "Focused on product management and strategy",
        year: 2015,
        icon: "education",
      },
      {
        title: "Product Analyst",
        description: "Data-driven product decisions at Tech Corp",
        year: 2016,
        icon: "work",
      },
      {
        title: "Joined Our Team",
        description: "Started as Associate Product Manager",
        year: 2017,
        icon: "work",
      },
      {
        title: "Product Launch Success",
        description: "Led our most successful product launch",
        year: 2019,
        icon: "award",
      },
      {
        title: "Promoted to Senior PM",
        description: "Now leading our core product strategy",
        year: 2020,
        icon: "work",
      },
    ],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    color: "from-violet-500 to-purple-500",
  },
];

const TeamTimelineStory = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      className="min-h-screen bg-slate-50 py-20 dark:bg-slate-900"
      ref={containerRef}
    >
      {/* Dark mode toggle */}
      <DarkModeToggle />

      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-slate-800 dark:text-white md:text-5xl">
            Our Team{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              Stories
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Get to know the journeys of our amazing team members and how
            they&apos;ve grown with us.
          </p>
        </motion.div>

        <div className="space-y-32">
          {teamMembers.map((member, memberIndex) => (
            <TeamMemberStory
              key={member.id}
              member={member}
              index={memberIndex}
              containerScrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMemberStory = ({
  member,
  index,
  containerScrollYProgress,
}: {
  member: TeamMember;
  index: number;
  containerScrollYProgress: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: localScrollProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Alternate layout direction for even/odd
  const isEven = index % 2 === 0;

  // Pre-calculate all event progress values
  const eventProgress0 = useTransform(localScrollProgress, [0.1, 0.2], [0, 1]);
  const eventProgress1 = useTransform(
    localScrollProgress,
    [0.25, 0.35],
    [0, 1],
  );
  const eventProgress2 = useTransform(localScrollProgress, [0.4, 0.5], [0, 1]);
  const eventProgress3 = useTransform(
    localScrollProgress,
    [0.55, 0.65],
    [0, 1],
  );
  const eventProgress4 = useTransform(localScrollProgress, [0.7, 0.8], [0, 1]);

  // Create an array of progress values to reference by index
  const eventProgressValues = [
    eventProgress0,
    eventProgress1,
    eventProgress2,
    eventProgress3,
    eventProgress4,
  ];

  return (
    <div ref={ref} className="relative">
      {/* Member intro */}
      <div
        className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} mb-16 items-center gap-8`}
      >
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/3"
        >
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-lg">
              <Image
                src={
                  member.imageUrl ||
                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                }
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-lg opacity-30 mix-blend-overlay`}
            />

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg dark:bg-slate-800">
              <div className="text-center">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  Joined
                </div>
                <div className="text-xl font-bold text-slate-800 dark:text-white">
                  {member.joinedYear}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-2/3"
        >
          <h3 className="mb-2 text-3xl font-bold text-slate-800 dark:text-white">
            {member.name}
          </h3>
          <div
            className={`inline-block rounded-full bg-gradient-to-r px-3 py-1 text-white ${member.color} mb-4 text-sm font-medium`}
          >
            {member.role}
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Follow {member.name.split(" ")[0]}&apos;s journey from the beginning
            to becoming our {member.role.toLowerCase()}.
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <div className="relative border-l-2 border-slate-200 pl-8 dark:border-slate-700">
        {member.story.map((event, eventIndex) => {
          // Use the pre-calculated progress value for this event
          const eventProgress =
            eventProgressValues[eventIndex] || eventProgress0;

          return (
            <motion.div
              key={eventIndex}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: eventIndex * 0.1 }}
              className="relative mb-12"
            >
              {/* Timeline dot */}
              <motion.div
                style={{ scale: eventProgress }}
                className="absolute -left-[25px] top-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800"
              >
                {event.icon === "education" && (
                  <GraduationCap className="text-indigo-500" size={20} />
                )}
                {event.icon === "work" && (
                  <Briefcase className="text-emerald-500" size={20} />
                )}
                {event.icon === "award" && (
                  <Award className="text-amber-500" size={20} />
                )}
                {event.icon === "personal" && (
                  <Heart className="text-rose-500" size={20} />
                )}
              </motion.div>

              <div className="ml-4 rounded-lg bg-white p-6 shadow-md dark:bg-slate-800">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-xl font-bold text-slate-800 dark:text-white">
                    {event.title}
                  </h4>
                  <div className="flex items-center text-slate-500 dark:text-slate-400">
                    <Calendar size={16} className="mr-1" />
                    <span>{event.year}</span>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  {event.description}
                </p>
              </div>
            </motion.div>
          );
        })}

        {/* Current status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute -bottom-8 -left-8 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
        >
          <Star className="text-white" size={24} />
        </motion.div>
      </div>
    </div>
  );
};

export default TeamTimelineStory;
