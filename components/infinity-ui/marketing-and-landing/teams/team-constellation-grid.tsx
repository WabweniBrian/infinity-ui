"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ExternalLink } from "lucide-react";
import DarkModeToggle from "@/components/common/dark-mode-toggle";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  social: {
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    email?: string;
    website?: string;
  };
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Emma Rodriguez",
    role: "Product Designer",
    bio: "Creating intuitive and beautiful user experiences with a focus on accessibility and usability.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "emma@example.com",
    },
  },
  {
    id: 2,
    name: "Daniel Kim",
    role: "Frontend Developer",
    bio: "Building responsive and performant web applications with modern frameworks and techniques.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "daniel@example.com",
    },
  },
  {
    id: 3,
    name: "Sophia Patel",
    role: "UX Researcher",
    bio: "Uncovering user insights through research to inform product decisions and improve experiences.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      email: "sophia@example.com",
    },
  },
  {
    id: 4,
    name: "Michael Johnson",
    role: "Backend Engineer",
    bio: "Developing robust and scalable server-side solutions with a focus on performance and security.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "michael@example.com",
    },
  },
  {
    id: 5,
    name: "Olivia Chen",
    role: "Content Strategist",
    bio: "Crafting compelling narratives and content strategies that connect brands with their audiences.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
      email: "olivia@example.com",
    },
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Product Manager",
    bio: "Guiding product strategy and execution with a focus on user needs and business goals.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "james@example.com",
    },
  },
  {
    id: 7,
    name: "Ava Martinez",
    role: "Visual Designer",
    bio: "Creating stunning visuals and illustrations that bring brands and products to life.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
      email: "ava@example.com",
    },
  },
  {
    id: 8,
    name: "Noah Taylor",
    role: "DevOps Engineer",
    bio: "Building and maintaining the infrastructure that powers our applications and services.",
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    social: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "noah@example.com",
    },
  },
];

// Particle system for constellation background
const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      constructor() {
        this.x = Math.random() * (canvas?.width ?? 0);
        this.y = Math.random() * (canvas?.height ?? 0);
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > (canvas?.width ?? 0)) {
          this.speedX = -this.speedX;
        }

        if (this.y < 0 || this.y > (canvas?.height ?? 0)) {
          this.speedY = -this.speedY;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Draw connections between particles
    const drawConnections = () => {
      if (!ctx) return;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Draw connections to mouse
    const drawMouseConnections = () => {
      if (!ctx) return;

      for (let i = 0; i < particles.length; i++) {
        const dx = particles[i].x - mouseRef.current.x;
        const dy = particles[i].y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - distance / 150)})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.stroke();
        }
      }
    };

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      drawConnections();
      drawMouseConnections();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

const TeamConstellationGrid = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse movement
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Create all the transform functions at the top level
  const offsetX0 = useTransform(smoothMouseX, [0, 0.5, 1], [-10, 0, 10]);
  const offsetX1 = useTransform(smoothMouseX, [0, 0.5, 1], [10, 0, -10]);
  const offsetX2 = useTransform(smoothMouseX, [0, 0.5, 1], [-10, 0, 10]);
  const offsetX3 = useTransform(smoothMouseX, [0, 0.5, 1], [10, 0, -10]);
  const offsetX4 = useTransform(smoothMouseX, [0, 0.5, 1], [-10, 0, 10]);
  const offsetX5 = useTransform(smoothMouseX, [0, 0.5, 1], [10, 0, -10]);
  const offsetX6 = useTransform(smoothMouseX, [0, 0.5, 1], [-10, 0, 10]);
  const offsetX7 = useTransform(smoothMouseX, [0, 0.5, 1], [10, 0, -10]);

  const offsetY0 = useTransform(smoothMouseY, [0, 0.5, 1], [-10, 0, 10]);
  const offsetY1 = useTransform(smoothMouseY, [0, 0.5, 1], [-10, 0, 10]);
  const offsetY2 = useTransform(smoothMouseY, [0, 0.5, 1], [-10, 0, 10]);
  const offsetY3 = useTransform(smoothMouseY, [0, 0.5, 1], [-10, 0, 10]);
  const offsetY4 = useTransform(smoothMouseY, [0, 0.5, 1], [10, 0, -10]);
  const offsetY5 = useTransform(smoothMouseY, [0, 0.5, 1], [10, 0, -10]);
  const offsetY6 = useTransform(smoothMouseY, [0, 0.5, 1], [10, 0, -10]);
  const offsetY7 = useTransform(smoothMouseY, [0, 0.5, 1], [10, 0, -10]);

  const rotate0 = useTransform(smoothMouseX, [0, 0.5, 1], [-2, 0, 2]);
  const rotate1 = useTransform(smoothMouseX, [0, 0.5, 1], [2, 0, -2]);
  const rotate2 = useTransform(smoothMouseX, [0, 0.5, 1], [-2, 0, 2]);
  const rotate3 = useTransform(smoothMouseX, [0, 0.5, 1], [2, 0, -2]);
  const rotate4 = useTransform(smoothMouseX, [0, 0.5, 1], [-2, 0, 2]);
  const rotate5 = useTransform(smoothMouseX, [0, 0.5, 1], [2, 0, -2]);
  const rotate6 = useTransform(smoothMouseX, [0, 0.5, 1], [-2, 0, 2]);
  const rotate7 = useTransform(smoothMouseX, [0, 0.5, 1], [2, 0, -2]);

  // Create arrays to access by index
  const offsetXArray = [
    offsetX0,
    offsetX1,
    offsetX2,
    offsetX3,
    offsetX4,
    offsetX5,
    offsetX6,
    offsetX7,
  ];
  const offsetYArray = [
    offsetY0,
    offsetY1,
    offsetY2,
    offsetY3,
    offsetY4,
    offsetY5,
    offsetY6,
    offsetY7,
  ];
  const rotateArray = [
    rotate0,
    rotate1,
    rotate2,
    rotate3,
    rotate4,
    rotate5,
    rotate6,
    rotate7,
  ];

  // Update mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } =
      containerRef.current?.getBoundingClientRect() || {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };

    // Calculate mouse position relative to container (0-1)
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 py-20"
    >
      {/* Constellation background */}
      <ConstellationBackground />

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Our <span className="text-indigo-400">Stellar</span> Team
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-indigo-200">
            Meet the brilliant minds behind our success, working together to
            create amazing experiences.
          </p>
        </motion.div>

        {/* Dynamic grid that responds to mouse movement */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => {
            return (
              <motion.div
                key={member.id}
                style={{
                  x: offsetXArray[index],
                  y: offsetYArray[index],
                  rotate: rotateArray[index],
                }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative"
                onMouseEnter={() => setActiveId(member.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                <div className="h-full overflow-hidden rounded-xl border border-white/20 bg-white/10 backdrop-blur-md">
                  <div className="relative aspect-square">
                    <Image
                      src={
                        member.imageUrl ||
                        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                      }
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/50 to-transparent" />

                    {/* Hover overlay */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center bg-indigo-600/40 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeId === member.id ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 text-center">
                        <p className="mb-4 text-sm text-white">{member.bio}</p>
                        <div className="flex justify-center space-x-3">
                          {member.social.email && (
                            <a
                              href={`mailto:${member.social.email}`}
                              className="text-white/80 transition-colors hover:text-white"
                            >
                              <Mail size={18} />
                            </a>
                          )}
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              className="text-white/80 transition-colors hover:text-white"
                            >
                              <Linkedin size={18} />
                            </a>
                          )}
                          {member.social.twitter && (
                            <a
                              href={member.social.twitter}
                              className="text-white/80 transition-colors hover:text-white"
                            >
                              <Twitter size={18} />
                            </a>
                          )}
                          {member.social.github && (
                            <a
                              href={member.social.github}
                              className="text-white/80 transition-colors hover:text-white"
                            >
                              <Github size={18} />
                            </a>
                          )}
                          {member.social.website && (
                            <a
                              href={member.social.website}
                              className="text-white/80 transition-colors hover:text-white"
                            >
                              <ExternalLink size={18} />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className="p-4">
                    <h3 className="mb-1 text-lg font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-indigo-300">{member.role}</p>
                  </div>
                </div>

                {/* Connection lines on hover */}
                {activeId === member.id &&
                  teamMembers.map((otherMember) => {
                    if (otherMember.id === member.id) return null;

                    return (
                      <motion.div
                        key={`connection-${member.id}-${otherMember.id}`}
                        className="absolute left-1/2 top-1/2 z-0 w-[1px] origin-left bg-indigo-400/30"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: "100px", // This will be scaled
                          height: "1px",
                          rotate: `${
                            Math.atan2(
                              (otherMember.id % 4) - (member.id % 4),
                              Math.floor(otherMember.id / 4) -
                                Math.floor(member.id / 4),
                            ) *
                            (180 / Math.PI)
                          }deg`,
                        }}
                      />
                    );
                  })}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamConstellationGrid;
