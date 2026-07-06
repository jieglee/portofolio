import { create } from "zustand";

export type InitialModalState = {
    isOpen: boolean;
    profileHeight: number;
};

export type InitialModalAction = {
    showMenu(): void;
    hideMenu(): void;
    toggleMenu(): void;
    setProfileHeight(height: number): void;
};

export const useMenu = create<InitialModalState & InitialModalAction>()(
    (set) => ({
        isOpen: false,
        profileHeight: 0,
        showMenu: () => set({ isOpen: true }),
        hideMenu: () => set({ isOpen: false }),
        toggleMenu: () => set((prev) => ({ isOpen: !prev.isOpen })),
        setProfileHeight: (height) => set({ profileHeight: height }),
    }),
);
