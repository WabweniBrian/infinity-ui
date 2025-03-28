"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import Image from "next/image";

export default function MinimalPortfolioProfile() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("work");

  const profile = {
    name: "Alex Morgan",
    title: "Product Designer",
    location: "San Francisco, CA",
    bio: "I create thoughtful digital experiences that balance form and function. My approach combines minimalist aesthetics with user-centered design principles.",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    skills: [
      "UI Design",
      "UX Research",
      "Design Systems",
      "Prototyping",
      "Figma",
      "Typography",
    ],
    experience: [
      {
        company: "Designo Studio",
        role: "Senior Product Designer",
        period: "2021 - Present",
        description:
          "Leading design for enterprise SaaS products. Created a comprehensive design system that improved design consistency and development speed by 40%.",
      },
      {
        company: "Minimal Inc",
        role: "UI/UX Designer",
        period: "2018 - 2021",
        description:
          "Designed user interfaces for mobile applications with a focus on accessibility and clean aesthetics.",
      },
      {
        company: "CreativeFlow",
        role: "Junior Designer",
        period: "2016 - 2018",
        description:
          "Collaborated with the marketing team to create visual assets for digital campaigns.",
      },
    ],
  };

  const projects = [
    {
      id: 1,
      title: "Finance Dashboard",
      category: "UI Design",
      description:
        "A minimalist finance tracking dashboard with intuitive data visualization and clean typography.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      year: "2023",
      tags: ["Dashboard", "Data Visualization", "Fintech"],
      link: "#",
    },
    {
      id: 2,
      title: "Wellness App",
      category: "Mobile App",
      description:
        "A meditation and wellness app designed with a focus on calm aesthetics and seamless user experience.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      year: "2022",
      tags: ["Mobile", "Health", "Wellness"],
      link: "#",
    },
    {
      id: 3,
      title: "E-commerce Redesign",
      category: "Web Design",
      description:
        "Complete redesign of an e-commerce platform focusing on conversion optimization and visual hierarchy.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      year: "2022",
      tags: ["E-commerce", "Web", "Conversion"],
      link: "#",
    },
    {
      id: 4,
      title: "Design System",
      category: "Design Systems",
      description:
        "A comprehensive design system created for a large enterprise SaaS platform with over 200 components.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
      year: "2021",
      tags: ["Design System", "Components", "Documentation"],
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-12 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex flex-col items-start gap-10 md:flex-row">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-square w-full max-w-[280px] overflow-hidden">
                <Image
                  src={
                    profile.avatar ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  fill
                  alt={profile.name}
                  className="h-full w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
              </div>
            </div>

            <div className="w-full md:w-2/3">
              <h1 className="mb-2 text-4xl font-light tracking-tight">
                {profile.name}
              </h1>
              <p className="mb-6 text-xl text-gray-500">{profile.title}</p>
              <p className="mb-8 max-w-lg leading-relaxed text-gray-600">
                {profile.bio}
              </p>

              <div className="mb-8 flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-gray-900"
                >
                  <Mail className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-gray-900"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-gray-900"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 transition-colors hover:text-gray-900"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-12 border-b border-gray-200">
          <div className="flex space-x-8">
            {["work", "experience", "contact"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "work" && (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onClick={() => setActiveProject(project.id)}
                    className="group cursor-pointer"
                  >
                    <div className="mb-4 overflow-hidden">
                      <Image
                        src={
                          project.image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        width={250}
                        height={250}
                        alt={project.title}
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{project.title}</h3>
                        <p className="text-sm text-gray-500">
                          {project.category}
                        </p>
                      </div>
                      <span className="text-sm text-gray-400">
                        {project.year}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Project modal */}
              <AnimatePresence>
                {activeProject && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-white/90 p-4 backdrop-blur-sm"
                    onClick={() => setActiveProject(null)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 300,
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className="max-h-[90vh] w-full max-w-4xl overflow-y-auto bg-white p-8 shadow-lg"
                    >
                      {(() => {
                        const project = projects.find(
                          (p) => p.id === activeProject,
                        );
                        if (!project) return null;

                        return (
                          <>
                            <div className="mb-6 flex items-start justify-between">
                              <div>
                                <h2 className="text-2xl font-light">
                                  {project.title}
                                </h2>
                                <p className="text-gray-500">
                                  {project.category} · {project.year}
                                </p>
                              </div>
                              <button
                                onClick={() => setActiveProject(null)}
                                className="text-gray-400 hover:text-gray-900"
                              >
                                ✕
                              </button>
                            </div>

                            <div className="mb-8">
                              <Image
                                src={
                                  project.image ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                }
                                width={600}
                                height={400}
                                alt={project.title}
                                className="h-auto w-full object-cover"
                              />
                            </div>

                            <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
                              <div className="md:col-span-2">
                                <h3 className="mb-3 text-lg font-medium">
                                  Overview
                                </h3>
                                <p className="mb-4 leading-relaxed text-gray-600">
                                  {project.description}
                                </p>
                                <p className="leading-relaxed text-gray-600">
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Nullam in dui mauris. Vivamus
                                  hendrerit arcu sed erat molestie vehicula. Sed
                                  auctor neque eu tellus rhoncus ut eleifend
                                  nibh porttitor.
                                </p>
                              </div>

                              <div>
                                <h3 className="mb-3 text-lg font-medium">
                                  Details
                                </h3>
                                <div className="space-y-4">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Category
                                    </p>
                                    <p className="text-gray-900">
                                      {project.category}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Year
                                    </p>
                                    <p className="text-gray-900">
                                      {project.year}
                                    </p>
                                  </div>

                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Tags
                                    </p>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                      {project.tags.map((tag, index) => (
                                        <span
                                          key={index}
                                          className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                        >
                                          {tag}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 font-medium text-gray-900 hover:text-gray-700"
                            >
                              View Project <ExternalLink className="h-4 w-4" />
                            </a>
                          </>
                        );
                      })()}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === "experience" && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-12">
                {profile.experience.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="grid grid-cols-1 gap-6 md:grid-cols-3"
                  >
                    <div>
                      <p className="text-gray-500">{job.period}</p>
                    </div>

                    <div className="md:col-span-2">
                      <h3 className="mb-1 text-xl font-medium">{job.role}</h3>
                      <p className="mb-4 text-gray-500">{job.company}</p>
                      <p className="leading-relaxed text-gray-600">
                        {job.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-16">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 font-medium text-gray-900 hover:text-gray-700"
                >
                  Download Resume <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-12 md:grid-cols-2"
            >
              <div>
                <h2 className="mb-6 text-2xl font-light">Get in touch</h2>
                <p className="mb-8 leading-relaxed text-gray-600">
                  I&apos;m always open to discussing new projects, creative
                  ideas or opportunities to be part of your vision.
                </p>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900">hello@alexmorgan.design</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-900">{profile.location}</p>
                  </div>

                  <div className="pt-4">
                    <div className="flex gap-4">
                      <a
                        href="#"
                        className="text-gray-400 transition-colors hover:text-gray-900"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 transition-colors hover:text-gray-900"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 transition-colors hover:text-gray-900"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="text-gray-400 transition-colors hover:text-gray-900"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm text-gray-500"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-200 px-4 py-2 transition-colors focus:border-gray-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm text-gray-500"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-200 px-4 py-2 transition-colors focus:border-gray-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block text-sm text-gray-500"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full border border-gray-200 px-4 py-2 transition-colors focus:border-gray-900 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-gray-900 px-6 py-3 text-white transition-colors hover:bg-gray-800"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
