"use client";

import React, { ReactNode, useState } from "react";
import { CSSTransition } from "react-transition-group";

interface TooltipProps {
  children: ReactNode;
  position?: "left" | "right" | "top" | "bottom";
  text: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, position, text }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  const getPostion = () => {
    switch (position) {
      case "bottom":
        return "top-full mt-2 left-1/2 -translate-x-1/2 before:left-1/2 before:-translate-x-1/2 before:-top-[0.33rem]";
        break;
      case "top":
        return "bottom-full mb-2 left-1/2 -translate-x-1/2 before:left-1/2 before:-translate-x-1/2 before:-bottom-[0.33rem]";
        break;
      case "left":
        return "right-full mr-2 top-1/2 -translate-y-1/2 before:top-1/2 before:-translate-y-1/2 before:-right-1";
        break;
      case "right":
        return "left-full ml-2 top-1/2 -translate-y-1/2 before:top-1/2 before:-translate-y-1/2 before:-left-1";
        break;

      default:
        return "top-full mt-2 left-1/2 -translate-x-1/2 before:left-1/2 before:-translate-x-1/2 before:-top-[0.33rem]";
        break;
    }
  };

  return (
    <>
      <div className="relative inline-block">
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </div>
        <CSSTransition
          in={isTooltipVisible}
          timeout={1000}
          classNames="tooltip"
          unmountOnExit
        >
          <div
            className={`shadow-shadows/overlay pointer-events-auto absolute whitespace-nowrap rounded-md bg-background px-2 py-1 text-sm opacity-100 shadow backdrop-blur-lg transition-opacity duration-300 dark:shadow-brand/20 ${getPostion()} shadow-shadows/overlay z-[99999] text-foreground before:absolute before:h-[0.65rem] before:w-[0.65rem] before:rotate-45 before:bg-background`}
          >
            {text}
          </div>
        </CSSTransition>
      </div>
    </>
  );
};

export default Tooltip;
