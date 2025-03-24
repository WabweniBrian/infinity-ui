"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Eye,
  Layers,
  MessageSquare,
  MousePointer,
  Play,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const CreativeAgencyHero = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [activeProject, setActiveProject] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Portfolio projects data
  const projects = [
    {
      title: "Vibrant Motion",
      category: "Animation",
      client: "Pulse Media",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoTHVquXxINGL43Bmkhwazp7exFWUt06ZryRuJ",
    },
    {
      title: "Neon Dreams",
      category: "Brand Identity",
      client: "Synthwave Records",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoDZz9cM2OeWJqXBEQTpvwrsimgD836Ro5tMP4",
    },
    {
      title: "Minimal Workspace",
      category: "Web Design",
      client: "Modern Office Co.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo0viAEqC9zrNPR6UdE5o7kGZB2XgxhFWYS4cu",
    },
  ];

  // Start animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Text animation variants
  const letterVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  // Split text for animation
  const titleText = "We craft digital experiences";
  const titleLetters = titleText.split("");

  // Autoplay project carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length]);

  return (
    <div
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-black py-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.3),rgba(0,0,0,1))]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient accents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5 }}
          className="absolute -left-20 top-20 h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[100px]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute -bottom-20 right-20 h-[250px] w-[250px] rounded-full bg-blue-500/20 blur-[100px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid items-center gap-12 lg:grid-cols-2"
        >
          {/* Left Content */}
          <div>
            <motion.div
              variants={itemVariants}
              className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md"
            >
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-purple-500"></span>
              Award-Winning Creative Agency
            </motion.div>

            {/* Animated title */}
            <div className="mb-6 overflow-hidden">
              <motion.h1 className="flex flex-wrap text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                {titleLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    custom={index}
                    variants={letterVariants}
                    initial="hidden"
                    animate={controls}
                    className={letter === " " ? "mr-4" : ""}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-lg text-lg text-gray-300"
            >
              We blend strategy, design, and technology to create memorable
              digital experiences that drive results for forward-thinking
              brands.
            </motion.p>

            {/* Services */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="mb-4 text-sm font-medium text-white/70">
                Our Services
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { icon: Layers, name: "Branding" },
                  { icon: Eye, name: "UI/UX Design" },
                  { icon: Play, name: "Motion" },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all"
                  >
                    <service.icon className="mb-2 h-5 w-5 text-purple-400" />
                    <div className="text-sm font-medium text-white">
                      {service.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black transition-all hover:bg-gray-100"
              >
                View Our Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                className="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-purple-500">
                  <Play className="h-3 w-3 fill-white text-white" />

                  {/* Ripple Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-purple-400"
                    animate={
                      isHovering
                        ? {
                            scale: [1, 1.5],
                            opacity: [1, 0],
                          }
                        : {}
                    }
                    transition={{
                      repeat: isHovering ? Number.POSITIVE_INFINITY : 0,
                      duration: 1.5,
                    }}
                  />
                </div>
                Showreel
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - Portfolio Showcase */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative mx-auto h-[500px] max-w-md"
            >
              {/* Project cards */}
              <div className="relative h-full">
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{
                      opacity: activeProject === index ? 1 : 0.3,
                      x: 0,
                      rotateY: activeProject === index ? 0 : 5,
                      scale: activeProject === index ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setActiveProject(index)}
                    className={`absolute left-0 top-0 h-full w-full cursor-pointer rounded-2xl bg-gray-900 transition-all ${
                      activeProject === index ? "z-30" : "z-10"
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `perspective(1000px) rotateY(${activeProject === index ? 0 : 5}deg) scale(${activeProject === index ? 1 : 0.9})`,
                    }}
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      <Image
                        src={project.image || "/default-image.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-700 hover:scale-105"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 z-10 w-full p-6">
                        <div className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {project.category}
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-white">
                          {project.title}
                        </h3>
                        <p className="mb-4 text-sm text-white/70">
                          Client: {project.client}
                        </p>

                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20">
                            View Project
                            <ChevronRight className="h-3 w-3" />
                          </button>

                          <div className="flex items-center gap-3 text-xs text-white/70">
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              2.4k
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              18
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Project navigation */}
              <div className="absolute -bottom-12 left-1/2 z-10 flex -translate-x-1/2 gap-3">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveProject(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeProject === index
                        ? "w-8 bg-purple-500"
                        : "w-2 bg-white/30"
                    }`}
                    aria-label={`View project ${index + 1}`}
                  />
                ))}
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -left-16 top-10 z-40 rounded-lg bg-white/10 p-3 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/30 text-purple-400">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-white">
                    <div className="font-medium">Design Process</div>
                    <div className="text-white/70">
                      Strategy → Design → Develop
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4, type: "spring" }}
                className="absolute -right-10 bottom-20 z-40 rounded-lg bg-white/10 p-3 backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/30 text-blue-400">
                    <MousePointer className="h-4 w-4" />
                  </div>
                  <div className="text-xs text-white">
                    <div className="font-medium">Interactive</div>
                    <div className="text-white/70">Explore our portfolio</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-sm text-white/50"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <div>Scroll to explore</div>
          <ArrowRight className="mx-auto mt-2 h-4 w-4 rotate-90" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreativeAgencyHero;
