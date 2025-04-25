"use client";

import type React from "react";

import { useState, useRef, type ChangeEvent } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Tag,
  Sparkles,
  CheckCircle,
} from "lucide-react";

interface NFTAttribute {
  trait_type: string;
  value: string;
}

interface NFTMintingWizardProps {
  onMint?: (data: {
    name: string;
    description: string;
    image: File | null;
    collection: string;
    attributes: NFTAttribute[];
    royalties: number;
    supply: number;
  }) => Promise<boolean>;
  collections?: Array<{
    id: string;
    name: string;
    image: string;
  }>;
  onClose?: () => void;
}

const NFTMintingWizard = ({
  onMint,
  collections = [],
  onClose,
}: NFTMintingWizardProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [collection, setCollection] = useState(
    collections.length > 0 ? collections[0].id : "",
  );
  const [attributes, setAttributes] = useState<NFTAttribute[]>([]);
  const [newTraitType, setNewTraitType] = useState("");
  const [newTraitValue, setNewTraitValue] = useState("");
  const [royalties, setRoyalties] = useState(10);
  const [supply, setSupply] = useState(1);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mintStatus, setMintStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new attribute
  const addAttribute = () => {
    if (newTraitType.trim() && newTraitValue.trim()) {
      setAttributes([
        ...attributes,
        { trait_type: newTraitType, value: newTraitValue },
      ]);
      setNewTraitType("");
      setNewTraitValue("");
    }
  };

  // Remove attribute
  const removeAttribute = (index: number) => {
    setAttributes(attributes.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!onMint) return;

    setIsSubmitting(true);
    setMintStatus("idle");

    try {
      const success = await onMint({
        name,
        description,
        image,
        collection,
        attributes,
        royalties,
        supply,
      });

      if (success) {
        setMintStatus("success");
        setStatusMessage("Your NFT was minted successfully!");

        // Reset form after 3 seconds and go to success screen
        setTimeout(() => {
          setStep(4); // Success step
        }, 1000);
      } else {
        setMintStatus("error");
        setStatusMessage(
          "There was an error minting your NFT. Please try again.",
        );
      }
    } catch (error) {
      setMintStatus("error");
      setStatusMessage(
        "There was an error minting your NFT. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if current step is valid
  const isStepValid = () => {
    switch (step) {
      case 1:
        return !!image && name.trim() !== "";
      case 2:
        return true; // Attributes are optional
      case 3:
        return royalties >= 0 && royalties <= 100 && supply >= 1;
      default:
        return false;
    }
  };

  // Go to next step
  const nextStep = () => {
    if (isStepValid()) {
      setStep(step + 1);
    }
  };

  // Go to previous step
  const prevStep = () => {
    setStep(Math.max(1, step - 1));
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-400" size={20} />
          <h2 className="text-xl font-bold text-white">Create New NFT</h2>
        </div>

        {onClose && (
          <button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Progress Steps */}
      <div className="border-b border-slate-800 p-4">
        <div className="flex justify-between">
          {["Upload", "Properties", "Pricing", "Complete"].map(
            (label, index) => {
              const stepNum = index + 1;
              const isActive = step === stepNum;
              const isCompleted = step > stepNum;

              return (
                <div key={label} className="flex flex-col items-center">
                  <div className="flex items-center">
                    {index > 0 && (
                      <div
                        className={`h-0.5 w-12 ${isCompleted ? "bg-blue-500" : "bg-slate-700"}`}
                      />
                    )}

                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        isActive
                          ? "bg-blue-500 text-white"
                          : isCompleted
                            ? "border border-blue-500 bg-blue-500/20 text-blue-400"
                            : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isCompleted ? <Check size={16} /> : stepNum}
                    </div>

                    {index < 3 && (
                      <div
                        className={`h-0.5 w-12 ${isCompleted ? "bg-blue-500" : "bg-slate-700"}`}
                      />
                    )}
                  </div>

                  <span
                    className={`mt-1 text-xs ${isActive ? "text-white" : "text-slate-400"}`}
                  >
                    {label}
                  </span>
                </div>
              );
            },
          )}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Upload */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="mb-4 text-lg font-bold text-white">
                Upload your NFT
              </h3>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-white">
                  Image, Video, Audio, or 3D Model{" "}
                  <span className="text-red-400">*</span>
                </label>

                <div
                  className={`rounded-xl border-2 border-dashed p-6 text-center ${
                    isDragging
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-slate-700 hover:border-blue-500/50"
                  } cursor-pointer transition-colors`}
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*,video/*,audio/*,.glb,.gltf"
                    className="hidden"
                  />

                  {imagePreview ? (
                    <div className="relative mx-auto mb-4 h-48 w-48">
                      <Image
                        src={
                          imagePreview ||
                          "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                        }
                        alt="NFT Preview"
                        fill
                        className="rounded-lg object-contain"
                      />

                      <button
                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          setImage(null);
                          setImagePreview(null);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                        <Upload className="text-slate-400" size={24} />
                      </div>
                      <p className="mb-2 text-slate-300">
                        Drag and drop your file here
                      </p>
                      <p className="text-sm text-slate-400">
                        PNG, JPG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF
                      </p>
                    </div>
                  )}

                  <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700">
                    {imagePreview ? "Change File" : "Choose File"}
                  </button>
                </div>
              </div>

              {/* Name */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Item name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a detailed description of your item"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                />
              </div>

              {/* Collection */}
              {collections.length > 0 && (
                <div className="mb-6">
                  <label
                    htmlFor="collection"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Collection
                  </label>
                  <select
                    id="collection"
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {collections.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 2: Properties */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="mb-4 text-lg font-bold text-white">
                Add Properties
              </h3>

              <div className="mb-6">
                <p className="mb-4 text-slate-300">
                  Properties show up underneath your item, are clickable, and
                  can be filtered in your collection&apos;s sidebar.
                </p>

                {/* Attributes List */}
                <div className="mb-4">
                  {attributes.length > 0 ? (
                    <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                      {attributes.map((attr, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 p-3"
                        >
                          <div className="flex-1">
                            <div className="mb-1 text-xs text-blue-400">
                              {attr.trait_type}
                            </div>
                            <div className="text-sm font-medium text-white">
                              {attr.value}
                            </div>
                          </div>

                          <button
                            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-700 hover:text-red-400"
                            onClick={() => removeAttribute(index)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mb-4 rounded-xl border border-dashed border-slate-700 py-8 text-center">
                      <Tag className="mx-auto mb-2 text-slate-400" size={24} />
                      <p className="text-slate-400">No properties added yet</p>
                    </div>
                  )}
                </div>

                {/* Add New Attribute */}
                <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4">
                  <h4 className="mb-3 text-sm font-medium text-white">
                    Add Property
                  </h4>

                  <div className="mb-3 grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs text-slate-400">
                        Type
                      </label>
                      <input
                        type="text"
                        value={newTraitType}
                        onChange={(e) => setNewTraitType(e.target.value)}
                        placeholder="E.g. Size"
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs text-slate-400">
                        Value
                      </label>
                      <input
                        type="text"
                        value={newTraitValue}
                        onChange={(e) => setNewTraitValue(e.target.value)}
                        placeholder="E.g. Medium"
                        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                      />
                    </div>
                  </div>

                  <button
                    className="w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={addAttribute}
                    disabled={!newTraitType.trim() || !newTraitValue.trim()}
                  >
                    Add Property
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Pricing */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="mb-4 text-lg font-bold text-white">
                Set Pricing & Supply
              </h3>

              {/* Royalties */}
              <div className="mb-6">
                <label
                  htmlFor="royalties"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Royalties (%)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    id="royalties"
                    min="0"
                    max="25"
                    step="0.5"
                    value={royalties}
                    onChange={(e) =>
                      setRoyalties(Number.parseFloat(e.target.value))
                    }
                    className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-slate-700"
                  />
                  <div className="w-16 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-center text-white">
                    {royalties}%
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  Royalties are paid to content creators when items are sold on
                  the secondary market.
                </p>
              </div>

              {/* Supply */}
              <div className="mb-6">
                <label
                  htmlFor="supply"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Supply
                </label>
                <div className="flex items-center gap-3">
                  <button
                    className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                    onClick={() => setSupply(Math.max(1, supply - 1))}
                  >
                    <Minus size={16} />
                  </button>

                  <input
                    type="number"
                    id="supply"
                    min="1"
                    value={supply}
                    onChange={(e) =>
                      setSupply(
                        Math.max(1, Number.parseInt(e.target.value) || 1),
                      )
                    }
                    className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-center text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                  />

                  <button
                    className="rounded-lg border border-slate-700 bg-slate-800 p-2 text-white"
                    onClick={() => setSupply(supply + 1)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="mt-2 text-xs text-slate-400">
                  The number of copies that can be minted. Setting to 1 creates
                  a unique NFT.
                </p>
              </div>

              {/* Status Message */}
              <AnimatePresence>
                {mintStatus !== "idle" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mb-6 flex items-center gap-2 rounded-xl p-3 ${
                      mintStatus === "success"
                        ? "border border-green-500/30 bg-green-900/20"
                        : "border border-red-500/30 bg-red-900/20"
                    }`}
                  >
                    {mintStatus === "success" ? (
                      <CheckCircle className="text-green-400" size={18} />
                    ) : (
                      <AlertCircle className="text-red-400" size={18} />
                    )}
                    <span
                      className={
                        mintStatus === "success"
                          ? "text-green-300"
                          : "text-red-300"
                      }
                    >
                      {statusMessage}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.2,
                }}
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20"
              >
                <Check className="text-green-400" size={40} />
              </motion.div>

              <h3 className="mb-2 text-2xl font-bold text-white">
                NFT Created Successfully!
              </h3>
              <p className="mx-auto mb-8 max-w-md text-slate-300">
                Your NFT has been minted and is now available in your
                collection.
              </p>

              {imagePreview && (
                <div className="relative mx-auto mb-8 h-48 w-48">
                  <Image
                    src={
                      imagePreview ||
                      "https://ldw366cauu.ufs.sh/f/X5rZLOaE9ypoanFSiLl5uGEVz3qLUXCjBOmR6fkIWAJ9HPKp"
                    }
                    alt={name}
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
              )}

              <div className="flex justify-center gap-4">
                <motion.button
                  className="rounded-xl bg-slate-800 px-6 py-3 font-medium text-white transition-colors hover:bg-slate-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                >
                  Close
                </motion.button>

                <motion.button
                  className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Reset form and go back to step 1
                    setStep(1);
                    setName("");
                    setDescription("");
                    setImage(null);
                    setImagePreview(null);
                    setAttributes([]);
                    setRoyalties(10);
                    setSupply(1);
                    setMintStatus("idle");
                  }}
                >
                  Create Another
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      {step < 4 && (
        <div className="flex justify-between border-t border-slate-800 p-4">
          <button
            className="rounded-lg bg-slate-800 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={prevStep}
            disabled={step === 1}
          >
            <div className="flex items-center gap-1">
              <ChevronLeft size={16} />
              <span>Back</span>
            </div>
          </button>

          {step === 3 ? (
            <button
              className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Creating...</span>
                </div>
              ) : (
                "Create NFT"
              )}
            </button>
          ) : (
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={nextStep}
              disabled={!isStepValid()}
            >
              <div className="flex items-center gap-1">
                <span>Next</span>
                <ChevronRight size={16} />
              </div>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const Minus = ({ size = 24, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
};

export default NFTMintingWizard;
