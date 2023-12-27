import { create } from "zustand";

interface CreateLinkModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateLinkModal = create<CreateLinkModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
