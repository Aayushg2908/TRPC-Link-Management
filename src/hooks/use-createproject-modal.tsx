import { create } from "zustand";

export type Action = "CREATE" | "EDIT";

interface CreateProjectModalState {
  type: Action;
  id: string;
  name: string;
  isOpen: boolean;
  open: (type: Action, id?: string, name?: string) => void;
  close: () => void;
}

export const useCreateProjectModal = create<CreateProjectModalState>((set) => ({
  type: "CREATE",
  id: "",
  name: "",
  isOpen: false,
  open: (type, id, name) => set({ isOpen: true, type, id, name }),
  close: () => set({ isOpen: false, type: "CREATE", id: "", name: "" }),
}));
