"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Github,
  Mail,
  ArrowRight,
  User2,
} from "lucide-react";
import Image from "next/image";

const TeamSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Alex has over 15 years of experience in software development and product management. Prior to founding our company, he led engineering teams at Google and Meta.",
      image: "/images/default-avatar.png",
      social: {
        twitter: "alexjohnson",
        linkedin: "alex-johnson",
        github: "alexj",
      },
      color: "from-blue-400 to-sky-400",
    },
    {
      name: "Sarah Chen",
      role: "Chief Design Officer",
      bio: "Sarah is an award-winning designer with a background in human-computer interaction. She's passionate about creating intuitive and beautiful user experiences.",
      image: "/images/default-avatar.png",
      social: {
        twitter: "sarahchen",
        linkedin: "sarah-chen",
        github: "sarahc",
      },
      color: "from-purple-400 to-violet-400",
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO",
      bio: "Marcus brings deep technical expertise in cloud architecture and distributed systems. He previously founded two successful tech startups.",
      image: "/images/default-avatar.png",
      social: {
        twitter: "marcusrz",
        linkedin: "marcus-rodriguez",
        github: "marcusr",
      },
      color: "from-emerald-400 to-teal-400",
    },
    {
      name: "Amina Patel",
      role: "VP of Marketing",
      bio: "Amina has led successful marketing campaigns for Fortune 500 companies. Her data-driven approach has consistently delivered exceptional growth.",
      image: "/images/default-avatar.png",
      social: {
        twitter: "aminapatel",
        linkedin: "amina-patel",
        github: "aminap",
      },
      color: "from-amber-400 to-orange-400",
    },
  ];

  const values = [
    {
      title: "Innovation",
      description:
        "We constantly push boundaries and explore new ideas to create exceptional products.",
      icon: "✨",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    },
    {
      title: "Simplicity",
      description:
        "We believe in elegance through simplicity, making powerful tools accessible to everyone.",
      icon: "🔍",
      color:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
    },
    {
      title: "Transparency",
      description:
        "We build trust through open communication with our team and customers.",
      icon: "🔎",
      color:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Customer Focus",
      description:
        "Our customers' success is our success. We listen, learn, and adapt to their needs.",
      icon: "❤️",
      color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-white py-24 dark:bg-gray-950"
    >
      {/* Abstract Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <svg
          className="absolute left-0 top-0 h-full w-full opacity-30 dark:opacity-10"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="dots-pattern"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="0.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="url(#dots-pattern)"
          />
        </svg>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 0.3, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-10 top-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-blue-300/20 to-sky-300/20 blur-3xl dark:from-blue-900/10 dark:to-sky-900/10"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 0.3, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-1/4 right-10 h-64 w-64 rounded-full bg-gradient-to-tr from-purple-300/20 to-violet-300/20 blur-3xl dark:from-purple-900/10 dark:to-violet-900/10"
        ></motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 py-1 text-sm font-medium text-blue-600 dark:from-blue-500/20 dark:to-purple-500/20 dark:text-blue-400">
            Our Team
          </span>
          <h2 className="mb-4 text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
            Meet the people behind the product
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            We&apos;re a passionate team of experts dedicated to creating
            exceptional experiences.
          </p>
        </motion.div>

        <div className="mb-24 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 -rotate-2 transform rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl"></div>
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
              <div className="relative z-10 grid grid-cols-2">
                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <span className="font-medium text-blue-600 dark:text-blue-400">
                      Our Story
                    </span>
                    <h3 className="mb-4 mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                      Founded with a vision
                    </h3>
                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                      Started in 2018, we set out to transform how people
                      interact with technology. Our founders were frustrated
                      with the complexity of existing solutions and believed
                      there had to be a better way.
                    </p>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center">
                      <div className="h-1 w-12 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                      <div className="ml-3">
                        <span className="block text-xl font-bold text-gray-900 dark:text-white">
                          2018
                        </span>
                        <span className="block text-sm text-gray-600 dark:text-gray-400">
                          Company founded
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-1 w-12 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                      <div className="ml-3">
                        <span className="block text-xl font-bold text-gray-900 dark:text-white">
                          $32M
                        </span>
                        <span className="block text-sm text-gray-600 dark:text-gray-400">
                          Funding raised
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="h-1 w-12 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                      <div className="ml-3">
                        <span className="block text-xl font-bold text-gray-900 dark:text-white">
                          48
                        </span>
                        <span className="block text-sm text-gray-600 dark:text-gray-400">
                          Team members
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 mix-blend-multiply"></div>
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage:
                        "url('/placeholder.svg?height=600&width=400')",
                    }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  <div className="relative flex h-full items-end p-6 md:p-8">
                    <div>
                      <blockquote className="mb-4 text-lg font-medium italic text-white">
                        &quot;We&apos;re on a mission to make technology more
                        human.&quot;
                      </blockquote>
                      <div className="flex items-center">
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                          <User2 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            Alex Johnson
                          </div>
                          <div className="text-sm text-white/80">
                            Founder & CEO
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Our mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We&apos;re on a mission to empower creators and businesses with
                intuitive tools that unlock their full potential. We believe
                technology should serve people, not the other way around.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Our values
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
                  >
                    <div
                      className={`h-10 w-10 rounded-lg ${value.color} mb-3 flex items-center justify-center text-lg`}
                    >
                      {value.icon}
                    </div>
                    <h4 className="mb-1 text-lg font-bold text-gray-900 dark:text-white">
                      {value.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <button className="flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-purple-700">
                Learn more about our story
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>

        <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 dark:text-white">
          Leadership team
        </h3>
        <div className="mb-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative"
              onMouseEnter={() => setActiveTeamMember(index)}
              onMouseLeave={() => setActiveTeamMember(null)}
            >
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${member.color} opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100`}
              ></div>
              <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg transition-colors group-hover:border-transparent dark:border-gray-700 dark:bg-gray-800">
                <div className="relative h-64 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 transition-opacity duration-300 group-hover:opacity-20`}
                  ></div>
                  <Image
                    src={member.image || "/images/default-avatar.png"}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="w-full p-4">
                      <div className="flex justify-center space-x-3">
                        {Object.entries(member.social).map(
                          ([platform, username], i) => {
                            const Icon =
                              platform === "twitter"
                                ? Twitter
                                : platform === "linkedin"
                                  ? Linkedin
                                  : platform === "github"
                                    ? Github
                                    : Mail;

                            return (
                              <a
                                key={i}
                                href={`https://${platform}.com/${username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
                              >
                                <Icon className="h-4 w-4" />
                              </a>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 text-center">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    {member.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {member.role}
                  </p>

                  <AnimatePresence>
                    {activeTeamMember === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 overflow-hidden text-sm text-gray-600 dark:text-gray-300"
                      >
                        <p>{member.bio}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl"></div>
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <h3 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
                  Join our team
                </h3>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  We&apos;re always looking for talented individuals to join our
                  growing team. If you&apos;re passionate about innovation and
                  making a difference, we&apos;d love to hear from you.
                </p>

                <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50">
                    <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                      Flexible work
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Remote-first culture with flexible hours
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50">
                    <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                      Great benefits
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Comprehensive health coverage and equity
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50">
                    <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                      Learning budget
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      $1,500 annually for courses and conferences
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700/50">
                    <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
                      Team events
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Regular retreats and virtual social events
                    </p>
                  </div>
                </div>

                <button className="flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white shadow-lg shadow-blue-500/20 hover:from-blue-700 hover:to-purple-700">
                  View open positions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>

              <div className="relative h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url('/placeholder.svg?height=600&width=800')",
                  }}
                ></div>

                <div className="relative flex h-full items-center justify-center p-8">
                  <div className="max-w-sm rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
                    <blockquote className="mb-6 text-lg font-medium italic text-white">
                      &quot;Joining this team was the best career decision
                      I&apos;ve made. The culture of innovation and support is
                      unmatched.&quot;
                    </blockquote>
                    <div className="flex items-center">
                      <div className="mr-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                        <User2 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          Emily Zhang
                        </div>
                        <div className="text-sm text-white/80">
                          Senior Developer, joined 2020
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
