"use client";

import type React from "react";

import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  Globe,
  Hotel,
  MapPin,
  Mountain,
  Plane,
  Plus,
  Sun,
  Trash2,
  Umbrella,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";

type Preference = {
  climate: string;
  pace: string;
  cuisine: string;
  transportation: string;
};

type Activity = {
  id: string;
  name: string;
  date: string;
  notes: string;
};

type FormData = {
  destination: string;
  startDate: string;
  endDate: string;
  travelers: string;
  budget: string;
  tripType: string;
  accommodation: string;
  activities: string[];
  preferences: Preference;
  customActivities: Activity[];
  specialRequests: string;
};

const TravelPlannerFlow = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "2",
    budget: "medium",
    tripType: "leisure",
    accommodation: "hotel",
    activities: [],
    preferences: {
      climate: "warm",
      pace: "moderate",
      cuisine: "local",
      transportation: "public",
    },
    customActivities: [{ id: "1", name: "", date: "", notes: "" }],
    specialRequests: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalSteps = 4;

  // Trip types
  const tripTypes = [
    {
      id: "leisure",
      name: "Leisure & Relaxation",
      icon: <Umbrella className="h-5 w-5" />,
    },
    {
      id: "adventure",
      name: "Adventure & Outdoors",
      icon: <Mountain className="h-5 w-5" />,
    },
    {
      id: "cultural",
      name: "Cultural & Historical",
      icon: <Globe className="h-5 w-5" />,
    },
    {
      id: "culinary",
      name: "Culinary Experience",
      icon: <Utensils className="h-5 w-5" />,
    },
    {
      id: "photography",
      name: "Photography Tour",
      icon: <Camera className="h-5 w-5" />,
    },
  ];

  // Accommodation types
  const accommodationTypes = [
    { id: "hotel", name: "Hotel" },
    { id: "resort", name: "Resort" },
    { id: "airbnb", name: "Vacation Rental" },
    { id: "hostel", name: "Hostel" },
    { id: "camping", name: "Camping" },
  ];

  // Popular activities
  const popularActivities = [
    { id: "sightseeing", name: "Sightseeing" },
    { id: "beach", name: "Beach Day" },
    { id: "hiking", name: "Hiking" },
    { id: "museums", name: "Museums" },
    { id: "food-tour", name: "Food Tour" },
    { id: "shopping", name: "Shopping" },
    { id: "nightlife", name: "Nightlife" },
    { id: "local-tour", name: "Guided Local Tour" },
    { id: "water-sports", name: "Water Sports" },
    { id: "wildlife", name: "Wildlife Viewing" },
    { id: "spa", name: "Spa & Wellness" },
    { id: "photography", name: "Photography" },
  ];

  // Climate preferences
  const climatePreferences = [
    { id: "warm", name: "Warm & Sunny" },
    { id: "mild", name: "Mild & Temperate" },
    { id: "cool", name: "Cool & Crisp" },
    { id: "cold", name: "Cold & Snowy" },
    { id: "any", name: "Any Climate" },
  ];

  // Trip pace
  const tripPaces = [
    { id: "relaxed", name: "Relaxed & Slow" },
    { id: "moderate", name: "Moderate" },
    { id: "busy", name: "Busy & Active" },
  ];

  // Cuisine preferences
  const cuisinePreferences = [
    { id: "local", name: "Local Cuisine" },
    { id: "international", name: "International" },
    { id: "vegetarian", name: "Vegetarian/Vegan" },
    { id: "fine-dining", name: "Fine Dining" },
    { id: "street-food", name: "Street Food" },
  ];

  // Transportation options
  const transportationOptions = [
    { id: "public", name: "Public Transport" },
    { id: "rental", name: "Car Rental" },
    { id: "private", name: "Private Transfers" },
    { id: "walking", name: "Walking/Biking" },
    { id: "mix", name: "Mix of Options" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      // Handle nested properties
      if (name.includes(".")) {
        const [parent, child] = name.split(".");

        // This ensures we are updating a known nested object (like `preferences`)
        if (
          parent in prev &&
          typeof prev[parent as keyof typeof prev] === "object"
        ) {
          return {
            ...prev,
            [parent]: {
              ...(prev[parent as keyof typeof prev] as Record<string, unknown>),
              [child]: value,
            },
          };
        }
      }

      return { ...prev, [name]: value };
    });
  };

  const handleTripTypeChange = (tripType: string) => {
    setFormData((prev) => ({ ...prev, tripType }));
  };

  const handleAccommodationChange = (accommodation: string) => {
    setFormData((prev) => ({ ...prev, accommodation }));
  };

  const handleActivityToggle = (activity: string) => {
    setFormData((prev) => {
      const currentActivities = prev.activities;
      const newActivities = currentActivities.includes(activity)
        ? currentActivities.filter((a) => a !== activity)
        : [...currentActivities, activity];

      return {
        ...prev,
        activities: newActivities,
      };
    });
  };

  const handleAddCustomActivity = () => {
    const newActivity = {
      id: Date.now().toString(),
      name: "",
      date: "",
      notes: "",
    };

    setFormData((prev) => ({
      ...prev,
      customActivities: [...prev.customActivities, newActivity],
    }));
  };

  const handleRemoveCustomActivity = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      customActivities: prev.customActivities.filter(
        (activity) => activity.id !== id,
      ),
    }));
  };

  const handleCustomActivityChange = (
    id: string,
    field: string,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      customActivities: prev.customActivities.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity,
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
    console.log("Form Data:", formData);
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
        return <Compass className="h-5 w-5" />;
      default:
        return <Plane className="h-5 w-5" />;
    }
  };

  const getStepTitleText = (stepNumber: number) => {
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
  const calculateTripDuration = () => {
    if (!formData.startDate || !formData.endDate) return null;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const tripDuration = calculateTripDuration();

  return (
    <div className="min-h-[700px] w-full rounded-3xl bg-gradient-to-br from-blue-50 to-sky-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl bg-white p-8 shadow-xl md:p-12"
          >
            <div className="mb-8 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                <Plane className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Your Travel Itinerary is Ready!
              </h2>
              <p className="mx-auto max-w-md text-gray-600">
                We&apos;ve created your personalized travel plan for{" "}
                {formData.destination}. Get ready for an amazing {tripDuration}
                -day {formData.tripType} trip!
              </p>
            </div>

            <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-sky-500 p-6 text-white">
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
                        {formData.startDate} to {formData.endDate}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-white/20 px-3 py-1 text-sm backdrop-blur-md">
                    {tripDuration} days
                  </div>
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Users className="h-4 w-4" /> Travelers
                    </h4>
                    <p className="text-sm">{formData.travelers} people</p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Hotel className="h-4 w-4" /> Accommodation
                    </h4>
                    <p className="text-sm">
                      {
                        accommodationTypes.find(
                          (a) => a.id === formData.accommodation,
                        )?.name
                      }
                    </p>
                  </div>

                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-md">
                    <h4 className="mb-2 flex items-center gap-2 font-medium">
                      <Compass className="h-4 w-4" /> Trip Type
                    </h4>
                    <p className="text-sm">
                      {tripTypes.find((t) => t.id === formData.tripType)?.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                <Plane className="h-5 w-5" />
                Plan Another Trip
              </button>
              <button
                onClick={() => alert("Downloading itinerary!")}
                className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                <Calendar className="h-5 w-5" />
                Download Itinerary
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Header and progress */}
            <div className="mb-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  Travel Itinerary Planner
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
                        {getStepTitleText(i + 1)}
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
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="City, Country or Region"
                      />
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
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
                        <option value="1">1 person</option>
                        <option value="2">2 people</option>
                        <option value="3">3 people</option>
                        <option value="4">4 people</option>
                        <option value="5">5 people</option>
                        <option value="6">6+ people</option>
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="budget"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
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
                        <option value="budget">Budget-friendly</option>
                        <option value="medium">Mid-range</option>
                        <option value="luxury">Luxury</option>
                      </select>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="mb-4 block text-sm font-medium text-gray-700">
                        What type of trip are you planning?
                      </label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
                        {tripTypes.map((type) => (
                          <motion.div
                            key={type.id}
                            variants={cardVariants}
                            whileHover="hover"
                            animate={
                              formData.tripType === type.id
                                ? "selected"
                                : "visible"
                            }
                            onClick={() => handleTripTypeChange(type.id)}
                            className={`relative cursor-pointer rounded-xl border-2 bg-white p-4 transition-all ${
                              formData.tripType === type.id
                                ? "border-blue-600"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <div
                                className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${
                                  formData.tripType === type.id
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {type.icon}
                              </div>
                              <h4 className="text-sm font-medium">
                                {type.name}
                              </h4>
                            </div>
                          </motion.div>
                        ))}
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
                      Choose Your Accommodation
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <label className="mb-4 block text-sm font-medium text-gray-700">
                        Accommodation Type
                      </label>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5">
                        {accommodationTypes.map((type) => (
                          <motion.div
                            key={type.id}
                            variants={cardVariants}
                            whileHover="hover"
                            animate={
                              formData.accommodation === type.id
                                ? "selected"
                                : "visible"
                            }
                            onClick={() => handleAccommodationChange(type.id)}
                            className={`relative cursor-pointer rounded-xl border-2 bg-white p-4 transition-all ${
                              formData.accommodation === type.id
                                ? "border-blue-600"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="flex flex-col items-center text-center">
                              <div
                                className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${
                                  formData.accommodation === type.id
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                <Hotel className="h-5 w-5" />
                              </div>
                              <h4 className="text-sm font-medium">
                                {type.name}
                              </h4>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="rounded-2xl bg-blue-50 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <Hotel className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            Accommodation Details
                          </h4>
                          <p className="mb-4 text-sm text-gray-600">
                            {formData.accommodation === "hotel" &&
                              "Hotels offer convenience, amenities, and services like daily housekeeping and room service."}
                            {formData.accommodation === "resort" &&
                              "Resorts provide all-inclusive experiences with on-site dining, activities, and relaxation options."}
                            {formData.accommodation === "airbnb" &&
                              "Vacation rentals give you more space, privacy, and often a kitchen to prepare your own meals."}
                            {formData.accommodation === "hostel" &&
                              "Hostels are budget-friendly with shared facilities and great opportunities to meet other travelers."}
                            {formData.accommodation === "camping" &&
                              "Camping connects you with nature and offers a more adventurous accommodation experience."}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                            <span>
                              We&apos;ll suggest the best options based on your
                              preferences
                            </span>
                          </div>
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
                    className="space-y-6"
                  >
                    <motion.h3
                      variants={itemVariants}
                      className="mb-6 text-xl font-bold text-gray-900"
                    >
                      Plan Your Activities
                    </motion.h3>

                    <motion.div variants={itemVariants}>
                      <label className="mb-4 block text-sm font-medium text-gray-700">
                        Popular Activities (Select all that interest you)
                      </label>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                        {popularActivities.map((activity) => (
                          <div
                            key={activity.id}
                            onClick={() => handleActivityToggle(activity.id)}
                            className={`cursor-pointer rounded-xl px-4 py-3 transition-all ${
                              formData.activities.includes(activity.id)
                                ? "border border-blue-200 bg-blue-100 text-blue-700"
                                : "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            <div className="flex items-center">
                              <div
                                className={`mr-2 flex h-5 w-5 items-center justify-center rounded ${
                                  formData.activities.includes(activity.id)
                                    ? "bg-blue-500 text-white"
                                    : "border border-gray-300 bg-white"
                                }`}
                              >
                                {formData.activities.includes(activity.id) && (
                                  <Check className="h-3 w-3" />
                                )}
                              </div>
                              <span className="text-sm">{activity.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="mb-4 block text-sm font-medium text-gray-700">
                        Custom Activities
                      </label>

                      {formData.customActivities.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          variants={itemVariants}
                          className="relative mb-4 rounded-2xl border border-gray-200 bg-white p-6"
                        >
                          {formData.customActivities.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveCustomActivity(activity.id)
                              }
                              className="absolute right-4 top-4 rounded-full bg-gray-100 p-1 transition-colors hover:bg-gray-200"
                            >
                              <Trash2 className="h-4 w-4 text-gray-500" />
                            </button>
                          )}

                          <h4 className="mb-4 font-medium text-gray-900">
                            Activity {index + 1}
                          </h4>

                          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                              <label
                                htmlFor={`activity-name-${activity.id}`}
                                className="mb-2 block text-sm font-medium text-gray-700"
                              >
                                Activity Name
                              </label>
                              <input
                                type="text"
                                id={`activity-name-${activity.id}`}
                                value={activity.name}
                                onChange={(e) =>
                                  handleCustomActivityChange(
                                    activity.id,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                placeholder="e.g., Visit Eiffel Tower, Snorkeling Trip"
                              />
                            </div>

                            <div>
                              <label
                                htmlFor={`activity-date-${activity.id}`}
                                className="mb-2 block text-sm font-medium text-gray-700"
                              >
                                Preferred Date (Optional)
                              </label>
                              <input
                                type="date"
                                id={`activity-date-${activity.id}`}
                                value={activity.date}
                                onChange={(e) =>
                                  handleCustomActivityChange(
                                    activity.id,
                                    "date",
                                    e.target.value,
                                  )
                                }
                                min={formData.startDate}
                                max={formData.endDate}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor={`activity-notes-${activity.id}`}
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Notes (Optional)
                            </label>
                            <textarea
                              id={`activity-notes-${activity.id}`}
                              value={activity.notes}
                              onChange={(e) =>
                                handleCustomActivityChange(
                                  activity.id,
                                  "notes",
                                  e.target.value,
                                )
                              }
                              rows={2}
                              className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                              placeholder="Any specific details about this activity..."
                            />
                          </div>
                        </motion.div>
                      ))}

                      <motion.div
                        variants={itemVariants}
                        className="mt-4 flex justify-center"
                      >
                        <button
                          type="button"
                          onClick={handleAddCustomActivity}
                          className="flex items-center gap-2 rounded-full bg-blue-50 px-6 py-3 text-blue-700 transition-colors hover:bg-blue-100"
                        >
                          <Plus className="h-4 w-4" />
                          Add Custom Activity
                        </button>
                      </motion.div>
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
                      Travel Preferences
                    </motion.h3>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="climate"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Preferred Climate
                        </label>
                        <select
                          id="climate"
                          name="preferences.climate"
                          value={formData.preferences.climate}
                          onChange={handleChange}
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
                          {climatePreferences.map((climate) => (
                            <option key={climate.id} value={climate.id}>
                              {climate.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="pace"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Trip Pace
                        </label>
                        <select
                          id="pace"
                          name="preferences.pace"
                          value={formData.preferences.pace}
                          onChange={handleChange}
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
                          {tripPaces.map((pace) => (
                            <option key={pace.id} value={pace.id}>
                              {pace.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                      <div>
                        <label
                          htmlFor="cuisine"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Cuisine Preference
                        </label>
                        <select
                          id="cuisine"
                          name="preferences.cuisine"
                          value={formData.preferences.cuisine}
                          onChange={handleChange}
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
                          {cuisinePreferences.map((cuisine) => (
                            <option key={cuisine.id} value={cuisine.id}>
                              {cuisine.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="transportation"
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          Transportation Preference
                        </label>
                        <select
                          id="transportation"
                          name="preferences.transportation"
                          value={formData.preferences.transportation}
                          onChange={handleChange}
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
                          {transportationOptions.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="specialRequests"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Special Requests or Requirements
                      </label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows={4}
                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        placeholder="Any dietary restrictions, accessibility needs, or other special requests..."
                      />
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      className="rounded-2xl bg-blue-50 p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                          <Sun className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="mb-2 font-medium text-gray-900">
                            Almost Ready for Your Adventure!
                          </h4>
                          <p className="text-sm text-gray-600">
                            We&apos;re about to create your personalized travel
                            itinerary for {formData.destination}. Your plan will
                            include {tripDuration} days of activities,
                            accommodation recommendations, and local insights
                            based on your preferences.
                          </p>
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
                    className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                  >
                    Continue
                    <ChevronRight className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                  >
                    Create Travel Plan
                    <Check className="h-5 w-5" />
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

export default TravelPlannerFlow;
