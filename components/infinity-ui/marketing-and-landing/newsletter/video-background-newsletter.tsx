"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight, CheckCircle, Mail, Play, Pause } from "lucide-react";

const VideoBackgroundNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-[700px] w-full overflow-hidden py-10">
      {/* Video Background */}
      <div className="absolute inset-0 h-full w-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/default-image.jpg"
        >
          <source
            src="https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoQxzTjtG1kacO0NKLwDbdX3BsVMlQynx9U58R"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80"></div>

        {/* Video controls */}
        <button
          onClick={togglePlayPause}
          className="absolute bottom-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          aria-label={
            isPlaying ? "Pause background video" : "Play background video"
          }
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 text-4xl font-bold sm:text-5xl"
              >
                Escape to your inbox with our{" "}
                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  travel newsletter
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-8 max-w-xl text-lg text-blue-100"
              >
                Join our community of travelers and receive weekly inspiration,
                exclusive deals, and hidden gems from around the world.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mb-8 flex flex-wrap gap-6"
              >
                {[
                  "Destination Guides",
                  "Travel Tips",
                  "Exclusive Deals",
                  "Hidden Gems",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-300"></div>
                    <span className="text-blue-100">{item}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-4 text-sm text-blue-200"
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-900 bg-gradient-to-r from-blue-500 to-purple-500 font-medium text-white"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span>Join 30,000+ travelers</span>
              </motion.div>
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md">
                <div className="mb-6 text-center">
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    Subscribe Now
                  </h3>
                  <p className="text-blue-100">Get weekly travel inspiration</p>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-blue-100"
                      >
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                          <Mail className="h-5 w-5 text-blue-300" />
                        </div>
                        <input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full rounded-xl border border-white/20 bg-white/10 py-4 pl-12 pr-4 text-white outline-none transition-colors placeholder:text-blue-200/50 focus:border-blue-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-blue-100">
                        Interests (Optional)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Adventure",
                          "Relaxation",
                          "Culture",
                          "Food & Drink",
                        ].map((interest, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`interest-${index}`}
                              className="form-checkbox h-4 w-4 rounded border-blue-300 text-blue-500 focus:ring-blue-500"
                            />
                            <label
                              htmlFor={`interest-${index}`}
                              className="ml-2 text-sm text-blue-100"
                            >
                              {interest}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 py-4 font-medium text-white transition-all hover:shadow-lg"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 rounded-xl border border-blue-700/50 bg-blue-900/50 p-6"
                  >
                    <CheckCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-blue-300" />
                    <div>
                      <h4 className="mb-1 font-medium text-blue-200">
                        You&apos;re all set for adventure!
                      </h4>
                      <p className="text-blue-100">
                        We&apos;ve sent a confirmation email to{" "}
                        <span className="font-medium text-white">{email}</span>
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="mt-6 text-center text-sm">
                  <p className="text-blue-200">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBackgroundNewsletter;
