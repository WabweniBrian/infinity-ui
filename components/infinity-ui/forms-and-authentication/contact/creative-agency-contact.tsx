"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  Sparkles,
  Palette,
  Zap,
  Camera,
} from "lucide-react";

const CreativeAgencyContact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    service: "",
    message: "",
  });
  const [activeField, setActiveField] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

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
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 60 + 280}, 100%, 50%)`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > (canvas?.width ?? 0)) this.x = 0;
        else if (this.x < 0) this.x = canvas?.width ?? 0;

        if (this.y > (canvas?.height ?? 0)) this.y = 0;
        else if (this.y < 0) this.y = canvas?.height ?? 0;
      }
      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
      }
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      init();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles with lines
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: string) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          budget: "",
          service: "",
          message: "",
        });
      }, 3000);
    }, 1000);
  };

  const services = [
    { value: "", label: "Select a service" },
    { value: "branding", label: "Branding & Identity" },
    { value: "web", label: "Web Design & Development" },
    { value: "ui", label: "UI/UX Design" },
    { value: "print", label: "Print Design" },
    { value: "motion", label: "Motion Graphics" },
    { value: "photography", label: "Photography" },
  ];

  const budgets = [
    { value: "", label: "Select your budget" },
    { value: "small", label: "$1,000 - $5,000" },
    { value: "medium", label: "$5,000 - $10,000" },
    { value: "large", label: "$10,000 - $25,000" },
    { value: "enterprise", label: "$25,000+" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-[700px] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 p-6 md:p-10">
      {/* Canvas background */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-500"
          >
            <Sparkles className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
            Let&apos;s Create Something{" "}
            <span className="bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
              Amazing
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-purple-200">
            Have a project in mind? Tell us about your vision and let&apos;s
            bring it to life together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.2,
                    }}
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-purple-500"
                  >
                    <CheckCircle className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Message Sent!
                  </h3>
                  <p className="text-purple-200">
                    Thanks for reaching out! We&apos;re excited to learn more
                    about your project. Our creative team will get back to you
                    within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="creative-name"
                      className="mb-2 block text-sm font-medium text-purple-200"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="creative-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={handleBlur}
                      required
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                      placeholder="Your name"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="creative-email"
                      className="mb-2 block text-sm font-medium text-purple-200"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="creative-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      required
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                      placeholder="your@email.com"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="creative-company"
                      className="mb-2 block text-sm font-medium text-purple-200"
                    >
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      id="creative-company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      onFocus={() => handleFocus("company")}
                      onBlur={handleBlur}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                      placeholder="Your company"
                    />
                  </motion.div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="creative-service"
                        className="mb-2 block text-sm font-medium text-purple-200"
                      >
                        Service
                      </label>
                      <select
                        id="creative-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        onFocus={() => handleFocus("service")}
                        onBlur={handleBlur}
                        required
                        className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {services.map((service) => (
                          <option key={service.value} value={service.value}>
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="creative-budget"
                        className="mb-2 block text-sm font-medium text-purple-200"
                      >
                        Budget
                      </label>
                      <select
                        id="creative-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        onFocus={() => handleFocus("budget")}
                        onBlur={handleBlur}
                        required
                        className="w-full appearance-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ffffff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 0.5rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {budgets.map((budget) => (
                          <option key={budget.value} value={budget.value}>
                            {budget.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label
                      htmlFor="creative-message"
                      className="mb-2 block text-sm font-medium text-purple-200"
                    >
                      Project Details
                    </label>
                    <textarea
                      id="creative-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => handleFocus("message")}
                      onBlur={handleBlur}
                      required
                      rows={5}
                      className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/50 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                      placeholder="Tell us about your project and goals..."
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 font-medium text-white shadow-lg shadow-pink-500/20 transition-all hover:from-pink-600 hover:to-purple-600"
                    >
                      Send Message
                      <Send className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="mb-4 text-2xl font-bold text-white">
                Our Creative Services
              </h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-500/20">
                    <Palette className="h-5 w-5 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">
                      Branding & Identity
                    </h4>
                    <p className="text-sm text-purple-200">
                      Logo design, brand guidelines, visual identity
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/20">
                    <Zap className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Web Design</h4>
                    <p className="text-sm text-purple-200">
                      Responsive websites, landing pages, e-commerce
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/20">
                    <Camera className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Photography</h4>
                    <p className="text-sm text-purple-200">
                      Product photography, lifestyle shoots, art direction
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-500/20">
                    <svg
                      className="h-5 w-5 text-pink-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Motion Graphics</h4>
                    <p className="text-sm text-purple-200">
                      Animations, video editing, visual effects
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="relative overflow-hidden rounded-xl"
            >
              <div className="aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=300&width=500"
                    alt="Creative work showcase"
                    width={500}
                    height={300}
                    className="object-cover opacity-60 mix-blend-luminosity"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-purple-900/80 to-transparent p-6">
                  <h3 className="mb-2 text-xl font-bold text-white">
                    Our Portfolio
                  </h3>
                  <p className="mb-4 text-purple-200">
                    Check out our award-winning projects and creative work
                  </p>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="#"
                    className="inline-flex w-fit items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    View Portfolio
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreativeAgencyContact;
