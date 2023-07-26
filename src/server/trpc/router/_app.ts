// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import auth from "./auth";
import example from "./example";
import route from "./route";

export const appRouter = router({
  example,
  auth,
  route,
});

// export type definition of API
export type AppRouter = typeof appRouter;
