import { create } from "zustand";

export type Action = "CREATE" | "EDIT";

interface ShortenLinkModalState {
  type: Action;
  id: string;
  slug: string;
  url: string;
  isOpen: boolean;
  open: (type: Action, id?: string, slug?: string, url?: string) => void;
  close: () => void;
}

export const useShortenLinkModal = create<ShortenLinkModalState>((set) => ({
  type: "CREATE",
  id: "",
  slug: "",
  url: "",
  isOpen: false,
  open: (type, id, slug, url) => set({ isOpen: true, type, slug, id, url }),
  close: () =>
    set({ isOpen: false, type: "CREATE", id: "", slug: "", url: "" }),
}));
