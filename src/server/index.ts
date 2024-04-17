import { groupRouter } from "./routes/group";
import { linkRouter } from "./routes/link";
import { projectRouter } from "./routes/project";
import { userRouter } from "./routes/user";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  link: linkRouter,
  group: groupRouter,
  project: projectRouter,
});

export type AppRouter = typeof appRouter;
