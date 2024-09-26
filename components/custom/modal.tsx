"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  variant?: "small" | "medium" | "large" | "full" | "scrollable";
  title?: string;
  openTrigger?: JSX.Element;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  variant = "medium",
  title,
  openTrigger,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isInternalOpen, setIsInternalOpen] = useState(false);

  const handleOpen = () => {
    setIsInternalOpen(true);
  };
  const handleClose = () => {
    setIsInternalOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (openTrigger) {
          handleClose();
        } else {
          if (onClose) {
            onClose();
          }
        }
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose, openTrigger]);

  const handleOverlayClick = () => {
    if (openTrigger) {
      handleClose();
    } else {
      if (onClose) {
        onClose();
      }
    }
  };

  const handleCloseButtonClick = () => {
    if (openTrigger) {
      handleClose();
    } else {
      if (onClose) {
        onClose();
      }
    }
  };

  useEffect(() => {
    if (isOpen || isInternalOpen) {
      document.querySelector("body")?.classList.add("modal");
    } else {
      document.querySelector("body")?.classList.remove("modal");
    }

    return () => document.querySelector("body")?.classList.remove("modal");
  }, [isInternalOpen, isOpen]);

  const modalSizeClass = (() => {
    switch (variant) {
      case "small":
        return "max-w-[300px] max-h-[85vh] overflow-y-auto";
      case "medium":
        return "max-w-[600px] max-h-[85vh] overflow-y-auto";
      case "large":
        return "max-w-[800px] max-h-[85vh] overflow-y-auto";
      case "full":
        return "max-w-full h-full !w-full !rounded-none";
      case "scrollable":
        return "max-w-[600px] max-h-[85vh] overflow-y-auto";
      default:
        return "max-w-[600px] max-h-[85vh] overflow-y-auto";
    }
  })();

  return (
    <>
      {/* Custom Trigger */}
      {openTrigger &&
        React.cloneElement(openTrigger as React.ReactElement, {
          onClick: () => handleOpen(),
        })}
      <AnimatePresence>
        {(isOpen || isInternalOpen) && (
          <motion.div
            className="fixed inset-0 z-[99] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          >
            <motion.div
              ref={modalRef}
              className={`rounded-lg border border-border bg-background shadow ${modalSizeClass} relative mx-auto w-[98%]`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {title && (
                <div className="mb-6 flex items-center justify-between border-b border-b-zinc-300 pb-2 dark:border-b-zinc-600">
                  <h2 className="text-lg font-semibold text-slate-500 dark:text-slate-200">
                    {title}
                  </h2>
                  <button
                    type="button"
                    className="rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-600"
                    onClick={handleCloseButtonClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-x"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              )}
              {children}
              <button
                type="button"
                className={`absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none ${
                  title ? "hidden" : ""
                }`}
                onClick={handleCloseButtonClick}
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
