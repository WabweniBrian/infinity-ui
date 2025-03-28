"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Edit,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Briefcase,
  Award,
  ChevronDown,
  User,
} from "lucide-react";
import Image from "next/image";

interface UserData {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  joinDate: string;
  bio: string;
  avatar: string;
  coverPhoto: string;
  stats: {
    projects: number;
    followers: number;
    following: number;
  };
  skills: string[];
  experience: {
    title: string;
    company: string;
    period: string;
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
}

interface ModernMinimalistProfileProps {
  userData?: UserData;
}

const defaultUserData: UserData = {
  name: "Alex Morgan",
  role: "Senior Product Designer",
  location: "San Francisco, CA",
  email: "alex.morgan@example.com",
  phone: "+1 (555) 123-4567",
  joinDate: "Joined April 2021",
  bio: "Product designer with 6+ years of experience creating user-centered digital experiences. Passionate about solving complex problems with elegant solutions.",
  avatar:
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=150&width=150",
  coverPhoto:
    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=400&width=1200",
  stats: {
    projects: 48,
    followers: 2453,
    following: 231,
  },
  skills: [
    "UI/UX Design",
    "Prototyping",
    "User Research",
    "Design Systems",
    "Figma",
    "Adobe XD",
    "Sketch",
  ],
  experience: [
    {
      title: "Senior Product Designer",
      company: "Designify",
      period: "2021 - Present",
    },
    {
      title: "Product Designer",
      company: "CreativeMinds",
      period: "2018 - 2021",
    },
    {
      title: "UI Designer",
      company: "WebSolutions",
      period: "2016 - 2018",
    },
  ],
  education: [
    {
      degree: "Master of Design",
      institution: "California Institute of Design",
      period: "2014 - 2016",
    },
    {
      degree: "Bachelor of Arts in Visual Communication",
      institution: "State University",
      period: "2010 - 2014",
    },
  ],
};

export default function ModernMinimalistProfile({
  userData = defaultUserData,
}: ModernMinimalistProfileProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "experience",
  );

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Cover Photo */}
      <div className="relative h-64 w-full overflow-hidden md:h-80">
        <Image
          src={
            userData.coverPhoto ||
            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
          }
          fill
          alt="Cover"
          className="h-full w-full object-cover"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-4 right-4 rounded-full bg-white bg-opacity-80 p-2 backdrop-blur-sm"
        >
          <Camera className="h-5 w-5 text-gray-700" />
        </motion.button>
      </div>

      {/* Profile Header */}
      <div className="relative z-10 mx-auto -mt-20 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="flex flex-col items-start gap-6 p-6 sm:p-8 md:flex-row md:items-end">
            {/* Avatar */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-md"
              >
                <Image
                  src={
                    userData.avatar ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  fill
                  alt={userData.name}
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-1 right-1 rounded-full bg-white p-1.5 shadow-md"
              >
                <Edit className="h-4 w-4 text-gray-700" />
              </motion.button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-2xl font-bold text-gray-900 md:text-3xl"
              >
                {userData.name}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-1 text-gray-600"
              >
                {userData.role}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="mt-2 flex items-center text-sm text-gray-500"
              >
                <MapPin className="mr-1 h-4 w-4" />
                <span>{userData.location}</span>
                <span className="mx-2">•</span>
                <span>{userData.joinDate}</span>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 self-start md:self-end">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Share Profile
              </motion.button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-gray-200">
            <div className="scrollbar-hide flex overflow-x-auto">
              {["overview", "projects", "activity", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-1">
            {/* Contact Info */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
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
                  <Phone className="mr-3 h-5 w-5 text-gray-400" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="mr-3 h-5 w-5 text-gray-400" />
                  <span>{userData.joinDate}</span>
                </div>
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

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Stats
              </h2>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-2xl font-bold text-gray-900"
                  >
                    {userData.stats.projects}
                  </motion.div>
                  <div className="text-sm text-gray-500">Projects</div>
                </div>
                <div>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900"
                  >
                    {userData.stats.followers}
                  </motion.div>
                  <div className="text-sm text-gray-500">Followers</div>
                </div>
                <div>
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-2xl font-bold text-gray-900"
                  >
                    {userData.stats.following}
                  </motion.div>
                  <div className="text-sm text-gray-500">Following</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Bio */}
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

            {/* Experience */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div
                className="flex cursor-pointer items-center justify-between px-6 py-4"
                onClick={() => toggleSection("experience")}
              >
                <div className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Experience
                  </h2>
                </div>
                <motion.div
                  animate={{
                    rotate: expandedSection === "experience" ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </div>

              {expandedSection === "experience" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <div className="space-y-4">
                    {userData.experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-indigo-600"
                      >
                        <h3 className="text-base font-medium text-gray-900">
                          {exp.title}
                        </h3>
                        <p className="text-sm text-gray-600">{exp.company}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {exp.period}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div
                className="flex cursor-pointer items-center justify-between px-6 py-4"
                onClick={() => toggleSection("education")}
              >
                <div className="flex items-center">
                  <Award className="mr-2 h-5 w-5 text-gray-500" />
                  <h2 className="text-lg font-semibold text-gray-900">
                    Education
                  </h2>
                </div>
                <motion.div
                  animate={{
                    rotate: expandedSection === "education" ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </div>

              {expandedSection === "education" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <div className="space-y-4">
                    {userData.education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-indigo-600"
                      >
                        <h3 className="text-base font-medium text-gray-900">
                          {edu.degree}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {edu.institution}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {edu.period}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-xl bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Activity
                </h2>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-start gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                      {index === 0 && (
                        <Award className="h-5 w-5 text-indigo-600" />
                      )}
                      {index === 1 && (
                        <Briefcase className="h-5 w-5 text-indigo-600" />
                      )}
                      {index === 2 && (
                        <User className="h-5 w-5 text-indigo-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-600">
                        {index === 0 &&
                          "Completed the Advanced UX Design certification"}
                        {index === 1 &&
                          "Started a new project: E-commerce Dashboard"}
                        {index === 2 && "Updated profile information"}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {index === 0 && "2 days ago"}
                        {index === 1 && "1 week ago"}
                        {index === 2 && "2 weeks ago"}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
