"use client";

import { useState, useCallback } from "react";

const useClipboard = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = useCallback((text: string) => {
    setCopied(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }, []);

  return { copied, copyToClipboard };
};

export default useClipboard;
