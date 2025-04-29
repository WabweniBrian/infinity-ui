"use client";

import useMediaQuery from "@/hooks/use-media-query";
import React, { useState } from "react";
import Sidebar from ".";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}
    >
      <div className="flex">
        {(!isMobile || showMobileMenu) && (
          <Sidebar
            isMobile={isMobile}
            setShowMobileMenu={setShowMobileMenu}
            showMobileMenu={showMobileMenu}
          />
        )}

        <main
          className={`flex-1 px-4 pt-4 md:ml-72 ${isMobile ? "pb-20" : ""}`}
        >
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default LayoutWrapper;
