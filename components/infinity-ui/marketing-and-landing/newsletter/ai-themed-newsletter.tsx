"use client";

import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle,
  Mail,
  Brain,
  Cpu,
  Sparkles,
  BarChart,
} from "lucide-react";

const AiThemedNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Stay ahead with AI insights delivered to your inbox";
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");

    // Typing animation
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [controls]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Particle animation
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
  }));

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black py-20 text-white">
      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="pointer-events-none absolute rounded-full bg-blue-500 opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: ["-20px", "20px", "-20px"],
            y: ["-20px", "20px", "-20px"],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Digital circuit lines */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="circuitPattern"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 0 50 L 100 50 M 50 0 L 50 100"
                stroke="#4F46E5"
                strokeWidth="0.5"
                fill="none"
              />
              <circle cx="50" cy="50" r="3" fill="#4F46E5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuitPattern)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 inline-flex items-center rounded-full border border-indigo-800/50 bg-indigo-900/50 px-4 py-2 text-sm font-medium text-indigo-300"
          >
            <Brain className="mr-2 h-4 w-4" />
            <span>AI Newsletter</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="mb-6 text-4xl font-bold sm:text-5xl"
          >
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {typedText}
            </span>
            <span className="animate-blink ml-1 inline-block h-8 w-0.5 bg-blue-400"></span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mb-8 text-lg text-gray-300"
          >
            Join our community of AI enthusiasts, developers, and business
            leaders to receive curated insights on artificial intelligence,
            machine learning, and the future of technology.
          </motion.p>

          <motion.div variants={itemVariants} className="mx-auto max-w-md">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-70 blur"></div>
                <div className="relative rounded-xl border border-gray-700 bg-gray-900/80 p-1 backdrop-blur-sm">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-grow">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="w-full rounded-lg border border-gray-700 bg-gray-800/50 py-4 pl-12 pr-4 text-white outline-none transition-colors placeholder:text-gray-500 focus:border-indigo-500"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-6 py-4 font-medium text-white transition-all hover:shadow-lg sm:whitespace-nowrap"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 rounded-xl border border-gray-700 bg-gray-800/80 p-6 backdrop-blur-sm"
              >
                <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-400" />
                <div>
                  <h4 className="mb-1 font-medium text-green-300">
                    You&apos;re all set!
                  </h4>
                  <p className="text-gray-300">
                    We&apos;ve sent a confirmation email to{" "}
                    <span className="font-medium text-white">{email}</span>
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-400" />
              <span>Weekly AI insights</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-400" />
              <span>Exclusive research</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-indigo-400" />
              <span>AI tool recommendations</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: <Brain className="h-6 w-6 text-blue-400" />,
              title: "AI Research",
              description:
                "Get the latest research findings and breakthroughs in AI technology.",
            },
            {
              icon: <Cpu className="h-6 w-6 text-indigo-400" />,
              title: "Tool Reviews",
              description:
                "Detailed reviews and comparisons of the latest AI tools and platforms.",
            },
            {
              icon: <BarChart className="h-6 w-6 text-purple-400" />,
              title: "Industry Trends",
              description:
                "Analysis of how AI is transforming industries and creating opportunities.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="rounded-xl border border-gray-700 bg-gray-800/50 p-6 backdrop-blur-sm transition-colors hover:border-indigo-500"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-medium text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={controls}
          className="mx-auto mt-16 max-w-2xl rounded-xl border border-gray-700 bg-gray-800/30 p-6 backdrop-blur-sm"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 font-medium text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <div className="font-medium text-white">Dr. Sarah Chen</div>
              <div className="text-sm text-gray-400">
                AI Research Lead, TechFuture
              </div>
            </div>
          </div>
          <p className="italic text-gray-300">
            &quot;This newsletter has become my go-to source for staying updated
            on AI developments. The curated content saves me hours of research
            every week and helps me stay at the forefront of AI
            innovation.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AiThemedNewsletter;
