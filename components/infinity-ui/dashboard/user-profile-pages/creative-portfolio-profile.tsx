"use client";

import { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Instagram,
  Twitter,
  Dribbble,
  Linkedin,
  Mail,
  MapPin,
  ExternalLink,
  Heart,
  Download,
  ArrowRight,
  Menu,
  X,
  ChevronDown,
  Share2,
} from "lucide-react";
import Image from "next/image";

export default function CreativePortfolioProfile() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const user = {
    name: "Olivia Martinez",
    title: "Visual Designer & Illustrator",
    location: "Barcelona, Spain",
    email: "olivia@example.com",
    bio: "I create colorful, playful designs that bring joy and solve problems. With over 7 years of experience in branding, illustration, and UI design, I help brands tell their stories through visuals that connect.",
    avatar:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    cover:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp?height=600&width=1200",
    social: [
      { name: "Instagram", icon: Instagram, url: "#" },
      { name: "Twitter", icon: Twitter, url: "#" },
      { name: "Dribbble", icon: Dribbble, url: "#" },
      { name: "LinkedIn", icon: Linkedin, url: "#" },
    ],
    stats: [
      { label: "Projects", value: "120+" },
      { label: "Clients", value: "48" },
      { label: "Experience", value: "7 years" },
      { label: "Awards", value: "12" },
    ],
    skills: [
      { name: "Illustration", level: 95 },
      { name: "Brand Design", level: 90 },
      { name: "UI/UX Design", level: 85 },
      { name: "Animation", level: 80 },
      { name: "Typography", level: 92 },
    ],
    projects: [
      {
        id: 1,
        title: "Botanical App Illustrations",
        category: "Illustration",
        description:
          "A series of botanical illustrations for a plant identification app, featuring detailed hand-drawn elements with digital coloring.",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp&text=🌿",
        color: "from-green-300 to-emerald-500",
      },
      {
        id: 2,
        title: "Neon Dreams Brand Identity",
        category: "Branding",
        description:
          "Complete brand identity for an electronic music festival, including logo design, typography system, and promotional materials.",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp&text=✨",
        color: "from-purple-300 to-pink-500",
      },
      {
        id: 3,
        title: "Culinary Journey UI Design",
        category: "UI Design",
        description:
          "User interface design for a cooking app that guides users through recipes with interactive elements and playful animations.",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp&text=🍳",
        color: "from-orange-300 to-red-500",
      },
      {
        id: 4,
        title: "Ocean Conservation Campaign",
        category: "Illustration & Branding",
        description:
          "Visual identity and illustration series for a non-profit organization focused on ocean conservation and education.",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp&text=🌊",
        color: "from-blue-300 to-cyan-500",
      },
    ],
    testimonials: [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "Marketing Director",
        company: "Bloom Brands",
        content:
          "Olivia's illustrations brought our brand to life in ways we never imagined. Her work has become central to our identity and resonates deeply with our audience.",
        avatar:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo&text=SJ",
      },
      {
        id: 2,
        name: "Miguel Fernandez",
        role: "Product Lead",
        company: "Culinary App",
        content:
          "Working with Olivia was a dream. She understood our vision immediately and transformed our app with illustrations that are both beautiful and functional.",
        avatar:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo&text=MF",
      },
      {
        id: 3,
        name: "Emma Chen",
        role: "Founder",
        company: "Ocean Blue Foundation",
        content:
          "Olivia's passion for our cause shines through in every illustration. Her work has helped us communicate complex environmental issues in an accessible way.",
        avatar:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo&text=EC",
      },
    ],
  };

  const sections = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900" ref={containerRef}>
      {/* Background Image with Parallax */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-5">
        <motion.div
          className="h-[150%] w-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            y: backgroundY,
          }}
        />
      </div>

      {/* Navigation */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white bg-opacity-90 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent">
              {user.name.split(" ")[0]}
            </div>

            <nav className="hidden space-x-8 md:flex">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`relative text-sm font-medium transition-colors ${
                    activeSection === section.id
                      ? "text-purple-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {section.label}
                  {activeSection === section.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600"
                      layoutId="activeSection"
                    />
                  )}
                </button>
              ))}
            </nav>

            <div className="hidden space-x-4 md:flex">
              {user.social.map((platform) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  className="text-gray-500 hover:text-gray-900"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <platform.icon size={18} />
                </motion.a>
              ))}
            </div>

            <button
              className="text-gray-500 md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-white p-4"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent">
                {user.name.split(" ")[0]}
              </div>
              <button
                className="text-gray-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col space-y-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-lg font-medium transition-colors ${
                    activeSection === section.id
                      ? "text-purple-600"
                      : "text-gray-600"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>

            <div className="mt-auto flex justify-center space-x-6 border-t border-gray-100 pt-6">
              {user.social.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  className="text-gray-500 hover:text-gray-900"
                >
                  <platform.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-16">
        {/* Hero Section */}
        <section className="relative flex h-[80vh] min-h-[600px] items-center">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={
                user.cover ||
                "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
              }
              alt="Cover"
              fill
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-pink-900/70 mix-blend-multiply" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 text-white sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
                Hello, I&apos;m {user.name}
              </h1>
              <h2 className="mb-6 max-w-2xl text-xl font-light sm:text-2xl md:text-3xl">
                {user.title}
              </h2>
              <p className="mb-8 max-w-xl text-lg text-white/90">{user.bio}</p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  className="flex items-center rounded-full bg-white px-6 py-3 font-medium text-purple-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work
                  <ArrowRight size={18} className="ml-2" />
                </motion.button>
                <motion.button
                  className="flex items-center rounded-full border border-white bg-transparent px-6 py-3 font-medium text-white"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download Resume
                  <Download size={18} className="ml-2" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 transform text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            >
              <ChevronDown size={24} />
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              className="flex flex-col items-center gap-12 md:flex-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute -left-4 -top-4 h-full w-full rounded-2xl border-2 border-purple-200" />
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src={
                        user.avatar ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                      }
                      alt={user.name}
                      width={500}
                      height={500}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                  <motion.div
                    className="absolute -bottom-6 -right-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <p className="font-medium">Available for freelance work</p>
                  </motion.div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <h2 className="mb-6 text-3xl font-bold">About Me</h2>
                <p className="mb-8 text-lg text-gray-600">
                  I&apos;m a visual designer and illustrator based in Barcelona,
                  with a passion for creating playful, colorful designs that
                  bring joy and solve problems. My work spans branding,
                  illustration, and UI design, always with a focus on
                  storytelling and user experience.
                </p>
                <p className="mb-8 text-lg text-gray-600">
                  After studying design in Madrid and working with agencies in
                  London, I returned to Spain to focus on freelance work with
                  clients around the world. My approach combines traditional
                  illustration techniques with digital tools to create unique
                  visual experiences.
                </p>

                <div className="mb-8 flex flex-wrap gap-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin size={18} className="mr-2 text-purple-600" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Mail size={18} className="mr-2 text-purple-600" />
                    <span>{user.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {user.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="mb-1 text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-12 text-center text-3xl font-bold">
                My Skills
              </h2>

              <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <div>
                  {user.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      className="mb-8"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="mb-2 flex justify-between">
                        <h3 className="font-medium">{skill.name}</h3>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2, duration: 1 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="rounded-2xl bg-white p-8 shadow-sm">
                  <h3 className="mb-6 text-xl font-bold">Design Tools I Use</h3>

                  <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                    {[
                      {
                        name: "Figma",
                        icon: "🎨",
                        color: "bg-purple-100 text-purple-600",
                      },
                      {
                        name: "Adobe Illustrator",
                        icon: "✏️",
                        color: "bg-orange-100 text-orange-600",
                      },
                      {
                        name: "Procreate",
                        icon: "🖌️",
                        color: "bg-blue-100 text-blue-600",
                      },
                      {
                        name: "Adobe Photoshop",
                        icon: "📷",
                        color: "bg-blue-100 text-blue-600",
                      },
                      {
                        name: "After Effects",
                        icon: "✨",
                        color: "bg-indigo-100 text-indigo-600",
                      },
                      {
                        name: "Blender",
                        icon: "🧊",
                        color: "bg-orange-100 text-orange-600",
                      },
                    ].map((tool) => (
                      <motion.div
                        key={tool.name}
                        className={`${tool.color} flex flex-col items-center rounded-xl p-4 text-center`}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <span className="mb-2 text-2xl">{tool.icon}</span>
                        <span className="text-sm font-medium">{tool.name}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-gray-100 pt-8">
                    <h3 className="mb-4 text-xl font-bold">Languages</h3>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { name: "English", level: "Fluent" },
                        { name: "Spanish", level: "Native" },
                        { name: "Catalan", level: "Native" },
                        { name: "French", level: "Intermediate" },
                      ].map((language) => (
                        <div
                          key={language.name}
                          className="rounded-full bg-gray-100 px-4 py-2 text-sm"
                        >
                          <span className="font-medium">{language.name}</span>
                          <span className="ml-1 text-gray-500">
                            ({language.level})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-12 text-center text-3xl font-bold">
                Featured Projects
              </h2>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {user.projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="relative mb-4 overflow-hidden rounded-2xl">
                      <div className="aspect-w-4 aspect-h-3 relative">
                        <Image
                          src={
                            project.image ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          fill
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="w-full p-6">
                          <p className="font-medium text-white">
                            {project.category}
                          </p>
                          <h3 className="text-xl font-bold text-white">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-medium text-purple-600">
                        {project.category}
                      </p>
                      <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-purple-600">
                        {project.title}
                      </h3>
                      <p className="line-clamp-2 text-gray-600">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <motion.button
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Projects
                  <ArrowRight size={18} className="ml-2" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-12 text-center text-3xl font-bold">
                Client Testimonials
              </h2>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {user.testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="relative rounded-2xl bg-white p-6 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    <div className="absolute -top-6 left-6">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border-4 border-white">
                        <Image
                          src={
                            testimonial.avatar ||
                            "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                          }
                          fill
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="pt-6">
                      <p className="mb-6 text-gray-600">
                        &quot;{testimonial.content}&quot;
                      </p>
                      <div>
                        <p className="font-bold">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-12 md:flex-row"
            >
              <div className="w-full md:w-1/2">
                <h2 className="mb-6 text-3xl font-bold">Get In Touch</h2>
                <p className="mb-8 text-gray-600">
                  I&apos;m always open to discussing new projects, creative
                  ideas or opportunities to be part of your vision.
                </p>

                <div className="mb-8 space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                      <Mail size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-purple-100">
                      <MapPin size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="text-gray-600">{user.location}</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  {user.social.map((platform) => (
                    <motion.a
                      key={platform.name}
                      href={platform.url}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-purple-100 hover:text-purple-600"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <platform.icon size={18} />
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-600"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-600"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-600"
                      placeholder="Subject"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-purple-600"
                      placeholder="Your message"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-medium text-white"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-6 md:mb-0">
              <div className="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-2xl font-bold text-transparent">
                {user.name}
              </div>
              <p className="text-gray-400">{user.title}</p>
            </div>

            <div className="flex space-x-6">
              {user.social.map((platform) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  className="text-gray-400 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <platform.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {user.name}. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Privacy Policy
              </a>
              <span className="mx-2 text-gray-600">•</span>
              <a href="#" className="text-sm text-gray-400 hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="max-h-[90vh] w-full max-w-4xl overflow-hidden overflow-y-auto rounded-2xl bg-white"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {user.projects
                .filter((p) => p.id === selectedProject)
                .map((project) => (
                  <div key={project.id}>
                    <div className="relative h-64 w-full sm:h-80">
                      <Image
                        src={
                          project.image ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        fill
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
                        <div className="w-full p-6">
                          <p className="mb-2 font-medium text-white">
                            {project.category}
                          </p>
                          <h3 className="text-2xl font-bold text-white">
                            {project.title}
                          </h3>
                        </div>
                      </div>
                      <button
                        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white"
                        onClick={() => setSelectedProject(null)}
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="p-6">
                      <p className="mb-6 text-gray-600">
                        {project.description}
                      </p>
                      <div className="mb-6 flex flex-wrap gap-3">
                        {[
                          "UI Design",
                          "Illustration",
                          "Branding",
                          "Animation",
                        ].map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full px-3 py-1 text-sm ${
                              project.category.includes(tag)
                                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-4">
                          <motion.button
                            className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Heart size={18} />
                          </motion.button>
                          <motion.button
                            className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Share2 size={18} />
                          </motion.button>
                        </div>
                        <motion.a
                          href="#"
                          className="flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 font-medium text-white"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Project
                          <ExternalLink size={16} className="ml-2" />
                        </motion.a>
                      </div>
                    </div>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
