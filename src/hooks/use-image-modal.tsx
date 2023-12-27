import { create } from "zustand";

interface ImageModalState {
  id: string;
  isOpen: boolean;
  open: (id: string) => void;
  close: () => void;
}

export const useImageModal = create<ImageModalState>((set) => ({
  id: "",
  isOpen: false,
  open: (id) => set({ isOpen: true, id }),
  close: () => set({ isOpen: false, id: "" }),
}));
