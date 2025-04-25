"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import {
  Mail,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Star,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import Image from "next/image";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  category: "work" | "education" | "achievement" | "project";
  icon: string;
  link?: string;
  media?: string;
  tags?: string[];
}

interface UserData {
  name: string;
  title: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
  skills: string[];
  timeline: TimelineEvent[];
}

interface InteractiveTimelineProfileProps {
  userData?: UserData;
}

const defaultUserData: UserData = {
  name: "Morgan Chen",
  title: "Full Stack Developer & UX Designer",
  avatar:
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
  coverPhoto:
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
  bio: "Passionate developer with 8+ years of experience building web and mobile applications. Focused on creating intuitive, accessible, and performant user experiences.",
  location: "San Francisco, CA",
  email: "morgan.chen@example.com",
  phone: "+1 (555) 987-6543",
  website: "www.morganchen.dev",
  socialLinks: {
    github: "github.com/morganchen",
    linkedin: "linkedin.com/in/morganchen",
    twitter: "twitter.com/morganchen",
    instagram: "instagram.com/morganchen.dev",
  },
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "GraphQL",
    "UI/UX Design",
    "Figma",
    "TailwindCSS",
    "AWS",
  ],
  timeline: [
    {
      id: "event-1",
      date: "2023",
      title: "Lead Developer",
      description:
        "Leading a team of 5 developers building a next-generation e-commerce platform with React, Node.js, and GraphQL.",
      category: "work",
      icon: "Briefcase",
      link: "https://example.com/work",
      media:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      tags: ["React", "Node.js", "GraphQL", "Team Leadership"],
    },
    {
      id: "event-2",
      date: "2022",
      title: "Launched Personal Portfolio",
      description:
        "Designed and developed a personal portfolio website showcasing my projects and skills.",
      category: "project",
      icon: "Star",
      link: "https://morganchen.dev",
      media:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      tags: ["Next.js", "TailwindCSS", "Framer Motion"],
    },
    {
      id: "event-3",
      date: "2021",
      title: "Senior Frontend Developer",
      description:
        "Developed responsive web applications and implemented design systems for enterprise clients.",
      category: "work",
      icon: "Briefcase",
      tags: ["React", "TypeScript", "Design Systems"],
    },
    {
      id: "event-4",
      date: "2020",
      title: "UX Design Certification",
      description:
        "Completed Google's UX Design Professional Certificate, focusing on user research and interaction design.",
      category: "education",
      icon: "GraduationCap",
      tags: ["UX Design", "User Research", "Prototyping"],
    },
    {
      id: "event-5",
      date: "2019",
      title: "Frontend Developer",
      description:
        "Built interactive web applications using React and Redux, improving performance and accessibility.",
      category: "work",
      icon: "Briefcase",
      tags: ["React", "Redux", "Accessibility"],
    },
    {
      id: "event-6",
      date: "2018",
      title: "Open Source Contribution Award",
      description:
        "Recognized for significant contributions to open source projects in the React ecosystem.",
      category: "achievement",
      icon: "Award",
      tags: ["Open Source", "Community Contribution"],
    },
    {
      id: "event-7",
      date: "2017",
      title: "Junior Developer",
      description:
        "Started career as a junior web developer, focusing on HTML, CSS, and JavaScript.",
      category: "work",
      icon: "Briefcase",
      tags: ["HTML", "CSS", "JavaScript"],
    },
    {
      id: "event-8",
      date: "2016",
      title: "Bachelor's Degree in Computer Science",
      description:
        "Graduated with honors, specializing in web technologies and human-computer interaction.",
      category: "education",
      icon: "GraduationCap",
      tags: ["Computer Science", "Web Technologies", "HCI"],
    },
  ],
};

const TimelineItem = ({
  event,
  isActive,
  onClick,
}: {
  event: TimelineEvent;
  isActive: boolean;
  onClick: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Briefcase":
        return <Briefcase className="h-5 w-5" />;
      case "GraduationCap":
        return <GraduationCap className="h-5 w-5" />;
      case "Award":
        return <Award className="h-5 w-5" />;
      case "Star":
        return <Star className="h-5 w-5" />;
      default:
        return <Briefcase className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "work":
        return "bg-blue-500";
      case "education":
        return "bg-green-500";
      case "achievement":
        return "bg-purple-500";
      case "project":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={`relative pb-10 pl-8 before:absolute before:left-0 before:top-0 before:h-full before:w-px before:bg-gray-200 last:pb-0 ${isActive ? "z-10" : "z-0"}`}
    >
      {/* Timeline dot */}
      <div
        className={`absolute left-0 top-0 flex h-8 w-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white transition-all duration-300 ${getCategoryColor(event.category)} ${isActive ? "scale-125" : ""}`}
        onClick={onClick}
      >
        <span className="!text-white">{getIconComponent(event.icon)}</span>
      </div>

      {/* Date */}
      <div className="mb-1 text-sm font-medium text-gray-500">{event.date}</div>

      {/* Content */}
      <div
        className={`transition-all duration-300 ${
          isActive
            ? "rounded-xl border border-gray-100 bg-white p-5 shadow-md"
            : "bg-transparent"
        }`}
      >
        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>

        {/* Description - only show when active */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2"
          >
            <p className="text-gray-600">{event.description}</p>

            {/* Media */}
            {event.media && (
              <div className="mt-4 overflow-hidden rounded-lg">
                <Image
                  src={
                    event.media ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  width={600}
                  height={400}
                  alt={event.title}
                  className="h-auto w-full object-cover"
                />
              </div>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Link */}
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              >
                Learn more <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const CategoryFilter = ({
  categories,
  activeCategory,
  setActiveCategory,
}: {
  categories: { id: string; label: string; color: string }[];
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}) => {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      <button
        onClick={() => setActiveCategory(null)}
        className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
          activeCategory === null
            ? "bg-gray-800 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setActiveCategory(category.id)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            activeCategory === category.id
              ? `${category.color} text-white`
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default function InteractiveTimelineProfile({
  userData = defaultUserData,
}: InteractiveTimelineProfileProps) {
  const [activeEvent, setActiveEvent] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start start", "end end"],
  });

  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const filteredEvents = activeCategory
    ? userData.timeline.filter((event) => event.category === activeCategory)
    : userData.timeline;

  const displayedEvents = isExpanded
    ? filteredEvents
    : filteredEvents.slice(0, 4);

  const categories = [
    { id: "work", label: "Work", color: "bg-blue-600" },
    { id: "education", label: "Education", color: "bg-green-600" },
    { id: "achievement", label: "Achievements", color: "bg-purple-600" },
    { id: "project", label: "Projects", color: "bg-amber-600" },
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "github":
        return <Github className="h-5 w-5" />;
      case "linkedin":
        return <Linkedin className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      default:
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative h-80 w-full overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800">
        <Image
          src={
            userData.coverPhoto ||
            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
          }
          fill
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-8 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6 md:flex-row md:items-end"
          >
            <div className="relative">
              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-xl">
                <Image
                  src={
                    userData.avatar ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  fill
                  alt={userData.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="text-center md:text-left">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-3xl font-bold text-white md:text-4xl"
              >
                {userData.name}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-xl text-gray-200"
              >
                {userData.title}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mt-2 flex items-center justify-center text-sm text-gray-300 md:justify-start"
              >
                <MapPin className="mr-1 h-4 w-4" />
                <span>{userData.location}</span>
              </motion.div>
            </div>

            <div className="mt-4 flex gap-3 md:ml-auto md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900"
              >
                Contact
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm"
              >
                Resume
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            {/* About */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                About
              </h2>
              <p className="leading-relaxed text-gray-600">{userData.bio}</p>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="mr-3 h-5 w-5 text-gray-400" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="mr-3 h-5 w-5 text-gray-400" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ExternalLink className="mr-3 h-5 w-5 text-gray-400" />
                  <span>{userData.website}</span>
                </div>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Social Profiles
              </h2>
              <div className="space-y-3">
                {Object.entries(userData.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={`https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 transition-colors hover:text-indigo-600"
                  >
                    <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                      {getSocialIcon(platform)}
                    </div>
                    <span>{url}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">My Journey</h2>
                <div className="text-sm text-gray-500">Scroll to explore</div>
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />

              <p className="my-2">Click on each icon for more details</p>

              {/* Timeline Progress Bar */}
              <div className="relative mb-8 h-1 w-full rounded-full bg-gray-100">
                <motion.div
                  className="absolute left-0 top-0 h-full origin-left rounded-full bg-indigo-600"
                  style={{ scaleX }}
                />
              </div>

              {/* Timeline Events */}
              <div ref={timelineRef} className="relative">
                {displayedEvents.map((event) => (
                  <TimelineItem
                    key={event.id}
                    event={event}
                    isActive={activeEvent === event.id}
                    onClick={() =>
                      setActiveEvent(activeEvent === event.id ? null : event.id)
                    }
                  />
                ))}

                {/* Show More/Less Button */}
                {filteredEvents.length > 4 && (
                  <div className="mt-8 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      {isExpanded ? (
                        <>
                          Show Less <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show More <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
