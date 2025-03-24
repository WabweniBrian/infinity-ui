import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  isCollapsed: boolean;
  collapse: () => void;
  uncollapse: () => void;
  toggleCollapse: () => void;
}

const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      isCollapsed: true,
      collapse: () => set({ isCollapsed: true }),
      uncollapse: () => set({ isCollapsed: false }),
      toggleCollapse: () =>
        set((state) => ({ isCollapsed: !state.isCollapsed })),
    }),
    {
      name: "infinityui-sidebar-collapse",
    },
  ),
);

export default useSidebar;
