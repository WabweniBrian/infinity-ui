"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ExternalLink, Layers } from "lucide-react";
import { useRef, useState } from "react";

const PerspectiveParallaxHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform values for parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  // Interactive card state
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Card data
  const cards = [
    {
      title: "Modern UI Components",
      description: "Beautifully designed, fully responsive components",
      icon: Layers,
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Animation Library",
      description: "Smooth, performant animations for any interface",
      icon: ExternalLink,
      color: "from-purple-500 to-pink-400",
    },
    {
      title: "Developer Experience",
      description: "Clean code that's easy to customize and extend",
      icon: ArrowRight,
      color: "from-amber-500 to-orange-400",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-slate-950 py-10 text-white md:h-[140vh] md:py-0"
    >
      {/* Fixed content that stays in view while scrolling */}
      <div className="top-0 w-full md:sticky md:h-screen">
        {/* 3D perspective container */}
        <div
          className="inset-0 flex items-center justify-center md:absolute"
          style={{
            perspective: "1000px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* Background grid with perspective */}
          <motion.div style={{ y: y3 }} className="absolute inset-0 z-0">
            <div
              className="h-full w-full opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
                transform: "rotateX(60deg) scale(4) translateZ(-200px)",
                transformOrigin: "center center",
              }}
            />
          </motion.div>

          {/* Content layers with different parallax speeds */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Left content */}
              <div>
                <motion.div
                  style={{ y: y1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-md"
                  >
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan-400"></span>
                    Infinity UI 3D Experience
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
                  >
                    Explore the third{" "}
                    <span className="relative">
                      dimension
                      <motion.span
                        className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-blue-500"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                      />
                    </span>{" "}
                    of design
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-8 max-w-lg text-lg text-slate-300"
                  >
                    Create immersive user experiences with our 3D-inspired
                    components and animations that bring depth to your
                    interfaces.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap gap-4"
                  >
                    <button className="group flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-slate-900 transition-all hover:bg-slate-100">
                      Get Started
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-medium backdrop-blur-sm transition-all hover:bg-white/10">
                      View Components
                    </button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right content - Interactive 3D cards */}
              <motion.div
                style={{ y: y2 }}
                className="relative mx-auto h-[500px] w-full max-w-md"
              >
                {/* Cards with hover effect */}
                {cards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 50,
                      rotateX: 10,
                      rotateY: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotateX: 0,
                      rotateY: 0,
                    }}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      z: 20,
                    }}
                    onHoverStart={() => setActiveCard(index)}
                    onHoverEnd={() => setActiveCard(null)}
                    className={`absolute left-0 right-0 mx-auto w-full max-w-sm cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all ${
                      index === 0
                        ? "top-0"
                        : index === 1
                          ? "top-1/4"
                          : "top-2/4"
                    }`}
                    style={{
                      transformStyle: "preserve-3d",
                      boxShadow:
                        activeCard === index
                          ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                          : "0 10px 30px -15px rgba(0, 0, 0, 0.3)",
                      transform: `perspective(1000px) ${activeCard === index ? "translateZ(50px)" : "translateZ(0)"}`,
                    }}
                  >
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-lg"
                      style={{
                        background: `linear-gradient(to bottom right, ${card.color.split(" ")[1].split("-")[0]}-500, ${
                          card.color.split(" ")[1].split("-")[0]
                        }-400)`,
                      }}
                    >
                      <card.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{card.title}</h3>
                    <p className="text-slate-300">{card.description}</p>

                    {/* Animated arrow on hover */}
                    <motion.div
                      className="mt-4 flex items-center gap-2 text-sm font-medium text-white/70"
                      animate={{
                        x: activeCard === index ? 5 : 0,
                        opacity: activeCard === index ? 1 : 0.7,
                      }}
                    >
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </motion.div>

                    {/* Gradient border on hover */}
                    {activeCard === index && (
                      <motion.div
                        className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-r ${card.color} opacity-20 blur-sm`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:block">
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-sm text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <p>Scroll to explore</p>
            <motion.div
              className="mx-auto mt-2 h-10 w-[1px] bg-gradient-to-b from-white/50 to-transparent"
              animate={{ scaleY: [0, 1, 0] }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PerspectiveParallaxHero;
