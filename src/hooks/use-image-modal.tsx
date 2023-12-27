import { create } from "zustand";

interface ImageModalState {
  id: string;
  type: string;
  isOpen: boolean;
  open: (id: string, type: string) => void;
  close: () => void;
}

export const useImageModal = create<ImageModalState>((set) => ({
  id: "",
  type: "",
  isOpen: false,
  open: (id, type) => set({ isOpen: true, id, type }),
  close: () => set({ isOpen: false, id: "", type: "" }),
}));
