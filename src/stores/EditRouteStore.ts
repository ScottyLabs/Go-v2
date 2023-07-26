import { Route } from "@prisma/client";
import { create } from "zustand";

type EditRouteStore = {
  route?: Route | undefined;
  setRoute: (route: Route | undefined) => void;
};

export default create<EditRouteStore>((set) => ({
  route: undefined,
  setRoute: (route) => set(() => ({ route })),
}));
