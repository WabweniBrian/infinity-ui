"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Brush, Layers, Palette, Zap } from "lucide-react"

const CreativeSignUp = () => {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

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
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-black text-white md:flex-row">
      {/* Left side - Branding and creative elements */}
      <div className="relative flex w-full flex-col justify-between overflow-hidden bg-black p-8 md:w-1/2 md:p-12">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-30 blur-3xl filter"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 15,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30 blur-3xl filter"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 18,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="relative z-10">
          <motion.div
            className="mb-16 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
              <Palette className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">ARTISTRY</span>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl" variants={itemVariants}>
              Join the creative <br />
              revolution today
            </motion.h1>

            <motion.p className="mb-8 max-w-md text-gray-400" variants={itemVariants}>
              Sign up to access your creative workspace and collaborate with your team on groundbreaking projects.
            </motion.p>

            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <Brush className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">Creative tools</h3>
                  <p className="text-sm text-gray-400">Access our suite of design and creative tools in one place.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                  <Layers className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">Project management</h3>
                  <p className="text-sm text-gray-400">Organize your projects with our intuitive management system.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="mr-4 mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500">
                  <Zap className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-medium">Instant collaboration</h3>
                  <p className="text-sm text-gray-400">Work together in real-time with your team members.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 mt-12 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p>© 2023 Artistry Creative Agency. All rights reserved.</p>
        </motion.div>
      </div>

      {/* Right side - Sign up form */}
      <div className="flex w-full items-center justify-center bg-zinc-900 p-8 md:w-1/2 md:p-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="mb-8">
            <h2 className="mb-2 text-2xl font-bold">Sign up</h2>
            <p className="text-gray-400">Create your account to join our creative community</p>
          </div>

          <form className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="form-checkbox h-4 w-4 rounded border-zinc-700 bg-zinc-800 text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                I agree to the{" "}
                <Link href="#" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <motion.button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-3 font-medium text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-zinc-900 px-2 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <motion.button
                type="button"
                className="flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.72 16.69 5.82 14.09H2.12V16.95C3.94 20.53 7.69 23 12 23Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.82 14.09C5.6 13.43 5.48 12.73 5.48 12C5.48 11.27 5.6 10.57 5.82 9.91V7.05H2.12C1.41 8.57 1 10.24 1 12C1 13.76 1.41 15.43 2.12 16.95L5.82 14.09Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.37C13.62 5.37 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.69 1 3.94 3.47 2.12 7.05L5.82 9.91C6.72 7.31 9.13 5.37 12 5.37Z"
                    fill="#EA4335"
                  />
                </svg>
              </motion.button>
              <motion.button
                type="button"
                className="flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
                    fill="white"
                  />
                </svg>
              </motion.button>
              <motion.button
                type="button"
                className="flex items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24 12.0733C24 5.40541 18.6274 0 12 0C5.37258 0 0 5.40541 0 12.0733C0 18.0995 4.38823 23.0943 10.125 24V15.5633H7.07812V12.0733H10.125V9.41306C10.125 6.38751 11.9166 4.71627 14.6576 4.71627C15.9701 4.71627 17.3438 4.95169 17.3438 4.95169V7.92145H15.8306C14.34 7.92145 13.875 8.85225 13.875 9.8069V12.0733H17.2031L16.6711 15.5633H13.875V24C19.6118 23.0943 24 18.0995 24 12.0733Z"
                    fill="#1877F2"
                  />
                </svg>
              </motion.button>
            </div>
          </form>

          <div className="mt-8">
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="#" className="font-medium text-purple-400 transition-colors hover:text-purple-300">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CreativeSignUp

