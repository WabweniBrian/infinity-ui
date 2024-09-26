"use client";

import { cn } from "@/lib/utils";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

interface ScrollableProps {
  children: React.ReactNode;
  leftControl?: JSX.Element;
  rightControl?: JSX.Element;
  autoHideControls?: boolean;
  autoDisableControls?: boolean;
  hideGradient?: boolean;
}

const Scrollable: React.FC<ScrollableProps> = ({
  children,
  leftControl,
  rightControl,
  autoHideControls = false,
  autoDisableControls = false,
  hideGradient = false,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = listRef.current!.scrollLeft;
    setScrollPosition(position);
  };

  useEffect(() => {
    listRef?.current?.addEventListener("scroll", handleScroll);
    return () => {
      listRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNext = () => {
    listRef.current!.scrollLeft += 200;
  };

  const handleBack = () => {
    listRef.current!.scrollLeft -= 200;
  };
  return (
    <div className="shrink-0">
      <div className="relative mt-6">
        {/* Custom Controls */}
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              autoHideControls && scrollPosition === 0 ? "hidden" : "block",
              autoDisableControls && scrollPosition === 0
                ? "pointer-events-none opacity-50"
                : "",
            )}
          >
            {leftControl &&
              React.cloneElement(leftControl as React.ReactElement, {
                onClick: () => handleBack(),
              })}
          </div>
          <div
            className={cn(
              autoHideControls &&
                listRef.current &&
                scrollPosition + listRef.current.clientWidth ===
                  listRef.current.scrollWidth
                ? "hidden"
                : "block",
              autoDisableControls &&
                listRef.current &&
                scrollPosition + listRef.current.clientWidth ===
                  listRef.current.scrollWidth
                ? "pointer-events-none opacity-50"
                : "",
            )}
          >
            {rightControl &&
              React.cloneElement(rightControl as React.ReactElement, {
                onClick: () => handleNext(),
              })}
          </div>
        </div>

        {/* Default Left Control */}
        {!leftControl && (
          <button
            className={cn(
              "absolute left-0 top-1/2 z-20 hidden h-full w-28 -translate-y-1/2 items-center justify-start bg-gradient-to-r from-white via-white/90 to-transparent dark:from-background dark:via-background/90",
              scrollPosition === 0 ? "sm:hidden" : "sm:flex",
              hideGradient && "!from-transparent !to-transparent",
            )}
            onClick={handleBack}
          >
            <div className="h-10 w-10 rounded-full bg-brand text-white flex-center-center">
              <BsChevronLeft className="text-xl" />
            </div>
          </button>
        )}

        {/* Scrollable Content */}
        <div
          className="hide-scrollbar flex shrink-0 space-x-4 overflow-x-auto scroll-smooth p-2"
          ref={listRef}
        >
          {children}
        </div>

        {/* Default Right Control */}
        {!rightControl && (
          <button
            className={cn(
              "absolute right-0 top-1/2 z-20 hidden h-full w-28 -translate-y-1/2 items-center justify-end bg-gradient-to-l from-white via-white/90 to-transparent dark:from-background dark:via-background/90",
              listRef.current &&
                scrollPosition + listRef.current.clientWidth ===
                  listRef.current.scrollWidth
                ? "sm:hidden"
                : "sm:flex",
              hideGradient && "!from-transparent !to-transparent",
            )}
            onClick={handleNext}
          >
            <div className="h-10 w-10 rounded-full bg-brand text-white flex-center-center">
              <BsChevronRight className="text-xl" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Scrollable;
