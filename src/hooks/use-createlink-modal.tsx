import { create } from "zustand";

interface CreateLinkModalState {
  id: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
}

export const useCreateLinkModal = create<CreateLinkModalState>((set) => ({
  id: "",
  isOpen: false,
  onOpen: (id) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false }),
}));
