import { linkRouter } from "./routes/link";
import { userRouter } from "./routes/user";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  link: linkRouter,
});

export type AppRouter = typeof appRouter;
