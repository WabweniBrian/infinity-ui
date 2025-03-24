"use client"

import { motion, useAnimation } from "framer-motion"
import { ArrowRight, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react"
import { useEffect, useState } from "react"

const FeedbackSurveyCta = () => {
  const controls = useAnimation()
  const [rating, setRating] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  const handleSubmit = () => {
    if (rating !== null) {
      setSubmitted(true)
    }
  }

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
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="overflow-hidden rounded-2xl bg-white shadow-xl"
        >
          <div className="p-8">
            {!submitted ? (
              <>
                <motion.div
                  variants={itemVariants}
                  className="mb-2 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700"
                >
                  <MessageSquare className="h-3 w-3" />
                  YOUR FEEDBACK MATTERS
                </motion.div>

                <motion.h2 variants={itemVariants} className="mb-4 text-2xl font-bold text-gray-900">
                  How was your experience with us?
                </motion.h2>

                <motion.p variants={itemVariants} className="mb-6 text-gray-600">
                  Your feedback helps us improve our service. It only takes a minute to complete this short survey.
                </motion.p>

                {/* Rating */}
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="mb-3 text-sm font-medium text-gray-700">
                    How would you rate your overall experience?
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <motion.button
                        key={value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRating(value)}
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-medium transition-all ${
                          rating === value ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {value}
                      </motion.button>
                    ))}
                  </div>

                  {/* Rating labels */}
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <ThumbsDown className="h-3 w-3" />
                      Not satisfied
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      Very satisfied
                    </div>
                  </div>
                </motion.div>

                {/* Feedback text */}
                <motion.div variants={itemVariants} className="mb-6">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Do you have any additional feedback? (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you liked or how we can improve..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 p-3 text-gray-800 outline-none placeholder:text-gray-400 focus:border-purple-500"
                  ></textarea>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={rating === null}
                    className={`group flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-all ${
                      rating === null
                        ? "cursor-not-allowed bg-gray-200 text-gray-400"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    Submit Feedback
                    <ArrowRight
                      className={`h-4 w-4 ${rating !== null ? "transition-transform group-hover:translate-x-1" : ""}`}
                    />
                  </motion.button>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h2 className="mb-2 text-2xl font-bold text-gray-900">Thank You!</h2>
                <p className="mb-6 max-w-md text-gray-600">
                  We appreciate you taking the time to share your feedback. Your input helps us improve our service for
                  everyone.
                </p>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSubmitted(false)
                    setRating(null)
                    setFeedback("")
                  }}
                  className="rounded-lg bg-purple-100 px-6 py-3 font-medium text-purple-700 transition-all hover:bg-purple-200"
                >
                  Submit Another Response
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FeedbackSurveyCta

