// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import route from "./route";

export const appRouter = router({
  route,
});

// export type definition of API
export type AppRouter = typeof appRouter;
