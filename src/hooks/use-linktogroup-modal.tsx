import { create } from "zustand";

interface LinkToGroupModalState {
  linkId: string;
  isOpen: boolean;
  open: (linkId: string) => void;
  close: () => void;
}

export const useLinkToGroupModal = create<LinkToGroupModalState>((set) => ({
  linkId: "",
  isOpen: false,
  open: (linkId) => set({ isOpen: true, linkId }),
  close: () => set({ isOpen: false, linkId: "" }),
}));
