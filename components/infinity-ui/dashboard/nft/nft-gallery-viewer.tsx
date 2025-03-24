"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Grid3X3,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Info,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Eye,
  Heart,
  Share2,
} from "lucide-react";

interface NFTItem {
  id: string;
  name: string;
  image: string;
  creator: string;
  price?: string;
  currency?: string;
  description?: string;
  likes?: number;
  views?: number;
}

interface NFTGalleryViewerProps {
  title?: string;
  items: NFTItem[];
  initialIndex?: number;
  onClose?: () => void;
}

const NFTGalleryViewer = ({
  title = "NFT Gallery",
  items,
  initialIndex = 0,
  onClose,
}: NFTGalleryViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [startDragPosition, setStartDragPosition] = useState({ x: 0, y: 0 });
  const galleryRef = useRef<HTMLDivElement>(null);

  const currentItem = items[currentIndex];

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (galleryRef.current?.requestFullscreen) {
        galleryRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen for fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Navigate to previous item
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    resetView();
  }, [items.length]);

  // Navigate to next item
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    resetView();
  }, [items.length]);

  // Reset view settings
  const resetView = () => {
    setZoomLevel(1);
    setRotation(0);
    setDragPosition({ x: 0, y: 0 });
  };

  // Handle zoom in
  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3));
  };

  // Handle zoom out
  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.5));
  };

  // Handle rotation
  const rotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartDragPosition({
        x: e.clientX - dragPosition.x,
        y: e.clientY - dragPosition.y,
      });
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setDragPosition({
        x: e.clientX - startDragPosition.x,
        y: e.clientY - startDragPosition.y,
      });
    }
  };

  // Handle mouse up for dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle key press for navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
        case "Escape":
          if (onClose) onClose();
          break;
        case "f":
          toggleFullscreen();
          break;
        case "+":
          zoomIn();
          break;
        case "-":
          zoomOut();
          break;
        case "r":
          rotate();
          break;
        case "i":
          setShowInfo(!showInfo);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNext, goToPrevious, onClose, showInfo]);

  // Handle wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    }
  };

  return (
    <div
      ref={galleryRef}
      className="flex h-full w-full flex-col bg-slate-900/95 backdrop-blur-sm"
      onWheel={handleWheel}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 p-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>

        <div className="flex items-center gap-2">
          <motion.button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowThumbnails(!showThumbnails)}
          >
            <Grid3X3 size={18} />
          </motion.button>

          <motion.button
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleFullscreen}
          >
            <Maximize2 size={18} />
          </motion.button>

          {onClose && (
            <motion.button
              className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
            >
              <X size={18} />
            </motion.button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden md:flex-row">
        {/* Thumbnails Sidebar */}
        <AnimatePresence>
          {showThumbnails && (
            <motion.div
              className="hide-scrollbar w-full overflow-y-auto border-b border-slate-800 md:w-24 md:border-b-0 md:border-r lg:w-32"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-2">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`relative mb-2 cursor-pointer overflow-hidden rounded-lg ${
                      currentIndex === index ? "ring-2 ring-blue-500" : ""
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentIndex(index);
                      resetView();
                    }}
                  >
                    <div className="relative aspect-square">
                      <Image
                        src={
                          item.image || "/placeholder.svg?height=100&width=100"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {currentIndex === index && (
                      <div className="absolute inset-0 border border-blue-500/50 bg-blue-500/20" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Viewer */}
        <div className="relative flex flex-1 flex-col">
          {/* Image Viewer */}
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: zoomLevel > 1 ? "grab" : "default" }}
          >
            {/* Current Image */}
            <motion.div
              className="relative"
              animate={{
                rotate: rotation,
                scale: zoomLevel,
                x: dragPosition.x,
                y: dragPosition.y,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ touchAction: "none" }}
            >
              <div className="relative">
                <Image
                  src={
                    currentItem.image || "/placeholder.svg?height=600&width=600"
                  }
                  alt={currentItem.name}
                  width={600}
                  height={600}
                  className="max-h-[70vh] max-w-full object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 rounded-full bg-slate-800/80 p-2 text-white transition-colors hover:bg-slate-700"
              onClick={goToPrevious}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="absolute right-4 rounded-full bg-slate-800/80 p-2 text-white transition-colors hover:bg-slate-700"
              onClick={goToNext}
            >
              <ChevronRight size={24} />
            </button>

            {/* Image Controls */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform items-center gap-2 rounded-full bg-slate-800/80 p-1 backdrop-blur-sm">
              <motion.button
                className="rounded-full p-2 text-white transition-colors hover:bg-slate-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={zoomIn}
              >
                <ZoomIn size={18} />
              </motion.button>

              <motion.button
                className="rounded-full p-2 text-white transition-colors hover:bg-slate-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={zoomOut}
              >
                <ZoomOut size={18} />
              </motion.button>

              <motion.button
                className="rounded-full p-2 text-white transition-colors hover:bg-slate-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={rotate}
              >
                <RotateCw size={18} />
              </motion.button>

              <motion.button
                className="rounded-full p-2 text-white transition-colors hover:bg-slate-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info size={18} />
              </motion.button>

              <div className="px-2 text-sm text-white">
                {Math.round(zoomLevel * 100)}%
              </div>
            </div>
          </div>

          {/* Info Panel */}
          <AnimatePresence>
            {showInfo && (
              <motion.div
                className="border-t border-slate-800 bg-slate-900"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {currentItem.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        Created by {currentItem.creator}
                      </p>
                    </div>

                    {currentItem.price && (
                      <div className="text-right">
                        <div className="text-sm text-slate-400">Price</div>
                        <div className="text-lg font-bold text-white">
                          {currentItem.price} {currentItem.currency}
                        </div>
                      </div>
                    )}
                  </div>

                  {currentItem.description && (
                    <p className="mb-4 text-sm text-slate-300">
                      {currentItem.description}
                    </p>
                  )}

                  <div className="flex justify-between">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1 text-slate-400">
                        <Eye size={16} />
                        <span>{currentItem.views || 0}</span>
                      </div>

                      <div className="flex items-center gap-1 text-slate-400">
                        <Heart size={16} />
                        <span>{currentItem.likes || 0}</span>
                      </div>
                    </div>

                    <motion.button
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default NFTGalleryViewer;
