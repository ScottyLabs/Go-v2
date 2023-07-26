// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import example from "./example";
import auth from "./auth";
import route from "./route";

export const appRouter = router({
  example,
  auth,
  route,
});

// export type definition of API
export type AppRouter = typeof appRouter;
