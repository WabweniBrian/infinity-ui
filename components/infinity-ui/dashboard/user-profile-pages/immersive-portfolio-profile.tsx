"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Play,
  Pause,
  ChevronDown,
} from "lucide-react";
import Image from "next/image";

export default function ImmersivePortfolioProfile() {
  const [activeSection, setActiveSection] = useState("hero");
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  const profile = {
    name: "Jordan Rivera",
    title: "Creative Director & 3D Artist",
    bio: "I create immersive digital experiences that blend technology and art. My work explores the boundaries between physical and digital realms.",
    location: "Los Angeles, CA",
    featuredWork: {
      title: "NEBULA",
      subtitle: "Interactive 3D Experience",
      description:
        "An immersive journey through a procedurally generated universe. Created with WebGL and Three.js.",
      coverImage:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo4ZwikoHdV8HBnj2sim5N7M41k9TADhtKvdpr",
      videoUrl: "#",
      year: "2023",
      client: "Sony Music",
      role: "Creative Director & 3D Artist",
      link: "#",
    },
    projects: [
      {
        id: 1,
        title: "PRISM",
        category: "Interactive Installation",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo1AU6X9eZzfEpmIkG3Q9nNcdoiOUZFRY8MTyb",
        year: "2022",
      },
      {
        id: 2,
        title: "ECHO",
        category: "AR Experience",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoGNgG5BhOFxW0BEUNidYtMQ9Sya4s1cmfhDkw",
        year: "2022",
      },
      {
        id: 3,
        title: "FLUX",
        category: "Digital Art",
        image:
          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoZgrBlGh2BRxjvs0lePWdUT3JIKoAfbgqLw8z",
        year: "2021",
      },
    ],
    clients: ["Apple", "Nike", "Sony", "Adidas", "Google", "Spotify"],
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoPlaying(!videoPlaying);
    }
  };

  // Handle scroll to sections
  const scrollTo = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(section);
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "featured", "work", "about"];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white">
      {/* Navigation */}
      <nav className="fixed left-0 top-0 z-50 w-full mix-blend-difference">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between">
            <a href="#" className="text-xl font-bold">
              RIVERA
            </a>

            <div className="hidden space-x-8 md:flex">
              {[
                { id: "hero", label: "Home" },
                { id: "featured", label: "Featured" },
                { id: "work", label: "Work" },
                { id: "about", label: "About" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-sm uppercase tracking-widest transition-colors ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button className="text-white md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex h-screen items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ opacity, scale, y }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo4ZwikoHdV8HBnj2sim5N7M41k9TADhtKvdpr"
            alt="Background"
            width={800}
            height={500}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </motion.div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-4 text-5xl font-bold md:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 text-xl text-gray-300 md:text-2xl"
          >
            {profile.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mb-12 max-w-2xl text-gray-400"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={() => scrollTo("featured")}
              className="mx-auto flex items-center text-white transition-colors hover:text-gray-300"
            >
              <span className="mr-2">Explore Work</span>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Work */}
      <section id="featured" className="relative min-h-screen bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="mb-2 text-3xl font-bold">Featured Work</h2>
            <div className="h-px w-24 bg-white"></div>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-4xl font-bold">
                {profile.featuredWork.title}
              </h3>
              <p className="mb-6 text-xl text-gray-400">
                {profile.featuredWork.subtitle}
              </p>
              <p className="mb-8 text-gray-300">
                {profile.featuredWork.description}
              </p>

              <div className="mb-8 grid grid-cols-2 gap-6">
                <div>
                  <p className="mb-1 text-sm text-gray-500">Client</p>
                  <p className="text-white">{profile.featuredWork.client}</p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-gray-500">Year</p>
                  <p className="text-white">{profile.featuredWork.year}</p>
                </div>

                <div>
                  <p className="mb-1 text-sm text-gray-500">Role</p>
                  <p className="text-white">{profile.featuredWork.role}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setShowCaseStudy(true)}
                  className="bg-white px-6 py-3 text-black transition-colors hover:bg-gray-200"
                >
                  View Case Study
                </button>

                <a
                  href={profile.featuredWork.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-white px-6 py-3 text-white transition-colors hover:bg-white/10"
                >
                  Live Project <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-video overflow-hidden bg-gray-900">
                <Image
                  src={
                    profile.featuredWork.coverImage ||
                    "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                  }
                  fill
                  alt={profile.featuredWork.title}
                  className="h-full w-full object-cover"
                />

                <button
                  onClick={toggleVideo}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/50"
                >
                  {videoPlaying ? (
                    <Pause className="h-16 w-16 text-white" />
                  ) : (
                    <Play className="h-16 w-16 text-white" />
                  )}
                </button>

                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover opacity-0"
                  src={profile.featuredWork.videoUrl}
                  playsInline
                  loop
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                ></video>
              </div>
            </div>
          </div>
        </div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {showCaseStudy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/90 p-4"
              onClick={() => setShowCaseStudy(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-gray-800 bg-black p-8"
              >
                <div className="mb-8 flex items-start justify-between">
                  <div>
                    <h2 className="mb-2 text-3xl font-bold">
                      {profile.featuredWork.title}
                    </h2>
                    <p className="text-gray-400">
                      {profile.featuredWork.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowCaseStudy(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-8">
                  <Image
                    src={
                      profile.featuredWork.coverImage ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    width={500}
                    height={300}
                    alt={profile.featuredWork.title}
                    className="h-auto w-full object-cover"
                  />
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="mb-4 text-xl font-bold">Overview</h3>
                    <p className="leading-relaxed text-gray-300">
                      {profile.featuredWork.description} Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit. Nullam in dui mauris.
                      Vivamus hendrerit arcu sed erat molestie vehicula. Sed
                      auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-bold">Challenge</h3>
                    <p className="leading-relaxed text-gray-300">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam in dui mauris. Vivamus hendrerit arcu sed erat
                      molestie vehicula. Sed auctor neque eu tellus rhoncus ut
                      eleifend nibh porttitor.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-bold">Solution</h3>
                    <p className="leading-relaxed text-gray-300">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam in dui mauris. Vivamus hendrerit arcu sed erat
                      molestie vehicula. Sed auctor neque eu tellus rhoncus ut
                      eleifend nibh porttitor.
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-4 text-xl font-bold">Result</h3>
                    <p className="leading-relaxed text-gray-300">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam in dui mauris. Vivamus hendrerit arcu sed erat
                      molestie vehicula. Sed auctor neque eu tellus rhoncus ut
                      eleifend nibh porttitor.
                    </p>
                  </div>
                </div>

                <div className="mt-12">
                  <a
                    href={profile.featuredWork.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white transition-colors hover:text-gray-300"
                  >
                    Visit Live Project <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Other Work */}
      <section id="work" className="min-h-screen bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="mb-2 text-3xl font-bold">Selected Work</h2>
            <div className="h-px w-24 bg-white"></div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {profile.projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group cursor-pointer"
              >
                <div className="relative mb-4 aspect-[4/3] overflow-hidden">
                  <Image
                    src={
                      project.image ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    fill
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <h3 className="mb-1 text-xl font-bold">{project.title}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-gray-400">{project.category}</p>
                  <p className="text-gray-500">{project.year}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-white transition-colors hover:text-gray-300"
            >
              View All Projects <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* About/Contact */}
      <section id="about" className="min-h-screen bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <div>
              <div className="mb-12">
                <h2 className="mb-2 text-3xl font-bold">About</h2>
                <div className="h-px w-24 bg-white"></div>
              </div>

              <p className="mb-8 leading-relaxed text-gray-300">
                I&apos;m a creative director and 3D artist based in{" "}
                {profile.location}. With over 10 years of experience in the
                digital art space, I&apos;ve worked with brands and artists to
                create immersive experiences that push the boundaries of
                technology and art.
              </p>

              <p className="mb-8 leading-relaxed text-gray-300">
                My work explores the intersection of physical and digital
                realms, often incorporating elements of interactivity,
                procedural generation, and real-time rendering.
              </p>

              <p className="mb-12 leading-relaxed text-gray-300">
                When I&apos;m not creating digital art, you can find me
                exploring new technologies, hiking in the mountains, or
                experimenting with analog photography.
              </p>

              <div>
                <h3 className="mb-4 text-xl font-bold">Clients</h3>
                <div className="grid grid-cols-3 gap-4">
                  {profile.clients.map((client, index) => (
                    <div
                      key={index}
                      className="text-gray-400 transition-colors hover:text-white"
                    >
                      {client}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-12">
                <h2 className="mb-2 text-3xl font-bold">Contact</h2>
                <div className="h-px w-24 bg-white"></div>
              </div>

              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm text-gray-400"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border border-gray-800 bg-gray-900 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border border-gray-800 bg-gray-900 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm text-gray-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full border border-gray-800 bg-gray-900 px-4 py-3 text-white transition-colors focus:border-white focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-white px-8 py-3 text-black transition-colors hover:bg-gray-200"
                >
                  Send Message
                </button>
              </form>

              <div className="mt-12">
                <p className="mb-2 text-gray-400">Email</p>
                <p className="mb-6 text-white">hello@jordanrivera.com</p>

                <p className="mb-2 text-gray-400">Location</p>
                <p className="text-white">{profile.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
