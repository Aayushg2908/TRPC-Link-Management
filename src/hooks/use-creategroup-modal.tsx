import { create } from "zustand";

interface CreateGroupModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreateGroupModal = create<CreateGroupModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
