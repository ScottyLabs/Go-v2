import { Route } from "@prisma/client";
import { create } from "zustand";

type QrStore = {
  route?: Route | undefined;
  setRoute: (route: Route | undefined) => void;
};

export default create<QrStore>((set) => ({
  route: undefined,
  setRoute: (route) => set(() => ({ route })),
}));
