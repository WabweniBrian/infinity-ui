"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Paintbrush,
  Code,
  Megaphone,
  Lightbulb,
  ArrowRight,
  Play,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const CreativeAgencySection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeWork, setActiveWork] = useState(0);

  const works = [
    {
      title: "Brand Evolution",
      client: "TechVision Inc.",
      category: "Branding",
      description: "Complete brand transformation for a leading tech company.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypob8Yulpb6XOcg8LNn4eZBWfSyo09T2xi75KMJ",
      stats: {
        increase: "+156%",
        engagement: "2.4M",
        awards: 3,
      },
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Digital Experience",
      client: "EcoSmart",
      category: "Web Design",
      description: "Immersive e-commerce platform for sustainable products.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoV69nUeuJprS62IlXgenFT9i4m3NRbk5yCzYV",
      stats: {
        increase: "+89%",
        engagement: "1.8M",
        awards: 2,
      },
      color: "from-violet-500 to-purple-500",
    },
    {
      title: "Growth Campaign",
      client: "FitLife",
      category: "Marketing",
      description: "Viral marketing campaign for fitness app launch.",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoU8znOFoA947ETyM0KGYhZL6VrnjqdJgelUkc",
      stats: {
        increase: "+243%",
        engagement: "3.2M",
        awards: 4,
      },
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const services = [
    {
      icon: Paintbrush,
      title: "Brand Design",
      description: "Crafting unique brand identities that stand out",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Code,
      title: "Development",
      description: "Building cutting-edge digital experiences",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Megaphone,
      title: "Marketing",
      description: "Growing brands through strategic campaigns",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lightbulb,
      title: "Strategy",
      description: "Developing winning digital strategies",
      color: "from-amber-500 to-orange-500",
    },
  ];

  //Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWork((prev) => (prev + 1) % works.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [works.length]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24"
    >
      {/* Creative Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20 mix-blend-overlay" />
          <div className="absolute inset-0 backdrop-blur-3xl" />
        </div>

        {/* Animated Lines */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              top: `${25 + i * 25}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}

        {/* Floating Elements */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mb-20 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -left-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-3xl"
              />

              <div className="relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "auto" } : { width: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-4 inline-block overflow-hidden"
                >
                  <span className="inline-block whitespace-nowrap rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-3 py-1 text-sm font-medium text-pink-400">
                    Award-Winning Agency
                  </span>
                </motion.div>

                <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl">
                  We create
                  <br />
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    digital magic
                  </span>
                </h2>

                <p className="mb-8 max-w-lg text-xl text-gray-400">
                  Transform your brand with our innovative design solutions. We
                  blend creativity with strategy to deliver exceptional results.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button className="inline-flex items-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 font-medium text-white shadow-lg shadow-pink-500/25 hover:from-pink-600 hover:to-purple-600">
                    Start Project
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                  <button className="inline-flex items-center rounded-xl bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm hover:bg-white/20">
                    <Play className="mr-2 h-5 w-5" />
                    Show Reel
                  </button>
                </div>

                <div className="mt-12 grid grid-cols-3 gap-6">
                  {[
                    { number: "150+", label: "Happy Clients" },
                    { number: "10+", label: "Years Experience" },
                    { number: "85+", label: "Team Members" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                      }
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm"
                    >
                      <div className="mb-1 text-3xl font-bold text-white">
                        {stat.number}
                      </div>
                      <div className="text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 rotate-2 transform rounded-3xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-xl"></div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <div className="p-6">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">
                    Featured Work
                  </h3>
                  <div className="flex gap-2">
                    {works.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveWork(index)}
                        className={`h-2.5 w-2.5 rounded-full transition-colors ${
                          activeWork === index ? "bg-pink-500" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeWork}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <div className="relative mb-6 aspect-video overflow-hidden rounded-xl">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${works[activeWork].color} opacity-20 mix-blend-overlay`}
                      ></div>
                      <Image
                        src={works[activeWork].image || "/default-image.jpg"}
                        alt={works[activeWork].title}
                        fill
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="mb-2 text-sm text-pink-400">
                              {works[activeWork].category}
                            </div>
                            <h4 className="mb-1 text-xl font-bold text-white">
                              {works[activeWork].title}
                            </h4>
                            <div className="text-sm text-gray-300">
                              {works[activeWork].description}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Sparkles className="mr-2 h-5 w-5 text-pink-400" />
                            <span className="font-medium text-white">
                              {works[activeWork].client}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                        <div className="mb-1 text-sm text-gray-400">Growth</div>
                        <div className="text-xl font-bold text-white">
                          {works[activeWork].stats.increase}
                        </div>
                      </div>
                      <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                        <div className="mb-1 text-sm text-gray-400">Reach</div>
                        <div className="text-xl font-bold text-white">
                          {works[activeWork].stats.engagement}
                        </div>
                      </div>
                      <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                        <div className="mb-1 text-sm text-gray-400">Awards</div>
                        <div className="text-xl font-bold text-white">
                          {works[activeWork].stats.awards}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 blur-lg transition-opacity group-hover:opacity-100"></div>
              <div className="relative rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div
                  className={`h-12 w-12 rounded-lg bg-gradient-to-r ${service.color} mb-4 flex items-center justify-center`}
                >
                  <service.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">
                  {service.title}
                </h4>
                <p className="text-gray-400">{service.description}</p>
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
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 blur-xl"></div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-3 py-1 text-sm font-medium text-pink-400">
                  Let&apos;s Collaborate
                </span>
                <h3 className="mb-4 text-3xl font-bold text-white">
                  Ready to transform your brand?
                </h3>
                <p className="mb-8 text-gray-400">
                  Let&apos;s create something extraordinary together. Our team
                  of experts is ready to bring your vision to life.
                </p>
                <button className="inline-flex items-center rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 font-medium text-white shadow-lg shadow-pink-500/25 hover:from-pink-600 hover:to-purple-600">
                  Start a Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              <div className="relative h-64 lg:h-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-600"></div>
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "url('/placeholder.svg?height=400&width=600')",
                  }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                <div className="relative flex h-full items-center p-8">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-white">
                        <div className="mb-1 text-3xl font-bold">24hr</div>
                        <div className="text-sm opacity-80">Response Time</div>
                      </div>
                      <div className="text-white">
                        <div className="mb-1 text-3xl font-bold">100%</div>
                        <div className="text-sm opacity-80">Satisfaction</div>
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

export default CreativeAgencySection;
