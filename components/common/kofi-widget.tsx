"use client";

import { useEffect } from "react";

interface KoFiWidgetProps {
  username: string;
  options?: {
    type?: string;
    "floating-chat.donateButton.text"?: string;
    "floating-chat.donateButton.background-color"?: string;
    "floating-chat.donateButton.text-color"?: string;
    [key: string]: string | undefined;
  };
}

export default function KoFiWidget({
  username,
  options = {
    type: "floating-chat",
    "floating-chat.donateButton.text": "Support me",
    "floating-chat.donateButton.background-color": "#f45d22",
    "floating-chat.donateButton.text-color": "#fff",
  },
}: KoFiWidgetProps) {
  useEffect(() => {
    // Create script element for the Ko-fi overlay widget
    const script = document.createElement("script");
    script.src = "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
    script.async = true;
    script.onload = () => {
      // Once the script is loaded, initialize the widget
      if (typeof window !== "undefined" && window.kofiWidgetOverlay) {
        window.kofiWidgetOverlay.draw(username, options);
      }
    };

    // Add the script to the document
    document.body.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      // Remove the script
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }

      // Remove the widget if it exists
      const widgetContainer = document.getElementById("kofi-widget-overlay");
      if (widgetContainer) {
        widgetContainer.remove();
      }
    };
  }, [username, options]);

  // This component doesn't render anything visible
  return null;
}

// Add TypeScript declaration for the Ko-fi widget
declare global {
  interface Window {
    kofiWidgetOverlay?: {
      draw: (username: string, options: object) => void;
    };
  }
}
