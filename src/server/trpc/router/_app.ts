import { router } from "../trpc";
import { authRouter } from "./auth";
import { api } from "./example";
import { insert } from './insert'

export const appRouter = router({
  api: api,
  auth: authRouter,
  insert: insert
});

// export type definition of API
export type AppRouter = typeof appRouter;