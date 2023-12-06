import { create } from "zustand";

type DialogStore = {
  dialog: "createRoute" | "editRoute" | "qr" | null;
  setDialog: (dialog: "createRoute" | "editRoute" | "qr" | null) => void;
};

export default create<DialogStore>((set) => ({
  dialog: null,
  setDialog: (dialog) => set(() => ({ dialog })),
}));
