import { create } from "zustand";

type DialogStore = {
  dialog: "createRoute" | "editRoute" | null;
  setDialog: (dialog: "createRoute" | "editRoute" | null) => void;
};

export default create<DialogStore>((set) => ({
  dialog: null,
  setDialog: (dialog) => set(() => ({ dialog })),
}));
