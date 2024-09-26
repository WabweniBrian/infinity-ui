"use client";

import React, { useState, useCallback } from "react";

interface ToggleProps<T> {
  list: T[];
  initialValue?: T | null;
  children: (
    items: T[],
    toggleActive: (itemToActivate: T) => void,
    selectedItem: T | undefined
  ) => React.ReactNode;
}

const Toggle = <T,>({
  list,
  initialValue = null,
  children,
}: ToggleProps<T>): JSX.Element => {
  const [items, setItems] = useState<(T & { isActive: boolean })[]>(
    list.map((item) => ({
      ...item,
      isActive: item === initialValue,
    }))
  );

  const toggleActive = useCallback((itemToActivate: T) => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) => ({
        ...item,
        isActive: item === itemToActivate,
      }));
      return newItems;
    });
  }, []);

  const selectedItem = items.find((item) => item.isActive);

  return <>{children(items, toggleActive, selectedItem)}</>;
};

export default Toggle;
