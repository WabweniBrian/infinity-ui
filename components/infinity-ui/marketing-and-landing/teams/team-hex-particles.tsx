"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimation, useInView } from "framer-motion";
import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  skills: string[];
  imageUrl: string;
  contact: {
    email?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Jessica Chen",
    role: "Lead Designer",
    skills: ["UI/UX", "Design Systems", "Prototyping"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "jessica@example.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Senior Developer",
    skills: ["React", "TypeScript", "Node.js"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "michael@example.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 3,
    name: "Aisha Patel",
    role: "Product Manager",
    skills: ["Strategy", "Analytics", "User Research"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "aisha@example.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
  {
    id: 4,
    name: "David Kim",
    role: "Frontend Engineer",
    skills: ["JavaScript", "CSS", "Animation"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "david@example.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 5,
    name: "Olivia Johnson",
    role: "UX Researcher",
    skills: ["User Testing", "Interviews", "Data Analysis"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "olivia@example.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 6,
    name: "Carlos Mendez",
    role: "Backend Developer",
    skills: ["Python", "Databases", "API Design"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "carlos@example.com",
      github: "https://github.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: 7,
    name: "Zara Williams",
    role: "Creative Director",
    skills: ["Brand Strategy", "Art Direction", "Leadership"],
    imageUrl:
      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo",
    contact: {
      email: "zara@example.com",
      linkedin: "https://linkedin.com",
      website: "https://example.com",
    },
  },
];

// Particle animation component
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
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

    // Animation loop
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
};

const TeamHexParticles = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950 py-20">
      {/* Particle background */}
      <ParticleBackground />

      {/* Content */}
      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Our <span className="text-purple-400">Expert</span> Team
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-indigo-200">
            A diverse group of professionals dedicated to creating exceptional
            digital experiences.
          </p>
        </motion.div>

        {/* Hexagonal grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto flex max-w-5xl flex-wrap justify-center"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className={`m-2 w-[180px] sm:w-[200px] ${index % 2 === 0 ? "sm:translate-y-16" : ""}`}
              onMouseEnter={() => setActiveId(member.id)}
              onMouseLeave={() => setActiveId(null)}
            >
              <div className="group relative">
                {/* Hexagon shape */}
                <div className="absolute inset-0 origin-center rotate-45 scale-[0.7] transform rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 transition-transform duration-300 group-hover:scale-[0.75]" />

                {/* Content container */}
                <div className="relative z-10 flex flex-col items-center p-5">
                  {/* Image */}
                  <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border-2 border-indigo-300 bg-indigo-900 p-1">
                    <div className="relative h-full w-full overflow-hidden rounded-full">
                      <Image
                        src={
                          member.imageUrl ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypo5pOGbxjjr1yh2kP4nKicTUMm97NeEzAJCBIo"
                        }
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="mb-1 text-center text-lg font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="mb-3 text-center text-sm text-purple-300">
                    {member.role}
                  </p>

                  {/* Skills */}
                  <div className="mb-4 flex flex-wrap justify-center gap-1">
                    {member.skills.slice(0, 2).map((skill, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-indigo-900/50 px-2 py-0.5 text-xs text-indigo-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Contact icons */}
                  <div className="mt-auto flex space-x-2">
                    {member.contact.email && (
                      <a
                        href={`mailto:${member.contact.email}`}
                        className="text-indigo-300 transition-colors hover:text-white"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail size={16} />
                      </a>
                    )}
                    {member.contact.linkedin && (
                      <a
                        href={member.contact.linkedin}
                        className="text-indigo-300 transition-colors hover:text-white"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <Linkedin size={16} />
                      </a>
                    )}
                    {member.contact.github && (
                      <a
                        href={member.contact.github}
                        className="text-indigo-300 transition-colors hover:text-white"
                        aria-label={`${member.name}'s GitHub profile`}
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {member.contact.website && (
                      <a
                        href={member.contact.website}
                        className="text-indigo-300 transition-colors hover:text-white"
                        aria-label={`${member.name}'s website`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TeamHexParticles;
