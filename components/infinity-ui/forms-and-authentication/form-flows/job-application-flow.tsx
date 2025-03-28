"use client";

import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Check,
  Clock,
  FileText,
  GraduationCap,
  Upload,
  User,
  X,
} from "lucide-react";
import { useRef, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resumeFile: File | null;
  resumeFileName: string;
  position: string;
  department: string;
  experience: string;
  education: string;
  skills: string;
  coverLetter: string;
  availability: string;
  referral: string;
  questions: string;
};

const JobApplicationFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resumeFile: null,
    resumeFileName: "",
    position: "",
    department: "",
    experience: "",
    education: "",
    skills: "",
    coverLetter: "",
    availability: "",
    referral: "",
    questions: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 4;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        resumeFile: e.target.files ? e.target.files[0] : null,
        resumeFileName: e.target.files ? e.target.files[0].name : "",
      }));
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form Data:", formData);
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const positions = [
    { value: "", label: "Select position" },
    { value: "software-engineer", label: "Software Engineer" },
    { value: "product-manager", label: "Product Manager" },
    { value: "ux-designer", label: "UX Designer" },
    { value: "data-scientist", label: "Data Scientist" },
    { value: "marketing-specialist", label: "Marketing Specialist" },
  ];

  const departments = [
    { value: "", label: "Select department" },
    { value: "engineering", label: "Engineering" },
    { value: "product", label: "Product" },
    { value: "design", label: "Design" },
    { value: "data", label: "Data Science" },
    { value: "marketing", label: "Marketing" },
  ];

  const experienceLevels = [
    { value: "", label: "Select experience level" },
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (3-5 years)" },
    { value: "senior", label: "Senior Level (5+ years)" },
    { value: "lead", label: "Lead/Manager (7+ years)" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <User className="h-5 w-5" />;
      case 2:
        return <Briefcase className="h-5 w-5" />;
      case 3:
        return <FileText className="h-5 w-5" />;
      case 4:
        return <Clock className="h-5 w-5" />;
      default:
        return <User className="h-5 w-5" />;
    }
  };

  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return "Personal Info";
      case 2:
        return "Experience";
      case 3:
        return "Qualifications";
      case 4:
        return "Final Details";
      default:
        return "Application";
    }
  };

  return (
    <div className="min-h-[700px] w-full rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white p-8 text-center shadow-xl md:p-12"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
              Application Submitted!
            </h2>
            <p className="mx-auto mb-8 max-w-md text-gray-600">
              Thank you for applying. We&apos;ve received your application and
              will review it shortly. You&apos;ll receive a confirmation email
              with next steps.
            </p>
            <div className="mx-auto mb-8 max-w-md rounded-2xl bg-blue-50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-600">Application ID:</span>
                <span className="font-semibold">
                  APP-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-gray-600">Position:</span>
                <span className="font-semibold">
                  {positions.find((p) => p.value === formData.position)
                    ?.label || "Not specified"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Submitted On:</span>
                <span className="font-semibold">
                  {new Date().toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Apply for Another Position
            </button>
          </motion.div>
        ) : (
          <>
            {/* Header and progress */}
            <div className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Job Application
                </h2>
                <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-600">
                  Step {step} of {totalSteps}
                </div>
              </div>

              {/* Progress steps */}
              <div className="relative">
                <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-gray-200"></div>
                <div className="relative flex justify-between">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                          i + 1 < step
                            ? "bg-blue-600 text-white"
                            : i + 1 === step
                              ? "bg-blue-600 text-white ring-4 ring-blue-100"
                              : "border-2 border-gray-300 bg-white text-gray-400"
                        }`}
                      >
                        {i + 1 < step ? (
                          <Check className="h-5 w-5" />
                        ) : (
                          getStepIcon(i + 1)
                        )}
                      </div>
                      <span
                        className={`mt-2 text-xs ${i + 1 <= step ? "font-medium text-blue-600" : "text-gray-500"}`}
                      >
                        {getStepTitle(i + 1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Personal Information
                    </motion.h3>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="Your first name"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="Your last name"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Resume/CV *
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                      <div
                        onClick={triggerFileInput}
                        className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 transition-colors ${
                          formData.resumeFileName
                            ? "border-blue-300 bg-blue-50"
                            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        {formData.resumeFileName ? (
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-blue-600">
                              {formData.resumeFileName}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData((prev) => ({
                                  ...prev,
                                  resumeFile: null,
                                  resumeFileName: "",
                                }));
                              }}
                              className="ml-2 rounded-full bg-gray-200 p-1 hover:bg-gray-300"
                            >
                              <X className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="mb-2 h-8 w-8 text-gray-400" />
                            <p className="mb-1 text-sm text-gray-600">
                              Click to upload your resume
                            </p>
                            <p className="text-xs text-gray-500">
                              PDF, DOC, or DOCX (Max 5MB)
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Job Details
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="position"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Position You&apos;re Applying For *
                      </label>
                      <select
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 1rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {positions.map((position) => (
                          <option key={position.value} value={position.value}>
                            {position.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="department"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Department *
                      </label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 1rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {departments.map((department) => (
                          <option
                            key={department.value}
                            value={department.value}
                          >
                            {department.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="experience"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Experience Level *
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 1rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {experienceLevels.map((level) => (
                          <option key={level.value} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="coverLetter"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Cover Letter
                      </label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        rows={5}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                      />
                    </motion.div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Qualifications
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="education"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Education *
                      </label>
                      <textarea
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="List your educational background, including degrees, institutions, and graduation years..."
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="skills"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Skills *
                      </label>
                      <textarea
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="List your relevant skills, technologies, and proficiencies..."
                      />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="rounded-2xl bg-blue-50 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <GraduationCap className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            Qualification Tips
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <Check className="h-3 w-3 text-blue-600" />
                              </div>
                              <span>
                                Be specific about your technical skills and
                                proficiency levels
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <Check className="h-3 w-3 text-blue-600" />
                              </div>
                              <span>
                                Include relevant certifications and professional
                                development
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <Check className="h-3 w-3 text-blue-600" />
                              </div>
                              <span>
                                Highlight achievements that demonstrate your
                                capabilities
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Final Details
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="availability"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Availability to Start *
                      </label>
                      <input
                        type="text"
                        id="availability"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="e.g., 2 weeks notice, immediately, specific date"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="referral"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        How Did You Hear About Us?
                      </label>
                      <input
                        type="text"
                        id="referral"
                        name="referral"
                        value={formData.referral}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="e.g., LinkedIn, Job Board, Referral"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="questions"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Additional Questions or Comments
                      </label>
                      <textarea
                        id="questions"
                        name="questions"
                        value={formData.questions}
                        onChange={handleChange}
                        rows={3}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Any additional information you'd like to share..."
                      />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="rounded-2xl bg-blue-50 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <Award className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            Application Review Process
                          </h4>
                          <p className="mb-4 text-sm text-gray-600">
                            Our hiring team will review your application and
                            reach out if there&apos;s a good match. Here&apos;s
                            what to expect:
                          </p>
                          <ol className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <span className="text-xs font-medium text-blue-600">
                                  1
                                </span>
                              </div>
                              <span>Application review (1-2 weeks)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <span className="text-xs font-medium text-blue-600">
                                  2
                                </span>
                              </div>
                              <span>Initial phone screening</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <span className="text-xs font-medium text-blue-600">
                                  3
                                </span>
                              </div>
                              <span>Technical/skills assessment</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <span className="text-xs font-medium text-blue-600">
                                  4
                                </span>
                              </div>
                              <span>Team interviews</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center gap-2 rounded-full px-6 py-3 transition-colors ${
                    step === 1
                      ? "cursor-not-allowed bg-gray-100 text-gray-400"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Back
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobApplicationFlow;
