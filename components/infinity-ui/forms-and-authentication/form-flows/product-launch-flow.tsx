"use client";

import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart,
  Bell,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  ImageIcon,
  Mail,
  MessageCircle,
  Newspaper,
  Plus,
  Rocket,
  Search,
  Share,
  Sparkles,
  Target,
  Trash2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Milestone = {
  id: string;
  title: string;
  date: string;
  completed: boolean;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  email: string;
};

type Goals = {
  salesTarget: string;
  signupsTarget: string;
  visitorsTarget: string;
};

type NotificationPreferences = {
  email: boolean;
  push: boolean;
  slack: boolean;
};

type FormData = {
  productName: string;
  productDescription: string;
  productImage: File | null;
  productImageUrl: string;
  launchDate: string;
  launchTime: string;
  targetAudience: string[];
  marketingChannels: string[];
  milestones: Milestone[];
  teamMembers: TeamMember[];
  goals: Goals;
  launchType: string;
  notificationPreferences: NotificationPreferences;
  notes: string;
};

const ProductLaunchFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    productDescription: "",
    productImage: null,
    productImageUrl: "",
    launchDate: "",
    launchTime: "",
    targetAudience: [],
    marketingChannels: [],
    milestones: [{ id: "1", title: "", date: "", completed: false }],
    teamMembers: [{ id: "1", name: "", role: "", email: "" }],
    goals: {
      salesTarget: "",
      signupsTarget: "",
      visitorsTarget: "",
    },
    launchType: "standard",
    notificationPreferences: {
      email: true,
      push: false,
      slack: false,
    },
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [daysToLaunch, setDaysToLaunch] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 4;

  // Target audience options
  const audienceOptions = [
    { id: "professionals", name: "Professionals" },
    { id: "students", name: "Students" },
    { id: "developers", name: "Developers" },
    { id: "designers", name: "Designers" },
    { id: "marketers", name: "Marketers" },
    { id: "entrepreneurs", name: "Entrepreneurs" },
    { id: "small-business", name: "Small Business" },
    { id: "enterprise", name: "Enterprise" },
  ];

  // Marketing channels
  const channelOptions = [
    {
      id: "social-media",
      name: "Social Media",
      icon: <Share className="h-4 w-4" />,
    },
    {
      id: "email",
      name: "Email Marketing",
      icon: <Mail className="h-4 w-4" />,
    },
    {
      id: "content",
      name: "Content Marketing",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      id: "ads",
      name: "Paid Advertising",
      icon: <DollarSign className="h-4 w-4" />,
    },
    { id: "pr", name: "PR & Media", icon: <Newspaper className="h-4 w-4" /> },
    {
      id: "influencer",
      name: "Influencer Marketing",
      icon: <Users className="h-4 w-4" />,
    },
    {
      id: "community",
      name: "Community Engagement",
      icon: <MessageCircle className="h-4 w-4" />,
    },
    { id: "seo", name: "SEO", icon: <Search className="h-4 w-4" /> },
  ];

  // Calculate days to launch
  useEffect(() => {
    if (formData.launchDate) {
      const launch = new Date(formData.launchDate);
      const today = new Date();
      const diffTime = launch.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysToLaunch(diffDays);
    } else {
      setDaysToLaunch(null);
    }
  }, [formData.launchDate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");

        if (
          parent in prev &&
          typeof prev[parent as keyof FormData] === "object" &&
          prev[parent as keyof FormData] !== null
        ) {
          return {
            ...prev,
            [parent]: {
              ...(prev[parent as keyof FormData] as Record<string, any>),
              [child]: value,
            },
          };
        }
      }

      return { ...prev, [name]: value };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);

      setFormData((prev) => ({
        ...prev,
        productImage: file,
        productImageUrl: imageUrl,
      }));
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAudienceToggle = (audience: string) => {
    setFormData((prev) => {
      const currentAudiences = prev.targetAudience;
      const newAudiences = currentAudiences.includes(audience)
        ? currentAudiences.filter((a) => a !== audience)
        : [...currentAudiences, audience];

      return {
        ...prev,
        targetAudience: newAudiences,
      };
    });
  };

  const handleChannelToggle = (channel: string) => {
    setFormData((prev) => {
      const currentChannels = prev.marketingChannels;
      const newChannels = currentChannels.includes(channel)
        ? currentChannels.filter((c) => c !== channel)
        : [...currentChannels, channel];

      return {
        ...prev,
        marketingChannels: newChannels,
      };
    });
  };

  const handleNotificationToggle = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      notificationPreferences: {
        ...prev.notificationPreferences,
        [type]:
          !prev.notificationPreferences[
            type as keyof typeof prev.notificationPreferences
          ],
      },
    }));
  };

  const handleAddMilestone = () => {
    const newMilestone = {
      id: Date.now().toString(),
      title: "",
      date: "",
      completed: false,
    };

    setFormData((prev) => ({
      ...prev,
      milestones: [...prev.milestones, newMilestone],
    }));
  };

  const handleRemoveMilestone = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((milestone) => milestone.id !== id),
    }));
  };

  const handleMilestoneChange = (id: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((milestone) =>
        milestone.id === id ? { ...milestone, [field]: value } : milestone,
      ),
    }));
  };

  const handleAddTeamMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: "",
      role: "",
      email: "",
    };

    setFormData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, newMember],
    }));
  };

  const handleRemoveTeamMember = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((member) => member.id !== id),
    }));
  };

  const handleTeamMemberChange = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member) =>
        member.id === id ? { ...member, [field]: value } : member,
      ),
    }));
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
    console.log("Form data:", formData);
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: {
      y: -5,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
    selected: {
      scale: 1.02,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <Rocket className="h-5 w-5" />;
      case 2:
        return <Target className="h-5 w-5" />;
      case 3:
        return <Calendar className="h-5 w-5" />;
      case 4:
        return <BarChart className="h-5 w-5" />;
      default:
        return <Rocket className="h-5 w-5" />;
    }
  };

  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return "Product Details";
      case 2:
        return "Target Audience";
      case 3:
        return "Launch Plan";
      case 4:
        return "Goals & Team";
      default:
        return "Step";
    }
  };

  return (
    <div className="min-h-[700px] w-full rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white p-8 shadow-xl md:p-12"
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
                <Rocket className="h-10 w-10 text-indigo-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Your Product Launch is Ready!
              </h2>
              <p className="mx-auto max-w-md text-gray-600">
                We&apos;ve set up your launch plan for {formData.productName}.
                Your team can now access the dashboard to track progress and
                prepare for the big day.
              </p>
            </div>

            <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-6 text-white">
              <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-xl font-bold">
                      {formData.productName}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>Launch Date: {formData.launchDate}</span>
                      {daysToLaunch !== null && (
                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                          {daysToLaunch} days to go
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/20 px-3 py-1 text-sm backdrop-blur-md">
                    {formData.launchType.charAt(0).toUpperCase() +
                      formData.launchType.slice(1)}{" "}
                    Launch
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Target className="h-4 w-4" /> Target Audience
                    </h4>
                    <p className="text-sm">
                      {formData.targetAudience.length} segments selected
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Calendar className="h-4 w-4" /> Milestones
                    </h4>
                    <p className="text-sm">
                      {formData.milestones.length} planned
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Users className="h-4 w-4" /> Team
                    </h4>
                    <p className="text-sm">
                      {formData.teamMembers.length} members
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-8 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
              >
                <Rocket className="h-5 w-5" />
                Plan Another Launch
              </button>
              <button
                onClick={() => alert("Opening dashboard!")}
                className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <BarChart className="h-5 w-5" />
                View Launch Dashboard
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                Product Launch Planner
              </h2>
              <p className="mx-auto max-w-xl text-gray-600">
                Create a comprehensive launch plan for your product and set your
                team up for success.
              </p>
            </div>

            {/* Progress steps */}
            <div className="mx-auto mb-8 max-w-3xl">
              <div className="flex justify-between">
                {Array.from({ length: totalSteps }).map((_, i) => (
                  <div key={i} className="relative flex flex-col items-center">
                    <div
                      className={`z-10 flex h-10 w-10 items-center justify-center rounded-full ${
                        i + 1 < step
                          ? "bg-indigo-600 text-white"
                          : i + 1 === step
                            ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
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
                      className={`mt-2 text-sm ${i + 1 <= step ? "font-medium text-indigo-600" : "text-gray-500"}`}
                    >
                      {getStepTitle(i + 1)}
                    </span>

                    {/* Connector line */}
                    {i < totalSteps - 1 && (
                      <div className="absolute left-10 top-5 h-0.5 w-full bg-gray-200">
                        <div
                          className={`h-full bg-indigo-600 transition-all ${
                            i + 1 < step
                              ? "w-full"
                              : i + 1 === step
                                ? "w-1/2"
                                : "w-0"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                ))}
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
                    className="space-y-8"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Tell us about your product
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="productName"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder="e.g., Infinity UI"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="productDescription"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Product Description
                      </label>
                      <textarea
                        id="productDescription"
                        name="productDescription"
                        value={formData.productDescription}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder="Briefly describe your product and its key features..."
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Product Image
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                      <div
                        onClick={triggerFileInput}
                        className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 transition-colors ${
                          formData.productImageUrl
                            ? "border-indigo-300 bg-indigo-50"
                            : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        {formData.productImageUrl ? (
                          <div className="relative aspect-video w-full max-w-xs">
                            <Image
                              src={
                                formData.productImageUrl || "/placeholder.svg"
                              }
                              alt="Product preview"
                              fill
                              className="rounded-lg object-contain"
                            />
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="mb-2 h-12 w-12 text-gray-400" />
                            <p className="mb-1 text-sm text-gray-600">
                              Click to upload product image
                            </p>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="launchDate"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Launch Date
                        </label>
                        <input
                          type="date"
                          id="launchDate"
                          name="launchDate"
                          value={formData.launchDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="launchTime"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Launch Time
                        </label>
                        <input
                          type="time"
                          id="launchTime"
                          name="launchTime"
                          value={formData.launchTime}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="mb-3 block text-sm font-medium text-gray-700">
                        Launch Type
                      </label>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {[
                          {
                            id: "standard",
                            name: "Standard Launch",
                            description:
                              "Traditional product release with standard marketing",
                          },
                          {
                            id: "beta",
                            name: "Beta Launch",
                            description:
                              "Limited release to gather feedback before full launch",
                          },
                          {
                            id: "stealth",
                            name: "Stealth Launch",
                            description: "Quiet release with minimal marketing",
                          },
                        ].map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                launchType: type.id,
                              }))
                            }
                            className={`rounded-xl border-2 p-4 text-left transition-all ${
                              formData.launchType === type.id
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">
                                {type.name}
                              </h4>
                              <div
                                className={`h-5 w-5 rounded-full ${
                                  formData.launchType === type.id
                                    ? "bg-indigo-600"
                                    : "bg-gray-200"
                                } flex items-center justify-center`}
                              >
                                {formData.launchType === type.id && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">
                              {type.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    {formData.launchDate && (
                      <motion.div
                        variants={itemVariants}
                        className="rounded-2xl bg-indigo-50 p-6"
                      >
                        <div className="mb-4 flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                            <Clock className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              Launch Countdown
                            </h4>
                            {daysToLaunch !== null && (
                              <p className="text-sm text-indigo-600">
                                {daysToLaunch}{" "}
                                {daysToLaunch === 1 ? "day" : "days"} until
                                launch
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="h-2.5 w-full rounded-full bg-white">
                          <div
                            className="h-2.5 rounded-full bg-indigo-600"
                            style={{
                              width: `${Math.min(100, Math.max(0, 100 - (daysToLaunch || 30) * 3.33))}%`,
                            }}
                          ></div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-8"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Define your target audience
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <label className="mb-3 block text-sm font-medium text-gray-700">
                        Target Audience Segments
                      </label>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {audienceOptions.map((audience) => (
                          <button
                            key={audience.id}
                            type="button"
                            onClick={() => handleAudienceToggle(audience.id)}
                            className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                              formData.targetAudience.includes(audience.id)
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div
                              className={`h-5 w-5 rounded-full ${
                                formData.targetAudience.includes(audience.id)
                                  ? "bg-indigo-600"
                                  : "bg-gray-200"
                              } flex items-center justify-center`}
                            >
                              {formData.targetAudience.includes(
                                audience.id,
                              ) && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                formData.targetAudience.includes(audience.id)
                                  ? "text-indigo-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {audience.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="mb-3 block text-sm font-medium text-gray-700">
                        Marketing Channels
                      </label>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                        {channelOptions.map((channel) => (
                          <button
                            key={channel.id}
                            type="button"
                            onClick={() => handleChannelToggle(channel.id)}
                            className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                              formData.marketingChannels.includes(channel.id)
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                formData.marketingChannels.includes(channel.id)
                                  ? "bg-indigo-100 text-indigo-600"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {channel.icon}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                formData.marketingChannels.includes(channel.id)
                                  ? "text-indigo-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {channel.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="mb-3 block text-sm font-medium text-gray-700">
                        Notification Preferences
                      </label>
                      <div className="space-y-3">
                        {[
                          {
                            id: "email",
                            name: "Email Notifications",
                            description: "Get updates via email",
                          },
                          {
                            id: "push",
                            name: "Push Notifications",
                            description:
                              "Receive push notifications on your devices",
                          },
                          {
                            id: "slack",
                            name: "Slack Notifications",
                            description: "Get updates in your Slack workspace",
                          },
                        ].map((notification) => (
                          <div
                            key={notification.id}
                            className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
                              formData.notificationPreferences[
                                notification.id as keyof typeof formData.notificationPreferences
                              ]
                                ? "border-indigo-500 bg-indigo-50"
                                : "border-gray-200"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                  formData.notificationPreferences[
                                    notification.id as keyof typeof formData.notificationPreferences
                                  ]
                                    ? "bg-indigo-100 text-indigo-600"
                                    : "bg-gray-100 text-gray-500"
                                }`}
                              >
                                <Bell className="h-5 w-5" />
                              </div>
                              <div>
                                <h4
                                  className={`font-medium ${
                                    formData.notificationPreferences[
                                      notification.id as keyof typeof formData.notificationPreferences
                                    ]
                                      ? "text-indigo-700"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {notification.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {notification.description}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleNotificationToggle(notification.id)
                              }
                              className={`relative h-6 w-12 rounded-full ${
                                formData.notificationPreferences[
                                  notification.id as keyof typeof formData.notificationPreferences
                                ]
                                  ? "bg-indigo-600"
                                  : "bg-gray-300"
                              } transition-colors`}
                            >
                              <span
                                className={`absolute top-1 ${
                                  formData.notificationPreferences[
                                    notification.id as keyof typeof formData.notificationPreferences
                                  ]
                                    ? "left-auto right-1"
                                    : "left-1 right-auto"
                                } h-4 w-4 rounded-full bg-white transition-all`}
                              ></span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="rounded-2xl bg-indigo-50 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                          <Target className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            Audience Targeting Tips
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                <Check className="h-3 w-3 text-indigo-600" />
                              </div>
                              <span>
                                Focus on specific audience segments rather than
                                trying to reach everyone
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                <Check className="h-3 w-3 text-indigo-600" />
                              </div>
                              <span>
                                Choose marketing channels where your target
                                audience is most active
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                <Check className="h-3 w-3 text-indigo-600" />
                              </div>
                              <span>
                                Tailor your messaging to address the specific
                                needs of each audience segment
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
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
                    className="space-y-8"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Create your launch plan
                    </motion.h3>

                    {formData.milestones.map((milestone, index) => (
                      <motion.div
                        key={milestone.id}
                        variants={itemVariants}
                        className="relative rounded-2xl bg-gray-50 p-6"
                      >
                        <div className="absolute right-4 top-4">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveMilestone(milestone.id)
                              }
                              className="rounded-full bg-red-100 p-1.5 text-red-600 transition-colors hover:bg-red-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        <h4 className="mb-4 font-medium text-gray-900">
                          Milestone {index + 1}
                        </h4>

                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`milestone-${milestone.id}-title`}
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Milestone Title
                            </label>
                            <input
                              type="text"
                              id={`milestone-${milestone.id}-title`}
                              value={milestone.title}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  milestone.id,
                                  "title",
                                  e.target.value,
                                )
                              }
                              required
                              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                              placeholder="e.g., Website Launch"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`milestone-${milestone.id}-date`}
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Due Date
                            </label>
                            <input
                              type="date"
                              id={`milestone-${milestone.id}-date`}
                              value={milestone.date}
                              onChange={(e) =>
                                handleMilestoneChange(
                                  milestone.id,
                                  "date",
                                  e.target.value,
                                )
                              }
                              min={new Date().toISOString().split("T")[0]}
                              max={formData.launchDate}
                              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            id={`milestone-${milestone.id}-completed`}
                            checked={milestone.completed}
                            onChange={(e) =>
                              handleMilestoneChange(
                                milestone.id,
                                "completed",
                                e.target.checked,
                              )
                            }
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`milestone-${milestone.id}-completed`}
                            className="text-sm text-gray-600"
                          >
                            Mark as completed
                          </label>
                        </div>
                      </motion.div>
                    ))}

                    <motion.div variants={itemVariants}>
                      <button
                        type="button"
                        onClick={handleAddMilestone}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-indigo-300 py-3 font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
                      >
                        <Plus className="h-5 w-5" />
                        Add Another Milestone
                      </button>
                    </motion.div>

                    {formData.milestones.length > 0 &&
                      formData.milestones.some((m) => m.date && m.title) && (
                        <motion.div
                          variants={itemVariants}
                          className="rounded-2xl bg-indigo-50 p-6"
                        >
                          <h4 className="mb-4 font-medium text-gray-900">
                            Launch Timeline
                          </h4>
                          <div className="space-y-4">
                            {formData.milestones
                              .filter((m) => m.date)
                              .sort(
                                (a, b) =>
                                  new Date(a.date).getTime() -
                                  new Date(b.date).getTime(),
                              )
                              .map((milestone) => (
                                <div
                                  key={milestone.id}
                                  className="relative border-l-2 border-indigo-200 pl-6"
                                >
                                  <div
                                    className={`absolute left-0 top-0 h-4 w-4 -translate-x-1/2 rounded-full ${
                                      milestone.completed
                                        ? "bg-green-400"
                                        : "bg-indigo-400"
                                    }`}
                                  ></div>
                                  <p className="mb-1 font-medium text-gray-900">
                                    {milestone.title}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {new Date(
                                      milestone.date,
                                    ).toLocaleDateString("en-US", {
                                      month: "short",
                                      day: "numeric",
                                    })}
                                    {milestone.completed && " - Completed"}
                                  </p>
                                </div>
                              ))}
                            <div className="relative border-l-2 border-indigo-200 pl-6">
                              <div className="absolute left-0 top-0 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-indigo-600">
                                <Rocket className="h-3 w-3 text-white" />
                              </div>
                              <p className="mb-1 font-medium text-indigo-600">
                                Launch Day!
                              </p>
                              <p className="text-xs text-gray-500">
                                {formData.launchDate &&
                                  new Date(
                                    formData.launchDate,
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                  })}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="step4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-8"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Set goals and assign team
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <h4 className="mb-4 font-medium text-gray-900">
                        Launch Goals
                      </h4>
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div>
                          <label
                            htmlFor="goals.salesTarget"
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            Sales Target
                          </label>
                          <input
                            type="text"
                            id="goals.salesTarget"
                            name="goals.salesTarget"
                            value={formData.goals.salesTarget}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="e.g., $10,000"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="goals.signupsTarget"
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            Signups Target
                          </label>
                          <input
                            type="text"
                            id="goals.signupsTarget"
                            name="goals.signupsTarget"
                            value={formData.goals.signupsTarget}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="e.g., 500 users"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="goals.visitorsTarget"
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            Website Visitors Target
                          </label>
                          <input
                            type="text"
                            id="goals.visitorsTarget"
                            name="goals.visitorsTarget"
                            value={formData.goals.visitorsTarget}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                            placeholder="e.g., 10,000 visitors"
                          />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <h4 className="mb-4 font-medium text-gray-900">
                        Launch Team
                      </h4>

                      {formData.teamMembers.map((member, index) => (
                        <div
                          key={member.id}
                          className="relative mb-4 rounded-2xl bg-gray-50 p-6"
                        >
                          <div className="absolute right-4 top-4">
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleRemoveTeamMember(member.id)
                                }
                                className="rounded-full bg-red-100 p-1.5 text-red-600 transition-colors hover:bg-red-200"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>

                          <h5 className="mb-4 font-medium text-gray-900">
                            Team Member {index + 1}
                          </h5>

                          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                              <label
                                htmlFor={`member-${member.id}-name`}
                                className="mb-2 block text-sm font-medium text-gray-700"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id={`member-${member.id}-name`}
                                value={member.name}
                                onChange={(e) =>
                                  handleTeamMemberChange(
                                    member.id,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                required
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                placeholder="Full name"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor={`member-${member.id}-role`}
                                className="mb-2 block text-sm font-medium text-gray-700"
                              >
                                Role
                              </label>
                              <input
                                type="text"
                                id={`member-${member.id}-role`}
                                value={member.role}
                                onChange={(e) =>
                                  handleTeamMemberChange(
                                    member.id,
                                    "role",
                                    e.target.value,
                                  )
                                }
                                required
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                placeholder="e.g., Marketing Lead"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor={`member-${member.id}-email`}
                                className="mb-2 block text-sm font-medium text-gray-700"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                id={`member-${member.id}-email`}
                                value={member.email}
                                onChange={(e) =>
                                  handleTeamMemberChange(
                                    member.id,
                                    "email",
                                    e.target.value,
                                  )
                                }
                                required
                                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                                placeholder="email@example.com"
                              />
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={handleAddTeamMember}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-indigo-300 py-3 font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
                      >
                        <Plus className="h-5 w-5" />
                        Add Team Member
                      </button>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="notes"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                        placeholder="Any additional information about the launch..."
                      />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="rounded-2xl bg-indigo-50 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                          <Sparkles className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            Launch Success Tips
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                <Check className="h-3 w-3 text-indigo-600" />
                              </div>
                              <span>
                                Set clear, measurable goals for your launch
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                <Check className="h-3 w-3 text-indigo-600" />
                              </div>
                              <span>
                                Assign specific responsibilities to each team
                                member
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                                <Check className="h-3 w-3 text-indigo-600" />
                              </div>
                              <span>
                                Prepare for unexpected challenges with
                                contingency plans
                              </span>
                            </li>
                          </ul>
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
                  <ChevronLeft className="h-5 w-5" />
                  Back
                </button>

                {step < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
                  >
                    Continue
                    <ChevronRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-white transition-colors hover:bg-indigo-700"
                  >
                    Create Launch Plan
                    <Rocket className="h-5 w-5" />
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

export default ProductLaunchFlow;
