"use client"

import { create } from "zustand"

type ViewType = "day" | "week" | "month"

type ViewStore = {
  view: ViewType
  setView: (view: ViewType) => void
}

export const useViewStore = create<ViewStore>((set) => ({
  view: "week",
  setView: (view) => set({ view }),
}))
