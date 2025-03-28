"use client";

import type React from "react";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {
  Bike,
  Calendar,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Download,
  Home,
  Hotel,
  Lightbulb,
  MapPin,
  Mountain,
  Music,
  TreePalmIcon as PalmTree,
  Plane,
  Plus,
  Sun,
  Trash2,
  Umbrella,
  Users,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Accommodation = {
  type: string;
  name: string;
  checkIn: string;
  checkOut: string;
};

type Activity = {
  id: string;
  name: string;
  date: string;
  time: string;
  category: string;
  notes: string;
};

type Preferences = {
  budget: string;
  pace: string;
  interests: string[];
};

type FormData = {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  accommodation: Accommodation;
  activities: Activity[];
  preferences: Preferences;
  notes: string;
};

const TravelItineraryFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "2",
    accommodation: {
      type: "hotel",
      name: "",
      checkIn: "",
      checkOut: "",
    },
    activities: [
      {
        id: "1",
        name: "",
        date: "",
        time: "",
        category: "sightseeing",
        notes: "",
      },
    ],
    preferences: {
      budget: "medium",
      pace: "balanced",
      interests: ["nature", "food"],
    },
    notes: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const controls = useAnimation();

  const totalSteps = 4;

  // Popular destinations with images
  const popularDestinations = [
    {
      id: "paris",
      name: "Paris, France",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    },
    {
      id: "tokyo",
      name: "Tokyo, Japan",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    },
    {
      id: "bali",
      name: "Bali, Indonesia",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    },
    {
      id: "newyork",
      name: "New York, USA",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    },
    {
      id: "rome",
      name: "Rome, Italy",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    },
    {
      id: "sydney",
      name: "Sydney, Australia",
      image:
        "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp",
    },
  ];

  // Activity categories
  const activityCategories = [
    {
      id: "sightseeing",
      name: "Sightseeing",
      icon: <Camera className="h-4 w-4" />,
    },
    { id: "outdoor", name: "Outdoor", icon: <Mountain className="h-4 w-4" /> },
    {
      id: "food",
      name: "Food & Drink",
      icon: <Utensils className="h-4 w-4" />,
    },
    {
      id: "relaxation",
      name: "Relaxation",
      icon: <Umbrella className="h-4 w-4" />,
    },
    { id: "adventure", name: "Adventure", icon: <Bike className="h-4 w-4" /> },
    { id: "culture", name: "Culture", icon: <Music className="h-4 w-4" /> },
  ];

  // Interest options
  const interestOptions = [
    { id: "nature", name: "Nature", icon: <Mountain className="h-4 w-4" /> },
    { id: "food", name: "Food", icon: <Utensils className="h-4 w-4" /> },
    { id: "culture", name: "Culture", icon: <Music className="h-4 w-4" /> },
    { id: "adventure", name: "Adventure", icon: <Bike className="h-4 w-4" /> },
    {
      id: "relaxation",
      name: "Relaxation",
      icon: <Umbrella className="h-4 w-4" />,
    },
    {
      id: "nightlife",
      name: "Nightlife",
      icon: <Coffee className="h-4 w-4" />,
    },
  ];

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [formData.destination]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");

        // This ensures the parent key exists in formData and is an object
        if (
          parent in prev &&
          typeof prev[parent as keyof typeof prev] === "object"
        ) {
          return {
            ...prev,
            [parent]: {
              ...(prev[parent as keyof typeof prev] as Record<string, any>),
              [child]: value,
            },
          };
        }
      }

      return { ...prev, [name]: value };
    });
  };

  const handleDestinationSelect = (destination: string) => {
    setFormData((prev) => ({ ...prev, destination }));
    setMapLoaded(false);
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => {
      const currentInterests = prev.preferences.interests;
      const newInterests = currentInterests.includes(interest)
        ? currentInterests.filter((i) => i !== interest)
        : [...currentInterests, interest];

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          interests: newInterests,
        },
      };
    });
  };

  const handleAddActivity = () => {
    const newActivity = {
      id: Date.now().toString(),
      name: "",
      date: "",
      time: "",
      category: "sightseeing",
      notes: "",
    };

    setFormData((prev) => ({
      ...prev,
      activities: [...prev.activities, newActivity],
    }));
  };

  const handleRemoveActivity = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.filter((activity) => activity.id !== id),
    }));
  };

  const handleActivityChange = (id: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      activities: prev.activities.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity,
      ),
    }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
      controls.start({ opacity: 0, y: 20 }).then(() => {
        controls.start({ opacity: 1, y: 0 });
      });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
      controls.start({ opacity: 0, y: 20 }).then(() => {
        controls.start({ opacity: 1, y: 0 });
      });
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
        return <MapPin className="h-5 w-5" />;
      case 2:
        return <Hotel className="h-5 w-5" />;
      case 3:
        return <Camera className="h-5 w-5" />;
      case 4:
        return <Sun className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return "Destination";
      case 2:
        return "Accommodation";
      case 3:
        return "Activities";
      case 4:
        return "Preferences";
      default:
        return "Step";
    }
  };

  // Calculate trip duration
  const calculateDuration = () => {
    if (!formData.startDate || !formData.endDate) return null;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const tripDuration = calculateDuration();

  return (
    <div className="min-h-[700px] w-full rounded-3xl bg-gradient-to-br from-sky-50 to-teal-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white p-8 shadow-xl md:p-12"
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
                <Check className="h-10 w-10 text-teal-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Your Travel Itinerary is Ready!
              </h2>
              <p className="mx-auto max-w-md text-gray-600">
                We&apos;ve created your personalized travel plan for{" "}
                {formData.destination}. You can download it or access it anytime
                from your account.
              </p>
            </div>

            <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-sky-500 to-teal-500 p-6 text-white">
              <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>

              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-xl font-bold">
                      {formData.destination}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formData.startDate} - {formData.endDate}
                      </span>
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                        {tripDuration} {tripDuration === 1 ? "day" : "days"}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/20 px-3 py-1 text-sm backdrop-blur-md">
                    {formData.travelers}{" "}
                    {parseInt(formData.travelers) === 1
                      ? "Traveler"
                      : "Travelers"}
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Hotel className="h-4 w-4" /> Accommodation
                    </h4>
                    <p className="text-sm">
                      {formData.accommodation.name ||
                        formData.accommodation.type}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Camera className="h-4 w-4" /> Activities
                    </h4>
                    <p className="text-sm">
                      {formData.activities.length} planned
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Sun className="h-4 w-4" /> Interests
                    </h4>
                    <p className="text-sm">
                      {formData.preferences.interests.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 rounded-full bg-teal-600 px-8 py-3 font-medium text-white transition-colors hover:bg-teal-700"
              >
                <Plane className="h-5 w-5" />
                Plan Another Trip
              </button>
              <button
                onClick={() => alert("Itinerary downloaded!")}
                className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Download className="h-5 w-5" />
                Download Itinerary
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                Create Your Travel Itinerary
              </h2>
              <p className="mx-auto max-w-xl text-gray-600">
                Plan your perfect trip with our interactive itinerary builder.
                We&apos;ll help you organize everything from accommodations to
                daily activities.
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
                          ? "bg-teal-600 text-white"
                          : i + 1 === step
                            ? "bg-teal-600 text-white ring-4 ring-teal-100"
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
                      className={`mt-2 text-sm ${i + 1 <= step ? "font-medium text-teal-600" : "text-gray-500"}`}
                    >
                      {getStepTitle(i + 1)}
                    </span>

                    {/* Connector line */}
                    {i < totalSteps - 1 && (
                      <div className="absolute left-10 top-5 h-0.5 w-full bg-gray-200">
                        <div
                          className={`h-full bg-teal-600 transition-all ${
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
                      Where would you like to go?
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="destination"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Destination
                      </label>
                      <input
                        type="text"
                        id="destination"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                        placeholder="City, Country"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <p className="mb-3 text-sm font-medium text-gray-700">
                        Popular Destinations
                      </p>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {popularDestinations.map((destination) => (
                          <motion.div
                            key={destination.id}
                            variants={cardVariants}
                            whileHover="hover"
                            animate={
                              formData.destination === destination.name
                                ? "selected"
                                : "visible"
                            }
                            onClick={() =>
                              handleDestinationSelect(destination.name)
                            }
                            className={`relative cursor-pointer overflow-hidden rounded-xl transition-all ${
                              formData.destination === destination.name
                                ? "ring-2 ring-teal-500"
                                : ""
                            }`}
                          >
                            <div className="relative aspect-[3/2]">
                              <Image
                                src={
                                  destination.image ||
                                  "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                                }
                                alt={destination.name}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-3">
                                <span className="text-sm font-medium text-white">
                                  {destination.name}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="startDate"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="endDate"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          required
                          min={
                            formData.startDate ||
                            new Date().toISOString().split("T")[0]
                          }
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="travelers"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Number of Travelers
                      </label>
                      <select
                        id="travelers"
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        required
                        className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                          backgroundPosition: "right 1rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                          paddingRight: "2.5rem",
                        }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num.toString()}>
                            {num} {num === 1 ? "Traveler" : "Travelers"}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    {formData.destination &&
                      formData.startDate &&
                      formData.endDate && (
                        <motion.div
                          variants={itemVariants}
                          className="rounded-2xl bg-gray-50 p-6"
                        >
                          <div className="mb-4 flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">
                              Trip Summary
                            </h4>
                            {tripDuration && (
                              <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800">
                                {tripDuration}{" "}
                                {tripDuration === 1 ? "day" : "days"}
                              </span>
                            )}
                          </div>

                          <div className="relative mb-4 h-40 overflow-hidden rounded-xl">
                            {mapLoaded ? (
                              <div className="absolute inset-0 flex items-center justify-center bg-teal-100">
                                <div className="text-center">
                                  <MapPin className="mx-auto mb-2 h-8 w-8 text-teal-600" />
                                  <p className="font-medium text-teal-800">
                                    {formData.destination}
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                <div className="flex animate-pulse flex-col items-center">
                                  <div className="mb-2 h-10 w-10 rounded-full bg-gray-200"></div>
                                  <div className="mb-2 h-4 w-24 rounded bg-gray-200"></div>
                                  <div className="h-3 w-16 rounded bg-gray-200"></div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-teal-600" />
                              <span>{formData.startDate}</span>
                            </div>
                            <div className="mx-2 h-px flex-grow bg-gray-300"></div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-teal-600" />
                              <span>{formData.endDate}</span>
                            </div>
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
                      Where will you be staying?
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <label className="mb-3 block text-sm font-medium text-gray-700">
                        Accommodation Type
                      </label>
                      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {[
                          {
                            id: "hotel",
                            name: "Hotel",
                            icon: <Hotel className="h-5 w-5" />,
                          },
                          {
                            id: "apartment",
                            name: "Apartment",
                            icon: <Home className="h-5 w-5" />,
                          },
                          {
                            id: "hostel",
                            name: "Hostel",
                            icon: <Users className="h-5 w-5" />,
                          },
                          {
                            id: "resort",
                            name: "Resort",
                            icon: <PalmTree className="h-5 w-5" />,
                          },
                        ].map((type) => (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                accommodation: {
                                  ...prev.accommodation,
                                  type: type.id,
                                },
                              }))
                            }
                            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all ${
                              formData.accommodation.type === type.id
                                ? "border-teal-500 bg-teal-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                formData.accommodation.type === type.id
                                  ? "bg-teal-100 text-teal-600"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {type.icon}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                formData.accommodation.type === type.id
                                  ? "text-teal-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {type.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="accommodation.name"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Accommodation Name
                      </label>
                      <input
                        type="text"
                        id="accommodation.name"
                        name="accommodation.name"
                        value={formData.accommodation.name}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                        placeholder={`${formData.accommodation.type.charAt(0).toUpperCase() + formData.accommodation.type.slice(1)} name`}
                      />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="accommodation.checkIn"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Check-in Date
                        </label>
                        <input
                          type="date"
                          id="accommodation.checkIn"
                          name="accommodation.checkIn"
                          value={formData.accommodation.checkIn}
                          onChange={handleChange}
                          min={formData.startDate}
                          max={formData.endDate}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="accommodation.checkOut"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Check-out Date
                        </label>
                        <input
                          type="date"
                          id="accommodation.checkOut"
                          name="accommodation.checkOut"
                          value={formData.accommodation.checkOut}
                          onChange={handleChange}
                          min={
                            formData.accommodation.checkIn || formData.startDate
                          }
                          max={formData.endDate}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="rounded-2xl bg-teal-50 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                          <Lightbulb className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            Accommodation Tips
                          </h4>
                          <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                                <Check className="h-3 w-3 text-teal-600" />
                              </div>
                              <span>
                                Book accommodations with free cancellation when
                                possible
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                                <Check className="h-3 w-3 text-teal-600" />
                              </div>
                              <span>
                                Consider location and proximity to attractions
                                you plan to visit
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                                <Check className="h-3 w-3 text-teal-600" />
                              </div>
                              <span>
                                Check reviews from other travelers before
                                booking
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
                      Plan Your Activities
                    </motion.h3>

                    {formData.activities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        variants={itemVariants}
                        className="relative rounded-2xl bg-gray-50 p-6"
                      >
                        <div className="absolute right-4 top-4">
                          {index > 0 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveActivity(activity.id)}
                              className="rounded-full bg-red-100 p-1.5 text-red-600 transition-colors hover:bg-red-200"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>

                        <h4 className="mb-4 font-medium text-gray-900">
                          Activity {index + 1}
                        </h4>

                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`activity-${activity.id}-name`}
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Activity Name
                            </label>
                            <input
                              type="text"
                              id={`activity-${activity.id}-name`}
                              value={activity.name}
                              onChange={(e) =>
                                handleActivityChange(
                                  activity.id,
                                  "name",
                                  e.target.value,
                                )
                              }
                              required
                              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                              placeholder="e.g., Visit Eiffel Tower"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`activity-${activity.id}-category`}
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Category
                            </label>
                            <select
                              id={`activity-${activity.id}-category`}
                              value={activity.category}
                              onChange={(e) =>
                                handleActivityChange(
                                  activity.id,
                                  "category",
                                  e.target.value,
                                )
                              }
                              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                              style={{
                                backgroundImage:
                                  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                                backgroundPosition: "right 1rem center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "1.5em 1.5em",
                                paddingRight: "2.5rem",
                              }}
                            >
                              {activityCategories.map((category) => (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div>
                            <label
                              htmlFor={`activity-${activity.id}-date`}
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Date
                            </label>
                            <input
                              type="date"
                              id={`activity-${activity.id}-date`}
                              value={activity.date}
                              onChange={(e) =>
                                handleActivityChange(
                                  activity.id,
                                  "date",
                                  e.target.value,
                                )
                              }
                              min={formData.startDate}
                              max={formData.endDate}
                              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={`activity-${activity.id}-time`}
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Time
                            </label>
                            <input
                              type="time"
                              id={`activity-${activity.id}-time`}
                              value={activity.time}
                              onChange={(e) =>
                                handleActivityChange(
                                  activity.id,
                                  "time",
                                  e.target.value,
                                )
                              }
                              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor={`activity-${activity.id}-notes`}
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            Notes
                          </label>
                          <textarea
                            id={`activity-${activity.id}-notes`}
                            value={activity.notes}
                            onChange={(e) =>
                              handleActivityChange(
                                activity.id,
                                "notes",
                                e.target.value,
                              )
                            }
                            rows={2}
                            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                            placeholder="Any additional details..."
                          />
                        </div>
                      </motion.div>
                    ))}

                    <motion.div variants={itemVariants}>
                      <button
                        type="button"
                        onClick={handleAddActivity}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-teal-300 py-3 font-medium text-teal-600 transition-colors hover:bg-teal-50"
                      >
                        <Plus className="h-5 w-5" />
                        Add Another Activity
                      </button>
                    </motion.div>

                    {formData.activities.length > 0 &&
                      formData.activities.some((a) => a.date && a.name) && (
                        <motion.div
                          variants={itemVariants}
                          className="rounded-2xl bg-teal-50 p-6"
                        >
                          <h4 className="mb-4 font-medium text-gray-900">
                            Activity Timeline
                          </h4>
                          <div className="space-y-4">
                            {Array.from(
                              new Set(
                                formData.activities
                                  .filter((a) => a.date)
                                  .map((a) => a.date),
                              ),
                            )
                              .sort()
                              .map((date) => (
                                <div
                                  key={date}
                                  className="relative border-l-2 border-teal-200 pl-6"
                                >
                                  <div className="absolute left-0 top-0 h-4 w-4 -translate-x-1/2 rounded-full bg-teal-400"></div>
                                  <p className="mb-2 font-medium text-gray-900">
                                    {new Date(date).toLocaleDateString(
                                      "en-US",
                                      {
                                        weekday: "long",
                                        month: "short",
                                        day: "numeric",
                                      },
                                    )}
                                  </p>
                                  <div className="space-y-2">
                                    {formData.activities
                                      .filter((a) => a.date === date)
                                      .sort((a, b) =>
                                        a.time > b.time ? 1 : -1,
                                      )
                                      .map((activity) => (
                                        <div
                                          key={activity.id}
                                          className="flex items-start gap-3 rounded-lg bg-white p-3"
                                        >
                                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-100">
                                            {activityCategories.find(
                                              (c) => c.id === activity.category,
                                            )?.icon || (
                                              <Camera className="h-4 w-4 text-teal-600" />
                                            )}
                                          </div>
                                          <div>
                                            <p className="font-medium text-gray-800">
                                              {activity.name}
                                            </p>
                                            {activity.time && (
                                              <p className="text-xs text-gray-500">
                                                {new Date(
                                                  `2000-01-01T${activity.time}`,
                                                ).toLocaleTimeString("en-US", {
                                                  hour: "numeric",
                                                  minute: "2-digit",
                                                })}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              ))}
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
                      Finalize Your Trip
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <label className="mb-3 block text-sm font-medium text-gray-700">
                        Your Travel Interests
                      </label>
                      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                        {interestOptions.map((interest) => (
                          <button
                            key={interest.id}
                            type="button"
                            onClick={() => handleInterestToggle(interest.id)}
                            className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                              formData.preferences.interests.includes(
                                interest.id,
                              )
                                ? "border-teal-500 bg-teal-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                formData.preferences.interests.includes(
                                  interest.id,
                                )
                                  ? "bg-teal-100 text-teal-600"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {interest.icon}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                formData.preferences.interests.includes(
                                  interest.id,
                                )
                                  ? "text-teal-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {interest.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="mb-3 block text-sm font-medium text-gray-700">
                        Budget Range
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: "budget", name: "Budget", icon: "$" },
                          { id: "medium", name: "Medium", icon: "$$" },
                          { id: "luxury", name: "Luxury", icon: "$$$" },
                        ].map((budget) => (
                          <button
                            key={budget.id}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                preferences: {
                                  ...prev.preferences,
                                  budget: budget.id,
                                },
                              }))
                            }
                            className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                              formData.preferences.budget === budget.id
                                ? "border-teal-500 bg-teal-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <span
                              className={`text-lg font-medium ${
                                formData.preferences.budget === budget.id
                                  ? "text-teal-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {budget.icon}
                            </span>
                            <span
                              className={`text-sm font-medium ${
                                formData.preferences.budget === budget.id
                                  ? "text-teal-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {budget.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="mb-3 block text-sm font-medium text-gray-700">
                        Travel Pace
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            id: "relaxed",
                            name: "Relaxed",
                            icon: <Umbrella className="h-5 w-5" />,
                          },
                          {
                            id: "balanced",
                            name: "Balanced",
                            icon: <Coffee className="h-5 w-5" />,
                          },
                          {
                            id: "active",
                            name: "Active",
                            icon: <Bike className="h-5 w-5" />,
                          },
                        ].map((pace) => (
                          <button
                            key={pace.id}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                preferences: {
                                  ...prev.preferences,
                                  pace: pace.id,
                                },
                              }))
                            }
                            className={`flex flex-col items-center gap-2 rounded-xl border p-3 transition-all ${
                              formData.preferences.pace === pace.id
                                ? "border-teal-500 bg-teal-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                formData.preferences.pace === pace.id
                                  ? "bg-teal-100 text-teal-600"
                                  : "bg-gray-100 text-gray-500"
                              }`}
                            >
                              {pace.icon}
                            </div>
                            <span
                              className={`text-sm font-medium ${
                                formData.preferences.pace === pace.id
                                  ? "text-teal-700"
                                  : "text-gray-700"
                              }`}
                            >
                              {pace.name}
                            </span>
                          </button>
                        ))}
                      </div>
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
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                        placeholder="Any special requirements or additional information..."
                      />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="rounded-2xl bg-teal-50 p-6"
                    >
                      <h4 className="mb-4 font-medium text-gray-900">
                        Trip Summary
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Destination:</span>
                          <span className="font-medium text-gray-900">
                            {formData.destination}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dates:</span>
                          <span className="font-medium text-gray-900">
                            {formData.startDate} to {formData.endDate}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium text-gray-900">
                            {tripDuration} days
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Accommodation:</span>
                          <span className="font-medium text-gray-900">
                            {formData.accommodation.name ||
                              formData.accommodation.type}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Activities:</span>
                          <span className="font-medium text-gray-900">
                            {formData.activities.length}
                          </span>
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
                    className="flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-white transition-colors hover:bg-teal-700"
                  >
                    Continue
                    <ChevronRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 rounded-full bg-teal-600 px-6 py-3 text-white transition-colors hover:bg-teal-700"
                  >
                    Create Itinerary
                    <Plane className="h-5 w-5" />
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

export default TravelItineraryFlow;
