"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, GraduationCap, Mail } from "lucide-react";
import Image from "next/image";

const EducationSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#FFFAF0] md:flex-row">
      {/* Left side - Sign in form */}
      <div className="flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <motion.div
              className="mb-6 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-orange-500">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EduLearn</span>
            </motion.div>

            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Welcome back!
            </h2>
            <p className="text-gray-600">
              Sign in to continue your learning journey
            </p>
          </div>

          <div className="mb-6">
            <div className="mb-6 flex rounded-full border border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setUserType("student")}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${
                  userType === "student"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType("teacher")}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${
                  userType === "teacher"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => setUserType("parent")}
                className={`flex-1 rounded-full py-2 text-sm font-medium transition-all ${
                  userType === "parent"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Parent
              </button>
            </div>
          </div>

          <form className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-sm text-orange-600 transition-colors hover:text-orange-500"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-orange-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="form-checkbox h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <motion.button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl bg-orange-500 py-3 font-medium text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>
          </form>

          <div className="mt-8">
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                className="font-medium text-orange-600 transition-colors hover:text-orange-500"
              >
                Sign up for free
              </Link>
            </p>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-center text-xs text-gray-500">
              By signing in, you agree to our{" "}
              <Link href="#" className="text-orange-600 hover:text-orange-500">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-orange-600 hover:text-orange-500">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right side - Illustration and information */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 p-12 md:flex">
        <motion.div
          className="absolute right-0 top-0 h-full w-full opacity-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <circle cx="50" cy="50" r="10" fill="white" />
              <circle cx="100" cy="50" r="10" fill="white" />
              <circle cx="150" cy="50" r="10" fill="white" />
              <circle cx="200" cy="50" r="10" fill="white" />
              <circle cx="250" cy="50" r="10" fill="white" />
              <circle cx="300" cy="50" r="10" fill="white" />
              <circle cx="350" cy="50" r="10" fill="white" />

              <circle cx="50" cy="100" r="10" fill="white" />
              <circle cx="100" cy="100" r="10" fill="white" />
              <circle cx="150" cy="100" r="10" fill="white" />
              <circle cx="200" cy="100" r="10" fill="white" />
              <circle cx="250" cy="100" r="10" fill="white" />
              <circle cx="300" cy="100" r="10" fill="white" />
              <circle cx="350" cy="100" r="10" fill="white" />

              <circle cx="50" cy="150" r="10" fill="white" />
              <circle cx="100" cy="150" r="10" fill="white" />
              <circle cx="150" cy="150" r="10" fill="white" />
              <circle cx="200" cy="150" r="10" fill="white" />
              <circle cx="250" cy="150" r="10" fill="white" />
              <circle cx="300" cy="150" r="10" fill="white" />
              <circle cx="350" cy="150" r="10" fill="white" />

              <circle cx="50" cy="200" r="10" fill="white" />
              <circle cx="100" cy="200" r="10" fill="white" />
              <circle cx="150" cy="200" r="10" fill="white" />
              <circle cx="200" cy="200" r="10" fill="white" />
              <circle cx="250" cy="200" r="10" fill="white" />
              <circle cx="300" cy="200" r="10" fill="white" />
              <circle cx="350" cy="200" r="10" fill="white" />

              <circle cx="50" cy="250" r="10" fill="white" />
              <circle cx="100" cy="250" r="10" fill="white" />
              <circle cx="150" cy="250" r="10" fill="white" />
              <circle cx="200" cy="250" r="10" fill="white" />
              <circle cx="250" cy="250" r="10" fill="white" />
              <circle cx="300" cy="250" r="10" fill="white" />
              <circle cx="350" cy="250" r="10" fill="white" />

              <circle cx="50" cy="300" r="10" fill="white" />
              <circle cx="100" cy="300" r="10" fill="white" />
              <circle cx="150" cy="300" r="10" fill="white" />
              <circle cx="200" cy="300" r="10" fill="white" />
              <circle cx="250" cy="300" r="10" fill="white" />
              <circle cx="300" cy="300" r="10" fill="white" />
              <circle cx="350" cy="300" r="10" fill="white" />

              <circle cx="50" cy="350" r="10" fill="white" />
              <circle cx="100" cy="350" r="10" fill="white" />
              <circle cx="150" cy="350" r="10" fill="white" />
              <circle cx="200" cy="350" r="10" fill="white" />
              <circle cx="250" cy="350" r="10" fill="white" />
              <circle cx="300" cy="350" r="10" fill="white" />
              <circle cx="350" cy="350" r="10" fill="white" />
            </g>
          </svg>
        </motion.div>

        <motion.div
          className="z-10 mx-auto flex h-full max-w-md flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="mb-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Unlock your learning potential
            </h2>
            <p className="mb-6 text-orange-100">
              Join thousands of students worldwide who are transforming their
              education with EduLearn.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-orange-400/30">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 4L12 14.01L9 11.01"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  Interactive courses
                </h3>
                <p className="text-sm text-orange-100">
                  Engage with interactive content designed to make learning fun
                  and effective.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-orange-400/30">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  Learn at your own pace
                </h3>
                <p className="text-sm text-orange-100">
                  Access courses anytime, anywhere, and progress at a speed that
                  works for you.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-orange-400/30">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  Expert instructors
                </h3>
                <p className="text-sm text-orange-100">
                  Learn from industry professionals and academic experts in
                  every field.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-orange-400/30 pt-8">
            <div className="flex items-center">
              <div className="mr-4 flex -space-x-2">
                <Image
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  src="/images/1.png"
                  alt="User"
                  width={32}
                  height={32}
                />
                <Image
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  src="/images/1.png"
                  alt="User"
                  width={32}
                  height={32}
                />
                <Image
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  src="/images/1.png"
                  alt="User"
                  width={32}
                  height={32}
                />
              </div>
              <p className="text-sm text-orange-100">
                Join <span className="font-medium text-white">10,000+</span>{" "}
                students already learning with us
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EducationSignIn;
