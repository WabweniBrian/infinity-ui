"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Map, Plane, Sunrise, User } from "lucide-react";
import Image from "next/image";

const TravelSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-sky-50 to-white md:flex-row">
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
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-blue-500">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                TravelEase
              </span>
            </motion.div>

            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              Welcome back, explorer!
            </h2>
            <p className="text-gray-600">
              Sign in to access your travel plans and bookings
            </p>
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
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-sky-500"
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
                  className="text-sm text-sky-600 transition-colors hover:text-sky-500"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-sky-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <motion.button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`flex h-5 w-5 items-center justify-center rounded border ${rememberMe ? "border-sky-500 bg-sky-500" : "border-gray-300"}`}
                whileTap={{ scale: 0.9 }}
              >
                {rememberMe && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 3L4.5 8.5L2 6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </motion.button>
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-700"
              >
                Keep me signed in
              </label>
            </div>

            <motion.button
              type="submit"
              className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 py-3 font-medium text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign in
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <motion.button
                type="button"
                className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 shadow-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 shadow-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12.073C24 5.40541 18.6274 0 12 0C5.37258 0 0 5.40541 0 12.073C0 18.0995 4.38823 23.0943 10.125 24V15.563H7.07812V12.073H10.125V9.41306C10.125 6.38751 11.9166 4.71627 14.6576 4.71627C15.9701 4.71627 17.3438 4.95169 17.3438 4.95169V7.92145H15.8306C14.34 7.92145 13.875 8.85225 13.875 9.8069V12.073H17.2031L16.6711 15.563H13.875V24C19.6118 23.0943 24 18.0995 24 12.073Z"
                    fill="#1877F2"
                  />
                </svg>
              </motion.button>
              <motion.button
                type="button"
                className="flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 shadow-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5414 12.8204C17.5414 9.49371 20.2789 7.89114 20.3929 7.82514C18.8404 5.5551 16.4544 5.24728 15.6071 5.22514C13.5929 5.01943 11.6404 6.4551 10.6071 6.4551C9.55357 6.4551 7.95357 5.24728 6.26786 5.27728C4.08929 5.30728 2.05357 6.5551 0.946429 8.47728C-1.33929 12.3873 0.410714 18.1373 2.60714 21.4204C3.71429 23.0373 4.98214 24.8373 6.67857 24.7773C8.33929 24.7173 8.96429 23.7473 10.9821 23.7473C13 23.7473 13.5714 24.7773 15.3214 24.7473C17.1071 24.7173 18.2143 23.1173 19.2857 21.4873C20.5536 19.6373 21.0714 17.8204 21.0893 17.7373C21.0536 17.7173 17.5536 16.4373 17.5414 12.8204Z"
                    fill="black"
                  />
                  <path
                    d="M14.3214 3.85943C15.2143 2.75943 15.8214 1.24657 15.6607 -0.286865C14.3571 -0.226865 12.7321 0.594278 11.8036 1.67514C10.9821 2.63371 10.25 4.19371 10.4286 5.67514C11.8929 5.77514 13.4107 4.95943 14.3214 3.85943Z"
                    fill="black"
                  />
                </svg>
              </motion.button>
            </div>
          </form>

          <div className="mt-8">
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                className="font-medium text-sky-600 transition-colors hover:text-sky-500"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right side - Travel imagery and information */}
      <div className="relative hidden w-1/2 overflow-hidden bg-gradient-to-br from-sky-400 to-blue-500 p-12 md:block">
        {/* Decorative elements */}
        <motion.div
          className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10"
          animate={{
            y: [0, 10, 0],
            x: [0, 5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 h-40 w-40 rounded-full bg-white/10"
          animate={{
            y: [0, -10, 0],
            x: [0, -5, 0],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 6,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="relative z-10 mx-auto flex h-full max-w-md flex-col justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="mb-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-white">
              Your journey begins here
            </h2>
            <p className="mb-6 text-sky-100">
              Access your travel plans, bookings, and exclusive deals all in one
              place.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-300/30">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  Flight bookings
                </h3>
                <p className="text-sm text-sky-100">
                  Manage your flight reservations and check-ins.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-300/30">
                <Map className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  Trip itineraries
                </h3>
                <p className="text-sm text-sky-100">
                  Access detailed plans for your upcoming adventures.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-300/30">
                <Sunrise className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="mb-1 text-lg font-medium text-white">
                  Exclusive deals
                </h3>
                <p className="text-sm text-sky-100">
                  Discover special offers and discounts for members.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-sky-400/30 pt-8">
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
              <p className="text-sm text-sky-100">
                Join <span className="font-medium text-white">2M+</span>{" "}
                travelers worldwide
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelSignIn;
